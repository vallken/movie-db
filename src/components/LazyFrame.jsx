"use client";
import { useEffect, useState } from "react";

const VideoPlayer = ({ src }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      setIsMobile(mobileRegex.test(userAgent.toLowerCase()));
    };

    checkMobile();
  }, []);

  if (isMobile && !(src.includes("emturbovip.com") || src.includes("emturbovid.com"))) {
    return <p>Link tidak tersedia</p>;
  }

  if (isMobile) {
    return (
      <iframe
        src={src}
        width="100%"
        height="315"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture"
        style={{ maxWidth: "100%", aspectRatio: "16 / 9" }}
      />
    );
  }

  return (
    <div>
      <p>
        Video tidak tersedia untuk perangkat desktop. Silakan buka link ini di
        perangkat mobile{" "}
      </p>
    </div>
  );
};

export default VideoPlayer;
