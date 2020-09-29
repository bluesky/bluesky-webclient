import { applyMiddleware, combineReducers, createStore, Store } from "redux"
import thunk from "redux-thunk"
import { planReducer } from "./planreducers"
import { IPlanState } from "./queueserver"

export interface IApplicationState {
    plan: IPlanState;
}

const rootReducer = combineReducers<IApplicationState>({
    plan: planReducer
})

export default function configureStore(): Store<IApplicationState> {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
    return store;
}
