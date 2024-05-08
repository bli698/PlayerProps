import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SportSelection } from './components/SportSelection';
import { BetSelection } from './components/BetSelection';
import { Col } from 'react-bootstrap';
import './App.css';

export default function App() {
  const [sport, setSport] = useState('nba');
  const [selections, setSelections] = useState({player: "", prop: "", vs: "", line: ""});
  return (
    <>
      <SportSelection sport={sport} setSport={setSport}/>
      <BetSelection playerNames={['a','b','c']} selections={selections} setSelections={setSelections}/>
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
