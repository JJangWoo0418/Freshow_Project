import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseconfig";
import styles from './components/css/add_objectstyle';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from "expo-router";

const edit_object = () => {
    const router = useRouter();
    const { fridgeId, tag, itemName, image, expiryDate, memo, remaining, type, unit } = useLocalSearchParams();
    console.log("라우팅된 데이터:", { fridgeId, tag, itemName, image, expiryDate, memo, remaining, type, unit });
    // State 초기화
    const [productName, setProductName] = useState('');
    const [productMemo, setProductMemo] = useState('');
    const [count, setCount] = useState(0);
    const [unitState, setUnit] = useState('');
    const [expiryDateState, setExpiryDate] = useState('');
    const [imageState, setImage] = useState(null);
    const [selectedType, setSelectedType] = useState('냉장');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // Firestore에서 데이터 가져오기
    const fetchData = async () => {
        try {
            console.log("Fetching data for fridgeId:", fridgeId, "tag:", tag, "itemName:", itemName);
    
            // Firestore 문서 참조
            const docRef = doc(db, `계정/${auth.currentUser.uid}/냉장고/${fridgeId}/재료/${tag}`);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
    
                // 선택된 항목의 데이터 가져오기
                const data = docSnap.data()[itemName];
                if (data) {
                    // 데이터 상태 업데이트
                    setProductName(itemName || '');
                    setCount(data?.["남은 수량"] || 0);
                    setProductMemo(data?.["메모"] || '');
                    setSelectedType(data?.["물건 종류"] || '냉장');
                    setImage(data?.["사진"] || null);
                    setUnit(data?.["용량 단위"] || '');
                    setExpiryDate(data?.["유통기한"] || '');
    
                    console.log("Fetched item data:", data);
                } else {
                    Alert.alert("오류", "선택한 항목의 데이터를 찾을 수 없습니다.");
                }
            } else {
                Alert.alert("오류", "태그 데이터를 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error("데이터 가져오기 오류:", error.message); // 오류 메시지 출력
            Alert.alert("오류", "데이터를 가져오는 중 문제가 발생했습니다.");
        }
    };
    
    useEffect(() => {
        if (fridgeId && tag && itemName) {
            fetchData();
        } else {
            console.error("필수 데이터가 누락되었습니다:", { fridgeId, tag, itemName });
        }
    }, [fridgeId, tag, itemName]);
    

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "images",
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

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setExpiryDate(format(date, "yyyy. MM. dd"));
        hideDatePicker();
    };

    const saveEditsToFirestore = async () => {
        if (!productName) {
            Alert.alert("오류", "상품 이름을 입력해주세요.");
            return;
        }

        const docRef = doc(db, `계정/${auth.currentUser.uid}/냉장고/${fridgeId}/재료/${tag}`);
        const updatedData = {
            [productName]: {
                "남은 수량": count,
                "메모": productMemo || "메모 없음",
                "물건 종류": selectedType,
                "사진": imageState || "사진 없음",
                "용량 단위": unitState || "단위 없음",
                "유통기한": expiryDateState || "유통기한 없음",
            },
        };

        try {
            await setDoc(docRef, updatedData, { merge: true });
            Alert.alert("수정이 완료되었습니다!");
            router.back(); // 이전 화면으로 돌아가기
        } catch (error) {
            console.error("Firestore 저장 오류:", error);
            Alert.alert("오류", "수정 저장 중 문제가 발생했습니다.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.title}>물건 수정</Text>
                        <TouchableOpacity style={styles.saveButton} onPress={saveEditsToFirestore}>
                            <Text style={styles.saveButtonText}>수정 완료</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 사진 등록 */}
                    <Text style={styles.label}>사진 등록</Text>
                    <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                        {imageState ? (
                            <Image source={{ uri: imageState }} style={styles.imagePreview} />
                        ) : (
                            <Image source={require('../assets/PhotoDropIcon.png')} style={styles.imageButtonText} />
                        )}
                    </TouchableOpacity>

                    {/* 물건 종류 */}
                    <Text style={styles.label}>물건 종류</Text>
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                selectedType === "냉장" && styles.selectedToggleButton,
                            ]}
                            onPress={() => setSelectedType("냉장")}
                        >
                            <Text style={styles.toggleButtonText}>냉장</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                selectedType === "냉동" && styles.selectedToggleButton,
                            ]}
                            onPress={() => setSelectedType("냉동")}
                        >
                            <Text style={styles.toggleButtonText}>냉동</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 이름 입력 */}
                    <Text style={styles.label}>이름</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="물건의 이름"
                        value={productName}
                        onChangeText={setProductName}
                    />

                    {/* 남은 수량 및 단위 */}
                    <Text style={styles.label}>남은 수량</Text>
                    <View style={styles.countContainer}>
                        <TouchableOpacity
                            style={styles.countButton}
                            onPress={() => setCount((prev) => Math.max(0, prev - 1))}
                        >
                            <Text style={styles.countButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.countText}>{count}</Text>
                        <TouchableOpacity
                            style={styles.countButton}
                            onPress={() => setCount((prev) => prev + 1)}
                        >
                            <Text style={styles.countButtonText}>+</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.unitput}
                            placeholder="용량 단위"
                            value={unitState}
                            onChangeText={setUnit}
                        />
                    </View>

                    {/* 메모 */}
                    <Text style={styles.label}>메모</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="물건의 메모"
                        value={productMemo}
                        onChangeText={setProductMemo}
                    />

                    {/* 유통기한 */}
                    <Text style={styles.label}>유통기한</Text>
                    <View style={styles.dateContainer}>
                        <TextInput
                            style={styles.dateInput}
                            placeholder="YYYY. MM. DD"
                            value={expiryDateState}
                            onChangeText={setExpiryDate}
                        />
                        <TouchableOpacity onPress={showDatePicker}>
                            <Text style={styles.calendarIconText}>📅</Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default edit_object;
