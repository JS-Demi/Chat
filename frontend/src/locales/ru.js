const ru = {
  translation: {
    header: {
      chatName: 'Hexlet Chat',
      logout: 'Выйти',
    },
    login: {
      header: 'Войти',
      login: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      footer: {
        text: 'Нет аккаунта?',
        link: 'Регистрация',
      },
      errors: {
        wrongData: 'Неверные имя пользователя или пароль',
      },
    },
    signup: {
      header: 'Регистрация',
      login: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      errors: {
        required: 'Обязательное поле',
        size: 'От 3 до 20 символов',
        min: 'Не менее 6 символов',
        match: 'Пароли должны совпадать',
        alreadyExist: 'Такой пользователь уже существует',
      },
    },
    chat: {
      channels: {
        header: 'Каналы',
        createChannel: '+',
        manageChannel: 'Управление каналом',
        removeChannel: 'Удалить канал',
        renameChannel: 'Переименовать канал',
        actionRename: 'Переименовать',
        actionRemove: 'Удалить',
      },
      messages: {
        count_one: '{{ count }} сообщение',
        count_few: '{{ count }} сообщения',
        count_many: '{{ count }} сообщений',
        count_zero: '0 сообщений',
        label: 'Новое сообщение',
        placeholder: 'Введите сообщение...',
        sendMessage: 'Отправить',
      },
    },
    popUp: {
      cancel: 'Отменить',
      remove: 'Удалить',
      rename: 'Отправить',
      add: 'Отправить',
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      removeChannel: 'Удалить канал',
      confirm: 'Уверены?',
      label: 'Имя канала',
      errors: {
        required: 'Обязательное поле',
        size: 'От 3 до 20 символов',
        match: 'Должно быть уникальным',
      },
    },
    toastify: {
      fetchError: 'Ошибка соединения',
      successCreate: 'Канал создан',
      successRename: 'Канал переименован',
      successRemove: 'Канал удалён',
    },
  },
};

export default ru;
