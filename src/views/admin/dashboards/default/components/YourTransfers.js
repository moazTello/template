import React from 'react';

// Chakra imports
import { Button, Icon, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { BsArrowRight } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card.js';
import Transfer from 'components/dataDisplay/Transfer';
// Assets
import avatar1 from 'assets/img/avatars/avatar1.png';
import avatar2 from 'assets/img/avatars/avatar2.png';
import avatar3 from 'assets/img/avatars/avatar3.png';
import avatar4 from 'assets/img/avatars/avatar4.png';

export default function YourTransfers(props) {
  const { ...rest } = props;
  const { t } = useTranslation();
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  return (
    <Card justifyContent="center" direction="column" w="100%" mb={{ base: '20px', lg: '0px' }} pb="20px" {...rest}>
      <Text color={textColor} fontSize="lg" fontWeight="700" lineHeight="100%" mb="26px">
        {t('Your Transfers')}
      </Text>
      <Transfer mb="20px" name={`${t('From')} Alex Manda`} date={`${t('Today')}, 16:36`} sum="+$50" avatar={avatar1} />
      <Transfer mb="20px" name={`${t('To')} Laura Santos`} date={`${t('Today')}, 08:49`} sum="-$27" avatar={avatar2} />
      <Transfer
        mb="20px"
        name={`${t('From')} Jadon S.`}
        date={`${t('Yesterday')}, 14:36`}
        sum="+$157"
        avatar={avatar3}
      />
      <Transfer
        mb="20px"
        name={`${t('From')} Esthera J.`}
        date={`${t('Yesterday')}, 09:42`}
        sum="+$92"
        avatar={avatar4}
      />

      <Button p="0px" ms="auto" variant="no-hover" bg="transparent" my={{ sm: '1.5rem', lg: '0px' }}>
        <Text
          fontSize="sm"
          color={brandColor}
          fontWeight="bold"
          cursor="pointer"
          transition="all .3s ease"
          my={{ sm: '1.5rem', lg: '0px' }}
          _hover={{ me: '4px' }}
        >
          {t('View all')}
        </Text>
        <Icon
          as={BsArrowRight}
          w="18px"
          h="18px"
          color={brandColor}
          transition="all .3s ease"
          ms=".3rem"
          cursor="pointer"
          _hover={{ transform: 'translate(4px)' }}
        />
      </Button>
    </Card>
  );
}
