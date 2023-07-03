import React, {FC, useEffect, useState} from "react";
import {Button, IconButton, Stack, Tooltip} from "@mui/material";
import {FilterFieldProperties} from "../../services/listDataLoader/filterLoader/types";
import useFieldConfiguration from "../ListPageParts/Filter/useFieldConfiguration";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import {useTranslation} from "react-i18next";

// Компонент вывода простой ячейки
const LoaderTrackFromFile: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props
    const fieldConfig = useFieldConfiguration(fieldCode);
    const titleConfig = useFieldConfiguration('title');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [prevFile, setPrevFile] = useState<File | null>(null);

    const {t} = useTranslation()

    useEffect(() => {
        if (!titleConfig) {
            return
        }

        //@ts-ignore
        if (typeof titleConfig.value.value.value === 'string' || titleConfig.value.value.value === null) {
            setSelectedFile(null)
        } else {
            prevFile !== null && loadFile(prevFile)
        }
    }, [titleConfig])

    if (!fieldConfig) {
        return null
    }

    const loadFile = (file: File) => {
        setPrevFile(file)
        setSelectedFile(file);
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = (e) => {
            const data: any = JSON.parse(e?.target?.result as string)
            const songs = Object.keys(data).reduce((acc: [], item: string) => {
                // @ts-ignore
                acc.push(data[item])
                return acc
            }, [])

            const conf = {
                ...value,
                configuration: {
                    ...value.configuration,
                    field: 'title'
                }
            }
            onChangeFilterValues('title', {...conf, value: {value: songs.flat()}} as any)
        };
    }

    const {onChangeFilterValues, value} = fieldConfig

    const changeHandler = async (event) => {
        const currentFile = event.target.files[0]
        setSelectedFile(currentFile);
        setPrevFile(currentFile)
        const fileReader = new FileReader();
        fileReader.readAsText(currentFile, "UTF-8");
        fileReader.onload = (e) => {
            const data: any = JSON.parse(e?.target?.result as string)
            const songs = Object.keys(data).reduce((acc: [], item: string) => {
                // @ts-ignore
                acc.push(data[item])
                return acc
            }, [])

            const conf = {
                ...value,
                configuration: {
                    ...value.configuration,
                    field: 'title'
                }
            }
            onChangeFilterValues('title', {...conf, value: {value: songs.flat()}} as any)
        };
    };

    const handleDeleteFile = () => {
        setPrevFile(null)
        setSelectedFile(null);
        const conf = {
            ...value,
            configuration: {
                ...value.configuration,
                filterType: 'Like',
                field: 'title'
            }
        }
        onChangeFilterValues('title', {...conf, value: {value: null}} as any)
    }

    return (
        <div style={{position: "relative"}}>
            {selectedFile && (
                <div style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '-20px',
                    borderRadius: 25,
                    border: '1px solid primary',
                    background: 'white',
                    zIndex: 4,
                    boxShadow: '0px 0px 16px 1px rgba(111, 147, 61, 0.2)'
                }}>
                    <Tooltip title={t("Отменить загрузку файла в фильтр") as string}>
                        <IconButton color={'secondary'} onClick={handleDeleteFile}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            )}
            <Button
                variant={"outlined"}
                component="label"
                fullWidth={true}
            >
                {selectedFile && (
                    <div>{selectedFile.name.slice(0, 25)}...</div>
                )}
                {!selectedFile && (
                    <Stack direction={'row'} spacing={2} justifyContent={"space-between"} flexWrap={"wrap"}>
                        <CloudDownloadIcon/>
                        <div>ИМПОРТ ДЛЯ ПОИСКА</div>
                    </Stack>
                )}
                {!selectedFile && (
                    <input
                        accept="application/json"
                        type="file"
                        onChange={changeHandler}
                        hidden
                    />
                )}
            </Button>
        </div>
    )
}

// Экспортируем компонент
export default LoaderTrackFromFile
