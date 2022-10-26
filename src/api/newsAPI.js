import axios from "axios";
import {MethodConstanta} from '../constanta/constanta'

export const doGet = (url, params) => {
    params['api_token'] = process.env.REACT_APP_API_TOKEN
    return axios({
        url, 
        method: MethodConstanta.GET, 
        params})
}

export const doGetDetail = (url) => {
    let params = {
        'api_token': process.env.REACT_APP_API_TOKEN,
    }
    return axios({
        url, 
        method: MethodConstanta.GET, 
        params})
}