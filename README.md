# clay-assignment [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/clenemt/docdash/blob/master/LICENSE.md)

A sample react assignment. Feel free to fork, copy and modify as needed.

## Example

See https://clenemt.github.io/clay-assignment/ for a look at the code live. :rocket:

## How to

To run the sample locally, do the following:

```sh
npm install
npm run start
```

It will install dependencies, build the `docs/` folder and launch a small server at [localhost:9000](http://localhost:9000).

## Explanation

When launching the app for the first time, it will load the initial `.json`s into your localstorage. Take a look at [users.json](https://github.com/clenemt/clay-assignment/blob/master/src/assets/users.json) or login with `admin` / `root`.

It only runs **thanks to**:

* [React Router v4](https://reacttraining.com/react-router/web/guides/philosophy) for handling the navigation
* [store.js](https://github.com/marcuswestin/store.js/) for the Cross-browser storage API
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server) for the simple http server
* [Formik](https://github.com/jaredpalmer/formik) and [Yup](https://github.com/jquense/yup) for the form validation
* [axios](https://github.com/axios/axios) for the promise based HTTP client
* [mitt](https://github.com/developit/mitt) for the tiny event emitter

**Attention**: Since there is no real backend and because everything is stored inside your local storage, if you ever get stuck in a bad state, simply clear your local storage.

## Guidelines

* [Prettier](https://github.com/prettier/prettier) is used for style consistencies in all files
* [ESlint](http://eslint.org/) is used for linting the `.js` files
* [EditorConfig](http://editorconfig.org/) is used to enforce correct spacings on all files
* The above is **enforced when you try to commit**
* Commits should be in the form of:

```
<emoji> <title>

# 📝 Update README.md
# ✅ Add unit test for inputs
```

For ease of use you can use the template provided above. The following command will add it as default for this repo only:

```
git config commit.template .gitmessage
```

# License

Licensed under [MIT](LICENSE.md).
