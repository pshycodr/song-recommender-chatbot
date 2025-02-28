import React from "react";
import SpotifyLoginButton from '../components/SpotifyLoginButton';

const AuthPage: React.FC = () => {
    return (
        <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
            <div className="absolute inset-0 w-full h-full transform sm:rotate-90 scale-150 md:rotate-0 md:scale-100">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/assets/Auth-bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-20"></div>

            <div className="relative z-10 w-full max-w-md px-4 text-center flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-white mb-8">Welcome to Music Hub</h1>
                <p className="text-white text-lg mb-4">Continue with</p>
                <SpotifyLoginButton />
            </div>
        </div>
    );
};

export default AuthPage;