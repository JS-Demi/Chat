import PopUpAddChannel from '../componentss/PopUps/PopUpAddChannel';
import PopUpRemoveChannel from '../componentss/PopUps/PopUpRemoveChannel';
import PopUpRenameChannel from '../componentss/PopUps/PopUpRenameChannel';

const callModal = (type) => {
  const modal = {
    addChannel: PopUpAddChannel,
    renameChannel: PopUpRenameChannel,
    removeChannel: PopUpRemoveChannel,
  };
  return modal[type];
};

export default callModal;
