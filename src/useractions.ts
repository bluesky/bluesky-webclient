import { ActionCreator, AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { getUserByUsername as getUserByUsernameAPI,
         IUserState} from "./facility"
import { UserActionTypes, IUserGetAction, IUserLoadingAction} from "./facility"
import { loginAPI, registerAPI } from "./userapi"

const loading: ActionCreator<IUserLoadingAction> = () => ({
    type: UserActionTypes.LOADING
});

export const getUser: ActionCreator<ThunkAction<Promise<AnyAction>, IUserState, null, IUserGetAction>> = (username: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const user = await getUserByUsernameAPI(username);
        return dispatch({
          user,
          type: UserActionTypes.GETINFO
        });
    };
};

export const loginActionCreator: ActionCreator<ThunkAction<Promise<AnyAction>, any, null, any>> = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
      console.log("loginActionCreator")
      dispatch(loading());
      const result = await loginAPI(username, password);
      console.log("loginActionCreator2")
      return dispatch({
        result,
        type: UserActionTypes.LOGIN,
      });
  };
};

export const registerActionCreator: ActionCreator<ThunkAction<Promise<AnyAction>, any, null, any>> = (firstName: string, lastName: string, 
                                                                                               email: string, password: string) => {
  return async (dispatch: Dispatch) => {
      console.log("registerActioinCreator")
      dispatch(loading());
      const result = await registerAPI(firstName, lastName, email, password);
      return dispatch({
        result,
        type: UserActionTypes.REGISTER,
      });
  };
};