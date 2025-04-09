import{a as $,S as k,i as m}from"./assets/vendor-Db2TdIkw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=o(i);fetch(i.href,n)}})();async function y(e,t=1){return await $.get("https://pixabay.com/api/",{params:{key:"49580099-ba49dcf3c416d0b66883e5025",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})}const c="/goit-js-hw-12/",l=document.querySelector(".gallery");function p(e){const t=e.map(({likes:r,views:i,downloads:n,comments:a,tags:S,largeImageURL:q="${BASE_URL}/img/image-not-found.jpg",webformatURL:E="${BASE_URL}/img/image-not-found.jpg"})=>`<li class="img-card">
                        <a class="gallery-link" href= "${q}">
                            <img
                            class="gallery-image"
                            src= "${E}"
                            alt= "${S.split(",")[0].trim()}"
                            />
                        </a>
                        <ul class="img-info">
                            <li class="info">
                                <svg class="icon-info" name="like" width="18" height="18">
                                    <use href="${c}/img/sprite.svg#icon-like"></use>
                                </svg>
                                <p>${r}</p>
                            </li>
                            <li class="info">
                                <svg class="icon-info" width="18" height="18">
                                    <use href="${c}/img/sprite.svg#icon-eye"></use>
                                </svg>
                                <p>${i}</p>
                            </li>
                            <li class="info">
                                <svg class="icon-info" width="18" height="18">
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
                    </li>`).join("");l.insertAdjacentHTML("beforeend",t),v(),new k(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function g(){l.innerHTML=""}function x(e){const t=document.querySelector(".form");t.removeEventListener("input",o),t.addEventListener("input",o);function o(r){e.style.fill=r.target.value.trim()?"#1875FF":""}}function h(e){m.error({message:e,position:window.innerWidth<=768?"bottomCenter":"topCenter",transitionIn:"fadeInDown",backgroundColor:"rgb(231, 19, 36)",messageColor:"white",iconColor:"white",messageSize:"16px",class:"toast"})}function f(e){m.info({message:e,position:window.innerWidth<=768?"bottomLeft":"topLeft",transitionIn:"fadeInDown",messageSize:"16px"})}function A(){const e=document.querySelector(".loader");e.classList.remove("visually-hidden"),l.classList.add("visually-hidden"),e.style.display="block"}function u(){const e=document.querySelector(".loader");e.classList.add("visually-hidden"),l.classList.remove("visually-hidden"),e.style.display="none"}function v(){const e=document.querySelector(".gallery");if(!e){u();return}const t=e.querySelectorAll("img");let o=0;if(t.length===0){u(),w();return}t.forEach(i=>{i.complete&&i.naturalHeight!==0?o++:(i.onload=()=>{o++,r()},i.onerror=()=>{i.src.includes("image-not-found.jpg")||(i.src="/goit-js-hw-11/img/image-not-found.jpg",i.alt="Image not found",i.onerror=null),o++,r()})}),r(),o===t.length&&r();function r(){o===t.length&&u()}}function I(){l.addEventListener("click",e=>{if(e.target.tagName==="use"){const t=e.target.closest("svg"),o=t.nextElementSibling;if(t.getAttribute("name")==="like"){let r=Number(o.textContent);t.style.fill!=="darkblue"?(t.style.fill="darkblue",t.style.transform="scale(1.1)",o.style.color="darkblue",r++):(t.removeAttribute("style"),o.removeAttribute("style"),r--),o.textContent=r}}})}function L(e){e.classList.add("visually-hidden")}function b(e){e.classList.remove("visually-hidden")}function C(){document.querySelector(".page-loader").classList.remove("visually-hidden")}function w(){document.querySelector(".page-loader").classList.add("visually-hidden")}const d=document.querySelector(".form"),j=document.querySelector(".icon-img"),s=document.querySelector(".load-btn");L(s);function N(){d.addEventListener("submit",async e=>{e.preventDefault(),g();let t=e.target["search-text"].value.trim();if(d.dataset.query=t,!t){f("Enter some value");return}s.dataset.page="1",d.dataset.query=t,A();try{const o=await y(t);if(o.data.hits.length===0)throw new Error(`Sorry, there are no images matching ${t}. Please try again!`);p(o.data.hits)}catch(o){o.message.includes("no images")?f(o.message):h("Something went wrong. Please try again later."),g()}finally{v(),b(s)}})}s.addEventListener("click",O);async function O(){let e=Number(s.dataset.page)+1;s.dataset.page=e;let t=d.dataset.query;if(L(s),C(),t)try{const o=await y(t,e);p(o.data.hits)}catch(o){console.error("Load more error:",o),h("Failed to load more images.")}finally{w(),b(s)}}x(j);N();I();
//# sourceMappingURL=index.js.map
