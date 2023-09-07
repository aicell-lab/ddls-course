# Course Website for Data-Driven Life Sciences

This repository contains the source code for the course website of the Data-Driven Life Sciences course at KTH Royal Institute of Technology.

See the website at [https://ddls.aicell.io](https://ddls.aicell.io).

## Development

Run the following command to start a local development server:

```bash
hugo server
```

## Build Error
If you came across the following error:
```
Error: command error: failed to create config from modules config: unknown output format "redirects" for kind "home"
```

Do the following:
```bash
rm -rf $TMPDIR/hugo_cache/
hugo mod get
hugo server
```

See here: https://wowchemy.com/docs/hugo-tutorials/troubleshooting/#error-failed-to-resolve-output-format