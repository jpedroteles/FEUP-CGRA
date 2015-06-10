var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);
	this.enableTextures(true);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.floor=new MyQuad (this, 0, 10.0, 0.0, 12.0);
	this.wall = new MyQuad(this,-1,2,-0.50,1.5);
	this.boardA = new Plane(this,BOARD_B_DIVISIONS,-0.25,1.25,0,1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS,0,1,0,1);
	this.cylinder = new MyCylinder(this,8,20);
	this.clock = new MyClock(this);
	this.paperPlane = new MyFlyingPlane(this);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	// Table texture
	this.tableAppearence = new CGFappearance(this);
	this.tableAppearence.loadTexture("../resources/images/table.png");
	this.tableAppearence.setAmbient(0.3,0.3,0.3,1);
	this.tableAppearence.setDiffuse(0.8,0.8,0.8,1);
	this.tableAppearence.setSpecular(0.1,0.1,0.1,1);
	this.tableAppearence.setShininess(80);	

	// Floor texture
	this.floorAppearence = new CGFappearance(this);
	this.floorAppearence.loadTexture("../resources/images/floor.png");
	this.floorAppearence.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearence.setDiffuse(0.8,0.8,0.8,1);
	this.floorAppearence.setSpecular(0.1,0.1,0.1,1);
	this.floorAppearence.setTextureWrap('REPEAT','REPEAT');
	this.floorAppearence.setShininess(80);	

	// Window texture
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.windowAppearance.setSpecular(0.1,0.1,0.1,1);
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	this.windowAppearance.setShininess(80);

	// Cylinder texture
	this.cylinderAppearence = new CGFappearance(this);
	this.cylinderAppearence.loadTexture("../resources/images/coluna.png");
	this.cylinderAppearence.setAmbient(0.3,0.3,0.3,1);
	this.cylinderAppearence.setDiffuse(0.8,0.8,0.8,1);
	this.cylinderAppearence.setSpecular(0.1,0.1,0.1,1);
	this.cylinderAppearence.setTextureWrap('REPEAT','REPEAT');
	this.cylinderAppearence.setShininess(80);	

	// Slides texture
	this.slideAppearance = new CGFappearance(this);
	this.slideAppearance.loadTexture("../resources/images/slides.png");
	this.slideAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slideAppearance.setDiffuse(1,1,1,1);
	this.slideAppearance.setSpecular(0.1,0.1,0.1,1);
	this.slideAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	this.slideAppearance.setShininess(80);

	// Board texture
	this.boardAppearence = new CGFappearance(this);
	this.boardAppearence.loadTexture("../resources/images/board.png");
	this.boardAppearence.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearence.setDiffuse(1,1,1,1);
	this.boardAppearence.setSpecular(1,1,1,1);
	this.boardAppearence.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	this.boardAppearence.setShininess(120);	

	// Clock texture
	this.clockAppearence = new CGFappearance(this);
	this.clockAppearence.loadTexture("../resources/images/clock.png");
	this.clockAppearence.setAmbient(0.3,0.3,0.3,1);
	this.clockAppearence.setDiffuse(0.8,0.8,0.8,1);
	this.clockAppearence.setSpecular(0.1,0.1,0.1,1);
	this.clockAppearence.setShininess(80);

	// Clockhand textures

	this.blackClockHand = new CGFappearance(this);
	this.blackClockHand.setAmbient(0.3,0.3,0.3,1);
	this.blackClockHand.setDiffuse(0,0,0,1);
	this.blackClockHand.setSpecular(0.1,0.1,0.1,1);
	this.blackClockHand.setShininess(120);

	this.redClockHand = new CGFappearance(this);
	this.redClockHand.setAmbient(0.3,0.3,0.3,1);
	this.redClockHand.setDiffuse(1,0,0,1);
	this.redClockHand.setSpecular(0.1,0.1,0.1,1);
	this.redClockHand.setShininess(80);	



	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.setUpdatePeriod(100);	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0);

	this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(1, 7.5, 7.5, 1.0);
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1, 1, 0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();
	
	//window light
	this.lights[2].setAmbient(0, 0, 0, 5);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1, 1, 1, 1.0);
	this.lights[2].setConstantAttenuation(0); //Kc
	this.lights[2].setLinearAttenuation(0.5);//KL
	this.lights[2].setQuadraticAttenuation(0);//Kq
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 5);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1, 1, 0, 1.0);
	this.lights[3].setConstantAttenuation(0); //Kc
	this.lights[3].setLinearAttenuation(0);//KL
	this.lights[3].setQuadraticAttenuation(1);//Kq
	this.lights[3].enable();

	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section


	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearence.apply();
		this.floor.display();
	this.popMatrix();
	
	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.wall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialDefault.apply();
		this.wall.display();
	this.popMatrix();
	
	
	// Left Table
	this.pushMatrix();
		this.translate(5, 0, 8);		
		this.table.display();
	this.popMatrix();
		
	// Right Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();		
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slideAppearance.apply();		
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearence.apply();
		this.boardB.display();
	this.popMatrix();

	// Left Cylinder
	
	this.pushMatrix();
		this.translate(1.25,8,13.85);
		this.rotate(90* degToRad, 1,0,0);
		this.scale(1, 1, 8);
		this.cylinderAppearence.apply();
		this.cylinder.display();
	this.popMatrix();

	// Right Cylinder
	this.pushMatrix();
		this.translate(13.50,8,13.85);
		this.rotate(90* degToRad, 1,0,0);
		this.scale(1, 1, 8);	
		this.cylinderAppearence.apply();
		this.cylinder.display();
	this.popMatrix();

	this.materialDefault.apply();
	
	// Clock
	this.pushMatrix();
		this.translate((4+10.5)/2, 7.30, 0);
		this.scale(0.5,0.5,0.10);
		this.clock.display();
	this.popMatrix();

	// Paper Plane
	this.pushMatrix();
		this.translate(15, 4, 8);
		this.paperPlane.display();
	this.popMatrix();

	// ---- END Primitive drawing section

	this.shader.unbind();
};

LightingScene.prototype.update = function(currTime) {
 	this.clock.update(currTime);
 	this.paperPlane.update(currTime);
};
