/**
 * Разделение переданного массива на части переданного размера
 * @param array
 * @param partSize
 */
export const splitArrayToParts = <T>(array: T[], partSize: number): T[][] => {
    let steps: T[][] = [];
    for (let i = 0; i < array.length; i += partSize) {
        const step: T[] = [];
        for (let j = i; j < i + partSize; j++) {
            if (j >= array.length) {
                break;
            }

            step.push(array[j])
        }

        steps.push(step)
    }

    return steps;
};