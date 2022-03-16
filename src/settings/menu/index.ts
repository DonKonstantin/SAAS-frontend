import {MenuItem} from "./system";
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DvrIcon from '@mui/icons-material/Dvr';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StorageIcon from '@mui/icons-material/Storage';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {getCurrentState} from "../../context/AuthorizationContext";

// Список пунктов меню уровня Реалм
export const RealmMenuItems = (): MenuItem[] => ([
    {
        link: {href: "/domain"},
        title: "UI.menu.left-menu.items.domain",
        icon: StorageIcon,
    },
    {
        link: {href: "/users"},
        title: "UI.menu.left-menu.items.user",
        permission: "READ_USERS",
        level: "project",
        icon: PersonIcon,
    },
    {
        link: {href: "/roles"},
        title: "UI.menu.left-menu.items.roles",
        permission: "READ_ROLES",
        level: "project",
        icon: CheckCircleIcon,
    },
    {
        title: "UI.menu.left-menu.items.permissions.index",
        permission: "READ_PERMISSIONS",
        level: "realm",
        icon: PhonelinkLockIcon,
        subItems: [
            {
                link: {href: "/permission"},
                title: "UI.menu.left-menu.items.permissions.permissions",
                permission: "READ_PERMISSIONS",
                level: "realm",
            },
            {
                link: {href: "/permission-category"},
                title: "UI.menu.left-menu.items.permissions.categories",
                permission: "READ_PERMISSIONS",
                level: "realm",
            }
        ]
    },
    {
        title: "UI.menu.left-menu.items.media-library.index",
        icon: VolumeUpIcon,
        subItems: [
            {
                link: {href: "/media/check"},
                title: "UI.menu.left-menu.items.media-library.check",
                permission: "READ_MEDIA_FILES"
            },
            {
                link: {href: "/media/upload"},
                title: "UI.menu.left-menu.items.media-library.uploading",
                permission: "EDIT_MEDIA_FILES"
            },
            {
                link: {href: "/media"},
                title: "UI.menu.left-menu.items.media-library.storage",
                permission: "READ_MEDIA_FILES"
            },
        ],
    },
    {
        title: "UI.menu.left-menu.items.notifications.index",
        icon: NotificationsIcon,
        subItems: [
            {
                link: {href: "/notifications-template"},
                title: "UI.menu.left-menu.items.notifications.templates",
                permission: "READ_NOTIFICATION_TEMPLATES"
            },
            {
                link: {href: "/notification-rules"},
                title: "UI.menu.left-menu.items.notifications.rules",
                permission: "READ_NOTIFICATION_CONFIG"
            },
        ]
    },
    {
        link: {href: "/logs"},
        title: "UI.menu.left-menu.items.logs",
        icon: DvrIcon,
        permission: "READ_LOGS"
    },
]);

// Список пунктов меню уровня Домен
export const DomainMenuItems = (): MenuItem[] => ([
    {
        link: {href: "/domain"},
        title: "UI.menu.left-menu.items.domain-list",
        icon: ArrowBackIosIcon
    },
    {
        link: () => {
            const {domain} = getCurrentState()
            return {
                href: "/domain/[domainId]/project",
                as: `/domain/${domain}/project`,
            }
        },
        title: "UI.menu.left-menu.items.projects",
    },
    {
        link: () => {
            const {domain} = getCurrentState()
             return {
                href: "/domain/[domainId]/users",
                as: `/domain/${domain}/users`,
            }
        },
        title: "UI.menu.left-menu.items.user",
        permission: "READ_USERS",
        level: "project",
    },
    {
        link: () => {
            const {domain} = getCurrentState()
             return {
                href: "/domain/[domainId]/roles",
                as: `/domain/${domain}/roles`,
            }
        },
        title: "UI.menu.left-menu.items.roles",
        permission: "READ_ROLES",
        level: "project",
    },
    {
        link: () => {
            const {domain} = getCurrentState()
             return {
                href: "/domain/[domainId]/logs",
                as: `/domain/${domain}/logs`,
            }
        },
        title: "UI.menu.left-menu.items.logs",
        permission: "READ_LOGS",
    },
]);

// Список пунктов меню уровня Проект
export const ProjectMenuItems = (): MenuItem[] => ([
    {
        link: () => {
            const {domain} = getCurrentState()
            return {
                href: "/domain/[domainId]/project",
                as: `/domain/${domain}/project`,
            }
        },
        title: "UI.menu.left-menu.items.projects-list",
        icon: ArrowBackIosIcon
    },
    {
        link: () => {
            const {domain, project} = getCurrentState()
            return {
                href: "/domain/[domainId]/project/[projectId]/media",
                as: `/domain/${domain}/project/${project}/media`,
            }
        },
        title: "UI.menu.left-menu.items.playlists",
    },
    {
        link: {href: "/users"},
        title: "UI.menu.left-menu.items.user",
        permission: "READ_USERS",
        level: "project",
    },
    {
        link: {href: "/roles"},
        title: "UI.menu.left-menu.items.roles",
        permission: "READ_ROLES",
        level: "project",
    },
    {
        title: "UI.menu.left-menu.items.logs",
        permission: "READ_LOGS",
        link: () => {
            const {domain, project} = getCurrentState()
            return {
                href: "/domain/[domainId]/project/[projectId]/logs",
                as: `/domain/${domain}/project/${project}/logs`,
            }
        },
    },
]);
