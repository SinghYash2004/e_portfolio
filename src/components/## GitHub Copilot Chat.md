## GitHub Copilot Chat

- Extension: 0.46.2 (prod)
- VS Code: 1.118.1 (034f571df509819cc10b0c8129f66ef77a542f0e)
- OS: win32 10.0.26200 x64
- GitHub Account: SinghYash2004

## Network

User Settings:
```json
  "http.systemCertificatesNode": true,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.207.73.85 (168 ms)
- DNS ipv6 Lookup: Error (142 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): Error (360 ms): Error: net::ERR_CERT_DATE_INVALID
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (133 ms): Error: certificate is not yet valid
	at TLSSocket.onConnectSecure (node:_tls_wrap:1697:34)
	at TLSSocket.emit (node:events:519:28)
	at TLSSocket._finishInit (node:_tls_wrap:1095:8)
	at ssl.onhandshakedone (node:_tls_wrap:881:12)
- Node.js fetch: Error (141 ms): TypeError: fetch failed
	at node:internal/deps/undici/undici:14902:13
	at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
	at async t._fetch (c:\Users\singh\AppData\Local\Programs\Microsoft VS Code\034f571df5\resources\app\extensions\copilot\dist\extension.js:5325:5229)
	at async t.fetch (c:\Users\singh\AppData\Local\Programs\Microsoft VS Code\034f571df5\resources\app\extensions\copilot\dist\extension.js:5325:4541)
	at async u (c:\Users\singh\AppData\Local\Programs\Microsoft VS Code\034f571df5\resources\app\extensions\copilot\dist\extension.js:5357:186)
	at async Pg._executeContributedCommand (file:///c:/Users/singh/AppData/Local/Programs/Microsoft%20VS%20Code/034f571df5/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:503:48675)
  Error: certificate is not yet valid
  	at TLSSocket.onConnectSecure (node:_tls_wrap:1697:34)
  	at TLSSocket.emit (node:events:519:28)
  	at TLSSocket._finishInit (node:_tls_wrap:1095:8)
  	at ssl.onhandshakedone (node:_tls_wrap:881:12)

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.113.22 (138 ms)
- DNS ipv6 Lookup: Error (183 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- Proxy URL: None (6 ms)
- Electron fetch (configured): HTTP 200 (968 ms)
- Node.js https: HTTP 200 (1103 ms)
- Node.js fetch: HTTP 200 (1305 ms)

Connecting to https://copilot-proxy.githubusercontent.com/_ping:
- DNS ipv4 Lookup: 20.199.39.224 (170 ms)
- DNS ipv6 Lookup: Error (139 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- Proxy URL: None (4 ms)
- Electron fetch (configured): HTTP 200 (969 ms)
- Node.js https: HTTP 200 (864 ms)
- Node.js fetch: HTTP 200 (644 ms)

Connecting to https://mobile.events.data.microsoft.com: HTTP 404 (212 ms)
Connecting to https://dc.services.visualstudio.com: HTTP 404 (1363 ms)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: 