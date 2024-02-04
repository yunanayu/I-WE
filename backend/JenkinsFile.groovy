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
        DOCKER_IMAGE_TAG = 'latest'

        FRONTEND_IMAGE_NAME = 'jihyeon99/iandwe-frontend'
        FRONTEND_DOCKERFILE_PATH = './frontend/Dockerfile'
        FRONTEND_CONTAINER_NAME = 'iandwe-frontend'
        FRONTEND_REGISTRY_CREDENTIAL = 'dockerhub-IdPwd'
        FRONTEND_DOCKER_IMAGE = ''
        FRONTEND_DOCKER_IMAGE_TAG = 'latest'
    }
    stages {
        stage('GitLab Clone') {
            steps {
                git branch : 'develop', credentialsId: 'SSAFYC108', url: 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12C108.git'
            }
        }
        stage('FE-Install') {
            steps {
                echo '##### FE Install #####'
                dir('./frontend') {
                    sh 'npm i'
                }
            }
        }
        stage('FE-Build'){
            steps{
                echo '##### FE BUILD #####'
                dir('./frontend'){
                    sh 'npm run build'
                }
            }
        }
        stage('BE-Build') {
            steps {
                echo '##### BE Build #####'
                dir('./backend') {
                    sh 'chmod +x gradlew'
                    sh './gradlew clean bootjar'
                }
            }
        }
        stage('Delete Previous Docker Container') {
            steps {
                script {
                    def runningContainers = sh(script: 'docker ps -a -q --filter "name=${CONTAINER_NAME}"', returnStdout: true).trim()
                    echo "Running Containers: ${runningContainers}"
                    if (runningContainers) {
                        sh """
                            echo 'Contatiner already exist'
                            docker stop ${runningContainers}
                            docker rm ${runningContainers}
                        """
                    }
                }
            }
        }
        stage('Docker Clean Prev Image') {
            steps {
                script {
                    def existingImages = sh(script: "docker images -q ${DOCKER_IMAGE_NAME}", returnStdout: true).trim()
                    if (existingImages) {
                        echo "Cleaning existing Docker image: ${existingImages}"
                        sh "docker rmi ${existingImages}"
                    } else {
                        echo "No existing Docker image found with name: ${DOCKER_IMAGE_NAME}"
                    }
                }
            }
        }
        stage('Docker Build Image') {
            steps {
                dir('./backend') {
                    script {
                        DOCKER_IMAGE = docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}", "-f Dockerfile .")
                    }
                }
            }
        }
        stage('Push Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', REGISTRY_CREDENTIAL) {
                        DOCKER_IMAGE.push()
                    }
                }
            }
        }
        stage('Docker Clean Cur Image') {
            steps {
                script {
                    def existingImages = sh(script: "docker images -q ${DOCKER_IMAGE_NAME}", returnStdout: true).trim()
                    if (existingImages) {
                        echo "Cleaning existing Docker image: ${existingImages}"
                        sh "docker rmi ${existingImages}"
                    } else {
                        echo "No existing Docker image found with name: ${DOCKER_IMAGE_NAME}"
                    }
                }
            }
        }
        stage('Pull from DockerHub') {
            steps {
                script {
                    sh 'docker pull ${DOCKER_IMAGE_NAME}'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d --name ${CONTAINER_NAME} -p 8081:8080 ${DOCKER_IMAGE_NAME}'
                }
            }
        }
    }
}