import { useState, useEffect } from "react";
import { getDataFromDatabase, sendDataToDatabase } from "./functions";

import { 
  Form, 
  Heading, 
  Container, 
  Label, 
  Select,
  Option,
  Input, 
  Button,
  LivePreviewContainer,
  LivePreviewPhotoWrapper,
  LivePreviewPhoto,
  FormSectionWrapper,
  LivePreviewHeading
} from "./styles";


export const AddContent = ({ mode }) => {
  const [newImageSrc, setNewImageSrc] = useState("");
  const [newImageTitle, setNewImageTitle] = useState("");
  const [imageObjectPosition, setImageObjectPosition] = useState("50% 50%");
  const [imagesArray, setImagesArray] = useState([]);
  const [percentX, setPercentX] = useState(50);
  const [percentY, setPercentY] = useState(50);
  
  useEffect(async () => { 
    setImagesArray(await getDataFromDatabase(mode)); 

  }, [ mode ]);

  useEffect(() => { 
    setImageObjectPosition(`${percentX}% ${percentY}%`);

  }, [percentX, percentY]);
  
  useEffect(() => {
    setNewImageSrc("");
    setNewImageTitle("");
    setImageObjectPosition("50% 50%");
    setPercentX(50);
    setPercentY(50);
    
  }, [ imagesArray ]);
  
  const handleSrcOnChange = (e) => {
    setNewImageSrc(e.target.value);
  }
  const handleTitleOnChange = (e) => {
    setNewImageTitle(e.target.value);
  }
  const handlePercentXChange = (e) => {
    setPercentX(e.target.value);    
  }
  const handlePercentYChange = (e) => {
    setPercentY(e.target.value);
  }
  const handleImageAdd = async (e) => {
    e.preventDefault();
    const newArray = imagesArray;
    const newImage = {
      alt: newImageTitle ? newImageTitle : `Photo ${imagesArray.length}`,
      src: newImageSrc,
      title: newImageTitle,
      style: {
        objectPosition: imageObjectPosition
      }
    }
    newArray.push(newImage);
    sendDataToDatabase(mode, newArray);
  }
  const handleClear = (e) => {
    e.preventDefault();
    setNewImageSrc("");
    setNewImageTitle("");
    setImageObjectPosition("50% 50%");
    setPercentX(50);
    setPercentY(50);
  }

  return (
    <FormSectionWrapper>
    <Form>
        <Heading>Add { mode === "photos" ? "photo" : "artwork" }</Heading>
        
        <Container>
          <Label>External URL of { mode === "photos" ? "photo" : "artwork" }</Label>
          <Input type="text" value={ newImageSrc } onChange={ handleSrcOnChange }></Input>
        </Container>

        <Container>
          <Label>{ mode === "photos" ? "Photo" : "Artwork" } title (optional)</Label>
          <Input type="text" value={ newImageTitle } onChange={ handleTitleOnChange }></Input>
        </Container>

        { newImageSrc.length &&
          <>                                     
          <Container>
              <Label>Set horizontal position</Label>
              <Input type="range" min="0" max="100" step="1" value={ percentX } onChange={ handlePercentXChange }></Input>
              <Label>{ percentX }%</Label>
            </Container> 

            <Container>
              <Label>Set vertical position</Label>
              <Input type="range" min="0" max="100" step="1" value={ percentY } onChange={ handlePercentYChange }></Input>
              <Label>{ percentY }%</Label>
            </Container>     
          </>
        }  

        <Container row>
          <Button type="button" onClick={ handleImageAdd }>Save</Button>
          <Button type="button" onClick={ handleClear }>Clear</Button>
        </Container>   

    </Form>

    { newImageSrc &&
      <LivePreviewContainer>
        <LivePreviewHeading>Live preview</LivePreviewHeading>
        <LivePreviewPhotoWrapper>
          <LivePreviewPhoto src={ newImageSrc } objectPosition={ imageObjectPosition } alt="Check your photo's path" />
        </LivePreviewPhotoWrapper>
      </LivePreviewContainer>
    }

    </FormSectionWrapper>
  )
}