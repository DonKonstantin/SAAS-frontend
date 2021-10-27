import {MenuItem} from "./system";
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DvrIcon from '@mui/icons-material/Dvr';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StorageIcon from '@mui/icons-material/Storage';
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
        permission: "CHANGE_ROLES",
        level: "project",
        icon: CheckCircleIcon,
    },
    {
        title: "UI.menu.left-menu.items.permissions.index",
        permission: "CHANGE_PERMISSIONS",
        level: "realm",
        icon: PhonelinkLockIcon,
        subItems: [
            {
                link: {href: "/permission"},
                title: "UI.menu.left-menu.items.permissions.permissions",
                permission: "CHANGE_PERMISSIONS",
                level: "realm",
            },
            {
                link: {href: "/permission-category"},
                title: "UI.menu.left-menu.items.permissions.categories",
                permission: "CHANGE_PERMISSIONS",
                level: "realm",
            }
        ]
    },
    {
        title: "UI.menu.left-menu.items.media-library.index",
        icon: VolumeUpIcon,
        subItems: [
            {
                link: {href: "/media"},
                title: "UI.menu.left-menu.items.media-library.check",
            },
            {
                link: {href: "/media"},
                title: "UI.menu.left-menu.items.media-library.uploading",
            },
            {
                link: {href: "/media"},
                title: "UI.menu.left-menu.items.media-library.storage",
            },
            {
                link: {href: "/media"},
                title: "UI.menu.left-menu.items.media-library.categories",
            },
        ],
    },
    {
        link: {href: "/logs"},
        title: "UI.menu.left-menu.items.logs",
        icon: DvrIcon,
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
        link: {href: "/users"},
        title: "UI.menu.left-menu.items.user",
        permission: "READ_USERS",
        level: "project",
    },
    {
        link: {href: "/roles"},
        title: "UI.menu.left-menu.items.roles",
        permission: "CHANGE_ROLES",
        level: "project",
    },
    {
        link: {href: "/logs"},
        title: "UI.menu.left-menu.items.logs",
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
        permission: "CHANGE_ROLES",
        level: "project",
    },
    {
        link: {href: "/logs"},
        title: "UI.menu.left-menu.items.logs",
    },
]);