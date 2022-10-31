import { useEffect, useState } from "react";
import { OperatorFunction } from "rxjs";
import { campaignEditActions, campaignPlaylistEditContext$ } from ".";
import { CampaignPlaylistEditContextCommonType, CampaignPlaylistEditContextTypes } from "./interface";

/**
 * хук жоступа к контексту редактирования плэйлиста кампании
 * @param pipeModificators
 * @returns 
 */
 export const useCampaignPlaylistEditContext = (
  ...pipeModificators: OperatorFunction<CampaignPlaylistEditContextTypes, any>[]
): CampaignPlaylistEditContextCommonType => {
  const [contextData, setContextData] = useState<CampaignPlaylistEditContextTypes>(
    campaignPlaylistEditContext$.getValue()
  );

  useEffect(() => {
    const subscription = campaignPlaylistEditContext$
      //@ts-ignore
      .pipe(...pipeModificators)
      .subscribe({
        next: data => setContextData(data),
      });

    return () => subscription.unsubscribe();
  });

  return {
    ...campaignEditActions,
    ...contextData,
  };
};