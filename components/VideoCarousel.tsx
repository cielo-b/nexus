import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Film,
} from "lucide-react";

interface Video {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
}

interface HeaderProps {
  title: string;
  icon: React.ReactNode;
}

// Video data structure for local videos
const videos: Video[] = [
  {
    id: 1,
    title: "Data Analytics Workshop",
    description: "Learn advanced data analytics techniques and best practices",
    videoUrl: "/videos/vid1.mp4",
    duration: "5:30",
  },
  {
    id: 2,
    title: "Digital Transformation Success Story",
    description:
      "How we helped Fortune 500 companies modernize their operations",
    videoUrl: "/videos/vid2.mp4",
    duration: "8:45",
  },
  {
    id: 3,
    title: "Client Testimonial",
    description: "Real feedback from satisfied customers about our services",
    videoUrl: "/videos/vid3.mp4",
    duration: "3:15",
  },
  {
    id: 4,
    title: "Product Demo",
    description: "See our latest features and capabilities in action",
    videoUrl: "/videos/vid4.mp4",
    duration: "6:20",
  },
];

const Header: React.FC<HeaderProps> = ({ title, icon }) => (
  <div className="flex items-center gap-3 mb-8">
    {icon}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
  </div>
);

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<any>({});
  const [isMuted, setIsMuted] = useState<any>({});
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState<any>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const videoRefs: any = useRef({});
  const containerRef: any = useRef(null);
  const autoplayTimerRef: any = useRef(null);

  // Auto-advance carousel
  const startAutoplay = useCallback(() => {
    if (!isAutoplay) return;

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 4000);
  }, [isAutoplay]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    stopAutoplay();
    setTimeout(startAutoplay, 2000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    stopAutoplay();
    setTimeout(startAutoplay, 2000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    stopAutoplay();
    setTimeout(startAutoplay, 2000);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Video control functions
  const togglePlay = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video: any = videoRefs.current[videoId];
    
    if (!video) return;

    if (isPlaying[videoId]) {
      video.pause();
      setIsPlaying((prev: any) => ({ ...prev, [videoId]: false }));
    } else {
      video.play();
      setIsPlaying((prev: any) => ({ ...prev, [videoId]: true }));
    }
  };

  const toggleMute = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[videoId];
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted((prev: any) => ({ ...prev, [videoId]: video.muted }));
  };

  const handleVideoHover = (videoId: number, isEntering: boolean) => {
    setHoveredVideo(isEntering ? videoId : null);

    if (isEntering) {
      stopAutoplay();
    } else {
      setTimeout(startAutoplay, 1000);
    }
  };

  // Calculate visible slides based on screen size
  const getVisibleSlides = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleSlides, setVisibleSlides] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get slides to display with proper centering
  const getDisplaySlides = () => {
    const slides: (Video & { displayIndex: number })[] = [];
    const totalSlides = videos.length;

    for (let i = 0; i < visibleSlides; i++) {
      const index =
        (currentIndex - Math.floor(visibleSlides / 2) + i + totalSlides) %
        totalSlides;
      slides.push({ ...videos[index], displayIndex: i });
    }

    return slides;
  };

  const displaySlides = getDisplaySlides();
  const centerIndex = Math.floor(visibleSlides / 2);

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header
          title="Featured Videos"
          icon={<Film className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />}
        />

        {/* Autoplay Toggle */}
        {/* <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isAutoplay 
                ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isAutoplay ? 'Autoplay On' : 'Autoplay Off'}
          </button>
        </div> */}

        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main carousel container */}
          <div className="flex transition-transform duration-500 ease-out">
            {displaySlides.map((video, slideIndex) => {
              const isCenter = slideIndex === centerIndex;
              const distance = Math.abs(slideIndex - centerIndex);

              return (
                <div
                  key={`${video.id}-${slideIndex}`}
                  className={`flex-shrink-0 px-2 sm:px-4 transition-all duration-500 ${
                    visibleSlides === 1
                      ? "w-full"
                      : visibleSlides === 2
                        ? "w-1/2"
                        : "w-1/3"
                  }`}
                  style={{
                    transform: `scale(${isCenter ? 1 : 0.85}) translateY(${isCenter ? 0 : distance * 10}px)`,
                    opacity: isCenter ? 1 : 0.7,
                    zIndex: isCenter ? 10 : 5 - distance,
                  }}
                >
                  <div
                    className={`bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer transform transition-all duration-300 hover:shadow-2xl ${
                      isCenter ? "hover:scale-105" : "hover:scale-95"
                    }`}
                    onMouseEnter={() => handleVideoHover(video.id, true)}
                    onMouseLeave={() => handleVideoHover(video.id, false)}
                    onClick={() =>
                      !isCenter &&
                      goToSlide(videos.findIndex((v) => v.id === video.id))
                    }
                  >
                    <div className="relative aspect-video bg-gray-900">
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[video.id] = el;
                        }}
                        src={video.videoUrl}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        playsInline
                        muted={isMuted[video.id] !== false}
                        onPlay={() =>
                          setIsPlaying((prev: any) => ({
                            ...prev,
                            [video.id]: true,
                          }))
                        }
                        onPause={() =>
                          setIsPlaying((prev: any) => ({
                            ...prev,
                            [video.id]: false,
                          }))
                        }
                      />

                      {/* Video overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                          hoveredVideo === video.id || isPlaying[video.id]
                            ? "opacity-50"
                            : "opacity-80"
                        }`}
                      />

                      {/* Duration badge */}
                      {/* <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration}
                      </div> */}

                      {/* Video controls */}
                      {(hoveredVideo === video.id || isPlaying[video.id]) &&
                        isCenter && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={(e) => togglePlay(video.id, e)}
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                              >
                                {isPlaying[video.id] ? (
                                  <Pause className="w-6 h-6" />
                                ) : (
                                  <Play className="w-6 h-6 ml-1" />
                                )}
                              </button>
                              <button
                                onClick={(e) => toggleMute(video.id, e)}
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                              >
                                {isMuted[video.id] ? (
                                  <VolumeX className="w-4 h-4" />
                                ) : (
                                  <Volume2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                      {/* Play icon for non-center slides */}
                      {!isCenter && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white/80" />
                        </div>
                      )}
                    </div>

                    {/* Video info */}
                    {/* <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                        {video.description}
                      </p>
                    </div> */}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Next video"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>

        {/* Video counter */}
        <div className="text-center mt-4 text-gray-600">
          <span className="text-sm">
            {currentIndex + 1} of {videos.length} videos
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;
