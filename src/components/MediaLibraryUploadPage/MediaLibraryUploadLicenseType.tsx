import {FC, memo} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useMediaLibraryUpload} from "./MediaFilesUploadContext";
import {distinctUntilChanged} from "rxjs";
import {LicenseType} from "../../services/MediaLibraryService/interface";
import {useTranslation} from "react-i18next";

const licenseVariants = Object.values(LicenseType).map(type => (
    {
        value: type,
        label: `pages.mediaLibrary.field.license_type-enum.${type}`,
    }
))

const MediaLibraryUploadLicenseType: FC = () => {
    const {setLicenseType, licenseType} = useMediaLibraryUpload(
        distinctUntilChanged((previous, current) => previous.licenseType === current.licenseType)
    );
    const {t} = useTranslation();

    const handleChangeLicense = (event: SelectChangeEvent) => {
        setLicenseType(event.target.value as LicenseType || undefined)
    }

    return (
        <FormControl fullWidth>
            <InputLabel id={`select-license-type`}>{t(`Тип лицензии`)}</InputLabel>
            <Select
                labelId={`select-license-type`}
                id={`license-typ`}
                value={licenseType}
                label={t(`Тип лицензии`)}
                onChange={handleChangeLicense}
            >
                {
                    licenseVariants.map(
                        ({value, label}) => <MenuItem value={value} key={value}>{t(label)}</MenuItem>
                    )
                }
            </Select>
        </FormControl>
    )
}

export default memo(MediaLibraryUploadLicenseType);
