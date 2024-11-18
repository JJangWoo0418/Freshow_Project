import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import styles from './components/css/fridgeeditstyle';

const FridgeEdit = () => {
    const router = useRouter();
    const { fridgeId } = useLocalSearchParams(); // 전달된 fridgeId 받아오기
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    // Firestore에서 냉장고 데이터 가져오기
    const fetchFridgeData = async () => {
        if (!fridgeId) {
            console.log("fridgeId가 전달되지 않았습니다.");
            return;
        }
        try {
            const fridgeDoc = doc(db, "fridges", fridgeId);
            const docSnap = await getDoc(fridgeDoc);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setName(data.name || '');
                setDescription(data.description || '');
                setImage(data.image || null);
            } else {
                console.log("해당 냉장고 데이터가 없습니다.");
            }
        } catch (error) {
            console.error("데이터 가져오기 오류:", error);
        }
    };

    // Firestore에 수정된 데이터 저장
    const handleSave = async () => {
        if (!fridgeId) return;

        try {
            const fridgeDoc = doc(db, "fridges", fridgeId);
            await updateDoc(fridgeDoc, {
                name,
                description,
                image,
            });
            router.push('/fridgeselect');
        } catch (error) {
            console.error("데이터 저장 오류:", error);
        }
    };

    // Firestore에서 데이터 삭제
    const handleDelete = () => {
        Alert.alert(
            "냉장고 삭제",
            "정말로 이 냉장고를 삭제하시겠습니까?",
            [
                { text: "취소", style: "cancel" },
                {
                    text: "삭제",
                    onPress: async () => {
                        if (!fridgeId) return;
                        try {
                            const fridgeDoc = doc(db, "fridges", fridgeId);
                            await deleteDoc(fridgeDoc);
                            router.push('/fridgeselect');
                        } catch (error) {
                            console.error("냉장고 삭제 오류:", error);
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };

    useEffect(() => {
        fetchFridgeData(); // 페이지 로드 시 데이터 가져오기
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
            {image && image.uri ? (
                <Image source={{ uri: image.uri }} style={styles.image} />
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
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>냉장고 삭제</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FridgeEdit;
