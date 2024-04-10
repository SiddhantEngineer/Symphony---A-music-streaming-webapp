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
}