
import { getImagesByQuery } from './js/pixabay-api';
import {
    errorMessage, addLoading, changeIconColor, clearGallery, clickOnlike,
    createGallery, infoMessage, waitForImagesToLoad, hideElement, showElement,
    showNextPageloader, removeNextPageloader,
    getComments,
    makeScroll
}
    from './js/render-functions';


const searchBar = document.querySelector('.form');
const icon = document.querySelector('.icon-img');
const loadMoreBtn = document.querySelector('.load-btn');
const imgEndsDiscr = document.querySelector('.thats-all');
changeIconColor(icon);
handleSubmit();
clickOnlike(); 
getComments(); 



function handleSubmit() {
    searchBar.addEventListener('submit', async event => {
        event.preventDefault();
        clearGallery();
        hideElement(imgEndsDiscr)

        let query = event.target['search-text'].value.trim();
        searchBar.dataset.query = query;
        

        if (!query) {
            infoMessage('Enter some value');
            return;
        }
        
        addLoading()

            try {
                const { hits, totalHits, page, perPage } = await getImagesByQuery(query)
                console.log(hits);
                loadMoreBtn.dataset.page = page;

                if (hits.length === 0) {
                    throw new Error(`Sorry, there are no images matching ${query}. Please try again!`);
                }
                
                createGallery(hits);
                await waitForImagesToLoad();
                pageCounter(query, totalHits, page, perPage)
                
            }
            
            catch(error) {
                if (error.message.includes('no images')) {
                    infoMessage(error.message);
                } else {
                    errorMessage('Something went wrong. Please try again later.');
                    console.log(error.message);
                }
                
                clearGallery();   
            }
        
            finally {
                waitForImagesToLoad();
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

     if (!query) return;

    try {
        const { hits, totalHits, perPage } = await getImagesByQuery(query, page);
        createGallery(hits);
        await waitForImagesToLoad();
        makeScroll()
        pageCounter(query, totalHits, page, perPage);
    }
        
    catch (error) {
            console.error('Load more error:', error);
            
    }

    finally {
            removeNextPageloader()   
    }
     
     
     
     
}

export function pageCounter(query, totalHits, page, perPage) {
     
    const totalPages = Math.ceil(totalHits / perPage);
    
           if (page > totalPages) {
                infoMessage(`We're sorry, but you've reached the end of search results "${query}".`);
               hideElement(loadMoreBtn)
               showElement(imgEndsDiscr)
               return;
           } else if (totalPages === 1) {
               hideElement(loadMoreBtn)
               showElement(imgEndsDiscr)
           }
           else {
                showElement(loadMoreBtn)
           }
}



    
