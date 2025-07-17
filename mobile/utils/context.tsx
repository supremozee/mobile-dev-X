import AsyncStorage from "@react-native-async-storage/async-storage";

import { ColorScheme } from "@/types/style";
import { createContext, ReactNode, useEffect, useState } from "react";
import { darkColors, lightColors } from "@/constants/colors";

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: ()=> void;
    colors:ColorScheme
}

export const ThemeContext = createContext<undefined| ThemeContextType>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};