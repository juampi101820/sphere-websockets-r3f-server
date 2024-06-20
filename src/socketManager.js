"use strict";

function handleSocketConnection(socket, io, doorStates) {
  console.log(
    "Player joined with ID",
    socket.id,
    ". There are " + io.engine.clientsCount + " players connected."
  );

  // Enviar el estado actual de las puertas al nuevo jugador
  socket.emit("update-door-states", doorStates);

  socket.on("player-moving", (transforms) => {
    socket.broadcast.emit("player-moving", transforms);
  });

  // Manejar cambios en el estado de las puertas
  socket.on("change-door-state", (newDoorStates) => {
    Object.assign(doorStates, newDoorStates);
    io.emit("update-door-states", doorStates);
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
