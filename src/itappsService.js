const path = require('path');
const Service = require('node-windows').Service;

const svc = new Service({
    name: "ITappsAngular",
    description: "ITapps angular application",
    script:"C:\\ITDesk\\frontend_updated\\ITDesk\\src\\index.html" ,
    args: ['serve', '--prod'],
});

svc.on('install', function(){
    svc.start();
})

svc.install();
