angular
.module('portfolioApp')
.service('DataService', function($http) {
	'use strict';
	var xmlGetElement = function(parent, name) {
		var out = '';
		var e = parent.getElementsByTagName(name)[0];
		if (e) { var c = e.childNodes[0]; if (c) { out = c.nodeValue; } }
		return out;
	};
	
	this.GetProjectsData = function (url, scope) {
		$http.get(url).then(function(response) {
			var projectData = response.data;
			var parser = new DOMParser();
			var projectXML = parser.parseFromString(projectData, 'application/xml');
			var technologyList = projectXML.getElementsByTagName('technology');
			scope.projectData = [];
			for (var i = 0; i < technologyList.length; i++) {
				var technology = technologyList[i];
				var title = xmlGetElement(technology, 'title');
				var description = xmlGetElement(technology, 'description');
				var color = xmlGetElement(technology, 'color');
				var imageFilename = xmlGetElement(technology, 'imageFilename');
				var projectItem = {};
				projectItem.title = title;
				projectItem.description = description;
				projectItem.color = color;
				projectItem.imageFilename = imageFilename;
				scope.projectData.push(projectItem);
			}
			
			scope.project_title = xmlGetElement(projectXML.getElementsByTagName('project')[0], 'project-title');
			scope.project_description = xmlGetElement(projectXML.getElementsByTagName('project')[0], 'project-description');
			scope.isProjectLoaded = true;
		}, function() { 
			scope.isProjectLoaded = false;
			scope.project_title = '';
			scope.project_description = '';
		});
		return scope;
	};
});
