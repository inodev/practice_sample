FROM arm64v8/nginx:1.25.5

RUN mkdir -p /opt/app/tmp/sockets

RUN rm -f /etc/nginx/conf.d/*

ADD nginx.conf /etc/nginx/conf.d/app.conf

CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
