import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import styles from './components/css/fridgeeditstyle';

const FridgeEdit = () => {
    const router = useRouter();
    const { fridge } = useLocalSearchParams();
    const fridgeData = fridge ? JSON.parse(fridge) : {};

    const [name, setName] = useState(fridgeData.name || '');
    const [description, setDescription] = useState(fridgeData.description || '');
    const [image, setImage] = useState(fridgeData.image || null);
    const fridgeId = fridgeData.id;

    const handleSave = async () => {
        if (!fridgeId) return;

        const fridgeDocRef = doc(db, "fridges", fridgeId);
        await updateDoc(fridgeDocRef, {
            name: name || fridgeData.name,
            description: description || fridgeData.description,
            image,
        });

        router.push('/fridgeselect');
    };

    const handleDelete = () => {
        Alert.alert(
            "냉장고 삭제",
            "정말로 이 냉장고를 삭제하시겠습니까?",
            [
                {
                    text: "취소",
                    onPress: () => console.log("취소됨"),
                    style: "cancel"
                },
                {
                    text: "삭제",
                    onPress: async () => {
                        if (!fridgeId) return;
                        const fridgeDocRef = doc(db, "fridges", fridgeId);
                        await deleteDoc(fridgeDocRef);
                        router.push('/fridgeselect');
                    },
                    style: "destructive"
                }
            ]
        );
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
                placeholder={fridgeData.name || "냉장고 이름"}
            />
            <Text style={styles.label}>메모</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                placeholder={fridgeData.description || "냉장고 설명"}
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
