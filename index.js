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

const filterTrainsByThroughStation = (through, services) => {
    return Promise.all(services.map(({ id }) => getAllStationsById(id)))
    .then(allStationsServices => {
        return allStationsServices.filter(({ stations }) => stations.find(({ Station }) => Station === through))
    })
    .catch(error => {
        console.log(error);
    })
}

const getAllStationsById = (id) => (
    axios.get(`https://scotrail.pw/service/${id}`)
    .then(({ data }) => {
        if (data) {
            return {
                id,
                stations: data
            }
        } else {
            throw new Error(`Could not find any stations for ${service.id}`)
        }
    })
    .catch(error => {
        throw error
    })
)

getTrainsFromStation('GLQ')
.then(trainsGLQ => {
    console.log('trainsGLQ', trainsGLQ)
    return filterTrainsByDestination('Edinburgh', trainsGLQ)
})
.then(trainsEDI => {
    console.log('trainsEDI', trainsEDI)
    return filterTrainsByThroughStation('Bathgate', trainsEDI)
})
.then(trainsByThroughStation => {
    console.log('trainsByThroughStation ', trainsByThroughStation)
})
.catch(error => {
    console.error(error)
})