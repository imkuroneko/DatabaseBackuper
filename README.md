### 🛢 Database Backuper
```
Bot de discord utilitario para realizar backups de bases de datos (MySQL) según necesidad.
```


### 📚 Librerías Utilizadas
```
• discord.js
• fs
• jszip
• mysqldump
```

<br>

### 📋 Como Instalar
```js
npm install // instalar las dependencias
npm update  // actualizar las dependencias
```

<br>

### 🔍 Info adicional (PM2)
Puedes modificar el archivo `ecosystem.config.js` para cambiar el nombre que aparecerá en pm2; para iniciar el bot, tan solo deberás utilizar el comando
```
pm2 start
```

<br>

### 🥓 Archivos de configuraciones
| Fichero | Utilidad |
|:-------:|:--------:|
|`config/bot.json`| Para definir el `id`, `token` y `prefijo` que utilizará el bot. |
|`config/mysql.json`| Para definir datos para la conexión MySQL. |
|`config/permissions.json`| guardar una lista de los roles que deberán poder utilizar este bot. |


<br>

### 📋 Comandos
| Comando | Acción |
|:-------:|:------:|
|!comandos | Lista de comandos |
|!backup [nombre_bd] | Realizar una copia de la base de datos indicada |

<br>

### ❤️ Agradecimientos

- [discord.js](https://github.com/discordjs/discord.js) por la magnífica librería para poder armar bots
- [bradzacher](https://github.com/bradzacher/mysqldump) por la librería para realizar el dump de la base de datos de forma fácil
- [Stuk](https://github.com/Stuk/jszip) por la librería para realizar comprimir en zip la base de datos exportada



<p align="center">
  <img src="https://img.shields.io/github/repo-size/imkuroneko/MegumiMusicBot?style=flat"/> &nbsp;
  <img src="https://img.shields.io/github/languages/top/imkuroneko/MegumiMusicBot?style=flat"/> &nbsp;
  <img src="https://img.shields.io/github/last-commit/imkuroneko/MegumiMusicBot?color=pink&style=flat"/>
</p>

<p align="center">
  <a href="https://kuroneko.im" target="_blank">
    <img src="https://kuroneko.im/web_assets/favicon.png" width="120">
  </a>
</p>
