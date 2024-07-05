pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'food-app'        
    }
    stages {
        stage('Checkout Source') {
            steps {
                script {
                    echo "Checking out source code"
                    checkout scm
                    sh "pwd"
                    sh "ls -ltr"
                }
            }
        }
        stage('Docker Compose Build') {
            steps {
                script {
                    echo "Building Docker image"
                    try {
                        sh "docker build -t ${DOCKER_IMAGE} ."
                    } catch (Exception e) {
                        error "Docker build failed: ${e.getMessage()}"
                    }
                }
            }
        }
        stage('Docker Compose Up') {
            steps {
                script {
                    echo "Running Docker Compose"
                    try {
                        sh "docker compose up -d ${DOCKER_IMAGE}"
                    } catch (Exception e) {
                        error "Docker Compose up failed: ${e.getMessage()}"
                    }
                }
            }
        }
    }
}
