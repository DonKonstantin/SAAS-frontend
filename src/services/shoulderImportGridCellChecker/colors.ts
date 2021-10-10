import {
    AllowanceOffer,
    Shoulder,
    ShoulderOffer,
    ShoulderOfferCondition,
    ShoulderStep
} from "../shoulderImportTaskService/shoulderTypes";
import red from "@material-ui/core/colors/red";
import {
    blue, brown,
    cyan, deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue, lime,
    orange,
    pink,
    purple,
    yellow
} from "@material-ui/core/colors";

// Данные цветов для отображения
type ColorsData = {primaryColor: string, secondaryColor: string};

// Цвета для плеча
export type Colors<T> = {[K in keyof T]: ColorsData}

// Основные цвета для плеча
export class ShoulderColors implements Colors<Shoulder> {
    import_id: ColorsData = {
        primaryColor: red[300],
        secondaryColor: red[700],
    };
    carrier_id: ColorsData = {
        primaryColor: red[300],
        secondaryColor: red[700],
    };
    contractor_id: ColorsData = {
        primaryColor: orange[300],
        secondaryColor: orange[700],
    };
    distance: ColorsData = {
        primaryColor: yellow[300],
        secondaryColor: yellow[700],
    };
    distance_unit: ColorsData = {
        primaryColor: yellow[300],
        secondaryColor: yellow[700],
    };
    from_location_ids: ColorsData = {
        primaryColor: green[300],
        secondaryColor: green[700],
    };
    from_terminal_ids: ColorsData = {
        primaryColor: cyan[300],
        secondaryColor: cyan[700],
    };
    id: ColorsData = {
        primaryColor: red[300],
        secondaryColor: yellow[700],
    };
    offers: ColorsData = {
        primaryColor: red[300],
        secondaryColor: red[700],
    };
    shoulder_steps: ColorsData = {
        primaryColor: red[300],
        secondaryColor: red[700],
    };
    shoulder_type: ColorsData = {
        primaryColor: purple[300],
        secondaryColor: purple[700],
    };
    to_location_ids: ColorsData = {
        primaryColor: cyan[300],
        secondaryColor: cyan[700],
    };
    to_terminal_ids: ColorsData = {
        primaryColor: green[300],
        secondaryColor: green[700],
    };
}

// Основные цвета для шагов плеча
export class ShoulderStepColors implements Colors<ShoulderStep> {
    import_id: ColorsData = {
        primaryColor: red[300],
        secondaryColor: red[700],
    };
    end_terminal_id: ColorsData = {
        primaryColor: lightBlue[300],
        secondaryColor: lightBlue[700],
    };
    id: ColorsData = {
        primaryColor: red[300],
        secondaryColor: yellow[700],
    };
    position: ColorsData = {
        primaryColor: yellow[300],
        secondaryColor: red[700],
    };
    start_terminal_id: ColorsData = {
        primaryColor: lightBlue[300],
        secondaryColor: lightBlue[700],
    };
    transport_type_id: ColorsData = {
        primaryColor: grey[300],
        secondaryColor: grey[700],
    };
}

