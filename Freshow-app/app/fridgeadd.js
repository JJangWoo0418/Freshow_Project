import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { auth, db } from './firebaseconfig';
import { collection, addDoc } from "firebase/firestore";
import styles from './components/css/fridgeaddstyle';

const FridgeAdd = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("권한 필요", "이미지를 선택하려면 갤러리 접근 권한이 필요합니다.");
            }
        })();
    }, []);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("이미지 선택 오류:", error);
        }
    };

    const handleSave = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            Alert.alert("로그인 필요", "냉장고를 추가하려면 로그인이 필요합니다.");
            return;
        }

        const fridgeData = {
            name,
            description,
            image: { uri: image },
            createdAt: new Date(),
        };

        try {
            const fridgeCollection = collection(db, "계정", currentUser.uid, "냉장고");
            await addDoc(fridgeCollection, fridgeData);

            Alert.alert("성공", "냉장고가 추가되었습니다!");
            router.push('/fridgeselect', { refresh: true }); // `refresh`를 추가하여 데이터 재로드 트리거
        } catch (error) {
            console.error("냉장고 추가 오류:", error);
            Alert.alert("오류", "냉장고를 추가하는 도중 문제가 발생했습니다.");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Image
                    source={require('../assets/Arrow-Left.png')}
                    style={styles.backButtonImage}
                />
            </TouchableOpacity>

            <Text style={styles.header}>냉장고 추가</Text>

            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text style={styles.placeholderText}>사진 등록</Text>
                )}
            </TouchableOpacity>

            <TextInput
                placeholder="이름"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="메모"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FridgeAdd;
