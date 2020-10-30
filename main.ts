 /**
 * Hanshin STEM Sensors
 */
//% color=190 weight=100 icon="\uf1ec" block="Hanshin STEM digital sensors"
//% groups=['Digital Shake','Digital Switch','Fan Module', 'KeyBoard','LED Module','Megnetic','PIR','Relay Module','Vibration Motor','others']
namespace HanshinDigitalSensors
{
 /**
 * Hanshin STEM Sensors
 */
// color=190 weight=100 icon="\uf1ec" block="Hanshin STEM digital sensors"
// groups=['Digital Shake','Digital Switch','Fan Module', 'KeyBoard','LED Module','Megnetic','PIR','Relay Module','Vibration Motor','others']

    //% group="Digital Shake"
    export namespace DigitalShake
    {
        let shakePin = null;
        let onShakeEventHandler: (shake: boolean) => void;
        //% blockId=shakeSensor block="Shake sensor at pin=%p"
        //% group="Digital Shake"
        export function shakeSensor(p: DigitalPin) : void {
            shakePin = p
            pins.setPull(p, PinPullMode.PullNone)
        }
        /**
         * Registers code to run when there is a shake.
         */
        //% blockId=digitalshake_on_shake_event block="on shake event" 
        //% group="Digital Shake"
        export function onShakeEvent(cb: (shake: boolean) => void) {
            onShakeEventHandler = cb;
        }

        pins.onPulsed(shakePin, PulseValue.High, function () {
            if( onShakeEventHandler )
                onShakeEventHandler(true)
        })
        pins.onPulsed(shakePin, PulseValue.Low, function () {
          if( onShakeEventHandler )
                onShakeEventHandler(false)
        })
    };

    //% group="Digital Switch"
    export namespace DigitalSwitch {
        let dsPin : DigitalPin = null;
        //% blockId=turnOn block="Turn on switch at pin=%p"
        //% group="Digital Switch"
        export function turnOn(p: DigitalPin) : void {
            dsPin = p
            pins.digitalWritePin(p,1)
        }

        //% blockId=turnOnAndOff block="turn on switch second=%second at pin=%p then turn off"
        //% group="Digital Switch"
        export function turnOnAndOff(second: number, p: DigitalPin): void {
            pins.digitalWritePin(p,1)
            basic.pause(second*1000)
            pins.digitalWritePin(p, 0)
        }

        //% blockId=turnOff block="Turn off switch"
        //% group="Digital Switch"
        export function turnOff() : void {
            if( dsPin )
                pins.digitalWritePin(dsPin, 0)
        }
    };

    //% group="Fan Module"
    export namespace FanModule {
        let fanPin : DigitalPin = null;
        //% blockId=runFan block="Run fan at pin=%p"
        //% group="Fan Module"
        export function runFan(p: DigitalPin) : void {
            fanPin = p
            pins.digitalWritePin(p,1)
        }

        //% blockId=runFanAndStop block="Run fan second=%second at pin=%p then stop"
        //% group="Fan Module"
        export function runFanAndStop(second: number, p: DigitalPin): void {
            pins.digitalWritePin(p,1)
            basic.pause(second*1000)
            pins.digitalWritePin(p, 0)
        }

        //% blockId=stopFan block="Stop fan"
        //% group="Fan Module"
        export function stopFan() : void {
            if( fanPin )
                pins.digitalWritePin(fanPin, 0)
        }
    };

    //% group="KeyBoard"
    export namespace KeyBoard {
        let keyboardPin = null;
        let onKeyBoardEventHandler: (pressed: boolean) => void;
        //% blockId=keyBoardSensor block="KeyBoard sensor at pin=%p"
        //% group="KeyBoard"
        export function  keyBoardSensor(p: DigitalPin) : void {
            keyboardPin = p
            pins.setPull(p, PinPullMode.PullNone)
        }

        /**
         * Registers code to run when keyboard is pressed.
         */
        //% blockId=onPressedEvent block="on keyboard pressed event" 
        //% group="KeyBoard"
        export function onPressedEvent(cb: (pressed: boolean) => void) {
            onKeyBoardEventHandler = cb;
        }

        pins.onPulsed(keyboardPin, PulseValue.High, function () {
            if( onKeyBoardEventHandler )
                onKeyBoardEventHandler(true)
        })
        pins.onPulsed(keyboardPin, PulseValue.Low, function () {
          if( onKeyBoardEventHandler )
                onKeyBoardEventHandler(false)
        })
    };

