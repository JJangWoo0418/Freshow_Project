import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import styles from './components/css/fridgeaddstyle';

const FridgeAdd = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    // 권한 요청
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
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images', // 소문자 문자열로 사용
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log("이미지 선택 에러:", error);
        }
    };

    const handleSave = () => {
        const newFridge = {
            name,
            description,
            image: { uri: image },
        };

        router.push({
            pathname: '/fridgeselect',
            params: { newFridge: JSON.stringify(newFridge) },
        });
    };

    return (
        <View style={styles.container}>
            {/* 뒤로 가기 버튼 */}
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
