import React, { useState, useEffect, useCallback } from 'react';
import { Select, Flex, FormLabel, useColorModeValue, Text } from '@chakra-ui/react';

const generateOptions = (count) => {
  return Array.from({ length: count }, (_, i) => (
    <option key={i} value={i}>
      {i.toString().padStart(2, '0')}
    </option>
  ));
};

const CustomTimePicker = ({ label, onChange, extra, isRequired, id, value }) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleChange = useCallback((type, value) => {
    const intValue = parseInt(value, 10);
    if (type === 'hours') setHours(intValue);
    if (type === 'minutes') setMinutes(intValue);
    if (type === 'seconds') setSeconds(intValue);
  }, []);

  useEffect(() => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    onChange(totalSeconds);
  }, [hours, minutes, seconds, onChange]);

  useEffect(() => {
    const hrs = Math.floor(value / 3600);
    const mins = Math.floor((value % 3600) / 60);
    const secs = value % 60;
    setHours(hrs);
    setMinutes(mins);
    setSeconds(secs);
  }, [value]);

  return (
    <Flex direction="column" mb="25px" me="30px">
      <FormLabel
        display="flex"
        ms="10px"
        htmlFor={id}
        fontSize="sm"
        color={textColorPrimary}
        fontWeight="bold"
        _hover={{ cursor: 'pointer' }}
      >
        {label}
        {isRequired && <Text color={brandStars}>*</Text>}
        <Text fontSize="sm" fontWeight="400" ms="2px">
          {extra}
        </Text>
      </FormLabel>
      <Flex>
        <Select value={hours} onChange={(e) => handleChange('hours', e.target.value)}>
          {generateOptions(24)}
        </Select>
        <Select value={minutes} onChange={(e) => handleChange('minutes', e.target.value)}>
          {generateOptions(60)}
        </Select>
        <Select value={seconds} onChange={(e) => handleChange('seconds', e.target.value)}>
          {generateOptions(60)}
        </Select>
      </Flex>
    </Flex>
  );
};

export default CustomTimePicker;
