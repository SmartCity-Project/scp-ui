'use strict';
angular.module('app.services.domain', [])
.factory('Domain', function () {

	function EventSearchCriteria() {
		this.location = null;
		this.radius = null;
		this.eventStatus = null;
	}
	
    function EventNew() {
        this.title = null;
        this.description = null;
        this.location = null;
        this.image = null;
    }
    
    function Event() {
        this.id = null;
        this.title = null;
        this.description = null;
        this.image = null;
        this.location = null;
        this.aggregatedVotes = null;
        this.aggreagatedComments = null;
        this.author = null;
        this.tracking = null;
    }
    
    function Comment() {
        this.id = null;
        this.discussionId = null;
        this.author = null;
        this.posted = null;
    }
    
    Event.build = function(data){
    	if(!data) {
    		return new Event();
    	}else{
    		var event = new Event();
    		for(var key in data){
                if (key.charAt(0) !== '$' && data.hasOwnProperty(key)) {
                	event[key] = data[key];
    			}
    		}
    		return event;
    	}
    };
    
    function Vote() {
    	this.documentId = null;
    	this.type = null;
    }
    
    function UserProfile(){
    	this.id = null;
    	this.firstName = null;
    	this.lastName = null;
    	this.email = null;   
    	this.imageUrl = null;
    	this.role = null;
    }
    
    UserProfile.build = function(data){
    	if(!data) {
    		return new UserProfile();
    	}else{
    		var userProfile = new UserProfile();
    		for(var key in data){
                if (key.charAt(0) !== '$' && data.hasOwnProperty(key)) {
    				userProfile[key] = data[key];
    			}
    		}
    		return userProfile;
    	}
    };
    
    function Address(){
    	this.id = null;
    	this.country = null;
    	this.city = null;
    	this.street = null;
    	this.number = null;
    	this.poBox = null;  	
    	this.location = null;
    }
    
    function OrganizationProfile(){
    	this.id = null;   
    	this.name = null;
    	this.description = null;
    	this.address = null;
    	this.url = null;
    	this.contacts = null;
    	this.favoriteLocations = null;
    	this.users = null;
    }
    
    function UserRegister(){
    	this.email = null;
    	this.password = null;
    	this.firstName = null;
    	this.lastName = null;
    }
    
    function OrganizationRegister(){
    	this.name = null;
    	this.url = null;
    }
    
    function Tag() {
        this.id=null;
        this.name=null;
    }
    
    Tag.build = function(data){
    	if(!data) {
    		return new Tag();
    	}else{
    		var tag = new Tag();
    		for(var key in data){
                if (key.charAt(0) !== '$' && data.hasOwnProperty(key)) {
                	tag[key] = data[key];
    			}
    		}
    		return tag;
    	}
    };
    
    function Location() {
        this.id = null;
        this.name = null;
        this.parentId = null;
        this.depthValue = null;
        this.children = null;
        this.multiPolygon = null;
    }
    
    return {
        Tag: Tag,
        Event: Event,
        EventNew: EventNew,
        EventSearchCriteria: EventSearchCriteria,
        Comment: Comment,
        UserProfile: UserProfile,
        Location: Location,
    };
    
});