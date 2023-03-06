import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
export const msalConfig: Configuration = {
     auth: {
         clientId: 'd76f4c48-fcf4-4182-ba25-6b92e5ba3e7f',
         authority: "https://login.microsoftonline.com/a7bae7fa-0df1-4562-a554-16a95f54c8ce",
         redirectUri: "/", 
     },
     cache: {
         cacheLocation: BrowserCacheLocation.LocalStorage,
         storeAuthStateInCookie: isIE, 
     },
     system: {
         loggerOptions: {
            loggerCallback: (logLevel, message, containsPii) => {
                console.log(message);
             },
             logLevel: LogLevel.Verbose,
             piiLoggingEnabled: false
         }
     }
 }
export const protectedResources = {
  todoListApi: {
    endpoint: "http://localhost:5000/api/todolist",
    scopes: ["User.Read"],
  },
}
export const loginRequest = {
  scopes: []
};