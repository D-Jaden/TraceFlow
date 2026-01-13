<h1 align="center">Running The Server</h1>
- cd server-api/ 

## BLOCKCHAIN AREA
# Stop all running containers (if any)
sudo docker stop $(sudo docker ps -aq) 2>/dev/null

# Remove all Docker packages
sudo apt-get purge -y docker-engine docker docker.io docker-ce docker-ce-cli docker-compose-plugin
sudo apt-get autoremove -y --purge docker-engine docker docker.io docker-ce docker-compose-plugin

# Remove old docker-compose (standalone binary)
sudo rm -f /usr/local/bin/docker-compose
sudo rm -f /usr/bin/docker-compose

# Remove Docker data directories
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
sudo rm -rf /etc/docker
sudo rm -rf ~/.docker

# Update package index
sudo apt-get update

# Install prerequisites
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index again
sudo apt-get update

# Install Docker Engine and Docker Compose plugin
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Check Docker version
docker --version

# Check Docker Compose version (modern plugin syntax)
docker compose version

# Test Docker
sudo docker run hello-world

# Stop Docker and containerd
sudo systemctl stop docker
sudo systemctl stop containerd

# Remove containerd's corrupted data
sudo rm -rf /var/lib/containerd

# Start services again
sudo systemctl start containerd
sudo systemctl start docker

# Verify services are running
sudo systemctl status docker
sudo systemctl status containerd

# Test basic Docker functionality
sudo docker run hello-world

# If that works, go to your test-network
cd ~/NEHU/Temp/fabric-samples/test-network

# Clean up any previous attempts
sudo ./network.sh down

# Start the network
sudo ./network.sh up

Then create the channel 

# sudo ./network.sh down (before creating channel)
