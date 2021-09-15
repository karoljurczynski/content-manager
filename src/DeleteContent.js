import { useState, useEffect } from "react";
import { getDataFromDatabase, sendDataToDatabase } from "./functions";

import { 
  Form, 
  Heading, 
  Container, 
  Label, 
  Select,
  Option,
  Button,
  LivePreviewContainer,
  LivePreviewPhotoWrapper,
  LivePreviewPhoto,
  FormSectionWrapper,
  LivePreviewHeading
} from "./styles";

export const DeleteContent = ({ mode }) => {
  const [selectedImageSrc, setSelectedImageSrc] = useState("");
  const [selectedImageId, setSelectedImageId] = useState("");
  const [selectedImageTitle, setSelectedImageTitle] = useState("");
  const [imageObjectPosition, setImageObjectPosition] = useState("50% 50%");
  const [imagesArray, setImagesArray] = useState([]);
  
  useEffect(async () => { 
    setImagesArray(await getDataFromDatabase(mode)); 

  }, [ mode ]);
  
  useEffect(() => {
    setSelectedImageId(0);
    setSelectedImageSrc("");
    setSelectedImageTitle("");
    setImageObjectPosition("50% 50%");
    
  }, [ imagesArray ]);

  useEffect(() => {
    if (selectedImageId.length) {
      setSelectedImageSrc(imagesArray[selectedImageId].src);
      setSelectedImageTitle(imagesArray[selectedImageId].title);

      if (imagesArray[selectedImageId].style) {
        setImageObjectPosition(imagesArray[selectedImageId].style.objectPosition);
      }
    }

    return () => {
      setSelectedImageSrc("");
      setSelectedImageTitle("");
      setImageObjectPosition("50% 50%");
    }
     
  }, [ selectedImageId ])

  const handleImageSelect = (e) => {
    setSelectedImageId(e.target.value);
  }
  const handleImageRemove = async (e) => {
    e.preventDefault();
    const newArray = imagesArray;
    newArray.splice(selectedImageId, 1);
    sendDataToDatabase(mode, newArray);
    setSelectedImageSrc("");
  }
  const handleCancel = (e) => {
    e.preventDefault();
    setSelectedImageSrc("");
  }

  return (
    <FormSectionWrapper>
    <Form>
        <Heading>Edit { mode === "photos" ? "photo" : "artwork" }</Heading>
        { imagesArray &&
          <Container>
          <Label>Select a { mode === "photos" ? "photo" : "artwork" } to edit</Label>
          <Select size="5" onChange={ handleImageSelect }>
            { imagesArray.map((image, index) => {
              return (
                <Option key={ index } value={ index }>{ image.title ? image.title : image.src }</Option>
              )
              })
            }
          </Select>
        </Container>
        }
        
        <Container row>
          <Button type="button" onClick={ handleImageRemove }>Delete</Button>
          <Button type="button" onClick={ handleCancel }>Cancel</Button>
        </Container>   

    </Form>

    { selectedImageSrc &&
      <LivePreviewContainer>
        <LivePreviewHeading>Live preview</LivePreviewHeading>
        <LivePreviewPhotoWrapper>
          <LivePreviewPhoto src={ selectedImageSrc } objectPosition={ imageObjectPosition } alt="Check your photo's path" />
        </LivePreviewPhotoWrapper>
      </LivePreviewContainer>
    }

    </FormSectionWrapper>
  )
}