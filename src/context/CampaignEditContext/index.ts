import { CampaignEditContextActionsTypes, CampaignEditContextTypes } from './interface';
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";
import { Campaign } from 'services/campaignListService/types';

class DefaultContextData implements CampaignEditContextTypes {
  campaign: Campaign | undefined = undefined;
};

export const campaignEditcontext$ = new BehaviorSubject<CampaignEditContextTypes>(new DefaultContextData());

const campaign$ = new BehaviorSubject<Campaign | undefined>(undefined);

const collectBus$: Observable<
Pick<
  CampaignEditContextTypes,
  'campaign'
>
> = combineLatest([
  campaign$,
]).pipe(
  map(
    ([
      campaign,
    ]) => ({
      campaign,
    })
  )
);

export const InitCampaignEditContext = () => {
  const subscriber = campaignEditcontext$.subscribe();

  subscriber.add(
    collectBus$.subscribe({
      next: (value) => {
        campaignEditcontext$.next({
          ...campaignEditcontext$.getValue(),
          ...value,
        });
      },
    })
  );

  return () => subscriber.unsubscribe();
};

const setCampaign: CampaignEditContextActionsTypes['setCampaign'] = campaign => {
  campaign$.next(campaign);
}

export const campaignEditActions: CampaignEditContextActionsTypes = {
  setCampaign,
};
