pipeline {
    agent any
    tools {
      gradle 'gradle_8.5'
    }
    environment {
        DOCKER_IMAGE_NAME = 'jihyeon99/iandwe-backend'
        DOCKERFILE_PATH = './backend/Dockerfile'
        CONTAINER_NAME = 'iandwe-backend'
        REGISTRY_CREDENTIAL = 'dockerhub-IdPwd'
        DOCKER_IMAGE = ''
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
                        ${DOCKER_IMAGE} = docker.build ${DOCKER_IMAGE_NAME} .
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
        stage('Push Image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', REGISTRY_CREDENTIAL) {
                        dockerImage.push("1.0")
                    }
                }
            }
            post {
                failure {
                    echo 'Push Image to Docker Hub failure !'
                }
                success {
                    echo 'Push Image to Docker Hub success !'
                }
            }
        }
        stage('Delete Previous Docker Container') {
            steps {
                script {
                    sh '''
                        docker stop ${CONTAINER_NAME}
                        docker rm ${CONTAINER_NAME}
                    '''
                }
            }
            post {
                failure {
                    echo 'Delete Previous Docker Container failure !'
                }
                success {
                    echo 'Delete Previous Docker Container success !'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${DOCKER_IMAGE_NAME}'
                }
            }
            post {
                failure {
                    echo 'Run Docker Container failure !'
                }
                success {
                    echo 'Run Docker Containersuccess !'
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