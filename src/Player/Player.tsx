import React, { useContext, useState, useEffect } from 'react';
import PlayerContext from '../PlayerContext';
import { BASE_ATTACK, PLAYER_LEFT, PLAYER_RIGHT, POINTS_PER_WIN } from '../constants';
import './Player.css';

interface PlayerStatsProps {
    power: number
    turn: boolean
    points: number,
    player: 'left' | 'right'
}

function PlayerStats({ player, power, turn, points }: PlayerStatsProps) {
    const [playersContext, setPlayers] = useContext(PlayerContext);
    const [playerAttack, setPlayerAttack] = useState(BASE_ATTACK);

    // Check oposite player and store to variable
    const opositePlayer = player === PLAYER_LEFT ? PLAYER_RIGHT : PLAYER_LEFT;
    return (
        <>
         <div className={`playerContainer `}>
             <div>
                 {turn ? <div className="player-turn"><b>PLAYING:</b> </div> : null}
                    <hr/>
                 <div>Score: <b>{points}</b></div>
                <div>Attack wins: {playersContext[player].winsCount}</div>
                 <hr/>
                    <div><b>Current Power: {power}</b></div>
                    <div>
                     Attack power {player}
                        <input type="number" value={playerAttack} onChange={(e) => { setPlayerAttack(parseInt(e.target.value)) }} /></div>
                    <button onClick={() => {

                     // Check does user have enough power and is it 0 or bigger - 0 is allowed
                     if (playerAttack > power || playerAttack < 0) {
                        alert("Invalid player attack amount!");
                        return;
                     }
                     
                     // If not player turn
                     if (!turn) {
                         alert("Not your turn!");
                         return;
                     }
                                          
                     // Subtract playerPower by amount of his attack
                     playersContext[player].power = power - playerAttack;


                     // Set played value to turn
                     playersContext[player].played = true;

                     // Set play attack power value (prepare for round battle)
                     playersContext.gameplay['player_' + player + '_attack_power'] = playerAttack;
                    
                     // Check if both players have played

                     if (playersContext.left.played && playersContext.right.played) {
                         //If player who is playing round make bigger amount of attack power then oposite
                         if (playersContext.gameplay['player_' + player + '_attack_power'] > playersContext.gameplay['player_' + opositePlayer + '_attack_power']) {
                            // Update points by round winner
                             playersContext[player].points += POINTS_PER_WIN;
                             
                             // Update win count
                            playersContext[player].winsCount++;

                        // If oposite player did more attack power
                        } else if (playersContext.gameplay['player_' + player + '_attack_power'] < playersContext.gameplay['player_' + opositePlayer + '_attack_power']) {
                            playersContext[opositePlayer].points += POINTS_PER_WIN;
                            playersContext[opositePlayer].winsCount++;
                        // Amount of attack power is same
                        } else {
                            alert("draw!");
                         }
                         
                        // Round is finished and if one of player have 0 power check who is winner
                         if (playersContext[player].power === 0 || playersContext[opositePlayer].power === 0) {
                                // Append power to player points
                                playersContext.left.points += playersContext.left.power;
                                playersContext.right.points += playersContext.right.power;
                                // Check is left player winner
                                if (playersContext.left.points > playersContext.right.points) {
                                    playersContext.gameplay.winner = 'left - POINTS: ' + playersContext.left.points + ' (power added - ' + playersContext.left.power + ')' + ' (rounds won - ' + playersContext.left.winsCount + ') ||| RIGHT statistics: POINTS: ' + playersContext.right.points + ' (power added - ' + playersContext.right.power + ')' + ' (rounds won - ' + playersContext.right.winsCount + ')';
                                // Check is right player winner
                                } else if (playersContext.left.points < playersContext.right.points) {
                                    playersContext.gameplay.winner = 'right - POINTS: ' + playersContext.right.points + ' (power added - ' + playersContext.right.power + ')' + ' (rounds won - ' + playersContext.right.winsCount + ') ||| LEFT statistics: POINTS: ' + playersContext.left.points + ' (power added - ' + playersContext.left.power + ')' + ' (rounds won - ' + playersContext.left.winsCount + ')';
                                //It is draw
                                } else {
                                    playersContext.gameplay.winner = 'No winner! - DRAW';
                                }
                            
                        } 
                         
                        // Reset player values after round is finish
                        playersContext.left.played = false;
                        playersContext.right.played = false;
                        playersContext.gameplay.player_left_attack_power = BASE_ATTACK;
                        playersContext.gameplay.player_right_attack_power = BASE_ATTACK;
                    }
                     
                     
                     // Change player turn
                     playersContext[player].turn = !playersContext[player].turn
                     playersContext[opositePlayer].turn = !playersContext[opositePlayer].turn
                     // reset player attack
                     setPlayerAttack(BASE_ATTACK)
                     // Update context
                     setPlayers({ ...playersContext });
          }}
          >Attack</button>
        </div>
        <div>
          Attack: {playerAttack}
             </div>
            </div>
            </>
    )

}
  

export {PlayerStats}