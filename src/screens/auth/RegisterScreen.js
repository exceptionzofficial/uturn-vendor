import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { colors, spacing, borderRadius, typography } from '../../theme/theme';

const RegisterScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        }
        if (!formData.ownerName.trim()) {
            newErrors.ownerName = 'Owner name is required';
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (formData.mobile.length !== 10) {
            newErrors.mobile = 'Enter valid 10-digit mobile number';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter valid email address';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!agreeTerms) {
            newErrors.terms = 'You must agree to terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('OTP', { mobile: formData.mobile });
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Register as a vendor partner</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <CustomInput
                        label="Business Name"
                        placeholder="Enter your business name"
                        value={formData.businessName}
                        onChangeText={(v) => updateField('businessName', v)}
                        leftIcon="store"
                        error={errors.businessName}
                        required
                    />

                    <CustomInput
                        label="Owner Name"
                        placeholder="Enter owner's full name"
                        value={formData.ownerName}
                        onChangeText={(v) => updateField('ownerName', v)}
                        leftIcon="account"
                        error={errors.ownerName}
                        required
                    />

                    <CustomInput
                        label="Mobile Number"
                        placeholder="Enter 10-digit mobile number"
                        value={formData.mobile}
                        onChangeText={(v) => updateField('mobile', v)}
                        keyboardType="phone-pad"
                        leftIcon="phone"
                        error={errors.mobile}
                        required
                    />

                    <CustomInput
                        label="Email Address"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChangeText={(v) => updateField('email', v)}
                        keyboardType="email-address"
                        leftIcon="email"
                        error={errors.email}
                        required
                    />

                    <CustomInput
                        label="Password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChangeText={(v) => updateField('password', v)}
                        secureTextEntry
                        leftIcon="lock"
                        error={errors.password}
                        required
                    />

                    <CustomInput
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChangeText={(v) => updateField('confirmPassword', v)}
                        secureTextEntry
                        leftIcon="lock-check"
                        error={errors.confirmPassword}
                        required
                    />

                    {/* Terms Checkbox */}
                    <TouchableOpacity
                        style={styles.termsContainer}
                        onPress={() => setAgreeTerms(!agreeTerms)}>
                        <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
                            {agreeTerms && <Icon name="check" size={16} color={colors.textOnPrimary} />}
                        </View>
                        <Text style={styles.termsText}>
                            I agree to the{' '}
                            <Text style={styles.termsLink}>Terms & Conditions</Text> and{' '}
                            <Text style={styles.termsLink}>Privacy Policy</Text>
                        </Text>
                    </TouchableOpacity>
                    {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

                    <CustomButton
                        title="Register"
                        onPress={handleRegister}
                        loading={loading}
                        fullWidth
                        style={styles.registerButton}
                    />
                </View>

                {/* Login Link */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: spacing.lg,
    },
    header: {
        marginBottom: spacing.xl,
        marginTop: spacing.lg,
    },
    backButton: {
        marginBottom: spacing.lg,
    },
    title: {
        ...typography.h1,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.body,
        color: colors.textLight,
    },
    form: {
        marginBottom: spacing.lg,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
        marginTop: spacing.sm,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: borderRadius.sm,
        borderWidth: 2,
        borderColor: colors.border,
        marginRight: spacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    termsText: {
        ...typography.bodySmall,
        color: colors.textLight,
        flex: 1,
    },
    termsLink: {
        color: colors.primary,
        fontWeight: '600',
    },
    errorText: {
        ...typography.caption,
        color: colors.secondary,
        marginBottom: spacing.md,
    },
    registerButton: {
        marginTop: spacing.md,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing.xl,
    },
    loginText: {
        ...typography.body,
        color: colors.textLight,
    },
    loginLink: {
        ...typography.body,
        color: colors.primary,
        fontWeight: '600',
    },
});

export default RegisterScreen;
