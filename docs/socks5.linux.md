Configuring a SOCKS5 proxy on Linux depends on whether you are connecting to an existing proxy as a client or setting up your own server.

1. Client Configuration (Connecting to a Proxy)


Option A: Terminal Environment Variables (Temporary)

For command-line tools (curl, wget, pip, etc.) that respect standard proxy variables, export them in your terminal session. Use socks5h:// instead of socks5:// if you want DNS resolution handled by the proxy to prevent DNS leaks. [1] (https://askubuntu.com/questions/610333/how-to-set-socks5-proxy-in-the-terminal)
bash
export http_proxy="socks5h://127.0.0.1:1080"
export https_proxy="socks5h://127.0.0.1:1080"
export all_proxy="socks5h://127.0.0.1:1080"
Use code with caution.
(If authentication is required, format the URL as socks5h://username:password@host:port). [1] (https://www.reddit.com/r/linuxquestions/comments/1c6km8s/how_to_use_socks5_proxy_in_linux/)

Option B: Force Specific Apps with proxychains

Many Linux applications ignore environment variables. Install proxychains (or proxychains-ng) to force any TCP application through the proxy: [1] (https://www.reddit.com/r/linuxquestions/comments/1c6km8s/how_to_use_socks5_proxy_in_linux/)
1. Open the configuration file: sudo nano /etc/proxychains.conf (or /etc/proxychains4.conf).
2. Scroll to the bottom [ProxyList] section, comment out existing lines, and add your proxy:text
socks5 127.0.0.1 1080
Use code with caution.
(For authentication, add credentials after the port: socks5 127.0.0.1 1080 user pass)
3. Run your program prefixed with proxychains:bash
proxychains curl https://ifconfig.me
Use code with caution.

Option C: Desktop GUI (GNOME / KDE)

• GNOME (Ubuntu, Fedora): Go to Settings > Network > Network Proxy, select Manual, and enter your host and port in the Socks Host field.
• KDE Plasma: Go to System Settings > Network > Settings > Proxy, select Use manually specified proxy configuration, and fill in the SOCKS proxy line.

2. Server Configuration (Hosting a SOCKS5 Proxy)


Option A: Instant SOCKS5 Tunnel via SSH (Recommended for Personal Use)

If you already have SSH access to a remote Linux machine, you do not need to install extra server software. Run this on your local machine to open a local SOCKS5 proxy on port 1080 that tunnels through the remote server: [1] (https://ma.ttias.be/socks-proxy-linux-ssh-bypass-content-filters/), [2] (https://www.youtube.com/watch?v=RCWdC_PTHTQ&t=265), [3] (https://catonmat.net/linux-socks5-proxy)
bash
ssh -D 1080 -f -C -q -N user@your-remote-server.com
Use code with caution.
• -D 1080: Opens a local SOCKS5 listener on port 1080.
• -f -N: Runs the tunnel silently in the background without opening a remote shell. [1] (https://www.youtube.com/watch?v=RCWdC_PTHTQ&t=265), [2] (https://catonmat.net/linux-socks5-proxy)

Option B: Dedicated Server with Dante (danted)

To host a permanent, multi-user SOCKS5 server on Ubuntu/Debian: [1] (https://github.com/saaiful/socks5), [2] (https://vps.one/blog/how-to-set-up-a-socks5-proxy-on-a-vps)
1. Install Dante:bash
sudo apt update && sudo apt install dante-server -y
Use code with caution.
2. Find your network interface (e.g., eth0 or ens3):bash
ip route | grep default
Use code with caution.
3. Configure /etc/danted.conf: Back up the original file and replace its contents with the following (adjust eth0 to match your interface):text
logoutput: syslog
user.privileged: root
user.unprivileged: nobody

# Listen on port 1080 on all interfaces
internal: 0.0.0.0 port=1080
external: eth0

# Use Linux system usernames/passwords for authentication
socksmethod: username
clientmethod: none

client pass {
    from: 0.0.0.0/0 to: 0.0.0.0/0
}

socks pass {
    from: 0.0.0.0/0 to: 0.0.0.0/0
}
Use code with caution.
4. Create a proxy user and restart the service:bash
sudo useradd -r -s /bin/false proxyuser
sudo passwd proxyuser
sudo systemctl restart danted
sudo systemctl enable danted
Use code with caution.
(Ensure port 1080/tcp is allowed in your firewall, such as sudo ufw allow 1080/tcp). [1] (https://vps.one/blog/how-to-set-up-a-socks5-proxy-on-a-vps)

3. Verify the Connection

Test your setup using curl to confirm your outbound IP matches the proxy server: [1] (https://github.com/saaiful/socks5)
bash
curl -x socks5h://127.0.0.1:1080 https://ifconfig.me
Use code with caution.
If you'd like more tailored steps, let me know:
• Whether you are setting up a client or a server
• Your Linux distribution (e.g., Ubuntu, Arch, RHEL)
• Any specific application (like Docker, Git, or system-wide transparent routing) you want to route through the proxy
