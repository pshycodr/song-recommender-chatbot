import { atom } from "recoil";
import ChatAtomProps from "../../types/ChatAtomProps.types";

export const chatAtom = atom<ChatAtomProps[]>({
    key : "chatAtom",
    default : [{
        bot : true,
        message : "Hello, I am a bot. I recommend songs and Create Playlists based on Mood, Genre, Artist, Band and many more. I can Only answer to song related queries."
    }]
})
