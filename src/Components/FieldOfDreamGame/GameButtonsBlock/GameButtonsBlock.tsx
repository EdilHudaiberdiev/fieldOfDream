import React from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../app/store';
import {endGame, resetGameToMenu, startGame} from '../../../Features/mysteries/MysteriesSlice';
import {IGameProcess} from '../../../types';

interface Props {
  mysteriesGameProcess: IGameProcess | null;
}
const GameButtonsBlock: React.FC<Props> = ({mysteriesGameProcess}) => {
  const dispatch: AppDispatch = useDispatch();

  const checkEndGameStatus = () => {
    return mysteriesGameProcess?.endGame === false;
  };

  return (
    <div className="text-center mb-5 ">
      {mysteriesGameProcess === null  ?
        <div className="alert alert-secondary text-center" role="alert">
          <h1>Click to start game called "Field of Dream"</h1>
          <p className="mb-5 opacity-50">Try to guess the hidden word</p>
          <button type="button" className="btn btn-secondary" onClick={() => dispatch(startGame())}>Start Game</button>
        </div>
        :
        <>
          {checkEndGameStatus()  ?
            <button className="btn btn-light" onClick={() => dispatch(endGame())}>End Game ?</button>
            :
            <button  className="btn btn-secondary" onClick={() => dispatch(resetGameToMenu())}>Reset Game</button>
          }
        </>
      }
    </div>
  );
};

export default GameButtonsBlock;