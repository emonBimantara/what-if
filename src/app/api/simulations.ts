export async function getSimulations(){
    const resp = await fetch("/api/simulations/calculate")
    if(!resp.ok){
        throw new Error("Failed to fetch simulations");
    }

    const respData = await resp.json()

    return respData
}