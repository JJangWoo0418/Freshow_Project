import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "expo-router";
import axios from "axios";

export default function WebBarcodeScanner() {
    const [barcodeData, setBarcodeData] = useState("");
    const [productData, setProductData] = useState(null); // 서버에서 받은 데이터 저장
    const [error, setError] = useState("");
    const [isScanning, setIsScanning] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (isScanning) {
            const scanner = new Html5QrcodeScanner("reader", {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            });

            scanner.render(
                (decodedText) => {
                    console.log("Decoded data:", decodedText);
                    setBarcodeData(decodedText);
                    setIsScanning(false);
                    fetchProductData(decodedText);
                },
                (err) => {
                    console.error("Scanning error:", err.message || err);
                    setError("바코드가 잘 안보여요... 잘 보이게 해주세요!");
                }
            );

            return () => {
                scanner.clear();
            };
        }
    }, [isScanning]);

    const fetchProductData = async (barcode) => {
        try {
            const response = await axios.post("http://localhost:3000/", { barcode });
            console.log("Server Response:", response.data);
            if (response.data.success) {
                setProductData(response.data.data);
            } else {
                setError("상품 정보를 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error("Failed to fetch product data:", error.response?.data || error.message);
            setError("서버에서 데이터를 가져오는데 실패했습니다.");
        }
    };

    const applyProductData = () => {
        if (productData) {
            router.push({
                pathname: "/add_object",
                params: {
                    productName: productData.productName || "",
                    imageUrl: productData.imageUrl || "",
                },
            });
        } else {
            setError("상품 데이터를 적용할 수 없습니다.");
        }
    };

    return (
        <div
            style={{
                fontFamily: "'Arial', sans-serif",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100vh",
                overflowY: "auto", // 스크롤 가능하도록 설정
                backgroundColor: "#CDEEFF",
                padding: "20px",
            }}
        >
            <h1 style={{ color: "#333333", fontSize: "22px", fontWeight: "600", marginBottom: "16px" }}>
                바코드를 스캔해 상품 정보를 확인하세요!
            </h1>
            {error && <p style={{ color: "#FF5555", fontSize: "14px", marginBottom: "16px" }}>{error}</p>}
            {isScanning ? (
                <div
                    id="reader"
                    style={{
                        width: "100%",
                        maxWidth: 400,
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #E0E0E0",
                        borderRadius: "12px",
                        padding: "10px",
                        marginBottom: "16px",
                    }}
                ></div>
            ) : (
                productData && (
                    <div
                        style={{
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#333333",
                            marginBottom: "16px",
                            textAlign: "left",
                            width: "100%",
                            maxWidth: 400,
                            backgroundColor: "#FFFFFF",
                            border: "2px solid #E0E0E0",
                            borderRadius: "12px",
                            padding: "10px",
                        }}
                    >
                        <p><strong>바코드:</strong> {productData.barcode}</p>
                        <p><strong>상품명:</strong> {productData.productName}</p>
                        <p><strong>제조사:</strong> {productData.manufacturer}</p>
                        {productData.imageUrl ? (
                            <img
                                src={productData.imageUrl}
                                alt="Product"
                                style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
                            />
                        ) : (
                            <p style={{ color: "#999" }}>이미지가 제공되지 않았습니다.</p>
                        )}
                    </div>
                )
            )}
            <button
                onClick={() => setIsScanning(true)}
                style={{
                    backgroundColor: "#FFC0CB",
                    color: "#FFFFFF",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "500",
                    border: "none",
                    marginTop: "16px",
                    cursor: "pointer",
                }}
            >
                다시 스캔하기
            </button>
            <button
                onClick={applyProductData}
                style={{
                    backgroundColor: "#32CD32",
                    color: "#FFFFFF",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "500",
                    border: "none",
                    marginTop: "16px",
                }}
            >
                적용하기
            </button>
            <button
                onClick={() => router.push("/add_object")}
                style={{
                    backgroundColor: "#FF8C00",
                    color: "#FFFFFF",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "500",
                    border: "none",
                    marginTop: "16px",
                }}
            >
                돌아가기
            </button>
        </div>
    );
}
