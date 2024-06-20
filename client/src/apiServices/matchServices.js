import apiHandler from "../axios/apiHandler"

const createMatch = async(bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/battle/createBattle',
        bodyData
    })
}

const getMatchDetails = async(matchId) => {
    return apiHandler({
        method: 'get',
        url: `/battle/getBattleDetails/${matchId}`,
    })
}

const startMatch = async(bodyData) => {
    return apiHandler({
        method: 'patch',
        url: '/battle/startBattle',
        bodyData
    })
}

const finishMatch = async(bodyData) => {
    return apiHandler({
        method: 'patch',
        url: '/battle/finishBattle',
        bodyData
    })
}

export { createMatch, getMatchDetails, startMatch, finishMatch };