 /**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks) {
    CGFobject.call(this, scene);
    
    this.slices = slices;
    this.stacks = stacks;
    
    this.textS = 1.0 / this.slices;
    this.textT = 1.0 / this.stacks;
    
    this.initBuffers();
}
;

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {
    
    var ang = 2 * Math.PI / this.slices;
    var tamanho = 1.0 / this.stacks;
    
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    
    
    var t = 1;
    
    for (var k = 0; k < this.stacks; k++) {
        this.vertices.push(Math.cos(0), Math.sin(0), k * tamanho);
        this.vertices.push(Math.cos(0), Math.sin(0), (k + 1) * tamanho);
        
        var s = 0;
        this.texCoords.push(s, t);
        this.texCoords.push(s, t - this.textT);
        
        this.normals.push(Math.cos(0), Math.sin(0), 0);
        this.normals.push(Math.cos(0), Math.sin(0), 0);
        this.indices.push(k * 2 * this.slices, 1 + k * 2 * this.slices, (k + 1) * 2 * this.slices - 1);
        this.indices.push(-1 + (k + 1) * 2 * this.slices, -2 + (k + 1) * 2 * this.slices, k * 2 * this.slices);
        
        for (var i = 1; i <= this.slices; i++) {
            this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), k * tamanho);
            this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), (k + 1) * tamanho);
            
            s += this.textS;
            this.texCoords.push(s, t);
            this.texCoords.push(s, t - this.textT);
            
            this.indices.push(i * 2 + k * 2 * (this.slices+1), i * 2 + 1 + k * 2 * (this.slices+1), i * 2 - 1 + k * 2 * (this.slices+1));
            this.indices.push(i * 2 - 1 + k * 2 * (this.slices+1), i * 2 - 2 + k * 2 * (this.slices+1), i * 2 + k * 2 * (this.slices+1));
           
            for (var j = 0; j < 2; j++)
                this.normals.push(Math.cos(i * ang), Math.sin(i * ang), 0);
        }
        t -= this.textT;
    }
    
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
