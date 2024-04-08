import Typography from "@mui/joy/Typography";
import Switch from "@mui/joy/Switch";
import Textarea from "@mui/joy/Textarea";
import Slider from "@mui/joy/Slider";
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
      <Button onClick={toggleDrawer(true)}>Create Game</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="bottom" size="lg">
        <ModalClose />
        <Box className="DrawerContainer">
          <h2>Create Game</h2>
          <Card className="DrawerContent">
            <h3>Game Settings</h3>
            <Sheet className="DrawerContent">
              <Typography
                component="label"
                endDecorator={
                  <Switch
                    sx={{ ml: 1 }}
                    onChange={(event) => {
                      props.setLocalSettings({
                        ...props.localSettings,
                        custom: event.target.checked,
                      });
                    }}
                  />
                }>
                Custom Items
              </Typography>
            </Sheet>
            {props.localSettings.custom && (
              <Sheet className="DrawerContent">
                <h3>Game Items</h3>
                <Sheet>
                  <Textarea
                    minRows={2}
                    placeholder="List items seperated by commas"
                    onChange={(event) => {
                      props.setLocalSettings({ ...props.localSettings, items: event.target.value });
                    }}
                  />
                </Sheet>
              </Sheet>
            )}
            <Sheet className="DrawerSlider">
              <Typography component="label">Max Players: {props.localSettings.maxPlayers}</Typography>
              <Slider
                defaultValue={10}
                min={2}
                max={100}
                label
                onChange={(event) => {
                  props.setLocalSettings({ ...props.localSettings, maxPlayers: event.target.value });
                }}
              />
            </Sheet>

            <Sheet className="DrawerContent">
              <h3>Caller Settings</h3>
              {/* <Sheet> TODO: implement callerIsPlayer
                <Typography
                  component="label"
                  endDecorator={
                    <Switch
                      checked={props.localSettings.callerIsPlayer}
                      sx={{ ml: 1 }}
                      onChange={(event) => {
                        props.setLocalSettings({
                          ...props.localSettings,
                          callerIsPlayer: event.target.checked,
                        });
                      }}
                    />
                  }>
                  Caller is Player
                </Typography>
              </Sheet> */}
              {props.localSettings.callerIsPlayer && (
                <Textarea
                  maxRows={1}
                  placeholder="Enter your name"
                  onChange={(event) => {
                    props.setPlayerName(event.target.value);
                  }}
                />
              )}

              <Sheet>
                <Typography
                  component="label"
                  endDecorator={
                    <Switch
                      sx={{ ml: 1 }}
                      onChange={(event) => {
                        props.setLocalSettings({
                          ...props.localSettings,
                          autoCaller: event.target.checked,
                        });
                      }}
                    />
                  }>
                  Auto Caller
                </Typography>
              </Sheet>

              {props.localSettings.autoCaller && (
                <Sheet className="DrawerSlider">
                  <Typography component="label">Call Delay: {props.localSettings.callDelay} seconds</Typography>
                  <Slider
                    defaultValue={20}
                    min={5}
                    max={180}
                    label
                    onChange={(event) => {
                      props.setLocalSettings({ ...props.localSettings, callDelay: event.target.value });
                    }}
                  />
                </Sheet>
              )}

              <Button
                onClick={async () => {
                  const response = await fetch(`${props.APIurl}bingo?action=newGame`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ settings: props.localSettings }),
                  });
                  const data = await response.json();

                  if (props.localSettings.callerIsPlayer) {
                    const joinedGame = await fetch(`${props.APIurl}bingo?action=joinGame`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ gameId: data.id, playerName: props.playerName }),
                    });
                    const joinedGameData = await joinedGame.json();
                    props.setGame(joinedGameData.game);
                    props.setPlayerId(joinedGameData.playerId);
                  } else {
                    const pausedGame = await fetch(`${props.APIurl}bingo?action=pauseGame`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ gameId: data.id, isPaused: true }),
                    });
                    const pausedGameData = await pausedGame.json();
                    props.setGame(pausedGameData);
                    //TODO: handle the caller not being a player, currently caller is id 0
                  }
                }}>
                Create Game
              </Button>
            </Sheet>
          </Card>
        </Box>
      </Drawer>
    </Box>
  );
}

export default CreateGameMenuComponent;
