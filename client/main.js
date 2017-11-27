webpackJsonp([0],{11:function(t,e,n){"use strict";e.a={_COLORS:[255,65280,16711680,16776960,16711935],NONE:-1,BLUE:0,GREEN:1,RED:2,YELLOW:3,MAGENTA:4}},13:function(t,e,n){"use strict";var a=n(11),i=function(){function t(){this.team=a.a.NONE}return Object.defineProperty(t.prototype,"x",{get:function(){return this.geo.x},set:function(t){this.geo.x=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this.geo.y},set:function(t){this.geo.y=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rotation",{get:function(){return this.geo.rotation},set:function(t){this.geo.rotation=t},enumerable:!0,configurable:!0}),t.prototype.setChildVisible=function(t,e){this.geo.graphics.getChildAt(t).visible=e},t.prototype.assignTeamColor=function(){this.geo.graphics.currentPath.lineColor=a.a._COLORS[this.team]},t.prototype.renderHit=function(){this.hitTime>0?(this.hitTime--,this.geo.graphics.alpha=this.hitTime%2):0===this.hitTime&&(this.hitTime=-1,this.geo.graphics.alpha=1)},t}();e.a=i},148:function(t,e,n){"use strict";function a(){var t=u===p.Keyboard?r.a.getEvents():o.a.getEvents();if(i&&"Fighter"===i.type){var e=i.isDockedPlanet;i.hp>0?(e||("number"==typeof t.analogAngle?i.rotation=t.analogAngle:t.TURN_LEFT?i.rotation-=l:t.TURN_RIGHT&&(i.rotation+=l)),i.isShooting=t.SHOOT,t.ACCELERATE?(e&&i.undockPlanet(),i.flameOn(),i.accelerate(h)):i.flameOff()):i=void 0}t.RESTART_GAME&&location.reload()}var i,o=n(310),r=n(311),c=function(){return i},s=function(t){return i=t},l=.05,h=.2,p={Keyboard:0,GamePad:0},u=localStorage.getItem("input.device")||p.Keyboard;e.a={process:a,getFocalPoint:c,setFocalPoint:s}},149:function(t,e,n){"use strict";function a(t){this.isDockedPlanet=!0,this.dx=0,this.dy=0,this.rotation=r.a.getAngleFromTo(t,this),this.planet=t,t.isOccupied()||(t.team=this.team,t.updateFlagColor())}function i(){this.isDockedPlanet=!1,this.planet=void 0}function o(t){t.isDockedPlanet&&(t.x=Math.cos(t.rotation)*c+t.planet.x,t.y=Math.sin(t.rotation)*c+t.planet.y)}var r=n(6),c=105,s={isDockedPlanet:!1,dockPlanet:a,undockPlanet:i};e.a={componentFlag:"canDockPlanet",DEFAULTS:s,process:o}},150:function(t,e,n){"use strict";function a(t){this.isOrbitingPlanet=!0,this.dx=0,this.dy=0,this.orbitRotation=r.a.getAngleFromTo(t,this),this.rotation=this.orbitRotation+s,this.planet=t,this.target=void 0,this.flameOff&&this.flameOff()}function i(){this.isOrbitingPlanet=!1,this.planet=void 0,this.flameOn&&this.flameOn()}function o(t){t.isOrbitingPlanet&&t.planet&&("SpacePort"===t.type?t.rotation=r.a.getAngleFromTo(t.planet,t):"Freighter"===t.type&&(t.rotation+=t.D_ROTATION),t.orbitRotation+=t.D_ROTATION,t.x=Math.cos(t.orbitRotation)*t.orbitDistance+t.planet.x,t.y=Math.sin(t.orbitRotation)*t.orbitDistance+t.planet.y)}var r=n(6),c={enterPlanetOrbit:a,exitPlanetOrbit:i,isOrbitingPlanet:!0,D_ROTATION:1e-4,orbitDistance:105,orbitRotation:0},s=.5*Math.PI;e.a={componentFlag:"canOrbitPlanet",DEFAULTS:c,process:o}},151:function(t,e,n){"use strict";var a=n(9),i=n(13),o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function a(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),r={body:{type:"polygon",lineStyle:{width:1,color:255,alpha:1},path:[-2,2,-4,0,-2,-2,-4,-4,-4,-6,2,-4,0,-2,8,0,0,2,2,4,-4,6,-4,4,-2,2],collisionPath:[-4,-6,8,0,-4,6]},flame1:{type:"polygon",lineStyle:{width:1,color:65535,alpha:1},path:[-4,-4,-8,-5,-4,-6]},flame2:{type:"polygon",lineStyle:{width:1,color:65535,alpha:1},path:[-4,4,-8,5,-4,6]}},c=function(t){function e(e){var n=t.call(this)||this;return n.type="Fighter",n.geo=Object(a.a)(r.body),n.mass=10,n.hp=6,n.maxHp=6,n.dx=0,n.dy=0,n.rotation=0,n.canExplode=!0,n.cannonGetMuzzleFuncs=[function(t){return t.collision.calcPoints[1]}],n.canLimitSpeed=!0,n.canMoveLinearly=!0,n.canAccelerate=!0,n.canDockPlanet=!0,n.flameOn=function(){n.setChildVisible(0,!0),n.setChildVisible(1,!0)},n.flameOff=function(){n.setChildVisible(0,!1),n.setChildVisible(1,!1)},Object.assign(n,e),n.assignTeamColor(),n.geo.graphics.addChild(Object(a.a)(r.flame1).graphics,Object(a.a)(r.flame2).graphics),n}return o(e,t),e}(i.a);e.a=c},152:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){var e=n(154);window.addEventListener("DOMContentLoaded",e.a);var a=t;a&&a.hot&&a.hot.accept("./client/index",function(){Object(e.c)(),Object(e.b)()})}.call(e,n(153)(t))},154:function(t,e,n){"use strict";function a(){Object(S.a)(),u.a.process(),y.a.updateAll(),Object(m.a)(),d.a.update(),g.a.update(),y.a.prepareNext()}function i(){var t=Date.now(),e=t-l;if(a(),e>T){var n=u.a.getFocalPoint();g.a.setOrigin(n),p.a.centerOn(n),p.a.render(),l=t-e%T}s=requestAnimationFrame(i)}function o(){l=Date.now(),i()}function r(){cancelAnimationFrame(s)}function c(){f.b.init(),g.a.init(),h.a.load().then(o)}e.b=o,e.c=r,e.a=c;var s,l,h=n(155),p=n(26),u=n(148),f=n(67),y=n(6),d=n(347),g=n(348),m=n(349),S=n(350),T=1e3/60},155:function(t,e,n){"use strict";function a(t){var e=[],n=[];return t.folder("sounds/").forEach(function(t,a){e.push(a.name.replace(h,"")),n.push(a.async("arraybuffer"))}),Promise.all(n).then(function(t){return t.forEach(function(t,n){return Object(o.a)({name:e[n],arrayBuffer:t})})})}function i(){return new Promise(function(t,e){l.a.getBinaryContent("assets.zip",function(n,a){n?e(n):t(a)})}).then(function(t){return c.a.loadAsync(t)}).then(function(t){return a(t)})}var o=n(35),r=n(156),c=n.n(r),s=n(208),l=n.n(s),h=/(^sounds\/|\.ogg$)/gi;e.a={load:i}},161:function(t,e){},26:function(t,e,n){"use strict";function a(){c=innerWidth,l=innerHeight,s=c>>1,h=l>>1,r&&r.resize(c,l)}var i=n(27),o=(n.n(i),n(309));i.settings.SCALE_MODE=i.SCALE_MODES.NEAREST;var r,c,s,l,h,p,u;a();var f=new i.Container,y=new i.Container;f.addChild(y),r=new i.WebGLRenderer(c,l),o.a.init(y);var d=function(){return p=u=void 0};document&&window&&(window.addEventListener("DOMContentLoaded",function(){document.body.appendChild(r.view)}),window.addEventListener("resize",function(){a(),d()}));var g=function(t){return f.addChild(t)},m=function(t){return y.addChild(t)},S=function(t){return y.removeChild(t)},T=function(){r.render(f)},_=function(t){if(t){y.x=s-t.x,y.y=h-t.y;var e=t.x-p,n=t.y-u;void 0===p&&void 0===u?o.a.reinit(t):o.a.process(t,e,n),p=t.x,u=t.y}else d()};e.a={addChild:m,removeChild:S,render:T,centerOn:_,addChildToHUD:g}},309:function(t,e,n){"use strict";function a(t,e){var n=e.color,a=e.size,i=e.x,o=e.y,r=new s.Graphics;return r.beginFill(n),r.drawRect(0,0,a,a),r.lineWidth=a,r.endFill(),r.x=i,r.y=o,t.addChild(r),r}function i(t){u=innerWidth>>1,f=innerHeight>>1;var e;for(e=0;e<p.DIM.count;e++)h.push(a(t,p.DIM));for(e=0;e<p.BRIGHT.count;e++)h.push(a(t,p.BRIGHT))}function o(t){u=innerWidth>>1,f=innerHeight>>1,h.forEach(function(e){return{x:t.x+l.a.float(-u,u),y:t.y+l.a.float(-f,f)}})}function r(t,e,n,a){1===t.lineWidth?(e*=p.DIM.speed,n*=p.DIM.speed):(e*=p.BRIGHT.speed,n*=p.BRIGHT.speed),t.x+=e,t.y+=n,t.x<a.x-u?t.x=a.x+u:t.x>a.x+u&&(t.x=a.x-u),t.y<a.y-f?t.y=a.y+f:t.y>a.y+f&&(t.y=a.y-f)}function c(t,e,n){h.forEach(function(a){return r(a,e,n,t)})}var s=n(27),l=(n.n(s),n(34)),h=[],p={BRIGHT:{speed:.01,count:40,size:2,color:16777215,x:0,y:0},DIM:{speed:.3,count:20,size:1,color:16711422,x:0,y:0}},u=innerWidth>>1,f=innerHeight>>1;e.a={init:i,reinit:o,process:c}},310:function(t,e,n){"use strict";function a(t){void 0===t&&(t=0);var e=navigator.getGamepads()[t],n={};if(e){var a=e.axes,c=a[0],s=a[1],l=Math.abs(c)>i,h=Math.abs(s)>i,p=l||h,u=void 0;p&&(l||(c=c>0?o:-o),h||(s=s>0?o:-o),u=Math.atan2(s,c)),n={left:e.axes[0]<-i,right:e.axes[0]>i,up:e.axes[1]<-i,analogAngle:u,button0:e.buttons[0].pressed,button1:e.buttons[1].pressed,button2:e.buttons[2].pressed,button3:e.buttons[3].pressed}}return r(n)}var i=.1,o=1e-6,r=function(t){var e=t.left,n=t.right,a=(t.up,t.analogAngle),i=t.button0,o=t.button1,r=t.button2,c=t.button3;return{TURN_LEFT:Boolean(e),TURN_RIGHT:Boolean(n),ACCELERATE:Boolean(r),SHOOT:Boolean(i),RESTART_GAME:Boolean(o&&c),analogAngle:a}};e.a={getEvents:a}},311:function(t,e,n){"use strict";function a(t){r[o[t.which]]=!1}function i(t){r[o[t.which]]=!0}var o={37:"left_arrow",38:"up_arrow",39:"right_arrow",40:"down_arrow",70:"f",82:"r"},r={left_arrow:!1,right_arrow:!1,up_arrow:!1,down_arrow:!1,f:!1,r:!1};window&&(window.addEventListener("keydown",i),window.addEventListener("keyup",a));var c=function(){return{TURN_LEFT:r.left_arrow,TURN_RIGHT:r.right_arrow,ACCELERATE:r.up_arrow,SHOOT:r.f,RESTART_GAME:r.r}};e.a={getEvents:c}},312:function(t,e,n){"use strict";function a(t){P.forEach(function(e){e.DEFAULTS&&t[e.componentFlag]&&Object.assign(t,e.DEFAULTS)})}function i(t){t.hp>0&&P.forEach(function(e){t[e.componentFlag]&&e.process&&e.process(t)}),t.hp>0?o.a.commit(t):o.a.destroy(t)}var o=n(6),r=n(313),c=n(314),s=n(315),l=n(316),h=n(317),p=n(318),u=n(319),f=n(320),y=n(321),d=n(322),g=n(323),m=n(324),S=n(325),T=n(326),_=n(150),b=n(327),E=n(328),O=n(329),A=n(330),v=n(331),F=n(149),R=n(332),P=[m.a,S.a,l.a,h.a,T.a,_.a,O.a,A.a,F.a,b.a,u.a,p.a,c.a,f.a,y.a,d.a,r.a,E.a,R.a,s.a,v.a,g.a];e.a={init:a,update:i}},313:function(t,e,n){"use strict";function a(t){this.isManufacturing=!0,this.manufactureTime=this.PRODUCT[t].time,this.manufactureType=t}function i(t){if(t.isManufacturing){if(t.planet.pbase&&t.planet.pbase.materialsFinished>=t.PRODUCT[t.manufactureType].cost)if(t.manufactureTime>0)t.manufactureTime--;else{var e={x:t.x+o.a.float(-1,1),y:t.y+o.a.float(-1,1),team:t.team},n=r.a.create(t.manufactureType,e);"Fighter"===t.manufactureType?(t.type,c.a.DEFAULTS.dockPlanet.call(n,t.planet)):"Freighter"===t.manufactureType&&s.a.DEFAULTS.enterPlanetOrbit.call(n,t.planet),t.isManufacturing=!1,t.manufactureType=void 0}}}var o=n(34),r=n(6),c=n(149),s=n(150),l={Freighter:{cost:300,time:120},Fighter:{cost:500,time:90}},h={PRODUCT:l,orderManufacture:a,isManufacturing:!1,manufactureTime:0,manufactureType:void 0};e.a={componentFlag:"canManufacture",DEFAULTS:h,process:i}},314:function(t,e,n){"use strict";function a(t){t.mineTime>0?t.mineTime--:(t.mineTime=t.MINE_TIME,t.planet.materialsRaw+=t.MINE_RATE)}var i={MINE_RATE:25,MINE_TIME:20,mineTime:20};e.a={componentFlag:"canMine",DEFAULTS:i,process:a}},315:function(t,e,n){"use strict";function a(t){t.hp--}e.a={componentFlag:"canMetabolize",process:a}},316:function(t,e,n){"use strict";function a(t){t.isDockedPlanet||(t.x+=t.dx,t.y+=t.dy)}var i={dx:0,dy:0};e.a={componentFlag:"canMoveLinearly",DEFAULTS:i,process:a}},317:function(t,e,n){"use strict";function a(t,e){var n=t.rotation,a=o.a.getAngleFromTo(t,e),i=Math.abs(a-n);return i>Math.PI?n>0?t.rotation+=t.TURN_RATE:t.rotation-=t.TURN_RATE:i>t.TURN_RATE?n>a?t.rotation-=t.TURN_RATE:t.rotation+=t.TURN_RATE:t.rotation=a,n=t.rotation}function i(t){var e=t.target,n=t.DIST_HALT2;if(e){var i=o.a.getDistSquared(t,e);if("Planet"===e.type&&(n=c),i>n){var r=a(t,e);t.x+=Math.cos(r)*t.SPEED,t.y+=Math.sin(r)*t.SPEED,t.flameOn&&t.flameOn()}else"Planet"===e.type&&t.canOrbitPlanet&&t.enterPlanetOrbit(e),t.flameOff&&t.flameOff()}}var o=n(6),r={TURN_RATE:.07,SPEED:2.5,DIST_HALT2:Math.pow(80,2)},c=Math.pow(200,2);e.a={componentFlag:"canMoveToTarget",DEFAULTS:r,process:i}},318:function(t,e,n){"use strict";function a(t){t.harvestTime>0?t.harvestTime--:(t.harvestTime=t.HARVEST_TIME,t.planet.materialsRaw>0&&t.materialsRaw<t.MAX_RAW_MATERIALS&&(t.MAX_RAW_MATERIALS-t.materialsRaw<t.HARVEST_RATE_RAW?(t.planet.materialsRaw=0,t.materialsRaw+=t.MAX_RAW_MATERIALS-t.materialsRaw):(t.planet.materialsRaw-=t.HARVEST_RATE_RAW,t.materialsRaw+=t.HARVEST_RATE_RAW)),t.planet.materialsFinished>0&&t.materialsFinished<t.MAX_FINISHED_MATERIALS&&(t.MAX_FINISHED_MATERIALS-t.materialsFinished<t.HARVEST_RATE_FINISHED?(t.planet.materialsFinished=0,t.materialsFinished+=t.MAX_FINISHED_MATERIALS-t.materialsFinished):(t.planet.materialsFinished-=t.HARVEST_RATE_FINISHED,t.materialsFinished+=t.HARVEST_RATE_FINISHED)))}var i={HARVEST_RATE_RAW:35,HARVEST_RATE_FINISHED:25,HARVEST_TIME:10,harvestTime:0};e.a={componentFlag:"canHarvest",DEFAULTS:i,process:a}},319:function(t,e,n){"use strict";function a(){}var i={MAX_RAW_MATERIALS:3e3,MAX_FINISHED_MATERIALS:2e3,materialsRaw:0,materialsFinished:0};e.a={componentFlag:"canStoreMaterial",DEFAULTS:i,process:a}},320:function(t,e,n){"use strict";function a(t){t.hp<t.maxHp&&t.materialsFinished>t.REPAIR_COST_FINISHED&&t.materialsFinished>0&&(t.repairTime>0?t.repairTime--:(t.hp++,t.materialsFinished-=t.REPAIR_COST_FINISHED,t.repairTime=t.REPAIR_TIME))}var i={REPAIR_COST_FINISHED:25,REPAIR_TIME:30,repairTime:0};e.a={componentFlag:"canRepair",DEFAULTS:i,process:a}},321:function(t,e,n){"use strict";function a(t){t.materialsFinished<t.MAX_FINISHED_MATERIALS?t.materialsRaw>0&&(t.materialsFinished+=t.REFINE_RATE_RAW_TO_FINISHED,t.materialsFinished>t.MAX_FINISHED_MATERIALS&&(t.planet.materialsFinished+=t.materialsFinished-t.MAX_FINISHED_MATERIALS,t.materialsFinished=t.MAX_FINISHED_MATERIALS),t.materialsRaw--):t.materialsRaw>0&&(t.planet.materialsFinished+=t.REFINE_RATE_RAW_TO_FINISHED,t.materialsRaw--)}var i={REFINE_RATE_RAW_TO_FINISHED:.5};e.a={componentFlag:"canRefine",DEFAULTS:i,process:a}},322:function(t,e,n){"use strict";function a(t){if(this.constructionTime>0)this.constructionTime--;else{var e=t.type.toLowerCase(),n=!0;t.prerequisite&&(n=Boolean(this.planet[t.prerequisite.toLowerCase()])),!this.planet[e]&&this.materialsFinished>=t.cost&&n&&("SpacePort"===t.occupation?this.planet[e]=o.a.create(t.type,{spaceport:this.planet.spaceport,team:this.team}):this.planet[e]=o.a.create(t.type,{planet:this.planet,team:this.team}),this.materialsFinished-=t.cost,this.constructionTime=this.CONSTRUCTION_TIME)}}function i(t){t.materialsFinished>0&&c.forEach(a.bind(t))}var o=n(6),r={CONSTRUCTION_TIME:100,constructionTime:100},c=[{type:"PLab",cost:200},{type:"PComm",cost:300},{type:"SpacePort",cost:1e3,prerequisite:"PColony"},{type:"SpaceDock",cost:500,prerequisite:"SpacePort",occupation:"SpacePort"},{type:"SensorArray",cost:500,prerequisite:"SpacePort",occupation:"SpacePort"}];e.a={componentFlag:"canConstruct",DEFAULTS:r,process:i}},323:function(t,e,n){"use strict";function a(){Object(o.b)(this.EXPLOSION_SOUND);for(var t=this.EXPLOSION_FRAGMENTS;t>0;t--)r.a.create("ShotCannonNormal",{x:this.x+c.a.float(-10,10),y:this.y+c.a.float(-10,10),team:r.a.TEAM.NONE,dx:c.a.float(-2,2)+(this.dx||0),dy:c.a.float(-2,2)+(this.dy||0)})}function i(t){t.hp<=0&&a.call(t)}var o=n(35),r=n(6),c=n(34),s={EXPLOSION_FRAGMENTS:6,EXPLOSION_SOUND:"collide",explode:a};e.a={componentFlag:"canExplode",DEFAULTS:s,process:i}},324:function(t,e,n){"use strict";function a(t){t.x=t.planet.x,t.y=t.planet.y}e.a={componentFlag:"canOccupyPlanet",process:a}},325:function(t,e,n){"use strict";function a(t){t.x=t.spaceport.x,t.y=t.spaceport.y,t.rotation=t.spaceport.rotation}e.a={componentFlag:"canOccupySpacePort",process:a}},326:function(t,e,n){"use strict";function a(t){t.orbitRotation+=t.D_ROTATION,t.x=Math.cos(t.orbitRotation)*t.orbitDistance+t.star.x,t.y=Math.sin(t.orbitRotation)*t.orbitDistance+t.star.y}var i={D_ROTATION:1e-4,orbitDistance:1800,orbitRotation:0};e.a={componentFlag:"canOrbitStar",DEFAULTS:i,process:a}},327:function(t,e,n){"use strict";function a(){}var i={damageHp:1};e.a={componentFlag:"canDamage",DEFAULTS:i,process:a}},328:function(t,e,n){"use strict";function a(t){var e,n=t(this);e=this.cannonMatchShooterRotation?this.rotation:o.a.getAngleFromTo(n,this.cannonTarget);var a=Math.cos(e)*this.cannonShotSpeed,i=Math.sin(e)*this.cannonShotSpeed;o.a.create(this.cannonShotType,{x:n.x+this.x,y:n.y+this.y,team:this.team,dx:a+(this.dx||0),dy:i+(this.dy||0)}),Object(r.b)(c[this.cannonShotType])}function i(t){if(t.isShooting){var e=Date.now();e-t.cannonLastShotTime>=t.CANNON_LOAD_TIME_MS&&(t.cannonGetMuzzleFuncs.forEach(a.bind(t)),t.cannonLastShotTime=e)}}var o=n(6),r=n(35),c={ShotCannonHeavy:"fire-heavy",ShotCannonNormal:"fire"},s={cannonGetMuzzleFuncs:[],CANNON_LOAD_TIME_MS:100,cannonLastShotTime:0,cannonMatchShooterRotation:!0,cannonTarget:void 0,cannonShotSpeed:4,cannonShotType:"ShotCannonNormal",isShooting:!1};e.a={componentFlag:"canShootCannon",DEFAULTS:s,process:i}},329:function(t,e,n){"use strict";function a(t){var e=Math.pow(t.dx,2),n=Math.pow(t.dy,2),a=e+n;if(a>t.MAX_SPEED2){var i=t.MAX_SPEED*Math.pow(a,-.5);t.dx*=i,t.dy*=i}}var i={MAX_SPEED:40,MAX_SPEED2:1600};e.a={componentFlag:"canLimitSpeed",DEFAULTS:i,process:a}},330:function(t,e,n){"use strict";function a(t){this.dx+=Math.cos(this.rotation)*t,this.dy+=Math.sin(this.rotation)*t}var i={accelerate:a};e.a={componentFlag:"canAccelerate",DEFAULTS:i}},331:function(t,e,n){"use strict";function a(t){t.renderHit&&t.renderHit()}var i={hitTime:-1};e.a={componentFlag:"canDisplayHit",DEFAULTS:i,process:a}},332:function(t,e,n){"use strict";function a(){var t=this.planet;Object(s.b)("nav"),t.pbase=c.a.create("PBase",{x:t.x,y:t.y,planet:t,team:this.team}),c.a.destroy(this)}function i(){var t=this.planet;Object(s.b)("nav"),t.pcolony=c.a.create("PColony",{x:t.x,y:t.y,planet:t,team:this.team}),c.a.destroy(this)}function o(){var t=this.planet.pbase;if(0===t.materialsFinished){t.materialsFinished+=this.materialsFinished,this.materialsFinished=0;var e=0;t.materialsFinished>t.MAX_FINISHED_MATERIALS?(e=t.materialsFinished-t.MAX_FINISHED_MATERIALS,t.materialsFinished=t.MAX_MATERIALS_FINISHED,this.materialsFinished=e,this.unloadSupply()):c.a.destroy(this)}else if(this.planet.materialsFinished>0&&this.materialsFinished<this.MAX_MATERIALS_FINISHED){var n=this.MAX_MATERIALS_FINISHED-this.materialsFinished;n>=this.planet.materialsFinished?(this.materialsFinished+=this.planet.materialsFinished,this.planet.materialsFinished=0):(this.materialsFinished+=n,this.planet.materialsFinished-=n),this.loadSupply()}}function r(t){t.canOrbitPlanet&&t.isOrbitingPlanet&&t.materialsFinished>0&&(void 0===t.supplyTime?t.supplyTime=t.TIME_OFFLOAD_SUPPLY:t.supplyTime>0?t.supplyTime--:0===t.supplyTime&&(t.planet.pbase?t.planet.pcolony?t.loadOrDumpSupply():t.createPColony():t.createPBase()))}var c=n(6),s=n(35),l={TIME_OFFLOAD_SUPPLY:200,MAX_MATERIALS_FINISHED:500,createPBase:a,createPColony:i,loadOrDumpSupply:o};e.a={componentFlag:"canColonizePlanet",DEFAULTS:l,process:r}},333:function(t,e,n){"use strict";function a(t){var e=t.type;s[e]?s[e].push(t):s[e]=[t]}function i(t){t.hp=0,t.planet&&delete t.planet[t.type.toLowerCase()],delete t.target;var e=l(t.type),n=e.indexOf(t);-1!==n&&e.splice(n,1),r.a.removeChild(t.graphics)}function o(t,e){var n,a=1/0,i=l(e);return i&&i.forEach(function(e){var i=Object(c.b)(t,e);i<a&&(a=i,n=e)}),n}var r=n(26),c=n(6),s={},l=function(t){return s[t]||[]};e.a={add:a,remove:i,getByType:l,getAbsoluteNearestByType:o}},334:function(t,e,n){"use strict";function a(){u=f,f=[]}function i(t,e,n){var a=t.x>>h,i=t.y>>h;return a+=e||0,i+=n||0,a+i*p}function o(t){if(t.hp>0){var e=i(t,0,0);f[e]instanceof Array?f[e].push(t):f[e]=[t]}return this}function r(t,e,n){var a=!0;return e>0&&(a=a&&Object(s.b)(this,n)<=e),t&&(a=a&&n.type===t),a}function c(t,e,n){var a=[].concat(u[i(t,-1,-1)],u[i(t,0,-1)],u[i(t,1,-1)],u[i(t,0,-1)],u[i(t,0,0)],u[i(t,0,1)],u[i(t,-1,1)],u[i(t,0,1)],u[i(t,1,1)]).filter(Boolean);return(e||n)&&(a=a.filter(r.bind(t,e,n))),a}var s=n(6),l=n(67),h=11,p=l.a>>h,u=[],f=[];e.a={prepareNext:a,commit:o,getNearest:c}},336:function(t,e,n){"use strict";var a=n(11),i=n(9),o=n(13),r=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function a(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),c={_name:"Planetary Base",body:{type:"polygon",lineStyle:{width:1,color:255,alpha:1},path:[-20,20,-20,-20,20,-20,20,20,-20,20]},turret1:{type:"polygon",lineStyle:{width:1,color:65280,alpha:.5},path:[65,-60,65,-65,60,-65,65,-60]},turret2:{type:"polygon",lineStyle:{width:1,color:65280,alpha:.5},path:[-65,-60,-65,-65,-60,-65,-65,-60]},turret3:{type:"polygon",lineStyle:{width:1,color:65280,alpha:.5},path:[65,60,65,65,60,65,65,60]},turret4:{type:"polygon",lineStyle:{width:1,color:65280,alpha:.5},path:[-65,60,-65,65,-60,65,-65,60]}},s=function(t){function e(e){var n=t.call(this)||this;return n.type="PBase",n.geo=Object(i.a)(c.body),n.team=a.a.NONE,n.hp=20,n.maxHp=20,n.canExplode=!0,n.canHarvest=!0,n.canRepair=!0,n.canRefine=!0,n.canConstruct=!0,n.canOccupyPlanet=!0,n.canStoreMaterial=!0,n.materialsRaw=0,n.materialsFinished=0,Object.assign(n,e),n.geo.graphics.currentPath.lineColor=a.a._COLORS[n.team],n.geo.graphics.addChild(Object(i.a)(c.turret1).graphics,Object(i.a)(c.turret2).graphics,Object(i.a)(c.turret3).graphics,Object(i.a)(c.turret4).graphics),n}return r(e,t),e}(o.a);e.a=s},337:function(t,e,n){"use strict";var a=n(11),i=n(9),o=n(13),r=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function a(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),c={type:"polygon",_name:"Planetary Colony",lineStyle:{width:1,color:255,alpha:1},path:[-30,40,-70,40,-70,-40,-30,-40,-30,40]},s=function(t){function e(e){var n=t.call(this)||this;return n.type="PColony",n.geo=Object(i.a)(c),n.team=a.a.NONE,n.hp=30,n.maxHp=30,n.canMine=!0,n.canExplode=!0,n.canOccupyPlanet=!0,n.canRepair=!0,n.REPAIR_COST_FINISHED=10,n.REPAIR_TIME=20,Object.assign(n,e),n.geo.graphics.currentPath.lineColor=a.a._COLORS[n.team],n}return r(e,t),e}(o.a);e.a=s},338:function(t,e,n){"use strict";var a=n(11),i=n(9),o=n(13),r=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function a(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),c={type:"polygon",_name:"Planetary Communications Center",lineStyle:{width:1,color:255,alpha:1},path:[40,30,0,30,0,50,40,50,40,30,60,35,30,10,40,30]},s=function(t){function e(e){var n=t.call(this)||this;return n.type="PComm",n.geo=Object(i.a)(c),n.team=a.a.NONE,n.hp=20,n.maxHp=20,n.canExplode=!0,n.canRepair=!0,n.canOccupyPlanet=!0,n.REPAIR_COST_FINISHED=2,n.REPAIR_TIME=10,Object.assign(n,e),n.geo.graphics.currentPath.lineColor=a.a._COLORS[n.team],n}return r(e,t),e}(o.a);e.a=s},339:function(t,e,n){"use strict";var a=n(11),i=n(9),o=n(13),r=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function a(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),c={type:"polygon",_name:"Planetary Lab",lineStyle:{width:1,color:255,alpha:1},path:[0,-40,0,-70,50,-70,50,-40,0,-40]},s=function(t){function e(e){var n=t.call(this)||this;return n.type="PLab",n.geo=Object(i.a)(c),n.team=a.a.NONE,n.hp=20,n.maxHp=20,n.canExplode=!0,n.canOccupyPlanet=!0,n.canManufacture=!0,n.PRODUCT={Freighter:{cost:300,time:120},Fighter:{cost:500,time:90}},Object.assign(n,e),n.geo.graphics.currentPath.lineColor=a.a._COLORS[n.team],n}return r(e,t),e}(o.a);e.a=s},34:function(t,e,n){"use strict";var a=function(t,e){return Math.round(i(t,e))},i=function(t,e){return t+Math.random()*(e-t)},o=function(t){return t[a(0,t.length-1)]};e.a={int:a,float:i,arrayElement:o}},340:function(t,e,n){"use strict";var a=n(11),i=n(9),o={body:{type:"circle",radius:100,fill:{color:0,alpha:1},lineStyle:{width:1,color:65280,alpha:1}},flag:{type:"polygon",fill:{color:255,alpha:1},path:[-5,-4,-5,4,5,4,5,-4]}},r=function(){function t(t){this.type="Planet",this.canOrbitStar=!0,this.canStoreMaterial=!0,this.team=a.a.NONE,this.orbitDistance=0,this.orbitRotation=0,this.materialsRaw=0,this.materialsFinished=0,this.hp=2e3,this.mass=100,Object.assign(this,t),this.geo=Object(i.a)(o.body),this.geo.graphics.addChild(Object(i.a)(o.flag).graphics),this.updateFlagColor()}return t.prototype.isOccupied=function(){return Boolean(this.pbase||this.plab||this.pcolony||this.pcomm)},t.prototype.updateFlagColor=function(){var t=this.geo.graphics.children[0];this.team===a.a.NONE?t.visible=!1:(t.visible=!0,t.graphicsData[0].fillColor=a.a._COLORS[this.team])},t.DIST_SURFACE2=11025,t}();e.a=r},341:function(t,e,n){"use strict";var a=n(9),i=n(13),o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function a(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),r={body:{type:"polygon",lineStyle:{width:1,color:16711935,alpha:1},path:[-4,1,0,2,4,0,0,-2,-4,-1,-4,1],collisionPath:[-4,2,0,4,8,0,0,-4,-4,-2]},flame:{type:"polygon",lineStyle:{width:1,color:65535,alpha:1},path:[-4,-4,-8,-5,-4,-6]}},c=function(t){function e(e){var n=t.call(this)||this;return n.type="Probe",n.geo=Object(a.a)(r.body),n.AUDIO_HIT="hit2",n.hp=2,n.maxHp=2,n.hasDied=!1,n.hitTime=-1,n.patrolIndex=0,n.rotation=0,n.flameOn=function(){return n.setChildVisible(0,!0)},n.flameOff=function(){return n.setChildVisible(0,!1)},Object.assign(n,e),n.assignTeamColor(),n.geo.graphics.addChild(Object(a.a)(r.flame).graphics),n.flameOff(),n}return o(e,t),e}(i.a);e.a=c},342:function(t,e,n){"use strict";var a=n(9),i=n(13),o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function a(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),r={_name:"Orbital Sensor Array",type:"polygon",lineStyle:{width:1,color:255,alpha:1},path:[6,26,12,28,12,40,18,46,18,34,12,40,6,42]},c=function(t){function e(e){var n=t.call(this)||this;return n.type="SensorArray",n.geo=Object(a.a)(r),n.hp=5,n.maxHp=5,n.canRepair=!0,n.canOccupySpacePort=!0,Object.assign(n,e),n.assignTeamColor(),n}return o(e,t),e}(i.a);e.a=c},343:function(t,e,n){"use strict";var a=n(11),i=n(9),o={cannon_normal:{type:"polygon",fill:{color:16777215,alpha:1},path:[-1,1,1,1,1,-1,-1,-1,-1,1]},cannon_heavy:{type:"polygon",lineStyle:{width:2,color:65535,alpha:1},path:[-3,0,0,0,0,-3,0,0,0,3,0,0,3,0]}},r={cannon_heavy:2,cannon_normal:1},c=function(){function t(t){this.type="Shot",this.canMoveLinearly=!0,this.canDamage=!0,this.canMetabolize=!0,this.shotType="cannon_normal",this.team=a.a.NONE,this.hp=50,this.x=0,this.y=0,this.dx=0,this.dy=0,this.damageHp=1,Object.assign(this,t),this.geo=Object(i.a)(o[this.shotType]),this.damageHp=r[this.shotType]}return t}();e.a=c},344:function(t,e,n){"use strict";var a=n(9),i=n(13),o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function a(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),r={_name:"Space Dock",type:"polygon",lineStyle:{width:1,color:255,alpha:1},path:[6,-42,20,-42,20,-22,14,-26,6,-26]},c=function(t){function e(e){var n=t.call(this)||this;return n.type="SpaceDock",n.geo=Object(a.a)(r),n.hp=8,n.maxHp=8,n.canRepair=!0,n.canManufacture=!0,n.PRODUCT={Fighter:{cost:200,time:60},Probe:{cost:15,time:10}},n.canOccupySpacePort=!0,Object.assign(n,e),n.assignTeamColor(),n}return o(e,t),e}(i.a);e.a=c},345:function(t,e,n){"use strict";var a=n(9),i=n(13),o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function a(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),r={_name:"Space Port",body:{type:"polygon",lineStyle:{width:1,color:255,alpha:1},path:[-2,0,-6,-20,-6,-36,-2,-44,6,-44,6,-24,2,-20,2,20,6,24,6,44,-2,44,-6,36,-6,20,-2,0]},turret1:{type:"polygon",lineStyle:{width:1,color:65535,alpha:.5},path:[0,28,4,26,4,30,0,28]},turret2:{type:"polygon",lineStyle:{width:1,color:65535,alpha:.5},path:[0,-28,4,-26,4,-30,0,-28]},turret3:{type:"polygon",lineStyle:{width:1,color:65535,alpha:.5},path:[4,44,2,48,0,44]},turret4:{type:"polygon",lineStyle:{width:1,color:65535,alpha:.5},path:[4,-44,2,-48,0,-44]},flame1:{type:"polygon",lineStyle:{width:1,color:65535,alpha:1},path:[-6,20,-12,22,-6,24]},flame2:{type:"polygon",lineStyle:{width:1,color:65535,alpha:1},path:[-6,-24,-12,-22,-6,-20]},flame3:{type:"polygon",lineStyle:{width:1,color:65535,alpha:1},path:[-6,32,-12,34,-6,36]},flame4:{type:"polygon",lineStyle:{width:1,color:65535,alpha:1},path:[-6,-36,-12,-34,-6,-32]}},c=function(t){function e(e){var n=t.call(this)||this;return n.type="SpacePort",n.geo=Object(a.a)(r.body),n.hp=30,n.maxHp=30,n.canRepair=!0,n.canRefine=!0,n.canOrbitPlanet=!0,n.orbitDistance=205,n.canExplode=!0,n.EXPLOSION_FRAGMENTS=12,n.canStoreMaterial=!0,n.materialsRaw=0,n.materialsFinished=0,Object.assign(n,e),n.assignTeamColor(),n.geo.graphics.addChild(Object(a.a)(r.flame1).graphics,Object(a.a)(r.flame2).graphics,Object(a.a)(r.flame3).graphics,Object(a.a)(r.flame4).graphics,Object(a.a)(r.turret1).graphics,Object(a.a)(r.turret2).graphics,Object(a.a)(r.turret3).graphics,Object(a.a)(r.turret4).graphics),n}return o(e,t),e}(i.a);e.a=c},346:function(t,e,n){"use strict";var a=n(11),i=n(9),o={type:"circle",radius:200,fill:{color:0,alpha:1},lineStyle:{width:1,color:16776960,alpha:1}},r=function(){function t(t){this.type="Star",this.x=0,this.y=0,this.hp=1e4,this.mass=500,this.team=a.a.NONE,Object.assign(this,t),this.geo=Object(i.a)(o)}return t.DIST_SURFACE2=4e4,t}();e.a=r},347:function(t,e,n){"use strict";function a(t,e){var n=new r.Graphics;return n.beginFill(0,0),n.lineStyle(1,t,1),n.drawRect(-e,-e,e,e),n.endFill(),h.addChild(n),n}function i(t,e,n,i,o){var r=t[o];r||(r=a(e,n),t[o]=r),r.x=i.x*d,r.y=i.y*d}function o(){var t=Date.now();if(t-g>m){var e=c.a.getByType("Star");e&&(e.length!=p.length&&(p=p.slice(0,e.length-1)),e.forEach(T));var n=c.a.getByType("Planet");n&&(n.length!=u.length&&(u=u.slice(0,n.length-1)),n.forEach(S));var a=c.a.getByType("Fighter");a&&(a.length!=f.length&&(f=f.slice(0,a.length-1)),a.forEach(function(t,e){i(f,c.a.getTeamColor(t.team),1,t,e)}));var o=c.a.getByType("Freighter");o&&(o.length!=y.length&&(y=y.slice(0,o.length-1)),o.forEach(_)),g=t}}var r=n(27),c=(n.n(r),n(6)),s=n(67),l=n(26),h=new r.Graphics;h.beginFill(0,0),h.lineStyle(1,16777215,.8),h.drawRect(0,0,100,100),h.endFill(),h.x=4,h.y=4,l.a.addChildToHUD(h);var p=[],u=[],f=[],y=[],d=100/s.b.MAX_COORDINATE,g=0,m=500,S=i.bind(null,u,65280,2),T=i.bind(null,p,16776960,2),_=i.bind(null,y,11184810,1);e.a={update:o}},348:function(t,e,n){"use strict";function a(){var t=new m.Graphics;t.beginFill(0,0),t.lineStyle(4,16777215,_),t.drawCircle(0,0,45),t.endFill(),t.x=0,t.y=0;var e=new m.Graphics;return e.beginFill(0,0),e.lineStyle(4,65280,1),e.arc(0,0,45,-3*b,3*b),e.endFill(),e.x=0,e.y=0,t.addChild(e),t}function i(){var t=new m.Graphics;t.beginFill(0,0),t.lineStyle(4,16777215,_),t.drawCircle(0,0,50),t.endFill(),t.x=0,t.y=0;var e=new m.Graphics;return e.beginFill(0,0),e.lineStyle(4,16776960,1),e.arc(0,0,50,-6*b,6*b),e.endFill(),e.x=0,e.y=0,t.addChild(e),t}function o(){var t=new m.Graphics;t.beginFill(0,0),t.lineStyle(1,16777215,_),t.drawCircle(0,0,50),t.endFill(),t.x=0,t.y=0;var e=new m.Graphics;return e.beginFill(0,0),e.lineStyle(2,16711680,1),e.arc(0,0,50,-b,b),e.endFill(),e.x=0,e.y=0,t.addChild(e),t}function r(){var t=new m.Text("Tactical Radar",E);return t.x=-t.width>>1,t.y=-t.height>>1,t}function c(){p=a(),u=i(),f=o(),y=r(),d=new m.Container,d.addChild(p,u,f,y),d.x=O+50,d.y=100+3*O+50,d.visible=!0,S.a.addChildToHUD(d)}function s(t){t.nearestEnemy?(f.visible=!0,f.rotation=t.nearestEnemy):f.visible=!1,t.nearestStar?(u.visible=!0,u.rotation=t.nearestStar):u.visible=!1,t.nearestPlanet?(p.visible=!0,p.rotation=t.nearestPlanet):p.visible=!1}function l(){if(g&&A){var t=Date.now();if(t-v>F){var e=T.a.getAbsoluteNearestByType(g,"Planet"),n=T.a.getAbsoluteNearestByType(g,"Star");s({nearestEnemy:void 0,nearestPlanet:e?T.a.getAngleFromTo(g,e):void 0,nearestStar:n?T.a.getAngleFromTo(g,n):void 0}),v=t}}}function h(t){t&&(g={x:t.x,y:t.y})}var p,u,f,y,d,g,m=n(27),S=(n.n(m),n(26)),T=n(6),_=.08,b=Math.PI/180,E={fontFamily:"arial",fontSize:8,fill:16316664,align:"center"},O=4,A=!0,v=0,F=500;e.a={init:c,update:l,setOrigin:h,setRotations:s,set isEnabled(t){A=t,d.visible=t},get isEnabled(){return A}}},349:function(t,e,n){"use strict";function a(t){t.explode(),l.a.destroy(t)}function i(t){var e=l.a.getDistSquared(this,t);if(e<p){var n=this.MASS*t.MASS/Math.pow(e,1.5),i=t.x-this.x,o=t.y-this.y;if(this.dx+=i*n,this.dy+=o*n,e<t.DIST_SURFACE2){var r=this.dx*this.dx+this.dy*this.dy,c=this.rotation,s=l.a.getAngleFromTo(t,this),h=Math.abs(s-c);h>Math.PI&&(c>0?c-=y:c+=y,h=Math.abs(s-c));var d=r<f;h<u&&d?this.dockPlanet(t):a(this)}}}function o(t){var e=l.a.getDistSquared(this,t);if(e<h){var n=t.x-this.x,i=t.y-this.y,o=this.MASS*t.MASS/Math.pow(e,1.5);this.dx+=n*o,this.dy+=i*o,e<t.DIST_SURFACE2&&a(this)}}function r(t){"Star"===t.type?o.call(this,t):"Planet"===t.type&&i.call(this,t)}function c(t){t&&!t.isDockedPlanet&&t.hp>0&&l.a.getNearest(t).forEach(r.bind(t))}function s(){l.a.getByType("Fighter").forEach(c)}e.a=s;var l=n(6),h=Math.pow(1e3,2),p=Math.pow(800,2),u=Math.PI/4,f=4.41,y=2*Math.PI},35:function(t,e,n){"use strict";function a(t){var e=t.name,n=t.arrayBuffer;o.decodeAudioData(n).then(function(t){r[e]=t})}function i(t){var e=o.createBufferSource();e.buffer=r[t],e.connect(o.destination),e.start()}e.a=a,e.b=i;var o=new AudioContext,r={}},350:function(t,e,n){"use strict";function a(t,e){if(t)for(var n=t.length-1;n>=0;n--){var a=t[n],i=!a.isOrbitingPlanet&&!a.target||a.target&&"Planet"!==a.target.type;if(i){a.target=e,a.planet=void 0;break}}}function i(t){return!t.pbase||!t.pcolony}function o(t,e){return e.team===t}function r(t){return t.pcolony&&t.plab&&!t.plab.isManufacturing}function c(t,e){if(t){var n=p.a.arrayElement(t).plab;n&&n.orderManufacture(e)}}function s(t){var e,n=h.a.getByType("Planet"),s=h.a.getByType("Fighter"),l=h.a.getByType("Freighter");l&&(l=l.filter(o.bind(null,t))),n&&(n=n.filter(o.bind(null,t)),n.filter(i).forEach(a.bind(null,l)),e=n.filter(r),e=e.length>0?e:void 0,l&&n.length>l.length&&c(e,"Freighter")),s&&(s=s.filter(o.bind(null,t))),u.a.getFocalPoint()||(s.length>0?u.a.setFocalPoint(s[0]):c(e,"Fighter"))}function l(){var t=Date.now();t-y>f&&(s(h.a.TEAM.MAGENTA),y=t)}e.a=l;var h=n(6),p=n(34),u=n(148),f=3e3,y=0},6:function(t,e,n){"use strict";function a(t,e){var n;return t in v&&(n=new v[t](e),l.a.init(n),h.a.add(n),s.a.addChild(n.geo.graphics)),n}function i(t,e){var n=e.x-t.x,a=e.y-t.y;return n*n+a*a}function o(t,e){var n=e.x-t.x,a=e.y-t.y;return Math.atan2(a,n)}function r(t){var e=h.a.getByType(t);e&&e.forEach(l.a.update)}function c(){F.forEach(r)}e.b=i;var s=n(26),l=n(312),h=n(333),p=n(11),u=n(334),f=n(151),y=n(336),d=n(337),g=n(338),m=n(339),S=n(340),T=n(341),_=n(342),b=n(343),E=n(344),O=n(345),A=n(346),v={Fighter:f.a,Freighter:f.a,PBase:y.a,PColony:d.a,PComm:g.a,PLab:m.a,Planet:S.a,Probe:T.a,SensorArray:_.a,Shot:b.a,SpaceDock:E.a,SpacePort:O.a,Star:A.a},F=["Star","Planet","PBase","PColony","PComm","PLab","SpacePort","SpaceDock","SensorArray","Fighter","Freighter","Shot"],R=function(t){return p.a._COLORS[t]};e.a={create:a,updateAll:c,commit:u.a.commit,prepareNext:u.a.prepareNext,getNearest:u.a.getNearest,destroy:h.a.remove,getByType:h.a.getByType,getAbsoluteNearestByType:h.a.getAbsoluteNearestByType,getTeamColor:R,getDistSquared:i,getAngleFromTo:o,TEAM:p.a}},67:function(t,e,n){"use strict";function a(){return{x:s.a.float(y,l-y),y:s.a.float(y,l-y)}}function i(t){var e=r.a.getByType("Star");if(e){for(var n=0;n<e.length;n++)if(e[n]!==t&&r.a.getDistSquared(t,e[n])<d)return!1;return!0}return!0}function o(){for(var t,e=s.a.int(h,p),n=0;n<e;n++){do{t=a()}while(!i(t));var o=r.a.create("Star",t);if(s.a.float(0,1)<f)for(var y=s.a.int(1,u),d=0;d<y;d++)r.a.create("Planet",{x:0,y:0,star:o,orbitDistance:1600+d*s.a.int(2,5)*800,orbitRotation:s.a.float(-Math.PI,Math.PI)})}var g=r.a.create("Fighter",{x:s.a.int(0,l),y:s.a.int(0,l),team:c.a.MAGENTA});r.a.create("Freighter",{x:g.x+s.a.int(-100,100),y:g.y+s.a.int(-100,100),target:g,team:c.a.MAGENTA,isOrbitingPlanet:!1,materialsFinished:500}),r.a.create("Freighter",{x:g.x+s.a.int(-100,100),y:g.y+s.a.int(-100,100),target:g,team:c.a.MAGENTA,isOrbitingPlanet:!1,materialsFinished:500})}n.d(e,"a",function(){return l});var r=n(6),c=n(11),s=n(34),l=32768,h=2,p=5,u=2,f=.8,y=6e3,d=y*y;e.b={init:o,MAX_COORDINATE:l}},9:function(t,e,n){"use strict";function a(t,e){return{set x(t){t<0?(t=0,this.dx&&(this.dx=0)):t>32768&&(t=32768,this.dx&&(this.dx=0)),this.graphics.x=t,this.collision.pos.x=t},set y(t){t<0?(t=0,this.dy&&(this.dy=0)):t>32768&&(t=32768,this.dy&&(this.dy=0)),this.graphics.y=t,this.collision.pos.y=t},set rotation(t){t>u?t-=u:t<-u&&(t+=u),this.collision instanceof l.a.Circle||(this.collision.setAngle(t),this.graphics.rotation=t)},get x(){return this.graphics.x},get y(){return this.graphics.y},get rotation(){return this.graphics.rotation},graphics:t,collision:e}}function i(t){var e=new c.Graphics;return t.lineStyle&&e.lineStyle(t.lineStyle.width,t.lineStyle.color,t.lineStyle.alpha),t.fill?e.beginFill(t.fill.color,t.fill.alpha):e.beginFill(0,0),e.drawCircle(0,0,t.radius),e.endFill(),e.x=t.x,e.y=t.y,a(e,new l.a.Circle(p(e.x,e.y),t.radius))}function o(t){var e=new c.Graphics;t.lineStyle&&e.lineStyle(t.lineStyle.width,t.lineStyle.color,t.lineStyle.alpha),t.fill?e.beginFill(t.fill.color,t.fill.alpha):e.beginFill(0,0),e.drawPolygon(t.path),e.endFill(),e.x=t.x,e.y=t.y;var n=[];if(t.collisionPath)for(var i=0;i<t.collisionPath.length;i+=2)n.push(p(t.collisionPath[i],t.collisionPath[i+1]));return a(e,new l.a.Polygon(p(e.x,e.y),n))}function r(t,e){return t=h({},t,{options:e}),"circle"===t.type?i(t):o(t)}e.a=r;var c=n(27),s=(n.n(c),n(335)),l=n.n(s),h=this&&this.__assign||Object.assign||function(t){for(var e,n=1,a=arguments.length;n<a;n++){e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},p=function(t,e){return new l.a.Vector(t,e)},u=2*Math.PI}},[152]);