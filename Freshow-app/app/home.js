import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Text, TextInput, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS } from "../constants";
import styles from './components/css/homestyle';

const Home = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.White} />
            <Stack.Screen
                options={{
                    headerTitle: "프래시오",
                    headerStyle: { backgroundColor: COLORS.White },
                    headerShadowVisible: false,
                }}
            />
            <View style={styles.topContent}>
                <Image
                    source={require('../assets/Freshow Intro.png')}
                    style={styles.mascot}
                />
            </View>

            <View style={styles.bottomContent}>
                <TextInput
                    style={styles.input}
                    placeholder="이메일"
                    placeholderTextColor={COLORS.gray}
                />

                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry
                    autoCompleteType="off"
                />

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => router.push('Main')}
                >
                    <Image source={require('../assets/LoginBtn.png')}/>
                </TouchableOpacity>

                <Image source={require('../assets/Stick.png')} style={styles.stickBar} />

                <TouchableOpacity style={styles.kakaoButton}>
                    <Image
                        source={require('../assets/KakaoBtn.png')}
                        style={styles.socialIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('register')}>
                    <Image 
                        source={require('../assets/RegisterBtn.png')}
                        style={styles.registerBtn}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Home;

