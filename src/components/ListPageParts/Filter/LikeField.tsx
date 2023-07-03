import {FC} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import EqualsStringField from "./EqualsStringField";

// Компонент строкового поля фильтра
const LikeField: FC<FilterFieldProperties> = EqualsStringField

// Экспортируем компонент
export default LikeField