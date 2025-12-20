import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, borderRadius, typography, shadows } from '../theme/theme';

const CustomButton = ({
    title,
    onPress,
    variant = 'primary', // primary, secondary, success, outline, ghost
    size = 'medium', // small, medium, large
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    style,
    textStyle,
}) => {
    const getGradientColors = () => {
        switch (variant) {
            case 'primary':
                return [colors.primary, colors.primaryDark];
            case 'secondary':
                return [colors.secondary, colors.secondaryDark];
            case 'success':
                return [colors.success, colors.successDark];
            default:
                return [colors.primary, colors.primaryDark];
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'primary':
                return colors.textOnPrimary;
            case 'secondary':
            case 'success':
                return colors.textOnDark;
            case 'outline':
                return colors.primary;
            case 'ghost':
                return colors.text;
            default:
                return colors.textOnPrimary;
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 };
            case 'large':
                return { paddingVertical: 18, paddingHorizontal: 32, fontSize: 18 };
            default:
                return { paddingVertical: 14, paddingHorizontal: 24, fontSize: 16 };
        }
    };

    const sizeStyles = getSizeStyles();
    const isGradient = ['primary', 'secondary', 'success'].includes(variant);

    const buttonContent = (
        <View style={styles.content}>
            {loading ? (
                <ActivityIndicator color={getTextColor()} size="small" />
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <View style={styles.iconLeft}>{icon}</View>
                    )}
                    <Text
                        style={[
                            styles.text,
                            { color: getTextColor(), fontSize: sizeStyles.fontSize },
                            textStyle,
                        ]}>
                        {title}
                    </Text>
                    {icon && iconPosition === 'right' && (
                        <View style={styles.iconRight}>{icon}</View>
                    )}
                </>
            )}
        </View>
    );

    if (isGradient) {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                activeOpacity={0.8}
                style={[fullWidth && styles.fullWidth, style]}>
                <LinearGradient
                    colors={getGradientColors()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                        styles.button,
                        {
                            paddingVertical: sizeStyles.paddingVertical,
                            paddingHorizontal: sizeStyles.paddingHorizontal,
                        },
                        disabled && styles.disabled,
                        shadows.md,
                    ]}>
                    {buttonContent}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            style={[
                styles.button,
                {
                    paddingVertical: sizeStyles.paddingVertical,
                    paddingHorizontal: sizeStyles.paddingHorizontal,
                },
                variant === 'outline' && styles.outline,
                variant === 'ghost' && styles.ghost,
                disabled && styles.disabled,
                fullWidth && styles.fullWidth,
                style,
            ]}>
            {buttonContent}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...typography.button,
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    disabled: {
        opacity: 0.5,
    },
    fullWidth: {
        width: '100%',
    },
});

export default CustomButton;
