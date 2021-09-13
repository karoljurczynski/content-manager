import { useState, useEffect } from "react";
import { getDataFromDatabase } from "./functions";

import { 
  Form, 
  Heading, 
  Container, 
  Preview,
  Label, 
  Select,
  Option,
  Input, 
  Button 
} from "./styles"


export const EditContent = ({ mode }) => {
  const [selectedImageSrc, setSelectedImageSrc] = useState("");
  const [selectedImageTitle, setSelectedImageTitle] = useState("");
  const [imageObjectFit, setImageObjectFit] = useState("");
  const [imageObjectPosition, setImageObjectPosition] = useState("");
  const [imagesArray, setImagesArray] = useState([]);
  
  useEffect(async () => {
    mode === "photos" ? setImagesArray(await  getDataFromDatabase("photos")) : setImagesArray(await getDataFromDatabase("artworks"));

  }, [ mode ]);

  useEffect(() => {
    setSelectedImageSrc("");
    setSelectedImageTitle("");
    
  }, [ imagesArray ]);

  const handleImageSelect = (e) => {
    setSelectedImageSrc(e.target.value);
    setSelectedImageTitle(e.target.title);
  }
  const handleObjectFitSelect = (e) => {
    setImageObjectFit(e.target.value);
  }
  const handleObjectPositionSelect = (e) => {
    setImageObjectPosition(e.target.value);
  }

  return (
    <Form>
        <Heading>Edit { mode === "photos" ? "photo" : "artwork" }</Heading>
        { imagesArray &&
          <Container>
          <Label>Select a { mode === "photos" ? "photo" : "artwork" } to edit</Label>
          <Select size="5" onChange={ handleImageSelect }>
            { imagesArray.map((image, index) => {
              return (
                <Option key={ index } value={ image.src }>{ image.src }</Option>
              )
              })
            }
          </Select>
        </Container>
        }
        
        <Container>
          <Label>External URL of { mode === "photos" ? "photo" : "artwork" }</Label>
          <Input type="text" value={ selectedImageSrc }></Input>
        </Container>

        <Container>
          <Label>{ mode === "photos" ? "Photo" : "Artwork" } title (optional)</Label>
          <Input type="text" value={ selectedImageTitle }></Input>
        </Container>

        <Container>
          <Label>Select a object-fit (optional)</Label>
          <Select size="1" onChange={ handleObjectFitSelect }>
            <Option value="contain">Contain</Option>
            <Option value="cover">Cover</Option>
            <Option value="fill">Fill</Option>
            <Option value="none">None</Option>
            <Option value="scale-down">Scale-down</Option>
          </Select>
        </Container>

        <Container>
          <Label>Select a object-position (optional)</Label>
          <Select size="1" onChange={ handleObjectPositionSelect }>
            <Option value="contain">Contain</Option>
            <Option value="cover">Cover</Option>
            <Option value="fill">Fill</Option>
            <Option value="none">None</Option>
            <Option value="scale-down">Scale-down</Option>
          </Select>
        </Container>

        { selectedImageSrc &&
          <Container>
            <Label>Selected { mode === "photos" ? "photo" : "artwork" }</Label>
            <Preview src={ selectedImageSrc } alt="Check your photo's path"/>
          </Container>
        }

        <Container row>
          <Button type="button">Save</Button>
          <Button type="button">Cancel</Button>
        </Container>

    </Form>
  )
}