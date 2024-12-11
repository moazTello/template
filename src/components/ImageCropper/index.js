import React, { useState } from 'react';
import { Flex, Box, Icon, useColorModeValue } from '@chakra-ui/react';
import { MdOutlineCloudUpload } from 'react-icons/md';

import Profile from './Profile';
import NewDropzone from './NewDropzone';

const ImageCropper = ({ watch, setValue, radius, ASPECT_RATIO, circularCrop }) => {
  const image = watch('image');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Flex alignItems="center" justifyContent="center" padding="20px">
      {!image ? (
        <Flex>
          <NewDropzone
            setValue={setValue}
            customW="160px"
            customR={radius}
            customH="160px"
            customE={setModalOpen}
            customRev={modalOpen}
            differenter={false}
            content={
              <Box>
                <Icon as={MdOutlineCloudUpload} w="80px" h="80px" color={textColor} />
              </Box>
            }
            style={{ width: '180px', height: '180px', borderRadius: '100%' }}
          />
        </Flex>
      ) : (
        <Profile
          radius={radius}
          image={image}
          setValue={setValue}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          ASPECT_RATIO={ASPECT_RATIO}
          circularCrop={circularCrop}
        />
      )}
    </Flex>
  );
};

export default ImageCropper;
