FROM node

# Install required modules
COPY package.json npm-shrinkwrap.json /usr/src/app/
RUN npm install && npm cache clean

# Copy optimization script
COPY optimize-images.js /usr/local/bin/optimize-images

# Execute optimize-images by default
CMD ["/usr/local/bin/optimize-images"]
