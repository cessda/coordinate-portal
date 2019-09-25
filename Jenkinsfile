/**
# Copyright CESSDA ERIC 2017-2019
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
		buildDiscarder logRotator(artifactNumToKeepStr: '5', numToKeepStr: '10')
	}

	environment {
		product_name = "cdc"
		module_name = "searchkit"
		image_tag = "${docker_repo}/${product_name}-${module_name}:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
		scannerHome = tool 'sonar-scanner'
		version = "2.1"
	}

	agent {
		label 'jnlp-himem'
	}

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
			agent {
				dockerfile {
					dir './tests'
					filename 'Dockerfile'
					reuseNode true
				}
			}
			steps {
				nodejs('node') {
					sh 'git config user.email "support@cessda.eu"'
					sh 'git config user.name "CESSDA CI Server"'
					sh "npm version ${version}.${env.BUILD_NUMBER}"
					sh "npm ci"
					sh "npm run test"
				}
			}
			post {
				always {
					junit 'junit.xml'
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
			when { branch 'master' }
		}
		stage('Get Quality Gate Status') {
			steps {
				timeout(time: 1, unit: 'HOURS') {
					waitForQualityGate abortPipeline: true
				}
			}
			when { branch 'master' }
		}
		stage('Build Docker image') {
			 steps {
				sh("docker build -t ${image_tag} .")
			}
			when { branch 'master' }
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
				dir('./infrastructure/gcp/') {
					build job: 'cessda.cdc.deploy/master', parameters: [string(name: 'searchkit_image_tag', value: "${image_tag}"), string(name: 'module', value: 'searchkit')], wait: false
				}
			}
			when { branch 'master' }
		}
	}
	post {
		failure {
			emailext body: '${DEFAULT_CONTENT}', subject: '${DEFAULT_SUBJECT}', to: 'support@cessda.eu'
		}
	}
}
