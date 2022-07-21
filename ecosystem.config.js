module.exports = {
    apps : [{
        name : "MySQL Backuper",
        script : "./index.js",

        watch : false,
        max_restarts : 10,

        ignore_watch : [
            'temp',
            'logs/errors.log',
            'logs/out.log'
        ],

        log_date_format : 'YYYY-MM-DD HH:mm:ss',
        error_file : './logs/errors.log',
        out_file   : './logs/out.log'
    }]
}