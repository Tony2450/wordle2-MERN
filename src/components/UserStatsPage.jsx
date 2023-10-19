import React, { useEffect } from "react";
import {
  Container,
  LinearProgress,
} from "@mui/material";
import { useStats } from "../hooks/useStats";

export function UserStatsPage() {
  const { loading, stats, ...statsActions } = useStats();
  
  useEffect(() => {
    statsActions.getStats()
  },[])

  return (
    <Container className="main-container" maxWidth="sm">
        {loading? <LinearProgress/> : 
        (<div>
          <p>
            <strong>Wins:</strong> {stats.wins}
          </p>
          <p>
          <strong>Losses:</strong> {stats.losses}
          </p>
          <h4>Winning Words</h4>
          <ul>
            {stats.winwords.map((word)=>{return <li className="winningwords" key={word}>{word.toUpperCase()}</li>})}
          </ul>
          <h4>Losing Words</h4>
          <ul>
            {stats.losewords.map((word)=>{return <li className="losingwords" key={word}>{word.toUpperCase()}</li>})}
          </ul>
        </div>)}
    </Container>
  );
}
