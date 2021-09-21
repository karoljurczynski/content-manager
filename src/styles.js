import styled from "styled-components";


// LAYOUT ELEMENTS


export const Wrapper = styled.div`
  font-family: 'Arial', sans-serif;
  position: relative;
  z-index: 2;
  min-width: 300px;
  width: fit-content;
  margin: 0 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 10px;


  ${({ mode }) => mode === "artworks" && `
    height: 600px;
    @media (max-width: 930px) { height: 1120px }
  `}

  ${({ mode }) => mode === "photos" && `
    height: 762px;
    @media (max-width: 930px) { height: 1281px }
  `}
  

  @media (max-width: 930px) {
    width: 630px;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;
export const FormSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 930px) {
    flex-direction: column;
  }
`;
export const FormSection = styled.section`
  width: calc(100% - 80px);
  height: 100%;
  overflow-x: hidden;
`;
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  
  ${({ row }) => row && `
    flex-direction: row;
  `}

  * > & {
    margin-bottom: 15px;
  }
`;
export const Heading = styled.h2`
  font-weight: 100;   
  color: black;
  font-size: 26px;
  margin: 0;
  user-select: none;
  margin-bottom: 15px;
`;
export const Warning = styled.p`
  color: red;
  margin: 10px 0 0;
  font-size: 12px;

  a {
    color: red;
    font-weight: bold;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;

// BUTTONS SECTION


export const ButtonsSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px 0 0 10px;
  width: 80px;
  height: 100%;

  ${({ actionType }) => actionType === "Add" && `
    background: #008000;
  `}

  ${({ actionType }) => actionType === "Edit" && `
    background: #FF8C00;
  `}

  ${({ actionType }) => actionType === "Delete" && `
    background: #FF0000;
  `}

  ${({ actionType }) => actionType === "Order" && `
    background: #1E90FF;
  `}
`;
export const RoundButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  box-shadow: 1px 0px 5px black, 0px 1px 5px black;
  background: #ffffff;
  outline: none;
  cursor: pointer;
  margin-top: 10px;
  user-select: none;

  :hover, :focus, :active {
    background-color: #dedede;
  }

  :disabled {
    cursor: default;
    opacity: 0.3;

    :hover, :focus, :active {
      background-color: #ffffff;
    }
  }

  img {
    width: 70%;
    height: auto;
  }
`;


// SWITCH


export const SwitchBackground = styled.span`
  position: absolute;
  bottom: 15px;
  width: 25px;
  height: 12px;
  background: white;
  border-radius: 20px;
  border: 1px solid black;
  box-shadow: 1px 0px 2px black, 0px 1px 2px black;
  cursor: pointer;

  
  ${({ previewChanger }) => previewChanger && `
    margin: 10px 0 10px 3px;
    position: relative;
  `}
`;
export const SwitchButton = styled.button`
  position: absolute;
  left: -5px;
  top: 50%;
  bottom: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  background: white;
  border: 2px solid black;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s ease;

  
  ${({ isSwitchAtLeft }) => !isSwitchAtLeft && `left: 11px`}
`;


// FORM


export const Form = styled.form`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 300px;

  @media (max-width: 930px) {
    width: 100%;
  }
`;
export const Input = styled.input`
  padding: 5px;
  font-size: 18px;
  width: 250px;

  &[type="file"] {
    padding: 0;
    margin: 5px 0 0;
    font-size: 14px;
    cursor: pointer;
  }
  &[type="checkbox"] {
    margin: 5px 0 0;
    width: auto;
    padding: 0;
    cursor: pointer;
  }
  &[type="range"] {
    cursor: pointer;
  }
  

  @media (max-width: 930px) {
    width: 100%;
  }
`;
export const Select = styled.select`
  width: 250px;
  padding: 5px;
  max-height: 100px;
  user-select: none;
  

  @media (max-width: 930px) {
    width: 100%;
  }
`;
export const Option = styled.option`
  width: 100%;
  cursor: pointer;
`;
export const Button = styled.button`
  font-size: 16px;
  padding: 6px 14px;
  margin-right: 10px;
  user-select: none;
  cursor: pointer;
`;
export const Label = styled.label`
  margin: 0;
  font-size: 16px;
  margin-bottom: 2px;
`;
export const DragListContainer = styled.div`
  width: 100%;
  min-height: 120px;
  max-height: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid gray;
  box-sizing: border-box;
`;
export const DragListItem = styled.p`
  display: block;
  width: 100%;
  padding: 3px;
  margin: 0;
  text-align: left;
  user-select: none;
  cursor: pointer;
`;


// LIVE PREVIEW


export const LivePreviewContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
`;
export const LivePreviewPhotoWrapper = styled.div`
  height: 660px;
  width: 498.66px;
  

  @media (max-width: 650px) {
    width: 100%;
  }


  ${({ mode }) => mode === "artworks" && `
    height: 498.66px;
    width: 498.66px;
  `}
  ${({ isDesktopPreview }) => !isDesktopPreview && `
    width: 300px;
  `}
`;
export const LivePreviewHeading = styled.h2`
  font-weight: 100;   
  color: black;
  font-size: 26px;
  margin: 0;
  user-select: none;  
  width: 100%;
  text-align: left;
  margin-bottom: 16px;
`;
export const LivePreviewPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid black;

  ${({ objectPosition }) => objectPosition && `
    object-position: ${objectPosition};
  `}
`;