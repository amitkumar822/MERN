# API Documentation

This document provides an overview of the API endpoints available in the application, including their descriptions, status codes, and data requirements.

## Table of Contents

- [Banner Slider Routes](#banner-slider-routes)
- [Captcha Routes](#captcha-routes)
- [Google Authentication Routes](#google-authentication-routes)
- [Order Routes](#order-routes)
- [Product Routes](#product-routes)
- [Review Routes](#review-routes)
- [Sale Routes](#sale-routes)
- [User Routes](#user-routes)

---

## Banner Slider Routes

### POST /api/v1/banner-slider/upload

- **Description**: Upload a new banner image.
- **Status Codes**: 
  - `201`: Banner uploaded successfully.
  - `400`: Banner photo must be provided or invalid format.
- **Data Requirements**:
  - `bannerImg` (required): File (image/jpeg, image/png, image/webp)
  - `category` (required): String
- **Example Output**:
  - Success: 
    ```json
    {
      "status": 201,
      "message": "Banner uploaded successfully",
      "data": {
        "bannerImg": "url_to_image",
        "category": "example_category"
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "Banner photo must be provided or invalid format"
    }
    ```

### GET /api/v1/banner-slider/get-banner

- **Description**: Retrieve all banners.
- **Status Codes**: 
  - `200`: Get all banners.
  - `404`: No banners found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Get all banners",
      "data": [
        {
          "bannerImg": "url_to_image",
          "category": "example_category"
        }
      ]
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "No banners found"
    }
    ```

### DELETE /api/v1/banner-slider/delete/:bannerId

- **Description**: Delete a banner by ID.
- **Status Codes**: 
  - `200`: Banner deleted successfully.
  - `404`: Invalid Banner ID or not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Banner deleted successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Invalid Banner ID or not found"
    }
    ```

### GET /api/v1/banner-slider/get-banner-by-id/:bannerId

- **Description**: Retrieve a banner by ID.
- **Status Codes**: 
  - `200`: Banner fetched successfully.
  - `404`: Banner not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Banner fetched successfully",
      "data": {
        "bannerImg": "url_to_image",
        "category": "example_category"
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Banner not found"
    }
    ```

---

## Captcha Routes

### POST /api/v1/captcha/generate

- **Description**: Generate a CAPTCHA code and send it to the user's email.
- **Status Codes**: 
  - `201`: Captcha generated successfully.
  - `400`: Email must be required or not found.
- **Data Requirements**:
  - `email` (required): String
- **Example Output**:
  - Success:
    ```json
    {
      "status": 201,
      "message": "Captcha generated successfully",
      "data": {
        "email": "example@example.com",
        "captcha": "123456"
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "Email must be required or not found"
    }
    ```

### GET /api/v1/captcha/getcaptcha

- **Description**: Retrieve the latest CAPTCHA for a given email.
- **Status Codes**: 
  - `200`: All CAPTCHAs fetched successfully.
  - `404`: No CAPTCHA found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "All CAPTCHAs fetched successfully",
      "data": [
        {
          "email": "example@example.com",
          "captcha": "123456"
        }
      ]
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "No CAPTCHA found"
    }
    ```

---

## Google Authentication Routes

### GET /api/v1/auth/google

- **Description**: Initiate Google login.
- **Status Codes**: 
  - Redirects to Google login page.

### GET /api/v1/auth/google/callback

- **Description**: Handle Google login callback.
- **Status Codes**: 
  - `200`: Redirects to frontend on success.
  - `401`: User not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Redirects to frontend on success"
    }
    ```
  - Error:
    ```json
    {
      "status": 401,
      "message": "User not found"
    }
    ```

### GET /api/v1/auth/current-user

- **Description**: Check the current logged-in user.
- **Status Codes**: 
  - `200`: Returns user data or null.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "User data retrieved",
      "data": {
        "user": {
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 200,
      "message": "No user logged in",
      "data": null
    }
    ```

---

## Order Routes

### POST /api/v1/order/create-online-pay

- **Description**: Create a new order using RazorPay.
- **Status Codes**: 
  - `200`: Order created on RazorPay.
  - `400`: All fields are required.
- **Data Requirements**:
  - `productId` (required): Array of ObjectId
  - `quantity` (required): Array of Number
  - `amount` (required): Number
  - `userId` (required): ObjectId
  - `mobile` (required): String
  - `country` (required): String
  - `state` (required): String
  - `city` (required): String
  - `pincode` (required): String
  - `address` (required): String
  - `email` (required): String
  - `name` (required): String
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Order created on RazorPay",
      "data": {
        "order_id": "order_123456",
        "amount": 1000
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "All fields are required"
    }
    ```

### POST /api/v1/order/create-cod-pay

- **Description**: Create a new order using Cash on Delivery (COD).
- **Status Codes**: 
  - `200`: Order created on COD.
  - `400`: All fields are required.
- **Data Requirements**:
  - `productId` (required): Array of ObjectId
  - `quantity` (required): Array of Number
  - `amount` (required): Number
  - `userId` (required): ObjectId
  - `mobile` (required): String
  - `country` (required): String
  - `state` (required): String
  - `city` (required): String
  - `pincode` (required): String
  - `address` (required): String
  - `email` (required): String
  - `name` (required): String
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Order created on COD",
      "data": {
        "order_id": "order_123456",
        "amount": 1000
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "All fields are required"
    }
    ```

- **Description**: Create a new order.
- **Status Codes**: 
  - `200`: Order created on RazorPay.
  - `400`: All fields are required.
- **Data Requirements**:
  - `productId` (required): Array of ObjectId
  - `quantity` (required): Array of Number
  - `amount` (required): Number
  - `userId` (required): ObjectId
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Order created on RazorPay",
      "data": {
        "order_id": "order_123456",
        "amount": 1000
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "All fields are required"
    }
    ```

### POST /api/v1/order/payment-verification

- **Description**: Verify payment.
- **Status Codes**: 
  - Redirects to success or failed page based on verification.

### GET /api/v1/order/razorpay-key

- **Description**: Retrieve Razorpay key.
- **Status Codes**: 
  - `200`: Success get Razor Pay key.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Success get Razor Pay key",
      "data": {
        "key": "rzp_test_123456"
      }
    }
    ```

### POST /api/v1/order/cancel-order

- **Description**: Cancel an order.
- **Status Codes**: 
  - `200`: Order successfully canceled and refunded.
  - `400`: Order ID is required or already refunded.
- **Data Requirements**:
  - `orderId` (required): String
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Order successfully canceled and refunded"
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "Order ID is required or already refunded"
    }
    ```

### GET /api/v1/order/get-all-confirmed-order

- **Description**: Retrieve all confirmed orders for a user.
- **Status Codes**: 
  - `200`: Order get successfully.
  - `404`: Order not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Order get successfully",
      "data": [
        {
          "order_id": "order_123456",
          "amount": 1000
        }
      ]
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Order not found"
    }
    ```

### GET /api/v1/order/get-admin-all-order

- **Description**: Retrieve all orders for admin.
- **Status Codes**: 
  - `200`: Order get successfully.
  - `404`: Order not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Order get successfully",
      "data": [
        {
          "order_id": "order_123456",
          "amount": 1000
        }
      ]
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Order not found"
    }
    ```

### POST /api/v1/order/update-status

- **Description**: Update order status.
- **Status Codes**: 
  - `200`: Order status updated successfully.
  - `404`: Invalid Order ID or not found.
- **Data Requirements**:
  - `orderId` (required): String
  - `status` (required): String
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Order status updated successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Invalid Order ID or not found"
    }
    ```

---

## Product Routes

### POST /api/v1/product/upload

- **Description**: Upload a new product.
- **Status Codes**: 
  - `201`: Product created successfully.
  - `400`: Product photos must be provided or invalid format.
- **Data Requirements**:
  - `productName` (required): String
  - `description`: String
  - `price` (required): Number
  - `sellingPrice` (required): Number
  - `brand` (required): String
  - `category` (required): String
  - `productImage` (required): Array of Objects with `public_id` and `url`
  - `quantity` (required): Number
- **Example Output**:
  - Success:
    ```json
    {
      "status": 201,
      "message": "Product created successfully",
      "data": {
        "productName": "Example Product",
        "price": 1000,
        "sellingPrice": 900
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "Product photos must be provided or invalid format"
    }
    ```

### DELETE /api/v1/product/delete/:id

- **Description**: Delete a product by ID.
- **Status Codes**: 
  - `200`: Product deleted successfully.
  - `404`: Invalid Product ID or not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Product deleted successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Invalid Product ID or not found"
    }
    ```

### GET /api/v1/product/get-products

- **Description**: Retrieve all products.
- **Status Codes**: 
  - `200`: Products retrieved successfully.
  - `404`: No products found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Products retrieved successfully",
      "data": [
        {
          "productName": "Example Product",
          "price": 1000,
          "sellingPrice": 900
        }
      ]
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "No products found"
    }
    ```

### POST /api/v1/product/update/:id

- **Description**: Update a product by ID.
- **Status Codes**: 
  - `200`: Product updated successfully.
  - `404`: Invalid Product ID or not found.
- **Data Requirements**:
  - `productName` (required): String
  - `description`: String
  - `price` (required): Number
  - `sellingPrice` (required): Number
  - `brand` (required): String
  - `category` (required): String
  - `productImage` (required): Array of Objects with `public_id` and `url`
  - `quantity` (required): Number
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Product updated successfully",
      "data": {
        "productName": "Updated Product",
        "price": 1100,
        "sellingPrice": 1000
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Invalid Product ID or not found"
    }
    ```

### DELETE /api/v1/product/delete-product-img/:productId/image/:publicId

- **Description**: Delete a product image from Cloudinary.
- **Status Codes**: 
  - `200`: Image deleted and product updated successfully.
  - `404`: Product not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Image deleted and product updated successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Product not found"
    }
    ```

### GET /api/v1/product/getproduct-details-byid/:productId

- **Description**: Retrieve product details by ID.
- **Status Codes**: 
  - `200`: Product details retrieved successfully.
  - `404`: Product not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Product details retrieved successfully",
      "data": {
        "productName": "Example Product",
        "price": 1000,
        "sellingPrice": 900
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Product not found"
    }
    ```

### GET /api/v1/product/search

- **Description**: Search for products.
- **Status Codes**: 
  - `200`: Products search successfully.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Products search successfully",
      "data": [
        {
          "productName": "Example Product",
          "price": 1000,
          "sellingPrice": 900
        }
      ]
    }
    ```

### POST /api/v1/product/filter

- **Description**: Filter products by category, price, stock, and discount.
- **Status Codes**: 
  - `200`: Products filter successfully.
  - `404`: No products found for these categories.
- **Data Requirements**:
  - `category`: String
  - `price`: Number
  - `stock`: Number
  - `discount`: Number
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Products filter successfully",
      "data": [
        {
          "productName": "Filtered Product",
          "price": 800,
          "sellingPrice": 700
        }
      ]
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "No products found for these categories"
    }
    ```

### POST /api/v1/product/like/:productId

- **Description**: Like or unlike a product.
- **Status Codes**: 
  - `200`: Product liked or like removed successfully.
  - `404`: Product not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Product liked or like removed successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Product not found"
    }
    ```

### GET /api/v1/product/get-best-selling-all-product

- **Description**: Retrieve all best-selling products.
- **Status Codes**: 
  - `200`: Products retrieved successfully.
  - `404`: No products found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Products retrieved successfully",
      "data": [
        {
          "productName": "Best Selling Product",
          "price": 1200,
          "sellingPrice": 1100
        }
      ]
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "No products found"
    }
    ```

### DELETE /api/v1/product/delete-image-cloudinary/:publicId

- **Description**: Delete an image from Cloudinary.
- **Status Codes**: 
  - `200`: Image deleted successfully.
  - `400`: Failed to delete image from Cloudinary.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Image deleted successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "Failed to delete image from Cloudinary"
    }
    ```

---

## Review Routes

### POST /api/v1/review/write-reviews/:productId

- **Description**: Write a review for a product.
- **Status Codes**: 
  - `201`: Review written successfully.
  - `400`: Invalid ProductId or rating.
- **Data Requirements**:
  - `rating` (required): Number
  - `review` (required): String
  - `photo`: Object with `public_id` and `url`
- **Example Output**:
  - Success:
    ```json
    {
      "status": 201,
      "message": "Review written successfully",
      "data": {
        "rating": 5,
        "review": "Great product!"
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "Invalid ProductId or rating"
    }
    ```

### GET /api/v1/review/get-review/:productId

- **Description**: Retrieve all reviews for a product.
- **Status Codes**: 
  - `200`: Review details retrieved.
  - `404`: Reviews not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Review details retrieved",
      "data": [
        {
          "rating": 5,
          "review": "Great product!"
        }
      ]
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Reviews not found"
    }
    ```

### POST /api/v1/review/likes/:reviewId

- **Description**: Like or unlike a review.
- **Status Codes**: 
  - `200`: Like added or removed successfully.
  - `404`: Review not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Like added or removed successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Review not found"
    }
    ```

### POST /api/v1/review/dislikes/:reviewId

- **Description**: Dislike or remove dislike from a review.
- **Status Codes**: 
  - `200`: Dislike added or removed successfully.
  - `404`: Review not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Dislike added or removed successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Review not found"
    }
    ```

### PUT /api/v1/review/update/:reviewId

- **Description**: Update a review.
- **Status Codes**: 
  - `200`: Review updated successfully.
  - `404`: Review not found.
- **Data Requirements**:
  - `rating` (required): Number
  - `review` (required): String
  - `photo`: Object with `public_id` and `url`
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Review updated successfully",
      "data": {
        "rating": 4,
        "review": "Updated review"
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Review not found"
    }
    ```

