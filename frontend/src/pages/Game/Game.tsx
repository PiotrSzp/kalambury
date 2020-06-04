import React, { FC, useEffect, useState } from "react";
import FormDialog from "../../components/dialogs/FormDialog/FormDialog";
import { RouteChildrenProps } from "react-router";
import { MainHeader } from "../../layout/headers";
import { GameState } from "../../consts";
import io from "socket.io-client";

let socket: SocketIOClient.Socket;

const Game: FC<RouteChildrenProps<{ id: string }>> = (props) => {
  const [nickDialog, setNickDialog] = useState(false);
  const [nickValue, setNickValue] = useState(
    localStorage.getItem("nick") ?? ""
  );
  const [nickError, setNickError] = useState(false);
  const [gameState, setGameState] = useState<GameState>(GameState.SETUP);
  const SOCKET_ENDPOINT =
    process.env.REACT_APP_WS_HOST || "http://localhost:8000";

  const handleClose = () => {
    setNickDialog(false);
  };

  const handleDialogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setNickValue(event.target.value);
  };

  const handleDialogSubmit = () => {
    localStorage.setItem("nick", nickValue);
    setNickError(false);
    setNickDialog(false);
  };

  const renderSwitch = (gameState: GameState) => {
    switch (gameState) {
      case GameState.SETUP:
        return "Napisz hasła";
      case GameState.ROUND:
        return "Gramy!";
      case GameState.MIDSCORE:
        return "Wyniki:";
      default:
        return "Czekaj....";
    }
  };

  useEffect(() => {
    if (!nickValue) {
      setNickDialog(true);
    }
  }, [nickValue]);

  //TODO: dev...
  const [serverTime, setServerTime] = useState();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket = io(SOCKET_ENDPOINT, {});

    socket.on("connect", () => {
      console.log("Connected");
      socket.emit("join", {nickValue, ready: true})
    });

    socket.on("timeToClient", (msg: any) => {
      console.log("Got a msg from server!");
      console.log(msg);
      setServerTime(msg);
    });

    socket.on("log", (msg: any) => {
      console.log(msg);
    });

    socket.on("playersUpdate", (players: never[]) => {
      setPlayers(players);
    });
  }, [SOCKET_ENDPOINT, nickValue]);

  const handleClick = () => {
    console.log("req time....");
    socket.emit("timeReq");
  };

  return (
    <div data-testid="Game">
      <MainHeader>GAME</MainHeader>
      <p>{`Hello in room ${props.match?.params.id}, ${nickValue}`}</p>
      <h2>Players in a game:</h2>
      <ul>
        {players.map((player: any) => (
          <li style={{ color: player.ready ? "green" : "red" }}>
            {player.nickValue}
          </li>
        ))}
      </ul>
      {renderSwitch(gameState)}
      <p>servertime:</p>
      <p>{serverTime}</p>
      {nickDialog ? (
        <FormDialog
          open={nickDialog}
          name={"nick"}
          handleClose={handleClose}
          handleSubmit={handleDialogSubmit}
          handleChange={handleDialogChange}
          title={"Podaj swój nick"}
          label={"Nick"}
          value={nickValue}
          error={nickError}
          errorMsg={nickError ? "Ten nick już jest zajęty." : " "}
        />
      ) : null}
      <button onClick={handleClick}>KLIK TIME!</button>
    </div>
  );
};

export default Game;
