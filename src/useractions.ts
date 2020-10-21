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

// export const getProposalsForUser: ActionCreator<ThunkAction<Promise<AnyAction>, null, null, IPlanObjectsAction>> = (userId: number) => {
//     return async (dispatch: Dispatch) => {
//         dispatch(loading());
//         const plans = await getProposalsForUserAPI(userId);
//         return dispatch({
//           plans,
//           type: null
//         });
//     };
// };

// export const getExperimentsForProposal: ActionCreator<ThunkAction<Promise<AnyAction>, null, null, IPlanSubmitAction>> = (proposalId: number) => {
//     return async (dispatch: Dispatch) => {
//         dispatch(loading());
//         const experiments = await getExperimentsForProposalAPI(proposalId);
//         return dispatch({
//           plan,
//           type: null
//         });
//     };
// };
