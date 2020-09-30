import { Reducer } from "redux";
import { IPlanState, IPlanObjectsState, IPlanSubmitState, PlanActions, PlanActionTypes } from "./queueserver";

const initialPlanState: IPlanState = {
    plan: {
        manager_state: "undefined",
        msg: "",
        plans_in_queue: 0,
        running_plan_uid: "",
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
        plan_uid: ""
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

const initialPlanSubmitState: IPlanSubmitState = {
    plan: {
        args: [],
        name: "",
        plan_uid: ""
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
