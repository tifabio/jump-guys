cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.enablePhysics();

        this.enableDebug(false);
    },

    start () {

    },

    // update (dt) {},

    enablePhysics() {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
    },

    enableDebug(param) {
        if(param) {
            cc.debug.setDisplayStats(false);
            cc.director.getPhysicsManager().debugDrawFlags = true;
            cc.director.getCollisionManager().enabledDebugDraw = true;
        } else {
            cc.debug.setDisplayStats(false);
        }
    }
});
