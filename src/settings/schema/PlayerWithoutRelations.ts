import {Schema} from "./index";

const Player_Without_Relations: Schema = {
    fields: {
        authorization_token: {
            type: "String!",
            isArray: false,
            isPrimaryKey: false
        },
        guid: {
            type: "ID!",
            isArray: false,
            isPrimaryKey: false
        },
        id: {
            type: "ID",
            isArray: false,
            isPrimaryKey: false
        },
        is_active: {
            type: "Boolean!",
            isArray: false,
            isPrimaryKey: false
        },
        last_query: {
            type: "DateTime!",
            isArray: false,
            isPrimaryKey: false
        },
        last_update: {
            type: "DateTime!",
            isArray: false,
            isPrimaryKey: false
        },
        name: {
            type: "String!",
            isArray: false,
            isPrimaryKey: false
        },
        object_passport_id: {
            type: "NullableID",
            isArray: false,
            isPrimaryKey: false
        },
        player_code_id: {
            type: "ID!",
            isArray: false,
            isPrimaryKey: false
        },
        project_id: {
            type: "ID!",
            isArray: false,
            isPrimaryKey: false
        },
    },
    isChangeable: false,
    isCreatable: false,
    isDeletable: false,
    subscriptionKey: ""

}

export default Player_Without_Relations;