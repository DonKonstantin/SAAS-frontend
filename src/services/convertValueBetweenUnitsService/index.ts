import {_ConvertValueBetweenUnitsProcessorInterface, ConvertValueBetweenUnitsServiceInterface} from "./interfaces";
import {WeightToVolumeConverter} from "./WeightToVolumeConverter";
import {UnitGroupData} from "../searchLoaders/unitGroupsLoader/UnitGroupLoaderQuery";
import {WeightToAreaConverter} from "./WeightToAreaConverter";
import {WeightToPalletConverter} from "./WeightToPalletConverter";
import {VolumeToWeightConverter} from "./VolumeToWeightConverter";
import {VolumeToAreaConverter} from "./VolumeToAreaConverter";
import {VolumeToPalletConverter} from "./VolumeToPalletConverter";
import {AreaToWeightConverter} from "./AreaToWeightConverter";
import {AreaToVolumeConverter} from "./AreaToVolumeConverter";
import {AreaToPalletConverter} from "./AreaToPalletConverter";
import {PalletToWeightConverter} from "./PalletToWeightConverter";
import {PalletToVolumeConverter} from "./PalletToVolumeConverter";
import {PalletToAreaConverter} from "./PalletToAreaConverter";
import {ConvertValueBetweenUnitsService} from "./ConvertValueBetweenUnitsService";
import {WeightToContainerConverter} from "./WeightToContainerConverter";
import {ContainerToWeightConverter} from "./ContainerToWeightConverter";
import {WeightToWeightContainerConverter} from "./WeightToWeightContainerConverter";
import {ContainerToWeightContainerConverter} from "./ContainerToWeightContainerConverter";

// Фабрика процессоров для обработки
const processors: {(unitGroups: UnitGroupData[]): _ConvertValueBetweenUnitsProcessorInterface[]} = (unitGroups: UnitGroupData[]) => ([
    new WeightToVolumeConverter(unitGroups),
    new WeightToAreaConverter(unitGroups),
    new WeightToPalletConverter(unitGroups),
    new WeightToContainerConverter(unitGroups),
    new WeightToWeightContainerConverter(unitGroups),
    new VolumeToWeightConverter(unitGroups),
    new VolumeToAreaConverter(unitGroups),
    new VolumeToPalletConverter(unitGroups),
    new AreaToWeightConverter(unitGroups),
    new AreaToVolumeConverter(unitGroups),
    new AreaToPalletConverter(unitGroups),
    new PalletToWeightConverter(unitGroups),
    new PalletToVolumeConverter(unitGroups),
    new PalletToAreaConverter(unitGroups),
    new ContainerToWeightConverter(unitGroups),
    new ContainerToWeightContainerConverter(unitGroups),
]);

/**
 * Фабрика сервиса
 * @param unitGroups
 */
export const convertValueBetweenUnitsService: {(unitGroups: UnitGroupData[]): ConvertValueBetweenUnitsServiceInterface} = unitGroups => {
    return new ConvertValueBetweenUnitsService(processors(unitGroups))
};