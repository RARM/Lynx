# Server Tests
This directory contains test scripts for the Lynx server. These are not all automated. Some require manual running.

- Uploading Games ([`uploading-games`](./uploading-games/)): This script uploads three games to the server. It will only properly work with the server version that doesn't authenticate users before creating a game.
- Server and Client Authentication API ([`auth`](./auth/)): Test whether the server is responding as expected to the client requests. This module also contains code used in the client. Important: You may want to use `python manage.py flush` to clear the server database everytime before using this test.