
overview of my project
![image](https://github.com/user-attachments/assets/c281601d-25e5-4e77-ae7e-3eea8f1919dc)


### Overview of the Project:

1. **Main Page:**
   - The page includes text input fields for entering **email** and **password**, along with `Submit` and `List of users` buttons for adding and displaying the user data.
   - There is also a **table** used to display the list of stored users.

2. **IndexedDB**:
   - IndexedDB is a non-relational database that allows you to store and retrieve data on the client-side (in the browser).
   - This project uses **IndexedDB** to store user information such as email and password.

3. **Creating and Managing the Database:**
   - A database named `sample` is created or opened using the `indexedDB.open` method.
   - If the database needs to be upgraded (e.g., creating tables), the `onupgradeneeded` function is triggered to create an **Object Store** named `sample`.
   - The data is stored as objects containing email and password, and each record is assigned an auto-generated **primary key (id)**.

4. **Main Operations:**
   - **Add Data:** By clicking the `Submit` button, the entered email and password are stored in the IndexedDB.
   - **Display Data:** By clicking the `List of users` button, the stored data is fetched from IndexedDB and displayed in the HTML table.
   - **Delete Data:** Clicking the `Delete` button clears all the records from the database.

### Key Features:
1. **Storing users** in the browser database using IndexedDB.
2. **Displaying a list of users** in the HTML table based on the data stored in the database.
3. **Clearing the entire database** using the `Delete` button when needed.

### Benefits:
- Using IndexedDB allows users to store and retrieve data locally in the browser without needing an internet connection.
- This project is suitable for applications that require client-side data storage.

### Use Case:
This project can be part of a **user management application** within a browser. For example, it could be used in a **note-taking app** or **task management system** that requires local data storage.


