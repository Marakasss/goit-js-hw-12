import axios from 'axios';



export async function getImagesByQuery(query, page = 1) {
    const perPage = 15;
    const myApiKey = '49580099-ba49dcf3c416d0b66883e5025'; 
    const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: myApiKey,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page,
            per_page: perPage,
        }
    })
    return {
        hits: response.data.hits,
        totalHits: response.data.totalHits,
        page,
        perPage,
    };
        
}



export async function getCommentsByQuery(number) {
    if (number > 340) {
        number = 340;
    }
    else if (number === 0) {
        return [{
            body: "There is no comments",
            user: {
                fullName: ''
            }
        }]
    }
    const response = await axios('https://dummyjson.com/comments', {
        params: {
            limit: number
        }
    })

    return response.data.comments;
}


 