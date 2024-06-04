import React, {useState, useEffect} from 'react';
import { SportSelection } from './components/SportSelection';
import { BetSelection } from './components/BetSelection';
import { DataTable } from './components/DataTable';
import { BarChart } from './components/BarChart';
import { ParlayBuilder } from './components/ParlayBuilder';
import { getPlayerData } from './utilities/database';
import './App.css';

export default function App() {
  const [sport, setSport] = useState('nba');
  const [selections, setSelections] = useState({player: "Al Horford", playerProp: "points", team: "", line: 1});
  const [playerObj, setPlayerObj] = useState(undefined);
  const [odds, setOdds] = useState([0, 0]);
  const [parlayLegs, setParlayLegs] = useState([]);
  
  function addParlayLeg(leg) {
    tmp = [...parlayLegs];
    tmp.push(leg);
    setParlayLegs(tmp);
  }

  function removeParlayLeg(ind) {
    // Edge case: empty array
    if (parlayLegs.length === 0 || ind >= parlayLegs.length) return;
    // Edge case: Removing element from an array of size 1
    if (ind === 0 && parlayLegs.length === 1) {
      setParlayLegs([]);
      return;
    }
    setParlayLegs(parlayLegs.toSpliced(ind, 1));
  }

  if (selections.line === 0 && playerObj !== undefined) {
    selections.line = Object.keys(playerObj["overUnder"][selections.playerProp]).sort()[0]
  }

  useEffect(() => {
    var data = getPlayerData(selections.player)
    data.then((val) => {
      setPlayerObj(val[selections.player]);
      tmpProp = Object.keys(val[selections.player]["overUnder"]).sort()[0];
      tmpLine = Object.keys(val[selections.player]["overUnder"][tmpProp]).sort()[0];
      setSelections({...selections, line: tmpLine, playerProp: tmpProp});
      setOdds([val[selections.player]["overUnder"][tmpProp][tmpLine][0], val[selections.player]["overUnder"][tmpProp][tmpLine][1]])
    })
  }, [selections.player])

  return (
    playerObj === undefined ? 
      <></> 
    : 
    <>
      <SportSelection sport={sport} setSport={setSport}/>
      <BetSelection 
        playerNames={["Al Horford", "Daniel Gafford", "Dereck Lively II", "Derrick Jones Jr.", "Derrick White", "Jaden Hardy", 
        "Jaylen Brown", "Jayson Tatum", "Josh Green", "Jrue Holiday", "Kristaps Porzingis", "Kyrie Irving", 
        "Luka Doncic", "Maxi Kleber", "P.J. Washington", "Payton Pritchard", "Sam Hauser"]} 
        propNames={Object.keys(playerObj["overUnder"]).sort()}
        teamNames={[]}
        lineList={Object.keys(playerObj["overUnder"][selections.playerProp]).sort()}
        playerObj={playerObj}
        selections={selections}
        setSelections={setSelections}
        setOdds={setOdds}
      />
      
      <div id="chartAndTable">
        <span className="oddsAndChart">
          <ParlayBuilder selections={selections} playerObj={playerObj} parlayLegs={parlayLegs} addParlayLeg={addParlayLeg} removeParlayLeg={removeParlayLeg}/>
          <div id="oddsWrapper">
            <span className="teamNameSpan">Team: {playerObj["teamName"]}</span>
            <span className="oddsSpan">O: {odds[0]}</span>
            <span className="oddsSpan">U: {odds[1]}</span>
          </div>
          <BarChart selections={selections} playerObj={playerObj}/>
        </span>
        <DataTable selections={selections} playerObj={playerObj}/>
      </div>
    </>
  );
}