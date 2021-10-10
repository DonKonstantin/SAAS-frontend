import {SearchConfig} from "./system/types";
import * as React from "react";
import FaceIcon from '@material-ui/icons/Face';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import TranslateIcon from '@material-ui/icons/Translate';
import {blue, brown, cyan, deepPurple, green, indigo, lime, orange, red, teal, yellow} from "@material-ui/core/colors";
import EuroIcon from '@material-ui/icons/Euro';
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import {pagelines} from 'react-icons-kit/fa/pagelines';
import {arrowGraphUpRight} from 'react-icons-kit/ionicons/arrowGraphUpRight'
import {MaterialCustomIcon} from "../../components/CustomIcon";
import CommuteIcon from '@material-ui/icons/Commute';
import {priceTag} from 'react-icons-kit/icomoon/priceTag'
import {dropbox} from 'react-icons-kit/fa/dropbox'
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import InboxIcon from '@material-ui/icons/Inbox';
import {LoadCollection} from "../../services/helpers/LoadCollection";
import {contractorLoader} from "../../services/searchLoaders/contractorLoader";
import {carriersLoader} from "../../services/searchLoaders/carriersLoader";
import {locationsLoader} from "../../services/searchLoaders/locationsLoader";
import {containersLoader} from "../../services/searchLoaders/containersLoader";
import {currencyLoader} from "../../services/searchLoaders/currencyLoader";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {DropOffSearch} from "../../custom/components/Search/DropOffSearch";
import ImportExportIcon from '@material-ui/icons/ImportExport';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import {RailwayDirectionsIcon} from "../../components/CustomIcon/icons";
import {Grid} from "@material-ui/core";
import {transportTypesLoader} from "../../services/searchLoaders/transportTypesLoader";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {terminalLoader} from "../../services/searchLoaders/terminalLoader";
import ShoulderSearch from "../../custom/components/Search/ShoulderSearch";

