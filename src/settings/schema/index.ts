import { Collection } from "../../services/types";
import notifications_template from "./NotificationsTemplate";
import notification_config from "./NotificationConfig";
import file, { file_data } from "./File";
import projectChannel from "./ProjectChannel";
import Player_Without_Relations from "./PlayerWithoutRelations";

/**
 * Основные схемы данных GraphQL. Содержат связи между сущностями,
 * настройки типов данны
 */
export class Schemas {
  // Параметры схемы сущности Домен
  domain: Schema = {
    fields: {
      id: {
        type: "ID!",
        isPrimaryKey: true,
        isArray: false,
      },
      name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      active: {
        type: "Boolean!",
        isPrimaryKey: false,
        isArray: false,
      },
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
  };

  // Параметры схемы сущности плеера
  player: Schema = {
    fields: {
      //  ID сущности
      id: {
        type: "ID",
        isPrimaryKey: true,
        isArray: false,
      },
      //  Токен авторизации, привязанный к плееру
      authorization_token: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  GUID плеера
      guid: {
        type: "ID!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Флаг активности плеера
      is_active: {
        type: "Boolean!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Последнее обращение к плееру
      last_query: {
        type: "DateTime!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Последнее обновление плеера
      last_update: {
        type: "DateTime!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Название плеера
      name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Паспорт объекта, который привязан к плееру.
     /* object_passport: {
        type: "Object_Passport",
        isPrimaryKey: false,
        isArray: false,
      },*/
      //  Идентификатор паспорта объекта, который привязан к плееру.
      object_passport_id: {
        type: "NullableID",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Код плеера, к которому относится плеер.
      player_code: {
        type: "Player_Code!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Идентификатор кода плеера, к которому относится плеер.
      player_code_id: {
        type: "ID!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Идентификатор проекта, к которому относится плеер
      project_id: {
        type: "ID!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Статус загрузки плеера, в %
      uploading_status: {
        type: "Int!",
        isPrimaryKey: false,
        isArray: false,
      },
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
  };
  // Параметры схемы сущности Проект
  project: Schema = {
    fields: {
      id: {
        type: "ID!",
        isPrimaryKey: true,
        isArray: false,
      },
      name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      active: {
        type: "Boolean!",
        isPrimaryKey: false,
        isArray: false,
      },
      parent: {
        type: "Int!",
        isPrimaryKey: false,
        isArray: false,
        relation: <RelationConfiguration<"domain">>{
          schema: "domain",
          target: "id",
        },
      },
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
  };

  // Параметры схемы сущности Категория Разрешений
  permission_category: Schema = {
    fields: {
      id: {
        type: "ID!",
        isPrimaryKey: true,
        isArray: false,
      },
      level: {
        type: "Enum!",
        isPrimaryKey: false,
        isArray: false,
        enum: {
          variants: {
            realm: "pages.permission_category.list.fields.level-enum.realm",
            domain: "pages.permission_category.list.fields.level-enum.domain",
            project: "pages.permission_category.list.fields.level-enum.project",
          },
        },
      },
      name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
  };

  // Параметры схемы сущности Разрешение
  permission: Schema = {
    fields: {
      id: {
        type: "ID!",
        isPrimaryKey: true,
        isArray: false,
      },
      category_id: {
        type: "ID!",
        isArray: false,
        isPrimaryKey: false,
        relation: <RelationConfiguration<"permission_category">>{
          schema: "permission_category",
          target: "id",
        },
      },
      name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      code: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
  };

  // Параметры схемы сущности Роль
  role: Schema = {
    fields: {
      id: {
        type: "ID!",
        isPrimaryKey: true,
        isArray: false,
      },
      level: {
        type: "Enum!",
        isPrimaryKey: false,
        isArray: false,
        enum: {
          variants: {
            realm: "Реалм",
            domain: "Домен",
            project: "Проект",
          },
        },
      },
      name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      permissions_id: {
        type: "ID!",
        isArray: true,
        isPrimaryKey: false,
        relation: <RelationConfiguration<"permission">>{
          schema: "permission",
          target: "id",
        },
      },
      structure_item_id: {
        type: "ID!",
        isArray: false,
        isPrimaryKey: false,
      },
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
  };

  // Параметры схемы сущности Пользователь
  user: Schema = {
    fields: {
      id: {
        type: "ID!",
        isPrimaryKey: true,
        isArray: false,
      },
      email: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      first_name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      last_name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      roles_id: {
        type: "ID!",
        isArray: true,
        isPrimaryKey: false,
        relation: <RelationConfiguration<"role">>{
          schema: "role",
          target: "id",
        },
      },
      active: {
        type: "Boolean!",
        isPrimaryKey: false,
        isArray: false,
      },
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
  };

  // Параметры схемы сущности Паспорт объекта
  object_passport: Schema = {
    fields: {
      id: {
        type: "ID!",
        isPrimaryKey: true,
        isArray: false,
      },
      accountant: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      director: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      locality: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      project_id: {
        type: "ID!",
        isArray: false,
        isPrimaryKey: false,
        relation: <RelationConfiguration<"project">>{
          schema: "project",
          target: "id",
        },
      },
      rao_authors_fee_for_december: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      rao_authors_fee_for_on_to_eleven_months: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      rao_date_of_conclusion: {
        type: "DateTime!",
        isPrimaryKey: false,
        isArray: false,
      },
      rao_email: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      rao_license_number: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      rao_requisites: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      site_name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      user_inn: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      user_name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      vois_date_of_conclusion: {
        type: "DateTime!",
        isPrimaryKey: false,
        isArray: false,
      },
      vois_email: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      vois_fee: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      vois_license_number: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
  };

  player_code: Schema = {
    fields: {
      //  Каналы проекта, доступные для плеера (сущности)
      channels: {
        type: "Project_Channel",
        isPrimaryKey: false,
        isArray: true,
      },
      //  Время закрытия заведения (формат: hh:mm:ss, пример: 10:00:00)
      close_time: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Символьный код кода плеера
      code: {
        type: "String!",
        isPrimaryKey: true,
        isArray: false,
      },
      //  ID сущности
      id: {
        type: "ID!",
        isPrimaryKey: true,
        isArray: false,
      },
      //  Флаг активности кода плеера
      is_active: {
        type: "Boolean!",
        isArray: false,
        isPrimaryKey: false,
      },
      //  Время открытия заведения (формат: hh:mm:ss, пример: 10:00:00)
      open_time: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Плееры, относящиеся к каналу
      players: {
        type: "Player_Without_Relations",
        isPrimaryKey: false,
        isArray: true,
      },
      //  Каналы проекта, доступные для плеера
      project_channels: {
        type: "ID",
        isPrimaryKey: false,
        isArray: true,
      },
      //  Идентификатор проекта, к которому относится код плеера
      project_id: {
        type: "ID!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Время технической перезагрузки плеера (формат: hh:mm:ss, пример: 10:00:00)
      reload_time: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
  };


  // Параметры схемы сущности Компании
  campaign: Schema = {
    fields: {
      id: {
        type: "ID",
        isPrimaryKey: true,
        isArray: false,
      },
      name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      version: {
        type: "Int!",
        isPrimaryKey: false,
        isArray: false,
      },
      campaign_priority : {
        type: "Enum!",
        isPrimaryKey: false,
        isArray: false,
        enum: {
          variants: {
            higher: "pages.campaign.list.fields.campaign-priority-enum.higher",
            high: "pages.campaign.list.fields.campaign-priority-enum.high",
            normal: "pages.campaign.list.fields.campaign-priority-enum.normal",
            low: "pages.campaign.list.fields.campaign-priority-enum.low",
            background: "pages.campaign.list.fields.campaign-priority-enum.background",
          },
        },
      },
      campaign_period_start: {
        type: "DateTime!",
        isPrimaryKey: false,
        isArray: false,
      },
      campaign_period_stop: {
        type: "DateTime!",
        isPrimaryKey: false,
        isArray: false,
      },
      days: {
        type: "CampaignDay!",
        isPrimaryKey: false,
        isArray: true,
      },
      campaign_type : {
        type: "Enum!",
        isPrimaryKey: false,
        isArray: false,
        enum: {
          variants: {
            simple: "pages.campaign.edit.fields.campaign-type.simple",
            mute: "pages.campaign.edit.fields.campaign-type.mute"
          },
        },
      },
      campaign_end_type : {
        type: "Enum!",
        isPrimaryKey: false,
        isArray: false,
        enum: {
          variants: {
            finish: "pages.campaign.edit.fields.campaign_end_type.finish",
            break: "pages.campaign.edit.fields.campaign_end_type.break"
          },
        },
      },
      campaign_low_priority_end_type : {
        type: "Enum!",
        isPrimaryKey: false,
        isArray: false,
        enum: {
          variants: {
            finish: "pages.campaign.edit.fields.campaign_low_priority_end_type.finish",
            break: "pages.campaign.edit.fields.campaign_low_priority_end_type.break"
          },
        },
      },
      campaign_play_type : {
        type: "Enum!",
        isPrimaryKey: false,
        isArray: false,
        enum: {
          variants: {
            periodic: "pages.campaign.edit.fields.campaign_play_type.periodic",
            continuous: "pages.campaign.edit.fields.campaign_play_type.continuous"
          },
        },
      },
      campaign_play_tracks_period_type : {
        type: "Enum!",
        isPrimaryKey: false,
        isArray: false,
        enum: {
          variants: {
            hours: "pages.campaign.edit.fields.campaign_play_tracks_period_type.hours",
            minutes: "pages.campaign.edit.fields.campaign_play_tracks_period_type.minutes"
          },
        },
      },
      campaign_days_type : {
        type: "Enum!",
        isPrimaryKey: false,
        isArray: false,
        enum: {
          variants: {
            daily: "pages.campaign.edit.fields.campaign_days_type.daily",
            daysOfTheWeek: "pages.campaign.edit.fields.campaign_days_type.daysOfTheWeek"
          },
        },
      },
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
  };

  project_playlist: Schema = {
    fields: {
      //  Общая длительность плейлиста
      duration: {
        type: "Int!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  ID сущности
      id: {
        type: "ID",
        isPrimaryKey: true,
        isArray: false,
      },
      //  Флаг, что в плейлисте используется единая громкость мелодий
      is_overall_volume: {
        type: "Boolean!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Название плейлиста
      name: {
        type: "String!",
        isPrimaryKey: false,
        isArray: false,
      },
      // Общая громкость звука в плейлисте
      overall_volume: {
        type: "Int!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Идентификатор проекта, к которому относится плейлист
      project_id: {
        type: "ID!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Файлы, относящиеся к плейлисту
      files: {
        type: "[Project_PlayList_File!]",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Дата создания плэйлиста
      created_at: {
        type: "DateTime!",
        isPrimaryKey: false,
        isArray: false,
      },
      //  Дата последнего обновления плэйлиста
      updated_at: {
        type: "DateTime!",
        isPrimaryKey: false,
        isArray: false,
      },
    },

    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
  };

  // Шаблоны для рассылок
  notifications_template = notifications_template;
  notification_config = notification_config;
  file = file;
  file_data = file_data;
  project_channel: Schema = projectChannel;
  Player_Without_Relations: Schema = Player_Without_Relations;
}

/**
 * Параметры поля схемы GraphQL
 */
type SchemaKey = keyof Schemas;
export type FieldType =
  | "ID"
  | "Int"
  | "String"
  | "Float"
  | "Boolean"
  | "DateTime"
  | "ID!"
  | "Int!"
  | "String!"
  | "Float!"
  | "Boolean!"
  | "DateTime!"
  | "Enum"
  | "Enum!"
  | "Schema"
  | "Project_Channel"
  | "Player_Without_Relations"
  | "Project_PlayList_File"
  | "[Project_PlayList_File!]"
  | "NullableID"
  | "Player_Code!"
  | "CampaignDay!"
  ;

export class SchemaField {
  type: FieldType;
  isPrimaryKey: boolean;
  isArray: boolean;
  relation?: RelationConfiguration<any>;
  schema?: keyof Schemas
  enum?: EnumConfiguration;
}

type EnumConfiguration = {
  variants: Collection<string>;
};

/**
 * Параметры отношения
 */
type Field<T extends SchemaKey> = keyof Schemas[T]["fields"];
export type RelationConfiguration<M extends SchemaKey> = {
  schema: M;
  target: Field<M>;
};

/**
 * Параметры схемы
 */
type FieldsCollection = { [P: string]: SchemaField };
export interface Schema {
  fields: FieldsCollection;
  isCreatable: boolean;
  isDeletable: boolean;
  isChangeable: boolean;
  subscriptionKey?: string;
}
