/* eslint-disable */
const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const e = exposes.presets;

const device = {
    zigbeeModel: ['DIM0-10V2CH'],
    model: 'DIM0-10V2CH',
    vendor: 'Nattgris',
    description: 'Dual Channel 0-10V Dimmer',
//    extend: generic.light_onoff_brightness,
    supports: 'on/off, brightness',
    fromZigbee: [
        fz.on_off,
        fz.brightness,
        fz.ignore_basic_report
    ],
    toZigbee: [
        tz.light_onoff_brightness,
        tz.ignore_transition,
        tz.ignore_rate,
        tz.effect,
        tz.light_brightness_move,
        tz.light_brightness_step,
    ],
    exposes: [
        e.light_brightness().withEndpoint('l1'),
        e.light_brightness().withEndpoint('l2'),
        exposes.light().withEndpoint('l3')
    ],
    endpoint: (device) => {
        return {l1: 1, l2: 2, l3: 3};
    },
    meta: {
        configureKey: 1,
        multiEndpoint: true,
        disableDefaultResponse: true
    },
//    configure: async (device, coordinatorEndpoint) => {
//        const endpoint1 = device.getEndpoint(1);
//        const endpoint2 = device.getEndpoint(2);
//        const endpoint3 = device.getEndpoint(3);
//        await bind(endpoint1, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
//        await configureReporting.onOff(endpoint1);
//        await configureReporting.brightness(endpoint1);
//        await bind(endpoint2, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
//        await configureReporting.onOff(endpoint2);
//        await configureReporting.brightness(endpoint2);
//        await bind(endpoint3, coordinatorEndpoint, ['genOnOff']);
//        await configureReporting.onOff(endpoint3);
//    },
};

module.exports = device;
