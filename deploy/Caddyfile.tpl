{
	auto_https off

	log {
		format json
		output stdout
	}
}

${DOMAIN} {
	tls /etc/caddy/certs/origin.crt /etc/caddy/certs/origin.key
	redir https://www.${DOMAIN}{uri} permanent
}

www.${DOMAIN} {
	tls /etc/caddy/certs/origin.crt /etc/caddy/certs/origin.key
	reverse_proxy app:3000
	header {
		X-Frame-Options "SAMEORIGIN"
		X-Content-Type-Options "nosniff"
		Referrer-Policy "strict-origin-when-cross-origin"
		-Server
	}
}
