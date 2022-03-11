import {FC} from "react";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {LicenseType, MediaFile} from "../../services/MediaLibraryService/interface";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import {SelectProps} from "@mui/material/Select/Select";
import {useTranslation} from "react-i18next";
import {v4 as uuidv4} from 'uuid';

type Props = {
    file: MediaFile
    onSave(file: MediaFile): void
    onCancel(): void
}

type ComponentsForms =
    (props: TextFieldProps & { variants: any[] }) => JSX.Element

const SelectControl: FC<SelectProps & { variants: any[] }> = props => {
    const {
        variants,
        onChange,
        value,
        label,
        disabled
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
                disabled={disabled}
                onChange={onChange}
            >
                {
                    variants.map(
                        ({value, label}) => <MenuItem value={value} key={value}>{t(label)}</MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )
}

const formConfig: {
    [key in keyof MediaFile]?: {
        Component: ComponentsForms,
        props?: {
            [K: string]: any
        },
        rules: {},
        label: string,
        variants?: any[]
    }
} = {
    title: {
        label: "pages.file.field.title",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    artist: {
        label: "pages.file.field.artist",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    album: {
        label: "pages.file.field.album",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    year: {
        label: "pages.file.field.year",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    genre: {
        label: "pages.file.field.genre",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    language: {
        label: "pages.file.field.language",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    license_type: {
        label: "pages.file.field.license_type",
        props: {
            disabled: true
        },
        rules: {

        },
        Component: SelectControl as unknown as ComponentsForms,
        variants: Object.values(LicenseType).map(type => (
            {
                value: type,
                label: `pages.mediaLibrary.field.license_type-enum.${type}`,
            }
        ))
    },
    bpm: {
        label: "pages.file.field.bpm",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    isrc: {
        label: "pages.file.field.isrc",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    lyricist: {
        label: "pages.file.field.lyricist",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    composer: {
        label: "pages.file.field.composer",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
    publisher: {
        label: "pages.file.field.publisher",
        rules: {},
        Component: TextField as unknown as ComponentsForms
    },
}

const MediaFileEditForm: FC<Props> = props => {
    const {file, onSave, onCancel} = props;
    const {control, handleSubmit} = useForm<MediaFile>({
        defaultValues: file,
    });
    const {t} = useTranslation();

    return (
        <form onSubmit={handleSubmit(onSave)}>
            <Grid container spacing={2} sx={{pt: 1}}>
                {
                    Object.entries(formConfig).map(
                        ([field, {
                            Component,
                            label,
                            props,
                            rules = {},
                            variants
                        }]) => {

                            return (
                                <Grid item md={6}>
                                    <Controller
                                        rules={rules}
                                        // @ts-ignore
                                        name={field}
                                        control={control}
                                        render={({field: {onChange, value}}) => (
                                            <Component
                                                {...props}
                                                fullWidth
                                                variants={variants || []}
                                                onChange={onChange}
                                                label={t(label)}
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
            <Stack direction={'row'} spacing={2} flexWrap={"wrap"} sx={{mt: 2}}>
                <Button
                    variant={"outlined"}
                    type={"submit"}>ПРИМЕНИТЬ ИЗМЕНЕНИЯ</Button>
                <Button
                    variant={"outlined"}
                    onClick={() => onCancel()}>ОТМЕНА</Button>
            </Stack>
        </form>
    )
}

export default MediaFileEditForm;
