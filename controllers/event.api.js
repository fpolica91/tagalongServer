const axios = require('axios')

module.exports = {
    async eventHandler(req, res) {
        const seatGeek = async () => await axios.get("https://api.seatgeek.com/2/events?venue.city=west palm beach&client_id=MjAyODAzODV8MTU3ODc3NDkyNi41")
            .catch(err => new Error(err))
        const ticketMaster = async () => await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?&city=west palm beach`, { params: { "apikey": "IAF49wzCrcjsCkSgLMKAVWJ5flePU6Vh", } })
            .catch(err => new Error(err))

        const stubHub = async () => await axios.get('https://api.stubhub.com/sellers/search/events/v3?city=west palm beach', {
            headers: { "Authorization": "Bearer " + "LAMsjgt0wHACRuEdYHayTNZzsSM6" }
        })


        await axios.all(
            [
                seatGeek(),
                ticketMaster(),
                stubHub()
            ]
        )
            .then(axios.spread((seats, tix, stub) => {
                const stubEvents = stub.data.events
                const { events } = tix.data._embedded
                const evs = seats.data.events

                const ticketmaster = events.map(event => {
                    return {
                        id: event.id,
                        name: event.name,
                        url: event.url,
                        // date: event.dates.start.localDate,
                        // status: event.dates.status,
                        venue_name: event._embedded.venues[0].name,
                        address: event._embedded.venues[0].address.line1,
                        images: event.images[0].url
                    }
                })


                const geeks = evs.map(event => {
                    return {
                        id: event.id,
                        name: event.title,
                        url: event.url,
                        address: event.venue.address,
                        venue_name: event.venue.name,
                        image: event.performers[0].image
                    }
                })

                const stubs = stubEvents.map(event => {
                    return {
                        id: event.id,
                        name: event.name,
                        address: `${event.venue.city} ${event.venue.state}`,
                        venue_name: event.venue.name

                    }
                })

                const merged = [ticketmaster, geeks, stubs]
                res.json(merged)

            }))
            .catch(err => new Error(err))
    }
    // end of event hanlder

}