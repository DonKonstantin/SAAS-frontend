import { MenuItem } from "./system";
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import DvrIcon from "@mui/icons-material/Dvr";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StorageIcon from "@mui/icons-material/Storage";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getCurrentState } from "../../context/AuthorizationContext";

// Список пунктов меню уровня Реалм
export const RealmMenuItems = (): MenuItem[] => [
  {
    link: { href: "/domain" },
    title: "UI.menu.left-menu.items.domain",
    icon: StorageIcon,
  },
  {
    link: { href: "/users" },
    title: "UI.menu.left-menu.items.user",
    permission: "READ_USERS",
    level: "realm",
    icon: PersonIcon,
  },
  {
    link: { href: "/roles" },
    title: "UI.menu.left-menu.items.roles",
    permission: "READ_ROLES",
    level: "realm",
    icon: CheckCircleIcon,
  },
  {
    title: "UI.menu.left-menu.items.permissions.index",
    permission: "READ_PERMISSIONS",
    level: "realm",
    icon: PhonelinkLockIcon,
    subItems: [
      {
        link: { href: "/permission" },
        title: "UI.menu.left-menu.items.permissions.permissions",
        permission: "READ_PERMISSIONS",
        level: "realm",
      },
      {
        link: { href: "/permission-category" },
        title: "UI.menu.left-menu.items.permissions.categories",
        permission: "READ_PERMISSIONS",
        level: "realm",
      },
    ],
  },
  {
    title: "UI.menu.left-menu.items.media-library.index",
    icon: VolumeUpIcon,
    level: "realm",
    subItems: [
      {
        link: { href: "/media/check" },
        title: "UI.menu.left-menu.items.media-library.check",
        permission: "READ_MEDIA_FILES",
      },
      {
        link: { href: "/media/upload" },
        title: "UI.menu.left-menu.items.media-library.uploading",
        permission: "EDIT_MEDIA_FILES",
      },
      {
        link: { href: "/media/storage" },
        title: "UI.menu.left-menu.items.media-library.storage",
        permission: "READ_MEDIA_FILES",
      },
    ],
  },
  {
    title: "UI.menu.left-menu.items.notifications.index",
    icon: NotificationsIcon,
    level: "realm",
    subItems: [
      {
        link: { href: "/notifications-template" },
        title: "UI.menu.left-menu.items.notifications.templates",
        permission: "READ_NOTIFICATION_TEMPLATES",
      },
      {
        link: { href: "/notification-rules" },
        title: "UI.menu.left-menu.items.notifications.rules",
        permission: "READ_NOTIFICATION_CONFIG",
      },
    ],
  },
  {
    link: { href: "/logs" },
    title: "UI.menu.left-menu.items.logs",
    icon: DvrIcon,
    permission: "READ_LOGS",
    level: "realm",
  },
];

// Список пунктов меню уровня Домен
export const DomainMenuItems = (): MenuItem[] => [
  {
    link: { href: "/domain" },
    title: "UI.menu.left-menu.items.domain-list",
    icon: ArrowBackIosIcon,
    disableActiveState: true,
  },
  {
    link: () => {
      const { domain } = getCurrentState();
      return {
        href: "/domain/[domainId]/project",
        as: `/domain/${domain}/project`,
      };
    },
    title: "UI.menu.left-menu.items.projects.index",
  },
  {
    link: () => {
      const { domain } = getCurrentState();
      return {
        href: "/domain/[domainId]/users",
        as: `/domain/${domain}/users`,
      };
    },
    title: "UI.menu.left-menu.items.user",
    permission: "READ_USERS",
    level: "domain",
  },
  {
    link: () => {
      const { domain } = getCurrentState();
      return {
        href: "/domain/[domainId]/roles",
        as: `/domain/${domain}/roles`,
      };
    },
    title: "UI.menu.left-menu.items.roles",
    permission: "READ_ROLES",
    level: "domain",
  },
  {
    link: () => {
      const { domain } = getCurrentState();
      return {
        href: "/domain/[domainId]/logs",
        as: `/domain/${domain}/logs`,
      };
    },
    title: "UI.menu.left-menu.items.logs",
    permission: "READ_LOGS",
    level: "domain",
  },
];

// Список пунктов меню уровня Проект
export const ProjectMenuItems = (): MenuItem[] => [
  {
    link: () => {
      const { domain } = getCurrentState();
      return {
        href: "/domain/[domainId]/project",
        as: `/domain/${domain}/project`,
      };
    },
    title: "UI.menu.left-menu.items.projects-list",
    icon: ArrowBackIosIcon,
    disableActiveState: true,
  },
    {
        link: () => {
            const {domain, project} = getCurrentState();

            return {
                href: "/domain/[domainId]/project/[projectId]/campaign ",
                as: `/domain/${domain}/project/${project}/campaign`,
            };
        },
        title: "UI.menu.left-menu.items.campaign",
    },
  {
    link: () => {
      const { domain, project } = getCurrentState();

      return {
        href: "/domain/[domainId]/project/[projectId]/player-code",
        as: `/domain/${domain}/project/${project}/player-code`,
      };
    },
    title: "UI.menu.left-menu.items.player-codes.index",
  },
  {
    link: () => {
      const { domain, project } = getCurrentState();

      return {
        href: "/domain/[domainId]/project/[projectId]/project-playlist",
        as: `/domain/${domain}/project/${project}/project-playlist`,
      };
    },
    title: "UI.menu.left-menu.items.project-playlists",
  },
  {
    link: () => {
      const { domain, project } = getCurrentState();

      return {
        href: "/domain/[domainId]/project/[projectId]/object-passport",
        as: `/domain/${domain}/project/${project}/object-passport`,
      };
    },
    title: "objects-passport-list.left-menu-title",
    permission: "READ_OBJECT_PASSPORT",
    level: "project",
  },
    {
        link: () => {
            const {domain, project} = getCurrentState();

            return {
                href: "/domain/[domainId]/project/[projectId]/player-list",
                as: `/domain/${domain}/project/${project}/player-list`,
            };
        },
        title: "player-list.left-menu.title",
    },
    {
      link: () => {
        const {domain, project} = getCurrentState();
        
        return {
            href: "/domain/[domainId]/project/[projectId]/object-passports",
            as: `/domain/${domain}/project/${project}/object-passports`,
        }
      },
      title: "objects-passport-list.left-menu-title",
      permission: "READ_OBJECT_PASSPORT",
      level: "project",
    },
  {
    link: () => {
      const { domain, project } = getCurrentState();
      return {
        href: "/domain/[domainId]/project/[projectId]/users",
        as: `/domain/${domain}/project/${project}/users`,
      };
    },
    title: "UI.menu.left-menu.items.user",
    permission: "READ_USERS",
    level: "project",
  },
  {
    link: () => {
      const { domain, project } = getCurrentState();
      return {
        href: "/domain/[domainId]/project/[projectId]/roles",
        as: `/domain/${domain}/project/${project}/roles`,
      };
    },
    title: "UI.menu.left-menu.items.roles",
    permission: "READ_ROLES",
    level: "project",
  },
  {
    title: "UI.menu.left-menu.items.logs",
    permission: "READ_LOGS",
    level: "project",
    link: () => {
      const { domain, project } = getCurrentState();
      return {
        href: "/domain/[domainId]/project/[projectId]/logs",
        as: `/domain/${domain}/project/${project}/logs`,
      };
    },
  },
];
