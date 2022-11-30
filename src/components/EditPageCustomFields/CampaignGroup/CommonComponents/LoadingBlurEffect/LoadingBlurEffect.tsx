// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import React, { ReactNode } from "react";
import LoadingBlocker from "../../../../LoadingBlocker";

const RootStyle = styled(Box)<{ loading: number }>(({ loading }) => ({
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
  isLoading: boolean
  children: ReactNode
}

export default function LoadingBlurEffect({ isLoading, children }: Props) {

  return (

    <RootStyle loading={isLoading ? 1 : 0}>
      {
        isLoading && <div style={{
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
