// IMPORTS

import { React, useState } from 'react';
import { Manager } from './Manager';
import { FormSelectingButton } from './FormSelectingButton';
import { Switch } from './Switch';

import { Wrapper, ButtonsSection, FormSection } from './styles';



export const App = () => {

  // STATE


  const [mode, setMode] = useState("photos");
  const [actionType, setActionType] = useState("Add");
  const [isOrderButtonDisabled, setIsOrderButtonDisabled] = useState(true);


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
  const handleOrderForm = () => {
    setActionType("Order");
  }
  const changeOrderButtonStatus = (boolean) => {
    setIsOrderButtonDisabled(boolean)
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
        <FormSelectingButton disabled={ isOrderButtonDisabled ? true : false } formType="Order" onClickFunction={ handleOrderForm } />
        <Switch onClickFunction={ handleSwitch } />
      </ButtonsSection>

      <FormSection>
        <Manager mode={ mode } actionType={ actionType } setIsOrderButtonDisabled={ changeOrderButtonStatus } />
      </FormSection>

    </Wrapper>
  )
}