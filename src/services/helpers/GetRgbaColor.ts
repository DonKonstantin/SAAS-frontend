/**
 * Конвертация цвета в RGBA формат
 * @param hexColor
 * @param opacity
 */
export const getRgbaColor = (hexColor: string, opacity: number = 1) => {
    // If a leading # is provided, remove it
    if (hexColor.slice(0, 1) === '#') {
        hexColor = hexColor.slice(1);
    }

    // If a three-character hexcode, make six-character
    if (hexColor.length === 3) {
        hexColor = hexColor.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }

    // Convert to RGB value
    let r = parseInt(hexColor.substr(0,2),16);
    let g = parseInt(hexColor.substr(2,2),16);
    let b = parseInt(hexColor.substr(4,2),16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
};