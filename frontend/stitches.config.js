import { createStitches } from '@stitches/react';

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config,
} = createStitches({
    theme: {
        colors: {
            bgMain: '#10131E', // Base background matching screenshots
            bgSidebar: '#0A0C14', // Darker sidebar
            bgCard: 'rgba(21, 26, 38, 0.7)', // Translucent card background
            bgCardSolid: '#151A26',
            bgCardHover: 'rgba(30, 37, 52, 0.8)',
            bgCardHighlight: 'rgba(37, 99, 235, 0.05)',

            textMain: '#F8FAFC',
            textMuted: '#94A3B8',
            textAccent: '#3B82F6',

            borderMain: 'rgba(255, 255, 255, 0.08)',
            borderHighlight: '#3B82F6',

            statusSuccess: '#10B981',
            statusSuccessBg: 'rgba(16, 185, 129, 0.15)',
            statusWarning: '#F59E0B',
            statusWarningBg: 'rgba(245, 158, 11, 0.15)',
            statusDanger: '#EF4444',
            statusDangerBg: 'rgba(239, 68, 68, 0.15)',

            btnPrimary: '#2563EB',
            btnPrimaryHover: '#1D4ED8',
            btnSecondary: 'rgba(255, 255, 255, 0.05)',
            btnSecondaryHover: 'rgba(255, 255, 255, 0.1)',
            btnWhite: '#FFFFFF',
            btnWhiteHover: '#F1F5F9',
        },
        space: {
            1: '4px',
            2: '8px',
            3: '16px',
            4: '24px',
            5: '32px',
            6: '48px',
            7: '64px',
        },
        fontSizes: {
            1: '12px',
            2: '14px',
            3: '16px',
            4: '20px',
            5: '24px',
            6: '32px',
            7: '48px',
        },
        fonts: {
            main: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            heading: '"Outfit", "Inter", sans-serif',
            mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        },
        fontWeights: {
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
        lineHeights: {
            normal: '1.5',
            tight: '1.2',
        },
        radii: {
            1: '4px',
            2: '8px',
            3: '12px',
            4: '16px',
            round: '9999px',
        },
        shadows: {
            subtle: '0 4px 12px rgba(0, 0, 0, 0.2)',
            glow: '0 0 20px rgba(37, 99, 235, 0.25)',
            innerHighlight: 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
        },
    },
    media: {
        sm: '(min-width: 640px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 1024px)',
        xl: '(min-width: 1280px)',
    },
});

export const globalStyles = globalCss({
    '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
    'html, body, #root': {
        height: '100%',
        width: '100%',
        fontFamily: '$main',
        backgroundColor: '$bgMain',
        color: '$textMain',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
    },
    'h1, h2, h3, h4, h5, h6': {
        fontFamily: '$heading',
        fontWeight: '$bold',
    },
    'a': {
        color: 'inherit',
        textDecoration: 'none',
    },
    'button': {
        fontFamily: '$main',
        border: 'none',
        cursor: 'pointer',
        background: 'transparent',
    },
    'input, textarea': {
        fontFamily: '$main',
    },
    '::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
    },
    '::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '$round',
    },
    '::-webkit-scrollbar-thumb:hover': {
        background: 'rgba(255, 255, 255, 0.2)',
    },
});
