import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalHeader } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

const CustomModal = ({ modalOpen, setModalOpen, children, footerChildren, headerChildren, ...rest }) => {
  const { isOpen } = useDisclosure({
    isOpen: modalOpen,
  });

  return (
    <Modal isOpen={isOpen} onClose={() => setModalOpen(!modalOpen)} isCentered {...rest}>
      <ModalOverlay />
      <ModalContent>
        {headerChildren && <ModalHeader>{headerChildren}</ModalHeader>}
        <ModalBody mt={5} mb={5}>
          {children}
        </ModalBody>
        {footerChildren && <ModalFooter>{footerChildren}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
