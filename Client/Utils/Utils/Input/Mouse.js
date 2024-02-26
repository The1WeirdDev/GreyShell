import Display from "/utils/Webgl/Display/Display.js";
import UI from "/utils/Webgl/Display/UI/UI.js"

export default class Mouse{
    static Init(){
        Mouse.buttons = new Uint8Array(8);
        Mouse.buttons.fill(0, 0, Mouse.buttons.length);
        Mouse.buttons_to_update = [];

        Mouse.position = {x:0, y:0};
        Mouse.normalized_position = {x:0, y:0};
        Mouse.last_position = {x:0, y:0};
        Mouse.delta = {x:0, y:0};
    }

    static LateUpdate(){
        for(var i = 0; i < Mouse.buttons_to_update.length; i++){
            var button = Mouse.buttons_to_update[i].button;

            if(Mouse.buttons[button] > 1)
                Mouse.buttons[button] = 1;
        }
        
        Mouse.delta.x = Mouse.position.x - Mouse.last_position.x;
        Mouse.delta.y = Mouse.position.y - Mouse.last_position.y;
        Mouse.last_position.x = Mouse.position.x;
        Mouse.last_position.y = Mouse.position.y;
    }

    static OnMouseMove(e){
        let rect = Display.GetBoundingClientRect();
        Mouse.position.x = e.clientX - rect.left;
        Mouse.position.y = rect.height - (e.clientY - rect.top) - 1;

        Mouse.normalized_position = {x:(Mouse.position.x / rect.width) * 2 - 1, y:(Mouse.position.y / rect.height) * 2 - 1}
    }
    static OnMouseClick(e){
        var button = e.button;

        if(button < 0 || button >= 8)
            return;
        
        Mouse.buttons[button] = 2;
        Mouse.buttons_to_update.push({"button":button});
        UI.OnMouseButtonClick(button);
    }

    static OnMouseRelease(e){
        var button = e.button;

        if(button < 0 || button >= 8)
            return;
        Mouse.buttons[button] = 0;
    }

    static IsButtonPressed(button){
        if(button < 0 || button >= 8)
            return false;
        return Mouse.buttons[button] > 1;
    }
    static IsButtonDown(button){
        if(button < 0 || button >= 8)
            return false;
        return Mouse.buttons[button] > 0;
    }
}