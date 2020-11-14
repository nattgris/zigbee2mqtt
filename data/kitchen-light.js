/* eslint-disable */
const zigbeeHerdsmanConverters = require('zigbee-herdsman-converters');

const device = {
    zigbeeModel: ['DIM0-10V2CH'],
    model: 'DIM0-10V2CH',
    vendor: 'Nattgris',
    description: 'Dual Channel 0-10V Dimmer',
//    extend: generic.light_onoff_brightness,
    supports: 'on/off, brightness',
    fromZigbee: [
        zigbeeHerdsmanConverters.fromZigbeeConverters.on_off,
        zigbeeHerdsmanConverters.fromZigbeeConverters.brightness,
        zigbeeHerdsmanConverters.fromZigbeeConverters.ignore_basic_report
    ],
    toZigbee: [
        zigbeeHerdsmanConverters.toZigbeeConverters.light_onoff_brightness,
        zigbeeHerdsmanConverters.toZigbeeConverters.ignore_transition,
        zigbeeHerdsmanConverters.toZigbeeConverters.ignore_rate,
        zigbeeHerdsmanConverters.toZigbeeConverters.effect,
        zigbeeHerdsmanConverters.toZigbeeConverters.light_brightness_move,
        zigbeeHerdsmanConverters.toZigbeeConverters.light_brightness_step,
    ],
    exposes: [
        zigbeeHerdsmanConverters.exposes.presets.light_brightness().withEndpoint('l1'),
        zigbeeHerdsmanConverters.exposes.presets.light_brightness().withEndpoint('l2'),
        zigbeeHerdsmanConverters.exposes.light().withEndpoint('l3')
    ],
    endpoint: (device) => {
        return {l1: 1, l2: 2, l3: 3};
    },
    meta: {
        configureKey: 1,
        multiEndpoint: true
    },
    configure: async (device, coordinatorEndpoint) => {
        const endpoint1 = device.getEndpoint(1);
        const endpoint2 = device.getEndpoint(2);
        const endpoint3 = device.getEndpoint(3);
        await bind(endpoint1, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
        await configureReporting.onOff(endpoint1);
        await configureReporting.brightness(endpoint1);
        await bind(endpoint2, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
        await configureReporting.onOff(endpoint2);
        await configureReporting.brightness(endpoint2);
        await bind(endpoint3, coordinatorEndpoint, ['genOnOff']);
        await configureReporting.onOff(endpoint3);
    },
};
module.exports = device;