### GET /api/v1/review/get-single-review/:reviewId

- **Description**: Retrieve a single review by ID.
- **Status Codes**: 
  - `200`: Review details retrieved.
  - `404`: Review not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Review details retrieved",
      "data": {
        "rating": 5,
        "review": "Great product!"
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Review not found"
    }
    ```

### DELETE /api/v1/review/delete/:reviewId

- **Description**: Delete a review by ID.
- **Status Codes**: 
  - `200`: Review deleted successfully.
  - `404`: Review not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Review deleted successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Review not found"
    }
    ```

---

## Sale Routes

### GET /api/v1/sale/sale-timer

- **Description**: Retrieve the remaining time for the sale.
- **Status Codes**: 
  - `200`: Sale timer retrieved.
  - `200`: Sale has ended.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Sale timer retrieved",
      "data": {
        "timeRemaining": "2 hours"
      }
    }
    ```
  - Sale Ended:
    ```json
    {
      "status": 200,
      "message": "Sale has ended"
    }
    ```

---

## User Routes

### POST /api/v1/user/register

- **Description**: Register a new user.
- **Status Codes**: 
  - `201`: User created successfully.
  - `400`: User photo must be required or invalid format.
- **Data Requirements**:
  - `name` (required): String
  - `email` (required): String
  - `password` (required): String
  - `avatar`: Object with `public_id` and `url`
- **Example Output**:
  - Success:
    ```json
    {
      "status": 201,
      "message": "User created successfully",
      "data": {
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "User photo must be required or invalid format"
    }
    ```

### POST /api/v1/user/login

- **Description**: Log in a user.
- **Status Codes**: 
  - `201`: User login successfully.
  - `400`: All fields must be required or password wrong.
- **Data Requirements**:
  - `email` (required): String
  - `password` (required): String
- **Example Output**:
  - Success:
    ```json
    {
      "status": 201,
      "message": "User login successfully",
      "data": {
        "token": "jwt_token"
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "All fields must be required or password wrong"
    }
    ```

### POST /api/v1/user/logout

- **Description**: Log out a user.
- **Status Codes**: 
  - `200`: User logged out successfully.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "User logged out successfully"
    }
    ```

### GET /api/v1/user/get-user-details

- **Description**: Retrieve details of the logged-in user.
- **Status Codes**: 
  - `200`: User details retrieved.
  - `404`: User not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "User details retrieved",
      "data": {
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "User not found"
    }
    ```

### GET /api/v1/user/get-all-users

- **Description**: Retrieve all users.
- **Status Codes**: 
  - `200`: Get all users.
  - `404`: No users found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Get all users",
      "data": [
        {
          "name": "John Doe",
          "email": "john@example.com"
        }
      ]
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "No users found"
    }
    ```

### POST /api/v1/user/update-user-details/:id

- **Description**: Update user details.
- **Status Codes**: 
  - `200`: User updated successfully.
  - `404`: Invalid User ID or not found.
- **Data Requirements**:
  - `name` (required): String
  - `email` (required): String
  - `password`: String
  - `avatar`: Object with `public_id` and `url`
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "User updated successfully",
      "data": {
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Invalid User ID or not found"
    }
    ```

### DELETE /api/v1/user/delete-user/:id

- **Description**: Delete a user by ID.
- **Status Codes**: 
  - `200`: User deleted successfully.
  - `404`: Invalid User ID or not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "User deleted successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Invalid User ID or not found"
    }
    ```

### POST /api/v1/user/addtocart

- **Description**: Add a product to the cart.
- **Status Codes**: 
  - `201`: Product added to cart successfully.
  - `400`: Invalid ProductId or already in cart.
- **Data Requirements**:
  - `productId` (required): ObjectId
  - `quantity` (required): Number
- **Example Output**:
  - Success:
    ```json
    {
      "status": 201,
      "message": "Product added to cart successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "Invalid ProductId or already in cart"
    }
    ```

### GET /api/v1/user/getaddtocart

- **Description**: Retrieve the count of products in the cart.
- **Status Codes**: 
  - `200`: Total products in cart.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Total products in cart",
      "data": {
        "count": 5
      }
    }
    ```

### GET /api/v1/user/view-addtocart

- **Description**: View products in the cart.
- **Status Codes**: 
  - `200`: Product details retrieved.
  - `404`: Product not found.
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Product details retrieved",
      "data": [
        {
          "productId": "product_123456",
          "quantity": 2
        }
      ]
    }
    ```
  - Error:
    ```json
    {
      "status": 404,
      "message": "Product not found"
    }
    ```

### POST /api/v1/user/update-addtocart

- **Description**: Update the quantity of a product in the cart.
- **Status Codes**: 
  - `200`: Product update success.
  - `400`: Product Id must be required.
- **Data Requirements**:
  - `productId` (required): ObjectId
  - `quantity` (required): Number
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Product update success"
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "Product Id must be required"
    }
    ```

### POST /api/v1/user/delete-addtocart

- **Description**: Delete a product from the cart.
- **Status Codes**: 
  - `200`: Product delete successfully.
  - `400`: Product delete failed.
- **Data Requirements**:
  - `productId` (required): ObjectId
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Product delete successfully"
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "Product delete failed"
    }
    ```

