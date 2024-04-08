import "./App.css";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Switch from "@mui/joy/Switch";
import Textarea from "@mui/joy/Textarea";
import Slider from "@mui/joy/Slider";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { useState } from "react";
import { useInterval } from "./utils";

import BingoCardCompnent from "./components/BingoCardComponent";
import CreateGameMenuComponent from "./components/CeateGameMenuComponent";
import JoinGameMenuComponent from "./components/JoinGameMenuComponent";
import CallerActionsComponent from "./components/CallerActionsComponent";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { Snackbar } from "@mui/joy";
import ToastComponent from "./components/ToastComponent";

function App() {
  const [game, setGame] = useState(null);

  const [localSettings, setLocalSettings] = useState({
    maxPlayers: 10,
    custom: false,
    items: [],
    autoCaller: false,
    callDelay: 20,
    callerIsPlayer: true,
  });
  const [playerName, setPlayerName] = useState("Player 1");
  const [playerId, setPlayerId] = useState(null);
  const [joinGameId, setJoinGameId] = useState(null);

  const APIurl = process.end.API_URL;

  useInterval(async () => {
    if (!game || game.winner) {
      return;
    }
    const response = await fetch(`${APIurl}bingo?action=getGame&gameId=${game.id}`);
    const data = await response.json();
    setGame(data);
  }, 3500);

  return (
    <CssVarsProvider defaultMode="dark">
      {game && <ToastComponent message={game.calledItems[game.calledItems.length - 1]} />}
      <Box className="App">
        <Typography level="h1">Bingo</Typography>
        <Typography level="h3">by Funqualified</Typography>
        {game?.winner && <Typography level="h2">Winner: {game.players[game.winner].name}</Typography>}
        {game && (
          <Tabs defaultValue={0}>
            <TabList>
              <Tab>Board</Tab>
              <Tab>Called Items</Tab>
              <Tab>Players</Tab>
              {playerId === 0 && <Tab>Caller Actions</Tab>}
            </TabList>
            <TabPanel value={0}>
              <BingoCardCompnent game={game} playerId={playerId} />
            </TabPanel>
            <TabPanel value={1}>
              <Box>
                <Typography level="h2">Called Items</Typography>
                <Card className="ListCard">
                  {game.calledItems.map((item, index) => {
                    return <Typography key={index}>{item}</Typography>;
                  })}
                </Card>
              </Box>
            </TabPanel>
            <TabPanel value={2}>
              <Box>
                <Typography level="h2">Players</Typography>
                <Card className="ListCard">
                  {game.players.map((player, index) => {
                    return <Typography key={index}>{player.name}</Typography>;
                  })}
                </Card>
              </Box>
            </TabPanel>
            <TabPanel value={3}>
              <CallerActionsComponent game={game} setGame={setGame} APIurl={APIurl} />
            </TabPanel>
          </Tabs>
        )}

        {/* Box at bottom of sceen with actions */}
        <Box className="bottomBox">
          {!game && (
            <CreateGameMenuComponent
              localSettings={localSettings}
              setLocalSettings={setLocalSettings}
              playerName={playerName}
              setPlayerName={setPlayerName}
              setPlayerId={setPlayerId}
              setGame={setGame}
              APIurl={APIurl}
            />
          )}
          {!game && (
            <JoinGameMenuComponent
              playerName={playerName}
              setPlayerName={setPlayerName}
              setPlayerId={setPlayerId}
              setGame={setGame}
              APIurl={APIurl}
              joinGameId={joinGameId}
              setJoinGameId={setJoinGameId}
            />
          )}
          {game && (
            <Box>
              <Button
                onClick={() => {
                  setGame(null);
                  setPlayerId(null);
                }}>
                Leave Game
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
