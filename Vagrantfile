Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
  config.vm.hostname = "router-test"

  # Forward ports
  config.vm.network "forwarded_port", guest: 3000, host: 3000  # Backend API
  config.vm.network "forwarded_port", guest: 4200, host: 4200  # Frontend

  # VM resources
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end

  # Provision
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update

    # Install Node.js
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs

    # Install network tools
    apt-get install -y \
      iproute2 \
      iptables \
      dnsmasq \
      net-tools \
      ifstat

    # Copy project files
    mkdir -p /home/vagrant/router-app
    cp -r /vagrant/* /home/vagrant/router-app/
    chown -R vagrant:vagrant /home/vagrant/router-app

    # Install dependencies
    cd /home/vagrant/router-app/backend && sudo -u vagrant npm install
    cd /home/vagrant/router-app/frontend && sudo -u vagrant npm install

    echo "Setup complete! SSH in and run:"
    echo "  cd router-app && ./start-dev.sh"
  SHELL
end
