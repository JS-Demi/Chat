import PopUpAddChannel from '../Components/PopUps/PopUpAddChannel';
import PopUpRemoveChannel from '../Components/PopUps/PopUpRemoveChannel';
import PopUpRenameChannel from '../Components/PopUps/PopUpRenameChannel';

const callModal = (type) => {
  const modal = {
    addChannel: PopUpAddChannel,
    renameChannel: PopUpRenameChannel,
    removeChannel: PopUpRemoveChannel,
  };
  return modal[type];
};

export default callModal;
