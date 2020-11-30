import { Reducer } from "redux";
import { IPlanState, IPlanObjectsState, 
         IPlanSubmitState, IPlanModifyState,
         PlanActions, PlanActionTypes, 
         IAllowedPlansState, AllowedPlansActions, 
         AllowedPlansActionTypes, IAllowedPlans,
         IHistoricalPlansState, HistoricalPlansActions, 
         HistoricalPlansActionTypes, IHistoricalPlan } from "./queueserver";

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
        case PlanActionTypes.GETOVERVIEW: {
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
        item_uid: ""
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
        item_uid: ""
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
