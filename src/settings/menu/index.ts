import {MenuGroup, MenuItem} from "./system";
import SecurityIcon from '@material-ui/icons/Security';
import TranslateIcon from '@material-ui/icons/Translate';
import EuroIcon from '@material-ui/icons/Euro';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import CommuteIcon from '@material-ui/icons/Commute';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import BuildIcon from '@material-ui/icons/Build';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CommentIcon from '@material-ui/icons/Comment';

/**
 * Параметры пунктов меню
 */
export const menuSettings = (): MenuGroup[] => ([
    new MenuGroup(
        "Заказы",
        ShoppingCartIcon,
        [
            new MenuItem({href: "/order"}, "Заказы", "READ_ORDERS"),
            new MenuItem({href: "/pre-order"}, "Предзаказы", "READ_ORDERS"),
        ],
    ),
    new MenuGroup(
        "ТНВЭД",
        CommentIcon,
        [
            new MenuItem({href: "/tnved/company-categories"}, "Категории", "READ_TNVED_CATEGORIES"),
            new MenuItem({href: "/tnved/company-products"}, "Товары", "READ_TNVED_PRODUCTS"),
            new MenuItem({href: "/tnved/company-specifications"}, "Спецификации", "READ_TNVED_SPECIFICATIONS"),
            new MenuItem({href: "/tnved/code"}, "Коды ТНВЭД", "EDIT_TNVED_CODES"),
        ],
    ),
    new MenuGroup(
        "Транспорт",
        CommuteIcon,
        [
            new MenuItem({href: "/transport/shoulder"}, "Плечи", "READ_TRANSPORT_SHOULDERS"),
            new MenuItem({href: "/transport/terminal"}, "Терминалы", "READ_TRANSPORT_TERMINALS"),
            new MenuItem({href: "/transport/allowance"}, "Надбавки", "READ_TRANSPORT_ALLOWANCE"),
            new MenuItem({href: "/transport/unit"}, "Единицы измерения", "READ_TRANSPORT_UNITS"),
            new MenuItem({href: "/transport/containers"}, "Контейнеры", "READ_TRANSPORT_CONTAINERS"),
            new MenuItem({href: "/transport/loading-conditions"}, "Условия погрузки", "READ_TRANSPORT_LOADING_CONDITIONS"),
            new MenuItem({href: "/transport/unloading-conditions"}, "Условия разгрузки", "READ_TRANSPORT_UNLOADING_CONDITIONS"),
            new MenuItem({href: "/transport/start-transporting-conditions"}, "Условия начала перевозки", "READ_TRANSPORT_START_TRANSPORTING_CONDITIONS"),
            new MenuItem({href: "/transport/stop-transporting-conditions"}, "Условия окончания перевозки", "READ_TRANSPORT_STOP_TRANSPORTING_CONDITIONS"),
            new MenuItem({href: "/transport/cargo-type"}, "Типы груза", "READ_TRANSPORT_CARGO_TYPES"),
            new MenuItem({href: "/transport/container-types"}, "Типы контейнеров", "READ_TRANSPORT_CONTAINER_TYPES"),
            new MenuItem({href: "/transport/container-affiliation"}, "Принадлежность контейнеров", "READ_TRANSPORT_CONTAINER_AFFILIATION"),
            new MenuItem({href: "/transport/unit-group"}, "Группы единиц измерения", "READ_TRANSPORT_UNIT_GROUPS"),
            new MenuItem({href: "/transport/cargo-type-group"}, "Группы типов груза", "READ_TRANSPORT_CARGO_TYPE_GROUPS"),
            new MenuItem({href: "/transport/allowance-group"}, "Группы надбавок", "READ_TRANSPORT_ALLOWANCE_GROUPS"),
            new MenuItem({href: "/transport/delivery-modes"}, "Режимы перевозки", "READ_TRANSPORT_DELIVERY_MODES"),
            new MenuItem({href: "/transport/types"}, "Типы транспорта", "READ_TRANSPORT_TYPES"),
            new MenuItem({href: "/transport/shoulder-types"}, "Типы плеч", "READ_TRANSPORT_LEG_TYPES"),
        ],
    ),
    new MenuGroup(
        "Инструменты",
        BuildIcon,
        [
            new MenuItem({href: "/transport/routes-calculator"}, "Расчет маршрутов", "CALCULATE_ROUTES"),
            new MenuItem({href: "/tools/locations-import"}, "Импорт гео-объектов", "IMPORT_GEO_OBJECTS"),
            new MenuItem({href: "/tools/shoulders-import"}, "Импорт ставок", "IMPORT_SHOULDERS"),
            new MenuItem({href: "/tools/tnved-products-import"}, "Импорт товаров ТНВЭД", "IMPORT_TNVED_PRODUCTS"),
        ],
    ),
    new MenuGroup(
        "Использование контейнера",
        LocalShippingIcon,
        [
            new MenuItem({href: "/transport/pickon"}, "PickOn", "READ_TRANSPORT_PICKON"),
            new MenuItem({href: "/transport/dropoff"}, "DropOff", "READ_TRANSPORT_DROPOFF"),
            new MenuItem({href: "/transport/container-rent"}, "Аренда контейнера", "READ_TRANSPORT_CONTAINER_RENT"),
        ],
    ),
    new MenuGroup(
        "Подрядчики",
        SupervisedUserCircleIcon,
        [
            new MenuItem({href: "/contractor"}, "Подрядчики", "READ_CONTRACTORS"),
            new MenuItem({href: "/transport/carrier"}, "Перевозчики", "READ_CARRIERS"),
        ],
    ),
    new MenuGroup(
        "Гео-объекты",
        LocationCityIcon,
        [
            new MenuItem({href: "/locations"}, "Гео-объекты", "READ_LOCATIONS"),
        ],
    ),
    new MenuGroup(
        "Валюты",
        EuroIcon,
        [
            new MenuItem({href: "/currency"}, "Валюты", "READ_CURRENCIES"),
            new MenuItem({href: "/tax"}, "Налоги", "CHANGE_TAXES"),
        ],
    ),
    new MenuGroup(
        "Локализация",
        TranslateIcon,
        [
            new MenuItem({href: "/language"}, "Языки", "READ_LANGUAGES"),
        ],
    ),
    new MenuGroup(
        "Безопасность",
        SecurityIcon,
        [
            new MenuItem({href: "/user"}, "Пользователи", "READ_USERS"),
            new MenuItem({href: "/role"}, "Роли", "READ_ROLES"),
            new MenuItem({href: "/permission"}, "Разрешения", "READ_PERMISSIONS"),
        ],
    ),
]);