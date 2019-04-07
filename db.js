const { MongoClient, } = require('mongodb')

const saveSingleService = (service) => {
    try {
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
                    })
                    .catch(error => {
                        console.error(error)
                        db.close()
                    })
                } else {
                    throw err
                }
            }
        )
    } catch (error) {
        console.error(error)
    }
   
}

const saveServices = (services) => {
    try {
        MongoClient.connect(
            process.env.MONGODB_SCOTRAIL,
            { useNewUrlParser: true },
            (err, db) => {
                if (db) {
                    db.db('services')
                    .collection('glq-edi')
                    .insertMany(
                        services,
                        { ordered: false }
                    )
                    .then(() => {
                        db.close()
                    })
                    .catch(error => {
                        console.error(error)
                        db.close()
                    })
                } else {
                    throw err
                }
            }
        )
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    saveSingleService,
    saveServices,
}