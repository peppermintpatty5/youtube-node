# youtube-node

A simple website for hosting your archived YouTube videos.

## Prerequisites

## Installation

## Video Indexing

### Data Requirements

`youtube-dl` and its derivatives have several [options](https://github.com/ytdl-org/youtube-dl#options), two of which are important for archiving YouTube videos:

- `--write-info-json`
- `--write-thumbnail`

To use this application, you **must** have the `.info.json` metadata files.
Technically, everything else is optional.
You do not need to have thumbnails or even the videos for this application to work correctly.

Your `videos/` directory may be structured however you wish, with one restriction.
For each `.info.json` file, the corresponding video and thumbnail files must have the same directory name and file name (not including extension).

## Docker
