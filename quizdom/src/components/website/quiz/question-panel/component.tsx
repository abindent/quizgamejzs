// Component.tsx with Fixed TypeScript Interface
import React, { useState } from "react";
import { toast } from "react-toastify";
import EnhancedAudioPlayer from "./audio";

interface ComponentProps {
  alt?: string;
  URI?: string;  // Made optional by adding the ? here
  type?: string;
  vURI?: string | null;
}

export default function Component({ alt, URI, vURI, type }: ComponentProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  
  // Handle audio play state changes from the EnhancedAudioPlayer
  const handleAudioPlayStateChange = (isPlaying: boolean) => {
    setIsAudioPlaying(isPlaying);
  };

  const renderContent = () => {
    switch (type) {
      case "img":
        return URI ? (
          <img 
            alt={alt} 
            src={URI} 
            className="w-full h-auto max-h-screen object-contain rounded-lg shadow-lg" 
          />
        ) : (
          <div className="text-red-500">Image source is missing</div>
        );
      case "video":
        return URI ? (
          <video 
            controls 
            src={URI} 
            className="w-full h-auto max-h-screen object-contain rounded-lg shadow-lg" 
          />
        ) : (
          <div className="text-red-500">Video source is missing</div>
        );
      case "audio":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full py-4">
            <EnhancedAudioPlayer 
              src={URI} 
              title={alt || "Audio Track"} 
              showVisualizer={true}
              onPlayStateChange={handleAudioPlayStateChange}
              className="w-full max-w-lg"
            />
          </div>
        );
      case "visualaudio":
        return (
          <div className="flex flex-col items-center justify-center w-full gap-8">
            {URI && (
              <img 
                alt={alt} 
                src={URI} 
                className="w-full h-auto max-h-screen object-contain rounded-lg shadow-lg" 
              />
            )}
            {vURI && (
              <div className="w-full max-w-xl">
                <EnhancedAudioPlayer 
                  src={vURI} 
                  title={`Audio for ${alt || "Visual Question"}`} 
                  showVisualizer={true}
                  onPlayStateChange={handleAudioPlayStateChange}
                  className="w-full"
                />
              </div>
            )}
          </div>
        );
      case "visualvideoans":
        return (
          <div className="flex flex-col items-center justify-center w-full gap-8">
            {URI && (
              <img 
                alt={alt} 
                src={URI} 
                className="w-full h-auto max-h-screen object-contain rounded-lg shadow-lg" 
              />
            )}
            {vURI && (
              <div className="w-full mt-4">
                <video 
                  controls 
                  src={vURI} 
                  className="w-full h-auto max-h-screen object-contain rounded-lg shadow-lg" 
                />
              </div>
            )}
          </div>
        );
      default:
        return <div className="text-red-500">Unsupported content type</div>;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {renderContent()}
    </div>
  );
}