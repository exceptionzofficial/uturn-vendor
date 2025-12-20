import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/CustomButton';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/theme';

const WalletScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const walletData = {
        balance: 2500,
        transactions: [
            { id: 1, type: 'credit', amount: 1000, description: 'Wallet Recharge', date: '15 Dec 2024', status: 'success' },
            { id: 2, type: 'debit', amount: 499, description: 'Pro Subscription', date: '14 Dec 2024', status: 'success' },
            { id: 3, type: 'credit', amount: 500, description: 'Referral Commission', date: '12 Dec 2024', status: 'success' },
            { id: 4, type: 'debit', amount: 100, description: 'Driver Commission', date: '10 Dec 2024', status: 'success' },
        ],
    };

    const quickAmounts = [500, 1000, 2000, 5000];

    const handleAddMoney = () => {
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', `₹${amount} added to wallet successfully!`);
            setAmount('');
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Wallet</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Balance Card */}
                <LinearGradient colors={[colors.success, colors.successDark]} style={styles.balanceCard}>
                    <Icon name="wallet" size={40} color={colors.textOnDark} />
                    <Text style={styles.balanceLabel}>Available Balance</Text>
                    <Text style={styles.balanceAmount}>₹{walletData.balance.toLocaleString()}</Text>
                    <Text style={styles.balanceNote}>Use for subscriptions & commissions</Text>
                </LinearGradient>

                {/* Add Money Section */}
                <View style={styles.addMoneySection}>
                    <Text style={styles.sectionTitle}>Add Money</Text>

                    {/* Quick Amounts */}
                    <View style={styles.quickAmounts}>
                        {quickAmounts.map((amt) => (
                            <TouchableOpacity key={amt} style={[styles.quickAmountBtn, amount === String(amt) && styles.quickAmountBtnActive]} onPress={() => setAmount(String(amt))}>
                                <Text style={[styles.quickAmountText, amount === String(amt) && styles.quickAmountTextActive]}>₹{amt}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Custom Amount */}
                    <View style={styles.amountInputContainer}>
                        <Text style={styles.currencySymbol}>₹</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="Enter amount"
                            placeholderTextColor={colors.textMuted}
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                        />
                    </View>

                    <CustomButton title="Add Money" onPress={handleAddMoney} loading={loading} fullWidth style={styles.addButton} />
                </View>

                {/* Transactions */}
                <View style={styles.transactionsSection}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    {walletData.transactions.map((txn) => (
                        <View key={txn.id} style={styles.transactionItem}>
                            <View style={[styles.txnIcon, { backgroundColor: txn.type === 'credit' ? colors.success + '15' : colors.secondary + '15' }]}>
                                <Icon name={txn.type === 'credit' ? 'arrow-down' : 'arrow-up'} size={20} color={txn.type === 'credit' ? colors.success : colors.secondary} />
                            </View>
                            <View style={styles.txnInfo}>
                                <Text style={styles.txnDescription}>{txn.description}</Text>
                                <Text style={styles.txnDate}>{txn.date}</Text>
                            </View>
                            <Text style={[styles.txnAmount, { color: txn.type === 'credit' ? colors.success : colors.secondary }]}>
                                {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg, paddingTop: spacing.xl, backgroundColor: colors.background },
    headerTitle: { ...typography.h3, color: colors.text },
    scrollContent: { padding: spacing.lg },
    balanceCard: { borderRadius: borderRadius.xl, padding: spacing.xl, alignItems: 'center', marginBottom: spacing.lg },
    balanceLabel: { ...typography.body, color: colors.textOnDark, opacity: 0.9, marginTop: spacing.sm },
    balanceAmount: { fontSize: 40, fontWeight: '700', color: colors.textOnDark, marginTop: spacing.xs },
    balanceNote: { ...typography.caption, color: colors.textOnDark, opacity: 0.7, marginTop: spacing.xs },
    addMoneySection: { backgroundColor: colors.background, borderRadius: borderRadius.xl, padding: spacing.lg, marginBottom: spacing.lg, ...shadows.sm },
    sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
    quickAmounts: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
    quickAmountBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border },
    quickAmountBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    quickAmountText: { ...typography.body, color: colors.text },
    quickAmountTextActive: { color: colors.textOnPrimary, fontWeight: '600' },
    amountInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md, marginBottom: spacing.md },
    currencySymbol: { ...typography.h2, color: colors.text, marginRight: spacing.sm },
    amountInput: { flex: 1, ...typography.h2, color: colors.text, paddingVertical: spacing.md },
    addButton: { marginTop: spacing.sm },
    transactionsSection: { backgroundColor: colors.background, borderRadius: borderRadius.xl, padding: spacing.lg, ...shadows.sm },
    transactionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
    txnIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    txnInfo: { flex: 1, marginLeft: spacing.md },
    txnDescription: { ...typography.body, color: colors.text },
    txnDate: { ...typography.caption, color: colors.textMuted },
    txnAmount: { ...typography.body, fontWeight: '700' },
});

export default WalletScreen;
