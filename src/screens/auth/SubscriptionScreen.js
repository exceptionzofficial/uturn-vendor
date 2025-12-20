import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import PlanCard from '../../components/PlanCard';
import CustomButton from '../../components/CustomButton';
import { colors, spacing, typography, shadows } from '../../theme/theme';

const PLANS = [
    {
        id: 'basic',
        name: 'Basic',
        price: 499,
        period: 'month',
        features: [
            '50 trips per month',
            'Basic support (Email)',
            'Standard booking',
            'Trip history access',
        ],
        isPopular: false,
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 999,
        period: 'month',
        features: [
            '200 trips per month',
            'Priority support (Chat + Email)',
            'Advance booking',
            'Monthly reports',
            'Multiple saved trips',
        ],
        isPopular: true,
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 1999,
        period: 'month',
        features: [
            'Unlimited trips',
            'VIP support (24/7 Phone)',
            'Advanced analytics',
            'Multi-user access',
            'API integration',
            'Dedicated account manager',
        ],
        isPopular: false,
    },
];

const SubscriptionScreen = ({ navigation }) => {
    const [selectedPlan, setSelectedPlan] = useState('pro');
    const [loading, setLoading] = useState(false);

    const handleContinue = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.replace('MainTabs');
        }, 1000);
    };

    const handleSkip = () => {
        navigation.replace('MainTabs');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Choose Your Plan</Text>
                    <Text style={styles.subtitle}>
                        Select a subscription plan to start booking trips
                    </Text>
                </View>
                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            {/* Plans List */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>

                {/* Free Trial Banner */}
                <LinearGradient
                    colors={[colors.success, colors.successDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.trialBanner}>
                    <Icon name="gift" size={24} color={colors.textOnDark} />
                    <View style={styles.trialTextContainer}>
                        <Text style={styles.trialTitle}>7-Day Free Trial</Text>
                        <Text style={styles.trialSubtitle}>
                            Try any plan free for 7 days. Cancel anytime.
                        </Text>
                    </View>
                </LinearGradient>

                {/* Plan Cards */}
                {PLANS.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        name={plan.name}
                        price={plan.price}
                        period={plan.period}
                        features={plan.features}
                        isPopular={plan.isPopular}
                        isSelected={selectedPlan === plan.id}
                        onSelect={() => setSelectedPlan(plan.id)}
                    />
                ))}

                {/* Benefits */}
                <View style={styles.benefitsContainer}>
                    <Text style={styles.benefitsTitle}>All plans include:</Text>
                    <View style={styles.benefitItem}>
                        <Icon name="check-decagram" size={18} color={colors.success} />
                        <Text style={styles.benefitText}>Secure payment processing</Text>
                    </View>
                    <View style={styles.benefitItem}>
                        <Icon name="check-decagram" size={18} color={colors.success} />
                        <Text style={styles.benefitText}>Real-time trip tracking</Text>
                    </View>
                    <View style={styles.benefitItem}>
                        <Icon name="check-decagram" size={18} color={colors.success} />
                        <Text style={styles.benefitText}>Driver verification badges</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action */}
            <View style={styles.bottomContainer}>
                <CustomButton
                    title={`Start Free Trial • ${PLANS.find(p => p.id === selectedPlan)?.name}`}
                    onPress={handleContinue}
                    loading={loading}
                    fullWidth
                />
                <Text style={styles.termsText}>
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: spacing.lg,
        paddingTop: spacing.xl,
    },
    headerContent: {
        flex: 1,
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
    skipButton: {
        padding: spacing.sm,
    },
    skipText: {
        ...typography.body,
        color: colors.textMuted,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
        paddingTop: 0,
    },
    trialBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: 12,
        marginBottom: spacing.lg,
        ...shadows.md,
    },
    trialTextContainer: {
        marginLeft: spacing.md,
        flex: 1,
    },
    trialTitle: {
        ...typography.body,
        fontWeight: '700',
        color: colors.textOnDark,
    },
    trialSubtitle: {
        ...typography.caption,
        color: colors.textOnDark,
        opacity: 0.9,
    },
    benefitsContainer: {
        marginTop: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: 12,
    },
    benefitsTitle: {
        ...typography.bodySmall,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.sm,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    benefitText: {
        ...typography.bodySmall,
        color: colors.textLight,
        marginLeft: spacing.sm,
    },
    bottomContainer: {
        padding: spacing.lg,
        paddingBottom: spacing.xl,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.background,
    },
    termsText: {
        ...typography.caption,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: spacing.md,
    },
});

export default SubscriptionScreen;
