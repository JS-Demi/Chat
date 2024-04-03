import PopUpAddChannel from './PopUpAddChannel';
import PopUpRemoveChannel from './PopUpRemoveChannel';
import PopUpRenameChannel from './PopUpRenameChannel';

const callModal = (type) => {
  const modal = {
    addChannel: PopUpAddChannel,
    renameChannel: PopUpRenameChannel,
    removeChannel: PopUpRemoveChannel,
  };
  return modal[type];
};

export default callModal;
