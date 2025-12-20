import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Share,
    Clipboard,
    ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/theme';

const ReferralScreen = ({ navigation }) => {
    const referralData = {
        code: 'ABCREF25',
        totalEarnings: 2500,
        pendingEarnings: 500,
        referrals: [
            { name: 'XYZ Cabs', type: 'Vendor', date: '10 Dec 2024', amount: 500, status: 'paid' },
            { name: 'Suresh Driver', type: 'Driver', date: '05 Dec 2024', amount: 300, status: 'paid' },
            { name: 'PQR Travels', type: 'Vendor', date: '01 Dec 2024', amount: 500, status: 'pending' },
        ],
    };

    const copyCode = () => {
        Clipboard.setString(referralData.code);
        ToastAndroid.show('Code copied!', ToastAndroid.SHORT);
    };

    const shareCode = async () => {
        await Share.share({
            message: `Join UTurn with my referral code ${referralData.code} and get 10% off on your first subscription!`,
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Referral Program</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Referral Code Card */}
                <LinearGradient
                    colors={[colors.secondary, colors.secondaryDark]}
                    style={styles.codeCard}>
                    <Icon name="gift" size={40} color={colors.textOnDark} />
                    <Text style={styles.codeLabel}>Your Referral Code</Text>
                    <View style={styles.codeBox}>
                        <Text style={styles.codeText}>{referralData.code}</Text>
                    </View>
                    <View style={styles.shareButtons}>
                        <TouchableOpacity style={styles.shareBtn} onPress={copyCode}>
                            <Icon name="content-copy" size={20} color={colors.secondary} />
                            <Text style={styles.shareBtnText}>Copy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareBtn} onPress={shareCode}>
                            <Icon name="share-variant" size={20} color={colors.secondary} />
                            <Text style={styles.shareBtnText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {/* Earnings Cards */}
                <View style={styles.earningsRow}>
                    <View style={[styles.earningCard, { backgroundColor: colors.success + '15' }]}>
                        <Icon name="cash-check" size={28} color={colors.success} />
                        <Text style={styles.earningAmount}>₹{referralData.totalEarnings}</Text>
                        <Text style={styles.earningLabel}>Total Earned</Text>
                    </View>
                    <View style={[styles.earningCard, { backgroundColor: colors.pending + '15' }]}>
                        <Icon name="clock-outline" size={28} color={colors.pending} />
                        <Text style={styles.earningAmount}>₹{referralData.pendingEarnings}</Text>
                        <Text style={styles.earningLabel}>Pending</Text>
                    </View>
                </View>

                {/* How it Works */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How It Works</Text>
                    <View style={styles.stepCard}>
                        <View style={styles.step}>
                            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>1</Text></View>
                            <Text style={styles.stepText}>Share your referral code with vendors or drivers</Text>
                        </View>
                        <View style={styles.step}>
                            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>2</Text></View>
                            <Text style={styles.stepText}>They sign up using your code</Text>
                        </View>
                        <View style={styles.step}>
                            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>3</Text></View>
                            <Text style={styles.stepText}>Earn 10% commission on their subscription forever!</Text>
                        </View>
                    </View>
                </View>

                {/* Referral History */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Referrals</Text>
                    {referralData.referrals.map((ref, index) => (
                        <View key={index} style={styles.referralItem}>
                            <View style={styles.referralIcon}>
                                <Icon name={ref.type === 'Vendor' ? 'store' : 'account'} size={20} color={colors.primary} />
                            </View>
                            <View style={styles.referralInfo}>
                                <Text style={styles.referralName}>{ref.name}</Text>
                                <Text style={styles.referralDate}>{ref.type} • {ref.date}</Text>
                            </View>
                            <View>
                                <Text style={styles.referralAmount}>₹{ref.amount}</Text>
                                <Text style={[styles.referralStatus, { color: ref.status === 'paid' ? colors.success : colors.pending }]}>
                                    {ref.status}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, paddingTop: spacing.xl, backgroundColor: colors.background },
    headerTitle: { ...typography.h3, color: colors.text },
    scrollContent: { padding: spacing.lg },
    codeCard: { borderRadius: borderRadius.xl, padding: spacing.xl, alignItems: 'center', marginBottom: spacing.lg },
    codeLabel: { ...typography.body, color: colors.textOnDark, marginTop: spacing.md },
    codeBox: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: borderRadius.lg, marginTop: spacing.sm },
    codeText: { ...typography.h1, color: colors.textOnDark, letterSpacing: 4 },
    shareButtons: { flexDirection: 'row', marginTop: spacing.lg },
    shareBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.lg, marginHorizontal: spacing.sm },
    shareBtnText: { ...typography.bodySmall, color: colors.secondary, fontWeight: '600', marginLeft: spacing.xs },
    earningsRow: { flexDirection: 'row', marginBottom: spacing.lg },
    earningCard: { flex: 1, alignItems: 'center', padding: spacing.lg, borderRadius: borderRadius.xl, marginRight: spacing.sm },
    earningAmount: { ...typography.h2, color: colors.text, marginTop: spacing.sm },
    earningLabel: { ...typography.caption, color: colors.textLight },
    section: { marginBottom: spacing.lg },
    sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
    stepCard: { backgroundColor: colors.background, borderRadius: borderRadius.xl, padding: spacing.lg, ...shadows.sm },
    step: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
    stepNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
    stepNumberText: { ...typography.bodySmall, fontWeight: '700', color: colors.textOnPrimary },
    stepText: { ...typography.body, color: colors.text, flex: 1 },
    referralItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.sm, ...shadows.sm },
    referralIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary + '15', justifyContent: 'center', alignItems: 'center' },
    referralInfo: { flex: 1, marginLeft: spacing.md },
    referralName: { ...typography.body, fontWeight: '600', color: colors.text },
    referralDate: { ...typography.caption, color: colors.textMuted },
    referralAmount: { ...typography.body, fontWeight: '700', color: colors.text, textAlign: 'right' },
    referralStatus: { ...typography.caption, textAlign: 'right', textTransform: 'capitalize' },
});

export default ReferralScreen;
