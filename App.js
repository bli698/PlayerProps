import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SportSelection } from './components/SportSelection';
import { BetSelection } from './components/BetSelection';
import { DataTable } from './components/DataTable';
import { Col } from 'react-bootstrap';
import './App.css';

export default function App() {
  const [sport, setSport] = useState('nba');
  const [selections, setSelections] = useState({player: "", playerProp: "", team: "", line: ""});
  return (
    <>
      <SportSelection sport={sport} setSport={setSport}/>
      <BetSelection 
        playerNames={['Pascal Siakam']} 
        propNames={['Pts']}
        teamNames={['New York Knicks']}
        lineList={['2.5','3.5','4.5','5.5']}
        selections={selections} 
        setSelections={setSelections}
      />
      <DataTable selections={selections}/>

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
