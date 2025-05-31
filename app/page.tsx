"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Componente para mostrar iconos de Icons8
const SocialIcon = ({ platform }: { platform: string }) => {
  const iconUrls: Record<string, string> = {
    "TikTok": "https://img.icons8.com/?size=256&id=oKHadYScUe2I&format=png",
    "YouTube": "https://img.icons8.com/?size=256&id=qLVB1tIe9Ts9&format=png",
    "Facebook": "https://img.icons8.com/?size=256&id=jZ0kw76QEzJU&format=png",
    "Twitter": "https://img.icons8.com/?size=256&id=vzeEiquVUR7e&format=png",
    "Instagram": "https://img.icons8.com/?size=256&id=nj0Uj45LGUYh&format=png"
  }

  return (
    <div className="mb-8 animate-bounce flex justify-center">
      <Image 
        src={iconUrls[platform] || ""} 
        alt={`${platform} icon`} 
        width={120} 
        height={120}
        quality={100}
        unoptimized={true}
        className="w-24 h-24 object-contain"
      />
    </div>
  )
}

// Añadir interfaces para los tipos de stories
interface YouTubeStory {
  id: string;
  type: "youtube";
  videoId: string;
  duration: number;
  title: string;
}

interface VideoStory {
  id: string;
  type: "video";
  content?: string;
  duration: number;
  title: string;
}

interface SocialStory {
  id: string;
  type: "social";
  platform: string;
  username: string;
  url: string;
  color: string;
  icon: string;
  duration: number;
}

type Story = YouTubeStory | VideoStory | SocialStory;

const stories: Story[] = [
  {
    id: "video",
    type: "youtube",
    videoId: "jpN0G5AmH9Q",
    duration: 6000, // 10 seconds
    title: "¡Bienvenido!",
  },
  {
    id: "tiktok",
    type: "social",
    platform: "TikTok",
    username: "@puertajada",
    url: "https://tiktok.com/@puertajada",
    color: "from-black to-gray-800",
    icon: "TikTok",
    duration: 5000,
  },
  {
    id: "youtube",
    type: "social",
    platform: "YouTube",
    username: "Tu Canal",
    url: "https://youtube.com/@puertajada",
    color: "from-red-600 to-red-800",
    icon: "YouTube",
    duration: 5000,
  },
  {
    id: "instagram",
    type: "social",
    platform: "Instagram",
    username: "@puertajada",
    url: "https://instagram.com/puertajada",
    color: "from-purple-600 via-pink-600 to-orange-500",
    icon: "Instagram",
    duration: 5000,
  },
  {
    id: "twitter",
    type: "social",
    platform: "Twitter",
    username: "@puertajada",
    url: "https://twitter.com/puertajada",
    color: "from-gray-900 to-blue-600",
    icon: "Twitter",
    duration: 5000,
  },
  {
    id: "facebook",
    type: "social",
    platform: "Facebook",
    username: "Tu Página",
    url: "https://facebook.com/puertajada",
    color: "from-blue-600 to-blue-800",
    icon: "Facebook",
    duration: 5000,
  },
]

