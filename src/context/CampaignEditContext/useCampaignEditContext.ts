import { useEffect, useState } from "react";
import { OperatorFunction } from "rxjs";
import { campaignEditActions, campaignEditContext$ } from "./index";
import { CampaignEditContextCommonType, CampaignEditContextTypes } from "./interface";

/**
 * хук жоступа к контексту редактирования кампании
 * @param pipeModification
 * @returns 
 */
 export const useCampaignEditContext = (
  ...pipeModification: OperatorFunction<CampaignEditContextTypes, any>[]
): CampaignEditContextCommonType => {
  const [contextData, setContextData] = useState<CampaignEditContextTypes>(
    campaignEditContext$.getValue()
  );

  useEffect(() => {
    const subscription = campaignEditContext$
      //@ts-ignore
      .pipe(...pipeModification)
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