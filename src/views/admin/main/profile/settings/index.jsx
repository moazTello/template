import { Box, Flex, SimpleGrid } from '@chakra-ui/react';

import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import Info from 'views/admin/main/profile/settings/components/Info';

import Profile from 'views/admin/main/profile/settings/components/Profile';

import { editMyInfo, getMe } from '../../../../../apis';

export default function Settings() {
  const { data: user } = useQuery({
    queryKey: ['getMe'],
    queryFn: () => getMe(),
  });

  const [newImage, setNewImage] = useState(null);

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {user && (
        <>
          <SimpleGrid mb="20px" columns={{ sm: 1, lg: 1 }} spacing={{ base: '20px', xl: '20px' }}>
            <Flex direction="column">
              <Profile
                name={user.data.firstName + ' ' + user.data.lastName}
                avatar={user.data.image}
                role={user.data.role.name}
                liftingUpImage={handleImageChange}
              />

              <Info user={user.data} newImage={newImage} editMyInfo={editMyInfo} />
            </Flex>
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}
