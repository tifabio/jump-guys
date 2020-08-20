cc.Class({
    extends: cc.Component,

    properties: {
        Hero: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            cc.log('aqui'); 
        })
    },

    start () {

    },

    update (dt) {
        let heroPosition = this.Hero.getPosition();
        let cameraPosition = this.node.getPosition();
        cameraPosition.lerp(heroPosition, 0.1, cameraPosition);
        if(cameraPosition.y > 0) {
            this.node.setPosition(0, cameraPosition.y);
        }
    },
});