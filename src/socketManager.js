"use strict";

function handleSocketConnection(socket, io, states) {
  console.log(
    "Player joined with ID",
    socket.id,
    ". There are " + io.engine.clientsCount + " players connected."
  );

  // Enviar el estado actual al nuevo jugador
  socket.emit("update-states", states);

  socket.on("player-moving", (transforms) => {
    socket.broadcast.emit("player-moving", transforms);
  });

  // Manejar cambios en el estado de las puertas
  socket.on("change-door-state", (newDoorStates) => {
    Object.assign(states.landLevelState.doorStates, newDoorStates);
    io.emit("update-states", states);
  });

  // Manejar cambios en el estado de las monedas
  socket.on("change-coin-state", (newCoinStates) => {
    Object.assign(states.fireLevelState.coinStates, newCoinStates);
    io.emit("update-states", states);
  });

  // Manejar cambios en el estado de los corazones
  socket.on("change-heart-state", (newHeartStates) => {
    Object.assign(states.fireLevelState.heartStates, newHeartStates);
    io.emit("update-states", states);
  });

  socket.on("disconnect", () => {
    console.log(
      "Player disconnected with ID",
      socket.id,
      ". There are " + io.engine.clientsCount + " players connected"
    );
  });
}

module.exports = { handleSocketConnection };
