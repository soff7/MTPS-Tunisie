let io;

module.exports = {
  init: (serverInstance) => {
    const { Server } = require('socket.io');
    io = new Server(serverInstance, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};
