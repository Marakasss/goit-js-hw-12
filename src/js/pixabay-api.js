import axios from 'axios';


export async function getImagesByQuery(query, page = 1) {
    
    const myApiKey = '49580099-ba49dcf3c416d0b66883e5025'; 
    const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: myApiKey,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page,
            per_page: 15,
        }
    })
    return response;
        
}





 