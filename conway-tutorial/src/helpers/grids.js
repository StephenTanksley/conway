const size = 20;

export const newGrid = () => {
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push(Array.from(Array(size), () => 0));
  }
  return rows;
};

export const randomGrid = () => {
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push(Array.from(Array(size), () => (Math.random() > 0.6 ? 1 : 0)));
  }
  return rows;
};
