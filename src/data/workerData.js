import url from "./url.json"

export async function getWorkers(searchText, signal = null) {
    return await fetch(url.get + "/api/Workers/Get?SearchText=" + searchText, {
        signal: signal,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok == true) {
                return response.json();
            }
            else console.error(response.statusText);
        })
        .catch(err => console.error(err.message));
}