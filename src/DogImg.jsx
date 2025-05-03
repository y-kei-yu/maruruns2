import { useEffect, useState } from "react";

export const DogImg = () => {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    const apiKey = import.meta.env.VITE_REACT_APP_UNSPLASH_ACCESS_KEY;
    const fetchImage = async () => {
      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=dog&client_id=${apiKey}`
      );
      const data = await res.json();
      setImageUrl(data.urls.small);
    };

    fetchImage();
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={imageUrl}
          alt="Random dog"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
