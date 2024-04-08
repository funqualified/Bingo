import React from "react";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import { Typography } from "@mui/joy";
import "./BingoCardComponent.css";

function BingoCardCompnent(props) {
  return (
    <Box className="BingoCard">
      {props.game?.players[props.playerId].card.map((row, index) => {
        return (
          <Box key={index} className="BingoCol" justifyContent="center">
            <Sheet className="BingoHeader">
              <Typography level="h2">{index === 0 ? "B" : index === 1 ? "I" : index === 2 ? "N" : index === 3 ? "G" : "O"}</Typography>
            </Sheet>
            {row.map((cell, cellIndex) => {
              return (
                <Sheet
                  className="BingoCell"
                  key={`${index},${cellIndex}`}
                  sx={{
                    backgroundColor: props.game.calledItems.includes(cell) ? "darkred" : "black",
                  }}>
                  <Typography level="h2">{cell}</Typography>
                </Sheet>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}

export default BingoCardCompnent;
