import React from 'react';
import './DataTable.css';
export function DataTable() {
    return (
        <div id="dataTable">
            <span className='singleStat home'>
                <div className='tooltip'>
                    Home: W/L
                    <span className='homeHint'>Home games: Win/Loss</span>
                </div>
            </span>
            <span className='divider' />
            <span className='singleStat away'>
                <div className='tooltip'>
                    Away: W/L
                    <span className='awayHint'>Away games: Win/Loss</span>
                </div>
            </span>
            <span className='divider' />
            <span className='singleStat l5games'>
                <div className='tooltip'>
                    L5 Games: O/U
                    <span className='l5gamesHint'>Last 5 Games: Over/Under</span>
                </div>
            </span>
            <span className='divider' />
            <span className='singleStat l5home'>
                <div className='tooltip'>
                    L5 Home: O/U
                    <span className='l5homeHint'>Last 5 Home Games: Over/Under</span>
                </div>
            </span>
            <span className='divider' />
            <span className='singleStat l5away'>
                <div className='tooltip'>
                    L5 Away: O/U
                    <span className='l5awayHint'>Last 5 Away Games: Over/Under</span>
                </div>
            </span>
            <span className='divider' />
            <span className='singleStat l5vsTeam'>
                <div className='tooltip'>
                    L5 vs Team: O/U
                    <span className='l5vsTeamHint'>Last 5 Games vs this Team: Over/Under</span>
                </div>
            </span>
        </div>
    );
}