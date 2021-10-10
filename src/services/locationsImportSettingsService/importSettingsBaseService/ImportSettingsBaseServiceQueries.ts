import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {ImportSettingsData, ImportSettingsInsertData} from "./interfaces";

// Результат выполнения запроса листинга настроек
export interface ImportSettingsBaseServiceListQueryResponse {
    list: ImportSettingsData[]
}

// Запрос листинга настроек
export class ImportSettingsBaseServiceListQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(settingsType: string) {
        this.variables = null;
        this.query = gql`
            query {
              list: import_settings_list(where: {settings_type: {_equals: ${settingsType}}}) {
                id
                name
                settings_type
                settings
              }
            }
        `
    }
}

// Результат выполнения запроса листинга настроек
export interface ImportSettingsBaseServiceInsertOrUpdateResponse {
    response: {
        returning: ImportSettingsData[]
    }
}

// Запрос вставки новой сущности настроек
export class ImportSettingsBaseServiceInsertMutation implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(settings: ImportSettingsInsertData) {
        const { settings: data, settings_type, name } = settings;

        this.variables = null;
        this.query = gql`
            mutation {
              response: import_settings_insert(objects: [
                {
                  name: "${name}",
                  settings: "${data}",
                  settings_type: ${settings_type}
                },
              ]) {
                returning {
                  id
                  name
                  settings_type
                  settings
                }
              }
            }
        `
    }
}

// Запрос обновления сущности настроек
export class ImportSettingsBaseServiceUpdateMutation implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(settings: ImportSettingsData) {
        const { settings: data, settings_type, id, name } = settings;

        this.variables = null;
        this.query = gql`
            mutation {
              response: import_settings_update(set: {
                  name: "${name}",
                  settings: "${data}",
                  settings_type: ${settings_type}
              }, where: {id: {_equals: ${id}}}) {
                returning {
                  id
                  name
                  settings_type
                  settings
                }
              }
            }
        `
    }
}

// Запрос удаления сущности настроек
export class ImportSettingsBaseServiceDeleteMutation implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(id: string) {
        this.variables = null;
        this.query = gql`
            mutation {
              response: import_settings_delete(where: {id: {_equals: ${id}}}) {
                affected_rows
              }
            }
        `
    }
}

// Запрос удаления сущности настроек
export class ImportSettingsBaseServiceSubscription implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        this.variables = null;
        this.query = gql`
            subscription {
              ImportSettingsChanges {
                entityId
                eventType
                data {
                  id
                  name
                  settings
                  settings_type
                }
              }
            }
        `
    }
}