# inverted-index

![Quiz app icon](http://previews.123rf.com/images/radiantskies/radiantskies1212/radiantskies121200327/16632871-Abstract-word-cloud-for-Inverted-index-with-related-tags-and-terms-Stock-Photo.jpg)

Andela's Javascript curiculum first checkpoint.

##Prerequisites

####Installing `http-server`
Due to security reasons Javascript cannot read files stored in a user's hard disk, the function can hence only be run from a server.
To be able to do this install the `npm` package `http-server` by following the following steps:

1. Visit `https://nodejs.org/` and follow the insructions provided to install `node`
2. Follow the instructions at `https://docs.npmjs.com/getting-started/fixing-npm-permissions` to be able to install `npm` packages globally without providing the root password.
3. From a terminal run the following command

```bash
npm install -g http-server
```

####Installing `git`
Follow the instructions at `https://git-scm.com/book/en/v2/Getting-Started-Installing-Git` to install `git` which is required to clone the repository

## How to download and run
From a terminal run the following commands:

```bash
cd

git clone https://github.com/andela-kndungu/inverted-index.git

cd inverted-index/jasmine

http-server .
```
From a browser navigate to `http://127.0.0.1:8080/SpecRunner.html`

## Functions being tested

`loadJSON(filepath)` : Loads and parses the .json file specified by `filepath`
`createIndex()` : Creates an inverted index object from the loaded JSON
`searchIndex(arguments)` : Takes a variable number of string or array arguments and returns an array of indices of where the words appear in the loaded JSON array
