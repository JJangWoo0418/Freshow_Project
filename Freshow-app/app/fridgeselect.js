import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from './components/css/fridgeselectstyle';

const FridgeSelect = () => {
    const router = useRouter();
    const { newFridge } = useLocalSearchParams(); // fridgeadd에서 전달된 새 냉장고 정보를 받아옴
    const [fridges, setFridges] = useState([]); // 초기에는 빈 냉장고 목록

    // newFridge 데이터가 전달될 때마다 목록에 추가
    useEffect(() => {
        if (newFridge) {
            const parsedFridge = JSON.parse(newFridge);
            setFridges((prevFridges) => [
                ...prevFridges,
                { id: String(prevFridges.length + 1), ...parsedFridge },
            ]);
        }
    }, [newFridge]);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Freshow</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => router.push('/fridgeadd')}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Fridge List or Empty Message */}
            {fridges.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>냉장고가 없습니다. + 버튼을 눌러 추가하세요.</Text>
                </View>
            ) : (
                <FlatList
                    data={fridges}
                    renderItem={({ item }) => (
                        <View style={styles.fridgeCard}>
                            <Image source={item.image} style={styles.fridgeImage} />
                            <View style={styles.fridgeInfo}>
                                <Text style={styles.fridgeName}>{item.name}</Text>
                                <Text style={styles.fridgeDescription}>{item.description}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.settingsButton}
                                onPress={() => router.push('/fridgeedit', { fridge: JSON.stringify(item) })} // fridgeedit으로 이동 및 데이터 전달
                            >
                                <Text style={styles.settingsButtonText}>⚙️</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

export default FridgeSelect;
