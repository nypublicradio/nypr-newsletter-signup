# NYPR Newsletter Signup

This is a simple form widget to subscribe users to a newsletter. Currently configured strictly for mailchimp lists.

## Development

This is a React app, bootstrapped with [`create-react-app`](https://github.com/facebookincubator/create-react-app), which includes a testing framework and build tools.

To get started, make an env file. The sample file will include defaults to get you started.
```
$ cp .env.sample .env
```

Start a development server.
```
$ yarn start # or `npm start`
```
This will start a development server at http://localhost:3000. When it's running, a browser will open up at that address.

## Running Tests

* `yarn test` or `npm test`

## Deploying

Deployment is handled by circle. Commits to `master` will deploy to the demo environment (i.e. https://demo-apps.nypr.org/newsletter-signup). Tagged commits will deploy to the production environment.

## Environment Variables

Name | Description
--- |  ---
`AWS_BUCKET` | Destination bucket for deploys
`AWS_PREFIX` | Path prefix for deployed assets
`AWS_REGION` | AWS Region for infrastructure
`AWS_ACCESS_KEY_ID` | AWS access key id
`AWS_SECRET_ACCESS_KEY` | AWS secret access key
`REACT_APP_BUILD` | The build environment for the app. Either `demo` or `prod`.
`REACT_APP_TOOLKIT_ORIGIN` | The app is configured via [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage), and will only accept messages from the protocol, domain, and port combination specified here.

*Note:* In `demo` environments, `http://localhost:4200` is added to allowed origins from which the app will receive `postMessage` requests. This eases local development on the [toolkit site](https://github.com/nypublicradio/nypr-toolkit).
