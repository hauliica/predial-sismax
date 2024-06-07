module.exports = {
        apps: [{
                name: 'predial',
                script: 'npm',
                args: 'start',
                watch: true,
                env: {
                        "NODE_ENV": "production",
                        "DATABASE_URL": "mysql://sistemd1_awsec2:d8ffR%Z-kkP7)Gp@sistemasmac.com:3306/sistemd1_catastro",
                        "CERTIFICATE_PATH": "/home/ubuntu/predial-sismax/multicobros.cer",
			"BAN_MERCHANT_ID": "7652823",
			"BAN_NAME": "e7652823",
			"BAN_PASSWORD": "1/uiHF3=",
			"BAN_MODE": "PRD",
			"BAN_TERMINAL_ID": "76528231",
			"BAN_MERCHANT_NAME": "MUNICIPIO DE ACUNA COA",
			"BAN_MERCHANT_CITY": "CIUDAD ACUNA",
			"BAN_LANG": "ES"
                }
        }]
};
