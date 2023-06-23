import { FC, useEffect, useState } from "react";
import { useEntityList } from "../../context/EntityListContext";
import { Button, Tooltip } from "@mui/material";
import { listSchemaConfiguration } from "../../settings/pages";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useAuthorization } from "../../context/AuthorizationContext";
import { PageWithEntityList } from "../ListPage/types";
import CheckPermission from "../../services/helpers/CheckPermission";
import { ListPageConfiguration } from "../../settings/pages/system/list";
import { withPageProps } from "../../layouts/PagePropsProvider";

// Компонент вывода кнопки создания элемента
const ListPageCreationButton: FC<
  PageWithEntityList & { buttonTitle?: string; disabled?: boolean }
> = (props) => {
  const {
    permissionCheckCreatePermission,
    permissionCheckLevel = "project",
    permissionCheckCreateLevel = permissionCheckLevel,
    buttonTitle,
    disabled,
  } = props;

  const { userInfo } = useAuthorization();
  const [config, setConfig] = useState<ListPageConfiguration>();
  const { data } = useEntityList();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!data) {
      return;
    }

    const { schema } = data;
    setConfig(listSchemaConfiguration()[schema]);
  }, [data?.schema]);

  if (!data || !config || !userInfo) {
    return null;
  }

  if (
    permissionCheckCreatePermission &&
    !CheckPermission(
      userInfo,
      permissionCheckCreatePermission,
      permissionCheckCreateLevel
    )
  ) {
    return null;
  }

  const { addPageUrl } = config;
  const { href, as } =
    typeof addPageUrl === "function" ? addPageUrl() : addPageUrl;

  // Обработка перехода на страницу создания элемента
  const onClick = () => {
    return router.push(href, as);
  };

  return (
    <Tooltip title={t(`entity-list.components.actions.add-tooltip`) as string}>
      <Button
        variant={"outlined"}
        onClick={onClick}
        disabled={disabled}
        data-testid="createCampaignButton"
      >
        {t(buttonTitle || `entity-list.components.actions.add`)}
      </Button>
    </Tooltip>
  );
};

// Экспортируем компонент
export default withPageProps(ListPageCreationButton);
