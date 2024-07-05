pipeline {
    agent any
    stages {
        stage('Checkout Source') {
            steps {
                checkout scm
                sh "pwd"
                sh "ls -ltr"
            }
        }
        stage('Docker Comopse Build') {
            steps {
                echo "docker compose build"
                sh "docker build -t nginx ."
            }
        }
        stage('Docker Comopse Up') {
            steps {
                echo "docker compose running"
                sh "docker compose up -d nginx"
            }
        }
    }
}
