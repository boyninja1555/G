# G - An alternative to X (originally known as Twitter)
Say goodbye to the nightmares of X (originally known as Twitter). Even though there is a closely resembling name to X, you can forget that with the many perks of using G over X. See the READEME file for more details.

## Features
- Cool features similar to X
- etc

## Project Structure (For Contributors)
**Note:** The `Backend` and `Frontend` folders cannot be run together. Instead, the frontend is a seperate Next.js server for serving the UI and the backend is a NodeJS server holding a file-stored "database" and API routes such as posting, reading a post, creating an account, etc.

```structure
|-- Backend\
|--|-- src\
|--|--|-- *etc*
|--|-- .env
|--|-- package.json
|--|-- tsconfig.json
|-- Frontend\
|--|-- *etc*
|-- .gitignore
|-- LICENSE
|-- README.md
```

## How to Run/Host
G uses TypeScript for development convenience. If you are thinking of modifying G, modify the TypeScript code first. Once you are finished, run the commands below (in order).

```shell
npm install --production
npm run build
npm start
```

Or if you want your code to preview and update live, run the commands below (again, in order).

```shell
npm install
npm run dev
```
