import axios from "axios";

var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_FACILITY_API_PREFIX
});

export enum UserActionTypes {
    GETINFO = "USER/GETACTION",
    LOADING = "USER/LOADING",
    LOGIN = "USER/LOGIN",
    REGISTER = "USER/REGISTER"
}

export interface IUser {
    userid: number,
    username: string,
    email: string,
    orcid: string
}

export interface IProposal {
    proposal_id: number,
    proposal_number: number,
    users: number[],
    prefix: string,
    full_name: string,
}

export interface IExperiment {
    proposal_id: number,
    proposal_number: number,
    start_time: string,
    end_time: string,
    users: number[], 
    experiment_id: number,
    resource_id: number
}


export interface IUserLoginAction {
    type: UserActionTypes.GETINFO,
    user: IUser
}

export interface IUserRegisterAction {
    type: UserActionTypes.GETINFO,
    user: IUser
}
  
export interface IUserLoadingAction {
type: UserActionTypes.LOADING
}

export interface IUserGetAction {
    type: UserActionTypes.GETINFO,
    user: IUser
}

export type UserInfo =
  |  IUser | IProposal | IExperiment

export interface IUserState {
    readonly user: IUser;
    readonly token: any;
    readonly permissions: string;
    readonly userLoading: boolean;
}

export const getUsers = async(): Promise<IUser[]> => {
    const res = await axiosInstance.get('/users/');
    console.log(res)
    return res.data;
}

export const getUserByUsername = async(username: string): Promise<IUser> => {
    const res = await axiosInstance.get(`/users/username/${username}`);
    return res.data;
}
export const getProposalsForUser = async(userid: number): Promise<IProposal[]> => {
    const res = await axiosInstance.get(`/proposals/user/${userid}`);
    return res.data;
}

export const getExperimentsForProposal = async(proposalid: number): Promise<IExperiment[]> => {
    const res = await axiosInstance.get(`/experiments/proposal/${proposalid}`);
    return res.data;
}