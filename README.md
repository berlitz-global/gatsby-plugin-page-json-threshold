# gatsby-plugin-page-json-threshold

Audit and have visibility over the size of page-data.json files Gatsby is generating on build.

## Usage

Install the plugin.
`npm install -D gatsby-plugin-page-json-threshold`

Add plugin to your `gatsby-config.js`, here is a basic configuration.

```
module.exports = {
  plugins: [ `gatsby-plugin-page-json-threshold` ],
}
```

You can define a custom threshold for you page-data.json warnings using the following config.

```
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-page-json-threshold`,
      options: {
        thresholdInKb: 50,
      },
    },
  ],
}

```

Currently `thresholdInKb` is the only option, which defaults to `100`, which was a sensible default for the projects I am working on.

After installation, this plugin will post a basic report to your terminal after your run a Gatsby build, which looks something like below, giving you size details and the page url that is responsible.

```
warn page-data.json is 121kb (21kb over the 100kb threshold) for /cool-page-url
warn page-data.json is 123kb (23kb over the 100kb threshold) for /another-page
warn page-data.json is 123kb (23kb over the 100kb threshold) for /and-one-more
```

## Why

If you are building a Gatsby site that requires a lot of data to be passed through `pageContext` then it can be quite easy for your page bundles to get out of hand. This can be used as a tool to ensure your page-data.json files are not growing unexpectedly.
