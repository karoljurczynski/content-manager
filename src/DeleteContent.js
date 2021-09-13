import { 
  Form, 
  Heading, 
  Label, 
  Preview,
  Select,
  Option, 
  Button, 
  Container
} from "./styles"

import { useEffect, useState } from "react";
import photo from './images/photo.jpg';
import { getDataFromDatabase } from "./functions";

export const DeleteContent = ({ mode }) => {
  const [selectedImage, setSelectedImage] = useState(photo);
  const [imagesArray, setImagesArray] = useState([]);
  
  useEffect(async () => { mode === "photos" ? setImagesArray(await getDataFromDatabase("photos")) : setImagesArray(await getDataFromDatabase("artworks")) }, [ mode ]);
  useEffect(() => { setSelectedImage("") }, [ imagesArray ]);

  const handleImageSelect = (e) => {
    setSelectedImage(e.target.value);
  }
  return (
    <Form>
        <Heading>Delete { mode === "photos" ? "photo" : "artwork" }</Heading>

        { imagesArray &&
          <Container>
          <Label>Select a { mode === "photos" ? "photo" : "artwork" } to delete</Label>
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

        { selectedImage &&
          <Container>
            <Label>Selected { mode === "photos" ? "photo" : "artwork" }</Label>
            <Preview src={ selectedImage } alt="Check your photo's path"/>
          </Container>
        }

        <Container row>
          <Button type="button">Delete</Button>
          <Button type="button">Cancel</Button>
        </Container>
    </Form>
  )
}