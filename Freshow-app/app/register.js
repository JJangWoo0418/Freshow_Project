import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import styles from './components/css/registerstyle';
import { COLORS } from "../constants";

const Register = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (confirmPassword && text !== confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        if (password && text !== password) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <Stack.Screen
                options={{
                    headerTitle: "회원가입",
                    headerStyle: { backgroundColor: "#FFFFFF" },
                    headerShadowVisible: false,
                }}
            />

            <View style={styles.content}>
                <Text style={styles.title}>회원가입</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="아이디"
                        placeholderTextColor={COLORS.gray}
                    />
                    <TouchableOpacity style={styles.duplicateCheckButton}>
                        <Text style={styles.duplicateCheckText}>중복 확인</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry
                    value={password}
                    onChangeText={handlePasswordChange}
                />
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호 확인"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                />
                
                {passwordError ? (
                    <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}

                <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>회원가입</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>이미 계정이 있나요?</Text>
                    <TouchableOpacity onPress={() => router.push('Login')}>
                        <Text style={styles.loginLink}>로그인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Register;
