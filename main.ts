 /**
 * AIMaker STEM Sensors
 */
//% color=190 weight=100 icon="\uf1ec" block="AIMaker: digital sensors"
//% groups=['Shake Sensor','Water Pump','Fan', 'Button','LED','Reed Switch','Passive Infrared Sensor','Relay','Vibration Motor','JoyStick','others']

namespace aimakerdigitalsensors
{
 /**
 * AIMaker STEM Sensors
 */
// color=190 weight=100 icon="\uf1ec" block="AIMaker: digital sensors"
// groups=['Shake Sensor','Water Pump','Fan', 'Button','LED','Reed Switch','Passive Infrared Sensor','Relay','Vibration Motor','Joystick','others']

    //% group="Shake Sensor"
    export namespace Shake
    {
        let shakePin: DigitalPin = null;
        let onShakeTestEventHandlerTrue: () => void
        let onShakeTestEventHandlerFalse: () => void
        
        //% blockId=shakeSensor block="Shake sensor at pin=%p"
        //% group="Shake Sensor"
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
        //% blockId=digitalshake_on_shake_event block="When sensor detects shaking %shake" 
        //% group="Shake Sensor"
        export function onShakeEvent(shake: boolean, cb: () => void) {
            if( shake )
                onShakeTestEventHandlerTrue = cb
            else
                onShakeTestEventHandlerFalse = cb
        }
    };

    //% group="Water Pump"
    export namespace DigitalSwitch {
        let dsPin : DigitalPin = null;
        //% blockId=turnOn block="Switch on pin=%p"
        //% group="Water Pump"
        export function turnOn(p: DigitalPin) : void {
            dsPin = p
            pins.digitalWritePin(p,1)
        }

        //% blockId=turnOnAndOff block="Switch on for %second second at pin=%p then switch off"
        //% group="Water Pump"
        export function turnOnAndOff(second: number, p: DigitalPin): void {
            pins.digitalWritePin(p,1)
            basic.pause(second*1000)
            pins.digitalWritePin(p, 0)
        }

        //% blockId=turnOff block="Switch off "
        //% group="Water Pump"
        export function turnOff() : void {
            if( dsPin )
                pins.digitalWritePin(dsPin, 0)
        }
    };

    //% group="Fan"
    export namespace FanModule {
        let fanPin : DigitalPin = null;
        //% blockId=runFan block="Run fan at pin=%p"
        //% group="Fan"
        export function runFan(p: DigitalPin) : void {
            fanPin = p
            pins.digitalWritePin(p,1)
        }

        //% blockId=runFanAndStop block="Run fan for %second second at pin=%p then stop"
        //% group="Fan"
        export function runFanAndStop(second: number, p: DigitalPin): void {
            pins.digitalWritePin(p,1)
            basic.pause(second*1000)
            pins.digitalWritePin(p, 0)
        }

        //% blockId=stopFan block="Stop fan"
        //% group="Fan"
        export function stopFan() : void {
            if( fanPin )
                pins.digitalWritePin(fanPin, 0)
        }
    };

    //% group="Button"
    export namespace KeyBoard {
        let keyboardPin: DigitalPin = null
        let onKeyBoardEventHandlerTrue: () => void
        let onKeyBoardEventHandlerFalse: () => void

        //% blockId=isKeyboardPressed block="Button is pressed"
        //% group="Button"
        export function isKeyboardPressed() : boolean {
            if( keyboardPin )
                return (0 == pins.digitalReadPin(keyboardPin))
            return false
        }
        //% blockId=keyBoardSensor block="Button at pin=%p"
        //% group="Button"
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
        //% blockId=onPressedEvent block="Button is pressed=%pressed event" 
        //% group="Button"
        export function onPressedEvent(pressed: boolean, cb: () => void) {
            if( pressed )
                onKeyBoardEventHandlerTrue = cb
            else
                onKeyBoardEventHandlerFalse = cb
        }      
    };

    //% group="LED"
    export namespace LEDModule {
        let ledPin : DigitalPin = null;
        //% blockId=turnOnLED block="Turn on LED at pin=%p"
        //% group="LED"
        export function turnOnLED(p: DigitalPin) : void {
            ledPin = p
            pins.digitalWritePin(p,1)
        }

        //% blockId=turnOnLEDAndTurnOff block="Turn on LED second=%second at pin=%p then turn off"
        //% group="LED"
        export function turnOnLEDAndTurnOff(second: number, p: DigitalPin): void {
            pins.digitalWritePin(p,1)
            basic.pause(second*1000)
            pins.digitalWritePin(p, 0)
        }

        //% blockId=turnOffLED block="Turn off LED"
        //% group="LED"
        export function turnOffLED() : void {
            if( ledPin )
                pins.digitalWritePin(ledPin, 0)
        }
    };

    //% group="Reed Switch"
    export namespace Magnetic {
        let magneticPin:DigitalPin = null;
        let onMagneticEventHandlerTrue: () => void
        let onMagneticEventHandlerFalse: () => void

