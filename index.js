import{a as y,S as p,i as g}from"./assets/vendor-Db2TdIkw.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();async function v(i){return y.get("https://pixabay.com/api/",{params:{key:"49580099-ba49dcf3c416d0b66883e5025",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:100}}).then(e=>e.data.hits).catch(e=>{throw console.error(e),e})}const s="/goit-js-hw-12/",a=document.querySelector(".gallery");function b(i){const o=i.map(({likes:n,views:t,downloads:r,comments:l,tags:f,largeImageURL:m=`'${s}/img/image-not-found.jpg'`,webformatURL:h=`'${s}/img/image-not-found.jpg'`})=>`<li class="img-card">
                        <a class="gallery-link" href= "${m}">
                            <img
                            class="gallery-image"
                            src= "${h}"
                            alt= "${f.split(",")[0].trim()}"
                            />
                        </a>
                        <ul class="img-info">
                            <li class="info">
                                <svg class="icon-info" name="like" width="18" height="18">
                                    <use href="${s}/img/sprite.svg#icon-like"></use>
                                </svg>
                                <p>${n}</p>
                            </li>
                            <li class="info">
                                <svg class="icon-info" width="18" height="18">
                                    <use href="${s}/img/sprite.svg#icon-eye"></use>
                                </svg>
                                <p>${t}</p>
                            </li>
                            <li class="info">
                                <svg class="icon-info" width="18" height="18">
                                    <use href="${s}/img/sprite.svg#icon-dialog"></use>
                                </svg>
                                <p>${l}</p>
                            </li>
                            <li class="info">
                                <svg class="icon-info" width="18" height="18">
                                    <use href="${s}/img/sprite.svg#icon-gallery-download"></use>
                                </svg>
                                <p>${r}</p>
                            </li>
                        </ul>
                    </li>`).join("");a.innerHTML=o,d(),new p(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function L(){a.innerHTML=""}function w(i){const o=document.querySelector(".form");o.removeEventListener("input",e),o.addEventListener("input",e);function e(n){i.style.fill=n.target.value.trim()?"#1875FF":""}}function S(i){g.error({message:i,position:window.innerWidth<=768?"bottomCenter":"topCenter",transitionIn:"fadeInDown",backgroundColor:"rgb(231, 19, 36)",messageColor:"white",iconColor:"white",messageSize:"16px",class:"toast"})}function u(i){g.info({message:i,position:window.innerWidth<=768?"bottomLeft":"topLeft",transitionIn:"fadeInDown",messageSize:"16px"})}function $(){const i=document.querySelector(".loader");i.classList.remove("visually-hidden"),a.classList.add("visually-hidden"),i.style.display="block"}function c(){const i=document.querySelector(".loader");i.classList.add("visually-hidden"),a.classList.remove("visually-hidden"),i.style.display="none"}function d(){const i=document.querySelector(".gallery");if(!i){c();return}const o=i.querySelectorAll("img");let e=0;if(o.length===0){c();return}o.forEach(t=>{t.complete&&t.naturalHeight!==0?e++:(t.onload=()=>{e++,n()},t.onerror=()=>{t.src.includes("image-not-found.jpg")||(t.src="/goit-js-hw-11/img/image-not-found.jpg",t.alt="Image not found",t.onerror=null),e++,n()})}),n(),e===o.length&&n();function n(){e===o.length&&c()}}function k(){a.addEventListener("click",i=>{if(i.target.tagName==="use"){const o=i.target.closest("svg"),e=o.nextElementSibling;if(o.getAttribute("name")==="like"){let n=Number(e.textContent);o.style.fill!=="darkblue"?(o.style.fill="darkblue",o.style.transform="scale(1.1)",e.style.color="darkblue",n++):(o.removeAttribute("style"),e.removeAttribute("style"),n--),e.textContent=n}}})}const I=document.querySelector(".form"),q=document.querySelector(".icon-img");function x(){I.addEventListener("submit",i=>{i.preventDefault();let o=i.target["search-text"].value.trim();if(!o){u("Enter some value");return}$(),v(o).then(e=>{if(e.length===0)throw new Error(`Sorry, there are no images matching ${o}. Please try again!`);b(e)}).catch(e=>{e.message.includes("no images")?u(e.message):S("Something went wrong. Please try again later."),L()}).finally(()=>{d()})})}w(q);x();k();
//# sourceMappingURL=index.js.map
