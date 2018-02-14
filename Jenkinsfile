pipeline {
  environment {
    platform = "cessda-development"
    client = "cessda"
    project = "pasc"
    module = "searchkit"
    environment = "$BRANCH_NAME"
    docker_registry = "eu.gcr.io"
    build = "build-${env.BUILD_NUMBER}"
  }

  agent any

  stages {
    stage('Build Project and start Sonar scan') {
		  steps {
        withSonarQubeEnv('cessda-sonar') {
          sh 'sonar-scanner -Dsonar.projectName=$JOB_NAME -Dsonar.projectKey=$BRANCH_NAME -Dsonar.projectBaseDir=$PWD -Dsonar.sources=src -Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.login=${SONAR_AUTH_TOKEN}'
          sleep 5
        }
      }
    }
    stage('Get Quality Gate Status') {
      steps {
        withSonarQubeEnv('cessda-sonar') {
          sh 'curl -su ${SONAR_AUTH_TOKEN}: ${SONAR_HOST_URL}api/qualitygates/project_status?analysisId="$(curl -su ${SONAR_AUTH_TOKEN}: ${SONAR_HOST_URL}api/ce/task?id="$(cat target/sonar/report-task.txt | awk -F "=" \'/ceTaskId=/{print $2}\')" | jq -r \'.task.analysisId\')" | jq -r \'.projectStatus.status\' > status'
        }
        script {
          STATUS = readFile('status')
          if ( STATUS.trim() == "ERROR") {
            error("Quality Gate not reached, please review the Sonar Report")
          } else if ( STATUS.trim() == "WARN") {
            error("Quality Gate not reached, please review the Sonar Report")
          } else {
            echo "Quality Gate reached, deployment will be processed, please wait"
          }
        }
      }
    }
    stage('Build Docker image') {
      steps {
        sh("docker build -t ${image_tag} .")
      }
    }
    stage('Push Docker image') {
      steps {
        sh("gcloud docker -- push ${docker_registry}/${platform}/${project}-${module}:${build}")
        sh("gcloud container images add-tag ${docker_registry}/${platform}/${project}-${module}:${build} ${docker_registry}/${platform}/${project}-${module}:${environment}")
      }
    }
    stage('Check Requirements and Deployments') {
      steps {
        dir('./infrastructure/gcp/') {
          sh("bash pasc-searchkit-creation.sh")
        }
      }
    }
    stage('Selenium tests') {
      steps {
        dir('./infrastructure/selenium/') {
          sh("pytest pasc.py")
        }
      }
    }
  }
}
