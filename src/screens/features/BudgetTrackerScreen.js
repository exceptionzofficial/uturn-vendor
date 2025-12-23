import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, TextInput, Modal, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme/theme';

const { width } = Dimensions.get('window');

const BudgetTrackerScreen = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [entryType, setEntryType] = useState('income');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const budgetData = {
        totalIncome: 185000,
        totalExpense: 42500,
        entries: [
            { id: 1, type: 'income', category: 'Trip Bookings', amount: 85000, date: 'Today' },
            { id: 2, type: 'expense', category: 'Driver Commission', amount: 12000, date: 'Today' },
            { id: 3, type: 'income', category: 'Subscription', amount: 15000, date: 'Yesterday' },
            { id: 4, type: 'expense', category: 'Marketing', amount: 5000, date: 'Yesterday' },
            { id: 5, type: 'expense', category: 'Office Rent', amount: 15000, date: '15 Dec' },
            { id: 6, type: 'income', category: 'Trip Bookings', amount: 85000, date: '14 Dec' },
        ],
    };

    const incomeCategories = ['Trip Bookings', 'Subscription', 'Referral', 'Other'];
    const expenseCategories = ['Driver Commission', 'Marketing', 'Office Rent', 'Fuel', 'Vehicle Maintenance', 'Other'];

    const balance = budgetData.totalIncome - budgetData.totalExpense;

    const chartData = [
        { month: 'Jan', income: 120, expense: 45 },
        { month: 'Feb', income: 150, expense: 60 },
        { month: 'Mar', income: 180, expense: 55 },
        { month: 'Apr', income: 140, expense: 70 },
        { month: 'May', income: 200, expense: 65 },
        { month: 'Jun', income: 185, expense: 42 },
    ];
    const maxValue = Math.max(...chartData.map(d => Math.max(d.income, d.expense)));

    const handleAddEntry = () => {
        if (!amount || !category) { Alert.alert('Required', 'Please fill amount and category'); return; }
        Alert.alert('Added', `${entryType === 'income' ? '+' : '-'}₹${amount} for ${category}`);
        setShowModal(false); setAmount(''); setCategory(''); setDescription('');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

            {/* Curved Yellow Header */}
            <View style={styles.curvedHeader}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-left" size={24} color={colors.headerText} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Statistic</Text>
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Icon name="plus-circle" size={28} color={colors.headerText} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.balanceLabel}>Total Balance</Text>
                <Text style={styles.balanceAmount}>₹{balance.toLocaleString('en-IN')}</Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Overview Chart */}
                <View style={styles.chartCard}>
                    <View style={styles.chartHeader}>
                        <Text style={styles.chartTitle}>Overview</Text>
                        <TouchableOpacity style={styles.monthDropdown}>
                            <Text style={styles.monthText}>Month</Text>
                            <Icon name="chevron-down" size={16} color={colors.textLight} />
                        </TouchableOpacity>
                    </View>

                    {/* Bar Chart */}
                    <View style={styles.chartContainer}>
                        <View style={styles.yAxis}>
                            {[40, 30, 20, 10, 0].map((val) => (
                                <Text key={val} style={styles.yAxisLabel}>{val}k</Text>
                            ))}
                        </View>
                        <View style={styles.barsContainer}>
                            {chartData.map((item, index) => (
                                <View key={index} style={styles.barGroup}>
                                    <View style={styles.barsWrapper}>
                                        <View style={[styles.bar, styles.incomeBar, { height: (item.income / maxValue) * 100 }]} />
                                        <View style={[styles.bar, styles.expenseBar, { height: (item.expense / maxValue) * 100 }]} />
                                    </View>
                                    <Text style={styles.barLabel}>{item.month}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
                            <Text style={styles.legendText}>Income</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.accentRed }]} />
                            <Text style={styles.legendText}>Expense</Text>
                        </View>
                    </View>
                </View>

                {/* Income/Expense Cards */}
                <View style={styles.summaryCards}>
                    <View style={[styles.summaryCard, { backgroundColor: colors.accent }]}>
                        <View style={styles.summaryIconCircle}>
                            <Icon name="arrow-down" size={20} color={colors.accent} />
                        </View>
                        <Text style={styles.summaryLabel}>Income</Text>
                        <Text style={styles.summaryAmount}>₹{budgetData.totalIncome.toLocaleString('en-IN')}</Text>
                    </View>
                    <View style={[styles.summaryCard, { backgroundColor: colors.accentRed }]}>
                        <View style={styles.summaryIconCircle}>
                            <Icon name="arrow-up" size={20} color={colors.accentRed} />
                        </View>
                        <Text style={styles.summaryLabel}>Expense</Text>
                        <Text style={styles.summaryAmount}>₹{budgetData.totalExpense.toLocaleString('en-IN')}</Text>
                    </View>
                </View>

                {/* Recent Transactions */}
                <View style={styles.transactionsCard}>
                    <Text style={styles.sectionTitle}>Recent Entries</Text>
                    {budgetData.entries.map((entry) => (
                        <View key={entry.id} style={styles.entryItem}>
                            <View style={[styles.entryIcon, { backgroundColor: entry.type === 'income' ? colors.success + '20' : colors.error + '20' }]}>
                                <Icon name={entry.type === 'income' ? 'arrow-down' : 'arrow-up'} size={18} color={entry.type === 'income' ? colors.success : colors.error} />
                            </View>
                            <View style={styles.entryInfo}>
                                <Text style={styles.entryCategory}>{entry.category}</Text>
                                <Text style={styles.entryDate}>{entry.date}</Text>
                            </View>
                            <Text style={[styles.entryAmount, { color: entry.type === 'income' ? colors.success : colors.error }]}>
                                {entry.type === 'income' ? '+' : '-'}₹{entry.amount.toLocaleString('en-IN')}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Add Entry Modal */}
            <Modal visible={showModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add Entry</Text>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <Icon name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.typeToggle}>
                            <TouchableOpacity style={[styles.typeButton, entryType === 'income' && styles.typeButtonActiveIncome]} onPress={() => setEntryType('income')}>
                                <Text style={[styles.typeText, entryType === 'income' && styles.typeTextActive]}>Income</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.typeButton, entryType === 'expense' && styles.typeButtonActiveExpense]} onPress={() => setEntryType('expense')}>
                                <Text style={[styles.typeText, entryType === 'expense' && styles.typeTextActive]}>Expense</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.amountInput}>
                            <Text style={styles.currencySymbol}>₹</Text>
                            <TextInput style={styles.input} placeholder="0" value={amount} onChangeText={setAmount} keyboardType="numeric" placeholderTextColor={colors.textMuted} />
                        </View>

                        <Text style={styles.inputLabel}>Category</Text>
                        <View style={styles.categoryGrid}>
                            {(entryType === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                                <TouchableOpacity key={cat} style={[styles.categoryChip, category === cat && styles.categoryChipActive]} onPress={() => setCategory(cat)}>
                                    <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TextInput style={styles.descInput} placeholder="Description (optional)" value={description} onChangeText={setDescription} placeholderTextColor={colors.textMuted} />

                        <CustomButton title="Add Entry" onPress={handleAddEntry} fullWidth />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    curvedHeader: { backgroundColor: colors.primary, paddingTop: spacing.xxl, paddingBottom: spacing.xxl, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
    backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.surface + '30', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { ...typography.h3, color: colors.headerText },
    balanceLabel: { ...typography.bodySmall, color: colors.headerText, opacity: 0.8, textAlign: 'center' },
    balanceAmount: { fontSize: 36, fontWeight: '700', color: colors.headerText, textAlign: 'center' },
    scrollView: { flex: 1 },
    scrollContent: { padding: spacing.lg },
    chartCard: { backgroundColor: colors.surface, borderRadius: borderRadius.xxl, padding: spacing.lg, marginBottom: spacing.lg, ...shadows.md },
    chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
    chartTitle: { ...typography.h3, color: colors.text },
    monthDropdown: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.lg },
    monthText: { ...typography.bodySmall, color: colors.textLight, marginRight: 4 },
    chartContainer: { flexDirection: 'row', height: 150, marginBottom: spacing.md },
    yAxis: { width: 30, justifyContent: 'space-between', paddingBottom: 20 },
    yAxisLabel: { ...typography.caption, color: colors.textMuted },
    barsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' },
    barGroup: { alignItems: 'center' },
    barsWrapper: { flexDirection: 'row', alignItems: 'flex-end', height: 100 },
    bar: { width: 10, borderRadius: 5, marginHorizontal: 2 },
    incomeBar: { backgroundColor: colors.accent },
    expenseBar: { backgroundColor: colors.accentRed },
    barLabel: { ...typography.caption, color: colors.textMuted, marginTop: 4 },
    legend: { flexDirection: 'row', justifyContent: 'center' },
    legendItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: spacing.md },
    legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
    legendText: { ...typography.caption, color: colors.textLight },
    summaryCards: { flexDirection: 'row', marginBottom: spacing.lg },
    summaryCard: { flex: 1, borderRadius: borderRadius.xxl, padding: spacing.lg, marginRight: spacing.sm, ...shadows.md },
    summaryIconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
    summaryLabel: { ...typography.bodySmall, color: colors.textOnDark, opacity: 0.9 },
    summaryAmount: { ...typography.h3, color: colors.textOnDark },
    transactionsCard: { backgroundColor: colors.surface, borderRadius: borderRadius.xxl, padding: spacing.lg, ...shadows.md, marginBottom: spacing.xxl },
    sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
    entryItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
    entryIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    entryInfo: { flex: 1, marginLeft: spacing.md },
    entryCategory: { ...typography.body, color: colors.text },
    entryDate: { ...typography.caption, color: colors.textMuted },
    entryAmount: { ...typography.body, fontWeight: '700' },
    modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
    modalContent: { backgroundColor: colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: spacing.lg, paddingBottom: spacing.xxl },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
    modalTitle: { ...typography.h3, color: colors.text },
    typeToggle: { flexDirection: 'row', marginBottom: spacing.lg },
    typeButton: { flex: 1, padding: spacing.md, alignItems: 'center', borderRadius: borderRadius.lg, backgroundColor: colors.background },
    typeButtonActiveIncome: { backgroundColor: colors.success },
    typeButtonActiveExpense: { backgroundColor: colors.error },
    typeText: { ...typography.body, color: colors.textMuted },
    typeTextActive: { color: colors.textOnDark, fontWeight: '600' },
    amountInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.background, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md, marginBottom: spacing.md },
    currencySymbol: { ...typography.h1, color: colors.text },
    input: { flex: 1, ...typography.h1, color: colors.text, paddingVertical: spacing.md, marginLeft: spacing.sm },
    inputLabel: { ...typography.bodySmall, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
    categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.md },
    categoryChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border, marginRight: spacing.sm, marginBottom: spacing.sm },
    categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    categoryText: { ...typography.bodySmall, color: colors.text },
    categoryTextActive: { color: colors.textOnPrimary, fontWeight: '600' },
    descInput: { ...typography.body, backgroundColor: colors.background, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.lg, color: colors.text },
});

export default BudgetTrackerScreen;
