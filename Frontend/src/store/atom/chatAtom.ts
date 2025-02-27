import { atom } from "recoil";
import ChatAtomProps from "../../types/ChatAtomProps.types";

export const chatAtom = atom<ChatAtomProps[]>({
    key : "chatAtom",
    default : [{
        bot : true,
        message : "Hello, I am a bot. How can I help you?"
    }]
})
