import { useRef } from 'react';
import { Button, Flex, Input, useColorModeValue } from '@chakra-ui/react';

const NewDropzone = (props) => {
  const { setValue, content, customR, customW, customH, customE, customRev, imageState, differenter } = props;
  const inputRef = useRef();
  const bg = useColorModeValue('gray.100', 'navy.700');
  const borderColor = useColorModeValue('gray.300', 'whiteAlpha.100');
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setValue('image', event.dataTransfer.files);
    differenter && imageState(URL.createObjectURL(event?.dataTransfer?.files[0]));
    customE(!customRev);
  };
  return (
    <Flex
      className="dropzone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      align="center"
      justify="center"
      bg={bg}
      border="1px dashed"
      borderColor={borderColor}
      borderRadius={customR}
      w={customW}
      h={customH}
      cursor="pointer"
    >
      <Input
        type="file"
        onChange={(event) => {
          setValue('image', event.target.files);
          customE(!customRev);
          differenter && imageState(URL.createObjectURL(event?.target?.files[0]));
        }}
        hidden
        accept="image/png, image/jpeg"
        ref={inputRef}
      />
      <Button
        variant="no-effects"
        minW="100%"
        minH="100%"
        bg="rgba(0,0,0,0)"
        borderRadius="100%"
        onClick={() => inputRef.current.click()}
      >
        {content}
      </Button>
    </Flex>
  );
};

export default NewDropzone;
