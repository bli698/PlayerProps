import "./BarChart.css";
import React, { useState, useEffect } from 'react';
import { getPlayerData } from '../utilities/database';
import Plot from 'react-plotly.js';

export function BarChart({selections, playerObj}) {
    last10Games = []
    if (playerObj !== undefined) {
        last10Games = playerObj[selections.player]['gameHistory'].slice(0, 10)
        last10Games = last10Games.reverse()
    }
    // Extra nesting so component does not rerender
    var sums = []
    if (selections.playerProp.includes("_")) {
        last10Games.forEach((elem) => {
            tmp = 0
            if (selections.playerProp.includes("pts"))
                tmp += elem["points"];
            if (selections.playerProp.includes("reb"))
                tmp += elem["rebounds"];
            if (selections.playerProp.includes("ast"))
                tmp += elem["assists"];
            sums.push(tmp);
        })
    }

    return (
        playerObj === undefined ? <></> :
        <span id='barChartWrapper'>
            <Plot
                id="barChart"
                data={last10Games[0] !== undefined ? [
                    {
                        type: "bar",
                        x:  last10Games.map((elem) => {
                            return elem['date'];
                        }),
                        y: selections.playerProp.includes("_") ? sums :
                        last10Games.map((elem) => {
                            if (selections.playerProp === "3pt") { 
                                return elem[(selections.playerProp + "_made")];
                            }
                            return elem[selections.playerProp];

                        }),
                        marker: {
                            color: selections.playerProp.includes("_") ? sums.map((elem) => {
                                return (elem > parseInt(selections.line)) ? "rgba(80,200,120,1)" : "rgba(255,0,0,1)";
                            }) : last10Games.map((elem) => {
                                tmpProp = selections.playerProp === "3pt" ? selections.playerProp + "_made" : selections.playerProp;
                                return (elem[tmpProp] > parseInt(selections.line)) ? "rgba(80,200,120,1)" : "rgba(255,0,0,1)";
                            })
                        }

                    }
                ] : [/*empty if last10Games is empty*/]}
                layout={last10Games[0] !== undefined ? {
                    xaxis: {
                        title: "Date",
                        showline: true
                    },
                    yaxis: {
                        title: selections.playerProp,
                        showline: true
                    },
                    shapes: [{
                        type: 'line',
                        x0: -0.5,
                        x1: 9.5,
                        y0: selections.line,
                        y1: selections.line,
                        line: {
                            color: 'reg(255,255,255)',
                            width: 3
                        }
                    }],
                }: {/*empty if last10Games is empty*/}}
                useResizehandler={true}
                style={{flex: 1}}
            >
            </Plot>

        </span>
    )
}