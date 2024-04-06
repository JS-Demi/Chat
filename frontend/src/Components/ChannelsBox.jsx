import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import { useGetChannelsQuery } from '../store/services/channelsApi';
import { selectActiveChannel, setActiveChannel, setPopUpData } from '../store/slices/commonSlice';

const ChannelsBox = () => {
  // use hooks for i18n and channels data
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  // get if of active channel from state
  const { id: activeChannelId } = useSelector(selectActiveChannel);
  useEffect(() => {
    if (activeChannelId === channels?.at(-1).id) {
      animateScroll.scrollToBottom({ containerId: 'channels-box', duration: 0 });
    }
    if (activeChannelId === '1') {
      animateScroll.scrollToTop({ containerId: 'channels-box', duration: 0 });
    }
  }, [channels, activeChannelId]);
  // prettier-ignore
  const handleUserAction = (type, id = null) => () => {
    dispatch(setPopUpData({ type, id }));
  };
  // create handle for change active channel
  const handleSetActiveChannel = (id, name) => {
    dispatch(setActiveChannel({ id, name }));
  };
  return (
    <div className="chat__channels">
      <div className="chat__channels__header">
        <b>{t('chat.channels.header')}</b>
        <button onClick={handleUserAction('addChannel')} type="button" className="add_btn">
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
        {channels?.map(({ name, id, removable }) => (
          <li className="nav-item w-100" key={id}>
            {!removable ? (
              <Button
                onClick={() => handleSetActiveChannel(id, name)}
                id={id}
                name={name}
                className="channel w-100 rounded-0 text-start"
                variant={activeChannelId === id ? 'secondary' : ''}
              >
                <span className="me-1"># </span>
                {name}
              </Button>
            ) : (
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  onClick={() => handleSetActiveChannel(id, name)}
                  id={id}
                  name={name}
                  className="w-100 rounded-0 text-start text-truncate"
                  variant={activeChannelId === id ? 'secondary' : ''}
                >
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <Dropdown.Toggle
                  split
                  className="flex-grow-0"
                  variant={activeChannelId === id ? 'secondary' : ''}
                  id="dropdown-split-basic"
                >
                  <span className="visually-hidden">{t('chat.channels.manageChannel')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleUserAction('renameChannel', id)}>
                    {t('chat.channels.actionRename')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleUserAction('removeChannel', id)}>
                    {t('chat.channels.actionRemove')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;
