import { useState } from 'react'
import { Community, CommunityDELETE, CommunityGET, CommunityJoinPOST, CommunityLeavePOST, CommunityPOST, CommunityPUT } from "../models/communities"


const useCommunities = () => {
    const [communities, setCommunities] = useState<Community[]>([])

    /**
     * @description checks if a community has been loaded locally
     * @param name the name of the community
     */
    const _selectByName = (name: string) => {
        let community: Community | {} = {}
        communities.forEach(element => {
            if (element.name.toLowerCase() === name.toLowerCase()) {
                community = element
            }
        });

        return community
    }

    const createCommunity = async (fields: CommunityPOST) => {
        const endpoint = ""//`${SERVER_ADDRESS}`
        const body = JSON.stringify({})
        return await fetch(endpoint, { body: body }).then(response => response.json()).then(responseJson => {
            if (responseJson.status_code === 200) {
                // TODO update tokens 

                const name = responseJson['name']
                const community = _selectByName(name)

                if (community) {
                    // TODO update the community structure in place
                }
                else {
                    // TODO create a new community structure and add 
                    // it to the list of communities
                }
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const getCommunity = async (fields: CommunityGET) => {
        const endpoint = ""//`${SERVER_ADDRESS}`
        const body = JSON.stringify({})
        return await fetch(endpoint, { body: body }).then(response => response.json()).then(responseJson => {
            if (responseJson.status_code === 200) {
                // TODO update tokens 

                const name = responseJson['name']
                const community = _selectByName(name)

                if (community) {
                    // TODO update the community structure in place
                }
                else {
                    // TODO create a new community structure and add 
                    // it to the list of communities
                }
            }
        }).catch(error => {
            console.log(error)
        })
    }


    const updateCommunity = async (fields: CommunityPUT) => {
        const endpoint = ""//`${SERVER_ADDRESS}`
        const body = JSON.stringify({})
        return await fetch(endpoint, { body: body }).then(response => response.json()).then(responseJson => {
            if (responseJson.status_code === 200) {
                // TODO update tokens 

                const name = responseJson['name']
                const community = _selectByName(name)

                if (community) {
                    // TODO update the community structure in place
                }
                else {
                    // TODO create a new community structure and add 
                    // it to the list of communities
                }
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const deleteCommunity = async (fields: CommunityDELETE) => {
        const endpoint = ""//`${SERVER_ADDRESS}`
        const body = JSON.stringify({})
        return await fetch(endpoint, { body: body }).then(response => response.json()).then(responseJson => {
            if (responseJson.status_code === 200) {
                // TODO update tokens 

                const name = responseJson['name']
                const community = _selectByName(name)

                if (community) {
                    // TODO update the community structure in place
                }
                else {
                    // TODO create a new community structure and add 
                    // it to the list of communities
                }
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const joinCommunity = async (fields: CommunityJoinPOST) => {
        const endpoint = ""//`${SERVER_ADDRESS}`
        const body = JSON.stringify({})
        return await fetch(endpoint, { body: body }).then(response => response.json()).then(responseJson => {
            if (responseJson.status_code === 200) {
                // TODO update tokens 

                const name = responseJson['name']
                const community = _selectByName(name)

                if (community) {
                    // TODO update the community structure in place
                }
                else {
                    // TODO create a new community structure and add 
                    // it to the list of communities
                }
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const leaveCommunity = async (fields: CommunityLeavePOST) => {
        const endpoint = ""//`${SERVER_ADDRESS}`
        const body = JSON.stringify({})
        return await fetch(endpoint, { body: body }).then(response => response.json()).then(responseJson => {
            if (responseJson.status_code === 200) {
                // TODO update tokens 

                const name = responseJson['name']
                const community = _selectByName(name)

                if (community) {
                    // TODO update the community structure in place
                }
                else {
                    // TODO create a new community structure and add 
                    // it to the list of communities
                }
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return [
        communities,
        createCommunity,
        getCommunity,
        updateCommunity,
        deleteCommunity,
        joinCommunity,
        leaveCommunity
    ]
}