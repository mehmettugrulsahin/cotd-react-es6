# Catch of the day application with React and Webpack

This is a demo built with [React](https://facebook.github.io/react/), [ES6](http://es6-features.org/) and [Webpack](https://webpack.github.io/).

## Install Node
You will need `node` (```brew install node``` or https://nodejs.org/en/) and ```npm```.
Application runs with the latest ```v7.1.0``` version of node.

## Install Yarn
Install Yarn with ```npm install -g yarn``` or ```sudo npm install -g yarn```

## Clone repo
```bash
git clone https://github.com/mehmettugrulsahin/cotd-react-es6.git

cd cotd-react-es6
```

## Install packages
```
yarn install
```

## Start
```
yarn start
```

## Run on localhost
Navigate to [localhost](http://localhost:3000)

## Build for production
```
yarn build
```

## Serve production build locally
```
sudo npm install -g pushstate-server

pushstate-server build
```
Navigate to [localhost](http://localhost:9000)

## Run in production - now.sh
Navigate to [now.sh](https://ns-qudjezhwtd.now.sh)

## Deploy to production - now.sh
```
sudo npm install -g now-serve
sudo npm install -g now

yarn deploy:now
```

Checkout the NEW production url from the deploy output
```
> Ready! https://ns-[xxxxxxxxxx].now.sh (copied to clipboard) [2s]
> Upload [====================] 100% 0.0s
> Sync complete (522.28kB) [3s]
> Initializing…
> Building
> ▲ npm install
> Installing package list@latest
> ▲ npm start
> Deployment complete!
```
Navigate to the NEW production url 

## Run in production - gh-pages
Navigate to [gh-pages](https://mehmettugrulsahin.github.io/cotd-react-es6/)

## Deploy to production - gh-pages
```
yarn deploy:github
```