    //% group="LED Module"
    export namespace LEDModule {
        let ledPin : DigitalPin = null;
        //% blockId=turnOnLED block="turn on LED at pin=%p"
        //% group="LED Module"
        export function turnOnLED(p: DigitalPin) : void {
            ledPin = p
            pins.digitalWritePin(p,1)
        }

        //% blockId=turnOnLEDAndTurnOff block="Turn on LED second=%second at pin=%p then turn off"
        //% group="LED Module"
        export function turnOnLEDAndTurnOff(second: number, p: DigitalPin): void {
            pins.digitalWritePin(p,1)
            basic.pause(second*1000)
            pins.digitalWritePin(p, 0)
        }

        //% blockId=turnOffLED block="Turn off LED"
        //% group="LED Module"
        export function turnOffLED() : void {
            if( ledPin )
                pins.digitalWritePin(ledPin, 0)
        }
    };

    //% group="Megnetic"
    export namespace Megnetic {
        let megneticPin = null;
        let onMegneticEventHandler: (megnetic: boolean) => void;
        //% blockId=megneticSensor block="Megnetic sensor at pin=%p"
        //% group="Megnetic"
        export function  megneticSensor(p: DigitalPin) : void {
            megneticPin = p
            pins.setPull(p, PinPullMode.PullNone)
        }

        /**
         * Registers code to run when there is megnetic.
         */
        //% blockId=onMegneticEvent block="on megnetic event" 
        //% group="Megnetic"
        export function onMegneticEvent(cb: (megnetic: boolean) => void) {
            onMegneticEventHandler = cb;
        }

        pins.onPulsed(megneticPin, PulseValue.High, function () {
            if( onMegneticEventHandler )
                onMegneticEventHandler(true)
        })
        pins.onPulsed(megneticPin, PulseValue.Low, function () {
          if( onMegneticEventHandler )
                onMegneticEventHandler(false)
        })
    };

    //% group="PIR"
    export namespace PIR {
        let pirPin = null;
        let onPIREventHandler: (hasPerson: boolean) => void;
        //% blockId=pirSensor block="PIR sensor at pin=%p"
        //% group="PIR"
        export function pirSensor(p: DigitalPin) : void {
            pirPin = p
            pins.setPull(p, PinPullMode.PullNone)
        }

        /**
         * Registers code to run when there is person.
         */
        //% blockId=onPIREvent block="on pir event" 
        //% group="PIR"
        export function onPIREvent(cb: (hasPerson: boolean) => void) {
            onPIREventHandler = cb;
        }

        pins.onPulsed(pirPin, PulseValue.High, function () {
            if( onPIREventHandler )
                onPIREventHandler(true)
        })
        pins.onPulsed(pirPin, PulseValue.Low, function () {
          if( onPIREventHandler )
                onPIREventHandler(false)
        })
    };


    //% group="Relay Module"
    export namespace RelayModule {
        let relayPin : DigitalPin = null;
        //% blockId=turnOnRelay block="turn on relay at pin=%p"
        //% group="Relay Module"
        export function turnOnRelay(p: DigitalPin) : void {
            relayPin = p
            pins.digitalWritePin(p,1)
        }

        //% blockId=turnOnRelayAndTurnOff block="Turn on relay second=%second at pin=%p then turn off"
        //% group="Relay Module"
        export function turnOnRelayAndTurnOff(second: number, p: DigitalPin): void {
            pins.digitalWritePin(p,1)
            basic.pause(second*1000)
            pins.digitalWritePin(p, 0)
        }

        //% blockId=turnOffRelay block="Turn off relay"
        //% group="Relay Module"
        export function turnOffRelay() : void {
            if( relayPin )
                pins.digitalWritePin(relayPin, 0)
        }
    };

    //% group="Vibration Motor"
    export namespace VibrationMotor {
        let motorPin : DigitalPin = null;
        //% blockId=turnOnVibrationMotor block="turn on vibration motor at pin=%p"
        //% group="Vibration Motor"
        export function turnOnVibrationMotor(p: DigitalPin) : void {
            motorPin = p
            pins.digitalWritePin(p,1)
        }

        //% blockId=turnOnVibrationMotorAndTurnOff block="Turn on vibration motor second=%second at pin=%p then turn off"
        //% group="Vibration Motor"
        export function turnOnVibrationMotorAndTurnOff(second: number, p: DigitalPin): void {
            pins.digitalWritePin(p,1)
            basic.pause(second*1000)
            pins.digitalWritePin(p, 0)
        }

        //% blockId=turnOffVibrationMotor block="Turn off vibration motor"
        //% group="Vibration Motor"
        export function turnOffVibrationMotor() : void {
            if( motorPin )
                pins.digitalWritePin(motorPin, 0)
        }
    };
}
