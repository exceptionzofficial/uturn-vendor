import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, borderRadius, typography, spacing, shadows } from '../theme/theme';

const PlanCard = ({
    name,
    price,
    period = 'month',
    features = [],
    isPopular = false,
    isSelected = false,
    onSelect,
    style,
}) => {
    const CardWrapper = isSelected ? LinearGradient : View;
    const cardWrapperProps = isSelected
        ? {
            colors: [colors.primary, colors.primaryDark],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
        }
        : {};

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onSelect}>
            <CardWrapper
                {...cardWrapperProps}
                style={[
                    styles.card,
                    shadows.md,
                    isSelected && styles.selectedCard,
                    !isSelected && styles.unselectedCard,
                    style,
                ]}>
                {isPopular && (
                    <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>POPULAR</Text>
                    </View>
                )}

                <Text style={[styles.name, isSelected && styles.selectedText]}>
                    {name}
                </Text>

                <View style={styles.priceContainer}>
                    <Text style={[styles.currency, isSelected && styles.selectedText]}>₹</Text>
                    <Text style={[styles.price, isSelected && styles.selectedText]}>
                        {price}
                    </Text>
                    <Text style={[styles.period, isSelected && styles.selectedTextMuted]}>
                        /{period}
                    </Text>
                </View>

                <View style={styles.divider} />

                {features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                        <Icon
                            name="check-circle"
                            size={18}
                            color={isSelected ? colors.textOnPrimary : colors.success}
                        />
                        <Text
                            style={[
                                styles.featureText,
                                isSelected && styles.selectedText,
                            ]}>
                            {feature}
                        </Text>
                    </View>
                ))}

                <View
                    style={[
                        styles.selectButton,
                        isSelected && styles.selectedButton,
                    ]}>
                    <Text
                        style={[
                            styles.selectButtonText,
                            isSelected && styles.selectedButtonText,
                        ]}>
                        {isSelected ? 'Selected' : 'Select Plan'}
                    </Text>
                </View>
            </CardWrapper>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginBottom: spacing.md,
        position: 'relative',
        overflow: 'hidden',
    },
    selectedCard: {
        borderWidth: 0,
    },
    unselectedCard: {
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.border,
    },
    popularBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: colors.secondary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderBottomLeftRadius: borderRadius.md,
    },
    popularText: {
        ...typography.caption,
        fontWeight: '700',
        color: colors.textOnDark,
    },
    name: {
        ...typography.h3,
        color: colors.text,
        marginBottom: spacing.sm,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: spacing.md,
    },
    currency: {
        ...typography.h3,
        color: colors.text,
        marginRight: 2,
    },
    price: {
        fontSize: 40,
        fontWeight: '700',
        color: colors.text,
        lineHeight: 48,
    },
    period: {
        ...typography.body,
        color: colors.textMuted,
        marginLeft: 4,
        marginBottom: 6,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.md,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    featureText: {
        ...typography.bodySmall,
        color: colors.text,
        marginLeft: spacing.sm,
    },
    selectButton: {
        marginTop: spacing.md,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        backgroundColor: colors.surface,
    },
    selectedButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    selectButtonText: {
        ...typography.button,
        color: colors.text,
    },
    selectedButtonText: {
        color: colors.textOnPrimary,
    },
    selectedText: {
        color: colors.textOnPrimary,
    },
    selectedTextMuted: {
        color: 'rgba(26,26,26,0.7)',
    },
});

export default PlanCard;
