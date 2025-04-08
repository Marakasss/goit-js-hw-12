
import { getImagesByQuery } from './js/pixabay-api';
import { errorMessage, addLoading, changeIconColor, clearGallery, clickOnlike, createGallery,  infoMessage, waitForImagesToLoad } from './js/render-functions';


const searchBar = document.querySelector('.form');
const icon = document.querySelector('.icon-img');

function handleSubmit() {
    searchBar.addEventListener('submit', event => {
        event.preventDefault();

        let query = event.target['search-text'].value.trim();
        if (!query) {
            infoMessage('Enter some value');
            return;
        }
 
        addLoading()

        getImagesByQuery(query)
            
            .then(images => {
                
                if (images.length === 0) {
                    throw new Error(`Sorry, there are no images matching ${query}. Please try again!`);
                }
                
                createGallery(images)
            })
            
            .catch(error => {
                if (error.message.includes('no images')) {
                    infoMessage(error.message);
                } else {
                    errorMessage('Something went wrong. Please try again later.');
                }
                
                clearGallery();
                
            })
        
            .finally(() => {
                waitForImagesToLoad();
            })
            
    })

}
    
changeIconColor(icon)
handleSubmit()
clickOnlike()  
    
