pipeline {
  environment {
    product_name = "cdc"
    module_name = "searchkit"
    image_tag = "${docker_repo}/${product_name}-${module_name}:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    scannerHome = tool 'sonar-scanner'
  }

  agent any

  stages {
    stage('Check environment') {
      steps {
	      echo "Check environment"
        echo "product_name = ${product_name}"
        echo "module_name = ${module_name}"
        echo "image_tag = ${image_tag}"
      }
    }
    stage('Run Unit Tests') {
      steps {
        nodejs('node') {
          sh "npm install"
          sh "npm run test"
        }
      }
    }
    stage('Run Sonar Scan') {
		  steps {
        nodejs('node') {
            withSonarQubeEnv('cessda-sonar') {
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
    }
    stage('Get Quality Gate Status') {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: true
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
        sh("gcloud auth configure-docker")
        sh("docker push ${image_tag}")
        sh("gcloud container images add-tag ${image_tag} ${docker_repo}/${product_name}-${module_name}:${env.BRANCH_NAME}-latest")
      }
    }
    stage('Check Requirements and Deployments') {
      steps {
        dir('./infrastructure/gcp/') {
          build job: 'cessda.cdc.deploy/master', parameters: [string(name: 'searchkit_image_tag', value: "${image_tag}"), string(name: 'module', value: 'searchkit')], wait: false
        }
      }
    }
  }
  post {
    always {
      junit 'junit.xml'
    }
  }
}
