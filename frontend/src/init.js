import i18next from 'i18next';
import * as filter from 'leo-profanity';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import resources from './locales';
import RollbarProvider from './rollbar';
import socket from './socket';
import { channelsApi } from './store/services/channelsApi';
import { messagesApi } from './store/services/messagesApi';
import store from './store/store';

// prettier-ignore
const init = async () => {
  // init leo dictionary for ru language
  filter.add(filter.getDictionary('ru'));
  // create i18next instance
  const i18n = i18next.createInstance();
  // init i18next
  try {
    await i18n.use(initReactI18next).init({
      fallbackLng: 'ru',
      resources,
    });
  } catch (err) {
    console.log(`${err} i18next`);
  }

  socket.on('newChannel', (channel) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel);
      }),
    );
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.map((c) => (c.id === channel.id ? channel : c))),
    );
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter((c) => c.id !== id)),
    );
  });
  socket.on('newMessage', (message) => {
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(message);
      }),
    );
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <RollbarProvider>
            <App />
          </RollbarProvider>
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
