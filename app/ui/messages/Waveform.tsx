// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import WaveSurfer from 'wavesurfer.js'
import { FaPlayCircle, FaPauseCircle, FaLink, FaForward } from 'react-icons/fa';

const Waveform = ({ audio }) => {
    const containerRef = useRef();
    const waveSurferRef = useRef({
      isPlaying: () => false,
    });
    const [isPlaying, toggleIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
          container: containerRef.current,
          responsive: true,
          barWidth: 2,
          barHeight: 2,
          cursorWidth: 0,
          waveColor: '#dfe6e9',
          progressColor: '#1e80e3', //#74b9ff
        });
    
        
        waveSurfer.load(audio);
        waveSurfer.on('ready', () => {
          waveSurferRef.current = waveSurfer;
          setTotalTime(waveSurfer.getDuration());
        });
    
        waveSurfer.on('audioprocess', () => {
          setCurrentTime(waveSurfer.getCurrentTime());
        });
    
        return () => {
          waveSurfer.destroy();
        };
      }, [audio]);
    
      const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
    
      const formatTranscriptEntry = (entry) => {
        if (entry.type === 'function_call') {
          return `Function Call: ${entry.name}: ${entry.args}`;
        }
        if (entry.type === 'function_result') {
          return `Result: ${entry.result}`;
        }
        return entry.message;
      };
      
      return (
        <>
          <div className="flex items-center">
          <button
              onClick={() => {
                waveSurferRef.current.playPause();
                  toggleIsPlaying(waveSurferRef.current.isPlaying());
              }}
              type="button"
              className="w-10 h-10 border-none bg-transparent"
          >
              {isPlaying ? 
                  <div className='bg-transparent hover:text-blue-600 flex p-2 items-center justify-center rounded-md'>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <rect width="5" height="15" fill="currentColor"/>
                          <rect width="5" height="15" fill="currentColor"/>
                          <rect x="10" width="5" height="15" fill="currentColor"/>
                          <rect x="10" width="5" height="15" fill="currentColor"/>
                      </svg>
                  </div>
                  : 
                  <div className='bg-transparent hover:text-blue-600 flex p-2 items-center justify-center rounded-md'>
                      <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.396 7.12266C14.0895 7.50198 14.0895 8.49802 13.396 8.87734L2.22987 14.9848C1.56347 15.3493 0.75 14.867 0.75 14.1075V1.89254C0.75 1.13297 1.56347 0.65071 2.22987 1.01521L13.396 7.12266Z" fill="currentColor"/>
                      </svg>
                  </div>
              }
          </button>
            <div className="ml-4 flex gap-2 ">
              <div>{formatTime(currentTime)}</div> /
              <div>{formatTime(totalTime)}</div>
              <a href={audio} target="_blank" className="text-gray hover:text-sky-500 hover:underline mt-1"> <FaLink className="text-gray" /> </a>
            </div>
          </div>
          <div ref={containerRef} />
        </>
      );
    };
    
    Waveform.propTypes = {
      audio: PropTypes.string.isRequired,
    };
    
    export default Waveform;