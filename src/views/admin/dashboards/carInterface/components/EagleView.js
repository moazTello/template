// Chakra imports
import { Box, Button, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';

// Assets
import React from 'react';
import { useTranslation } from 'react-i18next';

import Car from 'assets/img/dashboards/Tesla.png';
// Custom components
import Card from 'components/card/Card';
export default function AddDevice(props) {
  const { t } = useTranslation();
  const { ...rest } = props;
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  return (
    <Card
      p={{
        base: '40px 20px',
        md: '70px 55px',
        '2xl': '50px 28px',
        '3xl': '70px 55px',
      }}
      mb={{ base: '20px', lg: '0px' }}
      {...rest}
    >
      <Box>
        <Text textAlign="center" fontSize="lg" fontWeight="700" mb="50px" color={textColor}>
          {t('Welcome back')}
        </Text>
        <Image src={Car} mx="auto" mb="60px" />
        <Text
          textAlign="center"
          fontSize="lg"
          fontWeight="400"
          mb={{ base: '20px', md: '50px' }}
          me="5px"
          color="secondaryGray.600"
        >
          {t('Your Model')}{' '}
          <Text
            as="span"
            textAlign="center"
            fontSize="lg"
            fontWeight="700"
            mb={{ base: '20px', md: '50px' }}
            color={textColor}
          >
            {t('Parking Mode')}
          </Text>
        </Text>
        <Button fontSize="sm" mb={{ base: '20px', md: '50px' }} w="100%" variant="darkBrand">
          {t('Turn on Engine')}
        </Button>

        <Flex align="center" justify="center">
          <Text textAlign="center" fontSize="xl" fontWeight="400" me="34px" color="secondaryGray.600">
            N
          </Text>
          <Text textAlign="center" fontSize="xl" fontWeight="400" me="34px" color="secondaryGray.600">
            R
          </Text>
          <Text textAlign="center" fontSize="50px" fontWeight="700" me="34px" color={textColor}>
            P
          </Text>
          <Text textAlign="center" fontSize="xl" fontWeight="400" me="34px" color="secondaryGray.600">
            D
          </Text>
          <Text textAlign="center" fontSize="xl" fontWeight="400" color="secondaryGray.600">
            M
          </Text>
        </Flex>
      </Box>
    </Card>
  );
}
