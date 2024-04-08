import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import { Typography } from "@mui/joy";

function CallerActionsComponent(props) {
  return (
    <Box>
      {!props.game.settings.autoCaller && (
        <Box>
          <Typography level="h2">Game ID {props.game.id}</Typography>
          <Typography level="h2">Call Item</Typography>
          {props.game.settings.custom && (
            <Card>
              <Button
                onClick={async () => {
                  const response = await fetch(`${props.APIurl}bingo?action=callRandomItem`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ gameId: props.game.id }),
                  });
                  const data = await response.json();
                  props.setGame(data);
                }}>
                RANDOM!
              </Button>
              {props.game.settings.items
                .filter((value) => {
                  return !props.game.calledItems.includes(value);
                })
                .map((item, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={async () => {
                        const response = await fetch(`${props.APIurl}bingo?action=callItem`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ gameId: props.game.id, item: item }),
                        });
                        const data = await response.json();
                        props.setGame(data);
                      }}>
                      {item}
                    </Button>
                  );
                })}
            </Card>
          )}

          {!props.game.settings.custom && (
            <Card>
              <Button
                onClick={async () => {
                  const response = await fetch(`${props.APIurl}bingo?action=callRandomItem`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ gameId: props.game.id }),
                  });
                  const data = await response.json();
                  props.setGame(data);
                }}>
                RANDOM!
              </Button>
              {[...Array(75).keys()]
                .filter((value) => {
                  return !props.game.calledItems.includes(value + 1);
                })
                .map((item, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={async () => {
                        const response = await fetch(`${props.APIurl}bingo?action=callItem`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ gameId: props.game.id, item: item + 1 }),
                        });
                        const data = await response.json();
                        props.setGame(data);
                      }}>
                      {item < 15 ? "B" : item < 30 ? "I" : item < 45 ? "N" : item < 60 ? "G" : "O"}
                      {item + 1}
                    </Button>
                  );
                })}
            </Card>
          )}
        </Box>
      )}

      {props.game.settings.autoCaller && (
        <Box>
          <Typography level="h2">Game ID: {props.game.id}</Typography>
          <Card>
            <Button
              onClick={async () => {
                const response = await fetch(`${props.APIurl}bingo?action=setPauseCaller`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ gameId: props.game.id, isPaused: !props.game.isPaused }),
                });
                const data = await response.json();
                props.setGame(data);
              }}>
              {props.game.isPaused ? "Resume Caller" : "Pause Caller"}
            </Button>
          </Card>
        </Box>
      )}
    </Box>
  );
}

export default CallerActionsComponent;
