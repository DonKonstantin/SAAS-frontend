import {MenuItem} from "./system";
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DvrIcon from '@mui/icons-material/Dvr';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {setDomain, setProject} from "../../context/AuthorizationContext";

// Список пунктов меню уровня Реалм
export const RealmMenuItems = (): MenuItem[] => ([
    {
        link: {href: "/1"},
        title: "UI.menu.left-menu.items.domain",
        icon: ListIcon,
    },
    {
        link: {href: "/2"},
        title: "UI.menu.left-menu.items.user",
        permission: "READ_USERS",
        level: "project",
        icon: PersonIcon,
    },
    {
        link: {href: "/3"},
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
                link: {href: "/21"},
                title: "UI.menu.left-menu.items.permissions.permissions",
                permission: "CHANGE_PERMISSIONS",
                level: "realm",
            },
            {
                link: {href: "/22"},
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
                link: {href: "/11"},
                title: "UI.menu.left-menu.items.media-library.check",
            },
            {
                link: {href: "/12"},
                title: "UI.menu.left-menu.items.media-library.uploading",
            },
            {
                link: {href: "/13"},
                title: "UI.menu.left-menu.items.media-library.storage",
            },
            {
                link: {href: "/14"},
                title: "UI.menu.left-menu.items.media-library.categories",
            },
        ],
    },
    {
        link: {href: "/4"},
        title: "UI.menu.left-menu.items.logs",
        icon: DvrIcon,
    },
]);

// Список пунктов меню уровня Домен
export const DomainMenuItems = (): MenuItem[] => ([
    {
        link: {href: "/1"},
        title: "UI.menu.left-menu.items.domain-list",
        icon: ArrowBackIosIcon,
        onClick: () => {
            setDomain("")
        }
    },
    {
        link: {href: "/2"},
        title: "UI.menu.left-menu.items.projects",
    },
    {
        link: {href: "/3"},
        title: "UI.menu.left-menu.items.user",
        permission: "READ_USERS",
        level: "project",
    },
    {
        link: {href: "/4"},
        title: "UI.menu.left-menu.items.roles",
        permission: "CHANGE_ROLES",
        level: "project",
    },
    {
        link: {href: "/5"},
        title: "UI.menu.left-menu.items.logs",
    },
]);

// Список пунктов меню уровня Проект
export const ProjectMenuItems = (): MenuItem[] => ([
    {
        link: {href: "/1"},
        title: "UI.menu.left-menu.items.projects-list",
        icon: ArrowBackIosIcon,
        onClick: () => {
            setProject("")
        }
    },
    {
        link: {href: "/2"},
        title: "UI.menu.left-menu.items.playlists",
    },
    {
        link: {href: "/3"},
        title: "UI.menu.left-menu.items.user",
        permission: "READ_USERS",
        level: "project",
    },
    {
        link: {href: "/4"},
        title: "UI.menu.left-menu.items.roles",
        permission: "CHANGE_ROLES",
        level: "project",
    },
    {
        link: {href: "/5"},
        title: "UI.menu.left-menu.items.logs",
    },
]);