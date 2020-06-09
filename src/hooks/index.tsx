import { useContext } from 'react'
import { SiteMessageContext, SiteMessageContextType } from 'context/SiteMessage'

export const useSiteMessage = (): [
  SiteMessageContextType['data'],
  SiteMessageContextType['setData']
] => {
  const { data, setData } = useContext(SiteMessageContext)
  return [data, setData]
}
