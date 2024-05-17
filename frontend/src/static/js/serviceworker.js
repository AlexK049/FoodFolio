function log(...data) {
    console.log("SWv1.0", ...data);
  }
  
log("SW Script executing - adding event listeners");
  

const CACHE_NAME = 'foodfolio-app-cache';
const urlsToCache = [
    '/',
    '/offline',
    '/setting',
    '/login',
    '../images/gear.png',
    '../images/hamburger-menu.png',
    '../images/home.png',
    '../images/map.png',
    '../images/notes.png',
    '../images/pretzel.png',
    '../images/search.png',
    '../../App.js',
    '../../index.js',
    '../css/colors.css',
    '../css/drawer.css',
    '../css/header.css',
    '../css/home.css',
    '../css/index.css',
    '../css/modal.css',
    '../css/settings.css',
    '../css/sidebar-menu.css',
    '../../pages/appSkeleton.js',
    '../../pages/home.js',
    '../../pages/index.js',
    '../../pages/login.js',
    '../../pages/offline.js',
    '../../pages/settings.js',
    '../../components/drawer.js',
    '../../components/header.js',
    '../../components/index.js',
    '../../components/modal.js',
    '../../components/sidebarMenu.js',
    '../../components/map/restaurantMarker.js',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
        return response || fetch(event.request);
        }).catch(() => {
            return caches.match('/offline'); 
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
                return caches.delete(cacheName);
            }
            return null;
            })
        );
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data === 'submitFormData') {
        submitFormDataWhenOnline();
    }
});

const submitFormDataWhenOnline = () => {
    if (navigator.onLine) {
        // User is online, submit the form data to the API
        const formData = getFormData(); // Implement your form data retrieval logic
        if (formData) {
        // Assuming there's an API endpoint to submit the form data
        fetch('https://api.example.com/submit', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
            console.log('Form data submitted successfully:', data);
            })
            .catch((error) => {
            console.error('Error submitting form data:', error);
            });
        }
    } else {
        console.log('User is offline. Storing form data locally for later submission.');
    }
};

const getFormData = () => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
        return JSON.parse(storedFormData);
    }
    return null;
};