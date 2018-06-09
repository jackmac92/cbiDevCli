#! /bin/bash -ex

run() {
    docker run -ti --rm --name cli cbi-cli
}

build() {
    docker build . -t cbi-cli
}

build
run
