/**
 * Fichier qui se charge de l'import des SVGs.
 */
import HiraganaA from "../assets/icons/kata/01a-hiragana-a.svg";
import HiraganaU from "../assets/icons/kata/03-hiragana-u.svg";

export const svgMap = {
  "01a-hiragana-a": HiraganaA,
  "03-hiragana-u": HiraganaU,
  "04-hiragana-e": HiraganaE,
  "05-hiragana-o": HiraganaO,
  "06-hiragana-ka": HiraganaKA,
  "07-hiragana-ki": HiraganaKI,
  "08-hiragana-ku": HiraganaKU,
  "09-hiragana-ke": HiraganaKE,
  "10-hiragana-ko": HiraganaKO,
  "11-hiragana-sa": HiraganaSA,
  "12-hiragana-shi": HiraganaSHI,
  "13-hiragana-su": HiraganaSU,
  "14-hiragana-se": HiraganaSE,
  "15-hiragana-so": HiraganaSO,
  "16-hiragana-ta": HiraganaTA,
  "17-hiragana-chi": HiraganaCHI,
  "18-hiragana-tsu": HiraganaTSU,
  "19-hiragana-te": HiraganaTE,
  "20-hiragana-to": HiraganaTO,
  "01-katakana-a": KatakanaA,
  "02-katakana-i": KatakanaI,
  "03-katakana-u": KatakanaU,
  "04-katakana-e": KatakanaE,
  "05-katakana-o": KatakanaO,
  "06-katakana-ka": KatakanaKA,
  "07-katakana-ki": KatakanaKI,
  "08-katakana-ku": KatakanaKU,
  "09-katakana-ke": KatakanaKE,
  "10-katakana-ko": KatakanaKO,
  "11-katakana-sa": KatakanaSA,
  "12-katakana-shi": KatakanaSHI,
  "13-katakana-su": KatakanaSU,
  "14-katakana-se": KatakanaSE,
  "15-katakana-so": KatakanaSO,
  "16-katakana-ta": KatakanaTA,
  "17-katakana-chi": KatakanaCHI,
  "18-katakana-tsu": KatakanaTSU,
  "19-katakana-te": KatakanaTE,
  "20-katakana-to": KatakanaTO,
};

export function getSvgRequire(filename) {
  return svgMap[filename] || null;
}
