export interface SongInfo {
    name: string;
    src: string;
    artist: string;
}

export interface PlayerInfo{
    songIndex: number;
    isPlaying: boolean;
    src: string;
    name: string;
    time: number;
}

export interface PlayerController{
    next:()=>void;
    prev:()=>void;
    play:() => void;
    pause:() => void; 
}