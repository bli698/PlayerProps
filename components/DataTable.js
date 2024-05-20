import './DataTable.css';
import React, { useState, useEffect } from 'react';
import {getPlayerData} from '../utilities/database'

export function DataTable({selections, playerObj}) {
    return (
        <span id="dataTableWrapper">
            <div id='l5Header'>
                <span className='singleStat home'>
                    <div className='tooltip'>
                        Home: W/L
                        <span className='homeHint hint'>Home games: Win/Loss</span>
                    </div>
                </span>
                <span className='divider' />
                <span className='singleStat away'>
                    <div className='tooltip'>
                        Away: W/L
                        <span className='awayHint hint'>Away games: Win/Loss</span>
                    </div>
                </span>
                <span className='divider' />
                <span className='singleStat l5games'>
                    <div className='tooltip'>
                        L5 Games: O/U
                        <span className='l5gamesHint hint'>Last 5 Games: Over/Under</span>
                    </div>
                </span>
                <span className='divider' />
                <span className='singleStat l5home'>
                    <div className='tooltip'>
                        L5 Home: O/U
                        <span className='l5homeHint hint'>Last 5 Home Games: Over/Under</span>
                    </div>
                </span>
                <span className='divider' />
                <span className='singleStat l5away'>
                    <div className='tooltip'>
                        L5 Away: O/U
                        <span className='l5awayHint hint'>Last 5 Away Games: Over/Under</span>
                    </div>
                </span>
                <span className='divider' />
                <span className='singleStat l5vsTeam'>
                    <div className='tooltip'>
                        L5 vs Team: O/U
                        <span className='l5vsTeamHint hint'>Last 5 Games vs this Team: Over/Under</span>
                    </div>
                </span>
            </div>
            <div >
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Opp</th>
                            <th>Result</th>
                            <th>Min</th>
                            <th>FG</th>
                            <th>FG%</th>
                            <th>3PT</th>
                            <th>3PT%</th>
                            <th>FT</th>
                            <th>FT%</th>
                            <th>Reb</th>
                            <th>Ast</th>
                            <th>Blk</th>
                            <th>Stl</th>
                            <th>PF</th>
                            <th>TO</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(playerObj !== undefined) ? 
                            playerObj[selections.player]["gameHistory"].map((elem) => {
                                return <tr>
                                    <td>{elem["date"]}</td>
                                    <td>{elem["opponent"]}</td>
                                    <td>{elem["result"]}</td>
                                    <td>{elem["mins"]}</td>
                                    <td>{elem["fg_made"]}-{elem["fg_attempts"]}</td>
                                    <td>{(100.0*elem["fg_made"]/(elem["fg_attempts"] || 1)).toFixed(2)}%</td>
                                    <td>{elem["3pt_made"]}-{elem["3pt_attempts"]}</td>
                                    <td>{(100.0*elem["3pt_made"]/(elem["3pt_attempts"] || 1)).toFixed(2)}%</td>
                                    <td>{elem["ft_made"]}-{elem["ft_attempts"]}</td>
                                    <td>{(100.0*elem["ft_made"]/(elem["ft_attempts"] || 1)).toFixed(2)}%</td>
                                    <td>{elem["rebounds"]}</td>
                                    <td>{elem["assists"]}</td>
                                    <td>{elem["blocks"]}</td>
                                    <td>{elem["steals"]}</td>
                                    <td>{elem["personal_fouls"]}</td>
                                    <td>{elem["turnovers"]}</td>
                                    <td>{elem["points"]}</td>
                                </tr>
                            })
                            : null}
                    </tbody>
                </table>
            </div>
        </span>
    );
}