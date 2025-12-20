import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, borderRadius, typography, spacing, shadows } from '../theme/theme';

const StatsCard = ({
    title,
    value,
    subtitle,
    icon,
    variant = 'primary', // primary (yellow), secondary (red), success (green)
    style,
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
        return variant === 'primary' ? colors.textOnPrimary : colors.textOnDark;
    };

    return (
        <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card, shadows.md, style]}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={24} color={getTextColor()} />
            </View>
            <Text style={[styles.value, { color: getTextColor() }]}>{value}</Text>
            <Text style={[styles.title, { color: getTextColor() }]}>{title}</Text>
            {subtitle && (
                <Text style={[styles.subtitle, { color: getTextColor() }]}>{subtitle}</Text>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        minWidth: 140,
        flex: 1,
    },
    iconContainer: {
        marginBottom: spacing.sm,
    },
    value: {
        ...typography.h2,
        marginBottom: 2,
    },
    title: {
        ...typography.bodySmall,
        opacity: 0.9,
    },
    subtitle: {
        ...typography.caption,
        opacity: 0.7,
        marginTop: 2,
    },
});

export default StatsCard;
