import React, { useEffect } from 'react';
import ChannelsBox from '../../components/ChannelsBox';
import MessagesBox from '../../components/MessagesBox';
import PopUpLayout from '../../components/PopUps/PopUpLayout';
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
