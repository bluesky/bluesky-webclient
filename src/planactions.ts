import { ActionCreator, AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { getOverview as getOverviewAPI,
    getQueuedPlans as getQueuedPlansAPI,
    submitPlan as submitPlanAPI,
    clearQueue as clearQueueAPI,
    modifyEnvironment as modifyEnvironmentAPI,
    modifyQueue as modifyQueueAPI} from "./queueserver"
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

export const submitPlan: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanSubmitState, null, IPlanSubmitAction>> = (planId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plan = await submitPlanAPI(planId);
        return dispatch({
          plan,
          type: PlanActionTypes.SUBMITPLAN
        });
    };
};

export const modifyEnvironment: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanSubmitState, null, IPlanSubmitAction>> = (planId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const env = await modifyEnvironmentAPI(planId);
        return dispatch({
          env,
          type: PlanActionTypes.MODIFYENVIRONMENT
        });
    };
};

export const modifyQueue: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanSubmitState, null, IPlanSubmitAction>> = (opId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const queue = await modifyQueueAPI(opId);
        return dispatch({
          queue,
          type: PlanActionTypes.MODIFYQUEUE
        });
    };
};

export const clearQueue: ActionCreator<ThunkAction<Promise<AnyAction>, null, null, any>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const queueState = await clearQueueAPI();
        return dispatch({
            queueState,
            type: PlanActionTypes.CLEARQUEUE
        });
    };
};
