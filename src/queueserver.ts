import axios from "axios";

var axiosInstance = axios.create({
    baseURL: '/qs',
});

export enum PlanActionTypes {
    GETOVERVIEW = "PLANS/GETOVERVIEWS",
    LOADING = "PLANS/LOADING"
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

export type PlanActions =
  | IPlanGetOverviewAction
  | IPlanLoadingAction

export interface IPlanState {
    readonly plan: IPlan;
    readonly planLoading: boolean;
}

export const getOverview = async(): Promise<IPlan> => {
    const res = await axiosInstance.get('/');
    console.log(res)
    return res.data;
}
