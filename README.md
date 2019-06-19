### npm run dev
Runs both server and client simultaneously
Open localhost:3000 to see React app's content


## Note:    
A few files need to be added with your personal credentials:

In `tweet-sentiment-analysis/.env`:       
```javascript
API_KEY=*******      
API_SECRET=*******    
APPLICATION_ID=*******    
NEXMO_NUMBER=*******    

CONSUMER_KEY=*******     
CONSUMER_SECRET=*******     
ACCESS_TOKEN_KEY=*******    
ACCESS_TOKEN_SECRET=*******      
```

In `tweet-sentiment-analysis/private.key`:
```javascript      
-----BEGIN PRIVATE KEY-----     
XYZ123****xxx123XYZ***    
-----END PRIVATE KEY-----       
```

In `tweet-sentiment-analysis/client/.env`:    
```javascript
REACT_APP_RAPIDAPI_KEY=*******         
```
