self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open("static")
            .then(function(cache){
                console.log("precaching");
                cache.add('/index.html');
                cache.add('/images/Logo.png');
                cache.add('/bootstrap-4.0.0-dist/bootstrap.css');
                cache.add('/Contact_us.html');
                cache.add('/Tomato_all_vue.html');
                cache.add('/Tomato_all.html');
                cache.add('/Tomato_one.html');
                cache.add('/Tomato_one1.html');
                cache.add('/Contact_us.html');
                cache.add('/Fetch.html');
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if (response)
                    return response;
                else
                    return fetch(event.request);
            }
        )
    );   
});

const cat_result= document.getElementById('cat_result');
const dog_result= document.getElementById('dog_result');
const cat_btn= document.getElementById('cat_btn');
const dog_btn= document.getElementById('dog_btn');

cat_btn.addEventListener('click', getRandomCat)
dog_btn.addEventListener('click', getRandomDog)

function getRandomCat() {
    fetch('https://randomfox.ca/floof/')
        .then(res => res.json())
        .then(data => {            
            cat_result.innerHTML = `<img src="${data.image}"/>`
        })
}

function getRandomDog() {
    fetch('https://random.dog/woof.json')
        .then(res => res.json())
        .then(data => {
            if (data.url.includes('.mp4')){
                getRandomDog()
            } else{
            dog_result.innerHTML = `<img src="${data.url}"/>`
            }
        })
}