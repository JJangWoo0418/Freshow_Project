import React, { useEffect, useState } from "react";
import { Linking, View, Button, Text, Alert } from "react-native";
import axios from "axios";

// 서버의 네트워크 IP 주소 (환경 변수 또는 기본값 사용)
const SERVER_IP = "http://192.168.0.101:3000"; // 노트북의 네트워크 IP로 변경

const Expo_Linking = () => {
    const [barcodeData, setBarcodeData] = useState(null);

    // 딥 링크 처리
    useEffect(() => {
        const handleDeepLink = (event) => {
            const url = event.url;
            const scannedData = new URL(url).searchParams.get("data");
            console.log("Received Barcode Data:", scannedData);
            setBarcodeData(scannedData);

            // 서버로 데이터 전송
            sendBarcodeToServer(scannedData);
        };

        Linking.addEventListener("url", handleDeepLink);

        return () => {
            Linking.removeEventListener("url", handleDeepLink);
        };
    }, []);

    // 서버로 데이터 전송
    const sendBarcodeToServer = async (barcode) => {
        try {
            const response = await axios.post(`${SERVER_IP}/`, {
                barcode,
            });
            console.log("Server Response:", response.data);
            Alert.alert("Success", "Barcode data sent to server successfully.");
        } catch (error) {
            console.error("Failed to send barcode data:", error.message);
            Alert.alert("Error", "Failed to send barcode data to server.");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button
                title="Open Barcode Scanner"
                onPress={() =>
                    Linking.openURL("https://my-web-12dfugmke-jeongwoos-projects-f271bd67.vercel.app") // 웹 앱 URL
                }
            />
            {barcodeData && <Text>Scanned Barcode: {barcodeData}</Text>}
        </View>
    );
};

export default Expo_Linking;