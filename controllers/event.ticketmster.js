const Event = require('../Models/Events.model')
const axios = require('axios')






// API INSTRUCTIONS 
// keyword=TAKES A STRING AND RETURNS SOMETHING THAT MATCHES
// stateCode = returns based upon state code example FL
// countryCode = same as state code, 
// geoPoints =filter events by geolocation



module.exports = {

    getTicketmasterEvent(req, res) {
        axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?&city=${req.params.name}`, {
            params: {
                "apikey": "IAF49wzCrcjsCkSgLMKAVWJ5flePU6Vh",
            }
        }).then((response) => {

            const { totalElements } = response.data.page
            if (!totalElements) res.json({ success: false, message: "There are no events upcoming events in your hometown" })
            if (totalElements) {
                const { events } = response.data._embedded
                const _filteredEventProperties = events.map(event => {
                    return {
                        id: event.id,
                        name: event.name,
                        url: event.url,
                        date: event.dates.start.localDate,
                        status: event.dates.status,
                        promoter: event.promoter ? event.promoter.name : undefined,
                        description: event.promoter ? event.promoter.description : undefined,
                        venues: event._embedded.venues[0],

                        images: event.images
                    }
                })
                res.json(_filteredEventProperties)
            }

        }).catch(err => console.log(err))
    },
    getQueryEvents(req, res) {
        const { keyword, city } = req.query
        const endpoint = city ? `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&city=${city}`
            : `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}`
        axios.get(endpoint, {
            params: {
                "apikey": "IAF49wzCrcjsCkSgLMKAVWJ5flePU6Vh",
            }
        })
            .then(response => {
                const { totalElements } = response.data.page
                console.log(totalElements)
                if (!totalElements) res.json({ success: false, message: "unable to find any events" })
                if (totalElements) {
                    const { events } = response.data._embedded
                    const _filteredEventProperties = events.map(event => {
                        console.log(event.id)
                        return {
                            id: event.id,
                            name: event.name,
                            url: event.url,
                            date: event.dates.start.localDate,
                            status: event.dates.status,
                            promoter: event.promoter ? event.promoter.name : undefined,
                            description: event.promoter ? event.promoter.description : undefined,
                            venues: event._embedded.venues[0],
                            images: event.images
                        }
                    })
                    res.json(_filteredEventProperties)
                }
            })
    }
}