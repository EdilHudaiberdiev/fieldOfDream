import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../app/store';
import {checkFullWord, checkSymbol} from '../../../Features/mysteries/MysteriesSlice';

interface Props {
  maxSymbolsLimit: number
}
const SendForm: React.FC<Props> = ({maxSymbolsLimit}) => {
  const dispatch: AppDispatch = useDispatch();
  const [radio, setRadio] = useState('one');
  const [form, setForm] = useState<{word: string}>({
    word: '',
  });

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }});
  };

  const sendForm = (e: FormEvent) => {
    e.preventDefault();

    if (form.word.trim().length > 1 && radio === 'full') {
      dispatch(checkFullWord(form.word));
      setForm(prevState => ({...prevState, word: ''}));
    } else if (form.word.trim().length === 1 && radio === 'one') {
      dispatch(checkSymbol(form.word));
      setForm(prevState => ({...prevState, word: ''}));
    }
  };

  return (
    <form onSubmit={sendForm}>
      <div className="text-center mb-4">
        <div>
          <label htmlFor="radioOne" className="form-check-label" >
            <input
              className="form-check-input"
              type="radio"
              id="radioOne"
              name="inputType"
              value="one"
              defaultChecked
              onChange={() => setRadio('one')}
            />
            <span className='ms-2'>Ввод одной буквы</span>
          </label>
        </div>

        <div>
          <label className="form-check-label" htmlFor="radioFull">
            <input
              className="form-check-input"
              type="radio"
              name="inputType"
              value="radio"
              onChange={() => setRadio('full')}
            />
            <span className='ms-2'>Ввод всего слова</span>
          </label>
        </div>
      </div>

      <div className="mx-auto text-center">
        {radio === 'one' ?
          <input
            maxLength={1}
            value={form.word}
            name="word" type="text"
            className="form-control w-50 mx-auto"
            onChange={e => changeInputValue(e)}
          />
          :
          <input
            maxLength={maxSymbolsLimit}
            value={form.word}
            name="word" type="text"
            className="form-control w-50 mx-auto"
            onChange={e => changeInputValue(e)}/>
        }
        <button type="submit" className="btn btn-secondary my-3">Проверить</button>
      </div>
    </form>
  );
};

export default SendForm;