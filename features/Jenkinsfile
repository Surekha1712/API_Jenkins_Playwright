pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Surekha1712/API_Jenkins_Playwright'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Cucumber API Tests') {
            steps {
                bat 'npm test'
            }
        }
    }
}
