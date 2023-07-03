import React, { FC, memo, PropsWithChildren, useEffect } from 'react';
import { InitCampaignEditContext } from './index';

const CampaignEditContextConnector: FC<PropsWithChildren<{}>> = ({ children }) => {
  useEffect(() => InitCampaignEditContext(), []);

  return <>{children}</>;
};

export default memo(CampaignEditContextConnector);
