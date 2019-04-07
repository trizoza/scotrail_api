const { MongoClient, } = require('mongodb')

const saveService = (service) => {
    MongoClient.connect(
        process.env.MONGODB_SCOTRAIL,
        { useNewUrlParser: true },
        (err, db) => {
            if (db) {
                db.db('routes')
                .collection('edi-glq')
                .save(service)
                .then(() => {
                    db.close()
                    return 'success'
                })
                .catch(err => {
                    db.close()
                    throw err
                })
            } else {
                throw err
            }
        }
    )
}

module.exports = {
    saveService
}