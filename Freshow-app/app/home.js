import { Text, View, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, SIZES } from "../constants";
import styles from '../app/components/css/homestyle';

const Home = () => {
    const router = useRouter(); // useRouter를 통해 router 사용

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
                    {/* Start Button */}
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => router.push('/fridgeselect')} // router.push로 페이지 이동
                    >
                        <Image 
                            source={require('../assets/IntroStartBtn.png')}
                            style={styles.startButtonImage} // 스타일 이름을 그대로 유지
                        />
                    </TouchableOpacity>

                    {/* Login Button */}
                    <TouchableOpacity onPress={() => router.push('/login')}>
                        <Image
                            source={require('../assets/LoginLinkBtn.png')}
                            style={styles.loginLinkImage} // 스타일 이름을 그대로 유지
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Home;
