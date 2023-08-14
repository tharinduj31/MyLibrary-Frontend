import axios from "axios";


const PORT = 4000; //Env var should be used

const ADDRESS = `http://localhost:${PORT}`; // Env should be used

/**
 * Fetches the Books from the Db
 */
export const fetchAllBooks = async () => {
    try {
        const res = await axios.get(ADDRESS + '/api/v1/books/all');
        return res.data;
    }
    catch {
        return [];
    }
}
/**
 * Posts a New Book
 * @param requestBody 
 * @returns 
 */
export const postNewBook = async (requestBody:object) => {
    try{
        const res = await axios.post(ADDRESS + '/api/v1/books',requestBody);
        return res.data;
    }
    catch(e){
        return e;
        
    }
}

/**
 * The API Function to delete books 
 * @param id the id
 * @returns 
 */
export const deleteABook = async (id:string) => {
    try{
        const res = await axios.delete(ADDRESS + `/api/v1/books/${id}`);
        return res.data;
    }
    catch(e){
        return e;
    }
}
/**
 * The API Function to update books
 * @param id The Id parameter
 * @param requestBody the request body
 * @returns the message or the errorv message
 */
export const updateABook = async (id:string,requestBody:object) => {
    try{
        const res = await axios.put(ADDRESS + `/api/v1/books/${id}`,requestBody);
        return res.data;
    }
    catch(e){
        return e;
    }
}