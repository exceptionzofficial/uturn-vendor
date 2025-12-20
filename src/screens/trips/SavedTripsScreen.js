import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TripCard from '../../components/TripCard';
import { colors, spacing, typography } from '../../theme/theme';

const MOCK_SAVED_TRIPS = [
    { tripId: 'UT2024003', pickupLocation: 'Velachery, Chennai', dropLocation: 'ECR Beach Resort', pickupDate: '18 Dec 2024', pickupTime: '09:00 AM', vehicleType: 'Mini', amount: '650', status: 'saved' },
    { tripId: 'UT2024006', pickupLocation: 'Koyambedu Bus Stand', dropLocation: 'Salem Bus Stand', pickupDate: '19 Dec 2024', pickupTime: '11:00 AM', vehicleType: 'Mini', amount: '2100', status: 'saved' },
];

const SavedTripsScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Saved Trips</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={MOCK_SAVED_TRIPS}
                keyExtractor={(item) => item.tripId}
                contentContainerStyle={styles.listContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }} />}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Icon name="content-save-off" size={64} color={colors.textMuted} />
                        <Text style={styles.emptyText}>No saved trips</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <TripCard
                        {...item}
                        onPress={() => navigation.navigate('TripDetails', { tripId: item.tripId })}
                        onEditPress={() => navigation.navigate('AddTrip', { tripId: item.tripId })}
                        onPublishPress={() => console.log('Publish', item.tripId)}
                    />
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

export default SavedTripsScreen;
