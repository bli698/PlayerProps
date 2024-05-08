import {View} from 'react-native';
import React, {useState} from 'react';
import './SportSelection.css';

export function SportSelection({sport, setSport}) {

    return (
        <div id="sportSelection">
            <span className={sport === 'nba' ? "tab-button active-tab" : "tab-button"} onClick={() => setSport('nba')}>NBA</span>
            <span className={sport === 'mlb' ? "tab-button active-tab" : "tab-button"} onClick={() => setSport('mlb')}>MLB</span>
        </div>
    );
}