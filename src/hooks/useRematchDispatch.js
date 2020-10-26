import { useDispatch } from 'react-redux';

const useRematchDispatch = (selector) => {
  const dispatch = useDispatch();
  return selector(dispatch);
};

export default useRematchDispatch;
