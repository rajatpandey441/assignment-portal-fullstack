This application is an effort to build a full stack application for managing assignments. This application contains following features:- 

1. User authorization and authentication model implemented using Spring Security 6. Anyone can refer this security code for implementaion of latest syntax without deprecated WebSecurityConfigurerAdapter.
2. JWT tokens based authentication between React and Spring boot.
3. Login based on roles. Currently, application provides two roles; student and code_reviewer. Respective views will load according to role of user.
4. Dedicated dashboard for students. Students can submit their code submissions to code reviewers.
5. Dedicated dashboard for code reviewers. Code Reviewers can claim the available assignments and provide their reviews.
6. All the assignments, and user information is stored in MySQL database.
7. All users can comment on their assignments for effective communication.
8. User can edit delete comments owned by them only.
9. Used Day.js for better visulization of dates present on comments.

Frontend - ReactJS, Day.js and Bootstrap
Backend - Spring Boot and hibernate
Database - MySQL
Authentication & Authorization - Spring Security 6

**Login Page**

![image](https://user-images.githubusercontent.com/20161529/228292618-25153af9-6fdf-4e72-b12a-caff1c110b7e.png)

**Students dashboard**

![image](https://user-images.githubusercontent.com/20161529/228293853-57fc1a97-a2e1-4c28-9357-684fa60f1c22.png)

**Assignemnt Detail Page**

![image](https://user-images.githubusercontent.com/20161529/228293697-dfbc4091-c429-4c88-b14d-25e2d729ecda.png)

**Code Reviewer Dashboard**

![image](https://user-images.githubusercontent.com/20161529/228294065-86da17db-0da9-440a-b62a-1990dd4195ca.png)

![image](https://user-images.githubusercontent.com/20161529/228294224-0b1041dd-8539-4aff-96b2-3921cedc75b5.png)

![image](https://user-images.githubusercontent.com/20161529/228294795-16e1adfe-b1e2-44b7-8c96-b46de78f51af.png)

**Database Schema**

![image](https://user-images.githubusercontent.com/20161529/228295471-fe89c626-7e81-4ffb-a549-91bb23825883.png)

