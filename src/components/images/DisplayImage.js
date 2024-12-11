import { useEffect, useState } from 'react';

import { getImage } from '../../apis';

function DisplayImage({ url, alt }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      const image = await getImage(url);
      setImage(image);
    }

    fetchImage();
  }, [setImage, url]);

  return <img src={image} alt={alt} />;
}

export default DisplayImage;
