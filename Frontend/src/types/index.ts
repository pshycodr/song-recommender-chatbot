export interface Song {
    title: string;
    artist: string;
  }
  
  export interface ChatResponse {
    message: string;
    genre: string;
    suggestions: Song[] | [];
  }
  