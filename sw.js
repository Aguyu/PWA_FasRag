//Asignar un nombre y version al cache.
const CACHE_NAME = 'v1-cache_102';
//archivos guardado
var urlsToCache =[
    './',//Todo lo de director actual.
    './css/estilos.css',
    './jquery.js',
    './main.js',
    './sw.js',
    './img/Carrucel1.jpeg',
    './img/Carrucel2.jpeg',
    './img/Carrucel3.jpeg',
    './img/Carrucel4.jpeg',
    './img/fallen.jpeg',
    './img/fondos.png',
    './img/fondos2.png',
    './img/header.jpg',
    './img/icono.ico',
    './img/mapa.png',
    './videos/Eje.mp4',
    './videos/header.mp4',
    './videos/2022-10-04 14-12-36_Trim.mp4',
];

//Evento Install

//Instalaciíon SW y almacenar en cache los recursos estáticos.
self.addEventListener('install', e=>{
    e.waitUntil(//esperar a que abra el cache, regresa una promesa.
    cache.open(CACHE_NAME)//Abrimos el cache, regresamos una promesa.
        .then(cache=>{
            cache.addAll(urlToCache)//Regresamos los elementos del arreglo.
            .then(()=>{
                self.skipWaiting();//Espera a que se lleno el cache.
            })
            .cache(err=>{
                console.log('No se a registrado la acheS')
            })
        })
    )
})

//Evento Activate

self.addEventListener('activate', e=>{
    const cacheWhitelist = [CACHE_NAME]//Vamos a guardar todos los elementos que vienen del cache original.
    e.waitUntil(
        caches.keys()//El keys recorre los elementos que hay en el cache.
            .then(cacheNames =>{
                return Promise.all(
                    //map() nos permite recorrer el array
                    cacheNames.map(cacheNames=>{
                        //indesOf es para buscar un elemto del cache.
                        //los siguiente es buscar un elemento y si no se encuentra borrarlo de la cache o si es redudante.
                        if(cacheWhitelist.indexOf(cacheNames)=== -1){
                            //Borrar elementos que no se necesiten.
                            return cache.delete(cacheNames);
                        }
                    })
                )
                //Activar cahe
                .then(()=>{
                    self.clients.claim();//Activa la cache actual del WhiteList.
                })
            })
    );
})

//Evento Fetch

//Verificar que la informacion esta en el cache.
self.addEventListener('fetch', e=>{
    e.respondWith(
        cahes.match(e.request)//Busca la informacion en el cache.
        .then(res=>{
            if(res){
                //Si se encuentra en el cache devuelve del cache.
                return res;
            }
            //En caso de que no se encuentre en el cache lo recupero del servidor.
            return fetch(e.request);
        })
    );
})