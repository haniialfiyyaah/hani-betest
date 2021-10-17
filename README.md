# Miscroservices | ms-hani-betest

_Task 2_

Link Deploy [https://ms-hani-betest.herokuapp.com/](https://ms-hani-betest.herokuapp.com/)

| Method | Route  | Middlewares  | Name                                                |
| ------ | ------ | ------------ | --------------------------------------------------- |
| GET    | /token |              | Generate JWT Token                                  |
| GET    | /      | Bearer Token | Read all users data                                 |
| POST   | /      | Bearer Token | Create data with body required                      |
| GET    | /:id   | Bearer Token | Get one data by id, accountNumber or IdentityNumber |
| PUT    | /:id   | Bearer Token | Update data by id                                   |
| DELETE | /:id   | Bearer Token | Delete data by id                                   |

### Request Body

      {
        "userName": "<userName>",
        "accountNumber": "<accountNumber>",
        "emailAddress": "<emailAddress>",
        "identityNumber": "<identityNumber>"
      }

---

## Requirements

For development, you will need Node.js and a node global package, npm, installed in your environement. You can try free online [MongoDB](https://www.mongodb.com/) and [Redis](https://redis.io/) or install it on local.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.17.5

    $ npm --version
    8.0.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

### Installation

---

## Install

    $ git clone https://github.com/haniialfiyyaah/hani-betest.git
    $ cd services/users
    $ npm install

## Configure app

Copy .env.dev to new file .env and setting the env as you need.

## Running the project development

    $ npm run dev

## Running for production

    $ npm run start

## Seeding data for token

    $ npm run seed
