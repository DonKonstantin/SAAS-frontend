const SizeLabels = [
    "KB",
    "MB",
    "GB",
    "TB",
    "PB"
];

/**
 * Функция преобразования размера в байтах в приемлимый для пользователя формат
 * @param size
 */
const convertSizeToUserFriendlyType = (size: number) => {
    let convertedSize = size;
    let prevLabel = "Б";
    for (let label of SizeLabels) {
        const newSize = Math.round(convertedSize / 1024 * 10) / 10;
        if (newSize < 1) {
            return `${convertedSize} ${prevLabel}`
        }

        convertedSize = newSize;
        prevLabel = label;
    }

    return `${convertedSize} ${prevLabel}`
};

export default convertSizeToUserFriendlyType;