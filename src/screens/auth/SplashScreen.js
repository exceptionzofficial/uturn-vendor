import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, typography, spacing } from '../../theme/theme';

const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();

        setTimeout(() => navigation.replace('Login'), 2500);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                <View style={styles.logoCircle}>
                    <Icon name="car-connected" size={60} color={colors.primary} />
                </View>
            </Animated.View>

            <Animated.View style={[styles.textContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                <Text style={styles.appName}>UTurn</Text>
                <Text style={styles.tagline}>Vendor Partner</Text>
            </Animated.View>

            <Animated.View style={[styles.features, { opacity: fadeAnim }]}>
                <View style={styles.featureItem}>
                    <View style={[styles.featureIcon, { backgroundColor: colors.success + '20' }]}>
                        <Icon name="check-circle" size={20} color={colors.success} />
                    </View>
                    <Text style={styles.featureText}>Easy Booking</Text>
                </View>
                <View style={styles.featureItem}>
                    <View style={[styles.featureIcon, { backgroundColor: colors.info + '20' }]}>
                        <Icon name="chart-line" size={20} color={colors.info} />
                    </View>
                    <Text style={styles.featureText}>Track Earnings</Text>
                </View>
                <View style={styles.featureItem}>
                    <View style={[styles.featureIcon, { backgroundColor: colors.accent + '20' }]}>
                        <Icon name="shield-check" size={20} color={colors.accent} />
                    </View>
                    <Text style={styles.featureText}>Safe & Secure</Text>
                </View>
            </Animated.View>

            <Text style={styles.copyright}>© 2024 UTurn Technologies</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
    logoContainer: { marginBottom: spacing.lg },
    logoCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 10 },
    textContainer: { alignItems: 'center', marginBottom: spacing.xxl },
    appName: { fontSize: 42, fontWeight: '800', color: colors.headerText },
    tagline: { ...typography.h3, color: colors.headerText, opacity: 0.8 },
    features: { flexDirection: 'row', marginBottom: spacing.xxl },
    featureItem: { alignItems: 'center', marginHorizontal: spacing.md },
    featureIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.xs },
    featureText: { ...typography.caption, color: colors.headerText, fontWeight: '600' },
    copyright: { position: 'absolute', bottom: spacing.xl, ...typography.caption, color: colors.headerText, opacity: 0.6 },
});

export default SplashScreen;
