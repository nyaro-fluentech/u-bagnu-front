{
	# Désactiver l'ACME automatique : on utilise le certificat Origin CA Cloudflare
	auto_https off

	log {
		format json
		output stdout
	}
}

${DOMAIN} {
	# TLS avec certificat Origin CA Cloudflare
	tls /etc/caddy/certs/origin.crt /etc/caddy/certs/origin.key

	# Reverse proxy vers le service app
	reverse_proxy app:3000

	# Headers de sécurité
	header {
		X-Frame-Options "SAMEORIGIN"
		X-Content-Type-Options "nosniff"
		Referrer-Policy "strict-origin-when-cross-origin"
		# Retirer le header Server pour ne pas exposer la stack
		-Server
	}

	log {
		format json
		output stdout
	}
}
