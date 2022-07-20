import { Injectable } from '@nestjs/common'
import axios, { AxiosRequestConfig } from 'axios'
@Injectable()
/**
 * Api service using axios
 */
export class ApiService {
  constructor() {}
  /**
   * accept @url , @body , @header
   * return response
   */
  async post(url: string, body: object, axiosConfig: AxiosRequestConfig) {
    return axios.post(url, body, axiosConfig)
  }
}
