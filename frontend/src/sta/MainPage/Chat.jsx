import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Channels from '../../componentss/ChannelsBox';
import MessagesForm from '../../componentss/MessagesBox';
import PopUpLayout from '../../componentss/PopUps/PopUpLayout';
import { useGetMessagesQuery } from '../../store/services/messagesApi';
import './chat.scss';

const MainPage = () => {
  // create state
  const [modalInfo, setModalInfo] = useState({ type: null, id: null });
  const [activeChannel, setActiveChannel] = useState({ id: '1', name: 'general' });
  // use hook for i18n
  const { t } = useTranslation();
  const { data: messages } = useGetMessagesQuery();
  const { id: activeChannelId, name } = activeChannel;
  const count = messages ? messages.filter((msg) => msg.channelId === activeChannelId).length : 0;

  // create handles for state our modals
  const handleClose = () => setModalInfo({ type: null, id: null });
  // prettier-ignore
  const handleUserAction = (type) => ({ currentTarget }) => {
    const { id } = currentTarget.dataset;
    setModalInfo({ type, id });
  };

  return (
    <div className="chat">
      <div className="chat__channels">
        <div className="chat__channels__header">
          <b>{t('chat.channels.header')}</b>
          <button
            data-id={null}
            onClick={handleUserAction('addChannel')}
            type="button"
            className="add_btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              fill="currentColor"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span className="visually-hidden">{t('chat.channels.createChannel')}</span>
          </button>
        </div>
        <ul id="channels-box" className="nav chat__channels__main">
          <Channels
            handleUserAction={handleUserAction}
            setActiveChannel={setActiveChannel}
            activeChannel={activeChannel}
          />
        </ul>
      </div>
      <div className="chat__messages__header">
        <p className="m-0">
          <b>{`# ${name}`}</b>
        </p>
        <span className="text-muted">{t('chat.messages.count', { count })}</span>
      </div>
      <div className="chat__messages">
        <MessagesForm activeChannel={activeChannel} />
      </div>
      <PopUpLayout
        modalInfo={modalInfo}
        handleClose={handleClose}
        setActiveChannel={setActiveChannel}
        activeChannelId={activeChannelId}
      />
    </div>
  );
};

export default MainPage;
