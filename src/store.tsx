import { applyMiddleware, combineReducers, createStore, Store } from "redux"
import thunk from "redux-thunk"
import { planObjectsReducer, planReducer, planSubmitReducer } from "./planreducers"
import { IPlanState, IPlanObjectsState, IPlanSubmitState } from "./queueserver"

export interface IApplicationState {
    plan: IPlanState;
    plans: IPlanObjectsState;
    submitted: IPlanSubmitState;
}

const rootReducer = combineReducers<IApplicationState>({
    plan: planReducer,
    plans: planObjectsReducer,
    submitted: planSubmitReducer
})

export default function configureStore(): Store<IApplicationState> {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
    return store;
}
