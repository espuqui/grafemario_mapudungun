import {
  AlphabetNames, AlphabetPhoneticMap, MAPUDUNGUN_AZUMCHEFE_PHONETIC_MAP, MAPUDUNGUN_UNIFICADO_PHONETIC_MAP
} from "./src/alphabet_definitions.js"
import {AlphabetConverter} from "./src/alphabet_converter.js"

export function addAlphabetNamesToSelect(select) {
  for (const [key, value] of Object.entries(AlphabetNames)) {
    let opt = document.createElement('option');
    opt.value = key;
    opt.innerHTML = value;
    select.appendChild(opt);
  }
}

export function convertText(sourceAlphabet, targetAlphabet, sourceText) {
  let converter = new AlphabetConverter(AlphabetPhoneticMap[sourceAlphabet], AlphabetPhoneticMap[targetAlphabet]);
  return converter.convertText(sourceText)
}
