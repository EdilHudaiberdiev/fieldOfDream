import React from 'react';
import {IGameProcess} from '../../../types';
import MessageToUser from '../MessageToUser/MessageToUser';
import SendForm from '../SendForm/SendForm';

interface Props {
  mysteriesGameProcess: IGameProcess | null;
}
const GameProcessBlock: React.FC<Props> = ({mysteriesGameProcess}) => {

  const checkOnWinOrEndGame = () => {
    return mysteriesGameProcess?.win || mysteriesGameProcess?.endGame;
  };

  const checkOnEndGameWithoutWin = () => {
    return mysteriesGameProcess?.endGame && !mysteriesGameProcess?.win;
  };

  return  (
    <>
      {mysteriesGameProcess !== null ?
        <>
          <div className="alert alert-secondary text-center" role="alert">
            <h3>{mysteriesGameProcess.question.question}</h3>
            <span className="opacity-50">Слово состоит из {mysteriesGameProcess?.question.answer.length} букв</span>

            {checkOnEndGameWithoutWin() ?
              <p className="fs-1 mb-3">{mysteriesGameProcess.question.answer}</p>
              :
              <p className="fs-1 mb-3">{mysteriesGameProcess.wordProcess.join(' ')}</p>
            }

            <MessageToUser gameProcess={mysteriesGameProcess}/>
          </div>

          {checkOnWinOrEndGame() ?
            null
            :
            <SendForm maxSymbolsLimit={mysteriesGameProcess?.question.answer.length}/>
          }
        </>
        :
        null
      }
    </>
  );
};

export default GameProcessBlock;