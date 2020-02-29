const axios = require('axios').default

const apiUrls = {
    login: 'https://www.easynvest.com.br/api/auth/v2/security/token',
    currentPosition: 'https://www.easynvest.com.br/api/samwise/custody-position'
}

let authToken = null

const auth = (cpf, password, clientId) => {
    const authData = new URLSearchParams()

    authData.append('username', cpf)
    authData.append('password', password)
    authData.append('grant_type', 'password')
    authData.append('client_id', clientId)

    return axios.post(apiUrls.login, authData).then(res => {
        authToken = res.data.access_token
        return new Promise(resolve => resolve(authToken))
    })
}

const getAccountData = () => {
    return axios.get(apiUrls.currentPosition, { headers: { 'Authorization': `Bearer ${authToken}` }}).then((res) => {
        return new Promise(resolve => resolve(res.data))
    })
}

module.exports = {
    auth,
    getAccountData
}