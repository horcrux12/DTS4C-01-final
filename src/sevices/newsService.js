import { doGet, doGetDetail } from "../api/newsAPI"
import { getDetailNews, getListNews, getSimilarNews, getTopNews } from "../constanta/routes"
import { loadingData, loadingLatestNews } from "../store/features/loading/loadingSlice"

export const GetNews = async (page, limit, language, sort, categories, search, dispatch) => {
    let result = {
        status: false,
    }

    const params = {
        page, 
        limit,
    }

    if(search){
        params.search = search
    }

    if(sort){
        params.sort = sort
    }
    
    if(language){
        params.language = language
    }

    if(categories){
        params.categories = categories
    }

    const url = getListNews
    dispatch && dispatch(loadingLatestNews(true));
    try {
        const response = await doGet(url, params);
        if (response) {
            // todo dispatch loading
            dispatch && dispatch(loadingLatestNews(false));
            result = {
                ...result,
                status: true,
                ...response.data
            }
        }
    } catch (error) {
        dispatch && dispatch(loadingLatestNews(false));
        console.log(error);
    }

    return result;
}

export const GetTopNews = async (dispatch, language) => {
    const params = {
        limit : 1,
        page: 1,
        language
    }

    let result = {
        status: false,
    }
    const url = getTopNews

    dispatch && dispatch(loadingData(true));
    try {
        const response = await doGet(url, params);
        if (response) {
            // todo dispatch loading
            dispatch && dispatch(loadingData(false));
            result = {
                ...result,
                status: true,
                data : response.data.data[0]
            }
        }
    } catch (error) {
        dispatch && dispatch(loadingData(false));
        console.log(error);
    }

    return result
}

export const GetDetailNews = async (dispatch, uuid) => {
    let result = {
        status: false,
    }
    const url = getDetailNews + "/" + uuid

    dispatch && dispatch(loadingData(true));
    try {
        const response = await doGetDetail(url);
        if (response) {
            // todo dispatch loading
            dispatch && dispatch(loadingData(false));
            result = {
                ...result,
                status: true,
                data : response.data
            }
        }
    } catch (error) {
        dispatch && dispatch(loadingData(false));
        console.log(error);
    }

    return result
}

export const GetSimilarNews = async (page, limit, language, uuid, dispatch) => {
    let result = {
        status: false,
    }

    const params = {
        page, 
        limit,
    }
    
    if(language){
        params.language = language
    }

    const url = getSimilarNews + "/" + uuid
    dispatch && dispatch(loadingLatestNews(true));
    try {
        const response = await doGet(url, params);
        if (response) {
            // todo dispatch loading
            dispatch && dispatch(loadingLatestNews(false));
            result = {
                ...result,
                status: true,
                ...response.data
            }
        }
    } catch (error) {
        dispatch && dispatch(loadingLatestNews(false));
        console.log(error);
    }

    return result;
}