// Основные цвета для ценовых предложений плеча
export class ShoulderOfferColors implements Colors<ShoulderOffer> {
    import_id: ColorsData = {
        primaryColor: red[300],
        secondaryColor: red[700],
    };
    active_from: ColorsData = {
        primaryColor: pink[300],
        secondaryColor: pink[700],
    };
    active_to: ColorsData = {
        primaryColor: indigo[300],
        secondaryColor: indigo[700],
    };
    allowance_offers: ColorsData = {
        primaryColor: green[300],
        secondaryColor: green[700],
    };
    cargo_type_group: ColorsData = {
        primaryColor: grey[300],
        secondaryColor: grey[700],
    };
    container_affiliation_id: ColorsData = {
        primaryColor: grey[300],
        secondaryColor: grey[700],
    };
    container_nominal_weight: ColorsData = {
        primaryColor: lightBlue[300],
        secondaryColor: lightBlue[700],
    };
    containers: ColorsData = {
        primaryColor: lightBlue[300],
        secondaryColor: lightBlue[700],
    };
    delivery_modes: ColorsData = {
        primaryColor: deepPurple[300],
        secondaryColor: deepPurple[700],
    };
    delivery_time: ColorsData = {
        primaryColor: blue[300],
        secondaryColor: blue[700],
    };
    free_time_for_container_usage_on_end_terminal: ColorsData = {
        primaryColor: blue[300],
        secondaryColor: blue[700],
    };
    free_time_for_container_usage_on_start_terminal: ColorsData = {
        primaryColor: yellow[300],
        secondaryColor: orange[700],
    };
    id: ColorsData = {
        primaryColor: orange[300],
        secondaryColor: yellow[700],
    };
    is_danger_cargo_allowed: ColorsData = {
        primaryColor: red[300],
        secondaryColor: red[700],
    };
    is_empty_container_collecting_included: ColorsData = {
        primaryColor: brown[300],
        secondaryColor: brown[700],
    };
    is_empty_container_returning_included: ColorsData = {
        primaryColor: brown[300],
        secondaryColor: brown[700],
    };
    loading_condition_id: ColorsData = {
        primaryColor: lime[300],
        secondaryColor: lime[700],
    };
    offer_conditions: ColorsData = {
        primaryColor: indigo[300],
        secondaryColor: indigo[700],
    };
    unloading_condition_id: ColorsData = {
        primaryColor: pink[300],
        secondaryColor: pink[700],
    };
}

// Цвета для условий ЦП
export class ShoulderOfferConditionColors implements Colors<ShoulderOfferCondition> {
    import_id: ColorsData = {
        primaryColor: red[300],
        secondaryColor: red[700],
    };
    currency_id: ColorsData = {
        primaryColor: red[300],
        secondaryColor: red[700],
    };
    group_num: ColorsData = {
        primaryColor: green[300],
        secondaryColor: green[700],
    };
    id: ColorsData = {
        primaryColor: yellow[300],
        secondaryColor: orange[700],
    };
    information_price: ColorsData = {
        primaryColor: orange[300],
        secondaryColor: yellow[700],
    };
    is_fixed_price: ColorsData = {
        primaryColor: blue[300],
        secondaryColor: blue[700],
    };
    is_max_value_not_limited: ColorsData = {
        primaryColor: grey[300],
        secondaryColor: grey[700],
    };
    is_min_value_not_limited: ColorsData = {
        primaryColor: purple[300],
        secondaryColor: purple[700],
    };
    is_tax_included_in_price: ColorsData = {
        primaryColor: lime[300],
        secondaryColor: lime[700],
    };
    max_value: ColorsData = {
        primaryColor: brown[300],
        secondaryColor: brown[700],
    };
    min_value: ColorsData = {
        primaryColor: lightBlue[300],
        secondaryColor: lightBlue[700],
    };
    minimal_payment_price: ColorsData = {
        primaryColor: deepPurple[300],
        secondaryColor: deepPurple[700],
    };
    price: ColorsData = {
        primaryColor: deepOrange[300],
        secondaryColor: deepOrange[700],
    };
    tax_id: ColorsData = {
        primaryColor: indigo[300],
        secondaryColor: indigo[700],
    };
    unit_id: ColorsData = {
        primaryColor: yellow[300],
        secondaryColor: yellow[700],
    };
}

// Цвета для настройки надбавок
export class AllowanceOfferColors implements Colors<AllowanceOffer> {
    import_id: ColorsData = {
        primaryColor: red[300],
        secondaryColor: red[700],
    };
    allowance_id: ColorsData = {
        primaryColor: brown[300],
        secondaryColor: brown[700],
    };
    id: ColorsData = {
        primaryColor: deepOrange[300],
        secondaryColor: deepOrange[700],
    };
    is_invoice_allowance: ColorsData = {
        primaryColor: yellow[300],
        secondaryColor: yellow[700],
    };
    offer_conditions: ColorsData = {
        primaryColor: yellow[300],
        secondaryColor: yellow[700],
    };
}