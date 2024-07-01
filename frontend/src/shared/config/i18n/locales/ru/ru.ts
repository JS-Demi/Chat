export const ru = {
    translation: {
        header: {
            chatName: 'Chat',
            logout: 'Выйти',
        },
        login: {
            header: 'Вход',
            login: 'Имя пользователя',
            password: 'Пароль',
            submit: 'Войти',
            errors: {
                required: 'Обязательное поле',
                wrongData: 'Неверные данные',
            },
            switcher: {
                header: 'Уже есть аккаунт?',
                body: 'Вводи свои данные и переходи к общению',
                btn: 'Войти',
            },
        },
        signup: {
            header: 'Регистрация',
            login: 'Имя пользователя',
            password: 'Пароль',
            confirmPassword: 'Повторите пароль',
            submit: 'Создать аккаунт',
            errors: {
                required: 'Обязательное поле',
                nickname: {
                    short: 'Слишком короткое',
                    long: 'Слишком длинное',
                },
                password: {
                    short: 'Слишком простой',
                    match: 'Не совпадают',
                },
                size: 'От 3 до 20 символов',
                min: 'Не менее 6 символов',
                alreadyExist: 'Имя занято',
            },
            switcher: {
                header: 'Ты у нас первый раз?',
                body: 'Скорее создавай аккаунт и вперед к новым знакомствам!',
                btn: 'Создать аккаунт',
            },
        },
        chat: {
            channels: {
                header: 'Chat',
                createChannel: 'Создать канал',
                manageChannel: 'Управление каналом',
                removeChannel: 'Удалить канал',
                renameChannel: 'Переименовать канал',
                actionRename: 'Переименовать',
                actionRemove: 'Удалить',
                actionCreate: 'Создать',
                messages: 'Сообщений',
                nav: {
                    profile: 'Профиль',
                    logout: 'Сменить аккаунт',
                    about: 'Контакты автора',
                },
            },
            messages: {
                count_one: '{{ count }} сообщение',
                count_few: '{{ count }} сообщения',
                count_many: '{{ count }} сообщений',
                count_zero: 'Нет сообщений',
                you: 'Вы',
            },
            footer: {
                label: 'Новое сообщение',
                placeholder: 'Сообщение...',
                sendMessage: 'Отправить',
            },
        },
        popUp: {
            actions: {
                cancel: 'Отменить',
                remove: 'Удалить',
                rename: 'Сохранить',
                create: 'Создать',
            },
            confirmRemove: 'Уверены что хотите удалить канал?',
            label: 'Имя канала',
            placeholder: 'Имя канала...',
            errors: {
                required: 'Не может быть пустым',
                short: 'Слишком короткое',
                long: 'Слишком длинное',
                match: 'Уже существует',
            },
        },
        toastify: {
            fetchError: 'Ошибка соединения',
            successCreate: 'Канал создан',
            successRename: 'Имя успешно изменено',
            successRemove: 'Канал удалён',
            invalidCredentials: 'Неверные имя пользователя или пароль',
            alreadyExist: 'К сожалению это имя уже занято',
        },
        errorPage: {
            title: 'Упс...',
            subtitle: 'Что-то пошло не так',
            text: 'Вернитесь на главную страницу',
            link: 'На главную',
        },
    },
}
