import{S as p,i as d}from"./assets/vendor-B07T6_gy.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const m=t=>`
    <li class="gallery-card">
    <a href="${t.largeImageURL}">
    <img class="gallery-img" src="${t.webformatURL}" alt="${t.tags}"  />
    </a>
    <div class="gallery-container">
    <ul class="gallery-list">
    <li class="gallery-item">
    <p class="gallery-text">Likes</p>
    <p class="gallery-quantity">${t.likes}</p>
    </li>
    <li class="gallery-item">
    <p class="gallery-text">Views</p>
    <p class="gallery-quantity">${t.views}</p>
    </li>
    <li class="gallery-item">
    <p class="gallery-text">Comments</p>
    <p class="gallery-quantity">${t.comments}</p>
    </li>
    <li class="gallery-item">
    <p class="gallery-text">Downloads</p>
    <p class="gallery-quantity">${t.downloads}</p>
    </li>
    </ul>
    </div>
    </li>
  `,g=t=>{const s=`https://pixabay.com/api/?${new URLSearchParams({key:"48304744-eb473523a8629254a32e0d9a6",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0})}`;return fetch(s).then(l=>{if(!l.ok)throw new Error(l.status);return l.json()})},y=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),u=document.querySelector(".js-loader"),h=new p(".gallery a",{captionsData:"alt",captionDelay:250}),c=t=>{t?u.classList.remove("visually-hidden"):u.classList.add("visually-hidden")},f=t=>{t.preventDefault();const a=t.currentTarget.user_query.value.trim();c(!0),g(a).then(s=>{if(c(!1),s.total===0){d.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),n.innerHTML="",y.reset();return}const l=s.hits.map(e=>m(e)).join("");n.innerHTML=l,h.refresh()}).catch(s=>{console.log(s),c(!1)})},i=document.querySelector(".js-search-input");i.addEventListener("input",()=>{i.value!==""?i.classList.add("input-typing"):i.classList.remove("input-typing")});y.addEventListener("submit",f);
//# sourceMappingURL=index.js.map
