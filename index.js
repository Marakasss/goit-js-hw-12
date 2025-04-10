import{a as w,S as C,i as S,b as k}from"./assets/vendor-ebWhWHLu.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();async function q(e,t=1){const o=await w.get("https://pixabay.com/api/",{params:{key:"49580099-ba49dcf3c416d0b66883e5025",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}});return{hits:o.data.hits,totalHits:o.data.totalHits,page:t,perPage:15}}async function P(e){if(e>340)e=340;else if(e===0)return[{body:"There is no comments",user:{fullName:""}}];return(await w("https://dummyjson.com/comments",{params:{limit:e}})).data.comments}const c="/goit-js-hw-12/",l=document.querySelector(".gallery");function E(e){const t=e.map(({likes:i,views:o,downloads:n,comments:a,tags:m,largeImageURL:g="${BASE_URL}/img/image-not-found.jpg",webformatURL:x="${BASE_URL}/img/image-not-found.jpg"})=>`<li class="img-card">
                        <a class="gallery-link" href= "${g}">
                            <img
                            class="gallery-image"
                            src= "${x}"
                            alt= "${m.split(",")[0].trim()}"
                            />
                        </a>
                        <ul class="img-info">
                            <li class="info">
                                <svg class="icon-info" name="like" width="18" height="18">
                                    <use href="${c}/img/sprite.svg#icon-like"></use>
                                </svg>
                                <p>${i}</p>
                            </li>
                            <li class="info">
                                <svg class="icon-info" width="18" height="18">
                                    <use href="${c}/img/sprite.svg#icon-eye"></use>
                                </svg>
                                <p>${o}</p>
                            </li>
                            <li class="info">
                                <svg class="icon-info comments" width="18" height="18">
                                    <use href="${c}/img/sprite.svg#icon-dialog"></use>
                                </svg>
                                <p>${a}</p>
                            </li>
                            <li class="info">
                                <svg class="icon-info" width="18" height="18">
                                    <use href="${c}/img/sprite.svg#icon-gallery-download"></use>
                                </svg>   
                                <p>${n}</p>
                            </li>
                        </ul>
                    </li>`).join("");l.insertAdjacentHTML("beforeend",t),u(),new C(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function b(){l.innerHTML=""}function A(e){const t=document.querySelector(".form");t.removeEventListener("input",s),t.addEventListener("input",s);function s(i){e.style.fill=i.target.value.trim()?"#1875FF":""}}function I(e){S.error({message:e,position:window.innerWidth<=768?"bottomCenter":"topCenter",transitionIn:"fadeInDown",backgroundColor:"rgb(231, 19, 36)",messageColor:"white",iconColor:"white",messageSize:"16px",class:"toast"})}function y(e){S.info({message:e,position:window.innerWidth<=768?"bottomLeft":"topLeft",transitionIn:"fadeInLeft",backgroundColor:"rgb(0, 85, 212)",messageSize:"16px",messageColor:"white"})}function B(){const e=document.querySelector(".loader");e.classList.remove("visually-hidden"),l.classList.add("visually-hidden"),e.style.display="block"}function f(){const e=document.querySelector(".loader");e.classList.add("visually-hidden"),l.classList.remove("visually-hidden"),e.style.display="none"}function u(){const e=document.querySelector(".gallery");return new Promise(t=>{if(!e){f(),t();return}const s=e.querySelectorAll("img");let i=0;if(s.length===0){f(),p(),t();return}const o=()=>{i===s.length&&(f(),p(),t())};s.forEach(n=>{n.complete&&n.naturalHeight!==0?i++:(n.onload=()=>{i++,o()},n.onerror=()=>{n.src.includes("image-not-found.jpg")||(n.src=`'${c}/img/image-not-found.jpg'`,n.alt="Image not found",n.onerror=null),i++,o()})}),o()})}function N(){l.addEventListener("click",e=>{if(e.target.tagName==="use"){const t=e.target.closest("svg"),s=t.nextElementSibling;if(t.getAttribute("name")==="like"){let i=Number(s.textContent);t.style.fill!=="darkblue"?(t.style.fill="darkblue",t.style.transform="scale(1.1)",s.style.color="darkblue",i++):(t.removeAttribute("style"),s.removeAttribute("style"),i--),s.textContent=i}}})}function d(e){e.classList.add("visually-hidden")}function h(e){e.classList.remove("visually-hidden")}function j(){document.querySelector(".page-loader").classList.remove("visually-hidden")}function p(){document.querySelector(".page-loader").classList.add("visually-hidden")}function M(){l.addEventListener("click",async e=>{const t=e.target.closest("svg");if(t&&t.classList.contains("comments")){const s=t.nextElementSibling,i=Number(s.textContent);try{const n=(await P(i)).map(({body:m,user:{fullName:g}})=>`<li class="comment-item">
                        <p class="comment-author">${g}</p>
                        <p class="comment-text">${m}</p>
                    </li>`).join("");k.create(`
                    <div class="comments-modal">
                        <h2 class="comments-title">Comments</h2>
                        <ul class="comments-list">
                        ${n}
                        </ul>
                    </div>
                `).show()}catch(o){console.error(o.message)}}})}function O(){const t=document.querySelector(".img-card").getBoundingClientRect();window.scrollBy({top:t.height*2,left:0,behavior:"smooth"})}const v=document.querySelector(".form"),H=document.querySelector(".icon-img"),r=document.querySelector(".load-btn"),L=document.querySelector(".thats-all");A(H);D();N();M();function D(){v.addEventListener("submit",async e=>{e.preventDefault(),b(),d(L);let t=e.target["search-text"].value.trim();if(v.dataset.query=t,!t){y("Enter some value");return}B();try{const{hits:s,totalHits:i,page:o,perPage:n}=await q(t);if(r.dataset.page=o,s.length===0)throw new Error(`Sorry, there are no images matching ${t}. Please try again!`);E(s),await u(),$(t,i,o,n)}catch(s){s.message.includes("no images")?(y(s.message),d(r)):(I("Something went wrong. Please try again later."),console.log(s.message)),b()}finally{u()}})}r.addEventListener("click",_);async function _(){let e=Number(r.dataset.page)+1;r.dataset.page=e;let t=v.dataset.query;if(d(r),j(),!!t)try{const{hits:s,totalHits:i,perPage:o}=await q(t,e);E(s),await u(),O(),$(t,i,e,o)}catch(s){console.error("Load more error:",s)}finally{p()}}function $(e,t,s,i){const o=Math.ceil(t/i);if(s>o){y(`We're sorry, but you've reached the end of search results "${e}".`),d(r),h(L);return}else o===1?(d(r),h(L)):h(r)}
//# sourceMappingURL=index.js.map
