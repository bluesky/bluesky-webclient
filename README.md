# TypeScript React app using Material UI for a Bluesky queueserver client.

Install `nodejs`/`npm` from https://nodejs.org/en/download/current/ for your
platform. The LTS version is known to cause issue with `package-lock.json` in
this repo, therefore it is recommended to use the newer versions of the node
package.

Install it and run:

```sh
git clean -fdx
npm install
npm audit fix  # an optional step to fix potential issues
npm start
```

To use the Preview server for displaying live plots and thumbnails:

### Start kafka (MacOS instructions)
```sh
brew install kafka
brew services start kafka
brew services start zookeeper
brew services list  # to make sure both services have been started
```

### Start the queueserver RE-manager with kafka.
```sh
start-re-manager --kafka_server 127.0.0.1:9092 --kafka_topic widgets_test.bluesky.documents
```

### Start the queueserver HTTP server.
```sh
uvicorn bluesky_queueserver.server.server:app --host localhost --port 60610
```

### Set environment variable for preview directory.
```sh
export THUMBNAIL_DIRECTORY=${TMPDIR}/bluesky_widgets_example
```

### Start the kafka-consumer that generates the previews.
```sh
git clone https://github.com/bluesky/bluesky-widgets
cd bluesky-widgets
pip install -e .
python bluesky_widgets/examples/kafka_figures.py
```

### Copy this file locally.
https://gist.github.com/gwbischof/26aedaec7cf997bde2b1cd0def757612

### Start the preview server to serve the produced images.
```sh
uvicorn BlueskyPreviewServer:app
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