### POST /api/v1/user/forgotPassword

- **Description**: Reset password using CAPTCHA.
- **Status Codes**: 
  - `200`: Password successfully changed.
  - `400`: Invalid Captcha or email not found.
- **Data Requirements**:
  - `email` (required): String
  - `captcha` (required): String
  - `newPassword` (required): String
- **Example Output**:
  - Success:
    ```json
    {
      "status": 200,
      "message": "Password successfully changed"
    }
    ```
  - Error:
    ```json
    {
      "status": 400,
      "message": "Invalid Captcha or email not found"
    }
    ```

---

## Models

### AddToCart Model

- **Fields**:
  - `productId` (required): ObjectId
  - `quantity` (required): Number, min 1
  - `userId` (required): ObjectId

### BannerSlider Model

- **Fields**:
  - `category` (required): String
  - `bannerImg` (required): Object with `public_id` and `url`
  - `owner`: ObjectId

### Captcha Model

- **Fields**:
  - `email` (required): String
  - `code` (required): String
  - `expiresAt` (required): Date

### Order Model

- **Fields**:
  - `productId` (required): Array of ObjectId
  - `quantity` (required): Array of Number
  - `amount` (required): Number
  - `order_id`: String
  - `razorpay_payment_id`: String
  - `status`: String, enum
  - `userId` (required): ObjectId

