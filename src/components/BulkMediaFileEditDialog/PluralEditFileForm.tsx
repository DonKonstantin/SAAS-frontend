import {FC} from "react";
import {Button, Grid, Stack, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {MediaFile} from "../../services/MediaLibraryService/interface";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import {useTranslation} from "react-i18next";

type Props = {
    file: MediaFile
    onSave(file: MediaFile): void
    onCancel(): void
}

type ComponentsForms =
    (props: TextFieldProps & { variants: any[] }) => JSX.Element


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
}

const PluralEditFileForm: FC<Props> = props => {
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
                                <Grid item md={12}>
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
                    )
                }
            </Grid>
            <Stack direction={'row'} spacing={2} flexWrap={"wrap"} sx={{mt: 2}}>
                <Button
                    variant={"outlined"}
                    type={"submit"}>ПРИМЕНИТЬ ИЗМЕНЕНИЯ</Button>
                <Button
                    variant={"outlined"}
                    color={'secondary'}
                    onClick={() => onCancel()}>ОТМЕНА</Button>
            </Stack>
        </form>
    )
}

export default PluralEditFileForm;
