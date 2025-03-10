"use client";
import config from '@/lib/config';
import { IKVideo, ImageKitProvider } from 'imagekitio-next';
import React from 'react';

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <ImageKitProvider 
        publicKey={config.env.imagekit.publicKey} 
        urlEndpoint={config.env.imagekit.urlEndpoint}>
        <IKVideo 
            path="https://ik.imagekit.io/pwd17k26p/books/videos/file_jO3MUj8-s.png"
            controls={true}
            className="w-full rounded-xl"
        />
        
        
    </ImageKitProvider>
  );
};

export default BookVideo;