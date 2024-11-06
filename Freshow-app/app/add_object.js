import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  const handleCountChange = (delta) => {
    setCount(Math.max(0, count + delta));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>물건 추가</Text>
        <Text style={styles.headerButton}>저장</Text>
      </View>

      {/* Barcode Button */}
      <TouchableOpacity style={styles.barcodeButton}>
        <Text style={styles.barcodeButtonText}>바코드 인식하기</Text>
      </TouchableOpacity>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>사진 등록</Text>
        </View>
      </View>

      {/* Item Type */}
      <View style={styles.itemTypeContainer}>
        <TouchableOpacity style={styles.itemTypeButton}>
          <Text style={styles.itemTypeText}>냉장</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemTypeButton}>
          <Text style={styles.itemTypeText}>냉동</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagButtonText}>태그 설정</Text>
        </TouchableOpacity>
      </View>

      {/* Name Input */}
      <Text style={styles.label}>이름</Text>
      <TextInput style={styles.input} placeholder="물건의 이름" />

      {/* Count Section */}
      <Text style={styles.label}>남은 수량</Text>
      <View style={styles.countContainer}>
        <TouchableOpacity style={styles.countButton} onPress={() => handleCountChange(-1)}>
          <Text style={styles.countButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countText}>{count}</Text>
        <TouchableOpacity style={styles.countButton} onPress={() => handleCountChange(1)}>
          <Text style={styles.countButtonText}>+</Text>
        </TouchableOpacity>
        <TextInput style={styles.quantityInput} placeholder="용량" />
      </View>

      {/* Memo Input */}
      <Text style={styles.label}>메모</Text>
      <TextInput style={styles.input} placeholder="물건의 메모" />

      {/* Expiration Date */}
      <Text style={styles.label}>유통기한</Text>
      <TouchableOpacity style={styles.dateButton}>
        <Text style={styles.dateButtonText}>유통기한 인식하기</Text>
      </TouchableOpacity>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>2024. 10. 9.</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  headerButton: {
    fontSize: 16,
    color: "#333",
  },
  barcodeButton: {
    backgroundColor: "#FFB6C1",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  barcodeButtonText: {
    fontSize: 16,
    color: "#333",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: "80%",
    height: 120,
    backgroundColor: "#E0F7FA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  imageText: {
    color: "#333",
  },
  itemTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemTypeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#B3E5FC",
    marginHorizontal: 5,
  },
  itemTypeText: {
    color: "#333",
  },
  tagButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#FFB6C1",
  },
  tagButtonText: {
    color: "#333",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  countButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  countButtonText: {
    fontSize: 20,
    color: "#333",
  },
  countText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  quantityInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
    flex: 1,
  },
  dateButton: {
    backgroundColor: "#FFB6C1",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  dateButtonText: {
    color: "#333",
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  editButton: {
    padding: 5,
  },
  editButtonText: {
    fontSize: 16,
    color: "#333",
  },
});