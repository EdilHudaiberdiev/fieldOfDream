import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../app/hooks';
import {AppDispatch} from '../../app/store';
import GameButtonsBlock from '../../Components/FieldOfDreamGame/GameButtonsBlock/GameButtonsBlock';
import GameProcessBlock from '../../Components/FieldOfDreamGame/GameProcessBlock/GameProcessBlock';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {
  selectMysteriesGameProcess,
  selectMysteriesIsLoading,
  selectMysteriesList
} from '../../Features/mysteries/MysteriesSlice';
import {getAllMysteries} from '../../Features/mysteries/MysteriesThunk';

const FieldOfDream = () => {
  const dispatch: AppDispatch = useDispatch();
  const mysteriesList = useAppSelector(selectMysteriesList);
  const mysteriesIsLoading = useAppSelector(selectMysteriesIsLoading);
  const mysteriesGameProcess = useAppSelector(selectMysteriesGameProcess);


  useEffect(() => {
    dispatch(getAllMysteries());
  }, [dispatch]);

  return (
    <>
      {mysteriesIsLoading ? <Spinner/> :
        <>
          {mysteriesList?.length === 0 ?
            <p>К сожалению загадки отсутствуют</p>
            :
            <>
              <GameButtonsBlock mysteriesGameProcess={mysteriesGameProcess}/>
              <GameProcessBlock mysteriesGameProcess={mysteriesGameProcess}/>
            </>
          }
        </>
      }
    </>
  );
};

export default FieldOfDream;