import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import styles from './components/css/add_objectstyle';

export default function App() {
    const [count, setCount] = useState(0);
    const [selectedType, setSelectedType] = useState("냉장");
    const [productInfo, setProductInfo] = useState(null);
    const [expiryDate, setExpiryDate] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [image, setImage] = useState(null);
    const [isTagModalVisible, setIsTagModalVisible] = useState(false);
    const [selectedTag, setSelectedTag] = useState("태그 설정");
    const [isCustomTagModalVisible, setIsCustomTagModalVisible] = useState(false); 
    const [customTags, setCustomTags] = useState([]); 
    const [newTagName, setNewTagName] = useState(""); 
    const [newTagContent, setNewTagContent] = useState(""); 

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("권한 필요", "이미지를 선택하려면 갤러리 접근 권한이 필요합니다.");
            }
        })();
    }, []);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
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
            setSelectedTag(tag); // 선택된 태그 업데이트
            closeTagModal(); // 모달 닫기
        }
    };

    // 사용자 지정 태그 모달 열기
    const openCustomTagModal = () => {
        setNewTagName("");
        setNewTagContent("");
        setIsCustomTagModalVisible(true);
    };
    const closeCustomTagModal = () => setIsCustomTagModalVisible(false);

    // 사용자 지정 태그 저장
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

        // 새로운 태그 추가
        const newTag = { icon: "🔖", label: newTagName };
        setCustomTags((prevTags) => [...prevTags, newTag]);
        setSelectedTag(newTagName); // 선택된 태그 업데이트
        closeCustomTagModal(); // 사용자 지정 태그 모달 닫기
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>물건 추가</Text>
                    <TouchableOpacity>
                        <Text style={styles.headerButton}>저장</Text>
                    </TouchableOpacity>
                </View>

                {productInfo && (
                    <View style={styles.productInfoContainer}>
                        <Text style={styles.label}>상품명: {productInfo.name}</Text>
                        <Text style={styles.label}>제조사: {productInfo.manufacturer}</Text>
                        <Text style={styles.label}>유통기한: {productInfo.expirationDate}</Text>
                    </View>
                )}

                <Text style={styles.label}>사진 등록</Text>
                <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.imagePreview} />
                    ) : (
                        <Text style={styles.imageButtonText}>사진 등록</Text>
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
                    placeholderTextColor="rgba(0, 0, 0, 0.5)"
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
                        style={styles.quantityInput}
                        placeholder="용량"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                    />
                </View>

                <Text style={styles.label}>메모</Text>
                <TextInput
                    style={styles.input}
                    placeholder="물건의 메모"
                    placeholderTextColor="rgba(0, 0, 0, 0.5)"
                />

                <Text style={styles.label}>유통기한</Text>
                <View style={styles.expiryContainer}>
                    <TouchableOpacity style={styles.expiryButton}>
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
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                {/* 태그 설정 모달 */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isTagModalVisible}
                    onRequestClose={closeTagModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>태그 설정하기</Text>
                                <TouchableOpacity onPress={closeTagModal}>
                                    <Text style={styles.closeButton}>×</Text>
                                </TouchableOpacity>
                            </View>

                            {/* 기본 태그 및 사용자 지정 태그 목록 */}
                            <View style={styles.tagList}>
                                {/* 기본 태그 */}
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
                    </View>
                </Modal>

                {/* 사용자 지정 태그 모달 */}
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

                            {/* 태그 이름 입력 */}
                            <TextInput
                                style={styles.input}
                                placeholder="태그 이름"
                                value={newTagName}
                                onChangeText={setNewTagName}
                            />

                            {/* 저장 버튼 */}
                            <TouchableOpacity style={styles.submitButton} onPress={saveCustomTag}>
                                <Text style={styles.submitButtonText}>저장</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}