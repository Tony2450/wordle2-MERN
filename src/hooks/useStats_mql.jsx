import React from "react";
import { useCollection } from "./useCollection";
import { useApp } from "../components/RealmApp";
import atlasConfig from "../atlasConfig.json";

const { dataSourceName } = atlasConfig;

export function useStats() {
  // Set stats in state
  const app = useApp();
  const [stats, setStats] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  // Get a client object for the todo item collection
  const userStatsCollection = useCollection({
    cluster: dataSourceName,
    db: "users",
    collection: "stats",
  });


  const getStats = async () => {
    setLoading(true)
    const fetchStats = async () =>{
      return await userStatsCollection.findOne({})
    }
    const fetchedStats = await fetchStats();
    setStats(fetchedStats);
    setLoading(false)
  };

  // Add 1 to wins
  const addWin = async () => {
    await userStatsCollection.updateOne(
      { owner_id: app.currentUser.id },
      { $inc: {wins: 1}}
    );
  };

  // Add 1 to losses
  const addLoss = async () => {
    await userStatsCollection.updateOne(
      { owner_id: app.currentUser.id },
      { $inc: {losses: 1}}
    );
  };

  // Add word to winwords
  const addWinWord = async (word) => {
    await userStatsCollection.updateOne(
      { owner_id: app.currentUser.id },
      { $addToSet: {winwords: word}}
    );
  };

  // Add word to losewords
  const addLoseWord = async (word) => {
    await userStatsCollection.updateOne(
      { owner_id: app.currentUser.id },
      { $addToSet: {losewords: word}}
    );
  };

  return {
    loading,
    stats,
    addWin,
    addLoss,
    addWinWord,
    addLoseWord,
    getStats
  };
}
