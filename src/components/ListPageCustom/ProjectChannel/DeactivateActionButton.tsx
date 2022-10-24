import {FC} from "react";
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";

type Props = {
    checkedItems: any[]
}

const DeactivateActionButton: FC<Props> = () => {
    const {t} = useTranslation()

    return (
        <Button>
            {t('pages.project_channel.list.button.deactivate')}
        </Button>
    )
}

export default DeactivateActionButton