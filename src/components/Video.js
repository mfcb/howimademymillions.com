import { Box, Link } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Video(props) {

    const videoRef = useRef(null);

    const [isVideoPlaying, setVideoPlaying] = useState(false);
    const [isVideoMuted, setVideoMuted] = useState(true);

    const scrollHandler = useCallback(
        () => {
            if(window.pageYOffset + window.innerHeight /2 >= videoRef.current.offsetTop
                &&
                window.pageYOffset <= videoRef.current.offsetTop
            
            ) {
                if(!isVideoPlaying) {
                    playVideo();
                    setVideoPlaying(true);
                }
            } else {
                if(isVideoPlaying) {
                    pauseVideo();
                    setVideoPlaying(false);
                }
            }
        },
        [setVideoPlaying, isVideoPlaying]
    )

    useEffect(() => {
        window.addEventListener('scroll',scrollHandler);

        return () => window.removeEventListener('scroll',scrollHandler);
    },[scrollHandler]);


    const playVideo = () => {
        console.dir(videoRef.current, null);
        videoRef?.current.play();
    }

    const pauseVideo = () => {
        videoRef?.current.pause();
    }

    const muteVideo = (e) => {
        e.preventDefault();
        setVideoMuted(!isVideoMuted);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                component="video"
                src={props.src}
                muted={isVideoMuted}
                loop
                autoplay
                ref={videoRef}
                playsInline
                // onCanPlay={playVideo}
                sx={{
                    aspectRatio: '1/1',
                    width: 'auto',
                    height: 'auto',
                    maxWidth:{
                        xs: '300px',
                        md: '450px',
                    },
                    maxHeight:{
                        xs: '400px',
                        md: '450px',
                    }
                }}
                // onMouseOver={playVideo}
                // onMouseOut={pauseVideo}
            >

            </Box>
            <Link href="#" sx={{marginTop: theme => theme.spacing(1), cursor: 'pointer'}} onClick={muteVideo}>{isVideoMuted ? "unmute" : "mute"}</Link>
        </Box>
    )

}