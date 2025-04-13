import React, { useRef, useState } from "react";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

interface ComponentProps {
  alt?: string;
  URI?: string;
  type?: string;
  vURI?: string | null;
}

export default function Component({ alt, URI, vURI, type }: ComponentProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlay = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
        toast.success("Turned the player on");
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        toast.success("Turned the player off");
        setIsPlaying(false);
      }
    }
  };

  const renderContent = () => {
    switch (type) {
      case "img":
        return (
          <img 
            alt={alt} 
            src={URI} 
            className="w-full h-auto max-h-screen object-contain rounded-lg shadow-lg" 
          />
        );
      case "video":
        return (
          <video 
            controls 
            src={URI} 
            className="w-full h-auto max-h-screen object-contain rounded-lg shadow-lg" 
          />
        );
      case "audio":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <img
              alt={alt}
              src={isPlaying ? "/_asset/static/sound-wave.gif" : "/_asset/static/music.avif"}
              className="w-4/5 h-auto object-contain rounded-lg shadow-lg mb-6"
            />
            <Button
              onClick={handlePlay}
              color={isPlaying ? "failure" : "success"}
              className="mt-4 px-6 py-2"
            >
              <FontAwesomeIcon
                icon={isPlaying ? faPauseCircle : faPlayCircle}
                className="mr-2 text-xl"
              />
              {isPlaying ? "Pause Audio" : "Play Audio"}
            </Button>
            <audio ref={audioRef} controls hidden>
              <source src={URI} type="audio/mp3" />
            </audio>
          </div>
        );
      case "visualaudio":
        return (
          <div className="flex flex-col items-center justify-center w-full">
            <img 
              alt={alt} 
              src={URI} 
              className="w-full h-auto max-h-screen object-contain rounded-lg shadow-lg mb-8" 
            />
            {vURI && (
              <>
                <div className="flex flex-col items-center mt-4 w-full max-w-md">
                  <img
                    alt="audio visualizer"
                    src={isPlaying ? "/_asset/static/sound-wave.gif" : "/_asset/static/music.avif"}
                    className="w-full h-32 object-contain rounded-lg shadow-md mb-4"
                  />
                  <Button
                    onClick={handlePlay}
                    color={isPlaying ? "failure" : "success"}
                    className="mt-2"
                  >
                    <FontAwesomeIcon
                      icon={isPlaying ? faPauseCircle : faPlayCircle}
                      className="mr-2"
                    />
                    {isPlaying ? "Pause Audio" : "Play Audio"}
                  </Button>
                  <audio ref={audioRef} controls hidden>
                    <source src={vURI} type="audio/mp3" />
                  </audio>
                </div>
              </>
            )}
          </div>
        );
      case "visualvideoans":
        return (
          <div className="flex flex-col items-center justify-center w-full">
            <img 
              alt={alt} 
              src={URI} 
              className="w-full h-auto max-h-screen object-contain rounded-lg shadow-lg mb-8" 
            />
            {vURI && (
              <div className="w-full mt-6">
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