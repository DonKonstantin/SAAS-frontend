import {RelationConfiguration, Schema} from "./index";

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
        creation_date: {
            type: "DateTime!",
            isPrimaryKey: false,
            isArray: false
        },
        last_change_date: {
            type: "DateTime!",
            isPrimaryKey: false,
            isArray: false
        },
        file_name: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        duration: {
            type: "Int!",
            isPrimaryKey: false,
            isArray: false
        },
        genre: {
            type: "String!",
            isPrimaryKey: false,
            isArray: false
        },
        hash_sum: {
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
                    rao_voice: "mediaLibrary.field.license_type-enum.rao_voice",
                    sparx: "mediaLibrary.field.license_type-enum.sparx",
                    amurco: "mediaLibrary.field.license_type-enum.amurco"
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
        origin_name: {
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
            type: "Int!",
            isPrimaryKey: false,
            isArray: false
        },
        creator: {
            type: "ID!",
            isPrimaryKey: false,
            isArray: false,
            relation: <RelationConfiguration<"user">>{
                schema: "user",
                target: "id",
            },
        },
        last_editor: {
            type: "ID!",
            isPrimaryKey: false,
            isArray: false,
            relation: <RelationConfiguration<"user">>{
                schema: "user",
                target: "id",
            },
        }
    },
    isChangeable: true,
    isCreatable: false,
    isDeletable: true,
}

export default file;

export const file_data: Schema = {
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
            type: "Int!",
            isPrimaryKey: false,
            isArray: false
        },

    },
    isChangeable: true,
    isCreatable: false,
    isDeletable: true,
}
