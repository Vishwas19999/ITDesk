import { MsalService } from '@azure/msal-angular'
import {msal} from '../app/header/header.component'
export const getToken = async(_scopes:any) =>{
    if(msal){
        const account:any = msal.instance.getActiveAccount()
        if(!account){
            console.log('not auth')
        }
        const response = msal.instance.acquireTokenSilent({
            account:account,
            scopes:['User.Read']
        });
        return (await response).idToken
    }
}