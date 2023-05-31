import React, { FC } from "react";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import CheckBoxCell from "components/ListPageParts/List/CheckBoxCell";
import PlayAudioButton from "components/AudioPlayeContainer/PlayAudioButton";
import { withPageProps } from "layouts/PagePropsProvider";
import CheckPermission from "services/helpers/CheckPermission";
import { useAuthorization } from "context/AuthorizationContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useEntityEdit } from "context/EntityEditContext";
import { distinctUntilChanged, distinctUntilKeyChanged } from "rxjs";
import { PageWithEntityList } from "components/ListPage/types";

interface Props {
  row: ProjectPlayListFile;
  selected: any[];
  setSelected: (values: any[]) => void;
}

/**
 * Копонент строки для листинга файлов
 * @param props 
 * @returns 
 */
const ListRow: FC<PageWithEntityList & Props> = (props) => {
  const {
    row,
    selected,
    setSelected,
    permissionCheckEditPermission,
    permissionCheckDeletePermission = permissionCheckEditPermission,
    permissionCheckLevel = "project",
    permissionCheckEditLevel = permissionCheckLevel,
    permissionCheckDeleteLevel = permissionCheckEditLevel,
  } = props;

  const { userInfo } = useAuthorization(distinctUntilKeyChanged('userInfo'));

  const { onChangeAdditionData } = useEntityEdit(distinctUntilChanged(() => true));

  const { t } = useTranslation();

  if (!userInfo) {
    return <TableCell className="list-table-cell" />;
  }

  const file = row.file;

  const notHasDeleteAccess =
    permissionCheckDeletePermission &&
    !CheckPermission(
      userInfo,
      permissionCheckDeletePermission,
      permissionCheckDeleteLevel,
    );

  const onToggleItemCheckedState = () => {
    if (selected.includes(row.id)) {
      setSelected(selected.filter((i) => i !== row.id));

      return;
    }

    setSelected([...selected, row.id]);
  };

  const onDelete = () => {
    onChangeAdditionData(data => ({
      ...data,
      id: {
        files: [...data.id.files.filter(item => item.id !== row.id)]
      }
    }));
  };

  return (
    <TableRow>
      <CheckBoxCell
        checked={selected.includes(row.id)}
        onClick={onToggleItemCheckedState}
      />
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {file.title}
      </TableCell>
      <TableCell className="list-table-cell">
        <PlayAudioButton
          fileName={file.file_name}
          songName={file.title}
          isProject={false}
        />
      </TableCell>
      <TableCell className="list-table-cell"></TableCell>
      <TableCell
        className="list-table-cell"
        align="right"
        sx={{ pt: 0, pb: 0 }}
      >
        {!notHasDeleteAccess && (
          <Tooltip
            title={t(`entity-list.components.actions.delete-tooltip`) as string}
          >
            <IconButton size="small" onClick={onDelete}>
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};

export default withPageProps<Props>(ListRow);
