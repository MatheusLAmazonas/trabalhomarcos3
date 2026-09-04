#!/bin/bash
set -e

echo "Atualizando sistema..."
sudo apt update
sudo apt upgrade -y

echo "Instalando Docker..."
sudo apt install -y docker.io

echo "Habilitando Docker..."
sudo systemctl enable docker
sudo systemctl start docker

echo "Adicionando usuário atual ao grupo docker..."
sudo usermod -aG docker "$USER"

echo ""
echo "Docker instalado."
echo "IMPORTANTE: saia da sessão SSH e conecte novamente para aplicar o grupo docker."
echo ""
echo "Depois teste com:"
echo "docker --version"
echo "docker ps"
