import {Subject} from "rxjs";
import {FetchResult} from "@apollo/client";
import {SubscribeToSpecificationChangesQueryResponse} from "./SubscribeToSpecificationChangesQuery";

// Сущность спецификации ТНВЭД
export type TnvedSpecification = {
    base_data_file_id: number
    base_specification_file_id: number | null
    company_id: number
    detail_specification_file_id: number | null
    id: string
};

// Сервис работы со спецификациями ТНВЭД
export interface TnvedSpecificationServiceInterface {
    // Создание спецификации по переданным данным
    CreateSpecification(companyId: number, baseDataFile: number): Promise<string>

    // Загрузка спецификации по переданному ID
    LoadSpecificationById(specificationId: string): Promise<TnvedSpecification>

    // Обновление спецификации
    UpdateSpecification(specification: TnvedSpecification): Promise<void>

    // Подписка на события изменения спецификации
    SubscribeToSpecificationChanges(specificationId: string): Subject<FetchResult<SubscribeToSpecificationChangesQueryResponse>>
}