import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../AuthContext";

const YOUTUBE_API_KEY = "AIzaSyCp7SfgXKnVBXEoMvZGarnp_arZ0NK1TMU"
const YOUTUBE_PLAYLIST_ITEMS_API = "https://www.googleapis.com/youtube/v3/playlistItems";

const YouTubePlaylist = () => {

    const [videoList, setVideoList] = useState([]);
    const authManager = useContext(AuthContext);

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

    return (
        <>
            {videoList.map((video) => {

                return (
                    <div key={video.id} className="container m-5">
                        <div className="card m-15 w-75">
                            <div className="card-body float-right">
                                <h5 className="card-title">{video.snippet.title}</h5>
                                <iframe title={video.snippet.title} className="" key={video.snippet.resourceId.videoId} width="420" height="315"
                                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`} allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                    </div>
                );
            })}

        </>
    )


};

export default YouTubePlaylist;