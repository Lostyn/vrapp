#


> <a href="https://electron.atom.io/">Electron</a> `16.0` with <a href="https:/https://www.typescriptlang.org/">TypeScript</a> `4.5.4` and <a href="https://gulpjs.com/">Gulp</a>.

https://socket.io/fr/docs/v4/server-initialization/#with-an-https-server

## Debug Oculus Browser web view on device
- Adb must be setup over usb or wifi
- open chrome
- goto chrome://inspect/#devices
- Find your device and page
- Click inspect

## Create cert form https
https://medium.com/@nitinpatel_20236/how-to-create-an-https-server-on-localhost-using-express-366435d61f28
- openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
- openssl rsa -in keytmp.pem -out key.pem
