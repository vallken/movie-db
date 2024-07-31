"use client";

import { CldImage } from 'next-cloudinary';

export default function CloudinaryImage({ src, alt, ...props }) {
  return (
    <CldImage
      width="400"
      height="600"
      src={src}
      alt={alt}
      {...props}
    />
  );
}