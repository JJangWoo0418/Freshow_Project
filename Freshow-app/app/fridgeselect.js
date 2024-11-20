import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Image, ScrollView, StatusBar} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card, Button } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { db } from './firebaseconfig';
import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import styles from './components/css/fridgeselectstyle';

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

    // 새로운 냉장고 추가 (순차적 ID 생성)
    const addFridge = async (fridgeData) => {
        const fridgeCollection = collection(db, "fridges");

        const fridgeSnapshot = await getDocs(fridgeCollection);
        const fridgeIds = fridgeSnapshot.docs.map(doc => doc.id);

        const maxId = fridgeIds.reduce((max, id) => {
            const num = parseInt(id.replace('fridge', ''));
            return num > max ? num : max;
        }, 0);

        const newId = `fridge${maxId + 1}`;
        const fridgeDoc = doc(fridgeCollection, newId);
        await setDoc(fridgeDoc, fridgeData);

        // 추가 후 즉시 최신 데이터를 불러옴
        fetchFridges();
    };

    // 냉장고 삭제
    const deleteFridge = async (id) => {
        const fridgeDoc = doc(db, "fridges", id);
        await deleteDoc(fridgeDoc);
        fetchFridges(); 
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
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content"/>
            {/* Header를 ScrollView와 FlatList 외부에 배치 */}
            <View style={styles.header}>
                <Image
                    source={require('../assets/Freshow.png')}
                    style={styles.freshow}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => router.push('/fridgeadd')}>
                    <Image
                        source={require('../assets/plus.png')}
                        style={styles.mascot}
                    />
                </TouchableOpacity>
            </View>

            {/* Scrollable content */}
            <ScrollView>
                <FlatList
                    data={fridges}
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
                    contentContainerStyle={styles.container}
                />
            </ScrollView>
        </View>
    );
};

export default FridgeSelect;
