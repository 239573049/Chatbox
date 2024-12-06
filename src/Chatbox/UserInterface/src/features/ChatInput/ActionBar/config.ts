
import Clear from './Clear';
export const actionMap = {
  clear: Clear,
} as const;

export type ActionKeys = keyof typeof actionMap;
