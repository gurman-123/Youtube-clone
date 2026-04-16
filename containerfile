FROM amazonlinux:latest

RUN yum install -y httpd zip unzip && yum clean all

WORKDIR /var/www/html

COPY  ./code/* /var/www/html/ 

EXPOSE 80

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
