import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Platform,
    Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/theme';

// Vehicle types with seat capacity
const VEHICLE_DATA = [
    { name: 'Auto', seats: 3, icon: 'rickshaw' },
    { name: 'Mini', seats: 4, icon: 'car-hatchback' },
    { name: 'Sedan', seats: 4, icon: 'car-side' },
    { name: 'SUV', seats: 6, icon: 'car-estate' },
    { name: 'Innova', seats: 7, icon: 'car-estate' },
    { name: 'Tempo Traveller', seats: 12, icon: 'bus' },
    { name: 'Mini Bus', seats: 20, icon: 'bus' },
    { name: 'Bus', seats: 40, icon: 'bus' },
];

const AddTripScreen = ({ navigation, route }) => {
    const editMode = route?.params?.tripId;

    const [tripType, setTripType] = useState('oneway'); // oneway, roundtrip, tour
    const [formData, setFormData] = useState({
        pickupLocation: '',
        dropLocation: '',
        vehicleType: '',
        numberOfSeats: '',
        baseFare: '',
        driverPetaDay: '',
        costPerKm: '',
        totalKm: '',
        notes: '',
    });

    const [pickupDate, setPickupDate] = useState(new Date());
    const [pickupTime, setPickupTime] = useState(new Date());
    const [dropDate, setDropDate] = useState(new Date());
    const [dropTime, setDropTime] = useState(new Date());

    const [showPicker, setShowPicker] = useState({
        pickupDate: false,
        pickupTime: false,
        dropDate: false,
        dropTime: false,
    });

    const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [publishLoading, setPublishLoading] = useState(false);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Reset vehicle type when seats change
        if (field === 'numberOfSeats') {
            setFormData(prev => ({ ...prev, numberOfSeats: value, vehicleType: '' }));
        }
    };

    // Filter vehicles based on seat count
    const getFilteredVehicles = () => {
        const seats = parseInt(formData.numberOfSeats) || 0;
        if (seats === 0) return VEHICLE_DATA;
        return VEHICLE_DATA.filter(v => v.seats >= seats);
    };

    const calculateTotalCost = () => {
        const km = parseFloat(formData.totalKm) || 0;
        const costPerKm = parseFloat(formData.costPerKm) || 0;
        const driverPeta = parseFloat(formData.driverPetaDay) || 0;
        const baseFare = parseFloat(formData.baseFare) || 0;
        return (baseFare + (km * costPerKm) + driverPeta).toFixed(2);
    };

    const handleDateChange = (event, selectedDate, type) => {
        setShowPicker(prev => ({ ...prev, [type]: Platform.OS === 'ios' }));
        if (selectedDate) {
            switch (type) {
                case 'pickupDate': setPickupDate(selectedDate); break;
                case 'pickupTime': setPickupTime(selectedDate); break;
                case 'dropDate': setDropDate(selectedDate); break;
                case 'dropTime': setDropTime(selectedDate); break;
            }
        }
    };

    const formatDate = (date) => date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const formatTime = (date) => date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const handleSave = () => {
        setSaveLoading(true);
        setTimeout(() => { setSaveLoading(false); navigation.goBack(); }, 1000);
    };

    const handlePublish = () => {
        setPublishLoading(true);
        setTimeout(() => { setPublishLoading(false); navigation.goBack(); }, 1000);
    };

    const handleShare = async () => {
        const message = `🚕 *UTurn Trip Booking*\n\n` +
            `📍 *Pickup:* ${formData.pickupLocation || 'Not set'}\n` +
            `📍 *Drop:* ${formData.dropLocation || 'Not set'}\n` +
            `📅 *Date:* ${formatDate(pickupDate)}\n` +
            `⏰ *Time:* ${formatTime(pickupTime)}\n` +
            `🚗 *Vehicle:* ${formData.vehicleType || 'Not selected'}\n` +
            `👥 *Passengers:* ${formData.numberOfSeats || 'Not set'}\n` +
            `💰 *Total:* ₹${calculateTotalCost()}\n\n` +
            `Type: ${tripType === 'oneway' ? 'One Way' : tripType === 'roundtrip' ? 'Round Trip' : 'Tour'}`;

        try {
            await Share.share({ message });
        } catch (error) {
            console.log('Share error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{editMode ? 'Edit Trip' : 'Add Trip'}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Trip Type - One Way, Round Trip, Tour */}
                <View style={styles.tripTypeContainer}>
                    {['oneway', 'roundtrip', 'tour'].map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={styles.tripTypeButton}
                            onPress={() => setTripType(type)}>
                            <View style={[styles.radio, tripType === type && styles.radioActive]}>
                                {tripType === type && <View style={styles.radioInner} />}
                            </View>
                            <Text style={[styles.tripTypeText, tripType === type && styles.tripTypeTextActive]}>
                                {type === 'oneway' ? 'One Way' : type === 'roundtrip' ? 'Round Trip' : 'Tour'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Locations */}
                <CustomInput
                    label="Pickup Location"
                    placeholder="Enter pickup location"
                    value={formData.pickupLocation}
                    onChangeText={(v) => updateField('pickupLocation', v)}
                    leftIcon="map-marker"
                    rightIcon="crosshairs-gps"
                    required
                />
                <CustomInput
                    label="Drop Location"
                    placeholder="Enter drop location"
                    value={formData.dropLocation}
                    onChangeText={(v) => updateField('dropLocation', v)}
                    leftIcon="map-marker-check"
                    rightIcon="crosshairs-gps"
                    required
                />

                {/* Pickup Date & Time */}
                <Text style={styles.sectionLabel}>Pickup Date & Time</Text>
                <View style={styles.dateTimeRow}>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowPicker(prev => ({ ...prev, pickupDate: true }))}>
                        <Icon name="calendar" size={20} color={colors.textLight} />
                        <Text style={styles.dateTimeText}>{formatDate(pickupDate)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowPicker(prev => ({ ...prev, pickupTime: true }))}>
                        <Icon name="clock-outline" size={20} color={colors.textLight} />
                        <Text style={styles.dateTimeText}>{formatTime(pickupTime)}</Text>
                    </TouchableOpacity>
                </View>

                {/* Drop Date & Time (Round Trip / Tour) */}
                {(tripType === 'roundtrip' || tripType === 'tour') && (
                    <>
                        <Text style={styles.sectionLabel}>{tripType === 'tour' ? 'Return Date & Time' : 'Drop Date & Time'}</Text>
                        <View style={styles.dateTimeRow}>
                            <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowPicker(prev => ({ ...prev, dropDate: true }))}>
                                <Icon name="calendar" size={20} color={colors.textLight} />
                                <Text style={styles.dateTimeText}>{formatDate(dropDate)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowPicker(prev => ({ ...prev, dropTime: true }))}>
                                <Icon name="clock-outline" size={20} color={colors.textLight} />
                                <Text style={styles.dateTimeText}>{formatTime(dropTime)}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {/* Number of Seats */}
                <CustomInput
                    label="Number of Passengers"
                    placeholder="Enter number of passengers"
                    value={formData.numberOfSeats}
                    onChangeText={(v) => updateField('numberOfSeats', v)}
                    keyboardType="numeric"
                    leftIcon="account-group"
                    required
                />

                {/* Vehicle Type Dropdown (filtered by seats) */}
                <View style={styles.dropdownContainer}>
                    <Text style={styles.inputLabel}>Vehicle Type {formData.numberOfSeats && `(for ${formData.numberOfSeats}+ seats)`}</Text>
                    <TouchableOpacity style={styles.dropdown} onPress={() => setShowVehicleDropdown(!showVehicleDropdown)}>
                        <Text style={formData.vehicleType ? styles.dropdownText : styles.dropdownPlaceholder}>
                            {formData.vehicleType || '- Select Vehicle -'}
                        </Text>
                        <Icon name="chevron-down" size={20} color={colors.textLight} />
                    </TouchableOpacity>
                    {showVehicleDropdown && (
                        <View style={styles.dropdownList}>
                            {getFilteredVehicles().length > 0 ? (
                                getFilteredVehicles().map((vehicle) => (
                                    <TouchableOpacity
                                        key={vehicle.name}
                                        style={styles.dropdownItem}
                                        onPress={() => { updateField('vehicleType', vehicle.name); setShowVehicleDropdown(false); }}>
                                        <Icon name={vehicle.icon} size={20} color={colors.primary} style={{ marginRight: 8 }} />
                                        <Text style={styles.dropdownItemText}>{vehicle.name} ({vehicle.seats} seats)</Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <View style={styles.dropdownItem}>
                                    <Text style={styles.dropdownPlaceholder}>No vehicles available for {formData.numberOfSeats} passengers</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                {/* Cost Fields */}
                <View style={styles.costRow}>
                    <View style={styles.costInput}>
                        <CustomInput label="Base Fare (₹)" placeholder="₹0" value={formData.baseFare} onChangeText={(v) => updateField('baseFare', v)} keyboardType="numeric" />
                    </View>
                    <View style={styles.costInput}>
                        <CustomInput label="Cost/Km (₹)" placeholder="₹0" value={formData.costPerKm} onChangeText={(v) => updateField('costPerKm', v)} keyboardType="numeric" />
                    </View>
                </View>

                <View style={styles.costRow}>
                    <View style={styles.costInput}>
                        <CustomInput label="Driver Bata/Day (₹)" placeholder="₹0" value={formData.driverPetaDay} onChangeText={(v) => updateField('driverPetaDay', v)} keyboardType="numeric" />
                    </View>
                    <View style={styles.costInput}>
                        <CustomInput label="Total Km" placeholder="0" value={formData.totalKm} onChangeText={(v) => updateField('totalKm', v)} keyboardType="numeric" />
                    </View>
                </View>

                {/* Total Cost Display */}
                <View style={styles.totalCostContainer}>
                    <Text style={styles.inputLabel}>Total Cost</Text>
                    <View style={styles.totalCostBox}>
                        <Text style={styles.totalCostValue}>₹{calculateTotalCost()}</Text>
                    </View>
                </View>

                {/* Notes */}
                <CustomInput label="Notes" placeholder="Enter any special instructions..." value={formData.notes} onChangeText={(v) => updateField('notes', v)} multiline numberOfLines={3} />
            </ScrollView>

            {/* Bottom Buttons - Share, Save, Publish */}
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                    <Icon name="whatsapp" size={22} color={colors.success} />
                </TouchableOpacity>
                <CustomButton title="💾 Save" onPress={handleSave} variant="outline" loading={saveLoading} style={styles.saveButton} />
                <CustomButton title="🚀 Publish" onPress={handlePublish} variant="success" loading={publishLoading} style={styles.publishButton} />
            </View>

            {/* Date/Time Pickers */}
            {showPicker.pickupDate && <DateTimePicker value={pickupDate} mode="date" onChange={(e, d) => handleDateChange(e, d, 'pickupDate')} />}
            {showPicker.pickupTime && <DateTimePicker value={pickupTime} mode="time" onChange={(e, d) => handleDateChange(e, d, 'pickupTime')} />}
            {showPicker.dropDate && <DateTimePicker value={dropDate} mode="date" onChange={(e, d) => handleDateChange(e, d, 'dropDate')} />}
            {showPicker.dropTime && <DateTimePicker value={dropTime} mode="time" onChange={(e, d) => handleDateChange(e, d, 'dropTime')} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, paddingTop: spacing.xl, borderBottomWidth: 1, borderBottomColor: colors.border },
    headerTitle: { ...typography.h3, color: colors.text },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg },
    tripTypeContainer: { flexDirection: 'row', marginBottom: spacing.lg, flexWrap: 'wrap' },
    tripTypeButton: { flexDirection: 'row', alignItems: 'center', marginRight: spacing.lg, paddingVertical: spacing.sm },
    radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
    radioActive: { borderColor: colors.secondary },
    radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.secondary },
    tripTypeText: { ...typography.body, color: colors.textLight },
    tripTypeTextActive: { color: colors.text, fontWeight: '600' },
    sectionLabel: { ...typography.bodySmall, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
    dateTimeRow: { flexDirection: 'row', marginBottom: spacing.md },
    dateTimeButton: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, marginRight: spacing.sm, borderWidth: 1, borderColor: colors.border },
    dateTimeText: { ...typography.body, color: colors.text, marginLeft: spacing.sm },
    dropdownContainer: { marginBottom: spacing.md, zIndex: 10 },
    inputLabel: { ...typography.bodySmall, fontWeight: '600', color: colors.text, marginBottom: spacing.xs },
    dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
    dropdownText: { ...typography.body, color: colors.text },
    dropdownPlaceholder: { ...typography.body, color: colors.textMuted },
    dropdownList: { position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: colors.background, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginTop: 4, ...shadows.lg, zIndex: 100, maxHeight: 250 },
    dropdownItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
    dropdownItemText: { ...typography.body, color: colors.text },
    costRow: { flexDirection: 'row' },
    costInput: { flex: 1, marginRight: spacing.sm },
    totalCostContainer: { marginBottom: spacing.md },
    totalCostBox: { padding: spacing.md, backgroundColor: colors.primary + '20', borderRadius: borderRadius.md, borderWidth: 2, borderColor: colors.primary },
    totalCostValue: { ...typography.h3, color: colors.primary, textAlign: 'center' },
    bottomButtons: { flexDirection: 'row', padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.background, alignItems: 'center' },
    shareButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.success + '15', justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
    saveButton: { flex: 1, marginRight: spacing.sm },
    publishButton: { flex: 1 },
});

export default AddTripScreen;
