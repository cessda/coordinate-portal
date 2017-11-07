def sonarQubeUrl = 'http://35.195.121.8:9000'

node {
    stage('Checkout SCM') {
      checkout scm
    }
    stage('Build Project and start Sonar scan') {
		sh 'mvn clean install sonar:sonar -Dsonar.projectName=$JOB_NAME -Dsonar.host.url=${sonarQubeUrl} -Dsonar.login=b88a322e7d06fad88541bdac7134663af74b264e'
		sleep 5
    }
    stage('Get Quality Gate Status') {
		sh 'curl -s ${sonarQubeUrl}/api/qualitygates/project_status?analysisId="$(curl -s ${sonarQubeUrl}/api/ce/task?id="$(cat target/sonar/report-task.txt | awk -F "=" \'/ceTaskId=/{print $2}\')" | jq -r \'.task.analysisId\')" | jq -r \'.projectStatus.status\' > status'
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