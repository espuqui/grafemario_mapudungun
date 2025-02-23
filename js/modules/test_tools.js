/**
 * Utilidades de testing
 *
 * @param actual Valor original
 * @param expected Valor esperado
 */

export function assertEqual(actual, expected) {
  if (expected !== actual) {
    console.error("FAIL: " + actual.toString() + " != " + expected.toString())
    try {
      throw new Error("Stacktrace:")
    } catch (e) {
      console.log(e.stack)
    }
  }
}

function assertEqualSet(actual, expected) {

  var eqSet = actual.size === expected.size &&
    [...actual].every((x) => expected.has(x));

  if (!eqSet) {
    console.error("FAIL: " + Array.from(actual) + " != " + Array.from(expected))
    try {
      throw new Error("Stacktrace:")
    } catch (e) {
      console.log(e.stack)
    }

  }
}
