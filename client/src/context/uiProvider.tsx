import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";

const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    if (colorScheme === "light")
      document.getElementById("root")?.classList.add("grayBg");
    else document.getElementById("root")?.classList.remove("grayBg");
  }, [colorScheme]);

  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        {children}
      </ColorSchemeProvider>
    </MantineProvider>
  );
};

export default UiProvider;
