import { SwitchBackground, SwitchButton } from './styles';

export const Switch = ({ onClickFunction }) => {
  return (
    <SwitchBackground>
      <SwitchButton onClick={ onClickFunction } />
    </SwitchBackground>
  )
}