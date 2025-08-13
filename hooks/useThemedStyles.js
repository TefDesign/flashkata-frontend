// hooks/useThemedStyles.js
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import useAppTheme from "./useAppTheme";

export default function useThemedStyles(factory) {
  const theme = useAppTheme();
  const styles = useMemo(
    () => StyleSheet.create(factory(theme)),
    [theme, factory]
  );
  return [theme, styles];
}
