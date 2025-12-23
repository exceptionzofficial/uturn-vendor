import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, typography, borderRadius } from '../theme/theme';

const DrawerContent = ({ navigation }) => {
    const vendorData = {
        name: 'ABC Travels',
        email: 'abc.travels@gmail.com',
        plan: 'Pro Plan',
        tripsRemaining: 185,
    };

    const menuItems = [
        { icon: 'home', label: 'Dashboard', route: 'Dashboard', color: colors.primary },
        { icon: 'plus-circle', label: 'Book Trip', route: 'AddTrip', color: colors.success },
        { icon: 'history', label: 'Trip History', route: 'TripHistory', color: colors.info },
        { icon: 'wallet', label: 'Wallet', route: 'Wallet', color: colors.success },
        { icon: 'chart-pie', label: 'Budget Tracker', route: 'BudgetTracker', color: colors.accent },
        { icon: 'hand-coin', label: 'Apply for Loan', route: 'Loan', color: colors.accentGreen },
        { icon: 'gift', label: 'Referral Program', route: 'Referral', color: colors.accentRed },
        { icon: 'crown', label: 'Subscription', route: 'Subscription', color: colors.primary },
        { icon: 'cog', label: 'Settings', route: 'Settings', color: colors.textMuted },
        { icon: 'help-circle', label: 'Help & Support', route: 'Help', color: colors.info },
    ];

    const handleNavigation = (route) => {
        navigation.closeDrawer();
        if (route === 'Dashboard' || route === 'TripHistory' || route === 'AddTrip') {
            navigation.navigate(route);
        } else {
            navigation.navigate(route);
        }
    };

    const handleLogout = () => {
        navigation.closeDrawer();
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    <Icon name="account" size={40} color={colors.primary} />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.businessName}>{vendorData.name}</Text>
                    <Text style={styles.email}>{vendorData.email}</Text>
                    <View style={styles.planBadge}>
                        <Icon name="crown" size={12} color={colors.primary} />
                        <Text style={styles.planText}>{vendorData.plan}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => handleNavigation('Profile')}>
                    <Icon name="pencil" size={18} color={colors.textMuted} />
                </TouchableOpacity>
            </View>

            {/* Menu Items */}
            <View style={styles.menuSection}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handleNavigation(item.route)}>
                        <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                            <Icon name={item.icon} size={20} color={item.color} />
                        </View>
                        <Text style={styles.menuLabel}>{item.label}</Text>
                        <Icon name="chevron-right" size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Logout Button */}
            <View style={styles.logoutSection}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name="logout" size={20} color={colors.error} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
                <Text style={styles.versionText}>UTurn Vendor v1.0.0</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    profileSection: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, paddingTop: spacing.xl, backgroundColor: colors.primary + '10', borderBottomWidth: 1, borderBottomColor: colors.border },
    avatarContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.primary + '20', justifyContent: 'center', alignItems: 'center' },
    profileInfo: { flex: 1, marginLeft: spacing.md },
    businessName: { ...typography.h3, color: colors.text },
    email: { ...typography.caption, color: colors.textMuted },
    planBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary + '15', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.full, alignSelf: 'flex-start', marginTop: 4 },
    planText: { ...typography.caption, color: colors.primary, fontWeight: '600', marginLeft: 4 },
    editButton: { padding: spacing.sm },
    menuSection: { flex: 1, paddingVertical: spacing.md },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
    menuIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    menuLabel: { flex: 1, ...typography.body, color: colors.text, marginLeft: spacing.md },
    logoutSection: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: spacing.md, backgroundColor: colors.error + '10', borderRadius: borderRadius.lg },
    logoutText: { ...typography.body, color: colors.error, fontWeight: '600', marginLeft: spacing.sm },
    versionText: { ...typography.caption, color: colors.textMuted, textAlign: 'center', marginTop: spacing.md },
});

export default DrawerContent;
