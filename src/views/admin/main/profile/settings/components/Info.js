// Chakra imports
import { Button, Flex, FormControl, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';

import InputField from 'components/fields/InputField';
import Card from 'components/card/Card.js';

export default function Settings({ user, newImage, editMyInfo }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [mobileNumber, setMobileNumber] = useState(user.mobileNumber);

  const { t } = useTranslation();

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';

  const queryClient = useQueryClient();

  const errorNotify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  const handleFirstNameChange = (event) => {
    setFirstName(() => event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(() => event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(() => event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('mobileNumber', mobileNumber);
    if (newImage) formData.append('image', newImage);

    const response = await editMyInfo(formData);
    const message = response.data;

    if (response.success) {
      successNotify(message);
    } else if (typeof message.data === 'string') errorNotify(message.data);
    else
      for (const responseKey in message.data) {
        errorNotify(message.data[responseKey].message);
      }

    await queryClient.invalidateQueries({ queryKey: ['getMe'] });
  };

  return (
    <FormControl>
      <Card>
        <Flex direction="column" mb="40px" ms="10px">
          <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
            {t('Account Settings')}
          </Text>
          <Text fontSize="md" color={textColorSecondary}>
            {t('Here you can change user account information')}
          </Text>
        </Flex>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
          <InputField
            mb="25px"
            me="30px"
            id="first_name"
            label={t('FIRST NAME')}
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="John"
          />
          <InputField
            mb="25px"
            id="last_name"
            label={t('LAST NAME')}
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Doe"
          />
        </SimpleGrid>
        <InputField
          id="mobile_number"
          label={t('MOBILE NUMBER')}
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          placeholder="+9627xxxxxxxxx"
        />
        <Button variant="brand" minW="183px" fontSize="sm" fontWeight="500" ms="auto" onClick={handleSubmit}>
          {t('save')}
        </Button>
      </Card>
    </FormControl>
  );
}
