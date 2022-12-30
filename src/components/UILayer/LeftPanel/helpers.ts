import { MenuType } from "context/AuthorizationContext";
import { UserInfoData } from "services/authService/UserInfoQuery";
import GetAvailableMenuItemsByUserInfo from "services/helpers/GetAvailableMenuItemsByUserInfo";
import { DomainMenuItems, ProjectMenuItems, RealmMenuItems } from "settings/menu";
import { MenuItem } from "settings/menu/system";

export const getMenuItems = (menuType: MenuType, userInfo: UserInfoData): MenuItem[] => {
  let menuItems: MenuItem[];

  switch (menuType) {
      case "project":
          menuItems = ProjectMenuItems()
          break;
      case "domain":
          menuItems = DomainMenuItems()
          break;
      default:
          menuItems = RealmMenuItems();
  }

  // Фильтруем пункты меню по уровню доступа
  return GetAvailableMenuItemsByUserInfo(userInfo, menuItems);
};