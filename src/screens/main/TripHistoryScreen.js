import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    RefreshControl,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TripCard from '../../components/TripCard';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/theme';

const TABS = [
    { id: 'all', label: 'All' },
    { id: 'saved', label: 'Saved' },
    { id: 'published', label: 'Published' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
];

const MOCK_TRIPS = [
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
    {
        tripId: 'UT2024004',
        pickupLocation: 'Madurai Airport',
        dropLocation: 'Rameshwaram Temple',
        pickupDate: '15 Dec 2024',
        pickupTime: '07:00 AM',
        vehicleType: 'SUV',
        amount: '3200',
        status: 'completed',
        driverName: 'Suresh Babu',
    },
    {
        tripId: 'UT2024005',
        pickupLocation: 'Chennai Central',
        dropLocation: 'Pondicherry Beach',
        pickupDate: '14 Dec 2024',
        pickupTime: '05:30 AM',
        vehicleType: 'Sedan',
        amount: '2800',
        status: 'cancelled',
    },
    {
        tripId: 'UT2024006',
        pickupLocation: 'Koyambedu Bus Stand',
        dropLocation: 'Salem Bus Stand',
        pickupDate: '19 Dec 2024',
        pickupTime: '11:00 AM',
        vehicleType: 'Mini',
        amount: '2100',
        status: 'saved',
    },
];

const TripHistoryScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const filteredTrips = MOCK_TRIPS.filter((trip) => {
        const matchesTab = activeTab === 'all' || trip.status === activeTab;
        const matchesSearch =
            trip.tripId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trip.dropLocation.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    };

    const renderTrip = ({ item }) => (
        <TripCard
            {...item}
            onPress={() => navigation.navigate('TripDetails', { tripId: item.tripId })}
            onEditPress={() => navigation.navigate('AddTrip', { tripId: item.tripId })}
            onPublishPress={() => console.log('Publish', item.tripId)}
        />
    );

    const ListEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Icon name="car-off" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No trips found</Text>
            <Text style={styles.emptySubtitle}>
                {activeTab === 'all'
                    ? 'You haven\'t booked any trips yet'
                    : `No ${activeTab} trips`}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Trip History</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Icon name="magnify" size={20} color={colors.textMuted} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by Trip ID or location..."
                    placeholderTextColor={colors.textMuted}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Icon name="close-circle" size={20} color={colors.textMuted} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <FlatList
                    horizontal
                    data={TABS}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                activeTab === item.id && styles.tabActive,
                            ]}
                            onPress={() => setActiveTab(item.id)}>
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === item.id && styles.tabTextActive,
                                ]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.tabsContent}
                />
            </View>

            {/* Trips List */}
            <FlatList
                data={filteredTrips}
                keyExtractor={(item) => item.tripId}
                renderItem={renderTrip}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={ListEmptyComponent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    header: {
        padding: spacing.lg,
        paddingTop: spacing.xl,
        backgroundColor: colors.background,
    },
    headerTitle: {
        ...typography.h2,
        color: colors.text,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        ...shadows.sm,
    },
    searchInput: {
        flex: 1,
        ...typography.body,
        color: colors.text,
        paddingVertical: spacing.sm,
        marginLeft: spacing.sm,
    },
    tabsContainer: {
        backgroundColor: colors.background,
        paddingBottom: spacing.sm,
        marginBottom: spacing.sm,
    },
    tabsContent: {
        paddingHorizontal: spacing.lg,
    },
    tab: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        marginRight: spacing.sm,
        borderRadius: borderRadius.full,
        backgroundColor: colors.surface,
    },
    tabActive: {
        backgroundColor: colors.primary,
    },
    tabText: {
        ...typography.bodySmall,
        color: colors.textLight,
        fontWeight: '500',
    },
    tabTextActive: {
        color: colors.textOnPrimary,
        fontWeight: '600',
    },
    listContent: {
        padding: spacing.lg,
        paddingTop: spacing.sm,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.xxl * 2,
    },
    emptyTitle: {
        ...typography.h3,
        color: colors.text,
        marginTop: spacing.md,
    },
    emptySubtitle: {
        ...typography.body,
        color: colors.textMuted,
        marginTop: spacing.xs,
    },
});

export default TripHistoryScreen;
