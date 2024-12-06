import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const KAKAO_REST_API_KEY = ''; // Kakao REST API 키
const redirectUri = 'https://auth.expo.io/@shim010418/Freshow-App'; // 실제 사용 중인 리다이렉트 URI와 일치하도록 설정

const Login = () => {
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보를 저장할 상태

    const kakaoLogin = async () => {
        try {
            const loginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;
            const result = await WebBrowser.openAuthSessionAsync(loginUrl, redirectUri, { useProxy: false });
            console.log('Login result:', result);

            if (result.type === 'success' && result.url) {
                const code = new URL(result.url).searchParams.get('code');
                console.log('Authorization Code:', code);

                if (code) {
                    await getAccessToken(code);
                } else {
                    Alert.alert('로그인 실패', '인가 코드를 받아오지 못했습니다.');
                }
            } else {
                Alert.alert('로그인 실패', '로그인 과정에서 문제가 발생했습니다.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('로그인 오류', 'Kakao 로그인에 실패했습니다.');
        }
    };

    const getAccessToken = async (code) => {
        try {
            const response = await fetch('https://kauth.kakao.com/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`,
            });
            const json = await response.json();
            console.log('Token Response:', json); // 액세스 토큰 요청 응답 로그

            if (json.access_token) {
                // 여기에 사용자 정보 요청 코드를 추가하여 사용자 정보를 받아옵니다.
                await getUserInfo(json.access_token);
            } else {
                Alert.alert('토큰 요청 실패', json.error_description);
            }
        } catch (error) {
            console.error('Token Request Error:', error);
            Alert.alert('토큰 요청 오류', '토큰을 요청하는 중 문제가 발생했습니다.');
        }
    };

    const getUserInfo = async (accessToken) => {
        try {
            const response = await fetch('https://kapi.kakao.com/v2/user/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const userInfo = await response.json();
            console.log('User Info:', userInfo); // 사용자 정보 로그

            if (userInfo.id) {
                setUserInfo(userInfo); // 사용자 정보 상태에 저장
            } else {
                Alert.alert('사용자 정보 요청 실패', '사용자 정보를 받아올 수 없습니다.');
            }
        } catch (error) {
            console.error('User Info Request Error:', error);
            Alert.alert('사용자 정보 요청 오류', '사용자 정보를 요청하는 중 문제가 발생했습니다.');
        }
    };

    useEffect(() => {
        if (userInfo) {
            console.log('User Info Updated:', userInfo);
            Alert.alert('로그인 성공', `안녕하세요, ${userInfo.kakao_account?.profile?.nickname}님!`);
        }
    }, [userInfo]); // userInfo가 변경될 때마다 실행

    return (
        <View style={styles.container}>
            <Button title="카카오 로그인" onPress={kakaoLogin} />
            {userInfo && (
                <View style={styles.userInfo}>
                    <Text style={styles.text}>사용자 정보:</Text>
                    <Text style={styles.text}>닉네임: {userInfo.kakao_account?.profile?.nickname}</Text>
                    <Text style={styles.text}>이메일: {userInfo.kakao_account?.email || '이메일 정보 없음'}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    userInfo: {
        marginTop: 20,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
        width: '90%',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default Login;
