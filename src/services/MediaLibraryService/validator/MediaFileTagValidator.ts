import {MediaFile, MediaFileTags, MediaFileTagValidatorInterface, MediaFileValidateResult} from "../interface";

// список основных полей мета информации
const defaultGeneralMetaTags: MediaFileTags[] = [
    "file_name",
    "title",
    "artist",
    "album",
    "year",
    "genre",
    "bpm",
    "isrc",
    "lyricist",
    "composer",
    "publisher",
    "language",
    "license_type",
]

/**
 * Проверка на заполненность мета информации по файлу
 */
export default class MediaFileTagValidator implements MediaFileTagValidatorInterface {
    private readonly generalMetaTags: MediaFileTags[];
    private readonly requiredMetaTags: MediaFileTags[];

    constructor(
        requiredMetaTags: MediaFileTags[] = [],
        generalMetaTags: MediaFileTags[] = defaultGeneralMetaTags,
    ) {
        this.requiredMetaTags = requiredMetaTags;
        this.generalMetaTags = generalMetaTags;
    }

    validate(file: MediaFile): MediaFileValidateResult {
        const {general, required} = Object.entries(file).reduce(
                <K extends MediaFileTags>(previousValue, currentValue: [
                    K, MediaFile[K]
                ]) => {
                    if (this.generalMetaTags.includes(currentValue[0]) && !!currentValue[1]) {
                        previousValue.general += 1;
                    }

                    if (this.requiredMetaTags.includes(currentValue[0]) && !!currentValue[1]) {
                        previousValue.required += 1;
                    }

                    return previousValue;
                },
                {
                    general: 0,
                    required: 0
                }
            )
        ;

        return {
            generalPercent: Math.floor(general / this.generalMetaTags.length * 100),
            requiredPercent: this.requiredMetaTags.length !== 0
                ? Math.floor(required / this.requiredMetaTags.length * 100)
                : 100,
        };
    }
}
