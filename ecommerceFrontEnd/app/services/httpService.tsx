import axios from 'axios';
const service = {
    get: async (url: string, authorization?: any)=>{
        const response = await axios.get(url,{
            headers: { Authorization: `Bearer ${authorization}` },
        });
        return response.data;
    },
    post: async (url: string, data: any, authorization?: any) => {
        const response = await axios.post(url, data,{
            headers: { Authorization: `Bearer ${authorization}` },
        });
        return response.data;
    },
    delete: async (url: string, authorization?: any) => {
        const response = await axios.delete(url,{
            headers: { Authorization: `Bearer ${authorization}` },
        });
        return response.data;
    }
}

export default service;