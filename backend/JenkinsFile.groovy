pipeline {
    agent any
    tools {
      gradle 'gradle_8.5'
    }
    environment {
        DOCKER_IMAGE_NAME = 'jihyeon99/iandwe-backend'
        DOCKERFILE_PATH = './backend/Dockerfile'
        // CONTAINER_NAME = 'iandwe-backend'
    }
    stages {
        stage('GitLab Clone') {
            steps {
                git branch : 'develop', credentialsId: 'SSAFYC108', url: 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12C108.git'
            }
            post {
                failure {
                  echo 'GitLab Clone failure !'
                }
                success {
                  echo 'GitLab Clone success !'
                }
            }
        }
        stage('Gradle Build') {
            steps {
                echo 'Building..'
                dir('./backend') {
                    sh 'chmod +x gradlew'
                    sh './gradlew clean bootjar'
                }
            }
            post {
                failure {
                    echo 'Gradle Build failure !'
                }
                success {
                    echo 'Gradle Build success !'
                }                
            }
        }
        stage('Docker Build Image') {
            steps {
                script {
                    sh '''
                        cd ./backend
                        docker build -t ${DOCKER_IMAGE_NAME} .
                    '''
                }
            }
            post {
                failure {
                    echo 'Docker Build failure !'
                }
                success {
                    echo 'Docker Build success !'
                }
            }
        }        
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}