import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Download, Share2, Heart } from "lucide-react";
import imageLinks from "../data/ImageLinks.json";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [likes, setLikes] = useState({});
  const [likedImages, setLikedImages] = useState({});
  const [animatingHearts, setAnimatingHearts] = useState({});

  useEffect(() => {
    const formatted = imageLinks.map((url, idx) => ({
      id: idx,
      url,
      title: `${idx + 1}`,
    }));
    setImages(formatted);

    const storedLikes = JSON.parse(localStorage.getItem("galleryLikes")) || {};
    const initialLikes = {};
    const initialLikedImages = {};

    formatted.forEach((img) => {
      initialLikes[img.id] = storedLikes[img.id]?.count || 0;
      initialLikedImages[img.id] = storedLikes[img.id]?.liked || false;
    });

    setLikes(initialLikes);
    setLikedImages(initialLikedImages);
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

  const toggleLike = (e, id) => {
    e.stopPropagation();

    // Trigger animation always
    setAnimatingHearts((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAnimatingHearts((prev) => ({ ...prev, [id]: false }));
    }, 600);

    // If already liked from this device, don't increase count
    if (likedImages[id]) return;

    setLikes((prev) => {
      const updated = { ...prev, [id]: prev[id] + 1 };
      saveToLocalStorage(id, updated[id], true);
      return updated;
    });

    setLikedImages((prev) => ({ ...prev, [id]: true }));
  };

  const saveToLocalStorage = (id, count, liked) => {
    const stored = JSON.parse(localStorage.getItem("galleryLikes")) || {};
    stored[id] = { count, liked };
    localStorage.setItem("galleryLikes", JSON.stringify(stored));
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
      <header className="w-full max-w-6xl text-center mb-8 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-800 via-white to-indigo-800 bg-clip-text text-transparent mb-6"
          >
          Event Gallery
        </motion.h2>
        <div className="mx-auto mt-3 w-40 h-1 rounded-full bg-gradient-to-r from-[#C8101A] via-[#FF4F01] to-[#FFF9D5] shadow-md" />
      </header>
    <section className="py-16 px-6 bg-black">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
        Event Gallery
      </h2>

      {/* Grid */}
      <div className="sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
        {images.map((img, idx) => (
          <motion.div
            key={img.id}
            whileHover={{ scale: 1.03 }}
            className="relative break-inside-avoid rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border-2 border-transparent hover:border-yellow-400 transition-all duration-300"
            onClick={() => setSelectedIndex(idx)}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:brightness-110 rounded-3xl"
              loading="lazy"
            />

            {/* Heart animation */}
            <AnimatePresence>
              {animatingHearts[img.id] && (
                <motion.div
                  key="heart"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <Heart size={100} className="text-red-500 fill-red-500 drop-shadow-lg" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-3 sm:p-4 rounded-3xl">
              <p className="text-white font-semibold text-sm sm:text-base md:text-lg backdrop-blur-sm bg-black/30 px-2 py-1 rounded">
                {img.title}
              </p>

              {/* Like button */}
              <motion.button
                whileTap={{ scale: 1.3 }}
                onClick={(e) => toggleLike(e, img.id)}
                className="flex items-center gap-1 text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded transition hover:text-red-500"
              >
                <Heart
                  size={35}
                  className={likes[img.id] > 0 ? "text-red-500 fill-red-500" : "fill-current"}
                />
                <span className="text-2xl">{likes[img.id] || 0}</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 sm:p-6"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white p-3 sm:p-4 rounded-full bg-black/50 hover:text-black/90 hover:bg-white/40 transition"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 sm:left-6 text-white p-3 sm:p-4 rounded-full bg-black/50 hover:text-black/90 hover:bg-white/40 transition"
            onClick={prevImage}
          >
            <ArrowLeft size={28} />
          </button>

          {/* Next */}
          <button
            className="absolute right-4 sm:right-6 text-white p-3 sm:p-4 rounded-full bg-black/50 hover:text-black/90 hover:bg-white/40 transition"
            onClick={nextImage}
          >
            <ArrowRight size={28} />
          </button>

          {/* Heart animation in fullscreen */}
          <AnimatePresence>
            {animatingHearts[selectedImage.id] && (
              <motion.div
                key="heart-fullscreen"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Heart size={150} className="text-red-500 fill-red-500 drop-shadow-2xl" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="absolute bottom-4 sm:bottom-6 flex gap-3 sm:gap-4">
            {/* Like button in fullscreen */}
            <motion.button
              whileTap={{ scale: 1.3 }}
              onClick={(e) => toggleLike(e, selectedImage.id)}
              className="flex items-center gap-1 text-white bg-black/50 backdrop-blur-sm px-3 py-2 rounded transition hover:text-red-500"
            >
              <Heart
                size={22}
                className={
                  likes[selectedImage.id] > 0 ? "text-red-500 fill-red-500" : "fill-current"
                }
              />
              <span className="text-base">{likes[selectedImage.id] || 0}</span>
            </motion.button>

            <button
              className="text-white p-3 sm:p-4 rounded-full bg-black/50 hover:text-black/90 hover:bg-white/40 transition"
              onClick={downloadImage}
            >
              <Download size={28} />
            </button>
            <button
              className="text-white p-3 sm:p-4 rounded-full bg-black/50 hover:text-black/90 hover:bg-white/40 transition"
              onClick={shareImage}
            >
              <Share2 size={28} />
            </button>
          </div>

          <motion.img
            src={selectedImage.url}
            alt={selectedImage.title}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-2xl object-contain"
          />
        </div>
      )}
    </section>
  );
}
