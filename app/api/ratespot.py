import requests

ENDPOINT = "https://api.ratespot.io/v1/api"
params = {
  "apikey": "1oExlQeCs3lfaXCSPYtHRNx4fuGQE18i5KkbqzQ4L1pBfSnf6w2wAEGU6cBlrNsYlNV73i-ed4ueMKC-wP6iGQ",
  "state": "CA",
  "interval": 30
}

response = requests.get(ENDPOINT, params=params)
print(response.json())