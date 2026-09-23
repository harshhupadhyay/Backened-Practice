import axios from 'axios'
import { useAuth } from '../../modules/auth/context/AuthProvider'



export const api = axios.create({
  baseURL: 'http://localhost:5173/auth',
  withCredentials: true
})

const useApi = () => {

  const { accessToken, setAccessToken } = useAuth()

  api.interceptors.request.use(config => {

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },

    (error) => {
      return Promise.reject(error)
    }



    
  )
  api.interceptors.response.use(
    response => response,
    async (error) => {

      if (error.response && error.response.status === 401) {

        const response  = await axios.post('/auth/refresh')
        setAccessToken(response.data.accessToken)
        error.config.headers.Authorization = `Bearer ${response.data.accessToken}`


        return axios(error.config)
      }
      return Promise.reject(error)
    }
  )
  return api

}
// Request interceptor works BEFORE sending the request; response interceptor works AFTER receiving the response.


export default useApi
