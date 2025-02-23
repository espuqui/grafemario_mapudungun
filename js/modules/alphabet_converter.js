export const MARK_LOWERCASE = 0x600;
export const MARK_UPPERCASE = 0x700;

class AlphabetConverterSource {
  /**
   * name: Nombre de grafemario
   * candidates: Conjunto de caracteres unicos en este grafemario
   */
  constructor(name, phonemeMap) {
    this.name = name;
    this.phonemeMap = phonemeMap;
  }
}

export class GraphemeEntry {
  constructor(graphemeExpression, index) {
    this.grapheme = ""
    this.prefixes = []
    this.suffixes = []
    this.index = index

    var parsingPrefix = false;
    var parsingGrapheme = false;
    var parsingSuffix = false;

    var prefix = ""
    var suffix = ""

    for (var i in graphemeExpression) {
      var c = graphemeExpression[i]

      if (c == "(") {
        if (!parsingPrefix && !parsingGrapheme) {
          parsingPrefix = true;
          continue;
        }
        if (parsingGrapheme) {
          parsingSuffix = true;
          parsingGrapheme = false;
          continue;
        }
      } else {
        if (!parsingPrefix && !parsingSuffix) {
          parsingGrapheme = true;
        }
      }

      if (c == ")") {
        if (parsingPrefix) {
          parsingPrefix = false;
          parsingGrapheme = true;
          continue;
        }
        if (parsingSuffix) {
          parsingSuffix = false;
          continue;
        }
      }

      if (parsingGrapheme) {
        this.grapheme += c;
      }

      if (parsingPrefix) {
        prefix += c;
      }
      if (parsingSuffix) {
        suffix += c;
      }
    }

    if (prefix != "") {
      this.prefixes = prefix.split(",");
    }
    if (suffix != "") {
      this.suffixes = suffix.split(",");
    }
  }
}


export class AlphabetConverter {
  constructor(alphabetSource, alphabetTarget) {
    this.invertedAlphabetSource = AlphabetConverter.invertAlphabetSource(alphabetSource);
    this.alphabetTarget = alphabetTarget;
  }


  /**
   * Convierte un texto
   */
  convertText(text) {
    var words = text.split(' ');
    var convertedText = "";

    for (var word of words) {
      if (convertedText != "") {
        convertedText += " ";
      }
      convertedText += this.convertWordCaseSensitive(word);
    }
    return convertedText;
  }

  /**
   * Convierte entre grafemarios respetando mayusculas / minusculas
   */
  convertWordCaseSensitive(word) {
    var convertedWord = this.convertWord(word);
    return convertedWord;
  }

  static invertAlphabetSource(alphabetSource) {

    var invertedAlphabet = new Map();

    for (var i = 0; i < alphabetSource.length; i++) {
      var graphemeEntry = new GraphemeEntry(alphabetSource[i], i)

      if (!invertedAlphabet.has(graphemeEntry.grapheme)) {
        invertedAlphabet.set(graphemeEntry.grapheme, []);
      }

      var graphemes = invertedAlphabet.get(graphemeEntry.grapheme);

      graphemes.push(graphemeEntry);
    }

    return invertedAlphabet;
  }

  /**
   * Convierte una palabra sin tomar en cuenta mayusculas / minusculas
   */
  convertWord(word) {
    // Normalizacion
    // 1. [Listo] Del grafemario armamos un mapa con los candidatos y sus opciones.
    // 2. Del grafemario > fonema, tomamos primero los grafemas de 2 letras + sus prefijos y sufijos.

    //    Repetimos con el siguiente graphema de 2 letras pero usando el output.
    // 3. Repetimos con los grafemas de 1 letra.
    //
    // Conversion
    // 1. [Listo] Tomamos el mapa y buscamos caracteres U+0600.
    // 2. [Listo] Del fonema > grafemario, reemplazamos el caracter por el del grafemario

    // Grafemas de 2 letras
    for (var i = 0; i < word.length - 1; i++) {
      var pre = word.substring(0, i);
      var g = word.substring(i, i + 2);
      var post = word.substring(i + 2, word.length);

      var r = this.convertGrapheme(pre, g, post);
      word = pre + r + post;
    }

    // Grafemas de 1 letra
    for (var i = 0; i < word.length; i++) {
      var pre = word.substring(0, i);
      var g = word.substring(i, i + 1);
      var post = word.substring(i + 1, word.length);

      var r = this.convertGrapheme(pre, g, post);
      word = pre + r + post;
    }


    return this.convertPhonemeMapToAlphabet(word);
  }

//a12bc12
  convertGrapheme(pre, g_case, post) {

    var g = g_case.toLowerCase();

    if (!this.invertedAlphabetSource.has(g)) {
      return g_case;
    } else {
      var graphemeEntries = this.invertedAlphabetSource.get(g);

      var maxScore = 0;
      var maxIndex = -1;
      for (var graphemeEntry of graphemeEntries) {
        if (maxIndex == -1) {
          maxIndex = graphemeEntry.index;
        }

        // Si hay match, ponemos el puntaje de acuerdo al largo de prefijos + sufijos.
        // En el output, ponemos el caracter (U+0600 + indice de fonemas).
        for (var i = pre.length - 1; i >= 0; i--) {
          var subpre = pre.substring(i, pre.length);

          for (var matchpre of graphemeEntry.prefixes) {
            if (subpre == matchpre) {
              if (subpre.length > maxScore) {
                maxScore = subpre.length;
                maxIndex = graphemeEntry.index;
              }
            }
          }
        }

        for (var i = 1; i <= post.length; i++) {
          var subpost = post.substring(0, i);

          for (var matchpost of graphemeEntry.suffixes) {
            if (subpost == matchpost) {
              if (subpost.length > maxScore) {
                maxScore = subpost.length;
                maxIndex = graphemeEntry.index;
              }
            }
          }
        }

      }
      if (maxIndex == -1) {
        return g_case;
      }

      if (g_case.length == 1) {
        if (g == this.alphabetTarget[maxIndex]) {
          return g_case;
        }

      }

      if (this.isLowerCase(g_case[0])) {
        return String.fromCharCode(MARK_LOWERCASE + maxIndex);
      } else {
        return String.fromCharCode(MARK_UPPERCASE + maxIndex);
      }
    }

  }

  convertPhonemeMapToAlphabet(word) {

    var convertedWord = ""

    for (var i in word) {
      var charCode = word.charCodeAt(i)
      if (charCode >= MARK_LOWERCASE && charCode < MARK_LOWERCASE + this.alphabetTarget.length) {
        convertedWord += this.alphabetTarget[charCode - MARK_LOWERCASE];
      } else if (charCode >= MARK_UPPERCASE && charCode < MARK_UPPERCASE + this.alphabetTarget.length) {
        var g = this.alphabetTarget[charCode - MARK_UPPERCASE];
        convertedWord += g[0].toUpperCase();
        if (g.length > 1) {
          convertedWord += g.substring(1);
        }

      } else {
        convertedWord += word.charAt(i)
      }
    }

    return convertedWord;
  }

  /**
   * Chequea si es minuscula
   */
  isLowerCase(str) {
    return str === str.toLowerCase() && str !== str.toUpperCase();
  }
}



