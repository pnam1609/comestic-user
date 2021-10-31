import callApi from "../utils/apiCaller";
import { getTokenUser } from "./getUser";

export const actSignUpReq = (user) => {
    return async () => {
        return await callApi('customer', 'Post', user, null).then(res => {
            if(res.data.result === 1){
                return 1
            }else return res
        });
    }
}

export const actUpdateUser = (user) => {
    return async () => {
        return await callApi('user', 'PUT', user, `Bearer ${getTokenUser()}`).then(res => {
            return res.data
        });
    }
}
