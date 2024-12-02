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
    Modal
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { doc, getDoc, setDoc, updateDoc, deleteField } from "firebase/firestore";
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
    const [isTagModalVisible, setIsTagModalVisible] = useState(false);
    const [isCustomTagModalVisible, setIsCustomTagModalVisible] = useState(false); 
    const [customTags, setCustomTags] = useState([]); 
    const [newTagName, setNewTagName] = useState("");
    const [selectedTag, setSelectedTag] = useState("태그 설정");

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
                    setSelectedTag(tag || "태그 설정"); // 태그 상태 업데이트
    
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
        if (!productName || !selectedTag || selectedTag === "태그 설정") {
            Alert.alert("오류", "상품 이름과 태그를 입력해주세요.");
            return;
        }
    
        const docRef = doc(db, `계정/${auth.currentUser.uid}/냉장고/${fridgeId}/재료/${selectedTag}`);
    
        const newData = {
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
            // 기존 데이터 가져오기
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const existingData = docSnap.data();
    
                // 기존 데이터를 병합
                const updatedData = { ...existingData, ...newData };
    
                // Firestore 업데이트
                await updateDoc(docRef, updatedData);
            } else {
                // 문서가 없는 경우 새로 생성
                await setDoc(docRef, newData);
            }
    
            Alert.alert("👏 물건이 성공적으로 추가되었습니다! 👏");
            router.back(); // 이전 화면으로 돌아가기
        } catch (error) {
            console.error("Firestore 저장 오류:", error.message);
            Alert.alert("오류", "물건 저장 중 문제가 발생했습니다.");
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

    const saveCustomTag = async () => {
        if (!newTagName.trim()) {
            Alert.alert("오류", "태그 이름을 입력해주세요.");
            return;
        }
    
        // Firestore 문서 경로
        const newDocRef = doc(db, `계정/${auth.currentUser.uid}/냉장고/${fridgeId}/재료/${newTagName}`);
    
        try {
            // Firestore에 새 태그 생성 (빈 데이터로 초기화)
            await setDoc(newDocRef, {});
    
            // 사용자 지정 태그 추가
            const newTag = { icon: "🔖", label: newTagName }; // 새 태그 데이터 생성
            setCustomTags((prevTags) => [...prevTags, newTag]);
            setSelectedTag(newTagName); // 새 태그를 현재 선택된 태그로 설정
            closeCustomTagModal();
    
            Alert.alert("👏 새 태그가 성공적으로 추가되었습니다! 👏");
        } catch (error) {
            console.error("태그 생성 중 오류:", error.message);
            Alert.alert("오류", "새 태그 생성 중 문제가 발생했습니다.");
        }
    };
    

    const serviceunready = () => {
        Alert.alert('😭 서비스 준비 중입니다! 😭');
        console.log('😭 서비스 준비 중입니다! 😭')
    }

    const deleteItemFromFirestore = async () => {
        if (!selectedTag || !productName) {
            Alert.alert("오류", "삭제할 항목이 유효하지 않습니다.");
            return;
        }
    
        const docRef = doc(db, `계정/${auth.currentUser.uid}/냉장고/${fridgeId}/재료/${selectedTag}`);
    
        try {
            // Firestore에서 해당 항목 삭제
            await updateDoc(docRef, {
                [productName]: deleteField(),
            });
    
            Alert.alert("👏 물건이 성공적으로 삭제되었습니다! 👏");
            router.back(); // 이전 화면으로 돌아가기
        } catch (error) {
            console.error("물건 삭제 중 오류:", error.message);
            Alert.alert("오류", "물건 삭제 중 문제가 발생했습니다.");
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
                            <Text style={styles.saveButtonText}>저장</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.expiryButton} onPress={serviceunready}>
                        <Text style={styles.expiryButtonText}>바코드 인식하기</Text>
                    </TouchableOpacity>

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
                    <View style={styles.itemTypeContainer}>
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                selectedType === "냉장" && styles.selectedToggleButton,
                            ]}
                            onPress={() => setSelectedType("냉장")}
                        >
                            <Text style={[
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
                    <TouchableOpacity style={styles.expiryButton} onPress={serviceunready}>
                        <Text style={styles.expiryButtonText}>유통기한 인식하기</Text>
                    </TouchableOpacity>
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
                    
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => {
                            Alert.alert(
                                "삭제 확인",
                                "정말로 이 물건을 삭제하시겠습니까?",
                                [
                                    { text: "취소", style: "cancel" },
                                    {
                                        text: "삭제",
                                        style: "destructive",
                                        onPress: deleteItemFromFirestore,
                                    },
                                ]
                            );
                        }}
                    >
                        <Text style={styles.expiryButtonText}>삭제하기</Text>
                    </TouchableOpacity>


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
                        <View style={styles.modalOverlay}>
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
                                            <Text style={styles.tagIcon}>🔖</Text>
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
                        </View>
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
    );
};

export default edit_object;
