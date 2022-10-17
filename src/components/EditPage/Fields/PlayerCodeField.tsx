import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import React, {
  FC,
  memo,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  switchMap,
} from "rxjs";
import { playerCodeService } from "services/playerCodeService";
import { EditFieldProperties } from "settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Поле кода плеера с возможностью рандомного создания и проверкой на уникальность
 * @param props
 * @returns
 */
const PlayerCodeField: FC<EditFieldProperties> = (props) => {
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

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isFree, setIsFree] = useState<boolean>(false);

  if (!fieldData) {
    return null;
  }

  const {
    t,
    value,
    values,
    validation,
    fieldConfig: {
      title,
      isVisible = () => true,
      startIcon: IconComponent,
      validation: validators = [],
    },
    onChangeFieldValue,
  } = fieldData;

  const onRandomeClick = async () => {
    setIsChecking(true);

    setIsFree(false);

    let result = "";

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    while (true) {
      result = "";

      for (var i = 0; i < 10; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      try {
        const checkResult = await playerCodeService().checkPlayerCode(result);

        if (!checkResult) {
          break;
        }
      } catch (e) {
        setIsChecking(false);

        return;
      }
    }

    setIsFree(true);

    setIsChecking(false);

    onChangeFieldValue(() => result);
  };

  const onChangeCodeHandler = (value: string) => {
    setIsFree(false);

    onChangeFieldValue(() => value);
  };

  useEffect(() => {
    const listener = fromEvent(inputRef.current!, "input")
      .pipe(
        map(({ target }) => (target as HTMLInputElement).value),
        debounceTime(500),
        filter((searchParam) => searchParam.length > 3),
        distinctUntilChanged(),
        switchMap(async (code) => {
          try {
            return await playerCodeService().checkPlayerCode(code);
          } catch (e) {
            return false;
          }
        })
      )
      .subscribe((response) => setIsFree(!response));

    return () => listener.unsubscribe();
  }, []);

  if (!isVisible(values)) {
    return null;
  }

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" sx={{ width: "50%" }}>
        <TextField
          ref={inputRef}
          label={t(title)}
          variant="standard"
          value={`${value}`}
          error={!!validation}
          helperText={validation ? t(validation) : undefined}
          fullWidth
          required={validators.length > 0}
          placeholder={t(`entity-edit.fields.input.placeholder`) as string}
          onChange={(event) => {
            event.preventDefault();
            event.stopPropagation();

            onChangeCodeHandler(event.target.value);
          }}
          InputProps={{
            startAdornment: IconComponent ? (
              <InputAdornment position="start">
                <IconComponent />
              </InputAdornment>
            ) : undefined,
          }}
        />
      </Stack>
      <Stack direction="row" sx={{ width: "50%", pb: 1 }}>
        <Box sx={{ width: 46, pl: 1, pt: 1 }}>
          {isFree ? (
            <Tooltip
              placement="top"
              title={t(`player-codes.tooltip.checkCode.success`) as string}
            >
              <CheckIcon color="primary" />
            </Tooltip>
          ) : (
            <Tooltip
              placement="top"
              title={t(`player-codes.tooltip.checkCode.error`) as string}
            >
              <CloseIcon color="error" />
            </Tooltip>
          )}
        </Box>
        <Button
          onClick={onRandomeClick}
          variant="outlined"
          sx={{ whiteSpace: "nowrap", height: 39 }}
          disabled={isChecking}
        >
          {t("player-codes.button.create-random-code")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(PlayerCodeField);
