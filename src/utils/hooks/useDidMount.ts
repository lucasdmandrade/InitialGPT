/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';

type GenericFunc = (value?: any) => void;

const useDidMount = (...funcs: GenericFunc[]) => {
  useEffect(() => {
    funcs.forEach(func => func());
  }, []);
};

export default useDidMount;