        //% blockId=isMagnetic block="Magnetism is detected"
        //% group="Reed Switch"
        export function isMagnetic() : boolean {
            if( magneticPin )
                return (0 == pins.digitalReadPin(magneticPin))
            return false
        }

        //% blockId=magneticSensor block="Magnetic sensor at pin=%p"
        //% group="Reed Switch"
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
        //% blockId=onMagneticEvent block="When magnetism detected is %magnetic event" 
        //% group="Reed Switch"
        export function onMagneticEvent(magnetic: boolean, cb: () => void) {
            if( magnetic )
                onMagneticEventHandlerTrue = cb
            else
                onMagneticEventHandlerFalse = cb
        }
    };

    //% group="Passive Infrared Sensor"
    export namespace PIR {
        let pirPin: DigitalPin = null;
        let onPIREventHandlerTrue: () => void;
        let onPIREventHandlerFalse: () => void;

         //% blockId=isHasPerson block="Person exists"
        //% group="Passive Infrared Sensor"
        export function isHasPerson() : boolean {
            if( pirPin )
                return (1 == pins.digitalReadPin(pirPin))
            return false
        }

        //% blockId=pirSensor block="PIR sensor at pin=%p"
        //% group="Passive Infrared Sensor"
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
        //% blockId=onPIREvent block="When person exists=%hasPerson event" 
        //% group="Passive Infrared Sensor"
        export function onPIREvent(hasPerson:boolean, cb: () => void) {
            if( hasPerson )
                onPIREventHandlerTrue = cb
            else
                onPIREventHandlerFalse = cb
        }
    };


    //% group="Relay"
    export namespace RelayModule {
        let relayPin : DigitalPin = null;
        //% blockId=turnOnRelay block="Turn on relay at pin=%p"
        //% group="Relay"
        export function turnOnRelay(p: DigitalPin) : void {
            relayPin = p
            pins.digitalWritePin(p,0)
        }

        //% blockId=turnOnRelayAndTurnOff block="Turn on relay for %second second at pin=%p then turn off"
        //% group="Relay"
        export function turnOnRelayAndTurnOff(second: number, p: DigitalPin): void {
            pins.digitalWritePin(p,0)
            basic.pause(second*1000)
            pins.digitalWritePin(p, 1)
        }

        //% blockId=turnOffRelay block="Turn off relay"
        //% group="Relay"
        export function turnOffRelay() : void {
            if( relayPin )
                pins.digitalWritePin(relayPin, 1)
        }
    };

    //% group="Vibration Motor"
    export namespace VibrationMotor {
        let motorPin : DigitalPin = null;
        //% blockId=turnOnVibrationMotor block="Turn on vibration motor at pin=%p"
        //% group="Vibration Motor"
        export function turnOnVibrationMotor(p: DigitalPin) : void {
            motorPin = p
            pins.digitalWritePin(p,1)
        }

        //% blockId=turnOnVibrationMotorAndTurnOff block="Turn on vibration motor for %second second at pin=%p then turn off"
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
     
 //% group="Joystick"
  export namespace JoyStick_Single {
    let kPin: DigitalPin = null
    let xPin: AnalogPin = null
    let yPin: AnalogPin = null
    let onKPressedEventHandlerTrue: () => void;
    let onKPressedEventHandlerFalse: () => void;
    
    //% blockId=readYValue block="Read JoyStick Y Value"
    export function readYValue(): number {
        return pins.analogReadPin(yPin)
    }
    
    //% blockId=readXValue block="Read JoyStick X Value"
    export function readXValue(): number {
        return pins.analogReadPin(xPin)
    }

    //% blockId=isKPressed block="Is JoyStick K pressed"
    export function isKPressed(): boolean {
        if( 0 === pins.digitalReadPin(kPin) ) {
            return true
        }
        return false;
    }
    
    /**
     * Registers code to run when k buton pressed.
     */
    //% blockId=onShakeEvent block="On K button at pin=%k pressed=%pressed event" 
    export function onShakeEvent(k: DigitalPin,pressed: boolean, cb: () => void) {
        kPin = k
        if( pressed )
            onKPressedEventHandlerTrue = cb
        else
            onKPressedEventHandlerFalse = cb
        
        pins.setPull(kPin, PinPullMode.PullNone)
        
        pins.onPulsed(kPin, PulseValue.High, function () {
            if( onKPressedEventHandlerTrue )
                onKPressedEventHandlerTrue()
        })
        pins.onPulsed(kPin, PulseValue.Low, function () {
            if( onKPressedEventHandlerFalse )
                onKPressedEventHandlerFalse()
        })
    }

    //% blockId=connectJoyStick block="Connect JoyStick at K=%k|X=%x|y=%y"
    export function connectJoyStick(k: DigitalPin, x: AnalogPin, y: AnalogPin): void {
        kPin = k
        xPin = x
        yPin = y
       
    }
  };
}
