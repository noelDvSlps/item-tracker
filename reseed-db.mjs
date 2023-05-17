import { writeFileSync } from "fs";

const db = {
  "users": [
    {
      "fullName": "John Doe",
      "username": "username",
      "password": "password",
      "id": 1
    },
    {
      "fullName": "Alexis Heart",
      "username": "alexis143",
      "password": "alexis143",
      "id": 1
    },
    {
      "fullName": "Kirk Hammett",
      "username": "hammetk",
      "password": "hammetk",
      "id": 2
    },
    {
      "username": "Stephen Curry",
      "password": "stephenc",
      "fullName": "stephenc",
      "id": 3
    }
    
  ],
  "items": [
    {
      "name": "caliper",
      "description": "Digital caliper",
      "status": "available",
      "id": 1,
      "userId": null
    },
    {
      "name": "hammer",
      "description": "Ball Peen hammer",
      "status": "available",
      "id": 2,
      "userId": null
    },
    {
      "name": "Micrometer",
      "description": "Pittsburgh digital micrometer",
      "status": "available",
      "id": 3,
      "userId": null
    },
    {
      "name": "Wrench",
      "description": "Adjustable Wrench",
      "status": "available",
      "userId": null,
      "id": 4
    },
    {
      "name": "Plier",
      "description": "Long Nose Plier",
      "status": "available",
      "id": 5,
      "userId": null
    },
    {
      "name": "Ratchet",
      "description": "Flex head Ratchet",
      "status": "available",
      "userId": null,
      "id": 6
    }
  ],
  "itemsHistory": [
    
  ]
}

  writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });