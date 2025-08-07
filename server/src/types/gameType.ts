export type RoomType = {
    id: string;
    hostId: string;
    players: PlayerType[];
    status: "waiting" | "playing" | "finished";
}

export type PlayerType = {
    userId: string;
    username: string;
    isReady: boolean;
}