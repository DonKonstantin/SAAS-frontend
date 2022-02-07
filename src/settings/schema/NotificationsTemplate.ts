import {Schema} from "./index";

/**
 * схема сущности шаблона для рассылок
 */
const notifications_template: Schema = {
    fields: {
        id: {
            type: "ID!",
            isPrimaryKey: true,
            isArray: false
        },
        body : {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        name : {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        recipient : {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        title : {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        }
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
}

export default notifications_template;
