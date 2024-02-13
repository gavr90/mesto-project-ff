(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{O:()=>f});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-6",headers:{authorization:"082e08bb-025b-4df2-b295-077ece50e46f","Content-Type":"application/json"}};function n(e,t,n,o,r){var c=f.cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__delete-button"),s=c.querySelector(".card__like-button"),u=c.querySelector(".card__like-counter");return c.querySelector(".card__title").textContent=e.cardTitle,a.src=e.cardImage,a.alt="фото "+e.cardTitle,u.textContent=e.likes.length,e.likes.find((function(e){return e._id==r.myId}))&&s.classList.add("card__like-button_is-active"),e.userId===r.myId?i.addEventListener("click",(function(){return n(i,e.cardId)})):i.setAttribute("style","display: none"),s.addEventListener("click",(function(){return t(s,u,e.cardId)})),a.addEventListener("click",(function(){return o(e.cardImage,e.cardTitle)})),c}function o(e,n,o){var r;e.classList.contains("card__like-button_is-active")?(r=o,fetch("".concat(t.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){n.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(o).then((function(e){n.textContent=e.likes.length})).catch((function(e){console.log(e)})),e.classList.toggle("card__like-button_is-active")}function r(e,n){var o;(o=n,fetch("".concat(t.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){e.closest(".card").remove()})).catch((function(e){console.log(e)}))}function c(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")})),document.addEventListener("keydown",i)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)}function i(e){"Escape"===e.key&&a(document.querySelector(".popup_is-opened"))}function s(e,t){t.target.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"}var u=/[^а-яa-z\-\sё]/gi;function l(e,t){var n=e.querySelectorAll(t.inputSelector),o=e.querySelectorAll("."+t.errorClass),r=e.querySelector(t.submitButtonSelector);n.forEach((function(e){e.classList.contains(t.inputErrorClass)&&e.classList.remove(t.inputErrorClass)})),o.forEach((function(e){e.classList.contains(t.errorClassVisible)&&e.classList.remove(t.errorClassVisible)})),r.classList.add(t.inactiveButtonClass)}var d,p,f=document.querySelector("#card-template").content,m=document.querySelector(".places__list"),v=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__image"),h=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),b=document.querySelector(".profile__add-button"),S=document.querySelector(".popup__image"),k=document.querySelector(".popup__caption"),C={popupNewCard:document.querySelector(".popup_type_new-card"),popupEditAvatar:document.querySelector(".popup_type_edit-avatar"),popupEditProfile:document.querySelector(".popup_type_edit"),popupImage:document.querySelector(".popup_type_image")},E=document.forms.editavatar,g=E.elements.link,L=document.forms.editprofile,q=L.elements.name,j=L.elements.description,P=document.forms.newplace,x=P.elements.placename,I=P.elements.link,A={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error",errorClassVisible:"popup__error_visible"};function T(e,t){S.src=e,S.alt="фото "+t,k.textContent=t,c(C.popupImage)}Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t;t=d={name:e[0].name,job:e[0].about,avatar:e[0].avatar,myId:e[0]._id},h.textContent=t.name,y.textContent=t.job,_.setAttribute("style","background-image: url(".concat(t.avatar,")")),e[1].forEach((function(e){p={cardImage:e.link,cardTitle:e.name,likes:e.likes,cardId:e._id,userId:e.owner._id},m.append(n(p,o,r,T,d))}))})).catch((function(e){console.log(e)})),_.addEventListener("click",(function(){c(C.popupEditAvatar),l(E,A)})),v.addEventListener("click",(function(){c(C.popupEditProfile),l(L,A),q.value=h.textContent,j.value=y.textContent})),b.addEventListener("click",(function(){c(C.popupNewCard),l(P,A)})),E.addEventListener("submit",(function(e){e.preventDefault(),s(!0,e),function(e){return fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(g.value).then((function(e){_.setAttribute("style","background-image: url(".concat(e.avatar,")")),E.reset(),l(E,A),a(C.popupEditAvatar)})).catch((function(e){console.log(e)})).finally((function(){s(!1,e)}))})),L.addEventListener("submit",(function(e){e.preventDefault(),s(!0,e),function(e,n){return fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:e,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(q.value,j.value).then((function(e){h.textContent=e.name,y.textContent=e.about,a(C.popupEditProfile)})).catch((function(e){console.log(e)})).finally((function(){s(!1,e)}))})),P.addEventListener("submit",(function(e){var c,i;e.preventDefault(),s(!0,e),(c=x.value,i=I.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:c,link:i})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){p={cardImage:e.link,cardTitle:e.name,likes:e.likes,cardId:e._id,userId:e.owner._id},m.prepend(n(p,o,r,T,d))})).catch((function(e){console.log(e)})).finally((function(){s(!1,e)})),P.reset(),l(P,A),a(C.popupNewCard)})),Object.values(C).forEach((function(e){e.addEventListener("click",(function(t){return function(e,t){(e.currentTarget===e.target||e.target.classList.contains("popup__close"))&&a(t)}(t,e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){"text"===t.type&&(t.value.match(u)?(t.setCustomValidity(t.dataset.errorSintaxMessage),t.classList.add(n.inputErrorClass)):(t.setCustomValidity(""),t.classList.remove(n.inputErrorClass))),t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));o.classList.remove(n.errorClassVisible),o.textContent="",t.classList.remove(n.inputErrorClass)}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));r.classList.add(o.errorClassVisible),r.textContent=n,t.classList.add(o.inputErrorClass)}(e,t,t.validationMessage,n)}(e,r,t),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n.inactiveButtonClass):t.classList.add(n.inactiveButtonClass)}(n,o,t)}))}))}(t,e)}))}(A)})();