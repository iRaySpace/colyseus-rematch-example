import { Client } from "colyseus.js";


const client = new Client('ws://localhost:2567');


async function _join(client: Client) {
    const room = await client.joinOrCreate('my_room')
    room.onMessage((message) => {
        if (message === 'rematch') {
            room.send('rematch');
        } else {
            _rematch(client, message);
        }
    })
}


async function _rematch(client: Client, id: string) {
    const room = await client.joinById(id);
    room.onMessage((message) => {
        console.log(message);
    });
}


function _log(message: string) {
    console.log(`[Server] ${message}`);
}


_join(client)
