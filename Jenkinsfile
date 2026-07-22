pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Scan') {
            steps {
                script {

                    def scannerHome = tool 'sonar-scanner'

                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }

                }
            }
        }

        stage('Quality Gate') {
            steps {
                echo 'Skipping Quality Gate temporarily due to SonarQube indexing issue'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker build -t employee-app:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Trivy Scan') {
            steps {
                sh '''
                trivy image employee-app:${BUILD_NUMBER}
                '''
            }
        }

        stage('Docker Push') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                    docker tag employee-app:${BUILD_NUMBER} $DOCKER_USER/employee-app:${BUILD_NUMBER}
                    docker tag employee-app:${BUILD_NUMBER} $DOCKER_USER/employee-app:latest

                    docker push $DOCKER_USER/employee-app:${BUILD_NUMBER}
                    docker push $DOCKER_USER/employee-app:latest
                    '''
                }
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }

        failure {
            echo 'Pipeline failed'
        }
    }
}
