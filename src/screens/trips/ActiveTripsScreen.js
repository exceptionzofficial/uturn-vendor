import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TripCard from '../../components/TripCard';
import { colors, spacing, typography } from '../../theme/theme';

const MOCK_ACTIVE_TRIPS = [
    { tripId: 'UT2024010', pickupLocation: 'Phoenix Mall, Chennai', dropLocation: 'Chennai Airport', pickupDate: '16 Dec 2024', pickupTime: '02:30 PM', vehicleType: 'Sedan', amount: '750', status: 'ongoing', driverName: 'Kumar S' },
    { tripId: 'UT2024011', pickupLocation: 'Anna University', dropLocation: 'Tidel Park', pickupDate: '16 Dec 2024', pickupTime: '03:00 PM', vehicleType: 'Mini', amount: '350', status: 'assigned', driverName: 'Ravi K' },
];

const ActiveTripsScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Active Trips</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={MOCK_ACTIVE_TRIPS}
                keyExtractor={(item) => item.tripId}
                contentContainerStyle={styles.listContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }} />}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Icon name="car-off" size={64} color={colors.textMuted} />
                        <Text style={styles.emptyText}>No active trips</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <TripCard {...item} onPress={() => navigation.navigate('TripDetails', { tripId: item.tripId })} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, paddingTop: spacing.xl, backgroundColor: colors.background },
    headerTitle: { ...typography.h3, color: colors.text },
    listContent: { padding: spacing.lg },
    empty: { alignItems: 'center', paddingVertical: spacing.xxl },
    emptyText: { ...typography.body, color: colors.textMuted, marginTop: spacing.md },
});

export default ActiveTripsScreen;
