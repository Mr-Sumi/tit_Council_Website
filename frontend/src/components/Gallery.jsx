import React, { useEffect, useState } from "react";
import imageLinks from "../data/ImageLinks1.json"; // your JSON file

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Format JSON into objects with id and url
    const formatted = imageLinks.map((url, idx) => ({
      id: idx,
      url,
    }));
    setImages(formatted);
  }, []);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
      <header className="w-full max-w-6xl text-center mb-8 px-4">
        <h2 className="text-4xl md:text-6xl uppercase font-extrabold tracking-tight text-gray-800 mb-6">
          Event Gallery
        </h2>
        <div className="mx-auto mt-3 w-40 h-1 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-200 shadow-md" />
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative overflow-hidden rounded-xl shadow-lg border border-gray-200"
          >
            <img
              src={img.url}
              alt={`Image ${img.id + 1}`}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
