import { useRef } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { IoPersonCircle } from 'react-icons/io5';
import { Icon } from '@chakra-ui/react';

import Cropper from './Cropper';
import CustomModal from '../CustomModal/CustomModal';

const Profile = ({ image, setValue, setModalOpen, modalOpen, radius, ASPECT_RATIO, circularCrop }) => {
  const avatarUrl = useRef('https://avatarfiles.alphacoders.com/161/161002.jpg');
  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
    const fileList = [imgSrc];
    setValue('image', fileList);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '' }}>
      <div style={{ position: 'relative' }}>
        {image && (
          <img
            src={!image?.src && image[0] ? URL.createObjectURL(image[0]) : image?.src}
            alt="Avatar"
            style={{ width: '150px', height: '150px', borderRadius: radius, borderWidth: '2px' }}
          />
        )}
        {!image && (
          <IoPersonCircle style={{ width: '150px', height: '150px', borderRadius: '999px', borderWidth: '2px' }} />
        )}
        <button
          style={{
            position: 'absolute',
            bottom: '-1.15rem',
            left: '0px',
            right: '0px',
            margin: 'auto',
            width: '35px',
            height: '35px',
            padding: '.35rem',
            borderRadius: '999px',
            backgroundColor: 'white',
            border: 'solid gray',
          }}
          title="Change photo"
          onClick={() => setModalOpen(!modalOpen)}
        >
          <Icon as={FaPencil} color="black" h="16px" w="16px" />
        </button>
      </div>
      {modalOpen && (
        <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <Cropper
            updateAvatar={updateAvatar}
            closeModal={setModalOpen}
            image={image}
            setValue={setValue}
            ASPECT_RATIO={ASPECT_RATIO}
            circularCrop={circularCrop}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default Profile;
