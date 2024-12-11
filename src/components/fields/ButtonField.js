// Chakra imports
import { Button, Spinner } from '@chakra-ui/react';
// Custom components
import React, { useState } from 'react';

function ButtonField(props) {
  const { disabled, onClick, label, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  };

  return (
    <Button
      fontSize="sm"
      variant="brand"
      fontWeight="500"
      h="50"
      onClick={onClickHandler}
      disabled={disabled || isLoading}
      {...rest}
    >
      {!isLoading ? label.toUpperCase() : <Spinner />}
    </Button>
  );
}

export default ButtonField;
