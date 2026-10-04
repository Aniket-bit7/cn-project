## Network Topology

```mermaid
flowchart LR
	Client[Client Mac]
	DNS[Mac 1<br/>Private DNS<br/>10.7.20.219:53/UDP]
	Edge[Mac 2<br/>nginx TLS Edge<br/>10.7.20.151:443]
	BackendA[Mac 3<br/>Backend A<br/>10.7.25.240:3001]
	BackendB[Mac 4<br/>Backend B<br/>10.7.6.187:3002]

	Client -->|DNS query: app.goodgoys.test| DNS
	DNS -->|A record: 10.7.20.151| Client
	Client -->|HTTPS| Edge
	Edge -->|Round-robin HTTP| BackendA
	Edge -->|Round-robin HTTP| BackendB
```

| Layer | Source | Destination | Port |
|---|---|---|---|
| DNS query | Client ephemeral UDP port | Mac 1 | UDP 53 |
| DNS response | Mac 1 UDP 53 | Client ephemeral UDP port | UDP |
| TCP handshake | Client ephemeral TCP port | Mac 2 | TCP 443 |
| TLS handshake | Client ephemeral TCP port | Mac 2 | TCP 443 |
| HTTPS request | Client ephemeral TCP port | Mac 2 | TCP 443 |
| Backend connection | Mac 2 ephemeral TCP port | Mac 3 or Mac 4 | TCP 3001 or 3002 |