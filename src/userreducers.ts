import { Reducer } from "redux";
import { IUserState, UserActionTypes } from "./facility";

import {UserActions} from "./LoginPage";

const initialUserState: IUserState = {
    user: {
        userid:1,
        email:'',
        username:'jdoe',
        orcid:''
    },
    token: null,
    permissions: "",
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
        default: {
            return state;
        }
    }
};
