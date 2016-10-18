[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/macropodhq/webpack-skel?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A simple template for react (or not) projects


Features
=====

React and webpack devellopment environments inside a docker container
Tested on windows but should work anywhere
no gulp or grunt
eslint


Setting up dev environment
==========================

Install docker for your environment
Setup the environment variable AGR_ROOT to the root folder, for exemple
export AGR_ROOT=D:/Users/Sacapuces/Documents/Repositories/16AGR

Build the docker image :
bin/build-docker-image.sh

use docker to install npm dependencies
bin/npm-install.sh

Run
=====

bin/run-dev.sh

Lint
====

bin/run-dev.sh npm run eslint


Build
=====

bin/run-dev.sh npm run build


What now?
====
