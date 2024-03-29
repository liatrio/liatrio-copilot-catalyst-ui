# SSL Certificate - Generation Guide

## Use this steps to generate your self signed SSL certificates if needed

Create a root certificate and private key to sign the certificates for your services-

Root: nonprod.exampleCompany.com

```bash
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -subj '/O=exampleCompany/CN=nonprod.exampleCompany.com' -keyout nonprod.exampleCompany.com.key -out nonprod.exampleCompany.com.crt

```

DEV:
your-application-name-dev.nonprod.exampleCompany.com

```bash

openssl req -out your-application-name-dev.nonprod.exampleCompany.com.csr -newkey rsa:2048 -nodes -keyout your-application-name-dev.nonprod.exampleCompany.com.key -subj "/CN=your-application-name-dev.nonprod.exampleCompany.com/O=exampleCompany organization"

openssl x509 -req -days 365 -CA nonprod.exampleCompany.com.crt -CAkey nonprod.exampleCompany.com.key -set_serial 0 -in your-application-name-dev.nonprod.exampleCompany.com.csr -out your-application-name-dev.nonprod.exampleCompany.com.crt

```

QA: your-application-name-qa.nonprod.exampleCompany.com

```bash
openssl req -out your-application-name-qa.nonprod.exampleCompany.com.csr -newkey rsa:2048 -nodes -keyout your-application-name-qa.nonprod.exampleCompany.com.key -subj "/CN=your-application-name-qa.nonprod.exampleCompany.com/O=exampleCompany organization"

openssl x509 -req -days 365 -CA nonprod.exampleCompany.com.crt -CAkey nonprod.exampleCompany.com.key -set_serial 0 -in your-application-name-qa.nonprod.exampleCompany.com.csr -out your-application-name-qa.nonprod.exampleCompany.com.crt

```

Prod: your-application-name.exampleCompany.com

```bash
openssl req -out your-application-name.exampleCompany.com.csr -newkey rsa:2048 -nodes -keyout your-application-name.exampleCompany.com.key -subj "/CN=your-application-name.exampleCompany.com/O=exampleCompany organization"

openssl x509 -req -days 365 -CA nonprod.exampleCompany.com.crt -CAkey nonprod.exampleCompany.com.key -set_serial 0 -in your-application-name.exampleCompany.com.csr -out your-application-name.exampleCompany.com.crt

```

## Put certificate key in vault.

