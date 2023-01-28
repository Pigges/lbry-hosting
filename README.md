# LBRY Hosting

Simple script to generate JSON information about how much you host.

## Prerequisites
Requirements for running this
* [Bun](https://bun.sh/) (Supports Windows under WSL)
* [LBRY-SDK](https://github.com/lbryio/lbry-sdk) (Running locally on port 5279)

## Installation
```bash
git clone https://github.com/Pigges/lbry-hosting.git
cd lbry-hosting
bun install
cp .env.defaults .env
```

> Make sure to edit the .env file for your needs.

## Run
```bash
bun run start
```

## License
Distributed under the MIT license. See ``LICENSE`` for more information.

https://github.com/Pigges/lbry-hosting

This project was created using `bun init` in bun v0.5.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
