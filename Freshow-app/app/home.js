import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS, SIZES } from "../constants";
import { ScrollView } from 'react-native';
import styles from '../app/components/css/homestyle';

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: "프래시오",
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image
                        source={require('../assets/fridge-logo.png')}
                        style={styles.mascot}
                    />

                    <Text style={styles.title}>프래시오</Text>

                    <Text style={styles.description}>
                        냉장고를 지켜주면서{'\n'}효율적으로 <Text style={styles.highlight}>레시피</Text>도 알려준다고??
                    </Text>

                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => navigation.navigate('Main')}
                    >
                        <Text style={styles.startButtonText}>시작하기</Text>
                    </TouchableOpacity>

                    <Text style={styles.loginText}>
                        이미 계정이 있나요?{' '}
                        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                            로그인
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;
