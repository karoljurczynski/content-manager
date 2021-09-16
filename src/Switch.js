import { useState } from 'react';
import { SwitchBackground, SwitchButton } from './styles';


export const Switch = ({ onClickFunction }) => {
  const [isSwitchAtLeft, setIsSwitchAtLeft] = useState(true);

  const handleSwitchClick = () => {
    onClickFunction();
    setIsSwitchAtLeft(!isSwitchAtLeft);
  }

  return (
    <SwitchBackground onClick={ handleSwitchClick }>
      <SwitchButton isSwitchAtLeft={ isSwitchAtLeft } />
    </SwitchBackground>
  )
}