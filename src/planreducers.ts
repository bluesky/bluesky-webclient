import { Reducer } from "redux";
import { IPlanState, IPlanObjectsState, 
         IPlanSubmitState, IPlanModifyState,
         PlanActions, PlanActionTypes, 
         IAllowedPlansState, AllowedPlansActions, 
         AllowedPlansActionTypes, IAllowedPlans,
         IHistoricalPlansState, HistoricalPlansActions, 
         HistoricalPlansActionTypes, IStatus, IConsoleOutput } from "./queueserver";
import { getQueuedPlans, getHistoricalPlans } from './planactions';
import { store } from "./index"

const initialConsoleOutputState: IConsoleOutput = {
    text: ""
}

export const consoleOutputReducer: Reducer<IConsoleOutput, PlanActions> = (
    state = initialConsoleOutputState,
    action
) => {
    switch (action.type) {
        case PlanActionTypes.GETCONSOLEOUTPUT: {
            return action;
            console.log("CONSOLE OUTPUT REDUCER")
        }
        default: {
            return state;
        }
    }
};

const initialStatusState: IStatus = {
        "msg": "RE Manager",
        "items_in_queue": 0,
        "items_in_history": 0,
        "running_item_uid": null,
        "manager_state": "idle",
        "queue_stop_pending": false,
        "worker_environment_exists": false,
        "worker_environment_state": "closed",
        "worker_background_tasks": 0,
        "re_state": null,
        "pause_pending": false,
        "run_list_uid": "",
        "plan_queue_uid": "",
        "plan_history_uid": "",
        "devices_existing_uid": "",
        "plans_existing_uid": "",
        "devices_allowed_uid": "",
        "plans_allowed_uid": "",
        "plan_queue_mode": {
          "loop": false
        },
        "task_results_uid": "5aac32cb-b5b4-4a42-a915-296c73caea81"
};

export const statusReducer: Reducer<IStatus, PlanActions> = (
    state = initialStatusState,
    action
) => {
    switch (action.type) {
        case PlanActionTypes.GETSTATUS: {
            return action.status;
        }
        default: {
            return state;
        }
    }
};

const initialPlanState: IPlanState = {
    plan: {
        manager_state: "undefined",
        msg: "",
        plans_in_queue: 0,
        running_item_uid: "",
        worker_environment_exists: false
    },
    planLoading: false
};

export const planReducer: Reducer<IPlanState, PlanActions> = (
    state = initialPlanState,
    action
) => {
    switch (action.type) {
        case PlanActionTypes.LOADING: {
            return {
                ...state,
                planLoading: true
            };
        }
        case PlanActionTypes.GETPLANSTATUS: {
            return {
                ...state,
                plan: action.plan,
                planLoading: false
            };
        }
        default: {
            return state;
        }
    }
};

const initialPlanObjectsState: IPlanObjectsState = {
    plans: [{
        args: [],
        name: "",
        item_uid: "",
        kwargs: {},
        item_type: "",
        user: "",
        user_group: "",
        action: ""
    }],
    plansLoading: false
};

export const planObjectsReducer: Reducer<IPlanObjectsState, PlanActions> = (
    state = initialPlanObjectsState,
    action
) => {
    switch (action.type) {
        case PlanActionTypes.LOADING: {
            return {
                ...state,
                plansLoading: true
            };
        }
        case PlanActionTypes.GETPLANLIST: {
            return {
                ...state,
                plans: action.plans,
                plansLoading: false
            };
        }
        default: {
            return state;
        }
    }
};

/**********************************************/
declare const allowed: IAllowedPlans;

const initialAllowedPlansState: IAllowedPlansState = {
    allowedPlans: {
        success: false,
        msg: "",
        plans_allowed: {}
    },
    plansLoading: false
};

export const allowedPlansReducer: Reducer<IAllowedPlansState, AllowedPlansActions> = (
    state = initialAllowedPlansState,
    action
) => {
    switch (action.type) {
        case AllowedPlansActionTypes.LOADING: {
            return {
                ...state,
                plansLoading: true
            };
        }
        case AllowedPlansActionTypes.GET: {
            return {
                ...state,
                allowedPlans: action.allowedPlans,
                plansLoading: false
            };
        }
        default: {
            return state;
        }
    }
};

/************************************************/
const initialHistoricalPlansState: IHistoricalPlansState = {
    historicalPlans: [],
    plansLoading: false
};

export const historicalPlansReducer: Reducer<IHistoricalPlansState, HistoricalPlansActions> = (
    state = initialHistoricalPlansState,
    action
) => {
    switch (action.type) {
        case HistoricalPlansActionTypes.LOADING: {
            return {
                ...state,
                plansLoading: true
            };
        }
        case HistoricalPlansActionTypes.GET: {
            return {
                ...state,
                historicalPlans: action.historicalPlans,
                plansLoading: false
            };
        }
        default: {
            return state;
        }
    }
};

/************************************************/

const initialPlanSubmitState: IPlanSubmitState = {
    plan: {
        args: [],
        name: "",
        item_uid: "",
        kwargs: {},
        item_type: "",
        user: "",
        user_group: "",
        action: ""
    },
    planLoading: false
};

export const planSubmitReducer: Reducer<IPlanSubmitState, PlanActions> = (
    state = initialPlanSubmitState,
    action
) => {
    switch (action.type) {
        case PlanActionTypes.LOADING: {
            return {
                ...state,
                plansLoading: true
            };
        }
        case PlanActionTypes.SUBMITPLAN: {
            return {
                ...state,
                plan: action.plan,
                plansLoading: false
            };
        }
        default: {
            return state;
        }
    }
};

const initialEnvModifyState: IPlanModifyState = {
    modify: {
        msg: "",
        success: false
    },
    loading: false
};

export const environmentModifyReducer: Reducer<IPlanModifyState, PlanActions> = (
    state = initialEnvModifyState,
    action
) => {
    switch (action.type) {
        case PlanActionTypes.LOADING: {
            return {
                ...state,
                loading: true
            };
        }
        case PlanActionTypes.MODIFYENVIRONMENT: {
            return {
                ...state,
                modify: action.modify,
                loading: false
            };
        }
        default: {
            return state;
        }
    }
};

const initialQueueModifyState: IPlanModifyState = {
    modify: {
        msg: "",
        success: false
    },
    loading: false
};

export const queueModifyReducer: Reducer<IPlanModifyState, PlanActions> = (
    state = initialQueueModifyState,
    action
) => {
    switch (action.type) {
        case PlanActionTypes.LOADING: {
            return {
                ...state,
                loading: true
            };
        }
        case PlanActionTypes.MODIFYQUEUE: {
            return {
                ...state,
                modify: action.modify,
                loading: false
            };
        }
        default: {
            return state;
        }
    }
};
