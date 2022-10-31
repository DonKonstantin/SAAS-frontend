import { useEffect, useState } from "react";
import { OperatorFunction } from "rxjs";
import { campaignEditActions, campaignEditcontext$ } from "./index";
import { CampaignEditContextCommonType, CampaignEditContextTypes } from "./interface";

/**
 * хук жоступа к контексту редактирования кампании
 * @param pipeModificators
 * @returns 
 */
 export const useCampaignEditContext = (
  ...pipeModificators: OperatorFunction<CampaignEditContextTypes, any>[]
): CampaignEditContextCommonType => {
  const [contextData, setContextData] = useState<CampaignEditContextTypes>(
    campaignEditcontext$.getValue()
  );

  useEffect(() => {
    const subscription = campaignEditcontext$
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