<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Considerations for API

### Better error return from API
API on initial implementation is returning a string with an error description when third party service comes back with error. My implementation should return proper response status codes on errors caught in backend.

### Retry logic on API
To improve API's reliability, my code should implement some kind of retry logic towards the caps third party service. This retry logic usually goes associated with an outbound rate limiting technique to maintain outbound retries within accepted limits. (In javascript would have used octokit)

### Inbound Rate limiting
API should implement a rate limiting algorithm for enforcement of acceptable limits on inbound requests. 

### Structured logging
Code is logging to console only. My code should introduce the use of a logging library for proper error level logging and easy log aggregation on deployment infrastrcuture.

### Testing
Any serious software develpment effort should include Unit testing and possibly some E2E testing simulating HTTP requests within the different services in our app.

## Considerations for Deployment Automation

The deployment uses a very simple Helm Chart to deploy on GKE through a Codefresh pipeline `ci/codefrsh.yml` . The pipeline outlines 5 stages and builds a Docker image that is pushed to GCR to be pulled from the K8s cluster. This pipeline considers a single environment (Prod) so the pipeline could potentially be triggered from a GH release. 

A more holistic approach would either promote an image through different environments or add conditionals in the chart logic to target different settings (Resources and Limits for example) depending on what environment the trigger is targeting.

The chart is kept on a Chart repo and deployments to an environment are kept in source control by fetching and updating the chart before applying the release (Poor man's GitOps approach).

Service uses 3 stateless replicas for scalability and redundance. This can be improved by configuring HPA (Pod based) on the K8s cluster to  allocate only the resources necessary and then replicas will be added or removed based on a cluster calculated ratio of used resources (The pod needs to be configured with proper resource requests and limits).

Some other aspects to consider within this pipeline would be adding:

* Integration testing
* Vulnerability scanning
* TLS termination

Log aggregation would be handled by in cluster infra such as fluentd and a timeseries DB.

Application observability can also be added in the form of metrics and would tipically be handled by deploying Prometheus DB in a cluster namespace. The team then can decide on meaningful metrics to reflect application state and display them with the tool of preference (eg. Grafana).


## License

Nest is [MIT licensed](LICENSE).
