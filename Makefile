.PHONY: ping-all dnsmasq-config dnsmasq-run

COUNT ?= 3

ping-all:
	. infra/env.sh; \
	ping -c $(COUNT) $$node_1 | sed "s/$$node_1/node_1/g"; \
	ping -c $(COUNT) $$node_2 | sed "s/$$node_2/node_2/g"; \
	ping -c $(COUNT) $$node_3 | sed "s/$$node_3/node_3/g"; \
	ping -c $(COUNT) $$node_4 | sed "s/$$node_4/node_4/g"

dnsmasq-config:
	. infra/env.sh; \
	: "$${team:?Set team in infra/env.sh}"; \
	: "$${node_2:?Set node_2 in infra/env.sh}"; \
	printf '%s\n' \
		"no-resolv" \
		"address=/app.$${team}.test/$${node_2}" \
		"address=/api.$${team}.test/$${node_2}" > config/dnsmasq.conf

dnsmasq-run: dnsmasq-config
	sudo dnsmasq --no-daemon --conf-file=config/dnsmasq.conf