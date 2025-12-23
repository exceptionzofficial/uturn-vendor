import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/theme';
import DrawerContent from '../components/DrawerContent';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import SubscriptionScreen from '../screens/auth/SubscriptionScreen';

// Main Screens
import DashboardScreen from '../screens/main/DashboardScreen';
import AddTripScreen from '../screens/main/AddTripScreen';
import TripHistoryScreen from '../screens/main/TripHistoryScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import ReferralScreen from '../screens/main/ReferralScreen';
import WalletScreen from '../screens/main/WalletScreen';

// Trip Screens
import SavedTripsScreen from '../screens/trips/SavedTripsScreen';
import ActiveTripsScreen from '../screens/trips/ActiveTripsScreen';
import TripDetailsScreen from '../screens/trips/TripDetailsScreen';

// Feature Screens
import BudgetTrackerScreen from '../screens/features/BudgetTrackerScreen';
import LoanScreen from '../screens/features/LoanScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Bottom Tab Navigator
const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarStyle: {
                    height: 65,
                    paddingBottom: 10,
                    paddingTop: 5,
                    backgroundColor: colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                },
                tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Dashboard': iconName = focused ? 'home' : 'home-outline'; break;
                        case 'AddTrip': iconName = 'plus-circle'; break;
                        case 'TripHistory': iconName = 'history'; break;
                        case 'Profile': iconName = focused ? 'account' : 'account-outline'; break;
                        default: iconName = 'circle';
                    }
                    return <Icon name={iconName} size={route.name === 'AddTrip' ? 32 : 24} color={color} />;
                },
            })}>
            <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="AddTrip" component={AddTripScreen} options={{ tabBarLabel: 'Add Trip' }} />
            <Tab.Screen name="TripHistory" component={TripHistoryScreen} options={{ tabBarLabel: 'History' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

// Drawer Navigator wrapping Tabs
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                drawerStyle: { width: '80%' },
            }}>
            <Drawer.Screen name="MainTabs" component={MainTabs} />
        </Drawer.Navigator>
    );
};

// Main Navigator
const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Auth Stack */}
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="OTP" component={OTPScreen} />
                <Stack.Screen name="Subscription" component={SubscriptionScreen} />

                {/* Main App with Drawer */}
                <Stack.Screen name="DrawerNav" component={DrawerNavigator} />

                {/* Additional Screens */}
                <Stack.Screen name="Referral" component={ReferralScreen} />
                <Stack.Screen name="Wallet" component={WalletScreen} />
                <Stack.Screen name="SavedTrips" component={SavedTripsScreen} />
                <Stack.Screen name="ActiveTrips" component={ActiveTripsScreen} />
                <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
                <Stack.Screen name="BudgetTracker" component={BudgetTrackerScreen} />
                <Stack.Screen name="Loan" component={LoanScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
