import {AlphabetConverter, GraphemeEntry, MARK_LOWERCASE, MARK_UPPERCASE} from "./alphabet_converter.js"
import {assertEqual} from "./test_tools.js"
import {
  MAPUDUNGUN_AZUMCHEFE_PHONETIC_MAP,
  MAPUDUNGUN_RAGUILEO_PHONETIC_MAP,
  MAPUDUNGUN_UNIFICADO_PHONETIC_MAP
} from "./alphabet_definitions.js";


export function runTests() {
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
  let converter;

  converter = new AlphabetConverter(["(e)a", "a", "c"], ["x", "y", "z"]);

  assertEqual(converter.convertGrapheme("ae", "a", "be"), String.fromCharCode(MARK_LOWERCASE + 0))
  converter = new AlphabetConverter(["a", "(e)a", "c"], ["x", "y", "z"]);
  assertEqual(converter.convertGrapheme("ae", "a", "be"), String.fromCharCode(MARK_LOWERCASE + 1))

}


function testInvertAlphabetSource() {

  let invertedAlphabetSource = AlphabetConverter.invertAlphabetSource(["a", "(a,b,c)b(a,b,c)", "(x,y)b(a,b,c)", "(a,b,c)ch"]);

  var graphemeEntries;

  graphemeEntries = invertedAlphabetSource.get("a");
  assertEqual(graphemeEntries[0].grapheme, "a");
  assertEqual(graphemeEntries[0].prefixes.length, 0);
  assertEqual(graphemeEntries[0].index, 0);

  graphemeEntries = invertedAlphabetSource.get("b");
  assertEqual(graphemeEntries[0].grapheme, "b");
  assertEqual(graphemeEntries[0].prefixes[0], "a");
  assertEqual(graphemeEntries[0].prefixes[1], "b");
  assertEqual(graphemeEntries[0].prefixes[2], "c");
  assertEqual(graphemeEntries[0].suffixes[0], "a");
  assertEqual(graphemeEntries[0].suffixes[1], "b");
  assertEqual(graphemeEntries[0].suffixes[2], "c");
  assertEqual(graphemeEntries[0].index, 1);

  assertEqual(graphemeEntries[1].grapheme, "b");
  assertEqual(graphemeEntries[1].prefixes[0], "x");
  assertEqual(graphemeEntries[1].prefixes[1], "y");
  assertEqual(graphemeEntries[1].suffixes[0], "a");
  assertEqual(graphemeEntries[1].suffixes[1], "b");
  assertEqual(graphemeEntries[1].suffixes[2], "c");
  assertEqual(graphemeEntries[1].index, 2);

  graphemeEntries = invertedAlphabetSource.get("ch");
  assertEqual(graphemeEntries[0].grapheme, "ch");
  assertEqual(graphemeEntries[0].prefixes[0], "a");
  assertEqual(graphemeEntries[0].prefixes[1], "b");
  assertEqual(graphemeEntries[0].prefixes[2], "c");
  assertEqual(graphemeEntries[0].suffixes.length, 0);
  assertEqual(graphemeEntries[0].index, 3);

}


function convertNoopAlphabetRespectCase() {
  let converter = new AlphabetConverter([], []);

  assertEqual("Mari mari mapu!", converter.convertText("Mari mari mapu!"))
  assertEqual("Mari mari mapu! 1223a . ", converter.convertText("Mari mari mapu! 1223a . "))

}

function convertSameAlphabetAndRestore() {
  let converter = new AlphabetConverter([], []);

  assertEqual("Chadingechi korü kümentukelan. Feyti wentru ñi kug ta fütakengey. Eymün ta ḻafkeṉchengeymün.",
    converter.convertText("Chadingechi korü kümentukelan. Feyti wentru ñi kug ta fütakengey. Eymün ta ḻafkeṉchengeymün."))
}

function verifyParseGraphemeEntry() {
  let graphemeEntry = new GraphemeEntry("a", 1)

  assertEqual("a", graphemeEntry.grapheme);
  assertEqual(0, graphemeEntry.prefixes.length);
  assertEqual(0, graphemeEntry.suffixes.length);
  assertEqual(1, graphemeEntry.index);

  graphemeEntry = new GraphemeEntry("(a,b,cd)a", 1)

  assertEqual("a", graphemeEntry.grapheme);
  assertEqual(3, graphemeEntry.prefixes.length);
  assertEqual("a", graphemeEntry.prefixes[0]);
  assertEqual("b", graphemeEntry.prefixes[1]);
  assertEqual("cd", graphemeEntry.prefixes[2]);
  assertEqual(0, graphemeEntry.suffixes.length);
  assertEqual(1, graphemeEntry.index);

  graphemeEntry = new GraphemeEntry("a(a,b,cd)", 1)

  assertEqual("a", graphemeEntry.grapheme);
  assertEqual(0, graphemeEntry.prefixes.length);
  assertEqual(3, graphemeEntry.suffixes.length);
  assertEqual("a", graphemeEntry.suffixes[0]);
  assertEqual("b", graphemeEntry.suffixes[1]);
  assertEqual("cd", graphemeEntry.suffixes[2]);
  assertEqual(1, graphemeEntry.index);

  graphemeEntry = new GraphemeEntry("(e)a(a)", 1)

  assertEqual("a", graphemeEntry.grapheme);
  assertEqual(1, graphemeEntry.prefixes.length);
  assertEqual(1, graphemeEntry.suffixes.length);
  assertEqual("e", graphemeEntry.prefixes[0]);
  assertEqual("a", graphemeEntry.suffixes[0]);
  assertEqual(1, graphemeEntry.index);
}

