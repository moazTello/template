import { Flex, useColorModeValue } from '@chakra-ui/react';

import { AbalakLogo, AbalakText } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand(props) {
  const { mini, hovered } = props;
  let logoColor = useColorModeValue('brand.500', 'white');

  return (
    <Flex alignItems="center" flexDirection="column">
      <Flex alignItems="flex-end" mb="20px" flexDirection="row">
        <AbalakText
          h="31px"
          w="77px"
          my="2px"
          color={logoColor}
          display={mini === false ? 'block' : mini === true && hovered === true ? 'block' : 'none'}
        />
        <AbalakLogo h="49px" w="60px" my="2px" color={logoColor} />
      </Flex>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
