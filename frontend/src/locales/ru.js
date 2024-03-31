const ru = {
	translation: {
		header: {
			chatName: 'Hexlet Chat',
			logOut: 'Выйти',
		},
		login: {
			header: 'Войти',
			loginLabel: 'Введите логин',
			loginPlaceholder: 'Ваш ник',
			passwordPlaceholder: 'Пароль',
			passwordLabel: 'Введите пароль',
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
			loginLabel: 'Введите имя пользователя',
			loginPlaceholder: 'Имя пользователя',
			passwordPlaceholder: 'Пароль',
			passwordLabel: 'Введите пароль',
			confirmPasswordPlaceholder: 'Повторите пароль',
			confirmPasswordLabel: 'Подтвердите пароль',
			submit: 'Зарегистрироваться',
			footer: {
				text: 'Уже есть аккаунт?',
				link: 'Войти',
			},
			errors: {
				required: 'Обязательное поле',
				size: 'От 3 до 20 символов',
				min: 'Минимум 6 символов',
				match: 'Пароли должны совпадать',
				alreadyExist: 'Такой пользователь уже существует',
				spaces: 'Не может содержать пробелы',
			},
		},
		chat: {
			channels: {
				header: 'Каналы',
				createChannel: 'Создать канал',
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
				count_zero: 'Нет сообщений',
				label: 'Новое сообщение',
				placeholder: 'Введите сообщение...',
				sendMessage: 'Отправить',
			},
		},
		popUp: {
			cancel: 'Отменить',
			remove: 'Удалить',
			rename: 'Переименовать',
			add: 'Добавить',
			addChannel: 'Добавить канал',
			renameChannel: 'Переименовать канал',
			removeChannel: 'Удалить канал',
			confirm: 'Уверены?',
			label: 'Название канала',
			errors: {
				min: 'Не менее 3 символов',
				max: 'Не более 20 символов',
				match: 'Канал с таким именем уже существует',
			},
		},
	},
}

export default ru
