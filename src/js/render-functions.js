import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const BASE_URL = import.meta.env.BASE_URL;

const gallery = document.querySelector('.gallery');


//-----------FUNCTION ADDING CARDS WITH IMAGES TO GALLERY-------------
export function createGallery(images) {
    
    
    //ADD PHOTOS TO GALLARY
    const galleryItemsList = images
        .map(({ likes,
                    views,
                    downloads,
                    comments,
                    tags,
                    largeImageURL = `'${BASE_URL}/img/image-not-found.jpg'`,
                    webformatURL = `'${BASE_URL}/img/image-not-found.jpg'`  
                }) =>
            
             `<li class="img-card">
                        <a class="gallery-link" href= "${largeImageURL}">
                            <img
                            class="gallery-image"
                            src= "${webformatURL}"
                            alt= "${tags.split(',')[0].trim()}"
                            />
                        </a>
                        <ul class="img-info">
                            <li class="info">
                                <svg class="icon-info" name="like" width="18" height="18">
                                    <use href="${BASE_URL}/img/sprite.svg#icon-like"></use>
                                </svg>
                                <p>${likes}</p>
                            </li>
                            <li class="info">
                                <svg class="icon-info" width="18" height="18">
                                    <use href="${BASE_URL}/img/sprite.svg#icon-eye"></use>
                                </svg>
                                <p>${views}</p>
                            </li>
                            <li class="info">
                                <svg class="icon-info" width="18" height="18">
                                    <use href="${BASE_URL}/img/sprite.svg#icon-dialog"></use>
                                </svg>
                                <p>${comments}</p>
                            </li>
                            <li class="info">
                                <svg class="icon-info" width="18" height="18">
                                    <use href="${BASE_URL}/img/sprite.svg#icon-gallery-download"></use>
                                </svg>
                                <p>${downloads}</p>
                            </li>
                        </ul>
                    </li>`
        ).join('');
    
    gallery.innerHTML = galleryItemsList;
    
     waitForImagesToLoad()
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });

    lightbox.refresh();
   
}

export function clearGallery() {
    gallery.innerHTML = ''
}


//------------FUNCTION CHANGED SEARCHBAR ICON COLOR IF SOME VALUE INPUTED------------


export function changeIconColor(icon) {
    const searchBar = document.querySelector('.form');
    //removing prev listener = adding nev
    searchBar.removeEventListener('input', changeColor);
    searchBar.addEventListener('input', changeColor);
       
    function changeColor(event) {
        icon.style.fill = event.target.value.trim() ? '#1875FF' : '';
    }
}


//------------------------------------MESSAGES--------------------------------------


export function errorMessage(message) {
 iziToast.error({
   message: message,
   position: window.innerWidth <= 768 ? 'bottomCenter' : 'topCenter',
   transitionIn: 'fadeInDown',
   backgroundColor: 'rgb(231, 19, 36)',
   messageColor: 'white',
   iconColor: 'white',
   messageSize: '16px',
   class: 'toast',
});
}

export function infoMessage(message) {
 iziToast.info({
   message: message,
   position: window.innerWidth <= 768 ? 'bottomLeft' : 'topLeft',
   transitionIn: 'fadeInDown',
   messageSize: '16px',
});
}

//-----------------------------------LOADER FUNCTIONS----------------------------------------


export function addLoading() {
    const loader = document.querySelector('.loader');
    loader.classList.remove('visually-hidden')
    gallery.classList.add('visually-hidden')
    
    loader.style.display = 'block'
}

export function removeLoading() {
    const loader = document.querySelector('.loader');
    loader.classList.add('visually-hidden')
    gallery.classList.remove('visually-hidden')
    
    loader.style.display = 'none';  
}

//Функцію додав щоб вирішити проблему з завантаженням сторінки.
//Так як у мене likes, views, comemnts, downloads реалізовані іконками
//то іконки завантажувались швидше за зображення і виглядало це не добре.
export function waitForImagesToLoad() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) {
        removeLoading();
        return;
    }

    const images = gallery.querySelectorAll('img');
    let loadedCount = 0;

    if (images.length === 0) {
        removeLoading(); //Якщо немає зображень, одразу ховаємо лоадер
        return;
    }

    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            loadedCount++; //Якщо зображення вже готове
        } else {
            img.onload = () => {
                loadedCount++;
                checkIfAllImagesLoaded();
            };
            img.onerror = () => {
                if (!img.src.includes('image-not-found.jpg')) {
                    img.src = '/goit-js-hw-11/img/image-not-found.jpg'; //ставимо заглушки якщо помилка
                    img.alt = 'Image not found';
                    img.onerror = null; 
                }
                
                loadedCount++; //Якщо зображення не завантажилося, теж  враховуємо
                checkIfAllImagesLoaded();
            };
        }
    });

    checkIfAllImagesLoaded();

    if (loadedCount === images.length) {
        checkIfAllImagesLoaded();
    }

    function checkIfAllImagesLoaded() {
        if (loadedCount === images.length) {
                    removeLoading(); //Ховаємо лоадер тільки коли все намальовано
        }
    } 
}


//---------------------FUNCTION HANDLE LIKE YOUR FAVORITE IMAGES-----------------------------


export function clickOnlike() {
    gallery.addEventListener('click', event => {
        if (event.target.tagName === 'use') {
            const like = event.target.closest('svg');
            const likesValue = like.nextElementSibling;
            
            if (like.getAttribute('name') === 'like') {
                let numberOfLikes = Number(likesValue.textContent);

                if (like.style.fill !== 'darkblue') {
                    like.style.fill = 'darkblue';
                    like.style.transform = 'scale(1.1)'
                    likesValue.style.color = 'darkblue';
                    numberOfLikes++;
                } else {
                    like.removeAttribute('style');
                    likesValue.removeAttribute('style')
                    numberOfLikes--;
                }    

                likesValue.textContent = numberOfLikes;
            }
            
        }
    })
          
}


