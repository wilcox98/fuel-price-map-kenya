# Fuel Price Map (Kenya)
Fetch the fuel prices from EPRA over the years 

## Setting Up
This repos has a frontend and backend. 
### Environment Setup
Create virtual environment
```bash
$ python -m env
```
Activate the environment 
```bash
$ source env/bin/activate
```
Install the require packages 
```bash
$ pip install -r requirements.txt
```
### Backend
Start the API service
```bash
$ cd backend/backend
$ flask run --debug
```
The API will be running on http://127.0.0.1:5000

### Frontend
Start the react app
```bash
$ cd frontend
$ npm install
$ npm start
```
The site will be available on http://127.0.0.1:3000
## Fuel Data
The data is scraped from https://www.epra.go.ke/services/petroleum/petroleum-prices/ 
#### Get data
To get the fuel data go to `backend/notebooks/scrape_data.ipynb`. Run the notebook to download the files from the web.
#### Prepare data
To get the fuel data go to `backend/notebooks/2022_cleaning.ipynb`. Run the notebook to clean and export data to csv.

