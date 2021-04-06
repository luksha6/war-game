import React, { useContext } from 'react';
import { PlayerStats } from '../Player/Player'
import PlayerContext from '../PlayerContext';

function Gameplay() {
    const [playersContext] = useContext(PlayerContext);
      if (playersContext.gameplay.winner) {
          return (<div>Winner is: {playersContext.gameplay.winner} </div>)
     } else {

     return (
            <>
                <div className="container">
                    <PlayerStats player={playersContext.left.player} power={playersContext.left.power} points={playersContext.left.points} turn={playersContext.left.turn} key={playersContext.left.player} />
                    <PlayerStats player={playersContext.right.player} power={playersContext.right.power} points={playersContext.right.points} turn={playersContext.right.turn} key={playersContext.right.player} />
                </div>
             <hr />
             <p><b>COMBAT STATISTICS:</b></p>
            Left Player Attack: {playersContext.gameplay.player_left_attack_power} <br />
            Right Player Attack: {playersContext.gameplay.player_right_attack_power}
            </>
     );
     }
}

export default Gameplay;
