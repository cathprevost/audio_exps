function runExperiment(){
	
	serverPsych.request(function (settings){
			    
		settings.timeline.forEach(function(block, idx, timeline){
			if(block.type == "audio-categorization"){
				block.timeline = [];
				var stimuliList = jsPsych.randomization.shuffle(settings.resources.other);
				
				for (var i=0; i < block.length; i++)
		    	{
					getCategory = (function(){
						if(stimuliList[i].search('d1k') != -1){
							return 'k';
						}
						else{
							if(stimuliList[i].search('d1l') != -1){
								return 'l';
							}
							else{
								return 'e';
							}
						}
					})()
					
					if(getCategory != 'e'){
						
						block.timeline.push({stimulus: stimuliList[i], key_answer: getCategory})
					}					
		    	
		    	}
				
			}
			
		});
				
		jsPsych.init({
			timeline: settings.timeline,
			on_finish:function(data){
				serverPsych.save({
					data:data
				})
			},
			display_element: $('#jsPsychTarget'),
			on_trial_start:function(){
				$("#jsPsychTarget")[0].scrollIntoView();
			}
		});
	});
}