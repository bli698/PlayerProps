import './BetSelection.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export function BetSelection({playerNames=[], propNames=[], teamNames=[], lineList, playerObj, selections, setSelections, setOdds}) {
    return (
        <div id='betSelection'>
            <Form onSubmit={(e) => {e.preventDefault()}}>
                <Row>
                    <Form.Group id='playerSelect' className="formGroup">
                        <Form.Label className='formLabel'>Player: </Form.Label>
                        <Form.Select className='playerDropdown' value={selections.player} onChange={(event) => {
                            setSelections({...selections, player: event.target.value});
                        }}> 
                            {playerNames.map((element, i) => {
                                return <option key={i} value={element}>{element}</option>;
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group id='propSelect' className='formGroup'>
                        <Form.Label className='formLabel'>Prop: </Form.Label>
                        <Form.Select className='propDropdown' value={selections.playerProp} onChange={(event) => {
                            tmpLine = Object.keys(playerObj["overUnder"][event.target.value]).sort()[0]
                            setSelections({...selections, playerProp: event.target.value, 
                                line: tmpLine});
                            setOdds([playerObj["overUnder"][event.target.value][tmpLine][0], playerObj["overUnder"][event.target.value][tmpLine][1]]);
                        }}>
                            {propNames.map((element, i) => {
                                return <option key={i} value={element}>{element.replaceAll("_", "+")}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group id='teamSelect' className='formGroup'>
                        <Form.Label className='formLabel'>Team: </Form.Label>
                        <Form.Select className='teamDropdown' onChange={(event) => {setSelections({...selections, team: event.target.value})}}>
                            <option key='-1' value="ALL">ALL</option>
                            {teamNames.map((element, i) => {
                                return <option key={i} value={element}>{element}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group id='lineSelect' className='formGroup'>
                        <Form.Label className='formLabel'>Line: </Form.Label>
                        <Form.Select className='lineDropdown' value={selections.line} 
                            onChange={(event) => {setSelections({...selections, line: event.target.value});
                                setOdds([playerObj["overUnder"][selections.playerProp][event.target.value][0], playerObj["overUnder"][selections.playerProp][event.target.value][1]])
                            }}>
                            {lineList.map((element, i) => {
                                return <option key={i} value={element}>{element}</option>
                            })}
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )
}