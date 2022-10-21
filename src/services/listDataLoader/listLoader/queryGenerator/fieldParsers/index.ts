import {ListFieldValueTypes} from "../../types";
import {FieldParsersInterface} from "./interfaces";
import {RelationFieldsParser} from "./RelationFieldsParser";
import {loggerFactory} from "../../../../logger";
import {graphQLClient} from "../../../../graphQLClient";
import {SimpleFieldParsers} from "./SimpleFieldParsers";
import {schemaValueConverter} from "../../../../schemaValueConverter";
import {EnumFieldsParser} from "./EnumFieldsParser";
import {SchemaFieldParser} from "./SchemaFieldParser";

export type FieldParsers = { [P in keyof ListFieldValueTypes]: FieldParsersInterface<P> }
export const fieldParsers: { (token?: string): FieldParsers } = (): FieldParsers => {
    const logger = loggerFactory();
    const client = graphQLClient();

    return {
        MultipleRelation: new RelationFieldsParser<"MultipleRelation">(logger, client),
        Relation: new RelationFieldsParser<"Relation">(logger, client),
        Simple: new SimpleFieldParsers(schemaValueConverter()),
        Enum: new EnumFieldsParser(schemaValueConverter()),
        Hidden: new SimpleFieldParsers(schemaValueConverter()),
        Schema: new SchemaFieldParser(schemaValueConverter())
    }
};