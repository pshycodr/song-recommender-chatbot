import axios from 'axios'
import React from 'react'

const SpotifyLoginButton: React.FC = () => {

    const signupHandler = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/auth_check/')
            const url = response.data.url
            console.log(url);

            window.location.replace(url)
        } catch (error) {

        }
    }

    return (
        <div >
            <button
                onClick={signupHandler}
                className="relative w-80 h-16 border-2 border-black flex justify-center items-center gap-3 bg-green-500 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:bg-green-600 active:scale-95 group"
            >
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Ripple effect */}
                <div className="absolute w-20 h-20 bg-white rounded-full opacity-0 group-hover:opacity-30 group-active:opacity-50 transform scale-0 group-hover:scale-100 transition-all duration-500"></div>

                {/* Spotify logo */}
                <img src="/assets/spotify.png" className="h-10 z-10 transform transition-transform duration-500 group-hover:rotate-12" />

                {/* Text */}
                <span className="text-3xl font-semibold text-black z-10 transform transition-transform duration-500 group-hover:translate-x-2">
                    Spotify
                </span>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-green-500 blur-lg"></div>
                </div>
            </button>
        </div>
    )
}

export default SpotifyLoginButton