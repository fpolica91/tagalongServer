const Event = require('../Models/Events.model')
const axios = require('axios')





// API INSTRUCTIONS 
// keyword=TAKES A STRING AND RETURNS SOMETHING THAT MATCHES
// stateCode = returns based upon state code example FL
// countryCode = same as state code, 
// geoPoints =filter events by geolocation

module.exports = {

    getTicketmasterEvent(req, res) {
        console.log(req.params.name, "this is the hometown")
        // axios.get('https://app.ticketmaster.com/discovery/v2/events.json?keyword=anuel&apikey=IAF49wzCrcjsCkSgLMKAVWJ5flePU6Vh')
        axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=[${req.params.name}]`, {
            params: {
                "apikey": "IAF49wzCrcjsCkSgLMKAVWJ5flePU6Vh"
            }
        }).then((response) => {
            if (!response.data) {
                res.json({ success: false, message: "unable to connect to ticketmaster, please try again later" })
            } else {
                // let events = response.data._embedded.events.splice(0, 2)
                const { events } = response.data._embedded
                // console.log(events.name)
                res.json(events)
            }
        }).catch(err => console.log(err))
    }
}