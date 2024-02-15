pipeline {
    agent any
    tools {
        gradle 'gradle_8.5'
        nodejs 'nodejs-20.10.0'
    }
    environment {
        BACKEND_IMAGE_NAME = 'jihyeon99/iandwe-backend'
        BACKEND_CONTAINER_NAME = 'iandwe-backend'
        BACKEND_DOCKER_IMAGE = ''

        FRONTEND_IMAGE_NAME = 'jihyeon99/iandwe-frontend'
        FRONTEND_CONTAINER_NAME = 'iandwe-frontend'
        FRONTEND_DOCKER_IMAGE = ''

        REGISTRY_CREDENTIAL = 'dockerhub-IdPwd'
        DOCKER_IMAGE_TAG = 'latest'
    }
    stages {
        stage('GitLab Clone') {
            steps {
                echo '##### GitLab Clone #####'
                git branch : 'develop', credentialsId: 'SSAFYC108', url: 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12C108.git'
            }
        }
        stage('Add Env') {
            steps {
                dir('./backend') {
                    withCredentials([file(credentialsId: 'key', variable: 'key')]) {
                        sh 'chmod -R a=rwx src/main/resources'
                        sh 'cp ${key} src/main/resources/application-key.properties'
                    }
                }
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
                echo '##### FE Build #####'
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
        stage('FE-Stop&Delete Prev Container') {
            steps {
                echo '##### FE Stop&Delete Prev Container #####'
                script {
                    def runningContainers = sh(script: 'docker ps -a -q --filter "name=${FRONTEND_CONTAINER_NAME}"', returnStdout: true).trim()
                    echo "FE Running Containers: ${runningContainers}"
                    if (runningContainers) {
                        sh """
                            echo 'FE Prev Container already exist'
                            docker stop ${runningContainers}
                            docker rm ${runningContainers}
                        """
                    }
                }
            }
        }
        stage('BE-Stop&Delete Prev Container') {
            steps {
                echo '##### BE Stop&Delete Prev Container #####'
                script {
                    def runningContainers = sh(script: 'docker ps -a -q --filter "name=${BACKEND_CONTAINER_NAME}"', returnStdout: true).trim()
                    echo "BE Running Containers: ${runningContainers}"
                    if (runningContainers) {
                        sh """
                            echo 'BE Prev Container already exist'
                            docker stop ${runningContainers}
                            docker rm ${runningContainers}
                        """
                    }
                }
            }
        }
        stage('FE-Clean Prev Image') {
            steps {
                echo '##### FE Clean Prev Image #####'
                script {
                    def existingImages = sh(script: "docker images -q ${FRONTEND_IMAGE_NAME}", returnStdout: true).trim()
                    echo "FE Cleaning Prev Image: ${existingImages}"
                    if (existingImages) {
                        sh """
                            echo 'FE Prev Image already exist'
                            docker rmi ${existingImages}
                        """
                    }
                }
            }
        }
        stage('BE-Clean Prev Image') {
            steps {
                echo '##### BE Clean Prev Image #####'
                script {
                    def existingImages = sh(script: "docker images -q ${BACKEND_IMAGE_NAME}", returnStdout: true).trim()
                    echo "BE Cleaning Prev Image: ${existingImages}"
                    if (existingImages) {
                        sh """
                            echo 'BE Prev Image already exist'
                            docker rmi ${existingImages}
                        """
                    }
                }
            }
        }
        stage('FE-Build Image') {
            steps {
                echo '##### FE Build Image #####'
                dir('./frontend') {
                    script {
                        FRONTEND_DOCKER_IMAGE = docker.build("${FRONTEND_IMAGE_NAME}:${DOCKER_IMAGE_TAG}", "-f Dockerfile .")
                    }
                }
            }
        }
        stage('BE-Build Image') {
            steps {
                echo '##### BE Build Image #####'
                dir('./backend') {
                    script {
                        BACKEND_DOCKER_IMAGE = docker.build("${BACKEND_IMAGE_NAME}:${DOCKER_IMAGE_TAG}", "-f Dockerfile .")
                    }
                }
            }
        }
        stage('FE-Push Image To DockerHub') {
            steps {
                echo '##### FE Push Image To DockerHub #####'
                script {
                    docker.withRegistry('', REGISTRY_CREDENTIAL) {
                        FRONTEND_DOCKER_IMAGE.push()
                    }
                }
            }
        }
        stage('BE-Push Image To DockerHub') {
            steps {
                echo '##### BE Push Image To DockerHub #####'
                script {
                    docker.withRegistry('', REGISTRY_CREDENTIAL) {
                        BACKEND_DOCKER_IMAGE.push()
                    }
                }
            }
        }
        stage('FE-Clean Cur Image') {
            steps {
                echo '##### FE Clean Cur Image #####'
                script {
                    def existingImages = sh(script: "docker images -q ${FRONTEND_IMAGE_NAME}", returnStdout: true).trim()
                    if (existingImages) {
                        echo "FE Cleaning Cur Image: ${existingImages}"
                        sh "docker rmi ${existingImages}"
                    }
                }
            }
        }
        stage('BE-Clean Cur Image') {
            steps {
                echo '##### BE Clean Cur Image #####'
                script {
                    def existingImages = sh(script: "docker images -q ${BACKEND_IMAGE_NAME}", returnStdout: true).trim()
                    if (existingImages) {
                        echo "BE Cleaning Cur Image: ${existingImages}"
                        sh "docker rmi ${existingImages}"
                    }
                }
            }
        }
        stage('FE-Pull From DockerHub') {
            steps {
                echo '##### FE Pull From DockerHub #####'
                script {
                    sh "docker pull ${FRONTEND_IMAGE_NAME}"
                }
            }
        }
        stage('BE-Pull From DockerHub') {
            steps {
                echo '##### BE Pull From DockerHub #####'
                script {
                    sh "docker pull ${BACKEND_IMAGE_NAME}"
                }
            }
        }
        stage('FE-Run Container') {
            steps {
                echo '##### FE Run Container #####'
                script {
                    sh "docker run -d --name ${FRONTEND_CONTAINER_NAME} -p 3000:3000 ${FRONTEND_IMAGE_NAME}"
                }
            }
        }
        stage('BE-Run Container') {
            steps {
                echo '##### BE Run Container #####'
                script {
                    sh "docker run -d --name ${BACKEND_CONTAINER_NAME} -p 8081:8081 ${BACKEND_IMAGE_NAME}"
                }
            }
        }
    }
}