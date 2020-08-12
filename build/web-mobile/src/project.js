window.__require=function t(i,e,o){function n(r,c){if(!e[r]){if(!i[r]){var a=r.split("/");if(a=a[a.length-1],!i[a]){var l="function"==typeof __require&&__require;if(!c&&l)return l(a,!0);if(s)return s(a,!0);throw new Error("Cannot find module '"+r+"'")}r=a}var p=e[r]={exports:{}};i[r][0].call(p.exports,function(t){return n(i[r][1][t]||t)},p,p.exports,t,i,e,o)}return e[r].exports}for(var s="function"==typeof __require&&__require,r=0;r<o.length;r++)n(o[r]);return n}({game:[function(t,i,e){"use strict";cc._RF.push(i,"79cffwSCSRK5pJ0N7g6kaGf","game"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.debug=!0,this.enablePhysics(),this.enableCollisions(),cc.debug.setDisplayStats(!1)},start:function(){},enablePhysics:function(){cc.director.getPhysicsManager().enabled=!0},enableCollisions:function(){cc.director.getCollisionManager().enabled=!0},toggleDebug:function(){cc.director.getPhysicsManager().debugDrawFlags=this.debug,cc.director.getCollisionManager().enabledDebugDraw=this.debug,this.debug=!this.debug},restart:function(){cc.game.restart()}}),cc._RF.pop()},{}],hero:[function(t,i,e){"use strict";cc._RF.push(i,"e23adC6l31JQq9tCd8oP5aV","hero"),cc.Class({extends:cc.Component,properties:{wallCollider:{default:null,type:cc.Node},platformCollider:{default:null,type:cc.Node},enemyCollision:{default:null,type:cc.Node},trapCollision:{default:null,type:cc.Node},spriteJump:{default:null,type:cc.SpriteFrame},spriteFall:{default:null,type:cc.SpriteFrame},walkSpeed:0,jumpForce:0},onLoad:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.jump,this),this.node.parent.on(cc.Node.EventType.TOUCH_START,this.jump,this),this.rigidBody=this.node.getComponent(cc.RigidBody),this.spriteNode=this.node.children[0],this.sprite=this.spriteNode.getComponent(cc.Sprite),this.animation=this.spriteNode.getComponent(cc.Animation),this.direction=1,this.touchingPlatform=!1,this.alive=!0},start:function(){},jump:function(){this.touchingPlatform&&this.rigidBody.applyForceToCenter(cc.v2(0,this.jumpForce),!0)},update:function(t){this.alive&&(this.rigidBody.applyForceToCenter(cc.v2(this.direction*this.walkSpeed,0),!0),this.rigidBody.linearVelocity.y>0?(this.walkSpeed=50,this.touchingPlatform||(this.animation.stop(),this.sprite.spriteFrame=this.spriteJump)):this.rigidBody.linearVelocity.y<0?(this.walkSpeed=0,this.animation.stop(),this.sprite.spriteFrame=this.spriteFall):(this.walkSpeed=100,this.animation.getAnimationState("running").isPlaying||this.animation.start("running")))},onBeginContact:function(t,i,e){e.node.group===this.wallCollider.group&&(this.direction*=-1,this.spriteNode.scaleX=this.direction,this.walkSpeed=300),e.node.group===this.platformCollider.group&&(this.touchingPlatform=!0)},onEndContact:function(t,i,e){e.node.group===this.platformCollider.group&&(this.touchingPlatform=!1)},onCollisionEnter:function(t,i){t.node.group!==this.enemyCollision.group&&t.node.group!==this.trapCollision.group||this.death()},death:function(){var t=this;this.rigidBody.type=cc.RigidBodyType.Static,this.alive=!1,this.animation.getAnimationState("hitting").play(),this.animation.getAnimationState("hitting").onStop=function(){t.animation.stop(),t.sprite.spriteFrame=null}}}),cc._RF.pop()},{}],platform:[function(t,i,e){"use strict";cc._RF.push(i,"bfbd514YLFF8ZrDZyHc9pNv","platform"),cc.Class({extends:cc.Component,properties:{hero:{default:null,type:cc.Node}},onLoad:function(){this.heroDiffY=264,this.physicsBox=this.node.getComponent(cc.PhysicsBoxCollider)},start:function(){},update:function(t){var i=this.hero.y+this.heroDiffY;this.node.y<i?this.physicsBox.enabled=!0:this.physicsBox.enabled=!1}}),cc._RF.pop()},{}]},{},["game","hero","platform"]);