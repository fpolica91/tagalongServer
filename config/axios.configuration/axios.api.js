const axios = require('axios')

const api = axios.create({
    baseUrl: "https://app.ticketmaster.com/discovery/v2/",
    headers: {
        params: {
            apiKey: "IAF49wzCrcjsCkSgLMKAVWJ5flePU6Vh"
        }
    }
})


module.exports = api
