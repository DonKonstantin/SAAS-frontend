import {ShoulderImportIdFillServiceInterface, Response} from "./interface";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Subject} from "rxjs";
import {ShoulderIdSearchServiceInterface} from "./shoulderIdSearchService/interface";
import {ShoulderOfferIdFillServiceInterface} from "./shoulderOfferIdFillService/interface";

/**
 * Сервис заполнения идентификаторов для переданного списка плеч
 */
export class ShoulderImportIdFillService implements ShoulderImportIdFillServiceInterface {

    private readonly shoulderIdSearchService: ShoulderIdSearchServiceInterface;
    private readonly shoulderOfferIdFillService: ShoulderOfferIdFillServiceInterface;

    /**
     * Конструктор сервиса
     * @param shoulderIdSearchService
     * @param shoulderOfferIdFillService
     */
    constructor(
        shoulderIdSearchService: ShoulderIdSearchServiceInterface,
        shoulderOfferIdFillService: ShoulderOfferIdFillServiceInterface,
    ) {
        this.shoulderIdSearchService = shoulderIdSearchService;
        this.shoulderOfferIdFillService = shoulderOfferIdFillService;
    }

    /**
     * Заполнение идентификаторов для переданного списка плеч
     * @param shoulders
     */
    fill(shoulders: Values<Shoulder>[]): Response {
        const subject$ = new Subject<{ status: number }>();
        return {
            fill: async (): Promise<Values<Shoulder>[]> => {
                const result: Values<Shoulder>[] = [];

                let i = 0;
                for (let shoulder of shoulders) {
                    const resultShoulder = {...shoulder};
                    const id = await this.shoulderIdSearchService.searchShoulder(shoulder);

                    resultShoulder.id.value = id;
                    if (!!id) {
                        resultShoulder.offers.value = await this.shoulderOfferIdFillService.fillIds(
                            id, resultShoulder.offers.value
                        )
                    }

                    result.push(resultShoulder);

                    subject$.next({
                        status: Math.round(i / shoulders.length)
                    });

                    i++;
                }

                subject$.complete();
                return result;
            },
            status: subject$,
        }
    }
}