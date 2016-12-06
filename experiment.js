

function runExperiment(){
	
	serverPsych.request(function (settings){
		var stimuliList = [['/media/audioCat/sound.mp3','h'],['/media/audioCat/hammer.mp3', 'g']]
	    
		settings.timeline.forEach(function(block, idx, timeline){
			if(block.type == "audio-categorization"){
		        block.timeline = [
		        {stimulus: stimuliList[0][0], key_answer: stimuliList[0][1]},
		        {stimulus: stimuliList[1][0], key_answer: stimuliList[1][1]}
		        ];    
			}
			if(block.type == "similarity"){
				
				block.timeline = [
				    {stimuli: [stimuliList[0][0], stimuliList[1][0]]}
				];
			
			}
			
		});
				
		jsPsych.init({
			timeline: settings.timeline,
			on_finish:function(data){
				serverPsych.save({
				data:data
				})
			},
			display_element: $('#jsPsychTarget')
		});
	});
}