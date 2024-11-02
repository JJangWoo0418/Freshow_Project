import { Text, View, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS, SIZES } from "../constants";
import { ScrollView } from 'react-native';
import styles from '../app/components/css/homestyle';

const Home = ({ navigation }) => {
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
                onPress={() => navigation.navigate('Main')}
            >
                <Image 
                    source={require('../assets/IntroStartBtn.png')}
                    style={styles.startButtonText}/>
            </TouchableOpacity>

            <TouchableOpacity>
                <Image
                    source={require('../assets/LoginLinkBtn.png')}
                    style={styles.loginLink} 
                    onPress={() => navigation.navigate('Login')}>
                </Image>
            </TouchableOpacity>
        </View>
    </View>
        </SafeAreaView>
    );
}

export default Home;
