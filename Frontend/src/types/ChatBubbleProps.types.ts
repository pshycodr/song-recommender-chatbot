import SongProps from "./SongProps.types";

export default interface ChatBubbleProps {
    bot: Boolean;
    message: String;
    songs?: SongProps[];
    pageLink? : string;
    text?: string; 
  }