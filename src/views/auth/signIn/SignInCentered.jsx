import React from 'react';

import { Box, Flex, FormControl, Heading, useColorModeValue, Text } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import InputField from 'components/fields/InputField';
import InputFieldPassword from 'components/fields/InputFieldPassword';

import CenteredAuth from 'layouts/auth/types/Centered';
import ButtonField from 'components/fields/ButtonField';

import { login } from '../../../apis/index';

import { useAuthStore } from '../../../store/useAuthStore';

function SignIn() {
  const { t } = useTranslation();
  const { setUser, resetData } = useAuthStore();

  const {
    register,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const navigate = useNavigate();

  const errorNotify = (message) => toast.error(message);

  const successNotify = () => toast.success('You are logged in successfully');
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';

  const handleLogin = async () => {
    const data = getValues();
    try {
      const response = await login(data);
      setUser(response.data);
      localStorage.setItem('token', response.token);
      successNotify();
      navigate('/admin', { replace: true });
    } catch (error) {
      setError('form', error.data);
      resetData();
      errorNotify(error);
    }
  };

  return (
    <CenteredAuth cardTop={{ base: '140px', md: '14vh' }} cardBottom={{ base: '50px', lg: 'auto' }} mx="0px">
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        justifyContent="center"
        px={{ base: '20px', md: '0px' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            {t('signIn')}
          </Heading>
          <Text mb="36px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md">
            {t('enterYourEmailAndPasswordToSignIn')}
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <FormControl>
            <InputField
              mb="25px"
              me="30px"
              id="email"
              label={t('email')}
              register={register('email')}
              error={errors.form}
              isRequired
            />
            <InputFieldPassword
              id="password"
              label={t('password')}
              register={register('password')}
              error={errors.form}
              isRequired
            />
            <ButtonField label={t('signIn')} onClick={handleLogin} w="100%" mb="24px" />
          </FormControl>
        </Flex>
      </Flex>
    </CenteredAuth>
  );
}

export default SignIn;
