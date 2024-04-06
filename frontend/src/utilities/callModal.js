import PopUpAddChannel from '../components/PopUps/PopUpAddChannel';
import PopUpRemoveChannel from '../components/PopUps/PopUpRemoveChannel';
import PopUpRenameChannel from '../components/PopUps/PopUpRenameChannel';

const callModal = (type) => {
  const modal = {
    addChannel: PopUpAddChannel,
    renameChannel: PopUpRenameChannel,
    removeChannel: PopUpRemoveChannel,
  };
  return modal[type];
};

export default callModal;
