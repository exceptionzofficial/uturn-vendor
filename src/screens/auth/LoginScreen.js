import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/theme';

const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.replace('DrawerNav');
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

            {/* Curved Yellow Header */}
            <View style={styles.curvedHeader}>
                <View style={styles.logoContainer}>
                    <Icon name="car-connected" size={50} color={colors.headerText} />
                </View>
                <Text style={styles.appName}>UTurn Vendor</Text>
                <Text style={styles.tagline}>Manage your travel business</Text>
            </View>

            <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Login Card */}
                    <View style={styles.loginCard}>
                        <Text style={styles.welcomeText}>Welcome Back! 👋</Text>
                        <Text style={styles.subText}>Login to your account</Text>

                        <CustomInput
                            label="Phone Number"
                            placeholder="Enter your mobile number"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            leftIcon="phone"
                            required
                        />

                        <CustomInput
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            leftIcon="lock"
                            required
                        />

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <CustomButton
                            title="Login"
                            onPress={handleLogin}
                            loading={loading}
                            fullWidth
                            style={styles.loginButton}
                        />

                        {/* Register Link */}
                        <View style={styles.registerSection}>
                            <Text style={styles.registerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.registerLink}>Register Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bottom Illustration */}
                    <View style={styles.illustrationContainer}>
                        <Icon name="truck-delivery" size={100} color={colors.primary + '30'} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    curvedHeader: { backgroundColor: colors.primary, paddingTop: spacing.xxl * 1.5, paddingBottom: spacing.xxl, alignItems: 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
    logoContainer: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md, ...shadows.lg },
    appName: { ...typography.h1, color: colors.headerText },
    tagline: { ...typography.body, color: colors.headerText, opacity: 0.8 },
    keyboardView: { flex: 1 },
    scrollContent: { padding: spacing.lg, paddingTop: spacing.xl },
    loginCard: { backgroundColor: colors.surface, borderRadius: borderRadius.xxl, padding: spacing.xl, ...shadows.md },
    welcomeText: { ...typography.h2, color: colors.text, marginBottom: spacing.xs },
    subText: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg },
    forgotPassword: { alignSelf: 'flex-end', marginBottom: spacing.lg, marginTop: -spacing.sm },
    forgotPasswordText: { ...typography.bodySmall, color: colors.accent },
    loginButton: { marginBottom: spacing.lg },
    registerSection: { flexDirection: 'row', justifyContent: 'center' },
    registerText: { ...typography.body, color: colors.textMuted },
    registerLink: { ...typography.body, color: colors.accent, fontWeight: '600' },
    illustrationContainer: { alignItems: 'center', marginTop: spacing.xxl, opacity: 0.5 },
});

export default LoginScreen;
