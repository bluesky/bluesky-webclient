import axios from "axios";

var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_QUEUE_API_PREFIX,
});

/*******************************************/

export enum AllowedPlansActionTypes {
    LOADING = "ALLOWEDPLANS/LOADING",
    // LOADED = "ALLOWEDPLANS/LOADED",
    GET = "ALLOWEDPLANS/GET"
}

export type AllowedPlansActions =
  | IAllowedPlansLoadingAction
  | IAllowedPlansGetAction
//   | IAllowedPlansLoadedAction

export interface IAllowedPlansLoadingAction {
    type: AllowedPlansActionTypes.LOADING
}

// export interface IAllowedPlansLoadedAction {
//     type: AllowedPlansActionTypes.LOADED
// }

export interface IAllowedPlansGetAction {
    type: AllowedPlansActionTypes.GET,
    allowedPlans: IAllowedPlans
}

// interracts with /plans/allowed
// dict_keys(['success', 'msg', 'plans_allowed'])
/*
In [52]: r.json()['plans_allowed']['adaptive_scan']
Out[52]:
{'name': 'adaptive_scan',
 'parameters': [{'annotation': '',
   'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'default': '',
   'default_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'kind': {'name': 'POSITIONAL_OR_KEYWORD', 'value': 1},
   'name': 'detectors'},
  {'annotation': '',
   'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'default': '',
   'default_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'kind': {'name': 'POSITIONAL_OR_KEYWORD', 'value': 1},
   'name': 'target_field'},
  {'annotation': '',
   'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'default': '',
   'default_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'kind': {'name': 'POSITIONAL_OR_KEYWORD', 'value': 1},
   'name': 'motor'},
  {'annotation': '',
   'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'default': '',
   'default_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'kind': {'name': 'POSITIONAL_OR_KEYWORD', 'value': 1},
   'name': 'start'},
  {'annotation': '',
   'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'default': '',
   'default_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'kind': {'name': 'POSITIONAL_OR_KEYWORD', 'value': 1},
   'name': 'stop'},
  {'annotation': '',
   'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'default': '',
   'default_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'kind': {'name': 'POSITIONAL_OR_KEYWORD', 'value': 1},
   'name': 'min_step'},
  {'annotation': '',
   'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'default': '',
   'default_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'kind': {'name': 'POSITIONAL_OR_KEYWORD', 'value': 1},
   'name': 'max_step'},
  {'annotation': '',
   'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'default': '',
   'default_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'kind': {'name': 'POSITIONAL_OR_KEYWORD', 'value': 1},
   'name': 'target_delta'},
  {'annotation': '',
   'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'default': '',
   'default_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'kind': {'name': 'POSITIONAL_OR_KEYWORD', 'value': 1},
   'name': 'backstep'},
  {'annotation': '',
   'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'default': '0.8',
   'default_pickled': '80 03 47 3f e9 99 99 99 99 99 9a 2e',
   'kind': {'name': 'POSITIONAL_OR_KEYWORD', 'value': 1},
   'name': 'threshold'},
  {'annotation': '',
   'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e',
   'default': 'None',
   'default_pickled': '80 03 4e 2e',
   'kind': {'name': 'KEYWORD_ONLY', 'value': 3},
   'name': 'md'}],
 'returns': {'annotation': '',
  'annotation_pickled': '80 03 63 69 6e 73 70 65 63 74 0a 5f 65 6d 70 74 79 0a 71 00 2e'}}
*/
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
    plans_allowed: { [name: string]: IAllowedPlan; } 
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

export interface IHistoricalPlan {
    name: string;
    args: string | number | boolean | (string|number|boolean)[]; 
    kwargs: { [name: string]: string | number | boolean | (string|number|boolean)[]; }
    item_uid: string;
    user: string;
    user_group: string;
    exit_status: string;
}

export interface IHistoricalPlansState {
    readonly historicalPlans: IHistoricalPlan[];
    readonly plansLoading: boolean;
}

export const getHistoricalPlans = async(): Promise<IHistoricalPlan[]> => {
    const res = await axiosInstance.get('/history/get',
        {});
    console.log(res);
    return res.data.history;
}

/*******************************************/

export enum PlanActionTypes {
    GETOVERVIEW = "PLANS/GETOVERVIEWS",
    LOADING = "PLANS/LOADING",
    GETPLANLIST = "PLANS/GETPLANLIST",
    GETHISTORICAL = "PLANS/GETHISORICAL",
    SUBMITPLAN = "PLANS/SUBMITPLAN",
    CLEARQUEUE = "PLANS/CLEARQUEUE",
    DELETEPLAN = "PLAN/DELETEPLAN",
    MODIFYENVIRONMENT = "PLANS/MODIFYENVIRONMENT",
    MODIFYQUEUE = "PLANS/MODIFYQUEUE",
}


/*******************************************/
// interracts with "/"
/*
{'msg': 'RE Manager',
 'plans_in_queue': 4,
 'plans_in_history': 1,
 'running_item_uid': None,
 'manager_state': 'idle',
 'queue_stop_pending': False,
 'worker_environment_exists': False}
*/
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

/*****************************************/
// interracts with /queue/get
/*
{'queue': [{'name': 'count',
   'args': [['det1', 'det2']],
   'kwargs': {'num': None, 'delay': 1},
   'item_uid': '0f43ab26-1ce5-4216-8cb2-a705833488d6',
   'user': 'John Doe',
   'user_group': 'admin'},
  {'name': 'scan',
   'args': [['det1', 'det2'], 'motor', -1, 1, None],
   'item_uid': 'ff00456a-c20d-4e04-8b3d-9f9038100be0',
   'user': 'John Doe',
   'user_group': 'admin'},
  {'name': 'scan',
   'args': [['det1', 'det2'], 'motor', -1, 1, None],
   'item_uid': '519306e6-9eae-4de4-83a4-6dfce7027d6c',
   'user': 'John Doe',
   'user_group': 'admin'},
  {'name': 'scan',
   'args': [['det1', 'det2'], 'motor', -1, 1, None],
   'item_uid': '6674b9a9-e148-407d-98d6-a75be1773ea0',
   'user': 'John Doe',
   'user_group': 'admin'}],
 'running_plan': {}}
*/
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
/*******************************************/


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

export interface ISumbitPlanObject {
    name: string;
    kwargs: {[name: string]: (string|number)[]} 
}

export interface ISumbitPlanObjectFixed {
    name: string;
    kwargs: {[name: string]: (string|number)[]|string|number} 
}

export const submitPlan = async(submitPlan: ISumbitPlanObject): Promise<IPlanObject> => {

    var plan : ISumbitPlanObjectFixed = {name: submitPlan.name,
                                         kwargs: {}};

    // Remove the square brackets from parameters that are not intended to be lists.
    // For now we assume that only the detectors kwarg is a list.
    // TODO: Update this, once the have the correct information from the 
    // queueserver about which kwargs are list.
    for (const [key, value] of Object.entries(submitPlan.kwargs)) {
      if (key !== 'detectors'){
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
    
    alert(JSON.stringify(plan));
    const res = await axiosInstance.post('/queue/item/add',
        {
            plan: plan
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

// http POST http://localhost:60610/queue/plan/remove uid:='<uid>'
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
            instruction: {action: "queue_stop"}
        });
    console.log(res);
    return res.data;
}