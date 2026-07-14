import React from 'react';

export interface ProductGalleryProps {
  images: string[];
  selectedImage: number;
  onSelectImage: (index: number) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  selectedImage,
  onSelectImage
}) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 flex-1 lg:max-w-[50%] xl:max-w-[55%]">
      {/* Thumbnails */}
      <div className="flex flex-row sm:flex-col gap-3.5 justify-center sm:justify-start">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelectImage(i)}
            className={`w-20 h-24 md:w-28 md:h-32 rounded-2xl overflow-hidden bg-[#F0EEED] relative border-2 transition-all cursor-pointer ${
              selectedImage === i ? 'border-black' : 'border-transparent opacity-80 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main active view */}
      <div className="flex-1 aspect-[3/4] rounded-3xl bg-[#F0EEED] overflow-hidden relative flex items-center justify-center max-h-[600px] xl:max-h-[700px] 2xl:max-h-[800px]">
        <img
          src={images[selectedImage]}
          alt="Active Product View"
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
