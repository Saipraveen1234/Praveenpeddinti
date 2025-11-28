import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import ProjectImage from './ProjectImage';

const ProjectGallery = ({ images = [], projectName = "Project" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // If no images are provided, show a placeholder
  if (images.length === 0) {
    images = ["placeholder-project.jpg"];
  }

  const navigateNext = (e) => {
    e.stopPropagation();
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first image
    }
  };

  const navigatePrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(images.length - 1); // Loop to the last image
    }
  };

  // Toggle fullscreen view
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Render the fullscreen gallery
  const renderFullscreenGallery = () => {
    return (
      <div 
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center"
        onClick={toggleFullscreen}
      >
        <button 
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white z-50 transition-colors"
          onClick={toggleFullscreen}
        >
          <X className="w-6 h-6" />
        </button>
        
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white z-50 transition-colors"
          onClick={navigatePrev}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white z-50 transition-colors"
          onClick={navigateNext}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <div className="max-w-4xl max-h-[80vh] w-full relative">
          <ProjectImage 
            imageName={images[currentIndex]} 
            alt={`${projectName} - Image ${currentIndex + 1}`}
            className="w-full h-full rounded-lg"
          />
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white/80 px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    );
  };

  // Render the normal gallery
  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-white/20 shadow-2xl group">
      <ProjectImage 
        imageName={images[currentIndex]} 
        alt={`${projectName} - Image ${currentIndex + 1}`}
        className="w-full aspect-video object-cover"
      />
      
      {/* Navigation controls - only visible when hovering */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button 
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
              onClick={navigatePrev}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
              onClick={navigateNext}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        
        {/* Fullscreen button */}
        <button 
          className="absolute bottom-2 right-2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
          onClick={toggleFullscreen}
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-2 bg-black/50 text-white/80 px-2 py-1 rounded-full text-xs">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Render fullscreen gallery if enabled */}
      {isFullscreen && renderFullscreenGallery()}
    </div>
  );
};

export default ProjectGallery;