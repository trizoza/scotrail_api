const { MongoClient, } = require('mongodb')

const saveSingleService = (service) => {
    MongoClient.connect(
        process.env.MONGODB_SCOTRAIL,
        { useNewUrlParser: true },
        (err, db) => {
            if (db) {
                db.db('services')
                .collection('glq-edi')
                .insertOne(service)
                .then(() => {
                    db.close()
                    return
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

const saveServices = (services) => {
    MongoClient.connect(
        process.env.MONGODB_SCOTRAIL,
        { useNewUrlParser: true },
        (err, db) => {
            if (db) {
                db.db('services')
                .collection('glq-edi')
                .insertMany(services)
                .then(() => {
                    db.close()
                    return
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
    saveSingleService,
    saveServices,
}