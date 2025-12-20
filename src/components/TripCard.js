import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, borderRadius, typography, spacing, shadows } from '../theme/theme';

const TripCard = ({
    tripId,
    pickupLocation,
    dropLocation,
    pickupDate,
    pickupTime,
    vehicleType,
    amount,
    status, // 'saved', 'published', 'assigned', 'ongoing', 'completed', 'cancelled'
    driverName,
    onPress,
    onEditPress,
    onPublishPress,
    style,
}) => {
    const getStatusConfig = () => {
        switch (status) {
            case 'saved':
                return { color: colors.saved, label: 'Saved', icon: 'content-save' };
            case 'published':
                return { color: colors.pending, label: 'Published', icon: 'send' };
            case 'assigned':
                return { color: colors.primary, label: 'Assigned', icon: 'account-check' };
            case 'ongoing':
                return { color: colors.success, label: 'Ongoing', icon: 'car' };
            case 'completed':
                return { color: colors.successDark, label: 'Completed', icon: 'check-circle' };
            case 'cancelled':
                return { color: colors.secondary, label: 'Cancelled', icon: 'close-circle' };
            default:
                return { color: colors.textMuted, label: 'Unknown', icon: 'help-circle' };
        }
    };

    const statusConfig = getStatusConfig();

    const getVehicleIcon = () => {
        switch (vehicleType?.toLowerCase()) {
            case 'sedan':
                return 'car-side';
            case 'suv':
                return 'car-estate';
            case 'mini':
                return 'car-hatchback';
            case 'auto':
                return 'rickshaw';
            default:
                return 'car';
        }
    };

    return (
        <TouchableOpacity
            style={[styles.card, shadows.md, style]}
            onPress={onPress}
            activeOpacity={0.9}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.tripIdContainer}>
                    <Text style={styles.tripIdLabel}>Trip ID</Text>
                    <Text style={styles.tripId}>{tripId}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
                    <Icon name={statusConfig.icon} size={14} color={statusConfig.color} />
                    <Text style={[styles.statusText, { color: statusConfig.color }]}>
                        {statusConfig.label}
                    </Text>
                </View>
            </View>

            {/* Route */}
            <View style={styles.routeContainer}>
                <View style={styles.routeIconContainer}>
                    <View style={[styles.dot, { backgroundColor: colors.success }]} />
                    <View style={styles.routeLine} />
                    <View style={[styles.dot, { backgroundColor: colors.secondary }]} />
                </View>
                <View style={styles.routeDetails}>
                    <Text style={styles.locationText} numberOfLines={1}>
                        {pickupLocation}
                    </Text>
                    <Text style={styles.locationText} numberOfLines={1}>
                        {dropLocation}
                    </Text>
                </View>
            </View>

            {/* Details */}
            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <Icon name="calendar" size={16} color={colors.textLight} />
                    <Text style={styles.detailText}>{pickupDate}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon name="clock-outline" size={16} color={colors.textLight} />
                    <Text style={styles.detailText}>{pickupTime}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon name={getVehicleIcon()} size={16} color={colors.textLight} />
                    <Text style={styles.detailText}>{vehicleType}</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View>
                    {driverName && (
                        <View style={styles.driverInfo}>
                            <Icon name="account" size={14} color={colors.textLight} />
                            <Text style={styles.driverName}>{driverName}</Text>
                        </View>
                    )}
                    <Text style={styles.amount}>₹{amount}</Text>
                </View>

                {status === 'saved' && (
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
                            <Icon name="pencil" size={18} color={colors.textLight} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.publishButton} onPress={onPublishPress}>
                            <Icon name="send" size={18} color={colors.textOnDark} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.background,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    tripIdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tripIdLabel: {
        ...typography.caption,
        color: colors.textMuted,
        marginRight: spacing.xs,
    },
    tripId: {
        ...typography.bodySmall,
        fontWeight: '700',
        color: colors.text,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
    },
    statusText: {
        ...typography.caption,
        fontWeight: '600',
        marginLeft: 4,
    },
    routeContainer: {
        flexDirection: 'row',
        marginBottom: spacing.md,
    },
    routeIconContainer: {
        alignItems: 'center',
        marginRight: spacing.sm,
        paddingVertical: 2,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    routeLine: {
        width: 2,
        height: 20,
        backgroundColor: colors.border,
        marginVertical: 2,
    },
    routeDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    locationText: {
        ...typography.bodySmall,
        color: colors.text,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        marginBottom: spacing.sm,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        ...typography.caption,
        color: colors.textLight,
        marginLeft: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    driverName: {
        ...typography.caption,
        color: colors.textLight,
        marginLeft: 4,
    },
    amount: {
        ...typography.h3,
        color: colors.text,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        padding: spacing.sm,
        marginRight: spacing.sm,
    },
    publishButton: {
        backgroundColor: colors.success,
        padding: spacing.sm,
        borderRadius: borderRadius.md,
    },
});

export default TripCard;
