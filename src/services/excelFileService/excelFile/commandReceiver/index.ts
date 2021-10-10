import {CommandReceiverInterface} from "./interface";
import {CommandReceiver} from "./CommandReceiver";
import {FileCellDataModifiedProcessor} from "./FileCellDataModifiedProcessor";
import {LoadFileDataProcessor} from "./LoadFileDataProcessor";
import {UserChangePositionProcessor} from "./UserChangePositionProcessor";
import {UserJoinToEditFileProcessor} from "./UserJoinToEditFileProcessor";

// Фабрика сервиса
export const commandReceiver: {(): CommandReceiverInterface} = () => {
    return new CommandReceiver(
        new FileCellDataModifiedProcessor(),
        new LoadFileDataProcessor(),
        new UserChangePositionProcessor(),
        new UserJoinToEditFileProcessor(),
    )
};