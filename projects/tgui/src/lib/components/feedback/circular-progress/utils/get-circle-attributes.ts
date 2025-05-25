export type CircleSize = 'small' | 'medium' | 'large';

export interface CircleAttributes {
  size: number;
  strokeWidth: number;
  radius: number;
}

export function getCircleAttributes(size: CircleSize): CircleAttributes | undefined {
  switch (size) {
    case 'large':
      return {
        size: 56,
        strokeWidth: 4,
        radius: 18,
      };

    case 'medium':
      return {
        size: 36,
        strokeWidth: 3,
        radius: 14,
      };

    case 'small':
      return {
        size: 28,
        strokeWidth: 3,
        radius: 10,
      };

    default:
      return undefined;
  }
} 