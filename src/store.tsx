import { applyMiddleware, combineReducers, createStore, Store } from "redux"
import thunk from "redux-thunk"
import { planObjectsReducer, planReducer, planSubmitReducer,
    environmentModifyReducer, queueModifyReducer, allowedPlansReducer } from "./planreducers"
import { IPlanState, IPlanObjectsState, IPlanSubmitState, IPlanModifyState, IAllowedPlansState } from "./queueserver"
import { userReducer } from "./userreducers"
import { IUserState } from "./facility"

export interface IApplicationState {
    plan: IPlanState;
    plans: IPlanObjectsState;
    allowedPlans: IAllowedPlansState;
    submitted: IPlanSubmitState;
    environment: IPlanModifyState;
    queue: IPlanModifyState;
    user: IUserState
}

const rootReducer = combineReducers<IApplicationState>({
    plan: planReducer,
    plans: planObjectsReducer,
    allowedPlans: allowedPlansReducer,
    submitted: planSubmitReducer,
    environment: environmentModifyReducer,
    queue: queueModifyReducer,
    user: userReducer
})

export default function configureStore(): Store<IApplicationState> {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
    return store;
}
