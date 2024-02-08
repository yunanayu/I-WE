import React from 'react';
import { changeComplete } from '../../../api/RecordApi';
import useMemberStore from '../../../stores/userStore';

const CheckCard = (props) => {
  const babyList = useMemberStore(state => state.babyList)
  const motherNum = babyList[0].motherNum 
  const item = props.item
  console.log(props.item)
  const updateComplete = () => {
    changeComplete(motherNum,item.essentialNum, 'mother', !item.complete )
  }
  return (
    <div>
      
    </div>
  );
};

export default CheckCard;