 /**
 * Hanshin STEM Sensors
 */
//% color=190 weight=100 icon="\uf1ec" block="HANSHIN: digital sensors"
//% groups=['Digital Shake','Digital Switch','Fan Module', 'KeyBoard','LED Module','Magnetic','PIR','Relay Module','Vibration Motor','others']

namespace HanshinDigitalSensors
{
 /**
 * Hanshin STEM Sensors
 */
// color=190 weight=100 icon="\uf1ec" block="Hanshin STEM digital sensors"
// groups=['Digital Shake','Digital Switch','Fan Module', 'KeyBoard','LED Module','Magnetic','PIR','Relay Module','Vibration Motor','others']

    //% group="Digital Shake"
    export namespace DigitalShake
    {
        let shakePin: DigitalPin = null;
        let onShakeTestEventHandlerTrue: () => void
        let onShakeTestEventHandlerFalse: () => void
        
        //% blockId=shakeSensor1 block="Shake sensor1 at pin=%p"
        //% group="Digital Shake1"
        export function shakeSensor(p: DigitalPin) : void {
            shakePin = p
            pins.setPull(p, PinPullMode.PullNone)

            pins.onPulsed(shakePin, PulseValue.High, function () {
                if( onShakeTestEventHandlerTrue )
                    onShakeTestEventHandlerTrue()
            })
            
            pins.onPulsed(shakePin, PulseValue.Low, function () {
                if( onShakeTestEventHandlerFalse )
                    onShakeTestEventHandlerFalse()
            })
        }
        
        /**
         * Registers code to run when there is a shake.
         */
        //% blockId=digitalshake_on_shake_event block="on shake event %shake" 
        //% group="Digital Shake"
        export function onShakeEvent(shake: boolean, cb: () => void) {
            if( shake )
                onShakeTestEventHandlerTrue = cb
            else
                onShakeTestEventHandlerFalse = cb
        }
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
        let keyboardPin: DigitalPin = null
        let onKeyBoardEventHandlerTrue: () => void
        let onKeyBoardEventHandlerFalse: () => void

        //% blockId=isKeyboardPressed block="Is keyboard pressed"
        //% group="KeyBoard"
        export function isKeyboardPressed() : boolean {
            if( keyboardPin )
                return (0 == pins.digitalReadPin(keyboardPin))
            return false
        }
        //% blockId=keyBoardSensor block="KeyBoard sensor at pin=%p"
        //% group="KeyBoard"
        export function  keyBoardSensor(p: DigitalPin) : void {
            pins.setPull(p, PinPullMode.PullNone)
            keyboardPin = p
            pins.onPulsed(p, PulseValue.High, function () {
                if( onKeyBoardEventHandlerTrue )
                    onKeyBoardEventHandlerTrue()
            })
            pins.onPulsed(p, PulseValue.Low, function () {
                if( onKeyBoardEventHandlerFalse )
                    onKeyBoardEventHandlerFalse()
            })
        }

        /**
         * Registers code to run when keyboard is pressed.
         */
        //% blockId=onPressedEvent block="on keyboard pressed=%pressed event" 
        //% group="KeyBoard"
        export function onPressedEvent(pressed: boolean, cb: () => void) {
            if( pressed )
                onKeyBoardEventHandlerTrue = cb
            else
                onKeyBoardEventHandlerFalse = cb
        }      
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

    //% group="Magnetic"
    export namespace Magnetic {
        let magneticPin:DigitalPin = null;
        let onMagneticEventHandlerTrue: () => void
        let onMagneticEventHandlerFalse: () => void

        //% blockId=isMagnetic block="Is magnetic"
        //% group="Magnetic"
        export function isMagnetic() : boolean {
            if( magneticPin )
                return (0 == pins.digitalReadPin(magneticPin))
            return false
        }

        //% blockId=magneticSensor block="Magnetic sensor at pin=%p"
        //% group="Magnetic"
        export function  magneticSensor(p: DigitalPin) : void {
            magneticPin = p
            pins.setPull(p, PinPullMode.PullNone)
            pins.onPulsed(magneticPin, PulseValue.High, function () {
                if( onMagneticEventHandlerTrue )
                    onMagneticEventHandlerTrue()
            })
            pins.onPulsed(magneticPin, PulseValue.Low, function () {
                if( onMagneticEventHandlerFalse )
                    onMagneticEventHandlerFalse()
            })
        }

        /**
         * Registers code to run when there is magnetic.
         */
        //% blockId=onMagneticEvent block="on magnetic %magnetic event" 
        //% group="Magnetic"
        export function onMagneticEvent(magnetic: boolean, cb: () => void) {
            if( magnetic )
                onMagneticEventHandlerTrue = cb
            else
                onMagneticEventHandlerFalse = cb
        }
    };

    //% group="PIR"
    export namespace PIR {
        let pirPin: DigitalPin = null;
        let onPIREventHandlerTrue: () => void;
        let onPIREventHandlerFalse: () => void;

         //% blockId=isHasPerson block="Is has person"
        //% group="PIR"
        export function isHasPerson() : boolean {
            if( pirPin )
                return (1 == pins.digitalReadPin(pirPin))
            return false
        }

        //% blockId=pirSensor block="PIR sensor at pin=%p"
        //% group="PIR"
        export function pirSensor(p: DigitalPin) : void {
            pirPin = p
            pins.setPull(p, PinPullMode.PullNone)
            
            pins.onPulsed(pirPin, PulseValue.High, function () {
                if( onPIREventHandlerFalse )
                    onPIREventHandlerFalse()
            })
            pins.onPulsed(pirPin, PulseValue.Low, function () {
                if( onPIREventHandlerTrue )
                    onPIREventHandlerTrue()
            })            
        }

        /**
         * Registers code to run when there is person.
         */
        //% blockId=onPIREvent block="on pir has person=%hasPerson event" 
        //% group="PIR"
        export function onPIREvent(hasPerson:boolean, cb: () => void) {
            if( hasPerson )
                onPIREventHandlerTrue = cb
            else
                onPIREventHandlerFalse = cb
        }
    };


    //% group="Relay Module"
    export namespace RelayModule {
        let relayPin : DigitalPin = null;
        //% blockId=turnOnRelay block="turn on relay at pin=%p"
        //% group="Relay Module"
        export function turnOnRelay(p: DigitalPin) : void {
            relayPin = p
            pins.digitalWritePin(p,0)
        }

        //% blockId=turnOnRelayAndTurnOff block="Turn on relay second=%second at pin=%p then turn off"
        //% group="Relay Module"
        export function turnOnRelayAndTurnOff(second: number, p: DigitalPin): void {
            pins.digitalWritePin(p,0)
            basic.pause(second*1000)
            pins.digitalWritePin(p, 1)
        }

        //% blockId=turnOffRelay block="Turn off relay"
        //% group="Relay Module"
        export function turnOffRelay() : void {
            if( relayPin )
                pins.digitalWritePin(relayPin, 1)
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
