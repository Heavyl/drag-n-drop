export async function fetchJSON(url) {
    const request = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: "application/json"
        }
    })

    if (request.ok) {
        return await request.json()
    }
    throw new Error('oupsi')
}