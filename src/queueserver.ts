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
    MODIFYENVIRONMENT = "PLANS/MODIFYENVIRONMENT",
    MODIFYQUEUE = "PLANS/MODIFYQUEUE",
}

export interface IPlan {
    manager_state: string,
    msg: string,
    plans_in_queue: number,
    running_plan_uid: string,
    worker_environment_exists: boolean
}

export interface IPlanModify {
    msg: string;
    success: boolean;
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

export interface IPlanModifyEnvironmentAction {
    type: PlanActionTypes.MODIFYENVIRONMENT,
    modify: IPlanModify
}

export interface IPlanModifyEnvironmentLoadingAction {
    type: PlanActionTypes.LOADING
}

export interface IPlanModifyQueueAction {
    type: PlanActionTypes.MODIFYQUEUE,
    modify: IPlanModify
}

export interface IPlanModifyQueueLoadingAction {
    type: PlanActionTypes.LOADING
}

export type PlanActions =
  | IPlanGetOverviewAction
  | IPlanLoadingAction
  | IPlanObjectsAction
  | IPlanObjectsLoadingAction
  | IPlanSubmitAction
  | IPlanSubmitLoadingAction
  | IPlanModifyEnvironmentAction
  | IPlanModifyEnvironmentLoadingAction
  | IPlanModifyQueueAction
  | IPlanModifyQueueLoadingAction

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

export interface IPlanModifyState {
    readonly modify: IPlanModify;
    readonly loading: boolean;
}

export const modifyEnvironment = async(op: number): Promise<IPlanModify> => {
    var operation = "open";
    if (op === 0) {
        operation = "open";
    }
    else if (op === 1) {
        operation = "close";
    }
    else if (op === 2) {
        operation = "destroy";
    }
    const res = await axiosInstance.post(`/environment/${operation}`, {});
    console.log(res);
    return res.data;
}

export const modifyQueue = async(op: number): Promise<IPlanModify> => {
    var operation = "start";
    if (op === 0) {
        operation = "start";
    }
    else if (op === 1) {
        operation = "stop";
    }
    else if (op === 2) {
        operation = "halt";
    }
    else if (op === 3) {
        operation = "resume";
    }
    const res = await axiosInstance.post(`/queue/${operation}`, {});
    console.log(res);
    return res.data;
}
