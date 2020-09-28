import axios from "axios";

var axiosInstance = axios.create({
    baseURL: '/qs',
});

export interface IPlan {
    manager_state: string,
    msg: string,
    plans_in_queue: number,
    running_plan_uid: string,
    worker_environment_exists: boolean
  }

export const getOverview = async(): Promise<IPlan> => {
    const res = await axiosInstance.get('/');
    console.log(res)
    return res.data;
}
