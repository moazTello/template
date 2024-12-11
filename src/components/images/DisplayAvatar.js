import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarBadge, IconButton } from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';

import { getImage } from '../../apis';

function DisplayAvatar(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      const image = await getImage(props.avatar);
      setImage(image);
    }

    if (props.avatar !== null) fetchImage();
  }, [setImage, props.avatar]);

  const inputFileRef = useRef(null);

  const handleEditClick = () => {
    inputFileRef.current.click();
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(event.target.files[0]);
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
      props.liftingUpImage(selectedFile);
    }
  };

  return (
    <Avatar mx="auto" src={image || props.avatar} h="87px" w="87px" mt="-43px" mb="15px">
      <AvatarBadge boxSize="1.25em">
        <IconButton
          icon={<FaEdit />}
          variant="solid"
          color="grey"
          aria-label="Update Image"
          onClick={handleEditClick}
        />
      </AvatarBadge>
      <input type="file" accept="image/*" ref={inputFileRef} style={{ display: 'none' }} onChange={handleImageChange} />
    </Avatar>
  );
}

export default DisplayAvatar;
