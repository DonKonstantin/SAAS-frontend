import {ConvertationResult, ConvertationResponse, FileConvertationServiceInterface, Status} from "./interfaces";
import axios, {AxiosRequestConfig} from "axios";
import {interval, Subject} from "rxjs";
import {throttle} from "rxjs/operators";

/**
 * Сервис конвертации файлов
 */
export class FileConvertationService implements FileConvertationServiceInterface {
    private readonly csvConvertationEndpoint: string;
    private readonly xlsxConvertationEndpoint: string;

    /**
     * Конструктор сервиса
     * @param csvConvertationEndpoint
     * @param xlsxConvertationEndpoint
     */
    constructor(csvConvertationEndpoint: string, xlsxConvertationEndpoint: string) {
        this.csvConvertationEndpoint = csvConvertationEndpoint;
        this.xlsxConvertationEndpoint = xlsxConvertationEndpoint;
    }

    /**
     * Конвертация переданных CSV файлов в типизированный ответ
     * @param files
     */
    ConvertCsvFiles(files: File[]): ConvertationResult {
        const { csvConvertationEndpoint } = this;
        const subject = new Subject<Status>();

        const convert = async () => {
            const requestConfig: AxiosRequestConfig = this.generateAxiosConfig(subject);

            let data = new FormData();
            files.map(file => {
                data.append('files', file);
            });

            try {
                const result = await axios.post<ConvertationResponse>(csvConvertationEndpoint, data, requestConfig);
                subject.complete();

                return result.data;
            } catch (e) {
                subject.error(e);

                return
            }
        };

        return {
            status: subject,
            convert,
        }
    }

    /**
     * Конвертация переданного XLSX файла в JSON
     * @param file
     */
    ConvertXlsxFile(file: File): ConvertationResult {
        const { xlsxConvertationEndpoint } = this;
        const subject = new Subject<Status>();

        const convert = async () => {
            const requestConfig: AxiosRequestConfig = this.generateAxiosConfig(subject);

            let data = new FormData();
            data.append('file', file);

            try {
                const result = await axios.post<ConvertationResponse>(xlsxConvertationEndpoint, data, requestConfig);
                subject.complete();

                return result.data;
            } catch (e) {
                subject.error(e);

                return
            }
        };

        return {
            status: subject.pipe(throttle(() => interval(100))),
            convert,
        }
    }

    /**
     * Генерация конфигурации для клиента Axios
     * @param subject
     */
    private generateAxiosConfig(subject: Subject<Status>): AxiosRequestConfig {
        return {
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (percentCompleted === 100) {
                    subject.next({
                        progress: 100,
                        statusType: "waiting",
                    });

                    return
                }

                subject.next({
                    progress: percentCompleted,
                    statusType: "uploading",
                } as Status);
            },
            onDownloadProgress: progressEvent => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                subject.next({
                    progress: percentCompleted,
                    statusType: "loading",
                } as Status);
            }
        };
    }
}