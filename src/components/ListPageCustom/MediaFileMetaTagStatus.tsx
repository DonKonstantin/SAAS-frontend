import {FC, memo, useMemo} from "react";
import {MediaFile} from "../../services/MediaLibraryService/interface";
import MediaFileTagValidator from "../../services/MediaLibraryService/validator/MediaFileTagValidator";
import {useTranslation, } from "react-i18next";
import {Button, Chip} from "@mui/material";
import {styled} from "@mui/material/styles";

type Props = {
    file: MediaFile
}

const statusConfig = {
    notFilled: {
        color: "error"
    },
    requiredFilled: {
        color: "warning"
    },
    fullFilled: {
        color: "success"
    }
}

const StyledChip = styled(Chip)`
    border-radius: 3px;
    width: 100%;
`

const validator = new MediaFileTagValidator(["title", "file_name", "artist", "license_type"])

const MediaFileMetaTagStatus: FC<Props> = props => {
    const {file} = props;
    const {t} = useTranslation();

    const status = useMemo(() => {
        const result = validator.validate(file);

        if (result.requiredPercent !== 100) {
            return "notFilled";
        }

        if (result.generalPercent < 100) {
            return "requiredFilled";
        }

        return "fullFilled";
    }, [file]);

    const color = useMemo(() => {
        return statusConfig[status]?.color || "primary"
    },
        [status]
    )

    return (
        <StyledChip
            size={"small"}
            variant={'filled'}
            label={t(`pages.file.metaTagFilledStatus.${status}`)}
            color={color as "error" | "success" | "warning"}
        />
    )
}

export default memo(MediaFileMetaTagStatus);
