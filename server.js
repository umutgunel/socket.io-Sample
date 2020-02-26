//express modülü
var app = require('express')();
//Noje.Js içerisinde gömülü olan 'http' modülü.
var http = require ('http').createServer(app);
//socket.io modülü.
var io = require('socket.io')(http);

//socket.io içerisinde gömülü olan 'connection'ı ayağa kaldırıyoruz. Burada on metodunu listener gibi düşünebiliriz. Yani on metodu dinleyici konumunda. on metodu ile beraber içerisinde 'socket' adında bir parametre barındıran bir function oluşturuyoruz. (socket ismini bunu ben belirledim) 
io.on('connection', function (socket) {

    //bu aşamada socket nesnem 'servermessage'ı dinliyor ve karşılığında 'clientmessage'ı yayımlayacak bir işlev görüyor.
    //Circle şu şekilde
    //1) index.html servermessage (emit/ yayımlayan) 
    //2) server.js  servermessage (on / dinleyen)
    //3) server.js  clientmessage (emit / yayımlayan) 
    //4) index.js   clientmessage (on / dinleyen)

    //html'den gelen verinin dinlenmesi (on)
    socket.on("servermessage", function (data) {
        //server'dan html'e veri yayımlanması (emit)
        io.emit("clientmessage", data);
    });
})
http.listen(8888);