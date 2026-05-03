// Design tokens — palette + fonts + clip paths.
// GTA Vice City + Miami neon + FC 26 tier metallics.

export const C = {
  bg: '#0F0B1A',
  bgPanel: '#15101F',
  bgCard: '#1B1428',
  surface: '#251B36',
  surfaceLight: '#2F2342',
  border: '#3A2D52',
  borderBright: '#4F3D6E',

  pink: '#FF2E63', pinkGlow: 'rgba(255, 46, 99, 0.55)',
  pinkSoft: 'rgba(255, 46, 99, 0.10)', pinkBorder: 'rgba(255, 46, 99, 0.40)',
  teal: '#00D9C0', tealGlow: 'rgba(0, 217, 192, 0.45)',
  tealSoft: 'rgba(0, 217, 192, 0.10)', tealBorder: 'rgba(0, 217, 192, 0.40)',

  bronze: '#C77D4A', bronzeGlow: 'rgba(199, 125, 74, 0.55)',
  silver: '#D8DCE3', silverGlow: 'rgba(216, 220, 227, 0.55)',
  gold: '#F2C94C', goldGlow: 'rgba(242, 201, 76, 0.65)',

  text: '#F2EBD9', textDim: '#A89FB5', textFaint: '#6F6580',
  success: '#00D9A0', danger: '#FF4757',

  // Legacy aliases — point to new palette so existing code keeps working
  yellow: '#FF2E63', yellowGlow: 'rgba(255, 46, 99, 0.55)',
  yellowSoft: 'rgba(255, 46, 99, 0.10)', yellowBorder: 'rgba(255, 46, 99, 0.40)',
  cyan: '#00D9C0', cyanSoft: 'rgba(0, 217, 192, 0.10)', cyanBorder: 'rgba(0, 217, 192, 0.40)',
  magenta: '#FF2E63', magentaSoft: 'rgba(255, 46, 99, 0.10)',
};

export const F = {
  display: '"Bebas Neue", "Anton", "Arial Narrow", sans-serif',
  body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  mono: '"IBM Plex Mono", "JetBrains Mono", "SF Mono", monospace',
};

export const angleClip = 'polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px))';
export const smallAngleClip = 'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))';
