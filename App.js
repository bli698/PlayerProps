import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SportSelection } from './components/SportSelection';
import { BetSelection } from './components/BetSelection';
import { DataTable } from './components/DataTable';
import { BarChart } from './components/BarChart';
import { getPlayerData } from './utilities/database';
import './App.css';

export default function App() {
  const [sport, setSport] = useState('nba');
  const [selections, setSelections] = useState({player: "Aaron Gordon", playerProp: "points", team: "", line: 0});
  const [playerObj, setPlayerObj] = useState(undefined)

  if (selections.line === 0 && playerObj !== undefined) {
    selections.line = Object.keys(playerObj[selections.player]["overUnder"][selections.playerProp]).sort()[0]
  }

  useEffect(() => {
    var data = getPlayerData(selections.player)
    data.then((val) => {
      setPlayerObj(val[selections]);
      setSelections({...selections, line: Object.keys(playerObj[selections.player]["overUnder"]["points"]).sort()[0]})
    })
  }, [selections.player])

  useEffect(() => {
    if (playerObj !== undefined) {
      setSelections({...selections, line: Object.keys(playerObj[selections.player]["overUnder"][selections.playerProp]).sort()[0]});
    }
  }, [selections.playerProp])


  return (
    playerObj === undefined ? 
      <></> 
    : 
    <>
      <SportSelection sport={sport} setSport={setSport}/>
      <BetSelection 
        playerNames={["Aaron Gordon", "Anthony Edwards", "Jaden McDaniels", "Jamal Murray", "Karl-Anthony Towns", "Kentavious Caldwell-Pope", "Michael Porter Jr.", "Mike Conley", 
        "Naz Reid", "Nikola Jokic", "Rudy Gobert"]} 
        propNames={playerObj !== undefined ? Object.keys(playerObj[selections.player]["overUnder"]).sort() : []}
        teamNames={[]}
        lineList={playerObj !== undefined ? Object.keys(playerObj[selections.player]["overUnder"][selections.playerProp]).sort() : [selections.line]}
        playerObj={playerObj}
        selections={selections}
        setSelections={setSelections}
      />
      <div id="chartAndTable">
        <BarChart selections={selections} playerObj={playerObj}/>
        <DataTable selections={selections} playerObj={playerObj}/>
      </div>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
