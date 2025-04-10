
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
changeIconColor(icon); // Changed input icon color if it has some value
handleSubmit(); // Click on search btn
clickOnlike(); // Functionality for liking pictures
getComments(); // Functionality for getting modal with comments for picture


// -----------------WHEN USER CLICK ON SEARCH BTN-------------------


function handleSubmit() {
    searchBar.addEventListener('submit', async event => {
        event.preventDefault();
        clearGallery(); 
        hideElement(imgEndsDiscr)

        let query = event.target['search-text'].value.trim();
        searchBar.dataset.query = query; //Saving query in input data(after we use it in load more btn)
        
        if (!query) {
            infoMessage('Enter some value');
            return;
        }
        
        addLoading() // Adding main loader after click

            try {
                const { hits, totalHits, page, perPage } = await getImagesByQuery(query)
                loadMoreBtn.dataset.page = page; // Let loading button has data with value of current page

                // If there are no pictures on search request
                if (hits.length === 0) {
                    throw new Error(`Sorry, there are no images matching ${query}. Please try again!`);
                } 
                
                createGallery(hits);
                await waitForImagesToLoad(); //Waiting for all images be loaded before hide loader
                handlePaginationState(query, totalHits, page, perPage) //Show btn load more
                
            }
            
            catch(error) {
                if (error.message.includes('no images')) {
                    infoMessage(error.message);
                    hideElement(loadMoreBtn);
                }
                else {
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
   

// -----------------------BUTTON LOAD MORE BTN AFTER CLICK------------------------


loadMoreBtn.addEventListener('click', loadMore)

 async function loadMore() {
     let page = Number(loadMoreBtn.dataset.page) + 1; // Getting our pagenumber
     loadMoreBtn.dataset.page = page;
     let query = searchBar.dataset.query; // Getting our current search query

     hideElement(loadMoreBtn); 
     showNextPageloader()

     if (!query) return;

    try {
        const { hits, totalHits, perPage } = await getImagesByQuery(query, page);
        createGallery(hits);
        await waitForImagesToLoad();
        makeScroll()
        handlePaginationState(query, totalHits, page, perPage);
    }
        
    catch (error) {
            console.error('Load more error:', error);        
    }

    finally {
            removeNextPageloader()   
    }   
}


// --------------------------PAGINATION BEHAVIOR----------------------------------


export function handlePaginationState(query, totalHits, page, perPage) {
     
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



    
