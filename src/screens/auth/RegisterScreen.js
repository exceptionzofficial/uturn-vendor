import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/theme';

const RegisterScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        businessName: '', ownerName: '', phone: '', email: '', password: '', confirmPassword: '',
    });
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleRegister = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('OTP', { phone: formData.phone });
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

            {/* Curved Yellow Header */}
            <View style={styles.curvedHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={colors.headerText} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Create Account</Text>
                    <Text style={styles.headerSubtitle}>Join UTurn as a Vendor Partner</Text>
                </View>
            </View>

            <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Form Card */}
                    <View style={styles.formCard}>
                        <CustomInput
                            label="Business Name"
                            placeholder="Your travel agency name"
                            value={formData.businessName}
                            onChangeText={(v) => updateField('businessName', v)}
                            leftIcon="domain"
                            required
                        />
                        <CustomInput
                            label="Owner Name"
                            placeholder="Your full name"
                            value={formData.ownerName}
                            onChangeText={(v) => updateField('ownerName', v)}
                            leftIcon="account"
                            required
                        />
                        <CustomInput
                            label="Phone Number"
                            placeholder="Enter mobile number"
                            value={formData.phone}
                            onChangeText={(v) => updateField('phone', v)}
                            keyboardType="phone-pad"
                            leftIcon="phone"
                            required
                        />
                        <CustomInput
                            label="Email Address"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChangeText={(v) => updateField('email', v)}
                            keyboardType="email-address"
                            leftIcon="email"
                        />
                        <CustomInput
                            label="Password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChangeText={(v) => updateField('password', v)}
                            secureTextEntry
                            leftIcon="lock"
                            required
                        />
                        <CustomInput
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChangeText={(v) => updateField('confirmPassword', v)}
                            secureTextEntry
                            leftIcon="lock-check"
                            required
                        />

                        {/* Terms Checkbox */}
                        <TouchableOpacity style={styles.termsRow} onPress={() => setAgreeToTerms(!agreeToTerms)}>
                            <View style={[styles.checkbox, agreeToTerms && styles.checkboxActive]}>
                                {agreeToTerms && <Icon name="check" size={14} color={colors.textOnDark} />}
                            </View>
                            <Text style={styles.termsText}>
                                I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
                            </Text>
                        </TouchableOpacity>

                        <CustomButton
                            title="Create Account"
                            onPress={handleRegister}
                            loading={loading}
                            fullWidth
                            disabled={!agreeToTerms}
                            style={styles.registerButton}
                        />

                        {/* Login Link */}
                        <View style={styles.loginSection}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginLink}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    curvedHeader: { backgroundColor: colors.primary, paddingTop: spacing.xxl, paddingBottom: spacing.xl, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
    backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.surface + '30', justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
    headerContent: {},
    headerTitle: { ...typography.h1, color: colors.headerText },
    headerSubtitle: { ...typography.body, color: colors.headerText, opacity: 0.8 },
    keyboardView: { flex: 1 },
    scrollContent: { padding: spacing.lg },
    formCard: { backgroundColor: colors.surface, borderRadius: borderRadius.xxl, padding: spacing.xl, ...shadows.md },
    termsRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.lg },
    checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.border, marginRight: spacing.sm, justifyContent: 'center', alignItems: 'center' },
    checkboxActive: { backgroundColor: colors.success, borderColor: colors.success },
    termsText: { flex: 1, ...typography.bodySmall, color: colors.textLight },
    termsLink: { color: colors.accent, fontWeight: '600' },
    registerButton: { marginBottom: spacing.lg },
    loginSection: { flexDirection: 'row', justifyContent: 'center' },
    loginText: { ...typography.body, color: colors.textMuted },
    loginLink: { ...typography.body, color: colors.accent, fontWeight: '600' },
});

export default RegisterScreen;
