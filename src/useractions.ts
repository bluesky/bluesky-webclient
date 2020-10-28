import { ActionCreator, AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { getUserByUsername as getUserByUsernameAPI,
    getProposalsForUser as getProposalsForUserAPI,
    getExperimentsForProposal as getExperimentsForProposalAPI,
    IUserState} from "./facility"
import { IUser, IProposal, IExperiment, UserInfo, UserActionTypes, IUserGetAction, IUserLoadingAction} from "./facility"

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
