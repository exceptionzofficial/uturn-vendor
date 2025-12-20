import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/theme';

const TripDetailsScreen = ({ navigation, route }) => {
    const { tripId } = route.params || { tripId: 'UT2024001' };

    const tripData = {
        tripId,
        status: 'assigned',
        tripType: 'One Way',
        pickupLocation: 'Chennai Airport, Terminal 1',
        dropLocation: 'T Nagar, Chennai',
        pickupDate: '16 Dec 2024',
        pickupTime: '10:30 AM',
        vehicleType: 'Sedan',
        pickupType: 'Airport',
        driverName: 'Rajesh Kumar',
        driverMobile: '+91 98765 12345',
        driverRating: 4.8,
        costBreakdown: { baseFare: 500, perKm: 250, driverPeta: 100 },
        totalAmount: 850,
        notes: 'Client has 2 large suitcases',
    };

    const handleCancel = () => {
        Alert.alert('Cancel Trip', 'Are you sure you want to cancel this trip?', [
            { text: 'No', style: 'cancel' },
            { text: 'Yes, Cancel', style: 'destructive', onPress: () => navigation.goBack() },
        ]);
    };

    const getStatusColor = () => {
        const statusColors = { saved: colors.saved, published: colors.pending, assigned: colors.primary, ongoing: colors.success, completed: colors.successDark, cancelled: colors.secondary };
        return statusColors[tripData.status] || colors.textMuted;
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Trip Details</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Status Card */}
                <View style={styles.statusCard}>
                    <View style={styles.tripIdRow}>
                        <Text style={styles.tripIdLabel}>Trip ID</Text>
                        <Text style={styles.tripId}>{tripData.tripId}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
                        <Text style={[styles.statusText, { color: getStatusColor() }]}>{tripData.status.toUpperCase()}</Text>
                    </View>
                </View>

                {/* Route Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Route Details</Text>
                    <View style={styles.routeItem}>
                        <Icon name="map-marker" size={20} color={colors.success} />
                        <View style={styles.routeText}>
                            <Text style={styles.routeLabel}>Pickup</Text>
                            <Text style={styles.routeValue}>{tripData.pickupLocation}</Text>
                        </View>
                    </View>
                    <View style={styles.routeItem}>
                        <Icon name="map-marker-check" size={20} color={colors.secondary} />
                        <View style={styles.routeText}>
                            <Text style={styles.routeLabel}>Drop</Text>
                            <Text style={styles.routeValue}>{tripData.dropLocation}</Text>
                        </View>
                    </View>
                    <View style={styles.detailsRow}>
                        <View style={styles.detailItem}><Icon name="calendar" size={16} color={colors.textLight} /><Text style={styles.detailText}>{tripData.pickupDate}</Text></View>
                        <View style={styles.detailItem}><Icon name="clock" size={16} color={colors.textLight} /><Text style={styles.detailText}>{tripData.pickupTime}</Text></View>
                        <View style={styles.detailItem}><Icon name="car" size={16} color={colors.textLight} /><Text style={styles.detailText}>{tripData.vehicleType}</Text></View>
                    </View>
                </View>

                {/* Driver Card */}
                {tripData.driverName && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Driver Details</Text>
                        <View style={styles.driverRow}>
                            <View style={styles.driverAvatar}><Icon name="account" size={28} color={colors.primary} /></View>
                            <View style={styles.driverInfo}>
                                <Text style={styles.driverName}>{tripData.driverName}</Text>
                                <View style={styles.ratingRow}><Icon name="star" size={14} color={colors.primary} /><Text style={styles.ratingText}>{tripData.driverRating}</Text></View>
                            </View>
                            <TouchableOpacity style={styles.callButton}>
                                <Icon name="phone" size={20} color={colors.success} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Cost Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Cost Breakdown</Text>
                    <View style={styles.costRow}><Text style={styles.costLabel}>Base Fare</Text><Text style={styles.costValue}>₹{tripData.costBreakdown.baseFare}</Text></View>
                    <View style={styles.costRow}><Text style={styles.costLabel}>Per KM Charge</Text><Text style={styles.costValue}>₹{tripData.costBreakdown.perKm}</Text></View>
                    <View style={styles.costRow}><Text style={styles.costLabel}>Driver Allowance</Text><Text style={styles.costValue}>₹{tripData.costBreakdown.driverPeta}</Text></View>
                    <View style={styles.totalRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>₹{tripData.totalAmount}</Text></View>
                </View>

                {/* Notes */}
                {tripData.notes && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Notes</Text>
                        <Text style={styles.notesText}>{tripData.notes}</Text>
                    </View>
                )}

                {/* Actions */}
                {tripData.status !== 'completed' && tripData.status !== 'cancelled' && (
                    <CustomButton title="Cancel Trip" variant="outline" onPress={handleCancel} fullWidth style={styles.cancelButton} />
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, paddingTop: spacing.xl, backgroundColor: colors.background },
    headerTitle: { ...typography.h3, color: colors.text },
    scrollContent: { padding: spacing.lg },
    statusCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.background, padding: spacing.lg, borderRadius: borderRadius.xl, marginBottom: spacing.md, ...shadows.sm },
    tripIdRow: { flexDirection: 'row', alignItems: 'center' },
    tripIdLabel: { ...typography.caption, color: colors.textMuted, marginRight: spacing.xs },
    tripId: { ...typography.body, fontWeight: '700', color: colors.text },
    statusBadge: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
    statusText: { ...typography.caption, fontWeight: '700' },
    card: { backgroundColor: colors.background, borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.md, ...shadows.sm },
    cardTitle: { ...typography.bodySmall, fontWeight: '600', color: colors.textMuted, marginBottom: spacing.md, textTransform: 'uppercase' },
    routeItem: { flexDirection: 'row', marginBottom: spacing.md },
    routeText: { marginLeft: spacing.sm, flex: 1 },
    routeLabel: { ...typography.caption, color: colors.textMuted },
    routeValue: { ...typography.body, color: colors.text },
    detailsRow: { flexDirection: 'row', marginTop: spacing.sm, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
    detailItem: { flexDirection: 'row', alignItems: 'center', marginRight: spacing.lg },
    detailText: { ...typography.caption, color: colors.textLight, marginLeft: 4 },
    driverRow: { flexDirection: 'row', alignItems: 'center' },
    driverAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.primary + '20', justifyContent: 'center', alignItems: 'center' },
    driverInfo: { flex: 1, marginLeft: spacing.md },
    driverName: { ...typography.body, fontWeight: '600', color: colors.text },
    ratingRow: { flexDirection: 'row', alignItems: 'center' },
    ratingText: { ...typography.caption, color: colors.textLight, marginLeft: 4 },
    callButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.success + '15', justifyContent: 'center', alignItems: 'center' },
    costRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
    costLabel: { ...typography.body, color: colors.textLight },
    costValue: { ...typography.body, color: colors.text },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
    totalLabel: { ...typography.body, fontWeight: '700', color: colors.text },
    totalValue: { ...typography.h3, color: colors.primary },
    notesText: { ...typography.body, color: colors.text },
    cancelButton: { marginTop: spacing.md },
});

export default TripDetailsScreen;
