import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/theme';

const LoanScreen = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '', phone: '', email: '', dateOfBirth: '', address: '', city: '', pincode: '',
        businessName: '', businessType: '', yearsInBusiness: '', monthlyRevenue: '',
        loanAmount: '', loanPurpose: '', repaymentPeriod: '', existingLoans: '',
        panNumber: '', aadharNumber: '', gstNumber: '', bankAccountNumber: '', ifscCode: '',
    });

    const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const loanPurposes = ['Vehicle Purchase', 'Fleet Expansion', 'Working Capital', 'Office Setup', 'Other'];
    const repaymentPeriods = ['12 Months', '24 Months', '36 Months', '48 Months', '60 Months'];

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert('✅ Application Submitted', 'Our team will contact you within 24-48 hours.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
        }, 2000);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Personal Details</Text>
                        <Text style={styles.stepSubtitle}>Tell us about yourself</Text>
                        <CustomInput label="Full Name" placeholder="Enter your full name" value={formData.fullName} onChangeText={(v) => updateField('fullName', v)} leftIcon="account" required />
                        <CustomInput label="Phone Number" placeholder="Enter mobile number" value={formData.phone} onChangeText={(v) => updateField('phone', v)} keyboardType="phone-pad" leftIcon="phone" required />
                        <CustomInput label="Email Address" placeholder="Enter email address" value={formData.email} onChangeText={(v) => updateField('email', v)} keyboardType="email-address" leftIcon="email" required />
                        <CustomInput label="Date of Birth" placeholder="DD/MM/YYYY" value={formData.dateOfBirth} onChangeText={(v) => updateField('dateOfBirth', v)} leftIcon="calendar" required />
                        <CustomInput label="Address" placeholder="Enter your full address" value={formData.address} onChangeText={(v) => updateField('address', v)} leftIcon="home" multiline numberOfLines={2} required />
                        <View style={styles.row}>
                            <View style={styles.halfInput}><CustomInput label="City" placeholder="City" value={formData.city} onChangeText={(v) => updateField('city', v)} /></View>
                            <View style={styles.halfInput}><CustomInput label="Pincode" placeholder="Pincode" value={formData.pincode} onChangeText={(v) => updateField('pincode', v)} keyboardType="numeric" maxLength={6} /></View>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Business Details</Text>
                        <Text style={styles.stepSubtitle}>Tell us about your business</Text>
                        <CustomInput label="Business Name" placeholder="Your travel agency name" value={formData.businessName} onChangeText={(v) => updateField('businessName', v)} leftIcon="domain" required />
                        <CustomInput label="Business Type" placeholder="e.g., Travel Agency, Fleet Owner" value={formData.businessType} onChangeText={(v) => updateField('businessType', v)} leftIcon="briefcase" required />
                        <CustomInput label="Years in Business" placeholder="e.g., 5" value={formData.yearsInBusiness} onChangeText={(v) => updateField('yearsInBusiness', v)} keyboardType="numeric" leftIcon="clock-time-eight" required />
                        <CustomInput label="Monthly Revenue (₹)" placeholder="Average monthly revenue" value={formData.monthlyRevenue} onChangeText={(v) => updateField('monthlyRevenue', v)} keyboardType="numeric" leftIcon="currency-inr" required />
                    </View>
                );
            case 3:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Loan Requirements</Text>
                        <Text style={styles.stepSubtitle}>How much do you need?</Text>
                        <CustomInput label="Loan Amount (₹)" placeholder="Enter amount needed" value={formData.loanAmount} onChangeText={(v) => updateField('loanAmount', v)} keyboardType="numeric" leftIcon="cash" required />

                        <Text style={styles.inputLabel}>Loan Purpose *</Text>
                        <View style={styles.optionsGrid}>
                            {loanPurposes.map((purpose) => (
                                <TouchableOpacity key={purpose} style={[styles.optionChip, formData.loanPurpose === purpose && styles.optionChipActive]} onPress={() => updateField('loanPurpose', purpose)}>
                                    <Text style={[styles.optionText, formData.loanPurpose === purpose && styles.optionTextActive]}>{purpose}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.inputLabel}>Preferred Repayment Period *</Text>
                        <View style={styles.optionsGrid}>
                            {repaymentPeriods.map((period) => (
                                <TouchableOpacity key={period} style={[styles.optionChip, formData.repaymentPeriod === period && styles.optionChipActive]} onPress={() => updateField('repaymentPeriod', period)}>
                                    <Text style={[styles.optionText, formData.repaymentPeriod === period && styles.optionTextActive]}>{period}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <CustomInput label="Existing Loans (if any)" placeholder="Monthly EMI amount or 0" value={formData.existingLoans} onChangeText={(v) => updateField('existingLoans', v)} keyboardType="numeric" leftIcon="bank" />
                    </View>
                );
            case 4:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Document Details</Text>
                        <Text style={styles.stepSubtitle}>For verification purposes</Text>
                        <CustomInput label="PAN Number" placeholder="ABCDE1234F" value={formData.panNumber} onChangeText={(v) => updateField('panNumber', v.toUpperCase())} maxLength={10} leftIcon="card-account-details" required />
                        <CustomInput label="Aadhar Number" placeholder="12-digit Aadhar number" value={formData.aadharNumber} onChangeText={(v) => updateField('aadharNumber', v)} keyboardType="numeric" maxLength={12} leftIcon="fingerprint" required />
                        <CustomInput label="GST Number (if applicable)" placeholder="GST number" value={formData.gstNumber} onChangeText={(v) => updateField('gstNumber', v.toUpperCase())} leftIcon="file-document" />
                        <CustomInput label="Bank Account Number" placeholder="Account number" value={formData.bankAccountNumber} onChangeText={(v) => updateField('bankAccountNumber', v)} keyboardType="numeric" leftIcon="bank" required />
                        <CustomInput label="IFSC Code" placeholder="e.g., SBIN0001234" value={formData.ifscCode} onChangeText={(v) => updateField('ifscCode', v.toUpperCase())} maxLength={11} leftIcon="bank-outline" required />

                        <View style={styles.infoCard}>
                            <Icon name="information" size={24} color={colors.info} />
                            <View style={styles.infoContent}>
                                <Text style={styles.infoTitle}>What happens next?</Text>
                                <Text style={styles.infoText}>Our admin will review your application and contact you within 24-48 hours to discuss loan options.</Text>
                            </View>
                        </View>
                    </View>
                );
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

            {/* Curved Yellow Header */}
            <View style={styles.curvedHeader}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-left" size={24} color={colors.headerText} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Loan Application</Text>
                    <Text style={styles.stepIndicator}>{step}/4</Text>
                </View>

                {/* Progress Steps */}
                <View style={styles.progressContainer}>
                    {[1, 2, 3, 4].map((s) => (
                        <View key={s} style={styles.progressStep}>
                            <View style={[styles.progressDot, s <= step && styles.progressDotActive]}>
                                {s < step ? <Icon name="check" size={12} color={colors.primary} /> : <Text style={[styles.progressDotText, s <= step && styles.progressDotTextActive]}>{s}</Text>}
                            </View>
                            {s < 4 && <View style={[styles.progressLine, s < step && styles.progressLineActive]} />}
                        </View>
                    ))}
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {renderStep()}
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
                {step < 4 ? (
                    <CustomButton title="Continue" onPress={() => setStep(step + 1)} fullWidth icon="arrow-right" iconPosition="right" />
                ) : (
                    <CustomButton title="Submit Application" onPress={handleSubmit} loading={loading} fullWidth variant="success" />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    curvedHeader: { backgroundColor: colors.primary, paddingTop: spacing.xxl, paddingBottom: spacing.lg, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
    backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.surface + '30', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { ...typography.h3, color: colors.headerText },
    stepIndicator: { ...typography.body, color: colors.headerText, opacity: 0.8 },
    progressContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    progressStep: { flexDirection: 'row', alignItems: 'center' },
    progressDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.surface + '40', justifyContent: 'center', alignItems: 'center' },
    progressDotActive: { backgroundColor: colors.surface },
    progressDotText: { ...typography.caption, color: colors.surface, fontWeight: '600' },
    progressDotTextActive: { color: colors.primary },
    progressLine: { width: 40, height: 2, backgroundColor: colors.surface + '40', marginHorizontal: 4 },
    progressLineActive: { backgroundColor: colors.surface },
    scrollContent: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
    stepContent: {},
    stepTitle: { ...typography.h2, color: colors.text, marginBottom: spacing.xs },
    stepSubtitle: { ...typography.body, color: colors.textMuted, marginBottom: spacing.lg },
    inputLabel: { ...typography.bodySmall, fontWeight: '600', color: colors.text, marginBottom: spacing.xs, marginTop: spacing.sm },
    row: { flexDirection: 'row' },
    halfInput: { flex: 1, marginRight: spacing.sm },
    optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md },
    optionChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, marginRight: spacing.sm, marginBottom: spacing.sm, backgroundColor: colors.surface },
    optionChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    optionText: { ...typography.bodySmall, color: colors.text },
    optionTextActive: { color: colors.textOnPrimary, fontWeight: '600' },
    infoCard: { flexDirection: 'row', backgroundColor: colors.info + '15', padding: spacing.lg, borderRadius: borderRadius.xl, marginTop: spacing.lg },
    infoContent: { flex: 1, marginLeft: spacing.md },
    infoTitle: { ...typography.body, fontWeight: '600', color: colors.info, marginBottom: spacing.xs },
    infoText: { ...typography.bodySmall, color: colors.textLight },
    bottomButtons: { padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface },
});

export default LoanScreen;
