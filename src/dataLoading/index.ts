import {dataLoader} from "./dataLoader";
import {LoadingCallback} from "./dataLoader/interface";

/**
 * HOC для загрузки данных на стороне сервера
 *
 * Под капотом использует сервис загрузки данных, а так же загружает данные из
 * переданного сверху callback. После загрузки происходит объединение данных
 * и возврат итогового результата. Если какой либо из загрузчиков (включая пере-
 * данный) возвращает REDIRECT или NOT_FOUND, то HOC возвращает его.
 *
 * @param baseLoading
 */
function withDataLoading<P extends { [key: string]: any } = { [key: string]: any }>(
    baseLoading: LoadingCallback
): LoadingCallback {
    return async baseParameters => {
        return (await Promise
            .all([
                dataLoader().LoadData(baseParameters),
                baseLoading(baseParameters),
            ]))
            .reduce((previousValue, currentValue) => ({
                ...previousValue,
                ...currentValue,
            })) as P
    }
}

// Экспортируем HOC
export default withDataLoading