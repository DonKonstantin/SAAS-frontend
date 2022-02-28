import {Schema} from "./index";

// Описание сущности файла в медиабиблиотеке
const file: Schema = {
    fields: {
        album: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        artist: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        bpm: {
            type: "Int!",
            isPrimaryKey: false,
            isArray: false
        },
        composer: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        file_name: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        genre: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        id: {
            type: "ID!",
            isPrimaryKey: true,
            isArray: false
        },
        isrc: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        language: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        license_type: {
            type: "Enum!",
            isPrimaryKey: false,
            isArray: false,
            enum: {
                variants: {
                    rao_voice: "mediaLibrary.field.lincese_type-enum.rao_voice",
                    sparx: "mediaLibrary.field.lincese_type-enum.sparx",
                    amurco: "mediaLibrary.field.lincese_type-enum.amurco"
                }
            }
        },
        lyricist: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        mime_type: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        obscene: {
            type: "Boolean!",
            isPrimaryKey: false,
            isArray: false
        },
        publisher: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        title: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        year: {
            type: "ID!",
            isPrimaryKey: false,
            isArray: false
        },
    },
    isChangeable: false,
    isCreatable: false,
    isDeletable: false,
    subscriptionKey: ""
}

export default file;
