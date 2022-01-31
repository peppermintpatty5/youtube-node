# youtube-node

A simple website for hosting your archived YouTube videos. This project is a rewrite of [`pocket-youtube`](https://github.com/peppermintpatty5/pocket-youtube/) in Node.js.

## Installation

1. Install the required Node.js packages and build the project.

    ```sh
    npm install
    npm run build
    ```

2. Create a file `.env` which contains your MySQL database credentials.

    ```sh
    DB_HOST="localhost"
    DB_USERNAME="username"
    DB_PASSWORD="password"
    DB_DATABASE="youtube"
    ```

3. Create a symbolic link to your video library.

    ```sh
    ln --symbolic /path/to/video/library videos
    ```

4. Run the database initialization script.

    ```sh
    npm run init_db -- videos
    ```

5. Start the application.

    ```sh
    npm start
    ```
