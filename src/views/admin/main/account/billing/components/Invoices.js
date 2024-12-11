import React from 'react';

// Chakra imports
import { Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { Link } from 'react-router-dom';

import Card from 'components/card/Card.js';
import ButtonAction from 'components/actions/ButtonAction';

export default function Invoices(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  return (
    <Card direction="column" w="100%" p="34px" {...rest}>
      <Flex align="center" mb="30px">
        <Text color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Invoices
        </Text>
        <Button p="0px" ms="auto" variant="no-hover" bg="transparent">
          <Text fontSize="md" color={brandColor} fontWeight="700" cursor="pointer" my={{ sm: '1.5rem', lg: '0px' }}>
            See all invoices
          </Text>
        </Button>
      </Flex>
      <Link href="https://www.orimi.com/pdf-test.pdf">
        <ButtonAction mb="43px" name="SIM16-#024215" date="January, 17 2022" sum="$839" actionName="View PDF" />
      </Link>

      <ButtonAction mb="43px" name="SIM76-#024214" date="January, 14 2022" sum="$997" actionName="View PDF" />
      <ButtonAction mb="43px" name="SIM23-#024213" date="January, 03 2022" sum="$233" actionName="View PDF" />
      <ButtonAction mb="43px" name="SIM42-#024212" date="December, 29 2021" sum="$342" actionName="View PDF" />
      <ButtonAction mb="43px" name="SIM93-#024211" date="November, 30 2021" sum="$798" actionName="View PDF" />
      <ButtonAction name="SIM13-#024210" date="September, 07 2021" sum="$844" actionName="View PDF" />
    </Card>
  );
}
