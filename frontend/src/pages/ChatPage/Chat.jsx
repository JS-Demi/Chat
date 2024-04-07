import React, { useEffect } from 'react';
import ChannelsBox from '../../components/ChannelsBox';
import MessagesBox from '../../components/MessagesBox';
import PopUpLayout from '../../components/PopUps/PopUpLayout';

const Chat = ({ socket }) => {
  // connect to socket when mount and disconnect when unmount
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="chat">
      <ChannelsBox />
      <MessagesBox />
      <PopUpLayout />
    </div>
  );
};

export default Chat;
