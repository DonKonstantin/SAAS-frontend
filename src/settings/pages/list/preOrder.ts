import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration, RelationConfiguration, RelationFilterFieldConfiguration
} from "../../../services/listDataLoader/filterLoader/types";
import {
    AlignRow,
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration,
    RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";
import {RelationCellWithLinkComponent} from "../../../components/ListPage/List/ListBody/ListCells/RelationWithLink";
import PriceCell from "../../../custom/components/OrderList/PriceCell";
import PriceFilterSlider from "../../../custom/components/OrderList/PriceFilterSlider";

export class PreOrderConfiguration implements ListPageConfiguration<"pre_order"> {
    filter: FilterFieldsConfiguration<"pre_order"> = {
        date: new class implements BaseFilterFieldConfiguration<"pre_order", "date", "DateTimeSlider"> {
            field: "date" = "date";
            filterType: "DateTimeSlider" = "DateTimeSlider";
            schema: "pre_order" = "pre_order";
            title: string = "Дата заказа";
        },
        id: new class implements BaseFilterFieldConfiguration<"pre_order", "id", "EqualsString"> {
            field: "id" = "id";
            filterType: "EqualsString" = "EqualsString";
            schema: "pre_order" = "pre_order";
            title: string = "Номер заказа";
        },
        order_price: new class implements BaseFilterFieldConfiguration<"pre_order", "order_price", "FloatSlider"> {
            field: "order_price" = "order_price";
            filterType: "FloatSlider" = "FloatSlider";
            schema: "pre_order" = "pre_order";
            title: string = "Сумма заказа";
            customComponent = PriceFilterSlider;
        },
        currency_id: new class implements RelationFilterFieldConfiguration<"pre_order", "currency_id", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"currency"> = {
                schema: "currency",
                visibleFields: ["default_name"]
            };
            field: "currency_id" = "currency_id";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "pre_order" = "pre_order";
            title: string = "Валюта";
        },
    };
    listFields: ListFieldsConfiguration<"pre_order"> = {
        fields: {
            date: new class implements ListFieldConfiguration<"pre_order", "date"> {
                field: "date" = "date";
                title: string = "Дата заказа";
                align: AlignRow = "left";
                width: number = 170;
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            id: new class implements ListFieldConfiguration<"pre_order", "id"> {
                field: "id" = "id";
                title: string = "#";
                align: AlignRow = "left";
                width: number = 120;
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple",
                }
            },
            order_price: new class implements ListFieldConfiguration<"pre_order", "order_price"> {
                field: "order_price" = "order_price";
                title: string = "Сумма заказа";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple",
                    customComponent: PriceCell,
                }
            },
            currency_id: new class implements ListFieldConfiguration<"pre_order", "currency_id"> {
                field: "currency_id" = "currency_id";
                title: string = "Валюта";
                isEnabled: boolean = true;
                width: number = 85;
                fieldType: FieldType<"Relation"> = {
                    config: <RelationConfig<"currency">>{
                        relatedFields: ["code"]
                    },
                    customComponent: RelationCellWithLinkComponent(
                        id => ({as: `/currency/edit/${id}`, href: `/currency/edit/[entityId]`}),
                        "CHANGE_CURRENCIES"
                    ),
                    type: "Relation"
                }
            },
        },
        defaultOrderDirection: "desc",
    };
    schema: "pre_order" = "pre_order";
    disableMultiChoose: boolean = true;
    elementsPerPage: number = 50;
    readPermission: string = "READ_ORDERS";
    editPermission: string = "READ_ORDERS";
    title: string = "Управление предзаказами";
    header: string = "Управление предзаказами";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({
        as: `/pre-order/${primaryKey}`,
        href: `/pre-order/[orderId]`
    });
    addPageUrl: PageUrl = {href: `/`};
}