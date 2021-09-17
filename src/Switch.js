import { useState } from 'react';
import { SwitchBackground, SwitchButton } from './styles';


export const Switch = ({ previewChanger, onClickFunction }) => {
  const [isSwitchAtLeft, setIsSwitchAtLeft] = useState(true);

  const handleSwitchClick = () => {
    onClickFunction();
    setIsSwitchAtLeft(!isSwitchAtLeft);
  }

  return (
    <SwitchBackground previewChanger={previewChanger} onClick={ handleSwitchClick }>
      <SwitchButton isSwitchAtLeft={ isSwitchAtLeft } />
    </SwitchBackground>
  )
}