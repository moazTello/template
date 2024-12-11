import { useRef, useState } from 'react';
import ReactCrop, { convertToPixelCrop } from 'react-image-crop';
import { Text, Box, Icon, useColorModeValue, useTheme } from '@chakra-ui/react';
import { MdOutlineCloudUpload } from 'react-icons/md';

import ButtonField from 'components/fields/ButtonField';

import { convertToBlob, cropImage, setCanvasPreview, setCircleCanvasPreview } from './helper/imageHelper';
import NewDropzone from './NewDropzone';

const WIDTH = 100;
const HIEGHT = 100;

const Cropper = ({ closeModal, updateAvatar, image, setValue, ASPECT_RATIO, circularCrop }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(!image?.src ? URL.createObjectURL(image[0]) : '');

  const [crop, setCrop] = useState();

  const onImageLoad = (e) => {
    const centeredCrop = cropImage(e);
    setCrop(centeredCrop);
  };

  const cropAndSaveImage = async () => {
    if (circularCrop) {
      setCircleCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
      );
    } else {
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
      );
    }
    const dataUrl = !image?.src ? previewCanvasRef.current.toDataURL() : previewCanvasRef.current;
    try {
      const blob = await convertToBlob(dataUrl);
      const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
      updateAvatar(file);
      closeModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  const theme = useTheme();
  //eslint-disable-next-line
  const [lineColor, setLineColor] = useState(theme.colors.brand[500]);
  //eslint-disable-next-line
  const [lineColorDark, setLineColorDark] = useState(theme.colors.brand[400]);
  const brand = useColorModeValue(lineColor, lineColorDark);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  return (
    <>
      <NewDropzone
        setValue={setValue}
        customW={image.src ? '100%' : '100%'}
        customH={image.src ? '200px' : '60px'}
        customE={closeModal}
        customR="20px"
        imageState={setImgSrc}
        differenter={true}
        content={
          <Box>
            <Icon
              as={MdOutlineCloudUpload}
              w={image.src ? '100px' : '50px'}
              h={image.src ? '100px' : '50px'}
              color={textColor}
            />
            {image.src && (
              <>
                <Text mx="auto" mb="12px" fontSize="lg" fontWeight="700" whiteSpace="pre-wrap" color={textColor}>
                  Drop your files here, or{' '}
                  <Text as="span" fontSize="lg" fontWeight="700" color={brand}>
                    browse
                  </Text>
                </Text>
                <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                  PNG, JPG and GIF files are allowed
                </Text>
              </>
            )}
          </Box>
        }
      />
      {imgSrc && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={WIDTH}
            minHeight={HIEGHT}
            circularCrop={circularCrop}
          >
            <img ref={imgRef} src={imgSrc} alt="Upload" style={{ maxHeight: '70vh' }} onLoad={onImageLoad} />
          </ReactCrop>
          <ButtonField
            variant="brand"
            minW="183px"
            fontSize="sm"
            fontWeight="500"
            ms="auto"
            mt="20px"
            label={'Crop Image'}
            onClick={cropAndSaveImage}
          />
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          style={{
            display: 'none',
            border: '1px solid black',
            objectFit: 'contain',
            width: 900,
            height: 900,
            marginTop: '1rem',
          }}
        />
      )}
    </>
  );
};
export default Cropper;
