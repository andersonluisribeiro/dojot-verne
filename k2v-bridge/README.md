# **k2v-bridge**

The k2v-bridge service is who consume messages from kafka, extract its attrs value, build a topic with the kafka key where the message where produced, then publish the attrs payload to verneMQ. The mqtt client who publish to verne is secured with MQTTS.
In case of deployment with kubernets the amount of partitions in kafka must be the amount of k2v-bridge pod replicas.

# **Configurations**

## **Environment Variables**

Before running the kubernetes environment with the k2v-bridge service, make sure you configure the environment variables to match your needs. The variables can be configured in the .yaml file of the service.

Key                      | Purpose                                                             | Default Value   | Valid Values   |
------------------------ | ------------------------------------------------------------------- | --------------- | -------------- |
LOG_LEVEL                | Log level for debug                                                 | info            | string         |
DATA_BROKER_CONN_RETRIES | How many time data broker tries to reconnect when fails             | 10              | integer        |
BASE_DIR                 | Base directory where the /certs dir will be found                   | opt/mqtt_client | directory name |
HOSTNAME                 | Hostname to be used in the certificate common name                  | broker          | hostname/IP    |
CERT_EJBCA_API_BROKER    | Address of the EJBCA broker                                         | localhost       | hostname/IP    |
CERT_EJBCA_API_PORT      | Port of the EJBCA broker                                            | 5583            | integer        |
AUTH_URL                 | Address of the auth service                                         | http://auth:5000| hostname/IP    |
DATA_BROKER              | Address of the data broker                                          | data-broker:80  | hostname/IP    |
DATA_BROKER_PORT         | Port of the data broker                                             | 80              | integer        |
KAFKA_HOSTS              | Address of the kafka broker                                         |kafka-server:9092| hostname/IP    |
DOJOT_MQTT_HOST          | Address of the verne broker                                         |vernemq-k8s      | hostname/IP    |
DOJOT_MQTT_PORT          | Port of the verne broker                                            |1883             | integer        |
CERT_DNS                 | DNS of the service                                                  |localhost        | hostname       |
ENABLE_DOJOT             | Enable dojot or 100k                                                |false            | string         |

# **Issues and help**

If you found a problem or need help, leave an issue in the main [Dojot repository](https://github.com/dojot/dojot) and we will help you!