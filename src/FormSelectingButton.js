import { RoundButton } from './styles';
import addIcon from './images/add.png';
import editIcon from './images/edit.png';
import deleteIcon from './images/delete.png';
import orderIcon from './images/order.png';


export const FormSelectingButton = ({ disabled, formType, onClickFunction }) => {
  const getIcon = () => {
    switch (formType) {
      case "Add": {
        return addIcon;
      }
      case "Edit": {
        return editIcon;
      }
      case "Delete": {
        return deleteIcon;
      }
      case "Order": {
        return orderIcon;
      }
      default: {
        return "";
      }
    }
  }

  return (
    <RoundButton disabled={ disabled } title={ formType } onClick={ onClickFunction }>
      <img src={ getIcon() } alt={ formType } />
    </RoundButton>
  )
}