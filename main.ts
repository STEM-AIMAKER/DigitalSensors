 /**
 * Hanshin STEM Sensors
 */
//% color=190 weight=100 icon="\uf1ec" block="Hanshin STEM digital sensors"
//% groups=['Digital Shake','Fan Module', 'KeyBoard','LED Module','Megnetic','PIR','Relay Module','others']
namespace HanshinDigitalSensors
{
 /**
 * Hanshin STEM Sensors
 */
// color=190 weight=100 icon="\uf1ec" block="Hanshin STEM digital sensors"
// groups=['Digital Shake','Fan Module', 'KeyBoard','LED Module','Megnetic','PIR','Relay Module','others']

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
    }

}
