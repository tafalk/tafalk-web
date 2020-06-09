import axios from 'axios'
import { sitePoliciesBucketBaseUrl } from 'utils/constants'

export const httpSitePoliciesStorage = axios.create({
  baseURL: sitePoliciesBucketBaseUrl
})
