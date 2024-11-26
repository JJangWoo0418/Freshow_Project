import React, { useState } from "react";
import {
View,
Text,
TextInput,
TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import styles from './components/css/add_objectstyle'

export default function App() {
const [count, setCount] = useState(0);
const [selectedType, setSelectedType] = useState("냉장");
const [productInfo, setProductInfo] = useState(null);
const [expiryDate, setExpiryDate] = useState("");
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

return (
<View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
    <Text style={styles.headerText}>물건 추가</Text>
    <TouchableOpacity>
        <Text style={styles.headerButton}>저장</Text>
    </TouchableOpacity>
    </View>

    {/* Display Product Info */}
    {productInfo && (
    <View style={styles.productInfoContainer}>
        <Text style={styles.label}>상품명: {productInfo.name}</Text>
        <Text style={styles.label}>제조사: {productInfo.manufacturer}</Text>
        <Text style={styles.label}>유통기한: {productInfo.expirationDate}</Text>
    </View>
    )}

    {/* 사진 등록 */}
    <Text style={styles.label}>사진 등록</Text>
    <TouchableOpacity style={styles.imageButton}>
    <Text style={styles.imageButtonText}>사진 등록</Text>
    </TouchableOpacity>

    {/* 물건 종류 */}
    <Text style={styles.label}>물건 종류</Text>
    <View style={styles.itemTypeContainer}>
    <View style={styles.toggleContainer}>
        {/* 냉장 버튼 */}
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

        {/* 냉동 버튼 */}
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

    {/* 태그 설정 버튼 */}
    <TouchableOpacity style={styles.tagButton}>
        <Text style={styles.tagButtonText}>태그 설정</Text>
    </TouchableOpacity>
    </View>

    {/* 이름 입력 */}
    <Text style={styles.label}>이름</Text>
    <TextInput
    style={styles.input}
    placeholder="물건의 이름"
    placeholderTextColor="rgba(0, 0, 0, 0.5)"
    />

    {/* 남은 수량 */}
    <Text style={styles.label}>남은 수량</Text>
    <View style={styles.countContainer}>
    {/* 감소 버튼 */}
    <TouchableOpacity
        style={styles.countButton}
        onPress={() => setCount((prev) => Math.max(0, prev - 1))}
    >
        <Text style={styles.countButtonText}>-</Text>
    </TouchableOpacity>
    {/* 수량 표시 */}
    <Text style={styles.countText}>{count}</Text>
    {/* 증가 버튼 */}
    <TouchableOpacity
        style={styles.countButton}
        onPress={() => setCount((prev) => prev + 1)}
    >
        <Text style={styles.countButtonText}>+</Text>
    </TouchableOpacity>
    {/* 용량 입력 */}
    <TextInput
        style={styles.quantityInput}
        placeholder="용량"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
    />
    </View>

    {/* 메모 */}
    <Text style={styles.label}>메모</Text>
    <TextInput
    style={styles.input}
    placeholder="물건의 메모"
    placeholderTextColor="rgba(0, 0, 0, 0.5)"
    />

    {/* 유통기한 */}
    <Text style={styles.label}>유통기한</Text>
    <View style={styles.expiryContainer}>
    {/* 유통기한 인식 버튼 */}
    <TouchableOpacity style={styles.expiryButton}>
        <Text style={styles.expiryButtonText}>유통기한 인식하기</Text>
    </TouchableOpacity>

    {/* 유통기한 입력 */}
    <View style={styles.dateContainer}>
        <TextInput
        style={styles.dateInput}
        placeholder="YYYY. MM. DD."
        placeholderTextColor="#999"
        value={expiryDate}
        onChangeText={setExpiryDate}
        />
        {/* 달력 아이콘 */}
        <TouchableOpacity style={styles.calendarIcon} onPress={showDatePicker}>
        <View>
            <Text style={styles.calendarIconText}>📅</Text>
        </View>
        </TouchableOpacity>
    </View>
    </View>

    {/* Date Picker Modal */}
    <DateTimePickerModal
    isVisible={isDatePickerVisible}
    mode="date"
    onConfirm={handleConfirm}
    onCancel={hideDatePicker}
    />
</View>
);
}