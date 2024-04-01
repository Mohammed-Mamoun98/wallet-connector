export function isMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android|windows phone/g.test(userAgent);
  const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(
    userAgent
  );

  return isMobile || isTablet;
}
