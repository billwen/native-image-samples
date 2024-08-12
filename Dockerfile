
#
# Base image
#
FROM ubuntu:latest AS base
LABEL authors="billwen"

RUN apt-get update  \
    && apt install -y ca-certificates curl gnupg \
    # && mkdir -p /node20 \
    # && cd /node20 \
    # && curl -fsSL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh \
    # && bash nodesource_setup.sh \
    && apt install -y nodejs npm libnode-dev \
    # && cd .. \
    # && rm -fr node20 \
    && apt-get install -y libfftw3-dev \
    libopenexr-dev \
    libgsf-1-dev \
    libglib2.0-dev \
    liborc-dev \
    libopenslide-dev \
    libmatio-dev \
    libwebp-dev \
    libjpeg-turbo8-dev \
    libexpat1-dev \
    libexif-dev \
    libtiff5-dev \
    libcfitsio-dev \
    libpoppler-glib-dev \
    librsvg2-dev \
    libpango1.0-dev \
    libopenjp2-7-dev \
    liblcms2-dev \
    libimagequant-dev \
    && apt-get install -y libvips libvips-tools libvips-dev

#
# Build image
#
FROM base AS builder

WORKDIR /app
RUN node -v
RUN npm -v
COPY . .
RUN npm install && npm run build
CMD [ "node", "./dist/app.js" ]


