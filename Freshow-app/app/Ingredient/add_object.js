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
    Modal,
    StatusBar,
    Platform,
    KeyboardAvoidingView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebaseconfig";
import styles from '../components/css/Ingredient/add_objectstyle';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from "expo-router";

const add_object = () => {
    const [count, setCount] = useState(0);
    const [selectedType, setSelectedType] = useState("냉장");
    const [productName, setProductName] = useState("");
    const [productMemo, setProductMemo] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [image, setImage] = useState(null);
    const [selectedTag, setSelectedTag] = useState("태그 설정");
    const [unit, setUnit] = useState("");
    const [isTagModalVisible, setIsTagModalVisible] = useState(false);
    const [isCustomTagModalVisible, setIsCustomTagModalVisible] = useState(false);
    const [customTags, setCustomTags] = useState([]);
    const [newTagName, setNewTagName] = useState("");
    const router = useRouter();
    const currentUser = auth.currentUser;
    const { fridgeId } = useLocalSearchParams();

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("권한 필요", "이미지를 선택하려면 갤러리 접근 권한이 필요합니다.");
            }
        })();
    }, []);

    const pickImageAndAnalyze = async () => {
        try {
            // 카메라 실행
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (result.canceled) {
                console.log("사용자가 카메라를 취소했습니다.");
                return;
            }

            const imageUri = result.assets[0].uri;
            setImage(imageUri);

            // 이미지 서버로 전송
            const formData = new FormData();
            formData.append("file", {
                uri: imageUri,
                type: "image/jpeg",
                name: "barcode.jpg",
            });

            try {
                const response = await axios.post(
                    "https://cc83-222-118-68-18.ngrok-free.app/analyze",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                if (response.data.success) {
                    const { productName, manufacturer, imageUrl } = response.data.data;
                    Alert.alert("바코드 인식 성공!", `제품명: ${productName}\n제조사: ${manufacturer}`);
                    setProductName(productName);
                    setImage(imageUrl); // 서버에서 받은 제품 이미지로 업데이트
                } else {
                    Alert.alert("바코드 인식 실패", "제품 정보를 찾을 수 없습니다.");
                }
            } catch (error) {
                console.error("서버 요청 에러:", error);
                Alert.alert("오류", "서버 요청 중 문제가 발생했습니다.");
            }
        } catch (error) {
            console.error("카메라 실행 에러:", error);
            Alert.alert("오류", "카메라 실행 중 문제가 발생했습니다.");
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setExpiryDate(format(date, "yyyyMMdd"));
        hideDatePicker();
    };

    const saveToFirestore = async () => {
        if (!productName || selectedTag === "태그 설정") {
            Alert.alert("오류", "상품 이름과 태그를 입력해주세요.");
            return;
        }
    
        const fridgeRef = doc(
            db,
            `계정/${currentUser.uid}/냉장고/${fridgeId}/재료/${selectedTag}`
        );
    
        const itemData = {
            [productName]: { // 이름을 키로 사용하고, map 타입 데이터 저장
                "남은 수량": count || 0,
                "메모": productMemo || "메모 없음",
                "물건 종류": selectedType,
                "사진": image || "사진 없음", // 선택된 이미지 경로나 기본값
                "용량 단위": unit, 
                "유통기한": expiryDate.replace(/\. /g, "") || "유통기한 없음", // YYYYMMDD 형식
            }
        };
    
        try {
            await setDoc(fridgeRef, itemData, { merge: true }); // 병합 저장
            Alert.alert("👏재료가 추가되었습니다!👏");
            router.back()
        } catch (error) {
            console.error("Firestore 저장 중 오류 발생:", error);
            Alert.alert("오류", "Firestore 저장 중 문제가 발생했습니다.");
        }
    };

    const openTagModal = () => {
        setIsTagModalVisible(true);
    };

    const closeTagModal = () => {
        setIsTagModalVisible(false);
    };

    const selectTag = (tag) => {
        if (tag === "사용자 지정 태그") {
            openCustomTagModal();
        } else {
            setSelectedTag(tag);
            closeTagModal();
        }
    };

    const openCustomTagModal = () => {
        setNewTagName("");
        setIsCustomTagModalVisible(true);
    };

    const closeCustomTagModal = () => {
        setIsCustomTagModalVisible(false);
    };

    const saveCustomTag = () => {
        if (!newTagName.trim()) {
            Alert.alert("오류", "태그 이름을 입력해주세요.");
            return;
        }
    
        const isDuplicate = customTags.some((tag) => tag.label === newTagName);
        if (isDuplicate) {
            Alert.alert("오류", "이미 존재하는 태그 이름입니다.");
            return;
        }
    
        const newTag = { icon: "🔖", label: newTagName }; // 새 태그 생성
        setCustomTags((prevTags) => [...prevTags, newTag]); // customTags 배열 업데이트
        setSelectedTag(newTagName); // 추가된 태그를 현재 선택된 태그로 설정
        closeCustomTagModal(); // 사용자 지정 태그 모달 닫기
    };

    const serviceunready = () => {
        Alert.alert('😭 서비스 준비 중입니다! 😭');
        console.log('😭 서비스 준비 중입니다! 😭')
    }
    

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.title}>물건 추가</Text>
                        <TouchableOpacity style={styles.saveButton} onPress={saveToFirestore}>
                            <Text style={styles.saveButtonText}>  저장</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.expiryButton} onPress={pickImageAndAnalyze}>
                        <Text style={styles.expiryButtonText}>바코드 인식하기</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>사진 등록</Text>
                    <TouchableOpacity style={styles.imageButton} onPress={pickImageAndAnalyze}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.imagePreview} />
                        ) : (
                            <Image source={require('../../assets/PhotoDropIcon.png')} style={styles.imageButtonText}/>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.label}>물건 종류</Text>
                    <View style={styles.itemTypeContainer}>
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    selectedType === "냉장" && styles.selectedToggleButton,
                                ]}
                                onPress={() => setSelectedType("냉장")}
                            >
                                <Text
                                    style={[
                                        styles.toggleButtonText,
                                        selectedType === "냉장" && styles.selectedToggleButtonText,
                                    ]}
                                >
                                    냉장
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    selectedType === "냉동" && styles.selectedToggleButton,
                                ]}
                                onPress={() => setSelectedType("냉동")}
                            >
                                <Text
                                    style={[
                                        styles.toggleButtonText,
                                        selectedType === "냉동" && styles.selectedToggleButtonText,
                                    ]}
                                >
                                    냉동
                                </Text>
                                
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.tagButton} onPress={openTagModal}>
                        <Text style={styles.tagButtonText}>
                            {selectedTag ? selectedTag : "태그 설정"}
                        </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>이름</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="물건의 이름"
                        placeholderTextColor={'gray'}
                        value={productName}
                        onChangeText={setProductName}
                    />

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
                        placeholderTextColor={'gray'}
                        value={unit}
                        onChangeText={setUnit}
                        />
                    </View>

                    

                    <Text style={styles.label}>메모</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="물건의 메모"
                        placeholderTextColor={'gray'}
                        value={productMemo}
                        onChangeText={setProductMemo}
                    />

                    <Text style={styles.label}>유통기한</Text>
                    <TouchableOpacity style={styles.expiryButton} onPress={serviceunready}>
                        <Text style={styles.expiryButtonText}>유통기한 인식하기</Text>
                    </TouchableOpacity>
                    <View style={styles.dateContainer}>
                            <TextInput
                                style={styles.dateInput}
                                placeholder="YYYYMMDD"
                                placeholderTextColor="#999"
                                value={expiryDate}
                                onChangeText={setExpiryDate}
                            />
                            <TouchableOpacity style={styles.calendarIcon} onPress={showDatePicker}>
                                <Text style={styles.calendarIconText}>📅</Text>
                            </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                    <Modal
                        key="tag-modal"
                        animationType="fade"
                        transparent={true}
                        visible={isTagModalVisible}
                        onRequestClose={closeTagModal}
                    >
                        <TouchableOpacity style={styles.modalOverlay} onPress={closeTagModal}>
                            <View style={styles.modalBox}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>태그 설정하기</Text>
                                    <TouchableOpacity onPress={closeTagModal}>
                                        <Text style={styles.closeButton}>×</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.tagList}>
                                    {/* 기본 제공 태그 */}
                                    {[
                                        { icon: "🍖", label: "육류" },
                                        { icon: "🥦", label: "채소류" },
                                        { icon: "🍼", label: "유제품" },
                                        { icon: "🥫", label: "소스" },
                                        { icon: "🍎", label: "과일류" },
                                        { icon: "🍚", label: "곡류/건과류" },
                                        { icon: "🐟", label: "수산물" },
                                        { icon: "🍰", label: "디저트" },
                                        { icon: "❄️", label: "냉동식품" },
                                        { icon: "🍜", label: "면류" },
                                        { icon: "🧃", label: "음료" },
                                        { icon: "🪕", label: "기타" },
                                    ].map((tag, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.tagItem}
                                            onPress={() => selectTag(tag.label)}
                                        >
                                            <Text style={styles.tagIcon}>{tag.icon}</Text>
                                            <Text style={styles.tagLabel}>{tag.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                    {/* 사용자 지정 태그 */}
                                    {customTags.map((tag, index) => (
                                        <TouchableOpacity
                                            key={`custom-${index}`}
                                            style={styles.tagItem}
                                            onPress={() => selectTag(tag.label)}
                                        >
                                            <Text style={styles.tagIcon}>{tag.icon}</Text>
                                            <Text style={styles.tagLabel}>{tag.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                    {/* 사용자 지정 태그 추가 버튼 */}
                                    <TouchableOpacity
                                        style={styles.customTagButton}
                                        onPress={openCustomTagModal}
                                    >
                                        <Text style={styles.customTagText}>+ 사용자 지정 태그</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>


                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isCustomTagModalVisible}
                        onRequestClose={closeCustomTagModal}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalBox}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>사용자 지정 태그</Text>
                                    <TouchableOpacity onPress={closeCustomTagModal}>
                                        <Text style={styles.closeButton}>×</Text>
                                    </TouchableOpacity>
                                </View>

                                <TextInput
                                    style={styles.taginput}
                                    placeholder="태그 이름"
                                    placeholderTextColor={"gray"}
                                    value={newTagName}
                                    onChangeText={setNewTagName}
                                />

                                <TouchableOpacity style={styles.submitButton} onPress={saveCustomTag}>
                                    <Text style={styles.submitButtonText}>저장</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default add_object;
