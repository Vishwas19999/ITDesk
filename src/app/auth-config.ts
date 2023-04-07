import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
export const msalConfig: Configuration = {
     auth: {
         clientId: '2e27ce62-b349-437c-8835-b9918948ba36',
         authority: "https://login.microsoftonline.com/a7bae7fa-0df1-4562-a554-16a95f54c8ce",
         redirectUri: "https://itapps.jktech.com/dashboard", 
         
     },
     cache: {
         cacheLocation:"localStorage",
         storeAuthStateInCookie: true,
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