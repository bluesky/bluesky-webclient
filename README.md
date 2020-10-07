# TypeScript React app using Material UI for a Bluesky queueserver client.

Install it and run:

```sh
npm install
npm start
```

The client proxies to the server on port 60610, if it is running on a different
port you will need to change that in the `src/setupProxy.js` (or just switch the
server port to match using --port 60610 when launching it).
