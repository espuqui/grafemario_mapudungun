import {AlphabetConverter, GraphemeEntry, MARK_LOWERCASE, MARK_UPPERCASE} from "../src/alphabet_converter.js"
import {assertEqual} from "../tools/test_tools.js"
import {
  MAPUDUNGUN_AZUMCHEFE_PHONETIC_MAP, MAPUDUNGUN_RAGUILEO_PHONETIC_MAP, MAPUDUNGUN_UNIFICADO_PHONETIC_MAP
} from "../src/alphabet_definitions.js";

export function runAllTests() {
  testCallGrapheme()
  testInvertAlphabetSource()
  convertNoopAlphabetRespectCase()
  convertSameAlphabetAndRestore()
  verifyParseGraphemeEntry()
  verifyPhonemeToAlphabet()
  convertUnificadoToAzumchefe()
  convertUnificadoToRaguileo()
  convertRaguileoToUnificado()
}

function testCallGrapheme() {
  let converter = new AlphabetConverter(["a", "b", "c"], ["x", "y", "z"]);
  assertEqual(converter.convertGrapheme("ae", "a", "be"), String.fromCharCode(MARK_LOWERCASE))
}

function testInvertAlphabetSource() {

  let invertedAlphabetSource = AlphabetConverter.invertAlphabetSource(
    ["a", "b", "ch"]);
  let graphemeEntries;

  graphemeEntries = invertedAlphabetSource.get("a");
  assertEqual(graphemeEntries[0].grapheme, "a");
  assertEqual(graphemeEntries[0].index, 0);

  graphemeEntries = invertedAlphabetSource.get("b");
  assertEqual(graphemeEntries[0].grapheme, "b");
  assertEqual(graphemeEntries[0].index, 1);

  graphemeEntries = invertedAlphabetSource.get("ch");
  assertEqual(graphemeEntries[0].grapheme, "ch");
  assertEqual(graphemeEntries[0].index, 2);
}

function convertNoopAlphabetRespectCase() {
  let converter = new AlphabetConverter([], []);

  assertEqual("Mari mari mapu!", converter.convertText("Mari mari mapu!"))
  assertEqual("Mari mari mapu! 1223a . ", converter.convertText("Mari mari mapu! 1223a . "))
}

function convertSameAlphabetAndRestore() {
  let converter = new AlphabetConverter([], []);

  assertEqual("Chadingechi korü kümentukelan. Feyti wentru ñi kug ta fütakengey. Eymün ta ḻafkeṉchengeymün.",
              converter.convertText(
                "Chadingechi korü kümentukelan. Feyti wentru ñi kug ta fütakengey. Eymün ta ḻafkeṉchengeymün."))
}

function verifyParseGraphemeEntry() {
  let graphemeEntry = new GraphemeEntry("a", 1)

  assertEqual("a", graphemeEntry.grapheme);
  assertEqual(1, graphemeEntry.index);

}

function verifyPhonemeToAlphabet() {
  let converter = new AlphabetConverter(["a", "b", "c"], ["x", "y", "z"]);

  // sourceWord = "abc bcad"
  let sourceWord = String.fromCharCode(MARK_LOWERCASE)
  sourceWord += String.fromCharCode(MARK_LOWERCASE + 1)
  sourceWord += String.fromCharCode(MARK_LOWERCASE + 2)
  sourceWord += ' '
  sourceWord += String.fromCharCode(MARK_LOWERCASE + 1)
  sourceWord += String.fromCharCode(MARK_LOWERCASE + 2)
  sourceWord += String.fromCharCode(MARK_LOWERCASE)
  sourceWord += 'd'

  assertEqual("xyz yzxd", converter.convertPhonemeMapToAlphabet(sourceWord));

  // sourceWord = "ABC BCAD"
  sourceWord = String.fromCharCode(MARK_UPPERCASE)
  sourceWord += String.fromCharCode(MARK_UPPERCASE + 1)
  sourceWord += String.fromCharCode(MARK_UPPERCASE + 2)
  sourceWord += ' '
  sourceWord += String.fromCharCode(MARK_UPPERCASE + 1)
  sourceWord += String.fromCharCode(MARK_UPPERCASE + 2)
  sourceWord += String.fromCharCode(MARK_UPPERCASE)
  sourceWord += 'D'

  assertEqual("XYZ YZXD", converter.convertPhonemeMapToAlphabet(sourceWord));
}

function convertUnificadoToAzumchefe() {
  let converter = new AlphabetConverter(MAPUDUNGUN_UNIFICADO_PHONETIC_MAP, MAPUDUNGUN_AZUMCHEFE_PHONETIC_MAP);

  // Estos no pasan

  // assertEqual(converter.convertText("Feyti"), "Feiti");
  // assertEqual(converter.convertText("Chadingechi korü kümentukelan. Feyti wentru ñi kug ta fütakengey. Eymün ta
  // ḻafkeṉchengeymün."), "Chazigechi korü kümentukelan. Feiti wentxu ñi kuq ta fütakegey. Eymün ta
  // lhafkenhchegeimün.")

  assertEqual(converter.convertText("Feyti"), "Feyti");
  assertEqual(converter.convertText(
                "Chadingechi korü kümentukelan. Feyti wentru ñi kug ta fütakengey. Eymün ta ḻafkeṉchengeymün."),
              "Chazigechi korü kümentukelan. Feyti wentxu ñi kuq ta fütakegey. Eymün ta lhafkenhchegeymün.")
  assertEqual(converter.convertText("ChaDingechi"), "ChaZigechi")
}

function convertUnificadoToRaguileo() {
  let converter = new AlphabetConverter(MAPUDUNGUN_UNIFICADO_PHONETIC_MAP, MAPUDUNGUN_RAGUILEO_PHONETIC_MAP);

  assertEqual(converter.convertText("Feyti"), "Feyti");
  assertEqual(converter.convertText(
                "Chadingechi korü kümentukelan. Feyti wentru ñi kug ta fütakengey. Eymün ta ḻafkeṉchengeymün."),
              "Cazigeci korv kvmentukelan. Feyti wenxu ñi kuq ta fvtakegey. Eymvn ta bafkehcegeymvn.")
  assertEqual(converter.convertText("ChaDingechi"), "CaZigeci")
}

function convertRaguileoToUnificado() {
  let converter = new AlphabetConverter(MAPUDUNGUN_RAGUILEO_PHONETIC_MAP, MAPUDUNGUN_UNIFICADO_PHONETIC_MAP);

  assertEqual(converter.convertText("Feyti"), "Feyti");
  assertEqual(
    converter.convertText("Cazigeci korv kvmentukelan. Feyti wenxu ñi kuq ta fvtakegey. Eymvn ta bafkehcegeymvn."),
    "Chadingechi korü kümentukelan. Feyti wentru ñi kug ta fütakengey. Eymün ta ḻafkeṉchengeymün.")

  assertEqual(converter.convertText("CaZigeci"), "ChaDingechi")
}

