# TypeScript React app using Material UI for a Bluesky queueserver client.

Install it and run:

```sh
npm install
npm start
```

The client proxies to the server on port 60610, if it is running on a different
port you will need to change that in the `package.json` (or just switch the
server port to match using --port 60610 when launching it).

The API prefix is set up to default to `/qs` when developing against pods or
a deplpoyed version, this can be overridden by creating a file in the root of
the source tree `.env.local` where you define `REACT_APP_API_PREFIX=` to use a
local instance of the queueserver running standalone for development.
