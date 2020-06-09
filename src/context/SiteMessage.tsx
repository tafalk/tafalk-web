import React, { useState } from 'react'
import { AlertProps } from '@material-ui/lab/Alert'

interface SiteMessageContextDataType {
  show: boolean
  type: AlertProps['severity']
  text: string
  timeout: number | null
}

export interface SiteMessageContextType {
  data: SiteMessageContextDataType
  setData(data: SiteMessageContextDataType): void //Function
}

export const SiteMessageContext = React.createContext<SiteMessageContextType>({
  data: {
    show: false,
    type: 'error',
    text: '',
    timeout: null
  },
  setData: () => {}
})

export default ({ children }: any) => {
  const [data, setData] = useState<SiteMessageContextDataType>({
    show: false,
    type: 'error',
    text: '',
    timeout: null
  })

  return (
    <SiteMessageContext.Provider value={{ data, setData }}>
      {children}
    </SiteMessageContext.Provider>
  )
}
