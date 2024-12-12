
import Clear from './Clear';
import Function from './Function';
export const actionMap = {
  clear: Clear,
  function: Function,
} as const;

export type ActionKeys = keyof typeof actionMap;
