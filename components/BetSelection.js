import './BetSelection.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export function BetSelection({playerNames, selections, setSelections}) {
    return (
        <div id='betSelection'>
            <Form onSubmit={(e) => {e.preventDefault()}}>
                <Row>
                    <Form.Group id='playerSelect' className="formGroup">
                        <Form.Label className='formLabel'>Player: </Form.Label>
                        <Form.Select className='playerDropdown' onChange={(event) => {setSelections({...selections, player: event.target.value})}}> 
                            {playerNames.map((element, i) => {
                                return <option key={i} value={element}>{element}</option>;
                            })}
                        </Form.Select>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )
}