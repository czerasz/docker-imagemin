# Docker Imagemin Image

## Usage

```
docker run -it \
           --rm \
           --name=optimize-images \
           --volumes-from=wordpress \
           --env=SRC_DIR=/var/www/html/wp-content/uploads/ \
           czerasz/imagemin bash
```
