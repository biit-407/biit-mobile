import { useState, useEffect } from 'react'
import { AZURE_CLIENT_ID, AZURE_TENANT_ID } from '../models'

/**
 * @description Hook that handles getting an access token from a grant token (for oauth)
 * 
 * @example
 * ```typescript
 * const component = () => {
 *
 *  const [request, response, promptAsync] = useAzureAuth()
 *  const [setGrantToken, accessToken] = useAzureToken()
 * 
 *  useEffect(() => {
 *      if (response?.params?.code) {
 *          setGrantToken(response?.params?.code)
 *      }
 *  }, [response])
 * 
 *  return (
 *      <Button
 *          disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync({useProxy: true});
            }}
 *      />
 *  )
 * ```
 * 
 * @returns a function to set the grant token and the access token. 
 * NOTE: the access token will be null until a valid grant token is
 * set and then exchanged for an access token
 * 
 */
const useAzureToken = (): [React.Dispatch<React.SetStateAction<string | null>>, string | null] => {
    const [grantToken, setGrantToken] = useState<null | string>(null)
    const [accessToken, setAccessToken] = useState<null | string>(null)

    useEffect(() => {
        if (grantToken !== null) {
            const url = `https://login.microsoftonline.com/${AZURE_TENANT_ID}/oauth2/v2.0/token`
            const body: { [index: string]: string } = {
                'grant_type': "authorization_code",
                'client_id': AZURE_CLIENT_ID,
                'scope': "https://graph.microsoft.com/User.Read",
                'code': grantToken,
                'redirect_uri': "https://auth.expo.io/@stephend17/biit-mobile",
            }

            const formBodyStr = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');

            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBodyStr
            }).then(response => response.json()).then(responseJson => {
                setAccessToken(responseJson?.access_token)
            })
        }
    }, [grantToken])

    return [setGrantToken, accessToken]
}

export default useAzureToken;