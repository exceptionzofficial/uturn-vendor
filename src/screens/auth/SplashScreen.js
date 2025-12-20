import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    StatusBar,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, typography } from '../../theme/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    const logoScale = useRef(new Animated.Value(0.3)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const taglineOpacity = useRef(new Animated.Value(0)).current;
    const taglineTranslate = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        // Logo animation
        Animated.parallel([
            Animated.spring(logoScale, {
                toValue: 1,
                tension: 10,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        // Tagline animation (delayed)
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(taglineOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.spring(taglineTranslate, {
                    toValue: 0,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 600);

        // Navigate to Login after 2.5 seconds
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            {/* Decorative circles */}
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={styles.circle3} />

            {/* Logo */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: logoOpacity,
                        transform: [{ scale: logoScale }],
                    },
                ]}>
                <View style={styles.logoBackground}>
                    <Image
                        source={require('../../assets/uturn.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            </Animated.View>

            {/* App Name */}
            <Animated.Text
                style={[
                    styles.appName,
                    {
                        opacity: logoOpacity,
                        transform: [{ scale: logoScale }],
                    },
                ]}>
                UTurn
            </Animated.Text>

            {/* Tagline */}
            <Animated.Text
                style={[
                    styles.tagline,
                    {
                        opacity: taglineOpacity,
                        transform: [{ translateY: taglineTranslate }],
                    },
                ]}>
                Your Trip Partner
            </Animated.Text>

            {/* Bottom text */}
            <View style={styles.bottomContainer}>
                <Text style={styles.vendorText}>Vendor App</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle1: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255,255,255,0.1)',
        top: -100,
        right: -100,
    },
    circle2: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255,255,255,0.08)',
        bottom: 100,
        left: -80,
    },
    circle3: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255,255,255,0.05)',
        top: height * 0.3,
        right: -50,
    },
    logoContainer: {
        marginBottom: 20,
    },
    logoBackground: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
    },
    logo: {
        width: 100,
        height: 100,
    },
    appName: {
        fontSize: 48,
        fontWeight: '800',
        color: colors.textOnPrimary,
        letterSpacing: 2,
        marginBottom: 8,
    },
    tagline: {
        ...typography.body,
        color: colors.textOnPrimary,
        opacity: 0.9,
        letterSpacing: 1,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 60,
    },
    vendorText: {
        ...typography.caption,
        color: colors.textOnPrimary,
        opacity: 0.7,
        letterSpacing: 3,
        textTransform: 'uppercase',
    },
});

export default SplashScreen;
