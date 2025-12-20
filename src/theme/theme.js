// UTurn App Theme Configuration
// Color Scheme: Yellow, Red, Green

export const colors = {
    // Primary Colors
    primary: '#FFD700',        // Golden Yellow - Main brand color
    primaryDark: '#E6C200',    // Darker yellow for pressed states
    primaryLight: '#FFF176',   // Lighter yellow for backgrounds

    // Accent Colors
    secondary: '#E53935',      // Red - CTAs, alerts
    secondaryDark: '#C62828',  // Darker red
    secondaryLight: '#EF5350', // Lighter red

    // Success/Active Colors
    success: '#43A047',        // Green - Success, online status
    successDark: '#2E7D32',    // Darker green
    successLight: '#66BB6A',   // Lighter green

    // Neutral Colors
    background: '#FFFFFF',
    backgroundDark: '#1A1A2E',
    surface: '#F5F5F5',
    surfaceDark: '#2A2A4A',

    // Text Colors
    text: '#333333',
    textLight: '#666666',
    textMuted: '#999999',
    textOnPrimary: '#1A1A1A',
    textOnDark: '#FFFFFF',

    // Border Colors
    border: '#E0E0E0',
    borderDark: '#404060',

    // Status Colors
    pending: '#FFA726',
    cancelled: '#EF5350',
    completed: '#43A047',
    saved: '#42A5F5',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
};

export const typography = {
    h1: {
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 36,
    },
    h2: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 32,
    },
    h3: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 28,
    },
    body: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
    },
    bodySmall: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    caption: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
    },
    button: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
    },
};

export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
};

export default {
    colors,
    spacing,
    borderRadius,
    typography,
    shadows,
};
