import { Reducer } from "redux";
import { IPlanState, PlanActions, PlanActionTypes } from "./queueserver";

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
