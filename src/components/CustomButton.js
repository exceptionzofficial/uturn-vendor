import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, typography, borderRadius } from '../theme/theme';

const CustomButton = ({
    title, onPress, variant = 'primary', size = 'medium', loading = false, disabled = false,
    icon, iconPosition = 'left', fullWidth = false, style,
}) => {
    const variants = {
        primary: { bg: colors.primary, text: colors.textOnPrimary },
        secondary: { bg: colors.accent, text: colors.textOnDark },
        success: { bg: colors.success, text: colors.textOnDark },
        error: { bg: colors.error, text: colors.textOnDark },
        info: { bg: colors.info, text: colors.textOnDark },
        outline: { bg: 'transparent', text: colors.primary, border: colors.primary },
        ghost: { bg: 'transparent', text: colors.text },
    };

    const sizes = {
        small: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, fontSize: 14 },
        medium: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg, fontSize: 16 },
        large: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl, fontSize: 18 },
    };

    const config = variants[variant];
    const sizeConfig = sizes[size];

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            style={[
                styles.button,
                {
                    backgroundColor: config.bg,
                    paddingVertical: sizeConfig.paddingVertical,
                    paddingHorizontal: sizeConfig.paddingHorizontal,
                    borderWidth: config.border ? 2 : 0,
                    borderColor: config.border,
                },
                fullWidth && styles.fullWidth,
                disabled && styles.disabled,
                style,
            ]}>
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator color={config.text} size="small" />
                ) : (
                    <>
                        {icon && iconPosition === 'left' && <Icon name={icon} size={sizeConfig.fontSize + 4} color={config.text} style={styles.iconLeft} />}
                        <Text style={[styles.text, { color: config.text, fontSize: sizeConfig.fontSize }]}>{title}</Text>
                        {icon && iconPosition === 'right' && <Icon name={icon} size={sizeConfig.fontSize + 4} color={config.text} style={styles.iconRight} />}
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: { borderRadius: borderRadius.lg, alignItems: 'center', justifyContent: 'center' },
    content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    text: { ...typography.button, textAlign: 'center' },
    iconLeft: { marginRight: spacing.sm },
    iconRight: { marginLeft: spacing.sm },
    fullWidth: { width: '100%' },
    disabled: { opacity: 0.5 },
});

export default CustomButton;
