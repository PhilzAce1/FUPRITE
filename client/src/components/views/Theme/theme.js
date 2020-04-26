import React, { useState } from 'react';
const themes = {
  dark: {
    bgcolor: '#2c2e5e',
    bgsecondarycolor: '#f5f8fa',
    bodyfontcolor: 'white',
    primarytextcolor: 'black',
    primarybordercolor: 'rgba(0, 0, 0, 0.164)',
    primaryshadowcolor: '#f3f1f1',
    lastbordercolor: 'black',
    primaryshadowcolor: 'black',
  },
  light: {
    bgcolor: 'white',
    bgsecondarycolor: '#f5f8fa',
    bodyfontcolor: 'black',
    bodyfontcolor: '#24292e',
    primarytextcolor: 'black',
    primarybordercolor: 'rgba(0, 0, 0, 0.164)',
    lastbordercolor: '#e8e8e8',
    primaryshadowcolor: '#f3f1f1',
  },
  twitterDim: {
    bgcolor: '#15202B',
    bgsecondarycolor: '#f5f8fa',
    bodyfontcolor: 'white',
    primarytextcolor: 'gray',
    primarybordercolor: 'rgba(0, 0, 0, 0.164)',
    lastbordercolor: '#e8e8e8',
    primaryshadowcolor: 'none',
  },
  twitterLightOut: {
    bgcolor: '#000000',
    bgsecondarycolor: '#000000',
    bodyfontcolor: '#D9D9D9',
    primarytextcolor: '#D9D9D9',
    primarybordercolor: '#202327',
    lastbordercolor: '#202327',
    primaryshadowcolor: '#202327',
  },
};
const setCSSVariables = (theme) => {
  for (const value in theme) {
    document.documentElement.style.setProperty(`--${value}`, theme[value]);
  }
};
export const ThemeSelectorContext = React.createContext({
  themeName: 'dark',
  toggleTheme: (themeName) => {
    if (themeName === 'light') {
      //   setTheme(themes.light);
      //   setThemeName('light');
      setCSSVariables(themes.light);
    } else if (themeName === 'twitterDim') {
      setCSSVariables(themes.twitterDim);
    } else if (themeName === 'twitterLightOut') {
      setCSSVariables(themes.twitterLightOut);
    } else {
      //   setTheme(themes.dark);
      //   setThemeName('dark');
      setCSSVariables(themes.dark);
    }
  },
});

export default ({ children }) => {
  const [themeName, setThemeName] = useState('dark');

  return (
    <ThemeSelectorContext.Provider value={{ themeName }}>
      {children}
    </ThemeSelectorContext.Provider>
  );
};
