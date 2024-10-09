import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import './Transitions.css';

const FrictionReels = () => {
  const [videos, setVideos] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isRandomDirection, setIsRandomDirection] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [fadeState, setFadeState] = useState('');
  const [currentQuote, setCurrentQuote] = useState({ text: '', action: '' });
  const [unsuccessfulSwipes, setUnsuccessfulSwipes] = useState(0);
  const [showDirectionArrow, setShowDirectionArrow] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [videosUntilNextQuote, setVideosUntilNextQuote] = useState(Math.floor(Math.random() * 3) + 1);
  const [slideDirection, setSlideDirection] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [reelsWatched, setReelsWatched] = useState(0);
  const [nextFrictionElement, setNextFrictionElement] = useState(7);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch('/videos.json')
      .then((response) => response.json())
      .then((data) => setVideos(data.videos))
      .catch((error) => console.error(`Error fetching videos: ${error}`));

    fetch('/quotes.json')
      .then((response) => response.json())
      .then((data) => setQuotes(data))
      .catch((error) => console.error(`Error fetching quotes: ${error}`));

    // Initialize the first friction element after 7 reels
    // setNextFrictionElement(7);
  }, []);

  useEffect(() => {
    const reminderInterval = setInterval(() => {
      setShowReminder(true);
      setTimeout(() => setShowReminder(false), 3000);
    }, 60000);

    const timer = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(reminderInterval);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((error) => console.error(`Error playing video: ${error}`));
    }
  }, [currentVideo]);

  const handleWelcomeTap = () => {
    setShowWelcome(false);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.error(`Error playing video: ${error}`));
    }
  };

  const handleShowQuote = () => {
    setIsScrollLocked(true);
    setFadeState('fade-out');
    setTimeout(() => {
      setShowPuzzle(true);
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setFadeState('fade-in');
    }, 500);
  };

  const handleQuoteTap = () => {
    setFadeState('fade-out');
    setTimeout(() => {
      setShowPuzzle(false);
      setCurrentVideo((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
      randomizeScrollDirection();
      setIsScrollLocked(false);
      setUnsuccessfulSwipes(0);
      setShowDirectionArrow(false);
      setFadeState('fade-in');
      setVideosUntilNextQuote(Math.floor(Math.random() * 3) + 1);
    }, 500);
  };

  const handleShowFrictionElement = () => {
    const randomChoice = Math.random();
    if (randomChoice < 0.5) {
      handleShowQuote();
    } else {
      randomizeScrollDirection();
    }
    // Set the next friction element to appear after 2-5 reels
    setNextFrictionElement(reelsWatched + Math.floor(Math.random() * 4) + 2);
  };

  const handleSwipe = () => {
    const newReelsWatched = reelsWatched + 1;
    setReelsWatched(newReelsWatched);
    
    if (newReelsWatched >= 7 && newReelsWatched === nextFrictionElement) {
      handleShowFrictionElement();
    } else {
      setCurrentVideo((prevVideo) => (prevVideo < videos.length - 1 ? prevVideo + 1 : 0));
      // Reset to 'up' direction if it was previously a random direction
      if (isRandomDirection) {
        setScrollDirection('up');
        setIsRandomDirection(false);
      }
    }
    setUnsuccessfulSwipes(0);
    setShowDirectionArrow(false);
  };

  const randomizeScrollDirection = () => {
    const directions = ['up', 'left', 'right'];
    const newDirection = directions[Math.floor(Math.random() * directions.length)];
    setScrollDirection(newDirection);
    setIsRandomDirection(true);
  };

  const isCorrectSwipe = (eventData) => {
    const { dir } = eventData;
    switch (scrollDirection) {
      case 'up': return dir === 'Up';
      case 'left': return dir === 'Left';
      case 'right': return dir === 'Right';
      default: return false;
    }
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (isScrollLocked) return;

      if (isCorrectSwipe(eventData)) {
        handleSwipe();
      } else {
        setUnsuccessfulSwipes((prev) => {
          const newCount = prev + 1;
          if (newCount === 3) {
            setShowDirectionArrow(true);
          }
          return newCount;
        });
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    delta: 50
  });

  const renderDirectionButton = (direction) => {
    const iconProps = { size: 32, className: 'text-white cursor-pointer' };
    switch (direction) {
      case 'up': return <ChevronUp {...iconProps} />;
      case 'left': return <ChevronLeft {...iconProps} />;
      case 'right': return <ChevronRight {...iconProps} />;
      default: return null;
    }
  };

  return (
    <div {...handlers} className="fixed inset-0 bg-black flex items-center justify-center" onClick={showPuzzle ? handleQuoteTap : null}>
      {showWelcome ? (
        <div className="text-white text-center p-8" onClick={handleWelcomeTap}>
          <h1 className="text-4xl font-bold mb-4">Welcome</h1>
          <p className="text-xl">Tap to continue</p>
        </div>
      ) : (
        <div className={`absolute inset-0 ${fadeState} ${slideDirection ? `slide-${slideDirection}` : ''}`}>
          {!showPuzzle && (
            <>
              <video
                ref={videoRef}
                src={videos[currentVideo]}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                playsInline
              />
              {showDirectionArrow && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {renderDirectionButton(scrollDirection)}
                </div>
              )}
            </>
          )}
          {showPuzzle && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="text-white text-center p-8 max-w-md">
                <p className="text-3xl font-bold mb-6">{currentQuote.text}</p>
                <p className="text-xl text-gray-300">{currentQuote.action}</p>
                <div className="mt-8">
                  <Loader className="animate-spin text-white mx-auto" size={24} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        Time: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
      </div>

      {showReminder && (
        <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
          You've been scrolling for a while. Take a break?
        </div>
      )}
    </div>
  );
};

export default FrictionReels;