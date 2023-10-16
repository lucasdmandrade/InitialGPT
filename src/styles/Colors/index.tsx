export interface SystemColors {
  background: string;
  blackLight: string;
  darkFont: string;
  active: string;
  white: string;
  whiteDark: string;
}

interface Colors {
  dark: SystemColors;
  light: SystemColors;
}

const colors: Colors = {
  dark: {
    background: '#191a20',
    blackLight: '#2d2f39',
    darkFont: '#ffffff99',
    active: '#b4bef2',
    white: '#fff',
    whiteDark: '#ffffffcc',
  },
  light: {
    background: '#191a20',
    blackLight: '#2d2f39',
    darkFont: '#ffffff99',
    active: '#b4bef2',
    white: '#fff',
    whiteDark: '#ffffffcc',
  },
};

export default colors;
