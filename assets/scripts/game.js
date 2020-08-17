let globals = require('globals');

cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            default: null,
            type: cc.Node
        },
        score: {
            default: null,
            type: cc.Label
        }
    },

    onLoad () {
        this.debug = true;
        this.enablePhysics();
        this.enableCollisions();
        cc.debug.setDisplayStats(false);

        this.hero.on('score', () => {
            globals.score += (globals.score < 99) ? 1 : 0;
            this.score.string = globals.score > 9 ? `${globals.score}` : `0${globals.score}`;
        });

        this.score.string = globals.score > 9 ? `${globals.score}` : `0${globals.score}`;
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
