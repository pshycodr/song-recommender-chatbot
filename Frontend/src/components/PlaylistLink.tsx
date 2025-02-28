import React from "react"


interface PlaylistLinkProps {
  playlist_link: string;
}

const PlaylistLink: React.FC<PlaylistLinkProps> = ({ playlist_link }) => {
    return (
        <div className="mt-2">
                <a
                  href={playlist_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-spotify-dark text-spotify-green p-2 rounded-lg inline-block hover:bg-spotify-green hover:text-spotify-dark transition-all duration-200"
                >
                  🎵 Open Playlist on Spotify
                </a>
              </div>
    )
}

export default PlaylistLink