import { ActionCreator, AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { getOverview as getOverviewAPI,
    getQueuedPlans as getQueuedPlansAPI,
    submitPlan as submitPlanAPI,
    clearQueue as clearQueueAPI} from "./queueserver"
import { IPlanGetOverviewAction, IPlanLoadingAction, IPlanObjectsAction, IPlanSubmitAction,
    IPlanState, IPlanObjectsState, IPlanSubmitState, PlanActionTypes} from "./queueserver"

const loading: ActionCreator<IPlanLoadingAction> = () => ({
    type: PlanActionTypes.LOADING
});

export const getOverview: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanState, null, IPlanGetOverviewAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plan = await getOverviewAPI();
        return dispatch({
          plan,
          type: PlanActionTypes.GETOVERVIEW
        });
    };
};

export const getQueuedPlans: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanObjectsState, null, IPlanObjectsAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plans = await getQueuedPlansAPI();
        return dispatch({
          plans,
          type: PlanActionTypes.GETPLANLIST
        });
    };
};

export const submitPlan: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanSubmitState, null, IPlanSubmitAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plan = await submitPlanAPI();
        return dispatch({
          plan,
          type: PlanActionTypes.SUBMITPLAN
        });
    };
};

export const clearQueue: ActionCreator<ThunkAction<Promise<AnyAction>, null, null, any>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const queueState = await clearQueueAPI();
        return dispatch({
            queueState,
            type: PlanActionTypes.GETPLANLIST
        });
    };
};