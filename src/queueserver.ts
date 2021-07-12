import axios from "axios";

var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_QUEUE_API_PREFIX,
});

var axiosPreviewInstance = axios.create({
    baseURL: process.env.REACT_APP_PREVIEW_API_PREFIX,
});

export enum AllowedPlansActionTypes {
    LOADING = "ALLOWEDPLANS/LOADING",
    GET = "ALLOWEDPLANS/GET"
}

export type AllowedPlansActions =
  | IAllowedPlansLoadingAction
  | IAllowedPlansGetAction

export interface IAllowedPlansLoadingAction {
    type: AllowedPlansActionTypes.LOADING
}

export interface IAllowedPlansGetAction {
    type: AllowedPlansActionTypes.GET,
    allowedPlans: IAllowedPlans
}

export interface IKind {
    name: string;
    value: number;
}

export interface IParameter {
    name: string;
    description?: string; // Maybe we can make this required?
    annotation: string;
    annotation_pickled?: string; // I don't think this is needed.
    required?: boolean;
    default: string;
    default_pickled?: string; // I don't think this is needed.
    kind: IKind; // I would like to pass everything as a kwarg, which works, so I think this one can be skipped.
    type: string; //number, string, enum, boolean.
    enum?: object;  // Add the enum here if type is enum. (This may be similar to get devices?)
    isList?: boolean; // True if parameter accepts a list of the type defined in 'type'.
    min?: number; // Only present for number type.
    max?: number; // Only present for number type.
    step?: number; // Only present for number type.
}

export interface IAllowedPlan {
    description?: string;
    parameters: IParameter[];
}

export interface IAllowedPlans {
    success: boolean;
    msg: string;
    plans_allowed: { [name: string]: IAllowedPlan; }; 
}

export interface IAllowedPlansState {
    readonly allowedPlans: IAllowedPlans;
    readonly plansLoading: boolean;
}

export const getAllowedPlans = async(): Promise<IAllowedPlans> => {
    const res = await axiosInstance.get('/plans/allowed',
        {});
    console.log(res);
    return res.data;
}

/* Historical Plan
{"name":"count",
"args":[["det1","det2"]],
"kwargs":{"num":10,"delay":1},
"item_uid":"6f52eb6d-b62c-4bac-9935-03ec4c59af8e",
"user":"John Doe",
"user_group":"admin",
"exit_status":"completed"}
*/
export enum HistoricalPlansActionTypes {
    LOADING = "HISTORICALPLANS/LOADING",
    GET = "HISTORICALPLANS/GET"
}

export type HistoricalPlansActions =
  | IHistoricalPlansLoadingAction
  | IHistoricalPlansGetAction

export interface IHistoricalPlansLoadingAction {
    type: HistoricalPlansActionTypes.LOADING
}

export interface IHistoricalPlansGetAction {
    type: HistoricalPlansActionTypes.GET,
    historicalPlans: IHistoricalPlan[]
}

export interface IResult{
    exit_status: string;
    run_uids: string[]
}

export interface IHistoricalPlan {
    name: string;
    args: string | number | boolean | (string|number|boolean)[]; 
    kwargs: { [name: string]: string | number | boolean | (string|number|boolean)[]; }
    item_uid: string;
    user: string;
    user_group: string;
    result: IResult;
}

export interface IHistoricalPlansState {
    readonly historicalPlans: IHistoricalPlan[];
    readonly plansLoading: boolean;
}

export const getHistoricalPlans = async(): Promise<IHistoricalPlan[]> => {
    const res = await axiosInstance.get('/history/get',
        {});
    console.log(res);
    return res.data.items;
}

export enum PlanActionTypes {
    GETOVERVIEW = "PLANS/GETOVERVIEWS",
    LOADING = "PLANS/LOADING",
    GETPLANLIST = "PLANS/GETPLANLIST",
    GETHISTORICAL = "PLANS/GETHISORICAL",
    SUBMITPLAN = "PLANS/SUBMITPLAN",
    SUBMITEXCEL = "PLANS/SUBMITEXCEL",
    SUBMITEDITEDPLAN = "PLAN/SUMBITEDITEDPLAN",
    CLEARQUEUE = "PLANS/CLEARQUEUE",
    DELETEPLAN = "PLAN/DELETEPLAN",
    MODIFYENVIRONMENT = "PLANS/MODIFYENVIRONMENT",
    MODIFYQUEUE = "PLANS/MODIFYQUEUE",
}

