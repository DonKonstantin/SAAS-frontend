import {
    BehaviorSubject,
    catchError,
    combineLatestWith,
    debounceTime,
    distinctUntilChanged,
    from,
    map,
    Observable,
    OperatorFunction,
    Subject,
    switchMap,
    tap,
    withLatestFrom
} from "rxjs";
import NotificationServiceFactory from "../../../services/NotificationService";
import {FC, useEffect, useState} from "react";
import {NotificationChannel} from "../../../services/NotificationService/interface";
import {notificationsDispatcher} from "../../../services/notifications";
import i18n from "../../../i18n";

const DEBOUNCE_TIMEOUT = 3000;

const isUpdatePreview$ = new BehaviorSubject(false);
const template$ = new BehaviorSubject<string>("");
const templateVariables$ = new BehaviorSubject<{}>({});
const renderError$ = new BehaviorSubject<boolean>(false);

// Параметры для тестовой отправки
type SendParams = {
    templateId: number
    channel: NotificationChannel
}

const send$ = new Subject<SendParams>();
const successSend$ = new Subject<boolean>(); // Шина для оповещения об успешной отправки сообщения
export const sendInProgress$ = new BehaviorSubject<boolean>(false)

// Хранимые данные по шаблонам
type PreviewContext = {
    renderResult: string,
    variables: {},
    errorRender: boolean,
    isUpdateRender: boolean
    isSendProgress: boolean
}

const defaultContext$ = new BehaviorSubject<PreviewContext>({
    renderResult: "",
    variables: {},
    errorRender: false,
    isUpdateRender: true,
    isSendProgress: false,
});

const setTemplateString: ContextActions["setTemplateString"] = (value: string) => {
    template$.next(value)
};

const setTemplateVariables: ContextActions["setTemplateVariables"] = (value: {}) => {
    templateVariables$.next(value)
};

const sendNotification: ContextActions["sendNotification"] = (templateId: number, channel) => {
    send$.next(
        {
            templateId,
            channel
        }
    );
};

/**
 * Поток обработки данных и получение рендера
 */
const renderStream$: Observable<string> = template$.pipe(
    distinctUntilChanged(),
    tap(() => isUpdatePreview$.next(true)),
    tap(() => renderError$.next(false)),
    combineLatestWith(
        templateVariables$.pipe(
            distinctUntilChanged(),
            tap(() => isUpdatePreview$.next(true)),
        )
    ),
    map(
        ([template, variables]) => {
            return {
                template,
                variables
            }
        }
    ),
    debounceTime(DEBOUNCE_TIMEOUT),
    switchMap(
        async ({template, variables}) => await NotificationServiceFactory()
            .render(template, variables)
    ),
    tap(() => isUpdatePreview$.next(false)),
    catchError(() => {
        renderError$.next(true);
        return from("");
    })
)

/**
 * Создаем наблюдателя для сбора всех обновляемых из вне данных
 */
const previewNotificationContext$ = isUpdatePreview$.pipe(
    distinctUntilChanged(),
    combineLatestWith(

        templateVariables$.pipe(
            distinctUntilChanged()
        ),
        sendInProgress$.pipe(
            distinctUntilChanged()
        )
    ),
    map(
        ([isUpdateRender, variables, isSendProgress]) => {
            defaultContext$.next({
                ...defaultContext$.getValue(),
                isUpdateRender,
                variables,
                isSendProgress
            })
        }
    )
)

/**
 * Стрим на тестовую отправку сообщения
 */
const sendStream$ = send$.pipe(
    distinctUntilChanged(),
    withLatestFrom(templateVariables$),
    map(([{templateId, channel}, variables]) => {
        return {
            templateId,
            channel,
            variables
        }
    }),
    tap(() => sendInProgress$.next(true)),
    switchMap(
        async ({
                   templateId,
                   variables,
                   channel
               }) => await NotificationServiceFactory().send(templateId, variables, channel)
    ),
    tap((result) => result && successSend$.next(true)),
    tap(() => sendInProgress$.next(false)),
    tap(() => {
        successSend$.next(true);
        notificationsDispatcher().dispatch({
            type: "success",
            message: i18n.t("pages.notifications_template.edit.dialog.testSend.message.success")
        })
    }),
);

/**
 * Инициализация работы с предпросмотром оповещений
 * @param template
 * @param variables
 */
export const InitPreviewTemplateStream: ContextActions["InitPreviewTemplateStream"] = (
    template: string, variables: {}
) => {

    const subscriber = renderStream$.subscribe({
        next: renderResult =>  {
            defaultContext$.next({
                ...defaultContext$.getValue(),
              renderResult
            })
        }
    });

    subscriber.add(previewNotificationContext$.subscribe());
    subscriber.add(sendStream$.subscribe());

    setTemplateString(template);
    setTemplateVariables(variables);

    return () => subscriber.unsubscribe();
}

type ContextActions = {
    setTemplateVariables(value: {}): void
    setTemplateString(value: string): void
    InitPreviewTemplateStream(template: string, variables: {}): () => void
    sendNotification(templateId: number, channel: NotificationChannel): void
}

const actions: ContextActions = {
    setTemplateVariables,
    setTemplateString,
    InitPreviewTemplateStream,
    sendNotification
}

type PreviewContextTypes = ContextActions
    & PreviewContext

/**
 * хук для доступа к контексту
 * @param pipeLineModifications
 */
export const usePreviewTemplateNotification = (
    ...pipeLineModifications: OperatorFunction<PreviewContext, PreviewContext>[]
): PreviewContextTypes => {
    const [contextData, setContextData] = useState<PreviewContext>(
        defaultContext$.getValue()
    );

    useEffect(() => {
        const subscribtion = defaultContext$
            //@ts-ignore
            .pipe(...pipeLineModifications)
            .subscribe({
                next: (data) => setContextData(data),
            });

        return () => subscribtion.unsubscribe();
    });

    return {
        ...actions,
        ...contextData,
    };
};

const InitializerPreviewNotification: FC = () => {
    useEffect(() => InitPreviewTemplateStream("", {}), [])

    return null;
}

export {
    InitializerPreviewNotification
}
