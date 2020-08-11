cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.debug = true;
        this.enablePhysics();
        this.enableCollisions();
        cc.debug.setDisplayStats(false);
    },

    start () {

    },

    // update (dt) {},

    enablePhysics() {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
    },

    enableCollisions() {
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
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
