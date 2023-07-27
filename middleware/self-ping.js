const https = require('https');

exports.handler = async (event, context) => {
 const url = 'https://bhshopadminserver.onrender.com/health';
 return new Promise((resolve, reject) => {
   const req = https.get(url, (res) => {
     if (res.statusCode === 200) {
       resolve(console.info({
         statusCode: 200,
         body: 'Server pinged successfully',
       }));
     } else {
       reject(
         console.error(`Server ping failed with status code: ${res.statusCode}`)
       );
     }
   });

   req.on('error', (error) => {
     reject(error);
   });

   req.end();
 });
};