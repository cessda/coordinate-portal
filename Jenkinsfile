node {
    stage('Checkout SCM') {
      checkout scm
    }
    stage('Build Project and start Sonar scan') {
      sh 'mvn clean install sonar:sonar -Dsonar.projectName=$JOB_NAME -Dsonar.host.url=http://104.155.63.80:9000 -Dsonar.login=aeedda179f13b9c99e1151ef149f2d32fd1c832d'
      sleep 5
    }
    stage('Get Quality Gate Status') {
      sh 'curl -s http://104.155.63.80:9000/api/qualitygates/project_status?analysisId="$(curl -s http://104.155.63.80:9000/api/ce/task?id="$(cat target/sonar/report-task.txt | awk -F "=" \'/ceTaskId=/{print $2}\')" | jq -r \'.task.analysisId\')" | jq -r \'.projectStatus.status\' > status'
      STATUS = readFile('status')

      if ( STATUS.trim() == "ERROR") {
        error("Quality Gate not reached, please review the Sonar Report")
      } else if ( STATUS.trim() == "WARN") {
        error("Quality Gate not reached, please review the Sonar Report")
      } else {
        echo "Quality Gate reached, deployment will be processed, please wait"
      }
    }
    stage('Deploy') {
     echo "Deploy Script"
    }
}