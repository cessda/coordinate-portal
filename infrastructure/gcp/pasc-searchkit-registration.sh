#!/bin/bash

#############################
#          CESSDA           #
#      Cluster Setup        #
#############################

# Julien Le Hericy
# CESSDA ERIC
# j.lehericy(at)cessda.eu


### Load Env Variable and set gcloud Region/Zone/Project
source ./gcp.config > /dev/null 2>&1

# Kubctl credentials setup
gcloud container clusters get-credentials $PRODUCT-$ENVIRONMENT-cc --zone=$ZONE > /dev/null 2>&1

### Kubernetes Deployment ###
if kubectl get rc $PRODUCT-es-$ENVIRONMENT -n $PRODUCT-$ENVIRONMENT > /dev/null 2>&1;
  then
    echo "ElasticSearch component available, deployment will be processed"
  else
    echo "ElasticSearch component not available, deployment's aborted"
    exit 1
fi;

