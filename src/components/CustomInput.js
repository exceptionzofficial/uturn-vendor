import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, borderRadius, typography, spacing } from '../theme/theme';

const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
    secureTextEntry = false,
    multiline = false,
    numberOfLines = 1,
    leftIcon,
    rightIcon,
    onRightIconPress,
    error,
    disabled = false,
    style,
    inputStyle,
    required = false,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

    const getBorderColor = () => {
        if (error) return colors.secondary;
        if (isFocused) return colors.primary;
        return colors.border;
    };

    return (
        <View style={[styles.container, style]}>
            {label && (
                <Text style={styles.label}>
                    {label}
                    {required && <Text style={styles.required}> *</Text>}
                </Text>
            )}
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: getBorderColor(),
                        backgroundColor: disabled ? colors.surface : colors.background,
                    },
                    multiline && { height: 100, alignItems: 'flex-start' },
                ]}>
                {leftIcon && (
                    <View style={styles.leftIconContainer}>
                        <Icon name={leftIcon} size={20} color={colors.textLight} />
                    </View>
                )}
                <TextInput
                    style={[
                        styles.input,
                        inputStyle,
                        multiline && { textAlignVertical: 'top', paddingTop: 12 },
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textMuted}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={!disabled}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        style={styles.rightIconContainer}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <Icon
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={20}
                            color={colors.textLight}
                        />
                    </TouchableOpacity>
                )}
                {rightIcon && !secureTextEntry && (
                    <TouchableOpacity
                        style={styles.rightIconContainer}
                        onPress={onRightIconPress}
                        disabled={!onRightIconPress}>
                        <Icon name={rightIcon} size={20} color={colors.textLight} />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    label: {
        ...typography.bodySmall,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    required: {
        color: colors.secondary,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.sm,
        minHeight: 50,
    },
    leftIconContainer: {
        marginRight: spacing.sm,
    },
    rightIconContainer: {
        marginLeft: spacing.sm,
        padding: 4,
    },
    input: {
        flex: 1,
        ...typography.body,
        color: colors.text,
        paddingVertical: spacing.sm,
    },
    error: {
        ...typography.caption,
        color: colors.secondary,
        marginTop: spacing.xs,
    },
});

export default CustomInput;
