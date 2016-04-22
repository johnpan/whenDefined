describe("whenDefined", function() {	
  it("should be not null", function() {
	expect(whenDefined).toBeDefined();
  });
});

describe("isUndefined", function() {	
  it("should be defined", function() {
	expect(isUndefined).toBeDefined();
  });
  
  it("should not throw", function() {
	  expect(function() {		  
		var a;
		isUndefined(a);
		
		a= true;
		isUndefined(a);
		
		a = false;
		isUndefined(a);
		
		a = null;
		isUndefined(a);
		
		a = undefined;
		isUndefined(a);		
		
		a = 2;
		isUndefined(a);		
	
		a = [2];
		isUndefined(a);
		
		a = [];
		isUndefined(a);
		
		a = {};
		isUndefined(a);
		
		a = {b:2};
		isUndefined(a);
		
		a = "";
		isUndefined(a);
		
		a = "asd";
		isUndefined(a);
		
	  }).not.toThrow();
  }); 
  
  it("should return false for 6", function() {
	  expect(function() {		 
		var a = 10;
		return isUndefined(a);		
	  }()).toBe(false);
  }); 

  it("should return false for [6]", function() {
	  expect(function() {		 
		var a = [10];
		return isUndefined(a);		
	  }()).toBe(false);
  }); 
  
  it("should return false for []", function() {
	  expect(function() {		 
		var a = [];
		return isUndefined(a);		
	  }()).toBe(false);
  });
  
  it("should return false for 0", function() {
	  expect(function() {		 
		var a = 0;
		return isUndefined(a);		
	  }()).toBe(false);
  }); 
  
 it("should return false for '' ", function() {
	  expect(function() {		 
		var a = "";
		return isUndefined(a);		
	  }()).toBe(false);
  }); 
  
 it("should return false for null", function() {
	  expect(function() {		 
		var a = null;
		return isUndefined(a);		
	  }()).toBe(false);
  }); 
  
 it("should return false for {}", function() {
	  expect(function() {		 
		var a = {};
		return isUndefined(a);		
	  }()).toBe(false);
  }); 
  
 it("should return false for number", function() {
	  expect(function() {		 
		var a = 10;
		return isUndefined(a);		
	  }()).toBe(false);
  }); 
  
 it("should return false for false", function() {
	  expect(function() {		 
		var a = false;
		return isUndefined(a);		
	  }()).toBe(false);
  }); 
  
 it("should return false for true", function() {
	  expect(function() {		 
		var a = true;
		return isUndefined(a);		
	  }()).toBe(false);
  }); 
  
  it("should return false for window", function() {
	  expect(function() {		 
		var a = window;
		return isUndefined(a);		
	  }()).toBe(false);
  }); 
  
  
  
  
  
  
  
 it("should return true for undefined", function() {
	  expect(function() {		 
		var a = undefined;
		return isUndefined(a);		
	  }()).toBe(true);
  }); 
  
 it("should return true for var", function() {
	  expect(function() {		 
		var a;
		return isUndefined(a);		
	  }()).toBe(true);
  }); 
   
  
});