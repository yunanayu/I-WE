pipeline {
    agent any
    tools {
      gradle 'gradle_8.5'
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        repository = "jihyeon99/iandwe-backend"
        dockerImage = ''
    }
    stages {
        stage('GitLab Clone') {
            steps {
                git branch : 'develop', credentialsId: 'SSAFYC108', url: 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12C108.git'
            }
            post {
                failure {
                  echo 'Repository clone failure !'
                }
                success {
                  echo 'Repository clone success !'
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
                    echo 'Gradle jar build failure !'
                }
                success {
                    echo 'Gradle jar build success !'
                }                
            }
        }
        stage('Docker Build') {
        steps {
            script {
                dockerImage = docker.build repository + ":$BUILD_NUMBER"
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