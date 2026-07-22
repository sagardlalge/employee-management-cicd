pipeline {

    agent any

    tools {
        SonarQubeScanner 'sonar-scanner'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Scan') {

            steps {

                withSonarQubeEnv('SonarQube') {

                    sh 'sonar-scanner'
                }
            }
        }

        stage('Quality Gate') {

            steps {

                timeout(time: 5, unit: 'MINUTES') {

                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build') {

            steps {

                sh '''
                docker build -t employee-app:${BUILD_NUMBER} .
                '''
            }
        }
    }
}
