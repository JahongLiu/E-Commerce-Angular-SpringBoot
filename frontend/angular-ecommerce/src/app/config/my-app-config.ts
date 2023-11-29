export default {
    oidc: {
        // public identifier
        clientId: '0oaatv2ucgaM1BFOZ5d7',
        // URL when authorizing with Okta Authorization Server 
        issuer: 'https://dev-55843244.okta.com/oauth2/default',
        redirectUri: 'https://localhost:4200/login/callback',
        // scopes provide access to information about a user
        // openid: required for authentication requests
        // profile: user's first name, last name, phone etc
        // email: user's email address 
        scopes: ['openid', 'profile', 'email']
    }
}
