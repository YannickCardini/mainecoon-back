# mainecoon-back 🐈‍⬛

Back-end of mainecoon-click

## MySQL 

#### DataBase Name
Mainecoon

#### Table
**Name**:mainecoondonation
**Rows**:
- id INT PRIMARY KEY,
- catname VARCHAR(255)
- descri VARCHAR(255),
- region VARCHAR(255),
- img VARCHAR(255),
- phone VARCHAR(14),
- email VARCHAR(255),
- dateposted DATE;


## Routes 🛤️

### Get

`/createTable`

`/connect`

`/select`

### Post

`/insert`

`/customRequest`

## Docker 🐋

Just do:

```
docker-compose up
```
