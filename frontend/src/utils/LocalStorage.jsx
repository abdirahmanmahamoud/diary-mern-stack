export const getlocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const RemovelocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const GetFormlocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
