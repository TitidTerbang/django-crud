# User Management System

This project is a User Management System built with Python, JavaScript, React, and Django. It allows users to create, edit, and delete user information.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend

1. Clone the repository:
    ```sh
    git clone https://github.com/TitidTerbang/django-crud.git
    cd django-crud
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Run the Django server:
    ```sh
    python manage.py migrate
    python manage.py runserver
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd djangofront
    ```

2. Install the required packages:
    ```sh
    npm install
    ```

3. Start the React development server:
    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. Use the interface to add, edit, or delete users.

## API Endpoints

- `GET /api/users/` - Retrieve a list of users.
- `POST /api/users/create/` - Create a new user.
- `PUT /api/users/{id}/` - Update an existing user.
- `DELETE /api/users/{id}/` - Delete a user.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.