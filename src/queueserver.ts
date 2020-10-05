import axios from "axios";

var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_PREFIX,
});

export enum PlanActionTypes {
    GETOVERVIEW = "PLANS/GETOVERVIEWS",
    LOADING = "PLANS/LOADING",
    GETPLANLIST = "PLANS/GETPLANLIST",
    SUBMITPLAN = "PLANS/SUBMITPLAN",
    CLEARQUEUE = "PLANS/CLEARQUEUE",
}

export interface IPlan {
    manager_state: string,
    msg: string,
    plans_in_queue: number,
    running_plan_uid: string,
    worker_environment_exists: boolean
}

export interface IPlanGetOverviewAction {
    type: PlanActionTypes.GETOVERVIEW,
    plan: IPlan
}

export interface IPlanLoadingAction {
    type: PlanActionTypes.LOADING
}

export interface IPlanObject {
    args: (string|number|string[])[],
    name: string,
    plan_uid: string
}

export interface IPlanObjectsAction {
    type: PlanActionTypes.GETPLANLIST ,
    plans: IPlanObject[]
}

export interface IPlanObjectsLoadingAction {
    type: PlanActionTypes.LOADING
}

export interface IPlanSubmitAction {
    type: PlanActionTypes.SUBMITPLAN ,
    plan: IPlanObject
}

export interface IPlanSubmitLoadingAction {
    type: PlanActionTypes.LOADING
}

export type PlanActions =
  | IPlanGetOverviewAction
  | IPlanLoadingAction
  | IPlanObjectsAction
  | IPlanObjectsLoadingAction
  | IPlanSubmitAction
  | IPlanSubmitLoadingAction

export interface IPlanState {
    readonly plan: IPlan;
    readonly planLoading: boolean;
}

export const getOverview = async(): Promise<IPlan> => {
    const res = await axiosInstance.get('/status');
    console.log(res)
    return res.data;
}

export interface IPlanObjectsState {
    readonly plans: IPlanObject[];
    readonly plansLoading: boolean;
}

export const getQueuedPlans = async(): Promise<IPlanObject[]> => {
    const res = await axiosInstance.get('/queue/get');
    console.log(res);
    return res.data.queue;
}

export interface IPlanSubmitState {
    readonly plan: IPlanObject;
    readonly planLoading: boolean;
}

export const submitPlan = async(planId: number): Promise<IPlanObject> => {
    var planObj = {};
    if (planId === 0) {
        planObj = {
            name: "count",
            args: [["det1", "det2"]],
            kwargs: {"num": 10, "delay": 1}
        };
    }
    else {
        planObj = {
            name: "scan",
            args: [["det1", "det2"], "motor", -1, 1, 10 ]
        };
    }
    const res = await axiosInstance.post('/queue/plan/add',
        {
            plan: planObj
        });
    console.log(res);
    return res.data;
}

export const clearQueue = async(): Promise<IPlan> => {
    const res = await axiosInstance.post('/queue/clear',
        {});
    console.log(res);
    return res.data;
}
