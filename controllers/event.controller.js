const Event = require('../Models/Events.model')

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
    }
}