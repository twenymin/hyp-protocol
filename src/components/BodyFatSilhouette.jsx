import { C } from '../lib/tokens.js';

// Stylised body shape that gets wider as body fat increases.
export default function BodyFatSilhouette({ level, gender, selected }) {
  const widths = {
    shredded: 0.55, athletic: 0.62, fit: 0.7,
    average: 0.78, soft: 0.88, overweight: 1.0,
  };
  const w = widths[level] || 0.7;
  const color = selected ? C.pink : C.textDim;

  // Different proportions for genders
  const isFemale = gender === 'female';
  const waistFactor = isFemale ? 0.78 : 0.85;
  const hipFactor = isFemale ? 1.05 : 0.95;

  const baseWidth = 22 * w;
  const waistW = baseWidth * waistFactor;
  const hipW = baseWidth * hipFactor;
  const shoulderW = baseWidth;

  return (
    <svg width="60" height="84" viewBox="0 0 60 84" fill="none">
      {/* head */}
      <circle cx="30" cy="10" r="6" stroke={color} strokeWidth="1.5" fill="none" />
      {/* body */}
      <path
        d={`
          M ${30 - shoulderW * 0.5},20
          L ${30 - shoulderW * 0.6},32
          L ${30 - waistW * 0.5},48
          L ${30 - hipW * 0.55},62
          L ${30 - hipW * 0.4},78
          L ${30 - hipW * 0.18},78
          L ${30 - hipW * 0.1},64
          L ${30 + hipW * 0.1},64
          L ${30 + hipW * 0.18},78
          L ${30 + hipW * 0.4},78
          L ${30 + hipW * 0.55},62
          L ${30 + waistW * 0.5},48
          L ${30 + shoulderW * 0.6},32
          L ${30 + shoulderW * 0.5},20
          Z
        `}
        stroke={color}
        strokeWidth="1.5"
        fill={selected ? `${color}22` : 'none'}
      />
    </svg>
  );
}
