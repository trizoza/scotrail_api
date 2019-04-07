const axios = require('axios')
const { saveService } = require('./db')

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
        let filtered = allStationsServices.filter(({ stations }) => stations.find(({ Station }) => Station === through))
        return filtered.map(service => service.id)
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

const findMatchingServices = (filteredIds, allServices) => {
    let matches = []
    filteredIds.forEach(id => {
        allServices.forEach(service => {
            if (service.id === id) {
                matches.push(service)
            }
        })
    })
    return matches
}

let trainsGLQ, trainsEDI, trainsBathgate

getTrainsFromStation('GLQ')
.then(trainsFromStation => {
    console.log('trainsGLQ', trainsFromStation)
    trainsGLQ = trainsFromStation
    return filterTrainsByDestination('Edinburgh', trainsGLQ)
})
.then(trainsByDestination => {
    console.log('trainsEDI', trainsByDestination)
    trainsEDI = trainsByDestination
    return filterTrainsByThroughStation('Bathgate', trainsEDI)
})
.then(trainsByThroughStation => {
    console.log('trainsByThroughStation ', trainsByThroughStation)
    trainsBathgate = trainsByThroughStation
    return findMatchingServices(trainsBathgate, trainsEDI)
})
.catch(error => {
    console.error(error)
})