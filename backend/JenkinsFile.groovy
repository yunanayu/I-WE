pipeline {
    agent any
    tools {
      gradle 'gradle_8.5'
    }
    stages {
        stage('GitLab Repository Clone') {
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
        stage('Build') {
            steps {
                echo 'Building..'
                cd './backend'
                sh 'chmod +x gradlew'
                sh './gradlew bootjar'
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