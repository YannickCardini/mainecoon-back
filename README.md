# mainecoon-back 🐈‍⬛

Back-end of mainecoon-click

## MySQL 

#### DataBase Name
Mainecoon

#### Table
**Name**:mainecoondonation
**Rows**:
- id INT PRIMARY KEY,
- descri VARCHAR(255),
- region VARCHAR(255),
- img VARCHAR(255),
- phone VARCHAR(14),
- email VARCHAR(255),
- dateposted DATE;


## Routes 🛤️

### Get

`/createDataBase`

`/createTable`

`/connect`

`/select`

### Post

`/insert`
example:
>  curl -d "values=('super chat','PACA','/home/loubard/Images/mainecoon.jpg', '0623671013','lolo@gmail.com','2022-06-16')" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/insert

`/customRequest`
example:
>  curl -d "query=SELECT * FROM mainecoondonation" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/inser

## Docker 🐋

Just do:

```
docker-compose up
```
