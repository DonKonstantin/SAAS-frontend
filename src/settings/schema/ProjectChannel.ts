import {Schema} from "./index";


const projectChannel: Schema = {
    fields:       {
        id: {
            type: "ID!",
            isPrimaryKey: true,
            isArray: false,
        },
        is_active: {
            type: "Boolean!",
            isPrimaryKey: false,
            isArray: false,
        },
        name: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false,
        },
        project_id: {
            type: "ID!",
            isPrimaryKey: false,
            isArray: false,
        },
        players: {
            type: "Schema",
            isPrimaryKey: false,
            isArray: true,
            schema: "Player_Without_Relations",
        },
        updated_at: {
          type: "DateTime!",
          isPrimaryKey: false,
          isArray: false,
        }
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
}

export default projectChannel