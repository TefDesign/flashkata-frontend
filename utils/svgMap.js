/**
 * Fichier qui se charge de l'import des SVGs.
 */
import HiraganaA from "../assets/icons/kata/01-hiragana-a.svg";
import HiraganaU from "../assets/icons/kata/03-hiragana-u.svg";

export const svgMap = {
  "01-hiragana-a": HiraganaA,
  "03-hiragana-u": HiraganaU,
};

export function getSvgRequire(filename) {
  return svgMap[filename] || null;
}
