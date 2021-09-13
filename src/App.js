import { React, useState } from 'react';
import { Wrapper, ButtonsSection, FormSection } from './styles';
import { FormSelectingButton } from './FormSelectingButton';
import { Switch } from './Switch';

import { AddContent } from './AddContent';
import { DeleteContent } from './DeleteContent';
import { EditContent } from './EditContent';


export const App = () => {
  const [isAddContentFormSelected, setIsAddContentFormSelected] = useState(true);
  const [isEditContentFormSelected, setIsEditContentFormSelected] = useState(false);
  const [isDeleteContentFormSelected, setIsDeleteContentFormSelected] = useState(false);
  const [mode, setMode] = useState("photos");


  const closeAllForms = () => {
    setIsAddContentFormSelected(false);
    setIsEditContentFormSelected(false);
    setIsDeleteContentFormSelected(false);
  }
  const handleAddForm = () => {
    closeAllForms();
    setIsAddContentFormSelected(true);
  }
  const handleEditForm = () => {
    closeAllForms();
    setIsEditContentFormSelected(true);
  }
  const handleDeleteForm = () => {
    closeAllForms();
    setIsDeleteContentFormSelected(true);
  }
  const handleSwitch = () => {
    mode === "photos" ? setMode("artworks") : setMode("photos");
  }


  return (
    <Wrapper>

      <ButtonsSection>
        <FormSelectingButton formType="Add" onClickFunction={ handleAddForm } />
        <FormSelectingButton formType="Edit" onClickFunction={ handleEditForm } />
        <FormSelectingButton formType="Delete" onClickFunction={ handleDeleteForm } />
        <Switch onClickFunction={ handleSwitch } />
      </ButtonsSection>

      <FormSection>
        { isAddContentFormSelected && <AddContent mode={ mode } /> }
        { isEditContentFormSelected && <EditContent mode={ mode } /> }
        { isDeleteContentFormSelected && <DeleteContent mode={ mode } /> }
      </FormSection>

    </Wrapper>
  )
}