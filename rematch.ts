import { Room, matchMaker } from "colyseus";

export class Rematch {
    private _room: Room;

    private _players = [] as string[];
    
    constructor(room: Room) {
        this._room = room;
    }

    acceptRematch(player: string) {
        this._players.push(player);
        if (this._players.length === this._room.clients.length) {
            this.rematch();
        }
    }

    async rematch() {
        _log(this._room.roomId, `Closing in 10 seconds...`)
        this._room.clock.setTimeout(() => this._room.disconnect(), 10000);
        const room = await matchMaker.createRoom('my_room', null);
        this._room.broadcast(room.roomId);
    }
}


function _log(room: string, message: string) {
    console.log(`[Room ${room}] ${message}`);
}
  