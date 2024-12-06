import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

export default function WebBarcodeScanner() {
const [barcodeData, setBarcodeData] = useState('');
const [error, setError] = useState('');
const [isScanning, setIsScanning] = useState(true);

useEffect(() => {
if (isScanning) {
    const scanner = new Html5QrcodeScanner('reader', {
    fps: 10, // 초당 프레임
    qrbox: { width: 250, height: 250 }, // QR 코드 스캔 영역 크기
    });

    scanner.render(
    (decodedText) => {
        console.log('Decoded data:', decodedText);
        setBarcodeData(decodedText);
        setIsScanning(false); // 스캔 성공 시 정지
        sendBarcodeToServer(decodedText); // 서버로 데이터 전송
    },
    (err) => {
        console.error('Scanning error:', err.message || err);
        setError('Error scanning barcode. Ensure it is visible and well-lit.');
    }
    );

    return () => {
    scanner.clear(); // 컴포넌트가 언마운트될 때 스캐너 정리
    };
}
}, [isScanning]);

const sendBarcodeToServer = async (barcode) => {
    try {
        const response = await axios.get('http://localhost:3000/',{
            params: {
                barcode: barcode
            }
        });
    console.log('Server Response:', response.data);
} catch (error) {
    console.error('Failed to send barcode data:', error.response?.data || error.message);
    setError('Failed to send barcode data to server. ' + (error.response?.data || ''));
}
};

const testButton = async()=>{
    try {
        const response = await axios.get('http://localhost:3000/');
        console.log('Server Response:', response.data);
        } catch (error) {
        console.error('Failed to send barcode data:', error.response?.data || error.message);
        }
    };

return (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h1>Web Barcode Scanner</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {isScanning ? (
    <div id="reader" style={{ width: '100%', maxWidth: 400 }}></div>
    ) : (
    <p>Scanned Barcode: {barcodeData}</p>
    )}
    {!isScanning && (
    <button onClick={() => sendBarcodeToServer(barcodeData)} style={{ marginTop: '20px' }}>
        Scan Again
    </button>
    )}

<button onClick={() => sendBarcodeToServer(barcodeData)} style={{ marginTop: '20px' }}>
        Scan Again
    </button>
</div>
);

}