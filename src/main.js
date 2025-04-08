
import { getImagesByQuery } from './js/pixabay-api';
import {
    errorMessage, addLoading, changeIconColor, clearGallery, clickOnlike,
    createGallery, infoMessage, waitForImagesToLoad, hideElement, showElement,
    showNextPageloader, removeNextPageloader
}
    from './js/render-functions';


const searchBar = document.querySelector('.form');
const icon = document.querySelector('.icon-img');
const loadMoreBtn = document.querySelector('.load-btn')
hideElement(loadMoreBtn)

function handleSubmit() {
    searchBar.addEventListener('submit', async event => {
        event.preventDefault();
        clearGallery();

        let query = event.target['search-text'].value.trim();
        searchBar.dataset.query = query;
        if (!query) {
            infoMessage('Enter some value');
            return;
        }
        
        loadMoreBtn.dataset.page = '1';
        searchBar.dataset.query = query;

        addLoading()

            try {
                const response = await getImagesByQuery(query)
                if (response.data.hits.length === 0) {
                    throw new Error(`Sorry, there are no images matching ${query}. Please try again!`);
                }
                
                createGallery(response.data.hits);  
            }
            
            catch(error) {
                if (error.message.includes('no images')) {
                    infoMessage(error.message);
                } else {
                    errorMessage('Something went wrong. Please try again later.');
                }
                
                clearGallery();   
            }
        
            finally {
                waitForImagesToLoad();
                showElement(loadMoreBtn)
            }
            
    })

}
   
loadMoreBtn.addEventListener('click', loadMore)

 async function loadMore() {
     let page = Number(loadMoreBtn.dataset.page) + 1;
     loadMoreBtn.dataset.page = page;
     let query = searchBar.dataset.query;
     hideElement(loadMoreBtn);
     showNextPageloader()
    if (query) {
       try {
            const response = await getImagesByQuery(query, page);
            createGallery(response.data.hits);
        }
        
       catch (error) {
            console.error('Load more error:', error);
            errorMessage('Failed to load more images.');
        }

       finally {
           
            removeNextPageloader()
            showElement(loadMoreBtn)
        }
     }
     
     
     
}

changeIconColor(icon)
handleSubmit()
clickOnlike()  
    
