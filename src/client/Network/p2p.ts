import Peer from 'peerjs';

const BROKER_PROTOCOL = 'https://';
const BROKER_HOSTNAME = 'celcom-peer-broker.herokuapp.com';

const connections: any = {
    broker: null,
    peer:   null
};

// Red square tracks the peer's cursor to show data is being sent / received
const remoteCursor        = document.createElement('div');
remoteCursor.style.height = remoteCursor.style.width = '20px';
remoteCursor.style.position   = 'absolute';
remoteCursor.style.background = 'red';
remoteCursor.style.transform  = 'translate(-50%,-50%)';

document.body.appendChild(remoteCursor);
addEventListener('mousemove', e => sendToPeer({x: e.clientX, y: e.clientY}));

// Peer sent data to you
function onData(data) {
    const {x, y}            = data;
    remoteCursor.style.top  = y;
    remoteCursor.style.left = x;
}

// Peer attempts to connect to you
function onOpen() {
    // Ignore all non-whitelisted connections
    if (peerWhitelist.includes(connections.peer.peer)) {
        const hasAccepted = confirm(`Peer "${connections.peer.peer} wants to open a data connection!`);

        if (hasAccepted) {
            console.log('Peer connection opened.');
        } else {
            connections.peer.close();
            connections.peer = null;
        }
    }
}

let peerId        = prompt('Set peer id:', `jim`) || Date.now().toString(16);
let peerWhitelist = (prompt('Set comma-separated whitelist of peers allowed to connect to you:',
    localStorage.getItem('p2p-whitelist') || 'bob'
) || '').split(',');

const bindPeerConnectionEvents = potentialConnection => {
    potentialConnection.on('data', onData);
    potentialConnection.on('close', () => connections.peer = null);
};

const connectToPeer = peerId => {
    if (peerId) {
        const potentialPeerConnection = connections.broker.connect(peerId);
        potentialPeerConnection.on('open', () => connections.peer = potentialPeerConnection);
        bindPeerConnectionEvents(potentialPeerConnection);
    }
};

const sendToPeer = data => {
    if (connections.peer) {
        connections.peer.send(data);
    } else {
        console.log('Not connected to a peer!');
    }
};

function getActivePeers() {
    fetch(`${BROKER_PROTOCOL}${BROKER_HOSTNAME}/peers`, {
        method:  'post',
        body:    JSON.stringify({id: peerId}),
        headers: {'Content-Type': 'application/json'}
    })
        .then(res => res.json())
        .then(activePeers => {
            // Let user choose
            console.log('Available peers:');
            console.log(activePeers.map(id => id === peerId ? `- ${id} [you]` : `- ${id}`).join('\n'));
            console.log('\nUse `connectToPeer(ID)` to connect to these!');
        });
}

// Establish connection to peer broker
export const init = () => {
    connections.broker = new Peer(peerId, {
        host:   BROKER_HOSTNAME,
        port:   /https/g.test(BROKER_PROTOCOL) ? 443 : 80,
        path:   '/',
        secure: /https/g.test(BROKER_PROTOCOL)
    });
    connections.broker.on('open', id => {
        console.log(`Connection to broker successful! Your id is ${id}`);

        localStorage.setItem('p2p-whitelist', peerWhitelist.join(','));
        fetch(`${BROKER_PROTOCOL}${BROKER_HOSTNAME}/whitelist`,
            {
                method:  'post',
                body:    JSON.stringify({id: peerId, peerWhitelist}),
                headers: {'Content-Type': 'application/json'}
            }
        )
            .then(() => console.log('Successfully registered your room on the broker.'))
            .then(getActivePeers)
            .catch(e => console.log('Broker registration failed!', e));


        (window as any).connectToPeer = connectToPeer;
        (window as any).sendToPeer    = sendToPeer;
        (window as any).connections   = connections;
    });

    connections.broker.on('connection', connectionPeer => {
        connections.peer = connectionPeer;
        connectionPeer.on('open', onOpen);
        bindPeerConnectionEvents(connectionPeer);
    });

    return connections;
};