export interface IPlan {
    manager_state: string,
    msg: string,
    plans_in_queue: number,
    running_item_uid: string,
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
    name: string,
    args: (string|number|string[])[],
    kwargs: { [name: string]: string | number | boolean | (string|number|boolean)[]; }
    item_uid: string
    item_type: string,
    user: string,
    user_group: string,
    action: string,
}

export interface IPlanObjectsAction {
    type: PlanActionTypes.GETPLANLIST,
    plans: IPlanObject[]
}

export interface IPlanObjectsLoadingAction {
    type: PlanActionTypes.LOADING
}

export interface IPlanSubmitAction {
    type: PlanActionTypes.SUBMITPLAN,
    plan: IPlanObject
}

export interface ISubmitExcelAction {
    type: PlanActionTypes.SUBMITEXCEL,
    plan: IPlanObject
}

export interface IPlanEditAction {
    type: PlanActionTypes.SUBMITEDITEDPLAN,
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
  | ISubmitExcelAction
  | IPlanEditAction
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
    return res.data.items;
}

export interface IPlanSubmitState {
    readonly plan: IPlanObject;
    readonly planLoading: boolean;
}

export interface ISubmitPlanObject {
    name: string;
    kwargs: {[name: string]: (string|number)[]};
}

export interface ISubmitPlanObjectFixed {
    name: string;
    item_type: string;
    kwargs: {[name: string]: (string|number|object|boolean)[]|string|number|object|boolean} 
}

export const submitPlan = async(submitPlan: ISubmitPlanObject): Promise<IPlanObject> => {

    var plan : ISubmitPlanObjectFixed = {name: submitPlan.name,
                                         item_type: "plan",
                                         kwargs: {}};

    // Remove the square brackets from parameters that are not intended to be lists.
    // For now we assume that kwargs ending with the letter 's' are lists.
    // TODO: Update this, once the have the correct information from the 
    // queueserver about which kwargs are list.
    for (const [key, value] of Object.entries(submitPlan.kwargs)) {
      if ((key.slice(-1) !== 's') || (key == "axis") || (key == "nsteps")){
        if (value[0] !== "None"){
            // Convert string to a number if possible.
            // TODO: Use the type information from the server (once available), 
            // and use a numeric input.
            if (isNaN(Number(value[0]))){
                plan.kwargs[key] = value[0];
            } else {
                plan.kwargs[key] = Number(value[0])
            }
	} else {
		if (key == "md"){
		plan.kwargs[key] = {"foo": "bar"};
		} else {
			plan.kwargs[key] = value;
		}
	}
      }
    }


    if (submitPlan.name === "xafs"){
      plan.kwargs['bounds'] = "-30 40"
      plan.kwargs['steps'] = "0.5"
      plan.kwargs['times'] = "0.5"
      plan.kwargs['snapshots'] = false
      plan.kwargs['htmlpage'] = false
      plan.kwargs['lims'] = false
    }
    
    const res = await axiosInstance.post('/queue/item/add',
        {
            item: plan,
        });
    console.log(res);
    return res.data.item;
}

export interface IEditPlanObject {
    item_uid: string,
    name: string;
    kwargs: {[name: string]: (string|number)[]};
}

export interface IEditPlanObjectFixed {
    item_uid: string,
    name: string;
    item_type: string;
    kwargs: {[name: string]: (string|number)[]|string|number} 
}

export interface IPlanEditState {
    readonly plan: IPlanObject;
    readonly planLoading: boolean;
}

