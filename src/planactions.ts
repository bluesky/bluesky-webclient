import { State } from "history";
import { Action, ActionCreator, AnyAction, Dispatch } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { getStatus as getStatusAPI,
         getQueuedPlans as getQueuedPlansAPI,
         getAllowedPlans as getAllowedPlansAPI,
         getHistoricalPlans as getHistoricalPlansAPI,
         submitPlan as submitPlanAPI,
         submitExcel as submitExcelAPI,
         clearQueue as clearQueueAPI,
         deletePlan as deletePlanAPI,
         submitEditedPlan as editPlanAPI,
         modifyEnvironment as modifyEnvironmentAPI, EnvOps,
         modifyQueue as modifyQueueAPI, QueueOps, IAllowedPlansState, 
                        IHistoricalPlansState, IAllowedPlansGetAction, IHistoricalPlansGetAction, 
                        AllowedPlansActionTypes, HistoricalPlansActionTypes, ISubmitPlanObject, 
                        IEditPlanObject, 
                        ISubmitExcelState,
                        ISubmitExcelAction} from "./queueserver"
import { IStatus, IGetStatusAction, IPlanGetStatusAction, IPlanLoadingAction, IPlanObjectsAction, 
         IPlanSubmitAction, IPlanEditAction, IPlanEditState,
         IPlanState, IPlanObjectsState, IPlanSubmitState, PlanActionTypes } from "./queueserver"
import { IApplicationState } from "./store";


const loading: ActionCreator<IPlanLoadingAction> = () => ({
    type: PlanActionTypes.LOADING
});

export const getStatus: ActionCreator<ThunkAction<Promise<AnyAction>, IApplicationState, null, IGetStatusAction>> = () => {
    return async (dispatch: ThunkDispatch<any, void, any>, getState) => {
        dispatch(loading());
        const status = await getStatusAPI();
        const state = getState();
        // Update state if status uid has changed.
        if (state.status.plan_history_uid != status.plan_history_uid) {
            dispatch(getHistoricalPlans())
        }
        if (state.status.plan_queue_uid != status.plan_queue_uid) {
            dispatch(getQueuedPlans())
        }
        return dispatch({
          status,
          type: PlanActionTypes.GETSTATUS
        });
    };
};

export const getPlanStatus: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanState, null, IPlanGetStatusAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plan = await getStatusAPI();
        return dispatch({
          plan,
          type: PlanActionTypes.GETPLANSTATUS
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

export const submitPlan: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanSubmitState, null, IPlanSubmitAction>> = (submitPlan: ISubmitPlanObject) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plan = await submitPlanAPI(submitPlan);
        return dispatch({
          plan,
          type: PlanActionTypes.SUBMITPLAN
        });
    };
};

export const submitExcel: ActionCreator<ThunkAction<Promise<AnyAction>, ISubmitExcelState, null, ISubmitExcelAction>> = (files: File[]) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plan = await submitExcelAPI(files);
        return dispatch({
          plan,
          type: PlanActionTypes.SUBMITEXCEL
        });
    };
};

export const submitEditedPlan: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanEditState, null, IPlanEditAction>> = (itemUid: string, editPlan: IEditPlanObject) => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plan = await editPlanAPI(itemUid, editPlan);
        return dispatch({
          plan,
          type: PlanActionTypes.SUBMITEDITEDPLAN
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
