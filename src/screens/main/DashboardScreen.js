import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    RefreshControl,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import StatsCard from '../../components/StatsCard';
import TripCard from '../../components/TripCard';
import { colors, spacing, typography, shadows, borderRadius } from '../../theme/theme';

const MOCK_RECENT_TRIPS = [
    {
        tripId: 'UT2024001',
        pickupLocation: 'Chennai Airport',
        dropLocation: 'T Nagar, Chennai',
        pickupDate: '16 Dec 2024',
        pickupTime: '10:30 AM',
        vehicleType: 'Sedan',
        amount: '850',
        status: 'completed',
        driverName: 'Rajesh Kumar',
    },
    {
        tripId: 'UT2024002',
        pickupLocation: 'Anna Nagar, Chennai',
        dropLocation: 'Coimbatore Railway Station',
        pickupDate: '17 Dec 2024',
        pickupTime: '06:00 AM',
        vehicleType: 'SUV',
        amount: '4500',
        status: 'published',
    },
    {
        tripId: 'UT2024003',
        pickupLocation: 'Velachery, Chennai',
        dropLocation: 'ECR Beach Resort',
        pickupDate: '18 Dec 2024',
        pickupTime: '09:00 AM',
        vehicleType: 'Mini',
        amount: '650',
        status: 'saved',
    },
];

const DashboardScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.avatarContainer}>
                        <Icon name="account" size={28} color={colors.primary} />
                    </View>
                    <View style={styles.headerText}>
                        <Text style={styles.greeting}>Good Morning 👋</Text>
                        <Text style={styles.businessName}>ABC Travels</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.walletButton}
                        onPress={() => navigation.navigate('Wallet')}>
                        <Icon name="wallet" size={22} color={colors.success} />
                        <Text style={styles.walletAmount}>₹2.5K</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.notificationButton}
                        onPress={() => navigation.navigate('Notifications')}>
                        <Icon name="bell-outline" size={24} color={colors.text} />
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                    />
                }>

                {/* Subscription Banner */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('Subscription')}>
                    <LinearGradient
                        colors={[colors.primary, colors.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.subscriptionBanner}>
                        <View style={styles.subscriptionContent}>
                            <Icon name="crown" size={24} color={colors.textOnPrimary} />
                            <View style={styles.subscriptionText}>
                                <Text style={styles.subscriptionTitle}>Pro Plan Active</Text>
                                <Text style={styles.subscriptionSubtitle}>185/200 trips remaining</Text>
                            </View>
                        </View>
                        <Icon name="chevron-right" size={24} color={colors.textOnPrimary} />
                    </LinearGradient>
                </TouchableOpacity>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <StatsCard
                        title="Today's Bookings"
                        value="12"
                        icon="calendar-check"
                        variant="primary"
                        style={styles.statsCard}
                    />
                    <StatsCard
                        title="Active Trips"
                        value="3"
                        icon="car-connected"
                        variant="success"
                        style={styles.statsCard}
                    />
                </View>
                <View style={styles.statsContainer}>
                    <StatsCard
                        title="This Month"
                        value="₹45.2K"
                        subtitle="Revenue"
                        icon="cash-multiple"
                        variant="secondary"
                        style={styles.statsCard}
                    />
                    <StatsCard
                        title="Total Trips"
                        value="156"
                        subtitle="This month"
                        icon="road-variant"
                        variant="primary"
                        style={styles.statsCard}
                    />
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActions}>
                        <TouchableOpacity
                            style={styles.quickActionButton}
                            onPress={() => navigation.navigate('AddTrip')}>
                            <View style={[styles.quickActionIcon, { backgroundColor: colors.primary + '20' }]}>
                                <Icon name="plus-circle" size={28} color={colors.primary} />
                            </View>
                            <Text style={styles.quickActionText}>Book Trip</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickActionButton}
                            onPress={() => navigation.navigate('SavedTrips')}>
                            <View style={[styles.quickActionIcon, { backgroundColor: colors.saved + '20' }]}>
                                <Icon name="content-save" size={28} color={colors.saved} />
                            </View>
                            <Text style={styles.quickActionText}>Saved</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickActionButton}
                            onPress={() => navigation.navigate('ActiveTrips')}>
                            <View style={[styles.quickActionIcon, { backgroundColor: colors.success + '20' }]}>
                                <Icon name="car" size={28} color={colors.success} />
                            </View>
                            <Text style={styles.quickActionText}>Active</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.quickActionButton}
                            onPress={() => navigation.navigate('Referral')}>
                            <View style={[styles.quickActionIcon, { backgroundColor: colors.secondary + '20' }]}>
                                <Icon name="gift" size={28} color={colors.secondary} />
                            </View>
                            <Text style={styles.quickActionText}>Refer</Text>
                        </TouchableOpacity>
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
                            onPublishPress={() => console.log('Publish', trip.tripId)}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.lg,
        paddingTop: spacing.xl,
        backgroundColor: colors.background,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: spacing.sm,
    },
    greeting: {
        ...typography.caption,
        color: colors.textMuted,
    },
    businessName: {
        ...typography.h3,
        color: colors.text,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.success + '15',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        marginRight: spacing.sm,
    },
    walletAmount: {
        ...typography.caption,
        fontWeight: '700',
        color: colors.success,
        marginLeft: 4,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.secondary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    subscriptionBanner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.lg,
        ...shadows.md,
    },
    subscriptionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subscriptionText: {
        marginLeft: spacing.sm,
    },
    subscriptionTitle: {
        ...typography.body,
        fontWeight: '700',
        color: colors.textOnPrimary,
    },
    subscriptionSubtitle: {
        ...typography.caption,
        color: colors.textOnPrimary,
        opacity: 0.8,
    },
    statsContainer: {
        flexDirection: 'row',
        marginBottom: spacing.md,
    },
    statsCard: {
        marginRight: spacing.md,
    },
    quickActionsContainer: {
        marginTop: spacing.md,
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.text,
        marginBottom: spacing.md,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quickActionButton: {
        alignItems: 'center',
        width: '22%',
    },
    quickActionIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    quickActionText: {
        ...typography.caption,
        color: colors.text,
        textAlign: 'center',
    },
    recentTripsContainer: {
        marginTop: spacing.sm,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    viewAll: {
        ...typography.bodySmall,
        color: colors.primary,
        fontWeight: '600',
    },
});

export default DashboardScreen;
