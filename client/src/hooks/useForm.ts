import React, { useState } from 'react';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface UseFormOptions<T> {
  initialState: T;
}

const useForm = <T>({ initialState }: UseFormOptions<T>) => {
  const [state, setState] = useState<T>(initialState);

  const inputChangeHandler = (event: InputChangeEvent) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetForm = () => {
    setState(initialState);
  };

  return { state, inputChangeHandler, resetForm };
};

export default useForm;
