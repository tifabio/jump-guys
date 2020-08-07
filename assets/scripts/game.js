cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.debug = true;
        this.enablePhysics();
        cc.debug.setDisplayStats(false);
    },

    start () {

    },

    // update (dt) {},

    enablePhysics() {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
    },

    toggleDebug() {
        cc.director.getPhysicsManager().debugDrawFlags = this.debug;
        cc.director.getCollisionManager().enabledDebugDraw = this.debug;
        this.debug = !this.debug
    },

    restart() {
        cc.game.restart();
    }
});
