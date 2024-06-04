import "./BarChart.css";
import React from 'react';
import Plot from 'react-plotly.js';

export function BarChart({selections, playerObj}) {
    last10Games = playerObj['gameHistory'].slice(0, 10).reverse()

    var sums = []
    var dates = []
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
            dates.push(elem["date"])
        })
    } else {
        tmpProp = selections.playerProp === "3pt" ? "3pt_made" : selections.playerProp
        last10Games.forEach((elem) => {
            sums.push(elem[tmpProp])
            dates.push(elem["date"])

        })
    }

    return (
        playerObj === undefined ? <></> :
        <span id='barChartWrapper'>
            <Plot
                divId="barChart"
                data={[
                    {
                        type: "bar",
                        x: dates,
                        y: sums,
                        marker: {
                            color: sums.map((elem) => {
                                return (elem > parseInt(selections.line)) ? "rgba(80,200,120,1)" : "rgba(255,0,0,1)";
                            }) 
                        },
                        text: last10Games.map((elem) => {
                            return elem['opponent'] + '\n' + elem['mins'] + "m"
                        }),
                        textposition: 'outside',
                        hoverinfo: "y",
                    }
                ]}
                layout={{
                    margin: {
                        t: 40,
                        b: 50,
                        r: 50,
                    },
                    height: 550,
                    modebar: 'visible',
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
                        opacity: 0.6,
                        line: {
                            color: 'reg(255,255,255)',
                            width: 1.5,
                        }
                    }],
                    autosize: true,
                    dragmode: false,
                    
                }}
                useResizehandler={true}
                style={{flex: 1}}
            >
            </Plot>

        </span>
    )
}