### Product Model

- **Fields**:
  - `productName` (required): String
  - `description`: String
  - `price` (required): Number
  - `sellingPrice` (required): Number
  - `brand` (required): String
  - `category` (required): String
  - `productImage` (required): Array of Objects with `public_id` and `url`
  - `quantity` (required): Number
  - `owner` (required): ObjectId

### Review Model

- **Fields**:
  - `rating` (required): Number
  - `review` (required): String
  - `photo`: Object with `public_id` and `url`
  - `productId` (required): ObjectId
  - `userId` (required): ObjectId
  - `likes`: Array of ObjectId
  - `dislikes`: Array of ObjectId

### User Model

- **Fields**:
  - `name` (required): String
  - `mobile`: String
  - `country`: String
  - `state`: String
  - `city`: String
  - `pincode`: String
  - `address`: String
  - `dob`: String
  - `email` (required): String, unique
  - `password`: String, select false
  - `avatar`: Object with `public_id` and `url`
  - `token`: String
  - `refreshToken`: String
  - `role`: String, enum
  - `googleId`: String, unique

---

## Controllers

Controllers handle the business logic for each route. They interact with the models to perform CRUD operations and return responses to the client.

- **BannerSlider Controller**: Handles banner upload, retrieval, and deletion.
- **Captcha Controller**: Manages CAPTCHA generation and retrieval.
- **Google Controller**: Manages Google authentication and user retrieval.
- **Order Controller**: Handles order creation, payment verification, and status updates.
- **Product Controller**: Manages product upload, retrieval, update, and deletion.
- **Review Controller**: Handles review creation, retrieval, update, and deletion.
- **Sale Controller**: Manages sale timer retrieval.
- **User Controller**: Handles user registration, login, logout, and profile management.

---

## Usage

To use the API, send HTTP requests to the endpoints listed above. Ensure that you provide the required data in the request body or query parameters as specified. Use appropriate HTTP methods (GET, POST, PUT, DELETE) for each endpoint.

Example request to create a new product:

