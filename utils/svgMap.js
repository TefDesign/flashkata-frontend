/**
 * Fichier qui se charge de l'import des SVGs.
 */
// Hiragana
import HiraganaA from "../assets/icons/kata/hiragana/01-hiragana-a.svg";
import HiraganaI from "../assets/icons/kata/hiragana/02-hiragana-i.svg";
import HiraganaU from "../assets/icons/kata/hiragana/03-hiragana-u.svg";
import HiraganaE from "../assets/icons/kata/hiragana/04-hiragana-e.svg";
import HiraganaO from "../assets/icons/kata/hiragana/05-hiragana-o.svg";
import HiraganaKA from "../assets/icons/kata/hiragana/06-hiragana-ka.svg";
import HiraganaKI from "../assets/icons/kata/hiragana/07-hiragana-ki.svg";
import HiraganaKU from "../assets/icons/kata/hiragana/08-hiragana-ku.svg";
import HiraganaKE from "../assets/icons/kata/hiragana/09-hiragana-ke.svg";
import HiraganaKO from "../assets/icons/kata/hiragana/10-hiragana-ko.svg";
import HiraganaSA from "../assets/icons/kata/hiragana/11-hiragana-sa.svg";
import HiraganaSHI from "../assets/icons/kata/hiragana/12-hiragana-shi.svg";
import HiraganaSU from "../assets/icons/kata/hiragana/13-hiragana-su.svg";
import HiraganaSE from "../assets/icons/kata/hiragana/14-hiragana-se.svg";
import HiraganaSO from "../assets/icons/kata/hiragana/15-hiragana-so.svg";
import HiraganaTA from "../assets/icons/kata/hiragana/16-hiragana-ta.svg";
import HiraganaCHI from "../assets/icons/kata/hiragana/17-hiragana-chi.svg";
import HiraganaTSU from "../assets/icons/kata/hiragana/18-hiragana-tsu.svg";
import HiraganaTE from "../assets/icons/kata/hiragana/19-hiragana-te.svg";
import HiraganaTO from "../assets/icons/kata/hiragana/20-hiragana-to.svg";

//Katakana
import KatakanaA from "../assets/icons/kata/katakana/01-katakana-a.svg";
import KatakanaI from "../assets/icons/kata/katakana/02-katakana-i.svg";
import KatakanaU from "../assets/icons/kata/katakana/03-katakana-u.svg";
import KatakanaE from "../assets/icons/kata/katakana/04-katakana-e.svg";
import KatakanaO from "../assets/icons/kata/katakana/05-katakana-o.svg";
import KatakanaKA from "../assets/icons/kata/katakana/06-katakana-ka.svg";
import KatakanaKI from "../assets/icons/kata/katakana/07-katakana-ki.svg";
import KatakanaKU from "../assets/icons/kata/katakana/08-katakana-ku.svg";
import KatakanaKE from "../assets/icons/kata/katakana/09-katakana-ke.svg";
import KatakanaKO from "../assets/icons/kata/katakana/10-katakana-ko.svg";
import KatakanaSA from "../assets/icons/kata/katakana/11-katakana-sa.svg";
import KatakanaSHI from "../assets/icons/kata/katakana/12-katakana-shi.svg";
import KatakanaSU from "../assets/icons/kata/katakana/13-katakana-su.svg";
import KatakanaSE from "../assets/icons/kata/katakana/14-katakana-se.svg";
import KatakanaSO from "../assets/icons/kata/katakana/15-katakana-so.svg";
import KatakanaTA from "../assets/icons/kata/katakana/16-katakana-ta.svg";
import KatakanaCHI from "../assets/icons/kata/katakana/17-katakana-chi.svg";
import KatakanaTSU from "../assets/icons/kata/katakana/18-katakana-tsu.svg";
import KatakanaTE from "../assets/icons/kata/katakana/19-katakana-te.svg";
import KatakanaTO from "../assets/icons/kata/katakana/20-katakana-to.svg";

export const svgMap = {
  "01-hiragana-a": HiraganaA,
  "02-hiragana-i": HiraganaI,
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
