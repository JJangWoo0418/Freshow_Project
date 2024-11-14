import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card, Button } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const FridgeSelect = () => {
    const router = useRouter();
    const { newFridge } = useLocalSearchParams();
    const [fridges, setFridges] = useState([]);

    // Firestore에서 냉장고 데이터 가져오기
    const fetchFridges = async () => {
        const fridgeCollection = collection(db, "fridges");
        const fridgeSnapshot = await getDocs(fridgeCollection);
        const fridgesData = fridgeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFridges(fridgesData);
    };

    // 새로운 냉장고 추가
    const addFridge = async (fridgeData) => {
        const fridgeCollection = collection(db, "fridges");
        await addDoc(fridgeCollection, fridgeData);
        fetchFridges(); // 데이터를 추가한 후 다시 불러옵니다.
    };

    // 냉장고 삭제
    const deleteFridge = async (id) => {
        const fridgeDoc = doc(db, "fridges", id);
        await deleteDoc(fridgeDoc);
        fetchFridges(); // 데이터를 삭제한 후 다시 불러옵니다.
    };

    // 삭제 확인 알림
    const confirmDelete = (id) => {
        Alert.alert(
            '삭제 확인',
            '이 냉장고를 삭제하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                { text: '삭제', onPress: () => deleteFridge(id), style: 'destructive' },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        fetchFridges();
    }, []);

    useEffect(() => {
        if (newFridge) {
            const parsedFridge = JSON.parse(newFridge);
            addFridge(parsedFridge);
        }
    }, [newFridge]);

    return (
        <FlatList
            data={fridges}
            ListHeaderComponent={
                <View style={styles.header}>
                    <Image
                        source={require('../assets/Freshow.png')}
                        style={styles.mascot}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => router.push('/fridgeadd')}>
                        <Image
                            source={require('../assets/plus.png')}
                            style={styles.mascot}
                        />
                    </TouchableOpacity>
                </View>
            }
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>냉장고가 없습니다. + 버튼을 눌러 추가하세요.</Text>
                </View>
            }
            renderItem={({ item }) => (
                <Swipeable
                    renderLeftActions={() => (
                        <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
                            <Text style={styles.actionText}>삭제</Text>
                        </TouchableOpacity>
                    )}
                    renderRightActions={() => (
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => router.push('/fridgeedit', { fridge: JSON.stringify(item) })}
                        >
                            <Text style={styles.actionText}>수정</Text>
                        </TouchableOpacity>
                    )}
                >
                    <Card>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Divider />
                        <Card.Image source={item.image} style={styles.fridgeImage} />
                        <Text style={{ marginBottom: 10 }}>{item.description}</Text>
                        <Button
                            icon={
                                <MaterialCommunityIcons
                                    name="fridge"
                                    size={20}
                                    color="#ffffff"
                                    style={{ marginRight: 10 }}
                                />
                            }
                            buttonStyle={{
                                borderRadius: 10,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                            }}
                            title="냉장고 보러가기"
                            onPress={() => router.push('/main')}
                        />
                        <Text style={styles.infoText}>좌우로 스와이프하여 설정해보세요!</Text>
                    </Card>
                </Swipeable>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container} // 스타일 적용
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20, // 하단 여백 추가
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#CDEEFF',
    },
    mascot: {
        width: 50,
        height: 50,
    },
    addButton: {
        padding: 10,
        borderRadius: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#aaa',
    },
    infoText: {
        fontSize: 15,
        color: '#aaa',
        marginLeft: 50,
        marginTop: 10,
    },
    fridgeImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: '#FFB3B3',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
    },
    editButton: {
        backgroundColor: '#B3D9FF',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
    },
    actionText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default FridgeSelect;
