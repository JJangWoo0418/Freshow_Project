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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { doc, setDoc } from "firebase/firestore"; // Firestore 관련 함수
import { auth, db } from "./firebaseconfig"; // Firebase 설정
import styles from "./components/css/add_objectstyle";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const add_object = () => {
    const router = useRouter();
    const { productName: initialProductName, imageUrl, fridgeId } = useLocalSearchParams();
    const [count, setCount] = useState(0);
    const [selectedType, setSelectedType] = useState("냉장");
    const [productName, setProductName] = useState(initialProductName || "");
    const [productMemo, setProductMemo] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [image, setImage] = useState(imageUrl || null);
    const [selectedTag, setSelectedTag] = useState("태그 설정");
    const [unit, setUnit] = useState("");
    const [isTagModalVisible, setIsTagModalVisible] = useState(false);
    const [isCustomTagModalVisible, setIsCustomTagModalVisible] = useState(false);
    const [customTags, setCustomTags] = useState([]);
    const [newTagName, setNewTagName] = useState("");
    const currentUser = auth.currentUser;

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("권한 필요", "이미지를 선택하려면 갤러리 접근 권한이 필요합니다.");
            }
        })();
    }, []);

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
            name: productName,
            count: count || 0,
            memo: productMemo || "메모 없음",
            type: selectedType,
            image: image || "사진 없음",
            unit: unit,
            expiryDate: expiryDate.replace(/\. /g, "") || "유통기한 없음",
            createdAt: new Date().toISOString(),
        };

        try {
            await setDoc(fridgeRef, { [productName]: itemData }, { merge: true });
            Alert.alert("저장 완료", "재료가 성공적으로 저장되었습니다!");
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

        const newTag = { icon: "🔖", label: newTagName };
        setCustomTags((prevTags) => [...prevTags, newTag]);
        setSelectedTag(newTagName);
        closeCustomTagModal();
    };

    const serviceunready = () => {
        Alert.alert("😭 서비스 준비 중입니다! 😭");
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
                        <Text style={styles.title}>물건 추가</Text>
                        <TouchableOpacity style={styles.saveButton} onPress={saveToFirestore}>
                            <Text style={styles.saveButtonText}> 저장</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.expiryButton}
                        onPress={() => router.push("/webcamera")}
                    >
                        <Text style={styles.expiryButtonText}>바코드 인식하기</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>사진 등록</Text>
                    <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.imagePreview} />
                        ) : (
                            <Image
                                source={require("../assets/PhotoDropIcon.png")}
                                style={styles.imageButtonText}
                            />
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
                            value={unit}
                            onChangeText={setUnit}
                        />
                    </View>

                    <Text style={styles.label}>메모</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="물건의 메모"
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
                            placeholder="YYYY. MM. DD."
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

                    {/* 태그 모달 */}
                    <Modal
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
                                    {[
                                        { icon: "🍖", label: "육류" },
                                        { icon: "🥦", label: "채소류" },
                                        { icon: "🍼", label: "유제품" },
                                        { icon: "🥫", label: "소스" },
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

                    {/* 사용자 지정 태그 추가 */}
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
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={saveCustomTag}
                                >
                                    <Text style={styles.submitButtonText}>저장</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default add_object;
