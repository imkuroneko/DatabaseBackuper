const { db_host, db_port, db_user, db_pass } = require('../config/mysql.json');
const permRoles = require('../config/permissions.json');

const mysqldump = require('mysqldump');
const JSZip = require('jszip');
const fs = require('fs');

module.exports = {
    name: 'backup',
    description: 'Realizar backup de una base de datos mencionada',
    async execute(client, message, args) {

        const memberHasRole = message.member.roles.cache.filter((role) => permRoles.includes(role.id)).map((role) => role.id);

        if(permRoles.length > 0 && memberHasRole.length == 0) {
            return message.reply('No cuentas con los permisos necesarios para utilizar este comando!');
        }

        if(args.length == 0) { return message.reply('💢 Debes pasar el nombre de la base de datos a exportar'); }

        const db_name = args[0].replace(/[^a-zA-Z0-9_]/g, "");

        const db_export_path = `./temp/${db_name}.sql`
        const db_export_name = `${db_name}.sql`;

        mysqldump({
            connection: {
                host: db_host,
                port: db_port,
                user: db_user,
                password: db_pass,
                database: db_name
            },
            compressFile: false,
            dumpToFile: db_export_path
        }).then(() => {
            const d = new Date();
            const timestamp = `${d.getFullYear()}-${("0" + d.getDate()).slice(-2)}-${("0"+(d.getMonth()+1)).slice(-2)} ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}`

            const zip = new JSZip();

            const db_data = fs.readFileSync(db_export_path);
            zip.file(db_export_name, db_data);

            const zip_name = `${db_export_name}.zip`;
            const zip_path = `./temp/${zip_name}`;

            zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }).pipe(fs.createWriteStream(zip_path)).on('finish', () => {
                message.channel.send({
                    embeds: [{
                        color: 0x52c464,
                        title: '🛢 Database Backuper',
                        description: 'Se ha realizado exitosamente la copia de seguridad de la base de datos solicitada, encontrarás a continuación mas detalles',
                        fields: [
                            { name: `**💾 Base de datos**`, value: "```"+db_name+"```" },
                            { name: `**⏱ Timestamp**`, value: "```"+timestamp+"```" },
                            { name: `**👤 Realizado por**`, value: `<@${message.author.id}>` },
                        ]
                    }]
                });
                message.channel.send({ files: [ { attachment: zip_path, name: zip_name } ] }).then(() => {
                    for(const file of fs.readdirSync('./temp')) { fs.unlink(`./temp/${file}`, (err) => { if (err) { } }); }
                });
            });
        }).catch((error) => {
            return message.reply({
                embeds: [{
                    color: 0xbd2f2f,
                    title: '🥞 MySQL BackUp Tool',
                    description: `Hubo un error al realizar la copia de seguridad!\n\n**Código:** \`${error.code}\`\n**Mensaje:** \`${error.message}\``
                }],
            });
        });
    }
};
