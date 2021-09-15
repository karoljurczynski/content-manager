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
} from "./styles"


export const EditContent = ({ mode }) => {
  const [selectedImageSrc, setSelectedImageSrc] = useState("");
  const [selectedImageId, setSelectedImageId] = useState(0);
  const [selectedImageTitle, setSelectedImageTitle] = useState("");
  const [imageObjectPosition, setImageObjectPosition] = useState("50 50");
  const [imagesArray, setImagesArray] = useState([]);

  const [percentX, setPercentX] = useState(50);
  const [percentY, setPercentY] = useState(50);
  
  useEffect(async () => { mode === "photos" ? setImagesArray(await  getDataFromDatabase("photos")) : setImagesArray(await getDataFromDatabase("artworks")) }, [ mode ]);
  useEffect(() => { setImageObjectPosition(`${percentX}% ${percentY}%`) }, [percentX, percentY]);
  useEffect(() => {
    setSelectedImageSrc("");
    setSelectedImageTitle("");
    setImageObjectPosition("50 50");
    
  }, [ imagesArray ]);

  useEffect(() => {
    if (imagesArray && selectedImageId) {
      imagesArray[selectedImageId].src && setSelectedImageSrc(imagesArray[selectedImageId].src);
      imagesArray[selectedImageId].title && setSelectedImageTitle(imagesArray[selectedImageId].title);
      imagesArray[selectedImageId].style && setImageObjectPosition(imagesArray[selectedImageId].style.objectPosition);
    }

  }, [ selectedImageId ])

  const handleImageSelect = (e) => {
    setSelectedImageSrc("");
    setSelectedImageTitle("");
    setImageObjectPosition("50 50");
    setSelectedImageId(e.target.value);
  }
  const handleUrlOnChange = (e) => {
    setSelectedImageSrc(e.target.value);
  }
  const handleTitleOnChange = (e) => {
    setSelectedImageTitle(e.target.value);
  }
  const handlePercentXChange = (e) => {
    setPercentX(e.target.value);    
  }
  const handlePercentYChange = (e) => {
    setPercentY(e.target.value);
  }
  const handleImageEdit = async (e) => {
    e.preventDefault();

    const newArray = imagesArray;
    const newImage = {
      alt: selectedImageTitle ? selectedImageTitle : `Photo ${selectedImageId}`,
      src: selectedImageSrc,
      title: selectedImageTitle,
      style: {
        objectPosition: imageObjectPosition
      }
    }
    newArray[selectedImageId] = newImage;
    sendDataToDatabase(mode, newArray);
  }
  const handleImageEditCanceled = (e) => {
    e.preventDefault();
    setSelectedImageSrc("");
    setSelectedImageTitle("");
    setImageObjectPosition("50 50");
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
        
        <Container>
          <Label>External URL of { mode === "photos" ? "photo" : "artwork" }</Label>
          <Input type="text" value={ selectedImageSrc } onChange={ handleUrlOnChange }></Input>
        </Container>

        <Container>
          <Label>{ mode === "photos" ? "Photo" : "Artwork" } title (optional)</Label>
          <Input type="text" value={ selectedImageTitle } onChange={ handleTitleOnChange }></Input>
        </Container>

        { selectedImageId &&
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
          <Button type="button" onClick={ handleImageEdit }>Save</Button>
          <Button type="button" onClick={ handleImageEditCanceled }>Cancel</Button>
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