The server must perform the following tasks to run Django in a container.
1. It must compress the server folder into a tar file.
2. It must create a new image using the Dockerfile. (If containers are running, the server must delete them and their source images too.) As a suggestion, tag the image with something like "lynx-image."
3. It must run the image in the background and expose port 8000 to a (preferably) set location in the host machine. It will make it easier to keep the same Apache2 configuration file.

If a separate database exists, perform additional steps to enable containerized database.