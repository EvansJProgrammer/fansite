import React, { useEffect, useState } from "react";
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyCp7SfgXKnVBXEoMvZGarnp_arZ0NK1TMU"
const YOUTUBE_PLAYLIST_ITEMS_API = "https://www.googleapis.com/youtube/v3/playlistItems";

const YouTubePlaylist = () => {

    const [videoList, setVideoList] = useState([]);

    useEffect(() => {
        fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLdnEKz0ib5DD8X0JeJ9MgbTLKNESWNlRe&maxResults=10&key=${YOUTUBE_API_KEY}`)
            .then((response) => {
                // return response.json();
                if (response.status === 200) {
                    return response.json();
                }

                return Promise.reject('Something went wrong on the server :)')
            })
            .then((data) => {
                setVideoList(data.items)
            })

    }, []);

    console.log(videoList);

 

    return (
        <>
            {videoList.map((video) => {
                
                return (<div>
                    <iframe width="420" height="315"
                        src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}>
                    </iframe>
                </div>);
            })}

        </>
    )


};

export default YouTubePlaylist;