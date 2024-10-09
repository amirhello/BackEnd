# **Product Management API**

## **Description**
This project is a simple Product Management API built with Node.js, Express.js, and Joi for validation. It enables users to manage products by adding, deleting, and listing them. Each product has attributes such as price, title, name, and count, which are validated using Joi. The product data is stored in a JSON file, and the API allows for easy updates through HTTP requests.


![{742052A8-B7D4-4993-9B8E-5C8C347881DD}](https://github.com/user-attachments/assets/6bf96dbd-4fc7-496a-9496-7b43b5b4fdfa)

---


## **Features**
- **Create a new product:** Adds a product to the JSON database via a POST request.
- **Fetch products:** Retrieves a list of all available products via a GET request.
- **Delete a product:** Deletes a product from the JSON file via a DELETE request.
- **Field validation:** Ensures that product fields such as `price`, `title`, `name`, and `count` meet validation criteria using Joi.
- **File-based storage:** Stores product data in a local JSON file, which can be modified via the API.

## **Technologies Used**
- **Node.js:** For the server-side environment.
- **Express.js:** To create the server and handle HTTP requests.
- **Joi:** For validating incoming data.
- **File System (fs):** To read and write product data to a JSON file.

## **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/product-management-api.git
   ```

2. Navigate into the project directory:
   ```bash
   cd product-management-api
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm run start
   ```

5. The server will run on `http://localhost:3500`.

## **API Endpoints**
- **POST /products:** Add a new product.
- **GET /products:** Retrieve a list of all products.
- **DELETE /products/:id:** Delete a product by its ID.

## **Example POST Request**
```json
POST /products
{
  "price": 50,
  "title": "New Product",
  "name": "Gadget",
  "count": 10
}
```

## **Validation Rules**
- `price`: Must be a number between 1 and 100,000.
- `title`: Must be a string and required.
- `name`: Must be a string and required.
- `count`: Must be a number between 1 and 200.

## **License**
This project is licensed under the MIT License.

---

