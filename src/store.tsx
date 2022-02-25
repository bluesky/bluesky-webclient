import { applyMiddleware, combineReducers, createStore, Store, compose } from "redux"
import thunk from "redux-thunk"
import { planObjectsReducer, planReducer, planSubmitReducer,
    environmentModifyReducer, queueModifyReducer, allowedPlansReducer, historicalPlansReducer, statusReducer, consoleOutputReducer } from "./planreducers"
import { IStatus, IPlanState, IPlanObjectsState, IPlanSubmitState, IPlanModifyState, IAllowedPlansState, IHistoricalPlansState, IConsoleOutput} from "./queueserver"
import { userReducer } from "./userreducers"
import { IUserState } from "./facility"

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
    console: IConsoleOutput;
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
    console: consoleOutputReducer,
})

export default function configureStore(): Store<IApplicationState> {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk)));
    return store;
}