/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'hall_of_fame';


// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  'https://unpkg.com/spectre.css/dist/spectre.min.css',
  'https://unpkg.com/spectre.css/dist/spectre-exp.min.css',
  'https://unpkg.com/spectre.css/dist/spectre-icons.min.css',
  '/css/style.css',
  'https://fonts.googleapis.com/css?family=Kavoon',
  'https://fonts.gstatic.com/s/kavoon/v8/pxiFyp4_scRYhlUIPbD7XVlNEM-K.woff2',
  'https://fonts.gstatic.com/s/kavoon/v8/pxiFyp4_scRYhlUIM7D7XVlNEA.woff2',
  '/images/bgBlue.jpg',
  '/images/GrandmaIconLarge.png',
  '/images/PerfectCookie.png',
  '/js/script.js',
];



  

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);

  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
  
  if(evt.request.url.includes('/save_score.php')){
    if(navigator.onLine) { // true|false
      console.log("online")
    }
    else{
      
      var response = new Response([], { "status" : 503 , "statusText" : "SuperSmashingGreat!" })
      return response
    }  
  } 
  if (evt.request.url.includes('/')) {
    console.log('[Service Worker] Fetch (data)', evt.request.url);
    evt.respondWith(
        caches.open(DATA_CACHE_NAME).then((cache) => {
          return fetch(evt.request)
              .then((response) => {
                // If the response was good, clone it and store it in the cache.
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }
                return response;
              }).catch((err) => {
                // Network request failed, try to get it from the cache.
                return cache.match(evt.request);
              });
        }));
    return;
  }
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              return response || fetch(evt.request);
            });
      })
  );
  
  
});
