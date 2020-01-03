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

    async  searchByUser(req, res) {
        const { user } = req.params
        const host = await User.find({ username: { "$regex": user, "$options": "i" } }).select('_id')
        const ids = host.map(host => host._id)
        const event = await Event.find({ 'host': { $in: ids } })
        return res.json(event)
    },
    async request(req, res) {
        const { id } = req.params
        const { guest } = req.body
        const user = await User.findById(req.user._id)
        const event = await Event.findById(id)
        if (event.host.equals(user._id)) {
            res.json({ message: "you are the host" })
        } else {
            if (event.requested.some(attend => attend.user.equals(user._id))) {
                res.json({ success: false, message: "you are already requested this event" })
            } else {
                await event.requested.push({ user: user._id, guest })
                await event.save()
                res.json(event)
            }
        }
    },
    async createEvt(req, res) {
        const { date, name, category, public, venue, url, address, location, guest } = req.body.event
        const user = await User.findById(req.user._id)
        const newEvent = await Event.create({
            host: user._id, date, name, category, public, venue, url, address, location,
            "requested.0.guest": guest,
            "attending.0.guest": guest
        })


        user.events.push(newEvent._id)
        user.save()
        res.json(newEvent)
        req.io.emit('reload')

    }
}