FROM postgres

COPY ./functions/*.sql /docker-entrypoint-initdb.d/
COPY ./schema/*.sql /docker-entrypoint-initdb.d/
COPY ./triggers/*.sql /docker-entrypoint-initdb.d/
# COPY ./migrations/*.sql /docker-entrypoint-initdb.d/
# COPY ./seed/*.sql /docker-entrypoint-initdb.d/
# COPY ./views/*.sql /docker-entrypoint-initdb.d/