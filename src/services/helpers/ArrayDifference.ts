/**
 * Функция вычисляет расхождение 2х массивов
 * @param a
 * @param b
 */
export function ArrayDifference <T>(a, b: T[]): T[] {
    return a.filter(x => !b.includes(x)).concat(b.filter(x => !a.includes(x)))
}