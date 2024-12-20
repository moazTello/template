// Chakra imports
import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import CircularProgress from 'components/charts/CircularProgress';
import { VSeparator } from 'components/separator/Separator';
// Custom components
import Card from 'components/card/Card';

export default function ProfitEstimation(props) {
  const { ...rest } = props;
  const { t } = useTranslation();
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'navy.700');
  return (
    <Card p="20px" alignItems="center" flexDirection="column" textAlign="center" w="100%" {...rest}>
      <Text color={textColor} fontSize="lg" fontWeight="700" mb="10px" mx="auto">
        {t('Profit Estimation')}
      </Text>
      <Text color="secondaryGray.600" fontSize="sm" fontWeight="500" maxW="200px" mx="auto" mb="10px">
        {t('Discover your profit')}
      </Text>
      <Flex justifyContent="center" alignItems="center" w="100%" px="10px" mb="8px" />
      <Box w="140px" mx="auto" mb="10px" mt="10px">
        <CircularProgress title={t('Conversion')} percentage={66} />
      </Box>
      <Card bg={cardColor} flexDirection="row" p="15px" px="20px" mt="auto">
        <Flex direction="column" py="5px">
          <Text fontSize="xs" color="secondaryGray.600" fontWeight="700" mb="5px">
            {t('Est. Sales')}
          </Text>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            1540
          </Text>
        </Flex>
        <VSeparator ms="70px" me="20px" />
        <Flex direction="column" py="5px">
          <Text fontSize="xs" color="secondaryGray.600" fontWeight="700" mb="5px">
            {t('Est. Profit')}
          </Text>
          <Text fontSize="lg" color={textColor} fontWeight="700">
            $3.984
          </Text>
        </Flex>
      </Card>
    </Card>
  );
}
