// UTurn Vendor App Theme Configuration
// Primary: Yellow | Accents: Red, Green, Blue, Purple
// NO GRADIENTS - Flat modern design

export const colors = {
    // Primary Colors - Yellow
    primary: '#FFD700',        // Golden Yellow - Main brand
    primaryDark: '#F5C400',
    primaryLight: '#FFDF40',

    // Accent Colors
    accent: '#7B2CBF',         // Purple
    accentBlue: '#2196F3',     // Blue
    accentRed: '#E53935',      // Red
    accentGreen: '#43A047',    // Green

    // Success/Error/Warning
    success: '#43A047',
    error: '#E53935',
    warning: '#FF9800',
    info: '#2196F3',

    // Neutral Colors
    background: '#F8F9FE',
    surface: '#FFFFFF',
    surfaceLight: '#FAFAFA',

    // Header (curved) - Yellow based
    headerBg: '#FFD700',
    headerText: '#1A1A2E',

    // Text Colors
    text: '#1A1A2E',
    textLight: '#4A4A6A',
    textMuted: '#8E8EA9',
    textOnPrimary: '#1A1A2E',
    textOnDark: '#FFFFFF',

    // Border Colors
    border: '#E8E8F0',
    borderLight: '#F0F0F5',

    // Status Colors
    pending: '#FF9800',
    cancelled: '#E53935',
    completed: '#43A047',
    saved: '#2196F3',

    // Card backgrounds
    cardPurple: '#7B2CBF',
    cardBlue: '#2196F3',
    cardGreen: '#43A047',
    cardRed: '#E53935',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
};

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
};

export const typography = {
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    button: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
};

export const shadows = {
    sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
    lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 8 },
};

export default { colors, spacing, borderRadius, typography, shadows };
