import React, { useState } from 'react';
import { PlayerProvider } from './PlayerContext'
import './App.css';
import Gameplay from './Gameplay/Gameplay';
import { BASE_ATTACK, BASE_POWER, PLAYER_LEFT, PLAYER_RIGHT } from './constants';

/**
 * Test write turn based war game.
 * You have two players, both of them have limited power.
 * Each player can commit some amount of power for the attack.
 * You can assume that players are not cheating and looking only at their half of the screen.
 * Who ever commits higher amount of power in a given round wins.
 * Write logic to simulate game:
 * - end games when one of the players have no more energy
 * - each turn player wins give them +10 points (NOT POWER)
 * - at the end final score = sum of points + power left fo player
 * - winner = player with more points.
 * 
 * 
 * Dont waste your time on making it pretty
 * As you go over the code that you see - point out the problems you see with it.
 * Please narrate what you are doing.
 * You will be required to write at least one test for a component and one for a hook.
 */

function App() {
    const [players, setPlayers] = useState({
        'gameplay': {
            player_left_attack_power: 0,
            player_right_attack_power: 0,
            winner: null,
        },
        'left': {
            power: BASE_POWER,
            played: false,
            attack: BASE_ATTACK,
            points: 0,
            winsCount: 0,
            turn: true,
            player: PLAYER_LEFT
        },
        'right':{
            power: BASE_POWER,
            played: false,
            attack: BASE_ATTACK,
            points: 0,
            winsCount: 0,
            turn: false,
            player: PLAYER_RIGHT
        }
        
    })

    

    return (
    <PlayerProvider value={[players, setPlayers]}>
        <div className="app">
             <Gameplay></Gameplay>
        </div>
    </PlayerProvider>
  );
}

export default App;
