jest.mock('@jonaphael/dojot-module');
jest.mock('@dojot/dojot-module-logger');
jest.mock('fs');

const fakeConfig = {
    mqtt: {
        mqttHost: "fake",
        host: "fake",
        port: "fake",
        keepAlive: 0
    },
    app: {
        mqtt_log_level: "debug"
    }

}

const mockConfig = {
    fakeMqtt: {
        on: jest.fn(),
        reconnect: jest.fn()
    }
}

const mqtt = require('mqtt');

jest.mock("@jonaphael/iotagent-nodejs")

jest.mock("mqtt", () => ({
    connect: jest.fn(() => mockConfig.fakeMqtt),
}));

jest.mock("../../src/AgentMessenger");

const MQTTClient = require("../../src/MqttClient");

describe("Testing mqtt bridge client", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should init sucessfully the client", () => {

        const client = new MQTTClient(fakeConfig);
        client.init();

        expect(mqtt.connect).toHaveBeenCalled();
        expect(mockConfig.fakeMqtt.on).toHaveBeenCalled();

    })

    it("Should init sucessfully the client without conf", () => {

        const client = new MQTTClient();
        client.init();

        expect(mqtt.connect).toHaveBeenCalled();
        expect(mockConfig.fakeMqtt.on).toHaveBeenCalled();

    })


    it("Should connect the client and init agent", () => {

        const client = new MQTTClient(fakeConfig);
        client.init();
        //insert two times to test the if condition
        client._onConnect();
        client._onConnect();

        expect(client.agentMessenger.init).toHaveBeenCalledTimes(1);

    })

    it("Should reconnect the client after disconnect", () => {

        const client = new MQTTClient(fakeConfig);
        client.init();

        client._onDisconnect();

        expect(mockConfig.fakeMqtt.reconnect).toHaveBeenCalled();

    })

    it("Should send message after onMessage", async () => {
        const client = new MQTTClient(fakeConfig);
        client.init();
        client._onConnect();
        let fakeMessage = '{ "name":"John", "age":30, "city":"New York"}'
        await client._onMessage("test", fakeMessage);
        expect(client.agentMessenger.sendMessage).toHaveBeenCalled();
    })


});