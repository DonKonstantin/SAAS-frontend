import {EditField, EditFormGroup, EntityValues} from "../../settings/pages/system/edit";
import {Schemas} from "../../settings/schema";

// Helper для проверки статуса видимости группы. Группа не видима, если все
// поля в ней скрыты или основной чекер возвращает результат - скрыто
function IsGroupVisible<T extends keyof Schemas>(group: EditFormGroup<T>, values: EntityValues<T>): boolean {
    const isGroupBaseVisible = group.isVisible ? group.isVisible(values) : true;
    const isFieldVisible = group.fields.reduce(
        (result: boolean, item: EditField<any, any>): boolean => {
            return result || (item.isVisible
                    ? item.isVisible(values)
                    : true
            )
        },
        false,
    );

    return !(!isFieldVisible || !isGroupBaseVisible);
}

export default IsGroupVisible;