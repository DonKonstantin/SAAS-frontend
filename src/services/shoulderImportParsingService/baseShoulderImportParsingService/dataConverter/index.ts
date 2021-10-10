import {DataConverterInterface} from "./interfaces";
import {DataConverter} from "./DataConverter";
import {StringProcessor} from "./StringProcessor";
import {NumberProcessor} from "./NumberProcessor";
import {DateTimeProcessor} from "./DateTimeProcessor";
import {StringRelationProcessor} from "./StringRelationProcessor";
import {entitySearchService} from "../../../entitySearchService";
import {NumberRelationProcessor} from "./NumberRelationProcessor";
import {BooleanProcessor} from "./BooleanProcessor";
import {EnumProcessor} from "./EnumProcessor";

// Конструктор сервиса
export const dataConverter: {<T, field extends keyof T>(): DataConverterInterface<T, field>} = <T, field extends keyof T>() => {
    return new DataConverter<T, field>(
        new StringProcessor<T, field>(),
        new NumberProcessor<T, field>(),
        new DateTimeProcessor<T, field>(),
        new StringRelationProcessor<T, field>(
            entitySearchService(),
        ),
        new NumberRelationProcessor<T, field>(
            entitySearchService(),
        ),
        new BooleanProcessor<T, field>(),
        new EnumProcessor<T, field>(),
    );
};