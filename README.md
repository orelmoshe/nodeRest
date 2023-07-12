# nodeRest

nodeRest ApI

Technologies: Node.js & S3 AWS

my node version: 18.16.0

my npm version: 8.18.0

## Installation

Config .env file according your credentials

Using docker

```bash
git clone https://github.com/orelmoshe/nodeRest.git
# Building your image
docker build . -t nodeRest

# Your image will now be listed by Docker
docker images

# Run the image
docker run -p 49160:5000 -d nodeRest # port 5000

# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# If you need to go inside the container you can use the exec command:
docker exec -it <container id> /bin/bash

# Kill our running container
$ docker kill <container id>
<container id>

# Confirm that the app has stopped
$ curl -i localhost:49160
curl: (7) Failed to connect to localhost port 49160: Connection refused
```

Using local

```bash
git clone https://github.com/orelmoshe/nodeRest.git
npm install
npm start
```

Running Tests

```bash
npm run test
```

## Usage Swagger

Go to http://localhost:5000/

---

methods:

GET: /health

POST: /csv

POST: /create-entities

GET:/get-entities/:actionId

GET:/actionIds

---


The application using this following components:

Worker Threads.
Amazon S3 is an object storage service that offers industry-leading scalability, data availability, security, and performance.
Cache in-memory data structure store for higher performance.
Tests - using Mocha and Chai.

---

# links

https://nodejs.org/en/docs/guides/nodejs-docker-webapp
