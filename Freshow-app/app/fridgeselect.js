import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card, Button } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

const FridgeSelect = () => {
    const router = useRouter();
    const { newFridge } = useLocalSearchParams();
    const [fridges, setFridges] = useState([]);

    useEffect(() => {
        if (newFridge) {
            const parsedFridge = JSON.parse(newFridge);
            setFridges((prevFridges) => [
                ...prevFridges,
                { id: String(prevFridges.length + 1), ...parsedFridge },
            ]);
        }
    }, [newFridge]);

    const deleteFridge = (id) => {
        setFridges((prevFridges) => prevFridges.filter(fridge => fridge.id !== id));
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Freshow</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => router.push('/fridgeadd')}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {fridges.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>냉장고가 없습니다. + 버튼을 눌러 추가하세요.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={fridges}
                        renderItem={({ item }) => (
                            <Swipeable
                                renderLeftActions={() => renderLeftActions(item.id)}
                                renderRightActions={() => renderRightActions(item)}
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
                                            borderRadius: 0,
                                            marginLeft: 0,
                                            marginRight: 0,
                                            marginBottom: 0,
                                        }}
                                        title="냉장고 보러가기"
                                        onPress={() => router.push('/main')}
                                    />
                                </Card>
                            </Swipeable>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#CDEEFF',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#CDEEFF',
        padding: 10,
        borderRadius: 20,
    },
    addButtonText: {
        fontSize: 24,
        color: '#000',
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
    fridgeImage: {
        width: '100%',
        height: 200,
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
