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
3. Install the backend dependencies by running the command `mvn clean install`
4. Import the project as a maven project in IntelliJ and set the JDK version as 11. Now run the `BackendApplication.java` file. IntelliJ automatically builds the project before running it.
5. Install the frontend dependencies by running the commands

    ```
    cd src/main/frontend
    npm install
    ```
6. Run the following command to start the website `npm start`

### Features

- Users can signup or login.
- Users can edit their profile.
- Users can ask questions.
- Users can answer questions.
- Users can provide feedback by commenting or upvoting/downvoting on different questions and answers.
- Users can search questions by tags or by keywords or by other users.
- Users can accept answers to the questions they asked. 
- Users can view other users' profiles and see their activity.
- User can follow each other.

### Developers
@singhabhyudita 
@darpan1107 
@UtR491 
