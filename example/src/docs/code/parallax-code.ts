export const simpleParallax = (dark: boolean, props: string) => {
  const p = props ? props + ' ' : ''
  return `<Parallax src='images/dessert-night.jpg' containerId='mainView' ${p}/>`
}
