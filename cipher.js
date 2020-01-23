const crypto = require('crypto');
const fs = require('fs');
const password = "{qp}gEtS$C2b!=3T";

exports.createKeys = function(){
    const { generateKeyPair } = require('crypto');
    generateKeyPair('rsa', {
      modulusLength: 1024,
      namedCurve: 'secp256k1', 
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: password
      }
    }, (err, publicKey, privateKey) => {
        if(err){console.log(err);}
        fs.writeFileSync("./keys/privateKey.pem",privateKey,(err1)=>{
            if(err1){console.log(err1);}
        });
        fs.writeFileSync("./keys/publicKey.pem",publicKey,(err1)=>{
            if(err1){console.log(err1);}
        });
    });
};

exports.sign = function(data){
        let private_key = fs.readFileSync('./keys/privateKey.pem', 'utf-8');
        let message = data;
    
        let signer = crypto.createSign('RSA-SHA256');
        signer.update(message);
        signer.end();
    
        let signature = signer.sign({key:private_key.toString(),passphrase:password});
        let signature_hex = signature.toString('base64');

        let verifier = crypto.createVerify('RSA-SHA256');
        verifier.update(message);
        verifier.end();

        return(signature_hex);
};