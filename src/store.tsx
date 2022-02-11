import { applyMiddleware, combineReducers, createStore, Store, compose } from "redux"
import thunk from "redux-thunk"
import { planObjectsReducer, planReducer, planSubmitReducer,
    environmentModifyReducer, queueModifyReducer, allowedPlansReducer, historicalPlansReducer, statusReducer } from "./planreducers"
import { IStatus, IPlanState, IPlanObjectsState, IPlanSubmitState, IPlanModifyState, IAllowedPlansState, IHistoricalPlansState} from "./queueserver"
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

const createMySocketMiddleware = (url: any) => {
    return storeAPI => {
        let socket = createMyWebsocket(url);

        socket.on("message", (message: any) => {
            storeAPI.dispatch({
                type : "SOCKET_MESSAGE_RECEIVED",
                payload : message
            });
        });
        
        return next => action => {
            if(action.type == "SEND_WEBSOCKET_MESSAGE") {
                socket.send(action.payload);
                return;
            }
            return next(action);
        }
    }
}

export default function configureStore(): Store<IApplicationState> {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk)));
    return store;
}