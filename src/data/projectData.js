import url from "./url.json"

export async function createProject(name, startDate, endDate, priority, customerName, performerName, managerId, workerIds) {

    const project = { name, startDate, endDate, priority, customerName, performerName, managerId, workerIds }
    await fetch(url.get + "/api/Projects/Post", {
        method: "POST",
        body: JSON.stringify(project),
        headers:
        {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok != true) console.error(response.statusText)
    }).catch(err => console.error(err.message))

}
