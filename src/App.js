// IMPORTS

import { React, useState } from 'react';
import { ManageContent } from './ManageContent';
import { FormSelectingButton } from './FormSelectingButton';
import { Switch } from './Switch';

import { Wrapper, ButtonsSection, FormSection } from './styles';



export const App = () => {

  // STATE


  const [mode, setMode] = useState("photos");
  const [actionType, setActionType] = useState("Add");


  // FORM HANDLERS


  const handleAddForm = () => {
    setActionType("Add");
  }
  const handleEditForm = () => {
    setActionType("Edit");
  }
  const handleDeleteForm = () => {
    setActionType("Delete");
  }
  const handleSwitch = () => {
    mode === "photos" ? setMode("artworks") : setMode("photos");
  }


  // JSX


  return (
    <Wrapper mode={mode}>

      <ButtonsSection actionType={actionType}>
        <FormSelectingButton formType="Add" onClickFunction={ handleAddForm } />
        <FormSelectingButton formType="Edit" onClickFunction={ handleEditForm } />
        <FormSelectingButton formType="Delete" onClickFunction={ handleDeleteForm } />
        <Switch onClickFunction={ handleSwitch } />
      </ButtonsSection>

      <FormSection>
        <ManageContent mode={ mode } actionType={ actionType } />
      </FormSection>

    </Wrapper>
  )
}