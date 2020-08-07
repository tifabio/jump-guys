window.__require=function t(e,i,o){function n(s,c){if(!i[s]){if(!e[s]){var a=s.split("/");if(a=a[a.length-1],!e[a]){var p="function"==typeof __require&&__require;if(!c&&p)return p(a,!0);if(r)return r(a,!0);throw new Error("Cannot find module '"+s+"'")}s=a}var h=i[s]={exports:{}};e[s][0].call(h.exports,function(t){return n(e[s][1][t]||t)},h,h.exports,t,e,i,o)}return i[s].exports}for(var r="function"==typeof __require&&__require,s=0;s<o.length;s++)n(o[s]);return n}({game:[function(t,e,i){"use strict";cc._RF.push(e,"79cffwSCSRK5pJ0N7g6kaGf","game"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.debug=!0,this.enablePhysics(),cc.debug.setDisplayStats(!1)},start:function(){},enablePhysics:function(){cc.director.getPhysicsManager().enabled=!0},toggleDebug:function(){cc.director.getPhysicsManager().debugDrawFlags=this.debug,cc.director.getCollisionManager().enabledDebugDraw=this.debug,this.debug=!this.debug},restart:function(){cc.game.restart()}}),cc._RF.pop()},{}],hero:[function(t,e,i){"use strict";cc._RF.push(e,"e23adC6l31JQq9tCd8oP5aV","hero"),cc.Class({extends:cc.Component,properties:{wallCollider:{default:null,type:cc.Node},platformCollider:{default:null,type:cc.Node},spriteJump:{default:null,type:cc.SpriteFrame},spriteFall:{default:null,type:cc.SpriteFrame},walkSpeed:0,jumpForce:0,direction:1,touchingPlatform:!1},onLoad:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.jump,this),this.node.parent.on(cc.Node.EventType.TOUCH_START,this.jump,this),this.rigidBody=this.node.getComponent(cc.RigidBody),this.spriteNode=this.node.children[0],this.sprite=this.spriteNode.getComponent(cc.Sprite),this.animation=this.spriteNode.getComponent(cc.Animation)},start:function(){},jump:function(){this.touchingPlatform&&this.rigidBody.applyForceToCenter(cc.v2(0,this.jumpForce),!0)},update:function(t){this.rigidBody.applyForceToCenter(cc.v2(this.direction*this.walkSpeed,0),!0),this.rigidBody.linearVelocity.y>0?(this.walkSpeed=50,this.touchingPlatform||(this.animation.stop(),this.sprite.spriteFrame=this.spriteJump)):this.rigidBody.linearVelocity.y<0?(this.walkSpeed=0,this.animation.stop(),this.sprite.spriteFrame=this.spriteFall):(this.walkSpeed=100,this.animation.getAnimationState("running").isPlaying||this.animation.start("running"))},onBeginContact:function(t,e,i){i.node.group===this.wallCollider.group&&(this.direction*=-1,this.spriteNode.scaleX=this.direction,this.walkSpeed=100),i.node.group===this.platformCollider.group&&(this.touchingPlatform=!0)},onEndContact:function(t,e,i){i.node.group===this.platformCollider.group&&(this.touchingPlatform=!1)}}),cc._RF.pop()},{}],platform:[function(t,e,i){"use strict";cc._RF.push(e,"bfbd514YLFF8ZrDZyHc9pNv","platform"),cc.Class({extends:cc.Component,properties:{hero:{default:null,type:cc.Node}},onLoad:function(){this.heroDiffY=224,this.physicsBox=this.node.getComponent(cc.PhysicsBoxCollider)},start:function(){},update:function(t){var e=this.hero.y+this.heroDiffY;this.node.y<e?this.physicsBox.enabled=!0:this.physicsBox.enabled=!1}}),cc._RF.pop()},{}]},{},["game","hero","platform"]);