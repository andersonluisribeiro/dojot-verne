#!/bin/bash

BASE_DIR=${BASE_DIR:-"/opt/k2v-bridge"}

. ${BASE_DIR}/security/initVariables.sh

_saveFormattedCRT()
{
  nameFile=$1
  rawCRT=$2

  echo "Saving CRT ${nameFile}"

  (echo  "-----BEGIN CERTIFICATE-----"
  echo ${rawCRT}
  echo "-----END CERTIFICATE-----"  ) > ${certDir}/tempfile.crt

  openssl x509 -inform pem -in ${certDir}/tempfile.crt -out ${nameFile}

  rm ${certDir}/tempfile.crt
}