import { Reducer } from "redux";
import { IUserState, UserActionTypes } from "./facility";

export interface IUser {
    userid: number,
    username: string,
    email: string,
    orcid: string
}

export interface ILoginAction {
    type: UserActionTypes.LOGIN,
    token: any,
}

export interface IRegisterAction {
    type: UserActionTypes.REGISTER,
    token: any,
}

export interface IUserGetAction {
    type: UserActionTypes.GETINFO,
    user: IUser
}

export type UserActions = 
| IUserGetAction
| ILoginAction
| IRegisterAction


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

export const userReducer: Reducer<IUserState, UserActions> = (state=initialUserState, action) => {
    switch (action.type) {
        case UserActionTypes.GETINFO: {
            return {
                ...state,
                user: action.user,
                userLoading: false
            };
        }
        case UserActionTypes.LOGIN: {
            return {
                ...state,
                token: action.token,
                permissions: "user"
            };
        }
        case UserActionTypes.REGISTER: {
            return {
                ...state,
                token: action.token,
                permissions: "user"
            };
        }
        default: {
            return state;
        }
    }
};
