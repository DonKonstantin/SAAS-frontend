import React, {ChangeEvent, FC, useState} from "react";
import {
    Autocomplete, Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Stack,
    TextField,
    Tooltip
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Controller, useForm} from "react-hook-form";
import {LicenseType, MediaFile} from "../../services/MediaLibraryService/interface";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import {SelectProps} from "@mui/material/Select/Select";
import {useTranslation} from "react-i18next";
import {v4 as uuidv4} from 'uuid';
import NotificationsNeedSaveTemplate from "../NotificationsNeedSaveTemplate";
import mediaFileClient from "../../services/MediaFileClient";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

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

const YearSelector: FC<TextFieldProps & { options: any[] }> = props => {
    const {
        onChange,
        value,
        label,
        options
    } = props;
    const {t} = useTranslation();

    return (
        <Autocomplete
            fullWidth
            options={options}
            onChange={(_, value) => {
                onChange && onChange(value as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
            }}
            value={value}
            renderInput={(params) => <TextField {...params} label={t(label as string)} fullWidth/>}
        />
    )
}

const now = new Date();

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
        Component: YearSelector as unknown as ComponentsForms,
        props: {
            options: Array.from(new Array(100)).map(
                (_, index) => +now.getFullYear() - index
            ),
        }
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
        props: {},
        rules: {},
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
        Component: TextField as unknown as ComponentsForms,
        props: {
            type: "number",
            inputProps: {inputMode: 'numeric', pattern: '[0-9]*'}
        }
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
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<any>();
    const [completeProcess, setCompleteProcess] = useState(0);
    const {control, getValues} = useForm<MediaFile>({
        defaultValues: file,
    });

    const {t} = useTranslation();

    const checkValidOperation = () => {
        const value = getValues();
        if (!selectedFile) {

            onSave(value)
        }

        setIsOpen(true)
    }

    const changeHandler = async (event) => {
        const currentFile = event.target.files[0]
        setSelectedFile(currentFile);
    };

    const onConfirm = async () => {
        setIsLoading(true)

        await mediaFileClient().Replace(
            file.id,
            selectedFile,
            file,
            {
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setCompleteProcess(percent);
                }
            }
        )

        setIsLoading(false)
        setIsOpen(false)
        onSave(file);
    }

    const handleDeleteFile = () => {
        setSelectedFile(undefined)
    }

    return (
        <>
            <Grid style={{position: "relative"}} container spacing={2} sx={{pt: 1}}>
                {Object.entries(formConfig).map(
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
                                    )}
                                />
                            </Grid>
                        )
                    }
                )}
            </Grid>
            <Stack direction={'row'} spacing={2} justifyContent={"space-between"} flexWrap={"wrap"} sx={{mt: 2}}>
                <Stack direction={'row'} spacing={2} justifyContent={"space-between"} flexWrap={"wrap"}>
                    <Button
                        variant={"outlined"}
                        onClick={checkValidOperation}>ПРИМЕНИТЬ ИЗМЕНЕНИЯ</Button>
                    <Button
                        variant={"outlined"}
                        color={'secondary'}
                        onClick={() => onCancel()}>ОТМЕНА</Button>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                    <Button
                        variant={"outlined"}
                        component="label"
                    >
                        {selectedFile && (
                            <div>{selectedFile.name.slice(0, 15)}...</div>
                        )}
                        {!selectedFile && (
                            <Stack direction={'row'} spacing={2} justifyContent={"space-between"} flexWrap={"wrap"}>
                                <CloudDownloadIcon/>
                                <div>Выберите новый файл</div>
                            </Stack>
                        )}
                        {!selectedFile && (<input
                            accept="audio/mpeg, audio/mp3"
                            type="file"
                            onChange={changeHandler}
                            hidden
                        />)}
                    </Button>
                    {selectedFile && (
                        <Tooltip title={t("Отменить замену файла") as string}>
                            <IconButton color={'secondary'} onClick={handleDeleteFile}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
                {selectedFile && (
                    <NotificationsNeedSaveTemplate
                        title={"Загрузка песни"}
                        content={`Вы точно хотите заменить файл на: ${selectedFile.name}`}
                        isLoading={isLoading}
                        open={isOpen}
                        onConfirm={onConfirm}
                        onClose={() => setIsOpen(false)}
                    >
                        <Box sx={{mt: 2}}>
                            <LinearProgress value={completeProcess} variant={"determinate"}/>
                        </Box>
                    </NotificationsNeedSaveTemplate>
                )}
            </Stack>
        </>
    )
}

export default MediaFileEditForm;

