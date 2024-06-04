import './ParlayBuilder.css';
import { useState, useEffect } from 'react';

export function ParlayBuilder({selections, playerObj, addParlayLeg, removeParlayLeg, parlayLegs}) {
    const [arrOfPropStreak, setArrOfPropStreak] = useState([]);
    const [winProbability, setWinProbability] = useState(0);
    const [arrOfParlayStreak, setArrOfParlayStreak] = useState([]);

    // Computes win rate of a single prop line
    function computePropStreak(propObject) {
        var retArr = []
        last10Games = playerObj["gameHistory"].slice(0, 10).reverse();
        tmpProp = propObject.prop === "3pt" ? "3pt_made" : propObject.prop;
        var sums = []
        if (propObject.prop.includes("_")) {
            last10Games.forEach((elem) => {
                tmp = 0
                if (propObject.prop.includes("pts"))
                    tmp += elem["points"];
                if (propObject.prop.includes("reb"))
                    tmp += elem["rebounds"];
                if (propObject.prop.includes("ast"))
                    tmp += elem["assists"];
                sums.push(tmp);
            })
        } else {
            last10Games.forEach((elem) => {
                sums.push(elem[tmpProp])    
            })
        }
        if (propObject.lineType === "under") {
            retArr = sums.map((elem) => {
                return (elem <= parseInt(selections.line))
            });
        } else if (propObject.lineType === "over") {
            retArr = sums.map((elem) => {
                return (elem > parseInt(selections.line))
            });
        } else { // For when plus prop added
            retArr = sums.map((elem) => {
                return (elem >= parseInt(selections.line))
            });
        }
        return retArr;
    }

    // Computes the win rate of all selected prop lines
    function computeParlayStreak() {
        var retArr = []
        var probability = 0
        for (let i = 0; i < 10; i++) {
            var currBool = true;
            arrOfPropStreak.forEach((elem) => {
                currBool = currBool && elem[i];
            });
            retArr.push(currBool);
            if (currBool) probability += 10
        }
        return [retArr, probability];
    }

    function removeElemInPropStreak(ind) {
        // Edge case: empty array
        if (arrOfPropStreak.length === 0 || ind >= arrOfPropStreak.length) return;
        // Edge case: Removing element from an array of size 1
        if (ind === 0 && arrOfPropStreak.length === 1) {
            setArrOfPropStreak([]);
            return;
        }
        setArrOfPropStreak(arrOfPropStreak.toSpliced(ind, 1))
    }

    useEffect(() => {
        var tmp = computeParlayStreak()
        setArrOfParlayStreak(tmp[0])
        setWinProbability(tmp[1])
    }, [arrOfPropStreak])

    return (
        <div id="parlayBuilderWrapper">
            <div id="marginDiv" style={{margin: "5px 10px"}}>
                <div id="parlayBuilderHeader">
                    <span id="parlayBuilderTitle">Parlay Builder</span>
                    <button id="addOverButton" 
                        onClick={(event) => {
                            obj = {
                                "line": selections.line,
                                "prop": selections.playerProp,
                                "player": selections.player,
                                "lineType": "over"
                            }
                            addParlayLeg(obj);
                            setArrOfPropStreak(arrOfPropStreak.toSpliced(arrOfPropStreak.length, 0, computePropStreak(obj)));
                        }
                    }>
                        + Add current over leg to parlay
                    </button>
                    <button id="addUnderButton" 
                        onClick={(event) => {
                            obj = {
                                "line": selections.line,
                                "prop": selections.playerProp,
                                "player": selections.player,
                                "lineType": "under"
                            }
                            addParlayLeg(obj);
                            setArrOfPropStreak(arrOfPropStreak.toSpliced(arrOfPropStreak.length, 0, computePropStreak(obj)));
                        }
                    }>
                        + Add current under leg to parlay
                    </button>
                    {/* <button id="addPlusButton" 
                        onClick={(event) => {
                            obj = {
                                "line": selections.line,
                                "prop": selections.playerProp,
                                "player": selections.player,
                                "lineType": "plus"
                            }
                            addParlayLeg(obj);
                            setArrOfPropStreak(arrOfPropStreak.toSpliced(arrOfPropStreak.length, 0, computePropStreak(obj)));
                        }
                    }>
                        + Add current plus leg to parlay
                    </button> */}
                </div>
                <div id="parlayLegs">
                    <ul className="list">
                        {parlayLegs.map((elem, index) => {
                            return <ParlayLeg removeParlayLeg={removeParlayLeg} removeElemInPropStreak={removeElemInPropStreak} propObject={elem} value={index} />
                           
                        })}
                    </ul>
                </div>
                <div id="streakDisplay">
                    <span>Last 10 games win rate: {winProbability}% </span>
                    {arrOfParlayStreak.map((elem) => {
                        if (elem) 
                            return <span className="win">O</span> 
                        else 
                            return <span className="lose">X</span>
                    })}
                </div>
            </div>
        </div>
    )
}

function ParlayLeg({removeParlayLeg, removeElemInPropStreak, propObject, value}) {
    return (<li key={value} value={value}>
            <span className="removeButton" onClick={(event) => {removeParlayLeg(event.target.parentElement.value); removeElemInPropStreak(event.target.parentElement.value)}}>-</span>
            {propObject.player} {propObject.lineType === "plus" ? propObject.line + "+" : propObject.lineType + " " +  propObject.line} {propObject.prop.replaceAll("_", "+")}
        </li>)
}
