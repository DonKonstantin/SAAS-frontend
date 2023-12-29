import React, { FC, memo, useState } from "react";
import { distinctUntilChanged } from "rxjs";
import { EditFieldProperties } from "settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ProjectChannel } from "services/playerCodeService/interfaces";

/**
 * Компонент мультиселпктора каналов
 * @param props
 * @returns
 */
const ChanelsMultiselector: FC<EditFieldProperties> = (props) => {
  const { fieldCode } = props;

  const [selectedAll, setSelectedAll] = useState(false);

  const fieldData = useEntityEditField(
    fieldCode,
    distinctUntilChanged((previous, current) => {
      return (
        previous?.entityData?.values[fieldCode] ===
        current?.entityData?.values[fieldCode] &&
        previous?.validation[fieldCode] === current?.validation[fieldCode]
      );
    })
  );

  if (!fieldData) {
    return null;
  }

  const {
    t,
    value,
    values,
    validation,
    fieldConfig: { isVisible = () => true },
    onChangeFieldValue,
    additionData,
  } = fieldData;

  const defaultValue = (value as string[]).map(item => {
    const existsChannel = additionData.project_channels.find(channel => channel.id === item);

    if (!existsChannel) {
      return {
        id: item,
        name: `id: ${item}`,
      };
    }

    return existsChannel;
  });

  const [currentValue, setCurrentValue] = useState<any>(defaultValue);

  let allOption = { value: 'All', name: t("player-codes.add.channel-selector.select-all") };

  const channels = additionData.project_channels;

  const handleChange = (_, values) => {
    const value = values.map(item => item.id ? item.id : item.value);

    //@ts-ignore
    if (!selectedAll && value.find((val) => val === "All")) {
      setSelectedAll(true);
      setCurrentValue([allOption]);
      onChangeFieldValue(() =>
        value.length - 1 === channels.length
          ? []
          : channels.map((channel) => channel.id)
      );

      return;
    }

    if (selectedAll && !value.includes('All')) {
      setSelectedAll(false);
      setCurrentValue([]);
      return;
    }

    if (selectedAll) {
      setSelectedAll(false);
    }

    setCurrentValue(values.filter(item => !item.value || item.value !== 'All'));

    onChangeFieldValue(() =>
      typeof value === "string" ? value.split(",") : value
    );
  };

  if (!isVisible(values)) {
    return null;
  }

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const options = [allOption, ...channels];

  return (
    <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
      <Autocomplete
        multiple
        fullWidth
        noOptionsText={t("player-codes.add.channel-selector.no-channels")}
        value={currentValue}
        disabled={channels.length === 0}
        onChange={handleChange}
        renderTags={(value: readonly ProjectChannel[]) => value.map((option: ProjectChannel) => option.name).join(", ")}
        id="tags-outlined"
        options={options}
        getOptionLabel={(option) => option.name}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="standard"
            error={!!validation}
          />
        )}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selectedAll || selected}
            />
            {option.name}
          </li>
        )}
      />
    </Box>
  );
};

export default memo(ChanelsMultiselector);
