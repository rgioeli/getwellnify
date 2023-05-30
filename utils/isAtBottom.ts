export const isAtBottom = () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const body = document.body;
  const html = document.documentElement;
  const totalHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  return scrollPosition + windowHeight >= totalHeight;
};
