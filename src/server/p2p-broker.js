const express    = require('express');
const PeerServer = require('peer').PeerServer;

const activeConnections = {};
const port              = process.env.PORT || 3001;

const server = PeerServer({port, path: '/', allow_discovery: true});
server.use(express.json());

server.on('connection', id => {
    activeConnections[id] = true;
    console.log(`+${id} = ${Object.keys(activeConnections).length}`);
});

// Once your whitelist is registered, it is used to form the GET response:
// registered id that do not include the GET requester's id will not be part
// of that response
server.post('/whitelist', (req, res) => {
    const {id, peerWhitelist} = req.body;
    if (activeConnections[id]) {
        activeConnections[id] = peerWhitelist;
        res.status(200).send();
    } else {
        res.status(400).send();
    }
});

server.post('/peers', (req, res) => {
    const {id} = req.body;

    if (id && activeConnections[id]) {
        res.json(
            Object.keys(activeConnections).filter(activeId => activeConnections[activeId].includes(id))
        );
    }
});

server.on('disconnect', id => {
    delete activeConnections[id];
    console.log(`-${id} = ${Object.keys(activeConnections).length}`);
});

console.log(`P2P broker listening on port ${port}!`);
