import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';

import DisplayAvatar from '../../../../../../components/images/DisplayAvatar';

export default function Settings(props) {
  const { name, avatar, role, liftingUpImage } = props;
  const { t } = useTranslation();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';

  return (
    <Card mb="20px" alignItems="center">
      <Flex w="100%" bgGradient="linear(to-b, brand.400, brand.600)" minH="127px" borderRadius="16px"></Flex>
      <DisplayAvatar avatar={avatar} liftingUpImage={liftingUpImage} />

      <Text fontSize="2xl" textColor={textColorPrimary} fontWeight="700">
        {name}
      </Text>
      <Flex align="center" mx="auto" px="15px">
        <Text me="4px" color={textColorSecondary} fontSize="sm" fontWeight="400" lineHeight="100%">
          {t('Account type')} : {role}
        </Text>
      </Flex>
    </Card>
  );
}
