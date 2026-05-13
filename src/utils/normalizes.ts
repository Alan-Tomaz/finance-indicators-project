export const normalizeDy = (dy: number): number => {
  return dy > 1 ? dy : dy * 100;
};
