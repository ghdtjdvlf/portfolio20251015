// Emotion - CSS-in-JS styling with Apple Design
import { css } from '@emotion/react';

export const theme = {
  colors: {
    // Apple-inspired colors
    primary: '#007AFF',
    primaryHover: '#0051D5',
    secondary: '#5AC8FA',
    danger: '#FF3B30',
    dangerHover: '#D70015',
    success: '#34C759',
    warning: '#FF9500',
    background: '#F2F2F7',
    backgroundDark: '#000000',
    surface: '#FFFFFF',
    surfaceSecondary: '#F9F9F9',
    border: '#C6C6C8',
    borderLight: '#E5E5EA',
    text: '#000000',
    textSecondary: '#8E8E93',
    textTertiary: '#C7C7CC',
    completed: '#8E8E93',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 12px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.15)',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },
  transitions: {
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  blur: {
    sm: 'blur(10px)',
    md: 'blur(20px)',
    lg: 'blur(40px)',
  },
};

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text',
                 'Helvetica Neue', Arial, sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.47059;
    letter-spacing: -0.022em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all ${theme.transitions.fast};

    &:active {
      transform: scale(0.98);
    }
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: opacity ${theme.transitions.fast};

    &:hover {
      opacity: 0.8;
    }
  }

  input, textarea {
    font-family: inherit;
    outline: none;
    border: none;
  }
`;
