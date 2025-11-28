import React, { useState, useEffect } from 'react';

const ProjectImage = ({ imageName, alt, className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const BASE_PATH = process.env.PUBLIC_URL;

  // Define multiple potential paths to try for the image
  const paths = [
    `${BASE_PATH}/assets/projects/${imageName}`,
    `${BASE_PATH}/assets/${imageName}`,
    `${BASE_PATH}/${imageName}`,
    `${BASE_PATH}/assets/projects/placeholder-project.jpg` // Fallback placeholder
  ];

  // State to track the current path being tried
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [currentPath, setCurrentPath] = useState(paths[0]);

  useEffect(() => {
    // Reset states when imageName changes
    if (imageName) {
      setLoaded(false);
      setError(false);
      setCurrentPathIndex(0);
      setCurrentPath(paths[0]);
    }
  }, [imageName]);

  const handleError = () => {
    // If we've tried all paths, set error to true
    if (currentPathIndex >= paths.length - 1) {
      setError(true);
      return;
    }

    // Try the next path
    const nextIndex = currentPathIndex + 1;
    setCurrentPathIndex(nextIndex);
    setCurrentPath(paths[nextIndex]);
  };

  // Image loaded successfully
  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-black/20 border-t-black/60 rounded-full animate-spin"></div>
        </div>
      )}
      
      <img 
        src={currentPath}
        alt={alt || "Project image"}
        onError={handleError}
        onLoad={handleLoad} 
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {error && (
        <div className="absolute inset-0 bg-gray-200 flex flex-col items-center justify-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs">Image unavailable</p>
        </div>
      )}
    </div>
  );
};

export default ProjectImage;