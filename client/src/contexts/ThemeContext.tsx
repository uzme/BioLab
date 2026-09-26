import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";
type ContrastMode = "standard" | "high";
type DisplayMode = "standard" | "oled";

interface ThemeContextType {
  theme: Theme;
  themePreference: ThemePreference;
  toggleTheme?: () => void;
  useSystemTheme?: () => void;
  contrastMode: ContrastMode;
  toggleContrastMode?: () => void;
  displayMode: DisplayMode;
  toggleOledMode?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const getSystemTheme = (): Theme => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const [themePreference, setThemePreference] = useState<ThemePreference>(() => {
    if (!switchable) return defaultTheme;
    const stored = localStorage.getItem("biolab-theme-preference");
    return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
  });
  const [theme, setTheme] = useState<Theme>(() => themePreference === "system" ? getSystemTheme() : themePreference);
  const [contrastMode, setContrastMode] = useState<ContrastMode>(() => localStorage.getItem("biolab-contrast-mode") === "high" ? "high" : "standard");
  const [displayMode, setDisplayMode] = useState<DisplayMode>(() => localStorage.getItem("biolab-display-mode") === "oled" ? "oled" : "standard");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyPreference = () => setTheme(themePreference === "system" ? (media.matches ? "dark" : "light") : themePreference);
    applyPreference();
    if (themePreference !== "system") return undefined;
    media.addEventListener("change", applyPreference);
    return () => media.removeEventListener("change", applyPreference);
  }, [themePreference]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.classList.toggle("high-contrast", contrastMode === "high");
    root.classList.toggle("oled", displayMode === "oled");
    document.body.style.backgroundColor = theme === "dark" && displayMode === "oled" ? "#000" : "";

    if (switchable) {
      localStorage.setItem("biolab-theme-preference", themePreference);
      localStorage.setItem("biolab-contrast-mode", contrastMode);
      localStorage.setItem("biolab-display-mode", displayMode);
    }
  }, [contrastMode, displayMode, theme, themePreference, switchable]);

  const toggleTheme = switchable
    ? () => {
        setThemePreference((preference) => {
          const activeTheme = preference === "system" ? getSystemTheme() : preference;
          return activeTheme === "light" ? "dark" : "light";
        });
      }
    : undefined;
  const useSystemTheme = switchable ? () => setThemePreference("system") : undefined;
  const toggleContrastMode = switchable ? () => setContrastMode((mode) => mode === "standard" ? "high" : "standard") : undefined;
  const toggleOledMode = switchable ? () => {
    const nextMode: DisplayMode = displayMode === "standard" ? "oled" : "standard";
    setDisplayMode(nextMode);
    // Apply the critical black surface immediately as well as in the effect below.
    // This avoids a visible one-frame flash and makes the iOS/Safari toggle deterministic.
    if (theme === "dark") {
      document.documentElement.classList.toggle("oled", nextMode === "oled");
      document.body.style.backgroundColor = nextMode === "oled" ? "#000" : "";
    }
  } : undefined;

  return (
    <ThemeContext.Provider value={{ theme, themePreference, toggleTheme, useSystemTheme, contrastMode, toggleContrastMode, displayMode, toggleOledMode, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
