AIRASIA-TELEPORT CODING CHALLENGE.

## Installation
   git clone https://github.com/asadpstu/airasia.git airasia
   
   cd airaisa
   
   npm install
   
   To Run : npm start  [http://localhost:4000]
   
   To Test : npm test
   
## Endpoint 
   GET :  http://localhost:4000/register
   POST : http://localhost:4000/register
   Payload : 
   {
	   "name" : "Asad",
	   "email": "hmasad09@gmail.com",  //try different  data 
	   "password" : "12345",
	   "contact" : "0138596067"
   }
   ------------------------------------------------------------------------------------------------------------------
   POST : http://localhost:4000/authenticate
   Payload : 
   {
     "email" : "hmasad09@gmail.com",
     "password" : "12345"
   }
   Response : x-access-token
   -------------------------------------------------------------------------------------------------------------------
   POST : http://localhost:4000/add/booking
   Header : x-access-token : {token received from authenticate api}
   Payload : 
   {
     "hotelId": "H-S-09087-32451",
     "hotelName": "Hotel Sarina",
     "checkInDate": "12345678909876",
     "checkOutDate": "",
     "customerName": "Asad",
     "customerEmail": "asad@gmail.com",
     "customerContact": "0138596068",
     "roomId": "607",
     "roomName": "Business suite",
     "numberOfGuest": 2,
     "totalCost": 1200,
     "paymentMethod" : "paypal",
     "account_card":"2345678909876"
   } 



   
   
