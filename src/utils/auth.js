//Specify the BASE_URL
export const BASE_URL = "http://localhost:3001"; 


//The register function accepts the necessary data as an argument
//and sends a POST request to the given end point. 
export const register = (username, avatar, password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST", 
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, avatar, password, email}), 
    }) 
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        })
};


// The authorization function accepts the necessary data as parameters. 
export const authorize = (identifier, password) => {
    // sends a post request to the given endpoint. 
    return fetch(`${BASE_URL}/signin`, {
        method: "POST", 
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",     
        }, 
         // The parameters are wrapped in an object, converted to a JSON
        // string, and sent in the body of the request.
        body: JSON.stringify({identifier, password}), 
    }).then((res)=> {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
}