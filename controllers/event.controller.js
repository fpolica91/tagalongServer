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
        const { user } = req.body
        const event = await Event.findById(id)
        if (event.host.equals(user)) {
            res.json({ message: "you are the host" })
        } else {
            if (event.attending.some(attend => attend.equals(user))) {
                let index = event.attending.indexOf(user)
                event.attending.splice(index, 1)
                event.save()
            } else {
                await event.attending.push(user)
                await event.save()
                res.json(event)
            }
        }
    }



}