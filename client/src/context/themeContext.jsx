import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

// Custom hook for using theme
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((dark) => !dark);
  };

  const value = {
    darkMode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
