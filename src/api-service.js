const token = 'Token 43b65cf72f727f44867acc504a733cfee1692f94'
export class API{
    static updateMovie(mov,body){
        return fetch(`http://127.0.0.1:8000/api/movie/${mov}/` ,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    } 
    
    static createMovie(body){
        return fetch(`http://127.0.0.1:8000/api/movie/` ,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    } 
    
    static deleteMovie(mov){
        return fetch(`http://127.0.0.1:8000/api/movie/${mov}/` ,{
            method: "Delete",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
    } 
}