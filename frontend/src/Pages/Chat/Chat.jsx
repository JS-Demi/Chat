import React, { useEffect } from 'react';
import ChannelsBox from '../../Components/ChannelsBox';
import MessagesBox from '../../Components/MessagesBox';
import PopUpLayout from '../../Components/PopUps/PopUpLayout';
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
