The server must perform the following tasks to run Django in a container.
1. It must compress the server folder into a tar file.
2. It must create a new image using the Dockerfile. (If containers are running, the server must delete them and their source images too.) As a suggestion, tag the image with something like "lynx-image."
3. It must run the image in the background and expose port 8000 to a (preferably) set location in the host machine. It will make it easier to keep the same Apache2 configuration file.

If a separate database exists, perform additional steps to enable containerized database.

```sh
sudo -u www-data git pull
sudo -u www-data docker rm lynx
sudo -u www-data docker rmi lynx-image
sudo -u www-data rm server.tar
sudo -u www-data tar -cf server.tar server/*
sudo -u www-data docker build --tag lynx-image .
sudo -u www-data docker run -d -p 62080:8000 --name lynx lynx-image
```