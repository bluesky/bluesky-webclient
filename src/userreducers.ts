import { Reducer } from "redux";
import { IUserState, UserActionTypes } from "./facility";

import {UserActions} from "./user";

const initialUserState: IUserState = {
    user: {
        userid:1,
        globus_email:'',
        username:'jdoe'
    },
    userLoading: false
};

export const userReducer: Reducer<IUserState, UserActions> = (
    state = initialUserState,
    action
) => {
    switch (action.type) {
        case UserActionTypes.GETINFO: {
            return {
                ...state,
                user: action.user,
                userLoading: false
            };
        }
        // case UserActionTypes.LOADING: {
        //     return {
        //         ...state,
        //         userLoading: true
        //     };
        // }
        default: {
            return state;
        }
    }
};