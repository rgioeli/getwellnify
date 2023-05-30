export const debounce = (func: Function, delay: number) => {
  let timeoutId: any;
  return (e: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(e);
    }, delay);
  };
};
