const Event = require('../Models/Events.model')
const User = require('../Models/User.model')

module.exports = {
    searchBarQuery(req, res) {
        const { keyword } = req.params
        try {
            Event.find(
                {
                    $or: [
                        { name: { "$regex": keyword, "$options": "i" } },
                        { address: { "$regex": keyword, "$options": "i" } },
                        { venue: { "$regex": keyword, "$options": "i" } }
                    ]
                },
            )
                .then(event => res.json(event))
                .catch(err => res.json(err))
        } catch (err) {
            throw new Error(err)
        }
    },
    // end of searchbarquery


    async  searchByUser(req, res) {
        const { user } = req.params
        const host = await User.find({ username: { "$regex": user, "$options": "i" } }).select('_id')
        const ids = host.map(host => host._id)
        const event = await Event.find({ 'host': { $in: ids } })
        return res.json(event)
    },
    //  end of searchByUser
    async request(req, res) {
        const { guest } = req.body
        const { id } = req.params
        const user = await User.findById(req.user._id)
        try {
            const event = await Event.findById(id)
            if (event.host.equals(user._id)) {
                res.json({ success: false, message: "You are the event creator" })
            } else {
                if (event.requested.some(item => item.user.equals(user._id))) {
                    res.json({ message: "you are already attending this event" })
                } else {
                    const updated = await event.update({
                        $push: {
                            requested: { user, guest }
                        }
                    })
                    res.json(updated)
                    req.io.emit('reload')
                }
            }
        } catch (err) {
            throw new Error(err)
        }
    },
    // end of request

    async acceptRequest(req, res) {
        const { id } = req.params
        const { request } = req.body
        const event = await Event.findById(id)
        if (!event) {
            res.json({ success: false, message: "unable to find the event" })
        } else {
            const userToUpdate = event.requested.find(item => item.user.equals(request))
            if (!userToUpdate) {
                res.json({ success: false, messsage: "unable to find the user you  wish to accept" })
            } else {
                const { user, guest } = userToUpdate
                const updatedEvent = await event.update({
                    $push: {
                        attending: { user, guest }
                    },
                    $pull: {
                        requested: { user, guest }
                    }
                })
                res.json(updatedEvent)
                req.io.emit('reload')
            }
        }
    },
    // end of accept request
    async createEvt(req, res) {
        const { date, name, category, public, venue, url, address, location } = req.body.event
        const user = await User.findById(req.user._id)
        if (!user) {
            res.json({ success: false, message: "please login to create an event" })
        } else {
            const newEvent = await Event.create({
                host: user._id, date, name, category, public, venue, url, address, location,
            })
            user.events.push(newEvent._id)
            user.save()
            res.json(newEvent)
            req.io.emit('reload')
        }
    }
    // end of create event
}