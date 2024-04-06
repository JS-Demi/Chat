import React, { useEffect } from 'react';
import ChannelsBox from '../../componentss/ChannelsBox';
import MessagesBox from '../../componentss/MessagesBox';
import PopUpLayout from '../../componentss/PopUps/PopUpLayout';
import socket from '../../socket';

const Chat = () => {
  // connect to socket when mount and disconnect when unmount
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="chat">
      <ChannelsBox />
      <MessagesBox />
      <PopUpLayout />
    </div>
  );
};

export default Chat;
