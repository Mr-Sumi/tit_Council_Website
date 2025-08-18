import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Download, Share2 } from "lucide-react";
import imageLinks from "../data/ImageLinks.json"; // simple array of URLs

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const formatted = imageLinks.map((url, idx) => ({
      id: idx,
      url,
      title: `Event ${idx + 1}`,
    }));
    setImages(formatted);
  }, []);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const downloadImage = (e) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = selectedImage.url;
    link.download = selectedImage.title;
    link.click();
  };

  const shareImage = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedImage.title,
          url: selectedImage.url,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <section className="py-16 px-6 bg-black">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
        Event Gallery
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {images.map((img, idx) => (
          <motion.div
            key={img.id}
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl group cursor-pointer border-2 border-transparent hover:border-yellow-400 transition-all duration-300"
            onClick={() => setSelectedIndex(idx)}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-64 sm:h-72 md:h-80 lg:h-72 xl:h-64 object-cover transform transition-transform duration-500 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 rounded-3xl">
              <p className="text-white font-semibold text-lg sm:text-xl backdrop-blur-sm bg-black/30 px-2 py-1 rounded">
                {img.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white p-5 rounded-full bg-black/50 hover:text-black/90 hover:bg-white/40 transition"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
          >
            <X size={40} />
          </button>

          {/* Prev Button */}
          <button
            className="absolute left-6 text-white p-5 rounded-full bg-black/50 hover:text-black/90 hover:bg-white/40 transition"
            onClick={prevImage}
          >
            <ArrowLeft size={40} />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-6 text-white p-5 rounded-full bg-black/50 hover:text-black/90 hover:bg-white/40 transition"
            onClick={nextImage}
          >
            <ArrowRight size={40} />
          </button>

          {/* Download & Share */}
          <div className="absolute bottom-6 flex gap-4">
            <button
              className="text-white p-5 rounded-full bg-black/50 hover:text-black/90 hover:bg-white/40 transition"
              onClick={downloadImage}
            >
              <Download size={40} />
            </button>
            <button
              className="text-white p-5 rounded-full bg-black/50 hover:text-black/90 hover:bg-white/40 transition"
              onClick={shareImage}
            >
              <Share2 size={40} />
            </button>
          </div>

          <motion.img
            src={selectedImage.url}
            alt={selectedImage.title}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-2xl object-cover"
          />
        </div>
      )}
    </section>
  );
}
