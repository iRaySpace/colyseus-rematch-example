import { Room, Client } from "colyseus";
import { Rematch } from './rematch';

export class MyRoom extends Room {
  private _rematchService = new Rematch(this);

  onCreate (options: any) {
    _log(this.roomId, `Closing in 15 seconds...`);
    this.clock.setTimeout(() => _playGame(this), 15000)
  }

  onJoin (client: Client, options: any) {
    _log(this.roomId, `Client ${client.id} joined`);
  }

  onMessage (client: Client, message: any) {
    _log(this.roomId, `${client.id} accepted rematch`);
    this._rematchService.acceptRematch(client.id);
  }

  onLeave (client: Client, consented: boolean) {
  }

  onDispose() {
  }

}


function _playGame(room: Room) {
  room.lock();
  _log(room.roomId, `Closed...`);
  _log(room.roomId, `There are ${room.clients.length} in the room`);
  _requestReconnect(room);
}


function _requestReconnect(room: Room) {
  _log(room.roomId, 'Requesting reconnect in 5 seconds...');
  room.clock.setTimeout(() => room.broadcast('rematch'), 5000);
}

function _log(room: string, message: string) {
  console.log(`[Room ${room}] ${message}`);
}
