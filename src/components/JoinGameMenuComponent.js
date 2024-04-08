import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Drawer from "@mui/joy/Drawer/Drawer";
import ModalClose from "@mui/joy/ModalClose";
import { useState } from "react";
import "./BottomDrawer.css";

function CreateGameMenuComponent(props) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <Box>
      <Button onClick={toggleDrawer(true)}>Join Game</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="bottom" size="lg">
        <ModalClose />
        <Box className="DrawerContainer">
          <h2>Join Game</h2>
          <Card className="DrawerContent">
            <Sheet className="DrawerContent">
              <Textarea
                maxRows={1}
                placeholder="Enter your name"
                onChange={(event) => {
                  props.setPlayerName(event.target.value);
                }}
              />
              <Textarea
                maxRows={1}
                placeholder="Enter game id to join"
                onChange={(event) => {
                  props.setJoinGameId(event.target.value);
                }}
              />
              <Button
                onClick={async () => {
                  const joinedGame = await fetch(`${props.APIurl}bingo?action=joinGame`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ gameId: props.joinGameId, playerName: props.playerName }),
                  });
                  const joinedGameData = await joinedGame.json();
                  props.setGame(joinedGameData.game);
                  props.setPlayerId(joinedGameData.playerId);
                }}>
                Join Game
              </Button>
            </Sheet>
          </Card>
        </Box>
      </Drawer>
    </Box>
  );
}

export default CreateGameMenuComponent;
