import React, { FC, memo } from "react";
import { distinctUntilChanged } from "rxjs";
import { EditFieldProperties } from "settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";
import { ProjectChannel } from "services/playerCodeService/interfaces";

/**
 * Компонент мультиселпктора каналов
 * @param props
 * @returns
 */
const ChanelsMultiselector: FC<EditFieldProperties> = (props) => {
  const { fieldCode } = props;

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

  const currentValue: string[] = value as string[];

  const channels = additionData.project_channels;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    //@ts-ignore
    if (value.some((val) => val === "All")) {
      onChangeFieldValue(() =>
        value.length - 1 === channels.length
          ? []
          : channels.map((channel) => channel.id)
      );

      return;
    }

    onChangeFieldValue(() =>
      typeof value === "string" ? value.split(",") : value
    );
  };

  if (!isVisible(values)) {
    return null;
  }

  return (
    // <Autocomplete
    //   multiple
    //   variant="standard"
    //   value={currentValue}
    //   options={channels}
    //   onChange={handleChange}
    //   error={!!validation}
    //   renderValue={(selected) =>
    //     currentValue.length === channels.length
    //       ? t("player-codes.add.channel-selector.select-all")
    //       : selected
    //           .map(
    //             (value) =>
    //               channels.find((channel) => channel.id === value)?.name
    //           )
    //           .join(", ")
    //   }
    //   MenuProps={{
    //     PaperProps: {
    //       style: {
    //         maxHeight: 400,
    //         width: 250,
    //       },
    //     },
    //   }}
    //   sx={{
    //     width: "100%",
    //   }}
    // >
    //   {!channels.length && (
    //     <MenuItem value={""} disabled>
    //       <ListItemText
    //         primary={t("player-codes.add.channel-selector.no-channels")}
    //       />
    //     </MenuItem>
    //   )}
    //   {!!channels.length && (
    //     <MenuItem value={"All"}>
    //       <Checkbox checked={currentValue.length === channels.length} />
    //       <ListItemText
    //         primary={t("player-codes.add.channel-selector.select-all")}
    //       />
    //     </MenuItem>
    //   )}
    //   {channels.map((channel) => (
    //     <MenuItem key={channel.name} value={channel.id}>
    //       <Checkbox
    //         checked={!!currentValue.find((val) => val === channel.id)}
    //       />
    //       <ListItemText primary={channel.name} />
    //     </MenuItem>
    //   ))}
    // </Autocomplete>
    <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
    <Autocomplete
        multiple
        sx={{
          width: '100%',
        }}
        renderTags={(value: readonly ProjectChannel[], getTagProps) =>
          value.map((option: ProjectChannel) => option.name).join(",")
        }
        id="tags-outlined"
        options={channels}
        getOptionLabel={(option) => option.name}
        defaultValue={[]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label="filterSelectedOptions"
            placeholder="Favorites"
            variant="standard"
          />
        )}
      />
    </Box>
  );
};

export default memo(ChanelsMultiselector);
