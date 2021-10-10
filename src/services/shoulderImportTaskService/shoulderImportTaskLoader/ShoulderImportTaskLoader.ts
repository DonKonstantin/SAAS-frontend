import {ShoulderImportTaskLoaderInterface} from "./interface";
import {ShoulderDTO, ShoulderDTOLoaderInterface} from "./shoulderDTOLoader/interface";
import {Unsubscribable} from "rxjs";
import {Shoulder} from "../shoulderTypes";
import {ShoulderStepLoaderInterface} from "./shoulderStepLoader/interface";
import {ShoulderOfferLoaderInterface} from "./shoulderOfferLoader/interface";
import {WithProcessingStatus} from "../baseTypes";

/**
 * Сервис загрузки данных плеч
 */
export class ShoulderImportTaskLoader implements ShoulderImportTaskLoaderInterface {
    private readonly shoulderDTOLoader: ShoulderDTOLoaderInterface;
    private readonly shoulderStepLoader: ShoulderStepLoaderInterface;
    private readonly shoulderOfferLoader: ShoulderOfferLoaderInterface;

    /**
     * Конструктор сервиса
     * @param shoulderDTOLoader
     * @param shoulderStepLoader
     * @param shoulderOfferLoader
     */
    constructor(
        shoulderDTOLoader: ShoulderDTOLoaderInterface,
        shoulderStepLoader: ShoulderStepLoaderInterface,
        shoulderOfferLoader: ShoulderOfferLoaderInterface,
    ) {
        this.shoulderDTOLoader = shoulderDTOLoader;
        this.shoulderStepLoader = shoulderStepLoader;
        this.shoulderOfferLoader = shoulderOfferLoader;
    }

    /**
     * Загрузка списка плеч
     * @param taskId
     */
    async LoadTaskShoulders(taskId: string): Promise<WithProcessingStatus<Shoulder>[]> {
        const shouldersDto = await this.shoulderDTOLoader.Load(taskId);

        const stepIds: string[] = [];
        const shoulderIds: string[] = [];

        for (let shoulder of shouldersDto) {
            stepIds.push(...shoulder.shoulder_steps);
            shoulderIds.push(shoulder.import_id);
        }

        const [steps, offers] = await Promise.all([
            this.shoulderStepLoader.Load(stepIds),
            this.shoulderOfferLoader.Load(shoulderIds),
        ]);

        return shouldersDto.map(dto => {
            const filteredSteps = steps.filter(s => dto.shoulder_steps.indexOf(s.import_id) !== -1);
            const filteredOffers = offers.filter(o => o.shoulder_id === dto.import_id);

            return {
                ...dto,
                shoulder_steps: filteredSteps,
                offers: filteredOffers,
            }
        })
    }

    /**
     * Подписка на изменения плеч
     * Возвращает подписчика в результатах вывода для возможности отписки.
     * @param callback
     */
    SubscribeToShoulders(callback: {(shoulder: WithProcessingStatus<ShoulderDTO>): void}): Unsubscribable {
        return this.shoulderDTOLoader.Subscribe(callback);
    }
}