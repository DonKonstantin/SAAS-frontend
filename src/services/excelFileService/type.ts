
/*************************************************************************************************
 * Команды, принимаемые от WS сервера
 *************************************************************************************************/

// Измененные данные ячейки
export type FileCellDataModified = {
    file: number
    row: number
    col: number
    data: string
};

// Данные Excel файла
export type FileData = {
    id: number
    name: string
    company_id: string
    data: string[][]
    created_at: string
    last_modified: string
}

// Данные редактора файла
export type Editor = {
    id: string
    name: string
    token: string
};

// Текущая позиция редактора
export type EditorPosition = {
    editor_id: string
    row: number
    col: number
};

// Загруженные данные по запрошенному файлу
export type LoadFileData = {
    fileData: FileData,
    editors: Editor[],
    editorsPosition: EditorPosition[]
};

// Уведомление об изменении позиции пользователя на документе
// Не отсылается инициатору, т.к. инициатор и так знает о своих перемещениях!
export type UserChangePosition = {
    file: number
    position: EditorPosition
};

// Команда WS для нотификации пользователя о том, что к системе подключился
// другой редактор.
//
// Отправляет пользователю информацию о том, кто конкретно подключился, а также
// текущую позицию подключившегося.
export type UserJoinToEditFile = {
    file: number
    editor: Editor
    position: EditorPosition
};

// Доступные для приема типы сообщений
export type AvailableMessages = {
    FileCellDataModified: FileCellDataModified
    LoadFileData: LoadFileData
    UserChangePosition: UserChangePosition
    UserJoinToEditFile: UserJoinToEditFile
};

// Сущность данных команды, отправляемой по WS
export type WsCommand<T extends keyof AvailableMessages> = {
    type: T                    // Тип команды
    data: AvailableMessages[T] // Реальные данные команды
}

// Сообщение от сервера WS
export type WsMessage = {
    type: "Error" | "Warning" | "Success"  // Тип сообщения: Error, Warning, Success
    data: WsCommand<any> | null            // Данные, отправленные пользователю
    error: string                          // Ошибка, полученная от сервера
    code: number                           // Код ответа
}

/*************************************************************************************************
 * Команды, отправляемые на WS сервер работы с файлами
 *************************************************************************************************/

// Команда подключения пользователя к файлу.
//
// Используется для подключения пользователя по WS. При подключении проверяет
// права пользователя на выполнение редактирования файлов.
//
// Обработка:
// 1. Загружает данные файла и отправляет их по WS пользователю.
// 2. Команду загрузки данных редакторов файла для пользователя
// 3. Сохраняет пользователя, как редактора для запрошенного файла
export type ConnectUserToFileCommand = {
    file: number   // ID файла, к которому требуется подключение
    editor: Editor // Редактор, который подключается к системе
}

// Команда обновления положения пользователя на документе (Текущей ячейки).
// Под капотом используется проверка прав пользователя.
//
// Команда проводит валидацию запроса пользователя, а также отправляет, если
// запрос валиден, отправляет в шину команду установки позиции пользователя.
//
// Команда установки выполняет следующие действия:
// 1. Регистрирует новое положение пользователя на документе
// 2. Отправляет уведомление другим редакторам документа о том, что пользователь поменял положение (ячейку).
export type UpdateUserPositionInFileCommand = {
    file: number             // Файл, для которого изменилось положение
    position: EditorPosition // Новое положение курсора пользователя
}

// Команда обновления ячейки в файле.
// При вызове проверяется доступ пользователя.
//
// Команда выполняет следующие действия:
// 1. Создает CQRS событие изменения для файла
// 2. Отправляет уведомления об изменении файла всем участникам редактирования, за исключением
//    инициатора.
//
// Команда запускает асинхронную отправку нотификаций при помощи шины событий
export type UpdateFileDataCommand = {
    file: number // Файл для изменения
    row: number  // Строка, в которой необходимо изменить ячейку
    col: number  // Колонка, в которой необходимо изменить ячейку
    data: string // Данные, которые необходимо записать в ячейку
}

// Команды, доступные для отправки на WS сервер
export type AvailableCommands = {
    ConnectUserToFileCommand: ConnectUserToFileCommand
    UpdateUserPositionInFileCommand: UpdateUserPositionInFileCommand
    UpdateFileDataCommand: UpdateFileDataCommand
};

// Базовая команда, доступная для отправки на WS сервер
export type CommandBaseData<T extends keyof AvailableCommands> = {
    command: T                       // Тип команды
    parameters: AvailableCommands[T] // Параметры команды
}
