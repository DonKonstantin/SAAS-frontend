import {UserInfoData} from "../authService/UserInfoQuery";
import {MenuItem} from "../../settings/menu/system";
import CheckPermission from "./CheckPermission";

/**
 * Функция проверяет доступность переданного пункта меню на основе профиля пользователя.
 * Учитывает уровень доступа пунктов меню, а также необходимые права для доступа.
 *
 * @param userInfo
 * @param menuItem
 */
const isMenuItemAvailable = (userInfo: UserInfoData, menuItem: MenuItem): boolean => {
    const {level = "project", permission, checkIncludes} = menuItem

    // Если пункт не защищен разрешением, то выводим его
    if (!permission) {
        return true
    }

    const checkPermission = CheckPermission(userInfo, permission, level);

    const nextLevel = level === 'realm' ? 'domain' : 'project';

    const checkIncludesResult = 
    !!checkIncludes 
      ? !!userInfo.roles.filter(el => el.level === nextLevel && el.permissions.some(permission => permission.code.includes('READ'))).length 
      : true;

    return checkPermission && checkIncludesResult;
}

/**
 * Функция вычисляет доступные для вывода пункты меню на основе профиля пользователя.
 * Учитывает уровень доступа пунктов меню, а также необходимые права для доступа.
 *
 * Алгоритм работы такой:
 * 1) Проверяем все пункты меню верхнего уровня на то, что к ним есть доступ
 * 2) Для оставшихся пунктов проверяем, есть ли подпункты, если есть - проверяем их рекурсивно
 * 3) Отсеиваем пустые пункты меню, у которых изначально были подпункты
 *
 * @param userInfo
 * @param menuItems
 */
const GetAvailableMenuItemsByUserInfo = (userInfo: UserInfoData, menuItems: MenuItem[]): MenuItem[] => {
    return menuItems
        .filter(m => isMenuItemAvailable(userInfo, m))
        .map(item => {
            item.subItems = item.subItems ? GetAvailableMenuItemsByUserInfo(userInfo, item.subItems) : undefined

            return item
        })
        .filter(item => !item.subItems || item.subItems.length > 0)
}

// Экспортируем функцию
export default GetAvailableMenuItemsByUserInfo