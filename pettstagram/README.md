# JS Back-End Exam – Petstagram
1. Exam Rules
1. You have 4 hours 
2. When you are ready, delete the node_modules folder, make sure all dependencies are listed in the package.json file, and submit your archiving project.
3. You are provided with HTML & CSS resources.
4. You may add attributes (such as class and dataset), but it is forbidden to change existing attributes (such as class and id).
5. You may change "href" attributes on links and add/change the method and action attributes of HTML forms.
6. Use Express.js as a back-end framework.
7. Use MongoDB as a database with mongoose.
8. You can use whatever view engine you like (express-handlebars, EJS, Pug, etc.).
9. Use bcrypt for hashing the password.
10. The application must start from the file index.js on port 3000.
11. It is forbidden to use React, Vue, Angular, etc.
12. Only the last submission will be evaluated!
2. Application Overview
Get acquainted with the provided HTML and CSS and create an application for sharing pet photos. 
The visitors can view the home page and catalog page with available photos. They can also register with a username and password. After registering, they will be able to create their photo posts and comment on photo posts they are interested in (if the current user is not the author of the photo). Authors can edit or delete posts at any time.
3. Functional Requirements
Guest (Not Logged-in)
Guest navigation example:

The application should provide guest (not logged in) users with the functionality to login, register, and view the home page, cаtalog page, and details page.
User (Logged-in)
User navigation example:

The application should provide users (logged-in) with the functionality to:
view the home page and all other pages with logged-in navigation;
view catalog page;
create а new photo post [Add Photo];
access the photo details page [See Details];
comment on a photo post (if the current user is not the owner of the photo);
delete or edit the photo depending on the user's authentication (only for the owner of the current blog).
4. Database Models
The database of the Petstagram application needs to support two entities:
User
username – string (required)
email – string (required)
password – string (required)
 Photo
name – string (required)
image – string (required)
age – number (required)
description – string (required)
location – string (required)
commentList – an array of objects containing the user's ID and the comment content: [ { userID: '1234', comment: 'Nice photo!'} ]
owner – object ID (a reference to the User model)
Note:  When a user comments a photo, their ID is added to that collection (commentList)
Implement the entities with the correct data types.
5. Application Pages (80 Pts)
Home Page (Logged-in Users and Logged-out Users) 
Visualize static home page: 

Register Page (Logged-out Users)
Register a user inside the database with a username, email, and password. The password inside the database must be hashed (use bcrypt) and both passwords must match! After successful registration, the user should log in automatically and be redirected to the home page. 

Login Page (Logged-out Users)
An already registered user can log in with the correct username and password. After a successful login, you should redirect the user to the home page.

Logout (Logged-in Users)
The logout action is available to logged-in users. Upon success, clear any session information and redirect the user to the home page.
Catalog (Logged-in Users and Logged-out Users)
List of all photo posts. Each post must display information about the pet image, the name, the age, the location, the owner's username, and a button for details about the specific photo. As in the picture below:

The [See details] button should be a link to the details page for the current photo post.
If there are NO photos in the database yet, display "No photo posts yet.".



Details Page (Logged-in Users and Logged-out Users)
All users should be able to see details. Clicking the [See Details] on the photo card should display the details page. If the currently registered user is the creator of the photo post, the [Edit] and [Delete] buttons should be displayed. Otherwise, they should not be available. Information about the photo:
username of the creator
name
age
description
location
comments:
buttons (depending on the status of the currently logged in user)
Details Page (Logged-out Users)
If the user hasn’t logged in, no buttons should be displayed.

Details Page (Logged-in User and Creator of the Current Photo Post)
If the currently logged-in user is the owner (the user who created the photo post), they should see the [Delete] and [Edit] buttons.

Details Page (Logged-in User Who is Not the Current Photo Owner)
If the currently logged-in user is not the owner (the creator of this photo post), they should see a comment text area.

Comment (Logged-in User Who is Not the Current Photo Owner)
Any registered user who is not the owner of the current photo post should be able to comment on the photo. 
When they click on [Post], their user ID and comment should be added to the commentList collection of the photo and the user should be redirected to the details page for the current photo post.
Every logged-in user who is not the current photo owner can comment as many times as they want.

Add Photo (Logged-in User)
The add page is available to logged-in users. It contains a form for adding a new photo post. Upon success, redirect the user to the catalog page.

Delete Photo (Logged-in User and Owner of the Current Photo) 
Each photo post owner should be able to click on the [Delete] button and delete the current photo from the database. After that, they should be redirected to the catalog page.
Edit Photo (Logged-in User and Owner of the Current Photo) 
Each user can edit their photo posts. Clicking the [Edit] button for a specific photo on the details page should display the edit page, all fields being populated with the photo data. The page contains a form with input fields for all relevant properties. If successful, redirect the user to the current photo post details page.

6. Security Requirements / Routes Guards (10 Pts)
The security requirements are mainly access requirements, i.e., configurations specifying which users can access specific functionalities and pages.
Guest (not logged-in) users can access the home page.
Guest (not logged-in) users can access the login page and functionality.
Guest (not logged-in) users can access the register page and functionality.
Guest (not logged-in) and users (logged-in) can access the catalog (a list of all photo posts).
Guest (not logged-in) can access the details page without functionality.
Users (logged-in) can access the home page.
Users (logged-in) can access the details page and functionality.
Users (not photo post owners) can comment on photos.
Users (photo post owners) can edit and delete their photo posts.
Users (logged-in) can access the profile page and functionality.
Users (logged-in) can access the add photo page and functionality.
Users (logged-in) can access the logout functionality.
Use the following view for invalid paths:

7. Validation and Error Handling (10 Pts)
The application should notify the users about the result of their actions.
In case of an error, you should display a <div> with the class "errorContainer".
You can choose to display the first error or all of them. You have complete freedom to choose the content of the error message you will display.
Login / Register
You should make the following validations:
The username is required and should be at least 2 characters long.
The email is required and should be at least 10 characters long.
The password is required and should be at least 4 characters long.
The repeat password is required and should be equal to the password.
 

Photo
You should make the following validations while creating or editing a photo post:
The name is required and should be at least 2 characters.
The photo image is required and should start with http:// or https://
The age is required and should be at least 1 and no longer than 100 characters.
The description is required and should be at least 5 and no longer than 50 characters.
The location is required and should be at least 5 and no longer than 50 characters.


8. * Bonus – Profile (10 Pts)
Each logged-in user should be able to view their profile information by clicking [Profile]. They should see their username,  the number of photos they have created, their email, and all their photos below.

If they have not created any photo posts yet, the message "You haven't uploaded photos yet…" should be visualized. 

9. Submitting Your Solution
Select all files and folders in your project folder. Exclude the node_modules folder. Compress the selected files and folders into a zipped archive folder. Upload the archive in the softuni learning system: https://softuni.bg/trainings/3972/js-back-end-january-2023 


GOOD LUCK! 😊
