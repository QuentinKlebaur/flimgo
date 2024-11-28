FROM dpage/pgadmin4

COPY servers.json /pgadmin4/servers.json
USER root
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]