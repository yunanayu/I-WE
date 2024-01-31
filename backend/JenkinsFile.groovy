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
                dir('./backend') {
                    script {
                        DOCKER_IMAGE = docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}", "-f Dockerfile .")
                    }
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
        stage('Push Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', REGISTRY_CREDENTIAL) {
                        DOCKER_IMAGE.push()
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
        stage('Docker Clean Image') {
            steps {
                dir('./backend') {
                    sh 'docker rmi $DOCKER_IMAGE_NAME'
                }
            }
            post {
                failure {
                    echo 'Docker Clean Image failure !'
                }
                success {
                    echo 'Docker Clean Image success !'
                }
            }
        }
//        stage('Delete Previous Docker Container') {
//            steps {
//                script {
//                    sh '''
//                        docker stop ${CONTAINER_NAME}
//                        docker rm ${CONTAINER_NAME}
//                    '''
//                }
//            }
//            post {
//                failure {
//                    echo 'Delete Previous Docker Container failure !'
//                }
//                success {
//                    echo 'Delete Previous Docker Container success !'
//                }
//            }
//        }
        stage('Pull from DockerHub') {
            steps {
                script {
                    sh 'docker pull ${DOCKER_IMAGE_NAME}'
                }
            }
            post {
                failure {
                    echo 'Pull from DockerHub failure !'
                }
                success {
                    echo 'Pull from DockerHub success !'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d --name ${CONTAINER_NAME} -p 8081:8080 ${DOCKER_IMAGE_NAME}'
                }
            }
            post {
                failure {
                    echo 'Run Docker Container failure !'
                }
                success {
                    echo 'Run Docker Container success !'
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