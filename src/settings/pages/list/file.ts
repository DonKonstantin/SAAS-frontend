import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration} from "../../../services/listDataLoader/listLoader/types";
import CustomStatusCell from "../../../components/ListPageCustom/CustomStatusCell";
import CustomSongNameWithPlayCell from "../../../components/ListPageCustom/CustomSongNameWithPlayCell";
import CustomSongDurationWithPlayCell from "../../../components/ListPageCustom/CustomSongDurationWithPlayCell";
import React from "react";
import BulkEditing from "../../../components/ListPageCustom/BulkEditing";
import ListPageEditDeleteFilesButtons from "../../../components/ListPageEditDeleteFilesButtons";
import {ListHeaderProps} from "../../../components/ListPageParts/TableCaption";
import LoaderTrackFromFile from "../../../components/ListPageCustom/LoaderTrackFromFile";
import CustomTitleComponentForLoaderTrackFromFile
    from "../../../components/ListPageCustom/CustomTitleComponentForLoaderTrackFromFile";

export class FileListingConfiguration implements ListPageConfiguration<"file"> {
    filter: FilterFieldsConfiguration<"file"> = {
        publisher: {
            field: "publisher",
            filterType: "VariantsSelectorString",
            schema: "file",
            title: "Название файла",
            customComponent: LoaderTrackFromFile
        },
        title: {
            field: "title",
            filterType: "Like",
            schema: "file",
            title: "Название файла",
            customComponent: CustomTitleComponentForLoaderTrackFromFile
        },
        artist: {
            field: "artist",
            filterType: "Like",
            schema: "file",
            title: "Исполнитель"
        },
        album: {
            field: "album",
            filterType: "Like",
            schema: "file",
            title: "Альбом"
        },
        genre: {
            field: "genre",
            filterType: "Like",
            schema: "file",
            title: "Жанр"
        },
        bpm: {
            field: "bpm",
            filterType: "EqualsInt",
            schema: "file",
            title: "Темп трека"
        },
        isrc: {
            field: "isrc",
            filterType: "Like",
            schema: "file",
            title: "Международный стандартный номер аудио/видео записи"
        },
        language: {
            field: "language",
            filterType: "Like",
            schema: "file",
            title: "Язык исполнения"
        },
        lyricist: {
            field: "lyricist",
            filterType: "Like",
            schema: "file",
            title: "Автор текста"
        },
        composer: {
            field: "composer",
            filterType: "Like",
            schema: "file",
            title: "Автор музыки"
        },
        duration: {
            field: "duration",
            filterType: "EqualsInt",
            schema: "file",
            title: "Длительность трека"
        },
        creator: {
            field: "creator",
            filterType: "EqualsString",
            schema: "file",
            title: "Пользователь, который добавил трек"
        },
        last_editor: {
            field: "last_editor",
            filterType: "EqualsString",
            schema: "file",
            title: "Последний пользователь который изменял трек"
        },
        year: {
            field: "year",
            filterType: "EqualsInt",
            schema: "file",
            title: "Год создания"
        },
        creation_date: {
            field: "creation_date",
            filterType: "DateTimeRange",
            schema: "file",
            title: "Дата создания",
        },
    };
    listFields: ListFieldsConfiguration<"file"> = {
        fields: {
            id: {
                field: "id",
                title: "id",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            title: {
                field: "title",
                title: "Название файла",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple",
                }
            },
            file_name: {
                field: "file_name",
                title: "",
                isEnabled: true,
                width: 60,
                fieldType: {
                    config: undefined,
                    type: "Simple",
                    customComponent: CustomSongNameWithPlayCell
                }
            },
            artist: {
                field: "artist",
                title: "Имя исполнителя",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple",
                }
            },
            duration: {
                field: "duration",
                title: "Время",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple",
                    customComponent: CustomSongDurationWithPlayCell
                }
            },
            album: {
                field: "album",
                title: "Статус",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple",
                    customComponent: CustomStatusCell
                }
            },
            composer: {
                field: "composer",
                title: "composer",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            creation_date: {
                field: "creation_date",
                title: "creation_date",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            creator: {
                field: "creator",
                title: "creator",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            bpm: {
                field: "bpm",
                title: "bpm",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            genre: {
                field: "genre",
                title: "genre",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            hash_sum: {
                field: "hash_sum",
                title: "hash_sum",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            isrc: {
                field: "isrc",
                title: "isrc",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            language: {
                field: "language",
                title: "language",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            last_change_date: {
                field: "last_change_date",
                title: "last_change_date",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            last_editor: {
                field: "last_editor",
                title: "last_editor",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            license_type: {
                field: "license_type",
                title: "license_type",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            lyricist: {
                field: "lyricist",
                title: "lyricist",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            mime_type: {
                field: "mime_type",
                title: "mime_type",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            obscene: {
                field: "obscene",
                title: "obscene",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            publisher: {
                field: "publisher",
                title: "publisher",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            origin_name: {
                field: "origin_name",
                title: "origin_name",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
            year: {
                field: "year",
                title: "year",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Hidden"
                }
            },
        },
        actions: ListPageEditDeleteFilesButtons,
    };
    schema: "file" = "file";
    deleteSchema: "file_data" = "file_data";
    elementsPerPage: number = 25;
    addPageUrl: PageUrl = {href: "/file/add"};
    action: React.ComponentType<ListHeaderProps> = BulkEditing
    editPageUrl: EditPageLinkGenerator = pk => ({
        href: "/file/edit/[entityId]",
        as: `/file/edit/${pk}`
    });
}
