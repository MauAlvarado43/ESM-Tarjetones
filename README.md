ESM-Tarjetones-2020

Para la configuración de la IP en los QR, es necesario hacer lo siguiente:

    1.-Abrir el archivo "database.js"
    2.-En la cuarta línea hay una variable llamada ip la cual se deberá cambiar por alguna url de este estilo         
    http://[ip]:[puerto], cabe resaltar que si se posee un dominio, basta con poner http://[dominio]

Instrucciones para generar el PDF con los 800 QR's:

    1.-Ejecutar en la raíz del proyecto el siguiente comando "node generateQRIMG.js". Esto funciona para generar 
    los 800 png y las firmas digitales.
    2.-Ejecutar en la raíz del proyecto el siguiente comando "node generatePDF.js". Se generará un PDF pero tomará 
    bastante tiempo. Si no se ejecutó el paso 1, el QR no saldrá en el PDF.

Esquema de la base de de datos:

    La base de datos consta de 4 tablas, una la cual contiene los datos del empleado, otra que guarda los datos del 
    vehículo, otra tabla que indica el qr disponible, y por último una la cual se encarga de relacionar las 3 tablas.

Carpetas:

    -En la carpeta "db" se encuentra el csv y el xlsl, junto con la base de datos sql, es evidente el uso de la carpeta,
    pero es obligatorio si hay algún cambio en la base de datos csv, modificarlo dentro de esa carpeta y cargarlo, para esto,
    en el archivo database.js hay una función comentada en la línea 20.
    -En la carpeta "keys" se encuentras las 2 llaves generadas con RSA para poder crear las firmas digitales de los QR's.
    -En la carpeta "public" se encuentran todos los archivos que el usuario puede ver. Están guardados los html, css, 
    javascript, además de las imágenes y sonidos de notificación.
    -En la carpeta qrCodes se guardan las imágenes png generadas por el archivo "generateQRIMG.js".
    -En la carpeta routes, se encuentran los archivos que controlan las peticiones del tipo de usuario indicado por el 
    nombre del mismo.
    -En la carpeta template, se encuentran los archivos utilizados para la generación del PDF.

Se recomienda revisar los archivos para leer los comentarios, y comprender mejor la estructura del sistema.

Para ejecutar el proyecto, basta con ingresar "node app.js"
