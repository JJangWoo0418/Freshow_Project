import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Image, ScrollView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Button } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { auth, db } from './firebaseconfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import styles from './components/css/fridgeselectstyle';

const FridgeSelect = () => {
    const router = useRouter();
    const [fridges, setFridges] = useState([]);

    const fetchFridges = async () => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            Alert.alert("로그인 필요", "냉장고 데이터를 불러오려면 로그인이 필요합니다.");
            router.push('/login'); // 로그인 페이지로 리다이렉트
            return;
        }

        try {
            const fridgeCollection = collection(db, "계정", currentUser.uid, "냉장고");
            const fridgeSnapshot = await getDocs(fridgeCollection);

            const fetchedFridges = fridgeSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setFridges(fetchedFridges);
        } catch (error) {
            console.error("냉장고 데이터 가져오기 오류:", error);
        }
    };

    const deleteFridge = async (id) => {
        const currentUser = auth.currentUser;

        if (!currentUser) return;

        try {
            const fridgeDoc = doc(db, "계정", currentUser.uid, "냉장고", id);
            await deleteDoc(fridgeDoc);
            fetchFridges(); // 삭제 후 데이터 재로드
        } catch (error) {
            console.error("냉장고 삭제 오류:", error);
        }
    };

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

    const renderLeftActions = (id) => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(id)}>
            <Text style={styles.actionText}>삭제</Text>
        </TouchableOpacity>
    );

    const renderRightActions = (item) => (
        <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push('/fridgeedit', { fridge: JSON.stringify(item) })}
        >
            <Text style={styles.actionText}>수정</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
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

            <ScrollView>
                <FlatList
                    data={fridges}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Swipeable
                            renderLeftActions={() => renderLeftActions(item.id)}
                            renderRightActions={() => renderRightActions(item)}
                        >
                            <Card>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Divider />
                                <Card.Image
                                    source={item.image ? { uri: item.image.uri } : null}
                                    style={styles.fridgeImage}
                                />
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
                                    title="냉장고 선택"
                                    onPress={() => router.push(`/mainpage?fridgeId=${item.id}`)} // fridgeId를 URL로 전달
                                />
                            </Card>
                        </Swipeable>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>냉장고가 없습니다. + 버튼을 눌러 추가하세요.</Text>
                        </View>
                    }
                />
            </ScrollView>
        </View>
    );
};

export default FridgeSelect;
