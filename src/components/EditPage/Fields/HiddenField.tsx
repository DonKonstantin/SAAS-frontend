import React, {FC} from "react";
import {EditFieldProperties} from "../../../settings/pages/system/edit";

// Поле ввода числового значения
const HiddenField: FC<EditFieldProperties> = () => {
    return null
}

// Экспортируем компонент
export default React.memo(HiddenField, () => true)