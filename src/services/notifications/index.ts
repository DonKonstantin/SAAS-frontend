import {Dispatcher} from "./Dispatcher";
import {EnqueueSnackbar, SnackbarChannel} from "./channels/SnackbarChannel";
import {NotificationsDispatcher} from "./NotificationsDispatcher";

let registeredEnqueueSnackbar: EnqueueSnackbar;

export type DispatcherFactory = {(): NotificationsDispatcher}
export const notificationsDispatcher: DispatcherFactory = () => {
    return new Dispatcher(
        new SnackbarChannel(registeredEnqueueSnackbar),
    );
};

// Регистратор функции обратного вызова для Snackbar
export function registerEnqueueSnackbar(enqueueSnackbar: EnqueueSnackbar): void {
    registeredEnqueueSnackbar = enqueueSnackbar;
}
