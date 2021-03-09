import { ActionCreator, AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { getOverview as getOverviewAPI,
         getQueuedPlans as getQueuedPlansAPI,
         getAllowedPlans as getAllowedPlansAPI,
         getHistoricalPlans as getHistoricalPlansAPI,
         submitPlan as submitPlanAPI,
         clearQueue as clearQueueAPI,
         deletePlan as deletePlanAPI,
         editPlan as editPlanAPI,
         modifyEnvironment as modifyEnvironmentAPI, EnvOps,
         modifyQueue as modifyQueueAPI, QueueOps, IAllowedPlansState, 
                        IHistoricalPlansState, IAllowedPlansGetAction, IHistoricalPlansGetAction, 
                        AllowedPlansActionTypes, HistoricalPlansActionTypes, ISumbitPlanObject, 
                        IEditPlanObject } from "./queueserver"
import { IPlanGetOverviewAction, IPlanLoadingAction, IPlanObjectsAction, 
         IPlanSubmitAction, IPlanEditAction, IPlanEditState,
         IPlanState, IPlanObjectsState, IPlanSubmitState, PlanActionTypes } from "./queueserver"

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

export const getAllowedPlans: ActionCreator<ThunkAction<Promise<AnyAction>, IAllowedPlansState, null, IAllowedPlansGetAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const allowedPlans = await getAllowedPlansAPI();
        return dispatch({
          allowedPlans,
          type: AllowedPlansActionTypes.GET
        });
    };
};

export const getHistoricalPlans: ActionCreator<ThunkAction<Promise<AnyAction>, IHistoricalPlansState, null, IHistoricalPlansGetAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const historicalPlans = await getHistoricalPlansAPI();
        return dispatch({
          historicalPlans,
          type: HistoricalPlansActionTypes.GET
        });
    };
};

export const submitPlan: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanSubmitState, null, IPlanSubmitAction>> = (submitPlan: ISumbitPlanObject) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plan = await submitPlanAPI(submitPlan);
        return dispatch({
          plan,
          type: PlanActionTypes.SUBMITPLAN
        });
    };
};

export const editPlan: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanEditState, null, IPlanEditAction>> = (editPlan: IEditPlanObject) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plan = await editPlanAPI(editPlan);
        return dispatch({
          plan,
          type: PlanActionTypes.EDITPLAN
        });
    };
};

export const modifyEnvironment: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanSubmitState, null, IPlanSubmitAction>> = (op: EnvOps) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const env = await modifyEnvironmentAPI(op);
        return dispatch({
          env,
          type: PlanActionTypes.MODIFYENVIRONMENT
        });
    };
};

export const modifyQueue: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanSubmitState, null, IPlanSubmitAction>> = (opId: QueueOps) => {
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

export const deletePlan: ActionCreator<ThunkAction<Promise<AnyAction>, null, null, any>> = (item_uid: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const queueState = await deletePlanAPI(item_uid);
        return dispatch({
            queueState,
            type: PlanActionTypes.DELETEPLAN
        });
    };
};