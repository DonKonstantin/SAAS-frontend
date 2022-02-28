import {FC} from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {LicenseType, MediaFile} from "../../services/MediaLibraryService/interface";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import {SelectProps} from "@mui/material/Select/Select";
import {useTranslation} from "react-i18next";
import {v4 as uuidv4} from 'uuid';

type Props = {
    file: MediaFile
    onChange(file: MediaFile): void
}

type ComponentsForms =
    (props: TextFieldProps & { variants: any[] }) => JSX.Element

const SelectControl: FC<SelectProps & { variant: any[] }> = props => {
    const {
        variants,
        onChange,
        value,
        label
    } = props;
    const {t} = useTranslation();

    const id = uuidv4();

    return (
        <FormControl fullWidth>
            <InputLabel id={`select-${id}`}>{t(label as string)}</InputLabel>
            <Select
                labelId={`select-${id}`}
                id={id}
                value={value}
                label={t(label as string)}
                onChange={onChange}
            >
                {
                    variants.map(
                        ({value, label}) => <MenuItem value={value}>{t(label)}</MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )
}

const formConfig: {
    [key in keyof MediaFile]?: {
        Component: ComponentsForms
        rules: {},
        label: string,
        variants?: any[]
    }
} = {
    title: {
        label: "title",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    artist: {
        label: "artist",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    album: {
        label: "album",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    year: {
        label: "year",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    genre: {
        label: "genre",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    language: {
        label: "year",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    license_type: {
        label: "license_type",
        rules: {

        },
        Component: SelectControl as unknown as ComponentsForms,
        variants: [
            {
                value: LicenseType.sparx,
                label: LicenseType.sparx,

            }, {
                value: LicenseType.amurco,
                label: LicenseType.amurco,
            },
            {
                value: LicenseType.rao_voice,
                label: LicenseType.rao_voice,
            }]
    },
    bpm: {
        label: "bpm",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    isrc: {
        label: "isrc",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    lyricist: {
        label: "lyricist",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    composer: {
        label: "composer",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    publisher: {
        label: "publisher",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
}

const MediaFileEditForm: FC<Props> = props => {
    const {file, onChange} = props;
    const {register, control, handleSubmit} = useForm<MediaFile>({
        defaultValues: file
    });

    return (
        <form>
            <Grid container spacing={2} sx={{pt: 1}}>
                {
                    Object.entries(formConfig).map(
                        ([field, {
                            Component,
                            label,
                            rules = {},
                            variants
                        }]) => {
                            return (
                                <Grid item md={6}>
                                    <Controller
                                        rules={rules}
                                        name={field}
                                        control={control}
                                        render={({field: {onChange, value}}) => (
                                            <Component
                                                fullWidth
                                                variants={variants}
                                                onChange={onChange}
                                                label={label}
                                                value={value}
                                            />
                                        )
                                        }
                                    />
                                </Grid>
                            )
                        }
                    )
                }
            </Grid>
        </form>
    )
}

export default MediaFileEditForm;
