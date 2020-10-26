# TypeScript React app using Material UI for a Bluesky queueserver client.

Install it and run:

```sh
npm install
npm start
```

The client proxies to the server on port 60610, if it is running on a different
port you will need to change that in the `package.json` (or just switch the
server port to match using --port 60610 when launching it).

The queue server API prefix is set up to default to `/qs` when developing
against pods or a deployed version, this can be overridden by creating a file
in the root of the source tree `.env.local` where you define overrides to the
entries in the `.env` file.

See the
[documentation](https://create-react-app.dev/docs/adding-custom-environment-variables)
on details about the variables.
