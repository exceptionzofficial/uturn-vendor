import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/theme';

const ProfileScreen = ({ navigation }) => {
    const vendorData = {
        businessName: 'ABC Travels',
        ownerName: 'Hariprasath G',
        mobile: '+91 98765 43210',
        email: 'abc.travels@email.com',
        plan: 'Pro',
        tripsRemaining: 185,
        totalTrips: 200,
        referralCode: 'ABCREF25',
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('Login') },
        ]);
    };

    const MenuItem = ({ icon, iconColor, title, onPress }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={[styles.menuIcon, { backgroundColor: (iconColor || colors.primary) + '15' }]}>
                <Icon name={icon} size={22} color={iconColor || colors.primary} />
            </View>
            <Text style={styles.menuTitle}>{title}</Text>
            <Icon name="chevron-right" size={22} color={colors.textMuted} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Header */}
                <View style={styles.headerCard}>
                    <View style={styles.avatarContainer}>
                        <Icon name="account" size={40} color={colors.primary} />
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={styles.businessName}>{vendorData.businessName}</Text>
                        <Text style={styles.ownerName}>{vendorData.ownerName}</Text>
                    </View>
                </View>

                {/* Subscription Card */}
                <LinearGradient
                    colors={[colors.primary, colors.primaryDark]}
                    style={styles.subscriptionCard}>
                    <View style={styles.subscriptionHeader}>
                        <Icon name="crown" size={24} color={colors.textOnPrimary} />
                        <Text style={styles.subscriptionPlan}>{vendorData.plan} Plan</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${(vendorData.tripsRemaining / vendorData.totalTrips) * 100}%` }]} />
                    </View>
                    <Text style={styles.tripsText}>{vendorData.tripsRemaining}/{vendorData.totalTrips} trips left</Text>
                </LinearGradient>

                {/* Referral Card */}
                <TouchableOpacity style={styles.referralCard} onPress={() => navigation.navigate('Referral')}>
                    <Icon name="gift" size={28} color={colors.secondary} />
                    <View style={styles.referralInfo}>
                        <Text style={styles.referralTitle}>Referral Program</Text>
                        <Text style={styles.referralCode}>{vendorData.referralCode}</Text>
                    </View>
                    <Icon name="chevron-right" size={22} color={colors.textMuted} />
                </TouchableOpacity>

                {/* Menu Items */}
                <View style={styles.menuCard}>
                    <MenuItem icon="account-edit" title="Edit Profile" onPress={() => { }} />
                    <MenuItem icon="phone" iconColor={colors.success} title="Mobile: {vendorData.mobile}" onPress={() => { }} />
                    <MenuItem icon="lock" iconColor={colors.secondary} title="Change Password" onPress={() => { }} />
                    <MenuItem icon="bell" title="Notifications" onPress={() => { }} />
                    <MenuItem icon="help-circle" title="Help & Support" onPress={() => { }} />
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name="logout" size={22} color={colors.secondary} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>UTurn Vendor v1.0.0</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    scrollContent: { padding: spacing.lg, paddingTop: spacing.xl },
    headerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.lg, ...shadows.md },
    avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary + '20', justifyContent: 'center', alignItems: 'center' },
    headerInfo: { marginLeft: spacing.md, flex: 1 },
    businessName: { ...typography.h2, color: colors.text },
    ownerName: { ...typography.body, color: colors.textLight },
    subscriptionCard: { borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.lg },
    subscriptionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
    subscriptionPlan: { ...typography.h3, color: colors.textOnPrimary, marginLeft: spacing.sm },
    progressBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, marginBottom: spacing.xs },
    progressFill: { height: '100%', backgroundColor: colors.textOnPrimary, borderRadius: 4 },
    tripsText: { ...typography.caption, color: colors.textOnPrimary },
    referralCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.lg, ...shadows.sm },
    referralInfo: { flex: 1, marginLeft: spacing.md },
    referralTitle: { ...typography.body, fontWeight: '600', color: colors.text },
    referralCode: { ...typography.caption, color: colors.secondary, fontWeight: '700' },
    menuCard: { backgroundColor: colors.background, borderRadius: borderRadius.xl, marginBottom: spacing.lg, ...shadows.sm },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
    menuIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    menuTitle: { ...typography.body, color: colors.text, flex: 1, marginLeft: spacing.md },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.secondary + '10', padding: spacing.md, borderRadius: borderRadius.lg },
    logoutText: { ...typography.body, color: colors.secondary, fontWeight: '600', marginLeft: spacing.sm },
    versionText: { ...typography.caption, color: colors.textMuted, textAlign: 'center', marginTop: spacing.lg },
});

export default ProfileScreen;
