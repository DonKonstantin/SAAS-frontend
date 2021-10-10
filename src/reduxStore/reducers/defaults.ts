import {Authorization, UserData} from "../stores/Authorization";
import {EntityList} from "../stores/EntityList";
import {EntityEdit} from "../stores/EntityEdit";
import {EntityData} from "../../services/entityGetterService/interface";
import {Schemas} from "../../settings/schema";
import {PageUrl} from "../../settings/pages/system/list";
import {ValidationResult} from "../../settings/pages/system/edit";
import {Debug} from "../stores/Debug";
import {Language, LanguagesStore} from "../stores/Languages";
import {AdditionEditParams} from "../../containers/EntityEdit";
import {
    ContainerRouteCalculationParameters,
    RouteWidgetParameters, CustomCargoRouteCalculationParameters,
    RouteCalculationStore
} from "../stores/RouteCalculationStore";

/**
 * ВНИМАНИЕ!!!
 *
 * Выносите все дефолтные параметры отдельно от любых классов.
 * Это предотвратит зацыкливание сборщика, в случае если один из
 * дочерних файлов использует данные параметры.
 */

// Данные по умолчанию для авторизации
export class DefaultAuthorization implements Authorization {
    token: string = ``;
    user: UserData = new class implements UserData {
        email: string = "";
        first_name: string = "";
        id: string = "";
        last_name: string = "";
        roles: string[] = [];
        permissions: string[] = [];
    };
}

// Данные по умолчанию для листинга сущностей
export class DefaultEntityList implements EntityList {
    loaded: {};
    isLoading: false;
    isListReloading: false;
    isChangeInProgress: false;
}

// Данные по умолчанию для формы редактирования сущностей
export class DefaultEntityEdit implements EntityEdit {
    data: EntityData<any>;
    isChangeInProgress: boolean = false;
    isLoading: boolean = false;
    primaryKey: any = undefined;
    schema: keyof Schemas;
    redirectTo: PageUrl | undefined = undefined;
    validationResults: ValidationResult[][] = [];
    additionEditParams: AdditionEditParams = {}
}

// Данные по умолчанию для режима отладки
export class DefaultDebug implements Debug {
    isEnabled: boolean = false
}

// Данные по умолчанию для Store языков
export class DefaultLanguages implements LanguagesStore {
    languages: Language[] = [];
    primaryLangId: string;
    secondaryLangId: string;
}

// Получение сегодняшней даты
const today = () => {
    const date = new Date();

    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
};

export class DefaultRouteCalculationStore implements RouteCalculationStore {
    BaseData: RouteWidgetParameters | undefined = undefined;
    ContainerParameters: ContainerRouteCalculationParameters = {
        startLocation: undefined,
        endLocation: undefined,
        containerId: "",
        containerQuantity: 1,
        eachContainerWeight: 10000,
        startTransportingCondition: "",
        endTransportingCondition: "",
        isNeedContainerRent: false,
        isDangerousCargo: false,
        isArchiveCalculation: false,
        date: today(),
        targetCurrencyId: "",
        isNeedLogs: false,
        isNeedPrekeridge: false,
    };
    CustomCargoParameters: CustomCargoRouteCalculationParameters = {
        startLocation: undefined,
        endLocation: undefined,
        parametersType: "base",
        baseParameters: {
            quantity: 1,
            length: 1,
            width: 1,
            height: 1,
            weight: 10,
        },
        palletParameters: {
            type: "",
            quantity: 1,
            normativeHeightOfStacking: 1,
            weight: 10,
        },
        volumeParameters: {
            volume: 1,
            weight: 10,
        },
        startTransportingCondition: "",
        endTransportingCondition: "",
        date: today(),
        isNeedContainerRent: false,
        isDangerousCargo: false,
        isArchiveCalculation: false,
        targetCurrencyId: "",
        isNeedLogs: false,
        isNeedPrekeridge: false,
    };
    IsLoading: boolean = false;
    LastCalculationRequestTime: number = 0;
}
