import {UserInfoData} from "../authService/UserInfoQuery";

// Доступные уровни разрешений для определенного уровня
export const AvailableLevelsForLevel = {
    realm: ["realm", "domain", "project"],
    domain: ["domain", "project"],
    project: ["project"],
}

/**
 * Функция обеспечивает проверку необходимых прав у переданного пользователя.
 * Возвращает TRUE, если у пользователя есть необходимые разрешения.
 *
 * @param userInfo
 * @param permission
 * @param level
 */
function CheckPermission(
    userInfo: UserInfoData,
    permission: string,
    level: "realm" | "domain" | "project"
): boolean {
    return !!userInfo.roles
        .filter(r => AvailableLevelsForLevel[r.level].includes(level))
        .find(r => r.permissions.find(p => p.code === permission))
}

// Экспортируем функцию
export default CheckPermission