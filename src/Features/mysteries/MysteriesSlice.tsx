import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {IGameProcess, IMistery} from '../../types';
import {getAllMysteries} from './MysteriesThunk';


interface misteriesState {
  mysteries: IMistery[];
  gameProcess: IGameProcess | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: misteriesState = {
  mysteries: [],
  gameProcess: null,
  isLoading: false,
  isError: false,
};

export const selectMysteriesList = (state: RootState) => state.mysteries?.mysteries;
export const selectMysteriesIsLoading = (state: RootState) => state.mysteries?.isLoading;
export const selectMysteriesGameProcess = (state: RootState) => state.mysteries?.gameProcess;


const MysteriesSlice = createSlice({
  name: 'mysteries',
  initialState,
  reducers: {
    resetGameToMenu: (state) => {
      state.gameProcess = null;
    },
    startGame: (state) => {
      if (state.mysteries.length > 0) {
        const randomMystery = state.mysteries[Math.floor(Math.random() * state.mysteries.length)];
        const wordToProcess = randomMystery.answer.split("").map(() => "_");

        state.gameProcess = {
          ...state.gameProcess,
          question: randomMystery,
          wordProcess: wordToProcess,
          win: false,
          endGame: false,
          messageToUser: '',
        };
      }

    },
    endGame: (state) => {
      if (state.gameProcess) {
        state.gameProcess.endGame = true;
        state.gameProcess.messageToUser = 'К сожалению слово не было отгадано до конца';
      }
    },
    checkAllWordToWin: (state) => {
      if (state.gameProcess !== null) {
        if (state.gameProcess.question.answer === state.gameProcess.wordProcess.join('')
        ) {
          state.gameProcess.win = true;
          state.gameProcess.endGame = true;
          state.gameProcess.messageToUser = 'Поздравляем, ты выиграл!';
        }
      }

    },
    checkFullWord: (state, action: PayloadAction<string>) => {
      if (state.gameProcess !== null) {
        if (state.gameProcess.question.answer === action.payload.toLowerCase()) {
          state.gameProcess.wordProcess = action.payload.split('');
          state.gameProcess.win = true;
          state.gameProcess.endGame = true;
          state.gameProcess.messageToUser = 'Поздравляем, ты выиграл! ';
        } else {
          state.gameProcess.messageToUser = 'Кажется это не то слово, попробуй снова :c ';
        }
      }
    },
    checkSymbol: (state, action: PayloadAction<string>) => {
      const symbolToCheck = action.payload.toLowerCase();

      if (state.gameProcess !== null) {
        const mysteryWord =   state.gameProcess.question.answer.split("");

       mysteryWord.map((item, index) => {
         if (item === symbolToCheck && state.gameProcess !== null) {
           state.gameProcess.wordProcess[index] = symbolToCheck;
         }
       });

        MysteriesSlice.caseReducers.checkAllWordToWin(state);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMysteries.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getAllMysteries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.mysteries = action.payload;
    });
    builder.addCase(getAllMysteries.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});


export const MysteriesReducer = MysteriesSlice.reducer;
export const {
  startGame,
  endGame,
  resetGameToMenu,
  checkSymbol,
  checkFullWord,
} = MysteriesSlice.actions;