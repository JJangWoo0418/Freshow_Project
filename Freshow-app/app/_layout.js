// app/_layout.js
import React, { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function Layout() {
    // 폰트 로딩
    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/ONE Mobile POP.ttf'), // 확장자 .ttf로 변경
        DMMedium: require('../assets/ONE Mobile POP.ttf'), // 확장자 .ttf로 변경
        DMRegular: require('../assets/ONE Mobile POP.ttf') // 확장자 .ttf로 변경
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync(); // 폰트가 로드되면 splash screen 숨김
        }
    }, [fontsLoaded]);

    // 폰트가 로드되지 않았으면 아무것도 렌더링하지 않음
    if (!fontsLoaded) {
        return null;
    }
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot />
        </GestureHandlerRootView>
    );
}