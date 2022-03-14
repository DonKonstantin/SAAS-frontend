import {SystemLogsServiceInterface} from "./interface";
import SystemLogsService from "./SystemLogsService";
import {graphQLClient} from "../graphQLClient";

// Фабрика сервиса по работе с логами системы
const systemLogsService: {(): SystemLogsServiceInterface} = () => {
    return new SystemLogsService(graphQLClient());
}

export default systemLogsService();
