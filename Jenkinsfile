/**
# Copyright CESSDA ERIC 2017-2021
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not
# use this file except in compliance with the License.
# You may obtain a copy of the License at
# http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
*/
pipeline {
	options {
		ansiColor('xterm')
		buildDiscarder logRotator(artifactNumToKeepStr: '5', numToKeepStr: '20')
		timeout(time: 1, unit: 'HOURS') // Abort a stalled build
	}

	environment {
		product_name = "cdc"
		module_name = "searchkit"
		image_tag = "${docker_repo}/${product_name}-${module_name}:${env.BRANCH_NAME.toLowerCase().replaceAll('[^a-z0-9\\.\\_\\-]', '-')}-${env.BUILD_NUMBER}"
		scannerHome = tool 'sonar-scanner'
	}

	agent {
		label 'jnlp-himem'
	}

	stages {
		stage('Configure Node.JS environment') {
			agent {
				dockerfile {
					additionalBuildArgs '--target build'
					filename 'Dockerfile'
					reuseNode true
				}
			}
			stages {
				stage('Setup node_modules') {
					steps {
						// Copy node_modules from the Docker container to the build directory
						sh 'cp --recursive /usr/src/app/node_modules/ "$PWD/node_modules/"'

						// npm install needs to be run so that NPM scripts execute correctly
						sh 'npm install'
					}
				}
				stage('Lint Project') {
					steps {
						sh 'npm run lint -- --format checkstyle --output-file eslint/report.xml | true'
					}
					post {
						always {
							recordIssues(tools: [esLint(pattern: 'eslint/report.xml')])
						}
					}
				}
				stage('Run Unit Tests') {
					steps {
						sh "npm test -- --forceExit"
					}
					post {
						always {
							junit 'junit.xml'
						}
					}
				}
				stage('Run Sonar Scan') {
					steps {
						withSonarQubeEnv('cessda-sonar') {
							sh "${scannerHome}/bin/sonar-scanner"
						}
					}
					when { branch 'master' }
				}
			}
		}
		stage('Get Quality Gate Status') {
			steps {
				waitForQualityGate abortPipeline: true
			}
			when { branch 'master' }
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
			when { branch 'master' }
		}
		stage('Check Requirements and Deployments') {
			steps {
				build job: 'cessda.cdc.deploy/master', parameters: [string(name: 'searchkit_image_tag', value: "${env.BRANCH_NAME}-${env.BUILD_NUMBER}")], wait: false
			}
			when { branch 'master' }
		}
	}
	post {
		failure {
			script {
				if (env.BRANCH_NAME == 'master') {
					emailext body: '${DEFAULT_CONTENT}', subject: '${DEFAULT_SUBJECT}', to: 'support@cessda.eu'
				}
			}
		}
	}
}
