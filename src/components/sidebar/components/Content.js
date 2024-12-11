import { Box, Flex, Stack } from '@chakra-ui/react';

import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';

function SidebarContent(props) {
  const { routes, mini, hovered } = props;

  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px" width="100%">
      <Brand mini={mini} hovered={hovered} />
      <Stack direction="column" mb="auto" mt="8px">
        <Box
          ps={mini === false ? '20px' : mini === true && hovered === true ? '20px' : '16px'}
          pe={{ md: '16px', '2xl': '1px' }}
          ms={mini && hovered === false ? '-16px' : 'unset'}
        >
          <Links mini={mini} hovered={hovered} routes={routes} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
