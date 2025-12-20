import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme/theme';

const OTPScreen = ({ navigation, route }) => {
    const { mobile } = route.params || { mobile: '9876543210' };
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleOtpChange = (value, index) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 4) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.replace('Subscription');
        }, 1500);
    };

    const handleResend = () => {
        setTimer(30);
        setCanResend(false);
        // Trigger resend OTP API
    };

    const maskedMobile = `******${mobile.slice(-4)}`;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={colors.text} />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Icon name="message-text-lock" size={48} color={colors.primary} />
                </View>

                <Text style={styles.title}>Verify OTP</Text>
                <Text style={styles.subtitle}>
                    Enter the 4-digit code sent to{'\n'}
                    <Text style={styles.mobileText}>{maskedMobile}</Text>
                </Text>

                {/* OTP Inputs */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={[
                                styles.otpInput,
                                digit && styles.otpInputFilled,
                            ]}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            selectTextOnFocus
                        />
                    ))}
                </View>

                {/* Resend Timer */}
                <View style={styles.resendContainer}>
                    {canResend ? (
                        <TouchableOpacity onPress={handleResend}>
                            <Text style={styles.resendLink}>Resend OTP</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.timerText}>
                            Resend OTP in <Text style={styles.timerValue}>{timer}s</Text>
                        </Text>
                    )}
                </View>

                {/* Verify Button */}
                <CustomButton
                    title="Verify & Continue"
                    onPress={handleVerify}
                    loading={loading}
                    disabled={otp.join('').length !== 4}
                    fullWidth
                    style={styles.verifyButton}
                />

                {/* Change Number */}
                <TouchableOpacity
                    style={styles.changeNumber}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.changeNumberText}>Change Mobile Number</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        padding: spacing.lg,
        paddingTop: spacing.xl,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    title: {
        ...typography.h1,
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...typography.body,
        color: colors.textLight,
        textAlign: 'center',
        lineHeight: 24,
    },
    mobileText: {
        color: colors.text,
        fontWeight: '600',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.xl,
        marginBottom: spacing.lg,
    },
    otpInput: {
        width: 60,
        height: 60,
        borderRadius: borderRadius.lg,
        borderWidth: 2,
        borderColor: colors.border,
        marginHorizontal: spacing.sm,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        color: colors.text,
        backgroundColor: colors.surface,
    },
    otpInputFilled: {
        borderColor: colors.primary,
        backgroundColor: colors.primary + '10',
    },
    resendContainer: {
        marginBottom: spacing.xl,
    },
    timerText: {
        ...typography.body,
        color: colors.textLight,
    },
    timerValue: {
        color: colors.primary,
        fontWeight: '600',
    },
    resendLink: {
        ...typography.body,
        color: colors.primary,
        fontWeight: '600',
    },
    verifyButton: {
        marginBottom: spacing.lg,
    },
    changeNumber: {
        padding: spacing.sm,
    },
    changeNumberText: {
        ...typography.bodySmall,
        color: colors.textMuted,
    },
});

export default OTPScreen;
