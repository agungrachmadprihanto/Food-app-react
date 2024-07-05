pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'food-app'        
        CURRENT_IMAGE_TAG = "latest-${env.BUILD_NUMBER}"
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
                        PREVIOUS_IMAGE_TAG = sh(script: "docker images -q ${DOCKER_IMAGE}:latest", returnStdout: true).trim()
                        sh "docker build -t ${DOCKER_IMAGE}:${CURRENT_IMAGE_TAG} ."
                        sh "docker tag ${DOCKER_IMAGE}:${CURRENT_IMAGE_TAG} ${DOCKER_IMAGE}:latest"
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
    post {
        failure {
            script {
                echo "Rollback due to failure"
                try {
                    if (PREVIOUS_IMAGE_TAG) {
                        sh "docker tag ${PREVIOUS_IMAGE_TAG} ${DOCKER_IMAGE}:latest"
                        sh "docker compose down"
                        sh "docker compose up -d ${DOCKER_IMAGE}"
                    } else {
                        echo "No previous image found to rollback"
                    }
                } catch (Exception e) {
                    echo "Rollback failed: ${e.getMessage()}"
                }
            }
        }
    }
}
