import NotificationService from "./NotificationService";
import {NotificationServiceInterface} from "./interface";

const NotificationServiceFactory = (): NotificationServiceInterface => new NotificationService;

export default NotificationServiceFactory;
