import React, { useEffect, useState } from "react";

export const DogImg = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [photographer, setPhotographer] = useState(null);
  const [link, setLink] = useState(null);

  useEffect(() => {
    const fetchDogImage = async () => {
      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=dog&client_id=${
          import.meta.env.REACT_APP_UNSPLASH_ACCESS_KEY
        }`
      );
      const data = await res.json();
      setImageUrl(data.urls.small);
      setPhotographer(data.user.name);
      setLink(data.user.links.html);
    };

    fetchDogImage();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🐶 犬イラストっぽい画像ビューア</h1>
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="Random dog"
            style={{ borderRadius: "10px", maxWidth: "100%" }}
          />
          <p>
            📸 Photo by{" "}
            <a href={link} target="_blank" rel="noopener noreferrer">
              {photographer}
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
