/**
 * Nombres de grafemarios
 */
export const AlphabetNames = Object.freeze({
    AZUMCHEFE:   "azumchefe",
    UNIFICADO:   "unificado",
    RAGUILEO:   "raguileo",
    UNIFICADO_QUOTES:   "unificado_quote",
});

// https://es.wikipedia.org/wiki/Escritura_del_mapuche

/**
 * Formato:
 *
 * (a,e,.)y: Convierte "y" => /j/ siempre y cuando "y" esta precedida por "a" o "e" o es la primera letra.
 * y(a,e,.): Convierte "y" => /j/ siempre y cuando "y" esta sucedida por "a" o "e" o es la ultima letra.
 */
export const MAPUDUNGUN_UNIFICADO_PHONETIC_MAP = [
    "a",  // /a/
    "ch", // /t͡ʃ/
    "d",  // /θ/
    "e",  // /e/
    "f",  // /f/
    "g",  // /ɣ/
    "i",  // /i/
    "y",  // /i̯̯ /
    "k",  // /k/
    "l",  // /l/
    "ḻ",  // /l̪/
    "ll", // /ʎ/
    "m",  // /m/
    "n",  // /n/
    "ṉ",  // /n̪/
    "ñ",  // /ɲ/
    "ng", // /ŋ/
    "o",  // /o/
    "p",  // /p/
    "r",  // /ɻ/
    "s",  // /s/
    "sh", // [ʃ]
    "t",  // /t/
    "ṯ",  // /t̪/
    "tr", // /ʈ͡ʂ/
    "u",  // /u/
    "w",  // /u̯ /
    "ü",  // /ɨ/
    "w",  // /w/
    "y",  // /j/
]

export const MAPUDUNGUN_UNIFICADO_QUOTE_PHONETIC_MAP = [
    "a",  // /a/
    "ch", // /t͡ʃ/
    "d",  // /θ/
    "e",  // /e/
    "f",  // /f/
    "g",  // /ɣ/
    "i",  // /i/
    "y",  // /i̯̯ /
    "k",  // /k/
    "l",  // /l/
    "l'", // /l̪/
    "ll", // /ʎ/
    "m",  // /m/
    "n",  // /n/
    "n'", // /n̪/
    "ñ",  // /ɲ/
    "ng", // /ŋ/
    "o",  // /o/
    "p",  // /p/
    "r",  // /ɻ/
    "s",  // /s/
    "sh", // [ʃ]
    "t",  // /t/
    "t'", // /t̪/
    "tr", // /ʈ͡ʂ/
    "u",  // /u/
    "w",  // /u̯ /
    "ü",  // /ɨ/
    "w",  // /w/
    "y",  // /j/
]

export const MAPUDUNGUN_AZUMCHEFE_PHONETIC_MAP = [
    "a",  // /a/
    "ch", // /t͡ʃ/
    "z",  // /θ/
    "e",  // /e/
    "f",  // /f/
    "q",  // /ɣ/
    "i",  // /i/
    "y",  // /i̯̯ /
    "k",  // /k/
    "l",  // /l/
    "lh", // /l̪/
    "ll", // /ʎ/
    "m",  // /m/
    "n",  // /n/
    "nh", // /n̪/
    "ñ",  // /ɲ/
    "g",  // /ŋ/
    "o",  // /o/
    "p",  // /p/
    "r",  // /ɻ/
    "s",  // /s/
    "sh", // [ʃ]
    "t",  // /t/
    "t'", // /t̪/
    "tx", // /ʈ͡ʂ/
    "u",  // /u/
    "w",  // /u̯ /
    "ü",  // /ɨ/
    "w",  // /w/
    "i",  // /j/
];


export const MAPUDUNGUN_RAGUILEO_PHONETIC_MAP = [
    "a",  // /a/
    "c",  // /t͡ʃ/
    "z",  // /θ/
    "e",  // /e/
    "f",  // /f/
    "q",  // /ɣ/
    "i",  // /i/
    "y",  // /i̯̯ /
    "k",  // /k/
    "l",  // /l/
    "b",  // /l̪/
    "j",  // /ʎ/
    "m",  // /m/
    "n",  // /n/
    "h",  // /n̪/
    "ñ",  // /ɲ/
    "g",  // /ŋ/
    "o",  // /o/
    "p",  // /p/
    "r",  // /ɻ/
    "s",  // /s/
    "s",  // [ʃ]
    "t",  // /t/
    "t'", // /t̪/
    "x",  // /ʈ͡ʂ/
    "u",  // /u/
    "w",  // /u̯ /
    "v",  // /ɨ/
    "w",  // /w/
    "y",  // /j/
];
