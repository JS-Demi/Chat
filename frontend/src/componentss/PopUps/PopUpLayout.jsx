import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPopUpData, setPopUpData } from '../../store/slices/commonSlice';
import callModal from '../../utilities/callModal';

const PopUpLayout = () => {
  const dispatch = useDispatch();
  const popUpData = useSelector(selectPopUpData);
  // check if modal is not be called, not rendering it
  if (!popUpData) {
    return null;
  }
  const handleClose = () => dispatch(setPopUpData(null));
  // call modal
  const ModalComponent = callModal(popUpData.type);
  return <ModalComponent popUpData={popUpData} handleClose={handleClose} />;
};

export default PopUpLayout;