export const submitEditedPlan = async(itemUid: string, editPlan: ISubmitPlanObject): Promise<IPlanObject> => {

    var plan : IEditPlanObjectFixed = {item_uid: itemUid,
                                       name: editPlan.name,
                                       item_type: "plan",
                                       kwargs: {}};

    // Remove the square brackets from parameters that are not intended to be lists.
    // For now we assume that kwargs ending with the letter 's' are lists.
    // TODO: Update this, once the have the correct information from the 
    // queueserver about which kwargs are list.
    for (const [key, value] of Object.entries(editPlan.kwargs)) {
      if (key.slice(-1) !== 's'){
        if (value[0] !== "None"){
            // Convert string to a number if possible.
            // TODO: Use the type information from the server (once available), 
            // and use a numeric input.
            if (isNaN(Number(value[0]))){
                plan.kwargs[key] = value[0];
            } else {
                plan.kwargs[key] = Number(value[0])
            }
        }
      } else {
        plan.kwargs[key] = value;
      }
    }
    
    const res = await axiosInstance.post('/queue/item/update',
        {
            item: plan,
            replace: true,
        });
    console.log(res);
    return res.data.item;
}

export interface ISubmitExcelState {
    readonly files: File[];
    readonly planLoading: boolean;
}

export interface ISubmitExcelObject {
    name: string;
    kwargs: {[name: string]: (string|number)[]};
}

export const submitExcel = async(files: File[]): Promise<any> => {

    var formData = new FormData();
    formData.append("spreadsheet", files[0]);
    formData.append("data_type", "wheel_xafs")
    const res = await axiosInstance.post('/queue/upload/spreadsheet', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log("EXCEL", res)
    return res.data;
}

export const clearQueue = async(): Promise<IPlan> => {
    const res = await axiosInstance.post('/queue/clear',
        {});
    console.log(res);
    return res.data;
}


export const deletePlan = async(item_uid: string): Promise<IPlan> => {
    const res = await axiosInstance.post('/queue/item/remove',
        {
            uid: item_uid
        });
    console.log(res);
    return res.data;
}

export interface IPlanModifyState {
    readonly modify: IPlanModify;
    readonly loading: boolean;
}

export enum EnvOps {
    open = "open",
    close = "close",
    destroy = "destroy",
}

export const modifyEnvironment = async(op: EnvOps): Promise<IPlanModify> => {
    var operation = EnvOps[op];
    const res = await axiosInstance.post(`/environment/${operation}`, {});
    console.log(res);
    return res.data;
}

export enum QueueOps {
    start = "start",
    stop = "stop",
    halt = "halt",
    resume = "resume",
}

export const modifyQueue = async(op: QueueOps): Promise<IPlanModify> => {
    var operation = QueueOps[op];
    const res = await axiosInstance.post(`/queue/${operation}`, {});
    console.log(res);
    return res.data;
}

export const incrementPosition = async(uid: string, after_uid: string): Promise<IPlanModify> => {
    const res = await axiosInstance.post('/queue/item/move',
        {
            uid: uid,
            after_uid: after_uid

        });
    console.log(res);
    return res.data;
}

export const decrementPosition = async(uid: string, after_uid: string): Promise<IPlanModify> => {
    const res = await axiosInstance.post('/queue/item/move',
        {
            uid: uid,
            before_uid: after_uid
        });
    console.log(res);
    return res.data;
}

export const addQueueStop = async(): Promise<IPlanModify> => {
    const res = await axiosInstance.post('/queue/item/add',
            { 
                item: {name:"queue_stop", 
                       item_type: "instruction"}
            }
        );

    console.log(res);
    return res.data;
}

export const clearHistory = async(): Promise<IPlanModify> => {
    const res = await axiosInstance.post('/history/clear', {});
    console.log(res);
    return res.data;
}

export interface IGetPreviews {
    previews: string[];
    success: boolean;
}

export interface IActiveRun {
    uid: string;
    is_open: boolean;
    exit_status: string;
}

export const getActiveRuns = async(): Promise<IActiveRun[]> => {
        const res = await axiosInstance.get(`/re/runs/active`);
        console.log(res);
        console.log(res.data.run_list);
        return res.data.run_list;
}

export const getPreviews = async(runUid: string): Promise<string[]> => {
    if (runUid !== undefined){
        const res = await axiosPreviewInstance.get(`/${runUid}`);
        console.log(res);
        return res.data;
    } else {
        return [];
    }
}
