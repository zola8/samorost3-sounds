'use strict';

angular.
module('dashboard').
component('dashboard', {

	templateUrl: 'dashboard/dashboard-template.html',

	controller: function dashboardController($http) {
		let self = this;

		$http.get('sounds/sounds.json').then(function(response) {
			self.sounds = response.data;

			for (var folderIndex = 0, len = self.sounds.length; folderIndex < len; folderIndex++) {
				self.sounds[folderIndex].tracks = [];

				for (var j = 1, len2 = self.sounds[folderIndex].fileIndex; j <= len2; j++) {
					let track = {
						"filename": getFilename(j),
						"playing": false,
						"audio": null
					};

					self.sounds[folderIndex].tracks.push(track);
				}
			}
		});

		self.toggle = function(folder, filename) {
			for (var i = 0, len = self.sounds.length; i < len; i++) {
				if (self.sounds[i].folder === folder) {
					for (var j = 0, len2 = self.sounds[i].tracks.length; j < len2; j++) {

						if (self.sounds[i].tracks[j].filename === filename) {
							let track = self.sounds[i].tracks[j];
							track.playing = !track.playing;

							if (track.playing) {
								if (!track.audio) {
									track.audio = getSound(folder, filename);
								}
								playSound(track.audio);
							} else {
								stopSound(track.audio);
							}
						}
					}
				}
			}
		};

		self.stopAll = function() {
			for (var i = 0, len = self.sounds.length; i < len; i++) {
				for (var j = 0, len2 = self.sounds[i].tracks.length; j < len2; j++) {
					self.sounds[i].tracks[j].playing && stopSound(self.sounds[i].tracks[j].audio);
					self.sounds[i].tracks[j].playing = false;
				}
			}
		};

		function getFilename(num) {
			return ("0000" + num).slice(-5) + ".mp3";
		};

		function getSound(folder, filename) {
			let audio = new Audio('sounds/' + folder + '/' + filename);
			audio.loop = true;
			return audio;
		};

		function playSound(audio) {
			audio.play();
		};

		function stopSound(audio) {
			audio.pause();
			audio.currentTime = 0;
		};

	}

});
