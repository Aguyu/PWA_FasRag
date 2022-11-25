//Lanzamiento del SW en la app
if('serviceWorker'in navigator){
    console.log('Puedes usar el SW');
    navigator.serviceWorker.register('./sw.js')
                    .then(res=>console.log('Service Worker ok',res))
                    .catch(err=>console.log('No hay Service Worker',err));
}else{
    console.log('No puedes usar los Service Worket')
}


//Scroll suavizado
$(document).ready(function()
{
    $("#menu a").click(function()
    {
        $("html, body").animate(
        {
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    });
})