// Конфигурация поиска
export const searchConfig: {(): SearchConfig} = () => {
    return [
        {
            entityCode: "Permission",
            entityTitle: "Разрешение",
            schema: "permission",
            color: red[400],
            icon: PermDataSettingIcon,
            editAccessRule: ["CHANGE_PERMISSIONS", "READ_PERMISSIONS"],
            editPageUrlGenerator: primaryKey => ({as: `/permission/edit/${primaryKey}`, href: `/permission/edit/[entityId]`}),
            fieldsToLoad: ["name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.name}</div>)
            }
        },
        {
            entityCode: "Role",
            entityTitle: "Роль",
            schema: "role",
            color: yellow[500],
            icon: VerifiedUserIcon,
            editAccessRule: ["CHANGE_ROLES", "READ_ROLES"],
            editPageUrlGenerator: primaryKey => ({as: `/role/edit/${primaryKey}`, href: `/role/edit/[entityId]`}),
            fieldsToLoad: ["name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.name}</div>)
            }
        },
        {
            entityCode: "User",
            entityTitle: "Пользователь",
            schema: "user",
            color: deepPurple[500],
            icon: FaceIcon,
            editAccessRule: ["CHANGE_USERS", "READ_USERS"],
            editPageUrlGenerator: primaryKey => ({as: `/user/edit/${primaryKey}`, href: `/user/edit/[entityId]`}),
            fieldsToLoad: ["first_name", "last_name", "email"],
            resultDrawComponent: props => {
                return (<div><b>{props.fields.first_name} {props.fields.last_name}</b> ({props.fields.email})</div>)
            }
        },
        {
            entityCode: "Language",
            entityTitle: "Язык",
            schema: "language",
            color: indigo[300],
            icon: TranslateIcon,
            editAccessRule: ["CHANGE_LANGUAGES", "READ_LANGUAGES"],
            editPageUrlGenerator: primaryKey => ({as: `/language/edit/${primaryKey}`, href: `/language/edit/[entityId]`}),
            fieldsToLoad: ["name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.name}</div>)
            }
        },
        {
            entityCode: "Currency",
            entityTitle: "Валюта",
            schema: "currency",
            color: lime[700],
            icon: EuroIcon,
            editAccessRule: ["READ_CURRENCIES", "CHANGE_CURRENCIES"],
            editPageUrlGenerator: primaryKey => ({as: `/currency/edit/${primaryKey}`, href: `/currency/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "Location",
            entityTitle: "Гео-объект",
            schema: "locations",
            color: orange[700],
            icon: LocationCityIcon,
            editAccessRule: ["READ_LOCATIONS", "CHANGE_LOCATIONS"],
            editPageUrlGenerator: primaryKey => ({as: `/locations/edit/${primaryKey}`, href: `/locations/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div><b>{props.fields.default_name}</b></div>)
            }
        },
        {
            entityCode: "Tax",
            entityTitle: "Налог",
            schema: "tax",
            color: teal[500],
            icon: LocalAtmIcon,
            editAccessRule: ["CHANGE_TAXES", "READ_TAXES"],
            editPageUrlGenerator: primaryKey => ({as: `/tax/edit/${primaryKey}`, href: `/tax/edit/[entityId]`}),
            fieldsToLoad: ["default_name", "amount"],
            resultDrawComponent: props => {
                return (<div><b>{props.fields.default_name} ({props.fields.amount}%)</b></div>)
            }
        },
        {
            entityCode: "Contractor",
            entityTitle: "Подрядчик",
            schema: "contractor",
            color: cyan[500],
            icon: SupervisedUserCircleIcon,
            editAccessRule: ["CHANGE_CONTRACTORS", "READ_CONTRACTORS"],
            editPageUrlGenerator: primaryKey => ({as: `/contractor/edit/${primaryKey}`, href: `/contractor/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportCargoTypeGroup",
            entityTitle: "Группа типов груза",
            schema: "transport_cargo_type_group",
            color: brown[300],
            icon: EmojiTransportationIcon,
            editAccessRule: ["CHANGE_TRANSPORT_CARGO_TYPE_GROUPS", "READ_TRANSPORT_CARGO_TYPE_GROUPS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/cargo-type-group/edit/${primaryKey}`, href: `/transport/cargo-type-group/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportCargoType",
            entityTitle: "Тип груза",
            schema: "transport_cargo_type",
            color: brown[600],
            icon: EmojiTransportationIcon,
            editAccessRule: ["CHANGE_TRANSPORT_CARGO_TYPES", "READ_TRANSPORT_CARGO_TYPES"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/cargo-type/edit/${primaryKey}`, href: `/transport/cargo-type/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "Carrier",
            entityTitle: "Перевозчик",
            schema: "carrier",
            color: cyan[700],
            icon: CommuteIcon,
            editAccessRule: ["READ_CARRIERS", "CHANGE_CARRIERS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/carrier/edit/${primaryKey}`, href: `/transport/carrier/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportUnitGroup",
            entityTitle: "Группа единиц измерения",
            schema: "transport_unit_group",
            color: yellow[400],
            icon: MaterialCustomIcon({icon: pagelines}),
            editAccessRule: ["READ_TRANSPORT_UNIT_GROUPS", "CHANGE_TRANSPORT_UNIT_GROUPS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/unit-group/edit/${primaryKey}`, href: `/transport/unit-group/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportUnit",
            entityTitle: "Единица измерения",
            schema: "transport_unit",
            color: yellow[700],
            icon: MaterialCustomIcon({icon: arrowGraphUpRight}),
            editAccessRule: ["READ_TRANSPORT_UNITS", "CHANGE_TRANSPORT_UNITS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/unit/edit/${primaryKey}`, href: `/transport/unit/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportAllowanceGroup",
            entityTitle: "Группа надбавок",
            schema: "transport_allowance_group",
            color: teal[300],
            icon: MaterialCustomIcon({icon: priceTag}),
            editAccessRule: ["CHANGE_TRANSPORT_ALLOWANCE_GROUPS", "READ_TRANSPORT_ALLOWANCE_GROUPS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/allowance-group/edit/${primaryKey}`, href: `/transport/allowance-group/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportAllowance",
            entityTitle: "Надбавка",
            schema: "transport_allowance",
            color: teal[700],
            icon: MaterialCustomIcon({icon: priceTag}),
            editAccessRule: ["CHANGE_TRANSPORT_ALLOWANCE", "READ_TRANSPORT_ALLOWANCE"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/allowance/edit/${primaryKey}`, href: `/transport/allowance/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportContainerAffiliation",
            entityTitle: "Принадлежность контейнера",
            schema: "transport_container_affiliation",
            color: cyan[500],
            icon: MaterialCustomIcon({icon: dropbox}),
            editAccessRule: ["CHANGE_TRANSPORT_CONTAINER_AFFILIATION", "READ_TRANSPORT_CONTAINER_AFFILIATION"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/container-affiliation/edit/${primaryKey}`, href: `/transport/container-affiliation/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportContainerType",
            entityTitle: "Тип контейнера",
            schema: "transport_container_type",
            color: orange[900],
            icon: MaterialCustomIcon({icon: dropbox}),
            editAccessRule: ["CHANGE_TRANSPORT_CONTAINER_TYPES", "READ_TRANSPORT_CONTAINER_TYPES"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/container-types/edit/${primaryKey}`, href: `/transport/container-types/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportContainer",
            entityTitle: "Контейнер",
            schema: "transport_container",
            color: orange[300],
            icon: MaterialCustomIcon({icon: dropbox}),
            editAccessRule: ["CHANGE_TRANSPORT_CONTAINERS", "READ_TRANSPORT_CONTAINERS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/containers/edit/${primaryKey}`, href: `/transport/containers/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportDeliveryMod",
            entityTitle: "Режим перевозки",
            schema: "transport_delivery_mod",
            color: red[300],
            icon: EmojiTransportationIcon,
            editAccessRule: ["CHANGE_TRANSPORT_DELIVERY_MODES", "READ_TRANSPORT_DELIVERY_MODES"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/delivery-modes/edit/${primaryKey}`, href: `/transport/delivery-modes/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportDropOff",
            entityTitle: "DropOff",
            schema: "transport_dropoff",
            color: deepPurple[700],
            icon: MoveToInboxIcon,
            editAccessRule: ["CHANGE_TRANSPORT_DROPOFF", "READ_TRANSPORT_DROPOFF"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/dropoff/edit/${primaryKey}`, href: `/transport/dropoff/edit/[entityId]`}),
            fieldsToLoad: ["id", "contractor_id", "carrier_id", "currency_id", "price", "from_location_ids", "to_location_ids", "container_ids"],
            entityDataLoader: async fields => {
                return await LoadCollection({
                    contractors: contractorLoader().Load([fields.contractor_id]),
                    carriers: carriersLoader().Load([fields.carrier_id]),
                    fromLocations: locationsLoader().Load(fields.from_location_ids),
                    toLocations: locationsLoader().Load(fields.to_location_ids),
                    containers: containersLoader().Load(fields.container_ids),
                    currencies: currencyLoader().Load([fields.currency_id]),
                })
            },
            resultDrawComponent: DropOffSearch
        },
        {
            entityCode: "TransportPickOn",
            entityTitle: "PickOn",
            schema: "transport_pickon",
            color: deepPurple[700],
            icon: OpenInNewIcon,
            editAccessRule: ["CHANGE_TRANSPORT_PICKON", "READ_TRANSPORT_PICKON"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/pickon/edit/${primaryKey}`, href: `/transport/pickon/edit/[entityId]`}),
            fieldsToLoad: ["id", "contractor_id", "carrier_id", "currency_id", "price", "from_location_ids", "to_location_ids", "container_ids"],
            entityDataLoader: async fields => {
                return await LoadCollection({
                    contractors: contractorLoader().Load([fields.contractor_id]),
                    carriers: carriersLoader().Load([fields.carrier_id]),
                    fromLocations: locationsLoader().Load(fields.from_location_ids),
                    toLocations: locationsLoader().Load(fields.to_location_ids),
                    containers: containersLoader().Load(fields.container_ids),
                    currencies: currencyLoader().Load([fields.currency_id]),
                })
            },
            resultDrawComponent: DropOffSearch
        },
        {
            entityCode: "TransportContainerRent",
            entityTitle: "Аренда контейнера",
            schema: "transport_container_rent",
            color: deepPurple[700],
            icon: InboxIcon,
            editAccessRule: ["CHANGE_TRANSPORT_CONTAINER_RENT", "READ_TRANSPORT_CONTAINER_RENT"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/container-rent/edit/${primaryKey}`, href: `/transport/container-rent/edit/[entityId]`}),
            fieldsToLoad: ["id", "contractor_id", "carrier_id", "currency_id", "price", "from_location_ids", "to_location_ids", "container_ids"],
            entityDataLoader: async fields => {
                return await LoadCollection({
                    contractors: contractorLoader().Load([fields.contractor_id]),
                    carriers: carriersLoader().Load([fields.carrier_id]),
                    fromLocations: locationsLoader().Load(fields.from_location_ids),
                    toLocations: locationsLoader().Load(fields.to_location_ids),
                    containers: containersLoader().Load(fields.container_ids),
                    currencies: currencyLoader().Load([fields.currency_id]),
                })
            },
            resultDrawComponent: DropOffSearch
        },
        {
            entityCode: "TransportLoadingCondition",
            entityTitle: "Условие погрузки",
            schema: "transport_loading_condition",
            color: red[800],
            icon: ImportExportIcon,
            editAccessRule: ["CHANGE_TRANSPORT_LOADING_CONDITIONS", "READ_TRANSPORT_LOADING_CONDITIONS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/loading-conditions/edit/${primaryKey}`, href: `/transport/loading-conditions/edit/[entityId]`}),
            fieldsToLoad: ["default_name", "code"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name} - {props.fields.code}</div>)
            }
        },
        {
            entityCode: "TransportUnloadingCondition",
            entityTitle: "Условие разгрузки",
            schema: "transport_unloading_condition",
            color: red[800],
            icon: ImportExportIcon,
            editAccessRule: ["CHANGE_TRANSPORT_UNLOADING_CONDITIONS", "READ_TRANSPORT_UNLOADING_CONDITIONS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/unloading-conditions/edit/${primaryKey}`, href: `/transport/unloading-conditions/edit/[entityId]`}),
            fieldsToLoad: ["default_name", "code"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name} - {props.fields.code}</div>)
            }
        },
        {
            entityCode: "TransportStartTransportingCondition",
            entityTitle: "Условие начала перевозки",
            schema: "transport_start_transporting_condition",
            color: green[800],
            icon: ImportExportIcon,
            editAccessRule: ["CHANGE_TRANSPORT_START_TRANSPORTING_CONDITIONS", "READ_TRANSPORT_START_TRANSPORTING_CONDITIONS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/start-transporting-conditions/edit/${primaryKey}`, href: `/transport/start-transporting-conditions/edit/[entityId]`}),
            fieldsToLoad: ["default_name", "code"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name} - {props.fields.code}</div>)
            }
        },
        {
            entityCode: "TransportStopTransportingCondition",
            entityTitle: "Условие окончания перевозки",
            schema: "transport_stop_transporting_condition",
            color: green[800],
            icon: ImportExportIcon,
            editAccessRule: ["CHANGE_TRANSPORT_STOP_TRANSPORTING_CONDITIONS", "READ_TRANSPORT_STOP_TRANSPORTING_CONDITIONS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/stop-transporting-conditions/edit/${primaryKey}`, href: `/transport/stop-transporting-conditions/edit/[entityId]`}),
            fieldsToLoad: ["default_name", "code"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name} - {props.fields.code}</div>)
            }
        },
        {
            entityCode: "TransportType",
            entityTitle: "Тип транспорта",
            schema: "transport_type",
            color: blue[600],
            icon: MotorcycleIcon,
            editAccessRule: ["CHANGE_TRANSPORT_TYPES", "READ_TRANSPORT_TYPES"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/types/edit/${primaryKey}`, href: `/transport/types/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportShoulderType",
            entityTitle: "Тип плеча",
            schema: "transport_shoulder_type",
            color: blue[300],
            icon: DirectionsBoatIcon,
            editAccessRule: ["CHANGE_TRANSPORT_LEG_TYPES", "READ_TRANSPORT_LEG_TYPES"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/shoulder-types/edit/${primaryKey}`, href: `/transport/shoulder-types/edit/[entityId]`}),
            fieldsToLoad: ["default_name"],
            resultDrawComponent: props => {
                return (<div>{props.fields.default_name}</div>)
            }
        },
        {
            entityCode: "TransportTerminal",
            entityTitle: "Терминал",
            schema: "transport_terminal",
            color: yellow[800],
            icon: RailwayDirectionsIcon,
            editAccessRule: ["CHANGE_TRANSPORT_TERMINALS", "READ_TRANSPORT_TERMINALS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/terminal/edit/${primaryKey}`, href: `/transport/terminal/edit/[entityId]`}),
            fieldsToLoad: ["default_name", "location_id"],
            entityDataLoader: async fields => {
                return await LoadCollection({
                    locations: locationsLoader().Load([fields.location_id]),
                })
            },
            resultDrawComponent: props => {
                const location = props.entityData.locations.length > 0 ? props.entityData.locations[0].default_name : ``;
                return (
                    <Grid container>
                        <Grid item xs={12}><b>{props.fields.default_name}</b> <i>({location})</i></Grid>
                    </Grid>
                )
            }
        },
        {
            entityCode: "TransportShoulder",
            entityTitle: "Плечо",
            schema: "transport_shoulder",
            color: green[600],
            icon: LocalShippingIcon,
            editAccessRule: ["READ_TRANSPORT_SHOULDERS", "CHANGE_TRANSPORT_SHOULDERS"],
            editPageUrlGenerator: primaryKey => ({as: `/transport/shoulder/edit/${primaryKey}`, href: `/transport/shoulder/edit/[entityId]`}),
            fieldsToLoad: [
                "shoulder_type",
                "from_location_ids",
                "to_location_ids",
                "from_terminal_ids",
                "to_terminal_ids",
                "contractor_id",
                "carrier_id",
            ],
            entityDataLoader: async fields => {
                return await LoadCollection({
                    locations: locationsLoader().Load([...fields.from_location_ids, ...fields.to_location_ids]),
                    shoulderType: transportTypesLoader().Load([fields.shoulder_type]),
                    terminals: terminalLoader().Load([...fields.from_terminal_ids, ...fields.to_terminal_ids]),
                    carrier: carriersLoader().Load([fields.carrier_id]),
                    contractor: contractorLoader().Load([fields.contractor_id]),
                })
            },
            resultDrawComponent: ShoulderSearch,
        },
    ]
};