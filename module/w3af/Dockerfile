FROM debian:stable

# Insttall deps
RUN apt update
RUN apt dist-upgrade -y
RUN apt install -y curl git unzip sudo python python-pip python-dev python libz-dev libxslt1-dev python-libxml2 libxml2-dev libssl-dev libyaml-dev libfontconfig
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt install -y nodejs npm
RUN apt autoremove
RUN git clone https://github.com/GibsonKao/Gryffin-with-W3AF.git app

# Install w3af
WORKDIR /app
RUN unzip w3af.zip
RUN chmod +x w3af_*
RUN ./w3af_console; true;
RUN /tmp/w3af_dependency_install.sh
RUN pip install pexpect selenium BeautifulSoup4
# missing profiles
COPY ./profiles /app/profiles
# accepted disclaimer
COPY ./startup.conf /root/.w3af/startup.conf

# Install phantomjs
RUN curl -sL https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 -o phantomjs-2.1.1-linux-x86_64.tar.bz2
RUN tar xvjf phantomjs-2.1.1-linux-x86_64.tar.bz2 -C /usr/local/share/
RUN ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/

COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["Meow"]