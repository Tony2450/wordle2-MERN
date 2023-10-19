import { WelcomePage } from "./WelcomePage";
import { UserStatsPage } from "./UserStatsPage";
import { AppProvider, useApp } from "./RealmApp";
import atlasConfig from "../atlasConfig.json";
import "./App.css";
import Wordle from "./Wordle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";
import Layout from "./Layout";
import Rules from "./Rules";

const { appId } = atlasConfig;

export default function ProvidedApp() {
  return (
    <AppProvider appId={appId}>
      <App />
    </AppProvider>
  );
}

function App() {
  const { currentUser, logOut } = useApp();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wordle2-MERN/user" element={<ProtectedLayout />}>
          <Route path="wordle-clone" element={<Wordle />} />
          <Route path="rules" element={<Rules />} />
          <Route path="userstats" element={<UserStatsPage />} />
        </Route>
        <Route path="/wordle2-MERN" element={<Layout />}>
          <Route path="/wordle2-MERN" element={<WelcomePage />} />
          <Route path="rules" element={<Rules />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}
