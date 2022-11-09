// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import React, { ReactNode } from "react";
import LoadingBlocker from "../../../../LoadingBlocker";

const RootStyle = styled(Box)<{ loading?: boolean }>(({ loading }) => ({
  position: 'relative',
  width: "100%",
  ['& .blur-on-loading-content']: {
    transition: 'filter 500ms ease',
    willChange: 'filter',
    ...(loading
      ? {
        filter: 'blur(7px)',
      }
      : {}),
  },
}));

// ----------------------------------------------------------------------
type Props = {
  isInitialized: boolean
  children: ReactNode
}

export default function LoadingBlurEffect({ isInitialized, children }: Props) {

  return (

    <RootStyle loading={isInitialized}>
      {
        isInitialized && <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
              <LoadingBlocker/>
          </div>
      }
      <div className={'blur-on-loading-content'}>
        {children}
      </div>
    </RootStyle>
  );
}