// Componente YouTube para mostrar videos/shorts con interfaz mínima
const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // Intentamos asegurar que el video se reproduzca automáticamente
    const checkAndPlayVideo = () => {
      if (iframeRef.current) {
        // Intentamos enviar un mensaje al iframe para iniciar la reproducción
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    };
    
    // Intentamos varias veces durante los primeros segundos
    const timer1 = setTimeout(checkAndPlayVideo, 1000);
    const timer2 = setTimeout(checkAndPlayVideo, 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  
  return (
    <div className="youtube-embed-container w-full h-full">
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&color=white&iv_load_policy=3&playsinline=1&enablejsapi=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full absolute top-0 left-0"
      ></iframe>
    </div>
  );
};

export default function RetroLinkTree() {
  const [currentStory, setCurrentStory] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPaused) return

    const duration = stories[currentStory].duration
    const increment = 100 / (duration / 50) // Update every 50ms

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextStory()
          return 0
        }
        return prev + increment
      })
    }, 50)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentStory, isPaused, stories])

  const nextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory((prev) => prev + 1)
      setProgress(0)
    } else {
      setCurrentStory(0)
      setProgress(0)
    }
  }

  const prevStory = () => {
    if (currentStory > 0) {
      setCurrentStory((prev) => prev - 1)
      setProgress(0)
    }
  }

  const handleStoryClick = (index: number) => {
    setCurrentStory(index)
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPaused(!isPaused)
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const currentStoryData = stories[currentStory]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm mx-auto">
        {/* Progress bars */}
        <div className="flex gap-1 mb-4 px-2">
          {stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden cursor-pointer"
              onClick={() => handleStoryClick(index)}
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: index === currentStory ? `${progress}%` : index < currentStory ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Story container */}
        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
          {/* Navigation areas */}
          <div className="absolute left-0 top-0 w-1/3 h-full z-20 cursor-pointer" onClick={prevStory} />
          <div className="absolute right-0 top-0 w-1/3 h-full z-20 cursor-pointer" onClick={nextStory} />

          {/* Play/Pause button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-30 text-white hover:bg-white/20"
            onClick={togglePlayPause}
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </Button>

          {/* Story content */}
          <div className="relative w-full h-full">
            {currentStoryData.type === "youtube" ? (
              <div className="relative w-full h-full bg-black">
                <div className="absolute inset-0 z-10 flex items-center justify-center h-full">
                  <YouTubeEmbed videoId={(currentStoryData as YouTubeStory).videoId} />
                </div>
              </div>
            ) : currentStoryData.type === "video" ? (
              <div className="relative w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="text-6xl mb-6 animate-bounce">🎮</div>
                  <h1 className="text-white text-2xl mb-4 pixel-font animate-pulse">¡BIENVENIDO!</h1>
                  <p className="text-white/80 text-sm pixel-font">Desliza para ver mis redes</p>
                  <div className="mt-8 grid grid-cols-2 gap-2">
                    {["⭐", "🚀", "💫", "🎯"].map((emoji, i) => (
                      <div key={i} className="text-2xl animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`relative w-full h-full bg-gradient-to-br ${currentStoryData.color}`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
                  <SocialIcon platform={currentStoryData.platform} />
                  <h2 className="text-white text-3xl mb-2 pixel-font drop-shadow-lg">{currentStoryData.platform}</h2>
                  <p className="text-white/90 text-lg mb-8 pixel-font">{currentStoryData.username}</p>
                  <a
                    href={currentStoryData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black px-8 py-4 rounded-full pixel-font text-sm font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    SEGUIR
                  </a>

                  {/* Decorative elements */}
                  <div className="absolute top-8 left-8 text-white/30 text-2xl animate-spin">⚡</div>
                  <div className="absolute bottom-8 right-8 text-white/30 text-2xl animate-ping">✨</div>
                  <div className="absolute top-1/4 right-8 text-white/20 text-xl animate-pulse">🎮</div>
                  <div className="absolute bottom-1/4 left-8 text-white/20 text-xl animate-bounce">🎯</div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/20"
            onClick={prevStory}
            disabled={currentStory === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/20"
            onClick={nextStory}
            disabled={currentStory === stories.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Story indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {stories.map((story, index) => (
            <button
              key={story.id}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStory ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
              }`}
              onClick={() => handleStoryClick(index)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 pixel-font text-xs">
            Toca los lados para navegar • Mantén presionado para pausar
          </p>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .pixel-font {
          font-family: 'Press Start 2P', cursive;
          line-height: 1.6;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
        
        /* Estilos para el embed de YouTube */
        .youtube-embed-container {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100%;
          max-width: 400px;
          max-height: 100%;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }
        
        .youtube-embed-container::after {
          content: "";
          display: block;
          padding-bottom: 177.78%; /* Proporción para shorts/vertical video (9:16) */
        }
        
        .youtube-embed-container iframe {
          border: none !important;
          border-radius: 12px;
          background: black;
        }
      `}</style>
    </div>
  )
}
