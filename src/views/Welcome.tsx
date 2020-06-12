import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { hasVisitedBeforeCookieName } from 'utils/constants'

const Welcome: React.FC = () => {
  const [cookies, setCookie] = useCookies([hasVisitedBeforeCookieName])

  // Side Effects
  useEffect(() => {
    ;(async () => {
      setCookie(hasVisitedBeforeCookieName, true, { path: '/' })
    })()
  }, [setCookie])

  // TODO: Parallax for new visitor, instead of a dialog.
  return <div></div>
}
export default Welcome
