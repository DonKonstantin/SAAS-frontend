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

export class OrderConfiguration implements ListPageConfiguration<"order"> {
    filter: FilterFieldsConfiguration<"order"> = {
        date: new class implements BaseFilterFieldConfiguration<"order", "date", "DateTimeSlider"> {
            field: "date" = "date";
            filterType: "DateTimeSlider" = "DateTimeSlider";
            schema: "order" = "order";
            title: string = "Дата заказа";
        },
        id: new class implements BaseFilterFieldConfiguration<"order", "id", "EqualsString"> {
            field: "id" = "id";
            filterType: "EqualsString" = "EqualsString";
            schema: "order" = "order";
            title: string = "Номер заказа";
        },
        customer_name: new class implements BaseFilterFieldConfiguration<"order", "customer_name", "Like"> {
            field: "customer_name" = "customer_name";
            filterType: "Like" = "Like";
            schema: "order" = "order";
            title: string = "Заказчик";
        },
        order_price: new class implements BaseFilterFieldConfiguration<"order", "order_price", "FloatSlider"> {
            field: "order_price" = "order_price";
            filterType: "FloatSlider" = "FloatSlider";
            schema: "order" = "order";
            title: string = "Сумма заказа";
            customComponent = PriceFilterSlider;
        },
        currency_id: new class implements RelationFilterFieldConfiguration<"order", "currency_id", "RelationAutocompleteSelector"> {
            relationConfiguration: RelationConfiguration<"currency"> = {
                schema: "currency",
                visibleFields: ["default_name"]
            };
            field: "currency_id" = "currency_id";
            filterType: "RelationAutocompleteSelector" = "RelationAutocompleteSelector";
            schema: "order" = "order";
            title: string = "Валюта";
        },
    };
    listFields: ListFieldsConfiguration<"order"> = {
        fields: {
            date: new class implements ListFieldConfiguration<"order", "date"> {
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
            id: new class implements ListFieldConfiguration<"order", "id"> {
                field: "id" = "id";
                title: string = "#";
                align: AlignRow = "left";
                width: number = 120;
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            customer_name: new class implements ListFieldConfiguration<"order", "customer_name"> {
                field: "customer_name" = "customer_name";
                title: string = "Заказчик";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            customer_email: new class implements ListFieldConfiguration<"order", "customer_email"> {
                field: "customer_email" = "customer_email";
                title: string = "E-mail";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            customer_phone: new class implements ListFieldConfiguration<"order", "customer_phone"> {
                field: "customer_phone" = "customer_phone";
                title: string = "Телефон";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            order_price: new class implements ListFieldConfiguration<"order", "order_price"> {
                field: "order_price" = "order_price";
                title: string = "Сумма заказа";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple",
                    customComponent: PriceCell,
                }
            },
            currency_id: new class implements ListFieldConfiguration<"order", "currency_id"> {
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
    schema: "order" = "order";
    disableMultiChoose: boolean = true;
    elementsPerPage: number = 50;
    readPermission: string = "READ_ORDERS";
    editPermission: string = "READ_ORDERS";
    title: string = "Управление заказами";
    header: string = "Управление заказами";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({
        as: `/order/${primaryKey}`,
        href: `/order/[orderId]`
    });
    addPageUrl: PageUrl = {href: `/`};
}