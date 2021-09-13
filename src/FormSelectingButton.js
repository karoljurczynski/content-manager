import { RoundButton } from './styles';
import addIcon from './images/add.png';
import editIcon from './images/edit.png';
import deleteIcon from './images/delete.png';

export const FormSelectingButton = ({ formType, onClickFunction }) => {

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
      default: {
        return "";
      }
    }
  }

  return (
    <RoundButton title={ formType } onClick={ onClickFunction }>
      <img src={ getIcon() } alt={ formType } />
    </RoundButton>
  )
}