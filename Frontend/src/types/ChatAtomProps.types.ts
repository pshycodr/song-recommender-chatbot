import SongProps from "./SongProps.types";

export default interface ChatAtomProps {
    bot : Boolean;
    message : String;
    songs? : SongProps[];
}