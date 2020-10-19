import { ActionCreator, AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { getUsers as getUsersAPI,
    getProposalsForUser as getProposalsForUserAPI,
    getExperimentsForProposal as getExperimentsForProposalAPI} from "./facility"
import { IUser, IProposal, IExperiment, UserInfo} from "./facility"
import { IUserGetAction, IUserLoadingAction, UserActionTypes} from "./user"

const loading: ActionCreator<IUserLoadingAction> = () => ({
    type: UserActionTypes.LOADING
});

export const getUsers: ActionCreator<ThunkAction<Promise<AnyAction>, null, null, IUserGetAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const users = await getUsersAPI();
        return dispatch({
          users,
          type: null
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
