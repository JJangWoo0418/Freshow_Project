import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from './firebaseconfig';
import styles from './components/css/fridgeeditstyle';

const FridgeEdit = () => {
    const router = useRouter();
    const { fridgeId } = useLocalSearchParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const fetchFridgeData = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser || !fridgeId) return;

        try {
            const fridgeDoc = doc(db, "계정", currentUser.uid, "냉장고", fridgeId);
            const docSnap = await getDoc(fridgeDoc);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setName(data.name || '');
                setDescription(data.description || '');
                setImage(data.image || null);
            }
        } catch (error) {
            console.error("냉장고 데이터 가져오기 오류:", error);
        }
    };

    const handleSave = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser || !fridgeId) return;

        try {
            const fridgeDoc = doc(db, "계정", currentUser.uid, "냉장고", fridgeId);
            await updateDoc(fridgeDoc, {
                name,
                description,
                image,
            });

            Alert.alert("성공", "냉장고가 수정되었습니다.");
            router.push('/fridgeselect', { refresh: true });
        } catch (error) {
            console.error("냉장고 수정 오류:", error);
        }
    };

    useEffect(() => {
        fetchFridgeData();
    }, [fridgeId]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Image
                    source={require('../assets/Arrow-Left.png')}
                    style={styles.backButtonImage}
                />
            </TouchableOpacity>

            <Text style={styles.header}>냉장고 편집</Text>
            {image ? (
                <Image source={{ uri: typeof image === 'string' ? image : image.uri }} style={styles.image} />
            ) : (
                <View style={[styles.image, { backgroundColor: '#E0E0E0' }]} />
            )}
            <Text style={styles.label}>이름</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholder="냉장고 이름"
            />
            <Text style={styles.label}>메모</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                placeholder="냉장고 설명"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FridgeEdit;
