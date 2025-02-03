<h1 align="center">
  Serverless Shipping 📦
</h1>

<div align="center">
   <a href="https://github.com/JohnPetros">
      <img alt="Made by JohnPetros" src="https://img.shields.io/badge/made%20by-JohnPetros-blueviolet">
   </a>
   <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/JohnPetros/shipment-service">
   <a href="https://github.com/JohnPetros/shipment-service/commits/main">
      <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/JohnPetros/shipment-service">
   </a>
  </a>
   </a>
   <a href="https://github.com/JohnPetros/shipment-service/blob/main/LICENSE.md">
      <img alt="GitHub License" src="https://img.shields.io/github/license/JohnPetros/shipment-service">
   </a>
    <img alt="Stargazers" src="https://img.shields.io/github/stars/JohnPetros/shipment-service?style=social">
</div>
<br>



## 🖥️ About the project

Serverless Shipping is a **serverless application** that calculates the price of each shipping quote available to a given zipcode.

This app is running on **[AWS Lamda service](https://aws.amazon.com/pt/pm/lambda/?gclid=CjwKCAiAzPy8BhBoEiwAbnM9O193pIDplZE68VBbVOfLS64Pmifgnp06AWNQVISGQZmRa9aTH-uAhRoCsgMQAvD_BwE&trk=56f58804-91cd-4af4-98d4-afe277a57fd3&sc_channel=ps&ef_id=CjwKCAiAzPy8BhBoEiwAbnM9O193pIDplZE68VBbVOfLS64Pmifgnp06AWNQVISGQZmRa9aTH-uAhRoCsgMQAvD_BwE:G:s&s_kwcid=AL!4422!3!651510591822!e!!g!!amazon%20lambda!19828231347!148480170233)**, that means there is no need for manual server, infrastructure and scalability management. The app is able to scale automatically based on the demand.

It has been used for the mobile app **[Sertton](https://github.com/JohnPetros/sertton)** where the user can calculate the price based on their zipcode before buying an item on the e-commerce.

This app uses [Melhor Envio API](https://docs.melhorenvio.com.br/reference/introducao-api-melhor-envio) under the hood, a free shipment plataform that intermediates several brazilian shipping companies.

---

## ✨ Features

### Auth

- [x] This App should be authenticated by **Melhor Envio API** using [OAuth protocol](https://jwt.io/), where the former should behave client and resource server
- [x] This App should request to **Melhor Envio** refresh the auth token every week on Sunday 00:00
- [x] This App should validate the access token before sending to **Melhor Envio API**
- [x] This App should store both access token and refresh token in cache


### Shipping quote calculation

- [x] This App should return the shipping quotes based on **Sertton**'s zipcode and the customer's zipcode and price, quantity and dimensions of the requested products (width, height, weight and length)

---

## ⚙️ Architecture

## 🛠️ Technologies, tools and services

- **[NodeJs](https://nodejs.org/en)** for running JavaScript on server side

- **[Serverless Framework](https://www.serverless.com/)** for helping to develop and deploy the serverless application

- **[Melhor Envio](https://melhorenvio.com.br/)** for providing shipping service quote calculation

- **[Redis](https://redis.io/)** for storing the tokens in cache for the authentication


> For more details about the project's dependencies like specific versions of each dependency, see [package.json](https://github.com/JohnPetros/shipment-service/blob/main/package.json)
---

## 🚀 How to run the application?

### 🔧 Prerequisites

Before download the prject you will need install some tools:

- [npm](https://nodejs.org/en), [yarn](https://nodejs.org/en) or [pnpm](https://pnpm.io/pt/) (I'll use npm) to install node packages

- [Docker](https://www.docker.com/), the amazing technology to manage [containers](https://www.docker.com/resources/what-container/).

> Besides that, it is good to have some tool to write the code like [VSCode](https://code.visualstudio.com/)

> Also it is pivotal setting the environment variables on the `.env` file before running the application. See the [.env.example](https://github.com/JohnPetros/shipment-service/blob/main/.env.example) file to know which variables should be set

### 📟 Running the application

```bash

# Clone this repo
git clone https://github.com/JohnPetros/shipment-service.git .

# Install the node dependencies
npm install

# Run the application on the local environment
npm run local

# Start the redis docker container
docker compose up

```

> Probably the aplication will be running on http://localhost:3002

---

## 🤝 how to Contribute

```bash

# Fork this repo
$ git clone https://github.com/JohnPetros/shipment-service.git

# Create a nem branch for the new feature
$ git checkout -b new-feature

# Commit your changes:
$ git commit -m 'feat: <New Feature>'

# Push your branch:
$ git push origin new-feature

```

> You must replace new-feature with the name the feature you are adding

> You can also open a [new issue](https://github.com/JohnPetros/shipment-service/issues) about some problem, question or sugestion for the project. I will be happy to help as well as improve this application

---

## 📝 Licence

This application is under MIT Licence. See [the licence file](https://github.com/JohnPetros/shipment-service/blob/main/license) to get more details about it.

---

<p align="center">
  Made with 💜 by John Petros 👋🏻
</p>
