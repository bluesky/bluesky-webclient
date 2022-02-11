import { applyMiddleware, combineReducers, createStore, Store, compose } from "redux"
import thunk from "redux-thunk"
import { planObjectsReducer, planReducer, planSubmitReducer,
    environmentModifyReducer, queueModifyReducer, allowedPlansReducer, historicalPlansReducer, statusReducer } from "./planreducers"
import { IStatus, IPlanState, IPlanObjectsState, IPlanSubmitState, IPlanModifyState, IAllowedPlansState, IHistoricalPlansState} from "./queueserver"
import { userReducer } from "./userreducers"
import { IUserState } from "./facility"
import reduxWebsocket from '@giantmachines/redux-websocket';
import { connect } from '@giantmachines/redux-websocket';

export interface IApplicationState {
    plan: IPlanState;
    plans: IPlanObjectsState;
    allowedPlans: IAllowedPlansState;
    historicalPlans: IHistoricalPlansState;
    submitted: IPlanSubmitState;
    environment: IPlanModifyState;
    queue: IPlanModifyState;
    user: IUserState;
    status: IStatus;
}

const rootReducer = combineReducers<IApplicationState>({
    plan: planReducer,
    plans: planObjectsReducer,
    allowedPlans: allowedPlansReducer,
    historicalPlans: historicalPlansReducer,
    submitted: planSubmitReducer,
    environment: environmentModifyReducer,
    queue: queueModifyReducer,
    user: userReducer,
    status: statusReducer,
})

export default function configureStore(): Store<IApplicationState> {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const reduxWebsocketMiddleware = reduxWebsocket();
    const store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk, reduxWebsocketMiddleware)));
    return store;
}