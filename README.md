# DogGo projekt – Docker indítási útmutató

## Repository klónozása

```sh
git clone https://github.com/kilianmarcell/DogGo_Vue.git
```

## Docker indítása

```sh
docker-compose up --build
```

Ez a következő szolgáltatásokat indítja el:
- Laravel backend
- Vue frontend
- MySQL adatbázis

## Elérhetőségek
- Backend: http://localhost:8000
- Frontend: http://localhost:8080
- MySQL: localhost:3306 (felhasználó: doggo, jelszó: doggo)

## Megjegyzések
- A `DogGo_Backend/.env` fájlban az adatbázis beállításoknak az alábbiaknak kell lenniük:
	- DB_CONNECTION=mysql
	- DB_HOST=mysql
	- DB_PORT=3306
	- DB_DATABASE=doggo
	- DB_USERNAME=doggo
	- DB_PASSWORD=doggo
- (A .env.example fájlban ezek a beállítások szerepelnek.)
