import { useDispatch } from "react-redux";

import { getSuccessMessage, getErrorMessage } from "../views/app/ducks";

export const useShowSuccessMessage = () => {
  const dispatch = useDispatch();
  return () => {
    dispatch(getSuccessMessage());
  };
};

export const useShowErrorMessage = () => {
  const dispatch = useDispatch();
  return (message) => {
    dispatch(getErrorMessage(message));
  };
};
