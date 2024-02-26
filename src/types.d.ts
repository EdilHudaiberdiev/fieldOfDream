export interface IMistery {
  id: string;
  question: string;
  answer: string;
}

export interface IGameProcess {
  question: IMistery,
  wordProcess: string[],
  win: boolean;
  endGame: boolean,
  messageToUser: string;
}