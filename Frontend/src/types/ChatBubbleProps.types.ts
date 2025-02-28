import SongProps from "./SongProps.types";

export default interface ChatBubbleProps {
    bot: Boolean;
    message: String;
    songs?: SongProps[];
    playlist_link? : string;
  }