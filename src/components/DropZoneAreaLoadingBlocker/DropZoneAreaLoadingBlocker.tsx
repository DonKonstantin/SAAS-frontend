import { Box } from "@mui/material";
import { styled } from "@mui/system";
import LoadingBlocker from "../LoadingBlocker";
import React, { FC, PropsWithChildren, memo } from "react";

interface Props {
  isBlocked: boolean;
};

const StyledBlockerWrapper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
});

const StyledLoaderClickblocker = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.grey[0],
  opacity: 0.5,
}));

const StyledLoaderWrapper = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  opacity: '1 !important',
});

/**
 * Компонент блокировщика при загрузке для дропдаун компонента
 * @param param0
 * @returns
 */
const DropZoneAreaLoadingBlocker: FC<PropsWithChildren<Props>> = ({ children, isBlocked }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {isBlocked && (
        <StyledBlockerWrapper>
          <StyledLoaderClickblocker />

          <StyledLoaderWrapper>
            <LoadingBlocker/>
          </StyledLoaderWrapper>
        </StyledBlockerWrapper>
      )}

      {children}
    </Box>
  );
};

export default memo(DropZoneAreaLoadingBlocker);
