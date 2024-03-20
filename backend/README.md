# Backend Documentation
---

## Steps to run on local machine

1.  open the backend folder in cmd and type "npm install" to install all dependencies
2.  type "npm start" to start the
    backend server

> Database connection required. You need to create database with following collections:

```js
users: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
      unique: true,
    },
}
```
