# youtube-node

A simple website for hosting your archived YouTube videos. This project is a rewrite of [`pocket-youtube`](https://github.com/peppermintpatty5/pocket-youtube/) in Node.js.

## Installation

1. Install the required Node.js packages.

    ```sh
    npm install
    ```

2. Create a file `.env` which contains your SQL database URI.

    ```sh
    DB_URI="mysql://username:password@localhost/youtube"
    ```

3. Create a symbolic link to your video library.

    ```sh
    ln --symbolic /path/to/video/library videos
    ```

4. Run the script [`populate_db.js`](scripts/populate_db.js) to populate the database.

   ```sh
    ./scripts/populate_db.js videos
    ```

5. Start the application.

    ```sh
    npm start
    ```