function verifyPhonemeToAlphabet() {
  let converter = new AlphabetConverter(["a", "b", "c"], ["x", "y", "z"]);

  // sourceWord = "abc bcad"

  let sourceWord = String.fromCharCode(MARK_LOWERCASE + 0)
  sourceWord += String.fromCharCode(MARK_LOWERCASE + 1)
  sourceWord += String.fromCharCode(MARK_LOWERCASE + 2)
  sourceWord += ' '
  sourceWord += String.fromCharCode(MARK_LOWERCASE + 1)
  sourceWord += String.fromCharCode(MARK_LOWERCASE + 2)
  sourceWord += String.fromCharCode(MARK_LOWERCASE + 0)
  sourceWord += 'd'

  assertEqual("xyz yzxd", converter.convertPhonemeMapToAlphabet(sourceWord));

  // sourceWord = "ABC BCAD"
  sourceWord = String.fromCharCode(MARK_UPPERCASE + 0)
  sourceWord += String.fromCharCode(MARK_UPPERCASE + 1)
  sourceWord += String.fromCharCode(MARK_UPPERCASE + 2)
  sourceWord += ' '
  sourceWord += String.fromCharCode(MARK_UPPERCASE + 1)
  sourceWord += String.fromCharCode(MARK_UPPERCASE + 2)
  sourceWord += String.fromCharCode(MARK_UPPERCASE + 0)
  sourceWord += 'D'

  assertEqual("XYZ YZXD", converter.convertPhonemeMapToAlphabet(sourceWord));

}

function convertUnificadoToAzumchefe() {
  let converter = new AlphabetConverter(MAPUDUNGUN_UNIFICADO_PHONETIC_MAP, MAPUDUNGUN_AZUMCHEFE_PHONETIC_MAP);

  assertEqual(converter.convertText("Feyti"), "Feiti");
  assertEqual(converter.convertText("Chadingechi korü kümentukelan. Feyti wentru ñi kug ta fütakengey. Eymün ta ḻafkeṉchengeymün."), "Chazigechi korü kümentukelan. Feiti wentxu ñi kuq ta fütakegey. Eymün ta lhafkenhchegeimün.")

  assertEqual(converter.convertText("ChaDingechi"), "ChaZigechi")
}

function convertUnificadoToRaguileo() {
  let converter = new AlphabetConverter(MAPUDUNGUN_UNIFICADO_PHONETIC_MAP, MAPUDUNGUN_RAGUILEO_PHONETIC_MAP);

  assertEqual(converter.convertText("Feyti"), "Feyti");
  assertEqual(converter.convertText("Chadingechi korü kümentukelan. Feyti wentru ñi kug ta fütakengey. Eymün ta ḻafkeṉchengeymün."), "Cazigeci korv kvmentukelan. Feyti wenxu ñi kuq ta fvtakegey. Eymvn ta bafkehcegeymvn.")

  assertEqual(converter.convertText("ChaDingechi"), "CaZigeci")

}

function convertRaguileoToUnificado() {
  let converter = new AlphabetConverter(MAPUDUNGUN_RAGUILEO_PHONETIC_MAP, MAPUDUNGUN_UNIFICADO_PHONETIC_MAP);

  assertEqual(converter.convertText("Feyti"), "Feyti");
  assertEqual(converter.convertText("Cazigeci korv kvmentukelan. Feyti wenxu ñi kuq ta fvtakegey. Eymvn ta bafkehcegeymvn."),
    "Chadingechi korü kümentukelan. Feyti wentru ñi kug ta fütakengey. Eymün ta ḻafkeṉchengeymün."
  )

  assertEqual(converter.convertText("CaZigeci"), "ChaDingechi")

  console.log(converter.convertText("Mvna kvmelakaley mi kvzaw peñi. pewmagele kiñe antv kvme konvmpayayiñ pu mapuce Ragibew ñi wirin, ka fey kom ñi kimcegen mew eleletew, amulepe!"));
}

