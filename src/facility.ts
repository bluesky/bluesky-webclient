import axios from "axios";

var axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_PREFIX,
});

export interface IUser {
    userid: number,
    username: string,
    globus_email: string,
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

export const getUsers = async(): Promise<IUser[]> => {
    const res = await axiosInstance.get('/users/');
    console.log(res)
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
