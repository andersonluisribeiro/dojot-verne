const mqtt = require('mqtt')
const defaultConfig = require('./config')
const Utils = require('./utils/utils')
const util = require('util')
const { logger } = require('@dojot/dojot-module-logger')
const TAG = { filename: "mqtt-client"}

class MQTTClient {

    constructor(config, kafkaMessenger) {

        this.config = config || defaultConfig;        
        this.isConnected = false;
        this.kafkaMessenger = kafkaMessenger;

        /* set log level */
        logger.setLevel(this.config.app.mqtt_log_level);
    }
    
    init() {

        if (this.isConnected) {
            logger.info(`Client is already connected`, TAG);
            return;
        }

        const mqttOptions = {
            username: `oibb`,
            clientId: `${process.env.HOSTNAME}`,
            host: this.config.mqtt.host,
            port: this.config.mqtt.port,
            keepAlive: this.config.mqtt.keepAlive
        }

        const onConnectBind = this._onConnect.bind(this);
        const onDisconnectBind = this._onDisconnect.bind(this);
        const onMessageBind = this._onMessage.bind(this);
        
        this.mqttc = mqtt.connect(mqttOptions);
        this.mqttc.on("connect", onConnectBind);
        this.mqttc.on("disconnect", onDisconnectBind);
        this.mqttc.on("message", onMessageBind);

    }
    
    _onConnect() {
        this.isConnected = true;
        logger.info(`Client Connected successfully!`, TAG)
        this.mqttc.subscribe(this.config.mqtt.subscribeTopic);
    }

    _onDisconnect() {
        this.isConnected = false;
        this.mqttc.reconnect();
    }

    _onMessage(topic, message) {

        const configTopic = /.+\/config/;

        if (configTopic.test(topic)) {
            logger.debug(`Messge received on topic config discarting ...!`, TAG);
            return;
        }

        if (!Utils.validateTopic(topic)) {
            logger.error(`Invalid topic ...!`, TAG);
            return;
        }

        try {
            const jsonPayload = JSON.parse(message)
            const generatedData = Utils.generatePayload(topic, jsonPayload)
            this.kafkaMessenger.sendMessage(generatedData, `${generatedData.tenant}:${generatedData.deviceid}`)
            logger.debug(`Message received on topic  ${util.inspect(generatedData, {depth: null})}`)

        } catch (error) {
            logger.error(`Error : ${error}`, TAG)
        }

    }

}


module.exports = MQTTClient