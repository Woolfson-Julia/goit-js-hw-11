import{i as l}from"./assets/vendor-DHdEpnVm.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const u=t=>`
    <li class="gallery-card">
      <img class="gallery-img" src="${t.webformatURL}" data-source="${t.largeImageURL}" alt="${t.tags}"  />
    </li>
  `,m=t=>{const o=`https://pixabay.com/api?${new URLSearchParams({key:"48304744-eb473523a8629254a32e0d9a6",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0})}`;return fetch(o).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})},i=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),f=t=>{t.preventDefault();const a=t.currentTarget.user_query.value.trim();m(a).then(o=>{if(o.total===0){l.info({message:"Sorry, there are no images matching your search query. Please try again!"}),n.innerHTML="",i.reset();return}const s=o.hits.map(e=>u(e)).join("");n.innerHTML=s}).catch(o=>{console.log(o)})};i.addEventListener("submit",f);
//# sourceMappingURL=index.js.map
