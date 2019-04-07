const axios = require('axios')
const mongodb = require('mongodb')

const getTrainsFromStation = (stationCode) => (
    axios.get(`https://scotrail.pw/live/${stationCode}`)
    .then(({ data }) => {
        if (data && data.services.length > 0) {
            return data.services
        } else {
            throw new Error(`Could not find any trains from ${stationCode} station`)
        }
    })
    .catch(error => {
        throw error
    })
)

const filterTrainsByDestination = (destination, services) => (
    services.filter(service => {
        if (service.destination === destination) {
            return service
        }      
    })
)

getTrainsFromStation('GLQ')
.then(trainsGLQ => {
    console.log('trainsGLQ', trainsGLQ)
    return filterTrainsByDestination('Edinburgh', trainsGLQ)
})
.then(trainsEDI => {
    console.log('trainsEDI', trainsEDI)
    return
})
.catch(error => {
    console.error(error)
})