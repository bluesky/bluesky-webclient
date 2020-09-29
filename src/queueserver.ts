import axios from "axios";

var axiosInstance = axios.create({
    baseURL: '/qs',
});

export enum PlanActionTypes {
    GETOVERVIEW = "PLANS/GETOVERVIEWS",
    LOADING = "PLANS/LOADING",
    GETPLANLIST = "PLANS/GETPLANLIST"
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

export type PlanActions =
  | IPlanGetOverviewAction
  | IPlanLoadingAction
  | IPlanObjectsAction
  | IPlanObjectsLoadingAction

export interface IPlanState {
    readonly plan: IPlan;
    readonly planLoading: boolean;
}

export const getOverview = async(): Promise<IPlan> => {
    const res = await axiosInstance.get('/');
    console.log(res)
    return res.data;
}

export interface IPlanObjectsState {
    readonly plans: IPlanObject[];
    readonly plansLoading: boolean;
}

export const getQueuedPlans = async(): Promise<IPlanObject[]> => {
    const res = await axiosInstance.get('/queue_view');
    console.log(res)
    return res.data.queue;
}
