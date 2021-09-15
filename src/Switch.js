import { SwitchBackground, SwitchButton } from './styles';
import { useState } from 'react';

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