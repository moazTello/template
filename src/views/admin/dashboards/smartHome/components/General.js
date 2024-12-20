// Chakra imports
import { Flex, Icon, Select, Text, useColorModeValue, SimpleGrid } from '@chakra-ui/react';

// Custom components
import React from 'react';
import { MdAcUnit, MdWifi, MdThermostat, MdOutlineLightbulb, MdOutlineLocationOn } from 'react-icons/md';

import Card from 'components/card/Card.js';
import Controller from 'views/admin/dashboards/smartHome/components/Controller';
// Assets

export default function CircularProgress() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  return (
    <Card p="30px">
      <Text fontSize="lg" lineHeight="100%" color={textColor} fontWeight="bold">
        General Controllers
      </Text>
      <Flex align="center" mb="20px">
        <Icon as={MdOutlineLocationOn} color="secondaryGray.600" h="16px" w="16px" />
        <Select fontSize="sm" variant="subtle" defaultValue="Dinner" width="unset" ms="-10px" fontWeight="700">
          <option value="Dinner">Dinner Room</option>
          <option value="Living">Living Room</option>
          <option value="Bedroom">Bedroom</option>
        </Select>
      </Flex>

      <SimpleGrid columns="2" gap="20px">
        <Controller initial text="Air Conditioner" onValue="ON" offValue="OFF" icon={MdAcUnit} />
        <Controller initial text="Wi-Fi" onValue="Active" offValue="Inactive" icon={MdWifi} />
        <Controller initial text="Thermostat" onValue="ON" offValue="OFF" icon={MdThermostat} />
        <Controller initial={false} text="Lights" onValue="ON" offValue="OFF" icon={MdOutlineLightbulb} />
      </SimpleGrid>
    </Card>
  );
}
