/**
 * Проверка строки на формат JSON
 * @param value
 */
export const JSONValidator = (value: string) => {
    try {
        JSON.parse(value);

        return true;
    } catch (e) {
        return false;
    }
}
