# youtube-node

A simple website for hosting your archived YouTube videos. This project is a rewrite of [`pocket-youtube`](https://github.com/peppermintpatty5/pocket-youtube/) in Node.js.

## Prerequisites

You will need the following software (ignore if you are using Docker):

- [Node.js](https://nodejs.org)
- [PostgreSQL](https://postgresql.org)

## Installation

1. Install the required Node.js packages and build the application.

   ```sh
   npm install
   npm run build
   ```

2. Create a file `.env` containing your PostgreSQL database credentials.

   ```sh
   DB_HOST="localhost"
   DB_USERNAME="username"
   DB_PASSWORD="password"
   DB_DATABASE="youtube"
   ```

3. Create a symbolic link to your video library.

   ```sh
   ln -s /path/to/video/library videos
   ```

4. Run the database initialization script. See [Video Indexing](#video-indexing) for details.

   ```sh
   npm run init_db
   ```

5. Finally, start the application.

   ```sh
   npm start
   ```

## Video Indexing

### Data Requirements

`youtube-dl` and its derivatives have several [options](https://github.com/ytdl-org/youtube-dl#options), two of which are important for archiving YouTube videos:

- `--write-info-json`
- `--write-thumbnail`

To use this application, you **must** have the `.info.json` metadata files.
Technically, everything else is optional. You do not need to have thumbnails or even the videos for this application to work correctly.

Your `videos/` directory may be structured however you wish, with one restriction. For each `.info.json` file, the corresponding video and thumbnail files must have the same directory name and file name (not including extension).

### Using `init_db`

The database initialization script `init_db` reads line-by-line from standard input. Each line shall be a path to a `.info.json` file. You can manually type in each path, or use something like [`find`](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/find.html) to output the paths automatically. Here is an example which will index every video in the `videos` directory.

```sh
find videos/ -type f -name "*.info.json" | npm run init_db
```

As of right now, there is no separate functionality to add or remove videos. Each invocation of `init_db` will completely replace the database contents. Therefore, it may be helpful to use a text file to gather all of your paths beforehand. Here is another example which indexes specific subdirectories.

```sh
for x in foo bar baz; do
    find videos/$x/ -type f -name "*.info.json"
done | npm run init_db
```

## Docker

```sh
docker compose up
```

Like before, the database must be initialized manually.

```sh
docker compose exec -T app npm run init_db
```
