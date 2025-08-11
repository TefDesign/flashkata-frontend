// hooks/useAppTheme.js
import { useSelector } from "react-redux";
import themeLight from "../styles/themeLight";
import themeDark from "../styles/themeDark";

export default function useAppTheme() {
  const mode = useSelector((s) => s.users.theme); // "light" | "dark"
  return mode === "dark" ? themeDark : themeLight;
}
