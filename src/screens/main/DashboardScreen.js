import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import StatsCard from '../../components/StatsCard';
import TripCard from '../../components/TripCard';
import { colors, spacing, typography, shadows, borderRadius } from '../../theme/theme';

const MOCK_RECENT_TRIPS = [
    { tripId: 'UT2024001', pickupLocation: 'Chennai Airport', dropLocation: 'T Nagar, Chennai', pickupDate: '20 Dec 2024', pickupTime: '10:30 AM', vehicleType: 'Sedan', amount: '850', status: 'completed', driverName: 'Rajesh Kumar' },
    { tripId: 'UT2024002', pickupLocation: 'Anna Nagar, Chennai', dropLocation: 'Coimbatore Railway Station', pickupDate: '21 Dec 2024', pickupTime: '06:00 AM', vehicleType: 'SUV', amount: '4500', status: 'published' },
    { tripId: 'UT2024003', pickupLocation: 'Velachery, Chennai', dropLocation: 'ECR Beach Resort', pickupDate: '22 Dec 2024', pickupTime: '09:00 AM', vehicleType: 'Mini', amount: '650', status: 'saved' },
];

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    };

    const openDrawer = () => navigation.openDrawer();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

            {/* Curved Yellow Header */}
            <View style={styles.curvedHeader}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
                        <Icon name="menu" size={26} color={colors.headerText} />
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Text style={styles.greeting}>Good Morning 👋</Text>
                        <Text style={styles.businessName}>ABC Travels</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.walletButton} onPress={() => navigation.navigate('Wallet')}>
                            <Icon name="wallet" size={18} color={colors.success} />
                            <Text style={styles.walletAmount}>₹2.5K</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.notificationButton}>
                            <Icon name="bell-outline" size={22} color={colors.headerText} />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Balance Card inside header */}
                <View style={styles.balanceCard}>
                    <View style={styles.balanceInfo}>
                        <Text style={styles.balanceLabel}>Available Balance</Text>
                        <Text style={styles.balanceAmount}>₹45,200</Text>
                    </View>
                    <View style={styles.balanceActions}>
                        <TouchableOpacity style={styles.balanceActionBtn} onPress={() => navigation.navigate('Wallet')}>
                            <Icon name="plus" size={18} color={colors.textOnDark} />
                            <Text style={styles.balanceActionText}>Top Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.balanceActionBtn} onPress={() => navigation.navigate('TripHistory')}>
                            <Icon name="history" size={18} color={colors.textOnDark} />
                            <Text style={styles.balanceActionText}>History</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}>

                {/* Quick Actions Grid */}
                <View style={styles.quickActionsContainer}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActionsGrid}>
                        {[
                            { icon: 'plus-circle', label: 'Book Trip', route: 'AddTrip', color: colors.success },
                            { icon: 'content-save', label: 'Saved', route: 'SavedTrips', color: colors.info },
                            { icon: 'chart-pie', label: 'Budget', route: 'BudgetTracker', color: colors.accent },
                            { icon: 'hand-coin', label: 'Loan', route: 'Loan', color: colors.accentGreen },
                            { icon: 'car', label: 'Active', route: 'ActiveTrips', color: colors.accentBlue },
                            { icon: 'gift', label: 'Refer', route: 'Referral', color: colors.accentRed },
                            { icon: 'crown', label: 'Plans', route: 'Subscription', color: colors.primary },
                            { icon: 'dots-horizontal', label: 'More', route: 'Profile', color: colors.textMuted },
                        ].map((item, index) => (
                            <TouchableOpacity key={index} style={styles.quickActionItem} onPress={() => navigation.navigate(item.route)}>
                                <View style={[styles.quickActionIcon, { backgroundColor: item.color + '15' }]}>
                                    <Icon name={item.icon} size={24} color={item.color} />
                                </View>
                                <Text style={styles.quickActionLabel}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={[styles.statCard, { backgroundColor: colors.success }]}>
                        <Icon name="calendar-check" size={22} color={colors.textOnDark} />
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Today</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: colors.info }]}>
                        <Icon name="car-connected" size={22} color={colors.textOnDark} />
                        <Text style={styles.statValue}>3</Text>
                        <Text style={styles.statLabel}>Active</Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: colors.accent }]}>
                        <Icon name="road-variant" size={22} color={colors.textOnDark} />
                        <Text style={styles.statValue}>156</Text>
                        <Text style={styles.statLabel}>Month</Text>
                    </View>
                </View>

                {/* Recent Trips */}
                <View style={styles.recentTripsContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Trips</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TripHistory')}>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {MOCK_RECENT_TRIPS.map((trip) => (
                        <TripCard
                            key={trip.tripId}
                            {...trip}
                            onPress={() => navigation.navigate('TripDetails', { tripId: trip.tripId })}
                            onEditPress={() => navigation.navigate('AddTrip', { tripId: trip.tripId })}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    curvedHeader: { backgroundColor: colors.primary, paddingTop: spacing.xl, paddingBottom: spacing.xxl + 30, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
    menuButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.surface + '30', justifyContent: 'center', alignItems: 'center' },
    headerCenter: { flex: 1, marginLeft: spacing.md },
    greeting: { ...typography.caption, color: colors.headerText, opacity: 0.8 },
    businessName: { ...typography.h3, color: colors.headerText },
    headerRight: { flexDirection: 'row', alignItems: 'center' },
    walletButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.full, marginRight: spacing.sm },
    walletAmount: { ...typography.caption, fontWeight: '700', color: colors.success, marginLeft: 4 },
    notificationButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.surface + '30', justifyContent: 'center', alignItems: 'center' },
    notificationBadge: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.error },
    balanceCard: { backgroundColor: colors.surface, borderRadius: borderRadius.xl, padding: spacing.lg, marginTop: spacing.sm, ...shadows.md },
    balanceInfo: { marginBottom: spacing.md },
    balanceLabel: { ...typography.caption, color: colors.textMuted },
    balanceAmount: { ...typography.h1, color: colors.text },
    balanceActions: { flexDirection: 'row' },
    balanceActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent, paddingVertical: spacing.sm, borderRadius: borderRadius.lg, marginRight: spacing.sm },
    balanceActionText: { ...typography.caption, color: colors.textOnDark, fontWeight: '600', marginLeft: 4 },
    scrollView: { flex: 1, marginTop: -30 },
    scrollContent: { padding: spacing.lg, paddingTop: spacing.xl },
    quickActionsContainer: { marginBottom: spacing.lg },
    sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
    quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.surface, borderRadius: borderRadius.xl, padding: spacing.md, ...shadows.sm },
    quickActionItem: { width: '25%', alignItems: 'center', paddingVertical: spacing.md },
    quickActionIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.xs },
    quickActionLabel: { ...typography.caption, color: colors.text },
    statsRow: { flexDirection: 'row', marginBottom: spacing.lg },
    statCard: { flex: 1, borderRadius: borderRadius.xl, padding: spacing.md, marginRight: spacing.sm, alignItems: 'center', ...shadows.sm },
    statValue: { ...typography.h2, color: colors.textOnDark, marginTop: spacing.xs },
    statLabel: { ...typography.caption, color: colors.textOnDark, opacity: 0.9 },
    recentTripsContainer: { marginBottom: spacing.xxl },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
    viewAll: { ...typography.bodySmall, color: colors.accent, fontWeight: '600' },
});

export default DashboardScreen;
