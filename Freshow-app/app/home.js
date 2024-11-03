import React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS } from "../constants";
import styles from '../app/components/css/homestyle';

const Home = () => {
    const router = useRouter();

    return (        
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightWhite} />
            <Stack.Screen
                options={{
                    headerTitle: "프래시오",
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                }}
            />
            <View
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.topContent}>
                    <Image
                        source={require('../assets/Freshow Intro.png')}
                        style={styles.mascot}
                    />
                </View>

                <View style={styles.bottomContent}>
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => router.push('Main')}
                    >
                        <Image 
                            source={require('../assets/IntroStartBtn.png')}
                            style={styles.startButtonText}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('login')}>
                        <Image
                            source={require('../assets/LoginLinkBtn.png')}
                            style={styles.loginLink}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Home;
