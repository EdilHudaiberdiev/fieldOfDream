import React from 'react';
import {IGameProcess} from '../../../types';

interface Props {
  gameProcess: IGameProcess;
}
const MessageToUser: React.FC<Props> = ({gameProcess}) => {
  return (
    <>
      {gameProcess.messageToUser.length > 0 ?
        <div className={`alert alert-${gameProcess?.win ? 'success' : 'warning'}`} role="alert">
          {gameProcess.messageToUser}
        </div>
        : null
      }
    </>
  );
};

export default MessageToUser;