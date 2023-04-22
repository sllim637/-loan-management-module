<h1> Loan Manager backend</h1>

<h2> Description </h2>

This is the bakcend part of the the loan manager web app , built using nestjs.



<h2> accessible endpoints </h2>

- POST /add , create a new loan request 
- GET /getOne/{id} gets a loan by its id
- GET /getPDF returns a conversible base64 pdf version of the loan report
- Post /loanResponse stores the final response of the risk management microservice

<h2> how to run </h2>

- clone or download the repository
- in the root directory of the project , run the following command line in each of the folders contained in the project : 
    * npm install
    * npm start

<h2> microservices </h2>

- commercial microservice : calculates the primary score based the loan request
- risk management microservice : calculates the final score of the loan request and returns the final response to the backend
- credit microservice : create the report of loan response 
- ocr microservice : convert documents to pdf version and vice-versa


<h2> Architecture </h2>

![image](https://user-images.githubusercontent.com/68185589/233751080-19e18eb6-b3d2-48a6-aad6-fafbe58077df.png)
