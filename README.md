 <h1 align=center>WA-Forum</h1>
<p align = center><img src="https://user-images.githubusercontent.com/59697798/114752616-20fab300-9d74-11eb-96b5-9ed819e3e13c.png" width="250" align="centre"/></p>

### Introduction

### Tech-Stack
-  **Backend**

    

    - [Spring Boot](https://spring.io/projects/spring-boot)
    - [MySQL](https://www.mysql.com/)

-  **Frontend**
    

    - [React JS](https://reactjs.org/)
    - [React Bootstrap](https://react-bootstrap.github.io/)

### Local Setup

   

1. Clone the repository via the command  ``git clone https://github.com/UtR491/WA-Forum``
2. Inside the WA-Forum directory, run the command `mysql -u yourUserName -p wa_forum < database.sql`. This will initialize the database in your local machine.
3. Download Elastic Search Stack from the following link: 
https://www.elastic.co/downloads/elasticsearch
Unzip the folder, go to the config folder and open the .yml file. 
    
    
    ![yml1](https://user-images.githubusercontent.com/59697798/114849853-cc9c1580-9dfd-11eb-9683-9f4ee41675c3.gif)

4. Enter the cluster name of your choice and the path of your project. 
        
   Go to the bin folder, open cmd in that folder, and run the command    
           `elasticsearch.bat`. This will start the elastic search server on localhost:9200. 
           
    ![elasticsearch bat](https://user-images.githubusercontent.com/59697798/114848994-f0ab2700-9dfc-11eb-831e-3bc351554850.gif)

           
        
        
   This step has to be done before starting the backend server.

5. Install the backend dependencies by running the command `mvn clean install`
6. Import the project as a maven project in IntelliJ and set the JDK version as 11. Now run the `BackendApplication.java` file. IntelliJ automatically builds the project before running it.
7. Install the frontend dependencies by running the commands

    ```
    cd src/main/frontend
    npm install
    ```
8. Run the following command to start the website `npm start`
    ![npmstart](https://user-images.githubusercontent.com/59697798/114817836-55a05600-9dd8-11eb-855a-a5d810dd5d68.gif)



### Features

- Users can signup or log in.

     ![login signup](https://user-images.githubusercontent.com/59697798/114818321-3bb34300-9dd9-11eb-8f41-7a532395db61.gif)
    
- Users can edit their profile.

     ![editprofile](https://user-images.githubusercontent.com/59697798/114825048-58ed0f00-9de3-11eb-8304-6626742d43e5.gif)
     
 - Users can ask questions.
 
     ![askquestion](https://user-images.githubusercontent.com/59697798/114825114-6efacf80-9de3-11eb-86b6-69bc6a562659.gif)
     
- Users can answer questions.

     ![giveanswer](https://user-images.githubusercontent.com/59697798/114825153-79b56480-9de3-11eb-9785-3f5c76b913a1.gif)
     
- Users can provide feedback by commenting or upvoting/downvoting on different questions and answers.

     ![givecomments](https://user-images.githubusercontent.com/59697798/114825185-846ff980-9de3-11eb-97c0-7883015cb4d4.gif)
     
- Users can search questions by tags or by keywords or by other users.

     ![search](https://user-images.githubusercontent.com/59697798/114827752-b5056280-9de6-11eb-9af6-4e1bc7f41d14.gif)

    
- Users can accept answers to the questions they asked. 
      
     ![accpetanswer](https://user-images.githubusercontent.com/59697798/114825491-ecbedb00-9de3-11eb-9544-89dcfb473294.gif)
     
- Users can view other users' profiles and see their activity.
     
     ![activity](https://user-images.githubusercontent.com/59697798/114828082-1c231700-9de7-11eb-9283-40468845965d.gif)

       
- User can follow each other.
      
     ![follow](https://user-images.githubusercontent.com/59697798/114827928-e5e59780-9de6-11eb-83f4-9bfe0758234b.gif)


### Developers
[Abhyudita Singh](https://github.com/singhabhyudita) 

[Darpan Mittal](https://github.com/darpan1107)

[Utkarsh Rai](https://github.com/UtR491) 
