import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
  const [count, setCount] = useState(0);
  const [selectedType, setSelectedType] = useState("냉장");
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [productInfo, setProductInfo] = useState(null); // 바코드로 가져온 상품 정보 상태

  const API_KEY = "47ca0c2f56d24717bafb"; // 한국식품안전정보원 API 키

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleCountChange = (delta) => {
    setCount(Math.max(0, count + delta));
  };

  const openCamera = () => {
    if (hasPermission) {
      setIsCameraOpen(true);
    } else {
      alert("카메라 권한이 필요합니다.");
    }
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setIsCameraOpen(false); // 바코드를 인식하면 카메라를 닫음
    await fetchProductInfo(data); // 바코드 번호로 정보 조회
  };

  const fetchProductInfo = async (barcode) => {
    try {
      const response = await fetch(
        `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/I2570/json/1/5/BRCD_NO=${barcode}`
      );
      const data = await response.json();
      if (data.I2570.row && data.I2570.row.length > 0) {
        setProductInfo({
          name: data.I2570.row[0].PRDT_NM,
          manufacturer: data.I2570.row[0].BSSH_NM,
          expirationDate: data.I2570.row[0].POG_DAYCNT,
        });
      } else {
        alert("상품 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("상품 정보를 가져오는 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>물건 추가</Text>
        <Text style={styles.headerButton}>저장</Text>
      </View>

      {/* Barcode Button */}
      <TouchableOpacity style={styles.barcodeButton} onPress={openCamera}>
        <Text style={styles.barcodeButtonText}>바코드 인식하기</Text>
      </TouchableOpacity>

      {/* Camera Modal */}
      {isCameraOpen && (
        <Modal visible={isCameraOpen} animationType="slide">
          <View style={styles.cameraContainer}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={styles.camera}
            />
            <TouchableOpacity style={styles.closeButton} onPress={closeCamera}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Display Product Info */}
      {productInfo && (
        <View style={styles.productInfoContainer}>
          <Text style={styles.label}>상품명: {productInfo.name}</Text>
          <Text style={styles.label}>제조사: {productInfo.manufacturer}</Text>
          <Text style={styles.label}>유통기한: {productInfo.expirationDate}</Text>
        </View>
      )}

      {/* Image Section */}
      <Text style={styles.label}>사진 등록</Text>
      <TouchableOpacity style={styles.imageButton}>
        <Text style={styles.imageButtonText}>사진 등록</Text>
      </TouchableOpacity>

      {/* Item Type Label and Toggle */}
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
        <TouchableOpacity style={styles.tagButton}>
          <Text style={styles.tagButtonText}>태그 설정</Text>
        </TouchableOpacity>
      </View>

      {/* Name Input */}
      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="물건의 이름"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />

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
        <TextInput
          style={styles.quantityInput}
          placeholder="용량"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />
      </View>

      {/* Memo Input */}
      <Text style={styles.label}>메모</Text>
      <TextInput
        style={styles.input}
        placeholder="물건의 메모"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
      />

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
    borderWidth: 1,
    borderColor: "#000",
  },
  barcodeButtonText: {
    fontSize: 16,
    color: "#333",
  },
  imageButton: {
    backgroundColor: "#E0F7FA",
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
  imageButtonText: {
    color: "#333",
    fontSize: 16,
  },
  itemTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#000",
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B3E5FC",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedToggleButton: {
    backgroundColor: "#81D4FA",
  },
  toggleButtonText: {
    color: "#333",
  },
  selectedToggleButtonText: {
    fontWeight: "bold",
  },
  tagButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#FFB6C1",
    borderWidth: 1,
    borderColor: "#000",
    marginLeft: 10,
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
    borderColor: "#000",
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
    borderColor: "#000",
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
    borderColor: "#000",
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
    borderWidth: 1,
    borderColor: "#000",
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
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  camera: {
    width: "100%",
    height: "80%",
  },
  closeButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#FFB6C1",
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#333",
    fontSize: 16,
  },
});