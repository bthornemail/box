You can host a Single Page Application (SPA) with BusyBox httpd, its built-in lightweight web server. [1] (https://www.hobrasoft.cz/en/blog/bravenec/2014-03-09), [2] (https://blog.clairemedeiros.com/howto-serve-up-web-content-in-2-seconds-using-busybox)
Because httpd lacks native URL rewriting (like Nginx's try_files), serving an SPA requires handling client-side routes properly.

1. Basic Setup

Place your compiled SPA build files (such as index.html, JS bundles, and CSS) into a directory (e.g., /var/www), then start the server: [1] (https://blog.clairemedeiros.com/howto-serve-up-web-content-in-2-seconds-using-busybox)
sh
busybox httpd -f -p 8080 -h /var/www
Use code with caution.
• -f keeps the server running in the foreground (useful for Docker containers or systemd services).
• -p 8080 binds to port 8080 (defaults to port 80).
• -h /var/www sets the web root directory. [1] (https://oldforum.puppylinux.com/viewtopic.php?t=117681), [2] (https://stackoverflow.com/questions/75819172/how-to-start-a-httpd-inside-a-docker-busybox-in-a-single-line), [3] (https://blog.clairemedeiros.com/howto-serve-up-web-content-in-2-seconds-using-busybox), [4] (https://frippery.org/busybox/httpd.html), [5] (https://forum.fs-net.de/index.php?thread/4421-example-usage-of-busybox-httpd-webserver/)

2. Handling SPA Routing

SPAs rely on client-side routing. If a user refreshes the page on a deep route like /dashboard, BusyBox will look for /var/www/dashboard and fail unless you use one of two approaches:
• Hash Routing (Easiest). Configure your frontend router (React Router, Vue Router, etc.) to use hash mode (e.g., /#/dashboard). The browser only requests / from BusyBox, avoiding server-side 404s completely.
• 404 Fallback Trick (History Mode). If you use clean URLs (/dashboard), configure BusyBox to serve index.html whenever a route isn't found. Create a /etc/httpd.conf file containing:text
E404:index.html
Use code with caution.
Then launch httpd pointing to that config:sh
busybox httpd -f -p 8080 -h /var/www -c /etc/httpd.conf
Use code with caution.
(Note: BusyBox will still return an HTTP 404 status code in the network headers, though the browser will render index.html and load your SPA normally). [1] (http://wiki.chumby.com/index.php?title=Using_the_busybox_HTTP_server), [2] (https://oldforum.puppylinux.com/viewtopic.php?t=117681)

3. Adding a Lightweight API (Optional)

If your SPA needs to talk to the host system (common in embedded Linux or IoT dashboards), httpd supports CGI scripts out of the box: [1] (https://stackoverflow.com/questions/69745596/is-there-a-way-to-get-httpd-to-serve-a-simple-string), [2] (http://wiki.chumby.com/index.php?title=Using_the_busybox_HTTP_server)
1. Create a cgi-bin folder inside your web root (/var/www/cgi-bin).
2. Add an executable shell script (e.g., status.sh with chmod +x):sh
#!/bin/sh
printf "Content-Type: application/json\r\n\r\n"
printf '{"uptime": "%s"}\n' "$(uptime)"
Use code with caution.
3. Fetch /cgi-bin/status.sh directly from your SPA frontend. [1] (https://stackoverflow.com/questions/69745596/is-there-a-way-to-get-httpd-to-serve-a-simple-string), [2] (http://wiki.chumby.com/index.php?title=Using_the_busybox_HTTP_server)

4. Minimal Docker Example

If you are packaging your SPA into a tiny container image using the BusyBox Docker Official Image, your Dockerfile only needs a few lines:
dockerfile
FROM busybox:latest
COPY ./dist /var/www
COPY ./httpd.conf /etc/httpd.conf
EXPOSE 8080
CMD ["busybox", "httpd", "-f", "-v", "-p", "8080", "-h", "/var/www", "-c", "/etc/httpd.conf"]
Use code with caution.
Are you deploying this inside a Docker container or on an embedded Linux device? If you share your frontend framework (React, Vue, etc.), I can give you the exact router and build config.
