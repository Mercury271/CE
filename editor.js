// start up
$(function() {

	autoCompleteLoadField();

	// initialize trigger for typing messages
	$('#load').keypress(function(e) {
		e = e || window.event;
		var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
		// enter key pressed
		if (charCode == 13) {
			load();
		}
	});


	if($("#characterimage").length == 0) {
		// this is just the base screen
		return;
	}

	// initialize datepicker
	$( "#lastprocesseddate" ).datepicker( { dateFormat : "yy-mm-dd", firstDay: 1, minDate : new Date(2014, 5-1, 1), maxDate : "+1w" } );

	initializeSpecialMaterialCommonItems();
	// initialize weapons BEFORE filling the dropdowns
        initializeWeaponsInItemsList();
        initializeShieldsInItemsList();
        initializeArmoursInItemsList();
	initializeOneUseItems();

	// initialise popups
	$("#initdetails").dialog({ autoOpen: false })
	$("#hpdetails").dialog({ autoOpen: false })
	$("#acdetails").dialog({ autoOpen: false })
	$("#fortitudedetails").dialog({ autoOpen: false })
	$("#reflexdetails").dialog({ autoOpen: false })
	$("#willdetails").dialog({ autoOpen: false })
	$("#powerpointdetails").dialog({ autoOpen: false })
	
	// set spinners
	$(".abilityvalue").spinner({ min: 1, step: 1, stop: function( event, ui ) { recalculate(); } });
	$(".dependentsinput").spinner({ min: 0, step: 1, stop: function( event, ui ) { recalculateJob(); } })
	
	// initialize drag and drop functionality for the classes list (to allow first class to be set)
	$("#classes tbody").sortable({ cursor: "row-resize",  axis: "y", items: "tr:not(:first-child)", containment: "parent", update: function( event, ui ) { recalculate(); } });

	// connect equipment containers
	$( "#owned, #carried, #equiped, #mount" ).sortable({
		connectWith: ".equipmentcontainer",
		items: "li:not(:first-child)",
		update: function( event, ui ) { recalculate(); }
	})

	if(typeof characterName != "undefined" && characterName) {
		getCharacterData(characterName);
		setCharacterImage(avatarURL);
		$("#noteslink").attr("href", "http://www.novus-utum.org/wiki/character_sheets/" + characterName + "?do=revisions");
		// run twice to set colour correctly
		swapSanction();
		swapSanction();

	} else {
		$("#noteslink").remove();
		// fill in temporary data
		setCharacterImage("/util/no-avatar.jpg");
		setCharacterAbility("strength", 10);
		setCharacterAbility("dexterity", 10);
		setCharacterAbility("constitution", 10);
		setCharacterAbility("intelligence", 10);
		setCharacterAbility("wisdom", 10);
		setCharacterAbility("charisma", 10);
		addFeatRow();
		addClassRow();
		addUntrainedSkills();
		IN_CREATOR = true;
		$(".dependentsinput").val(0);
		$("#lastprocesseddate").attr("disabled", "disabled");
		recalculate();

		$("#loadicon").hide();
		$("#charactersheet").show();
	}

	

	$( "#jobskill" ).autocomplete({source: skillList});
	$( "#jobtitle" ).autocomplete({source: jobs});
	
	$( "#characterreligion" ).autocomplete({source: religions});
	$( "#characterfaction" ).autocomplete({source: factions});

	$("#assassinspellsknown .level1 input").autocomplete({source: spells["assassin"][1]});
	$("#assassinspellsknown .level2 input").autocomplete({source: spells["assassin"][2]});
	$("#assassinspellsknown .level3 input").autocomplete({source: spells["assassin"][3]});
	$("#assassinspellsknown .level4 input").autocomplete({source: spells["assassin"][4]});

	$("#bardspellsknown .level0 input").autocomplete({source: spells["bard"][0]});
	$("#bardspellsknown .level1 input").autocomplete({source: spells["bard"][1]});
	$("#bardspellsknown .level2 input").autocomplete({source: spells["bard"][2]});
	$("#bardspellsknown .level3 input").autocomplete({source: spells["bard"][3]});
	$("#bardspellsknown .level4 input").autocomplete({source: spells["bard"][4]});
	$("#bardspellsknown .level5 input").autocomplete({source: spells["bard"][5]});
	$("#bardspellsknown .level6 input").autocomplete({source: spells["bard"][6]});

	$("#bardsagespellsknown .level0 input").autocomplete({source: spells["bardicsage"][0]});
	$("#bardsagespellsknown .level1 input").autocomplete({source: spells["bardicsage"][1]});
	$("#bardsagespellsknown .level2 input").autocomplete({source: spells["bardicsage"][2]});
	$("#bardsagespellsknown .level3 input").autocomplete({source: spells["bardicsage"][3]});
	$("#bardsagespellsknown .level4 input").autocomplete({source: spells["bardicsage"][4]});
	$("#bardsagespellsknown .level5 input").autocomplete({source: spells["bardicsage"][5]});
	$("#bardsagespellsknown .level6 input").autocomplete({source: spells["bardicsage"][6]});

	var bgsArray = spells["beguiler advanced learning"][3];
	$("#beguilerAL3").autocomplete({source : bgsArray});

	bgsArray = $.merge([], bgsArray);
	bgsArray = $.merge(bgsArray, spells["beguiler advanced learning"][7]);
	bgsArray.sort();

	$("#beguilerAL7").autocomplete({source : bgsArray});

	bgsArray = $.merge([], bgsArray);
	bgsArray = $.merge(bgsArray, spells["beguiler advanced learning"][11]);
	bgsArray.sort();

	$("#beguilerAL11").autocomplete({source : bgsArray});

	bgsArray = $.merge([], bgsArray);
	bgsArray = $.merge(bgsArray, spells["beguiler advanced learning"][15]);
	bgsArray.sort();

	$("#beguilerAL15").autocomplete({source : bgsArray});

	bgsArray = $.merge([], bgsArray);
	bgsArray = $.merge(bgsArray, spells["beguiler advanced learning"][19]);
	bgsArray.sort();

	$("#beguilerAL19").autocomplete({source : bgsArray});

	$(".domainchoice").autocomplete({source: domainList});	

	$("#duskbladespellsknown .level1 input").autocomplete({source: spells["duskblade"][1]});
	$("#duskbladespellsknown .level2 input").autocomplete({source: spells["duskblade"][2]});
	$("#duskbladespellsknown .level3 input").autocomplete({source: spells["duskblade"][3]});
	$("#duskbladespellsknown .level4 input").autocomplete({source: spells["duskblade"][4]});
	$("#duskbladespellsknown .level5 input").autocomplete({source: spells["duskblade"][5]});


	$("#psionicfistspellsknown .level1 input").autocomplete({source: spells["psychic warrior"][1]});
	$("#psionicfistspellsknown .level2 input").autocomplete({source: spells["psychic warrior"][2]});
	$("#psionicfistspellsknown .level3 input").autocomplete({source: spells["psychic warrior"][3]});
	$("#psionicfistspellsknown .level4 input").autocomplete({source: spells["psychic warrior"][4]});
	$("#psionicfistspellsknown .level5 input").autocomplete({source: spells["psychic warrior"][5]});

	$("#psychicwarriorspellsknown .level1 input").autocomplete({source: spells["psychic warrior"][1]});
	$("#psychicwarriorspellsknown .level2 input").autocomplete({source: spells["psychic warrior"][2]});
	$("#psychicwarriorspellsknown .level3 input").autocomplete({source: spells["psychic warrior"][3]});
	$("#psychicwarriorspellsknown .level4 input").autocomplete({source: spells["psychic warrior"][4]});
	$("#psychicwarriorspellsknown .level5 input").autocomplete({source: spells["psychic warrior"][5]});
	$("#psychicwarriorspellsknown .level6 input").autocomplete({source: spells["psychic warrior"][6]});

	$("#sorcererspellsknown .level0 input").autocomplete({source: spells["sorcerer"][0]});
	$("#sorcererspellsknown .level1 input").autocomplete({source: spells["sorcerer"][1]});
	$("#sorcererspellsknown .level2 input").autocomplete({source: spells["sorcerer"][2]});
	$("#sorcererspellsknown .level3 input").autocomplete({source: spells["sorcerer"][3]});
	$("#sorcererspellsknown .level4 input").autocomplete({source: spells["sorcerer"][4]});
	$("#sorcererspellsknown .level5 input").autocomplete({source: spells["sorcerer"][5]});
	$("#sorcererspellsknown .level6 input").autocomplete({source: spells["sorcerer"][6]});
	$("#sorcererspellsknown .level7 input").autocomplete({source: spells["sorcerer"][7]});
	$("#sorcererspellsknown .level8 input").autocomplete({source: spells["sorcerer"][8]});
	$("#sorcererspellsknown .level9 input").autocomplete({source: spells["sorcerer"][9]});

	$("#warmindspellsknown .level1 input").autocomplete({source: spells["psychic warrior"][1]});
	$("#warmindspellsknown .level2 input").autocomplete({source: spells["psychic warrior"][2]});
	$("#warmindspellsknown .level3 input").autocomplete({source: spells["psychic warrior"][3]});
	$("#warmindspellsknown .level4 input").autocomplete({source: spells["psychic warrior"][4]});
	$("#warmindspellsknown .level5 input").autocomplete({source: spells["psychic warrior"][5]});

	$("#wilderspellsknown .level1 input").autocomplete({source: spells["psion"][1]});
	$("#wilderspellsknown .level2 input").autocomplete({source: spells["psion"][2]});
	$("#wilderspellsknown .level3 input").autocomplete({source: spells["psion"][3]});
	$("#wilderspellsknown .level4 input").autocomplete({source: spells["psion"][4]});
	$("#wilderspellsknown .level5 input").autocomplete({source: spells["psion"][5]});
	$("#wilderspellsknown .level6 input").autocomplete({source: spells["psion"][6]});
	$("#wilderspellsknown .level7 input").autocomplete({source: spells["psion"][7]});
	$("#wilderspellsknown .level8 input").autocomplete({source: spells["psion"][8]});
	$("#wilderspellsknown .level9 input").autocomplete({source: spells["psion"][9]});
})

var IN_CREATOR;

function addUntrainedSkills() {
        for(var key in untrainedSkills) {
                if(!hasSkill(untrainedSkills[key])) {
			addSkill(toTitleCase(untrainedSkills[key]), 0, 0, 0);
		}
        }
	recalculate();
}

function changeJob() {
	var jobtype = $("#jobtypeselect").val();
	if(jobtype == null) {
		jobtype = "";
	}
	jobtype = $.trim(jobtype.toLowerCase());
	if(jobtype == "common job") {
		$("#skilledlabourtr").hide();
		$("#jobskill").val("");

		// at least 5 ranks in survival	
		if(getSkillRanks("survival") >= 5) {
			$("#lifestyle0").removeAttr('disabled');
		} else {
			$("#lifestyle0").attr('disabled','disabled');
		}
		$("#lifestyle1").removeAttr('disabled');
		$("#lifestyle2").removeAttr('disabled');
		$("#lifestyle3").attr('disabled','disabled');
		$("#lifestyle4").attr('disabled','disabled');
		$("#lifestyle5").attr('disabled','disabled');
	} else if(jobtype == "skilled labour") {
		$("#skilledlabourtr").show();
		
		// check if 10+ ranks in skill

		if(getSkillRanks($("#jobskill").val()) >= 10) {
			$("#lifestyle1").attr('disabled','disabled');
			$("#lifestyle4").removeAttr('disabled');
		} else {
			$("#lifestyle1").removeAttr('disabled');
			$("#lifestyle4").attr('disabled','disabled');
		}

		$("#lifestyle0").attr('disabled','disabled');
		$("#lifestyle2").removeAttr('disabled');
		$("#lifestyle3").removeAttr('disabled');
		$("#lifestyle5").attr('disabled','disabled');
	} else if(jobtype == "position") {
		$("#skilledlabourtr").hide();
		$("#jobskill").val("");

		$("#lifestyle0").attr('disabled','disabled');
		$("#lifestyle1").attr('disabled','disabled');
		$("#lifestyle2").attr('disabled','disabled');

		$("#lifestyle3").removeAttr('disabled');
		$("#lifestyle4").removeAttr('disabled');
		$("#lifestyle5").removeAttr('disabled');
	} else {
		$("#skilledlabourtr").hide();
		$("#jobskill").val("");

		// Self Sufficient only with Survival 5
		if(getSkillRanks("survival") >= 5) {
			$("#lifestyle0").removeAttr('disabled');
		} else {
			$("#lifestyle0").attr('disabled','disabled');
		}
		$("#lifestyle1").removeAttr('disabled');
		$("#lifestyle2").attr('disabled','disabled');
		$("#lifestyle3").attr('disabled','disabled');
		$("#lifestyle4").attr('disabled','disabled');
		$("#lifestyle5").attr('disabled','disabled');
	}

	recalculateJob();
}

function getSkillRanks(skill) {
	skill = $.trim(skill.toLowerCase());
	var retVal = 0;

	$("#skills tr:not(:first-child)").each(function(e) {
		var skillName = $.trim($(this).find("input.skillname").val().toLowerCase());
		if(skillName == skill) {
			var skillRanks = parseInt($(this).find("input.skilldata.ranks").val());
			var skillRanksCC = parseFloat($(this).find("input.skilldata.ccranks").val());
			if(isNaN(skillRanks)) {
				skillRanks = 0;
			}
			if(isNaN(skillRanksCC)) {
				skillRanksCC = 0;
			}
			retVal = skillRanks + skillRanksCC;
			return false;
  		}
	});
	return retVal;
}

function addWizardSpell(level, spellname) {
	var html = "<div><input class='wizardspell' "
	if(spellname) {
		html += " value=\"" + spellname + "\" ";
	}
	html += "/><span class='iconbutton' onclick='deleteItem(this);' title='Click to remove this spell.'><img src='/util/character-sheets/delete.png'></span></div>";
	$("#wizardspellsknown .level" + level).append(html);

	$("#wizardspellsknown .level" + level + " input").autocomplete({source: spells["sorcerer"][level]});
}

function addDuskbladeLevel0Spell(spellname) {
	var html = "<input"
	if(spellname) {
		html += " value=\"" + spellname + "\" ";
	}
	html += "/>";
	$("#duskbladespellsknown .level0").append(html);
	$("#duskbladespellsknown .level0 input").autocomplete({source: spells["duskblade"][0]});
}

/**
 * Generic function to delete a row
 */
function deleteRow(e) {
	$(e).parents("tr").remove();
	recalculate();
}

/**
 * Add row for skills
 */
function addSkillRow() {
	$('#skills').append('<tr><td><input class="skillname" onChange="changeJob();recalculate();"></input></td><td class="skilltotalbonus">+0</td><td>=</td><td><input class="skilldata ranks" title="Number of ranks over all classes." onChange="changeJob();recalculate();"></input></td><td>+</td><td><input class="skilldata ccranks" onChange="changeJob();recalculate();" title="Number of cross class ranks invested. When investing 2 cross-class ranks for a +1 bonus, please write down 1.0."></input></td><td>+</td><td class="skilldata ability">0</td><td>+</td><td class="skilldata racial">0</td><td>+</td><td class="skilldata size">0</td><td>+</td><td class="skilldata synergy">0</td><td>+</td><td class="skilldata feats">0</td><td>+</td><td class="skilldata acp">0</td><td>+</td><td class="skilldata equipment">0</td><td>+</td><td class="skilldata special" title="Skill specific modifiers.">0</td><td>+</td><td><input class="skilldata other" onChange="recalculate();"></input></td><td><div class="iconbutton" title="Click to remove this skill." onclick="deleteRow(this);"><img src="/util/character-sheets/delete.png" /></div></td></tr>');	

	$( ".skillname" ).autocomplete({
		source: skillList
	});
	// set spinners
	$(".ranks").spinner({ min: 0, step: 1, stop: function( event, ui ) { recalculate(); } }); 
	$(".ccranks").spinner({ min: 0, step: 0.5, stop: function( event, ui ) { recalculate(); } }); 
	$(".other").spinner({ min: 0, step: 1, stop: function( event, ui ) { recalculate(); } }); 
}

/**
 * Add row for feats
 */
function addFeatRow() {
	$('#feats').append('<tr><td><input class="featfield" onChange="recalculate();"></input></td><td><span class="iconbutton" title="Click to remove this feat." onclick="deleteRow(this);"><img src="/util/character-sheets/delete.png" /></span></td></tr>');

	$( ".featfield" ).autocomplete({
		source: featList
	});
}

/**
 * Add row for class abilities
 */
function addClassAbilityRow(removeDeleteButton) {
	$('#classabilities').append('<tr><td><input class="classabilityfield"></input></td><td><span class="iconbutton" title="Click to remove this ability." onclick="deleteRow(this);"><img src="/util/character-sheets/delete.png" /></span></td></tr>');
	sortAbilities();
}

/**
 * Add row for language
 */
function addLanguageRow() {
	$('#languages').append('<tr><td><input class="languagefield" onChange="recalculate();"></input></td></tr>');
	
	$( ".languagefield" ).autocomplete({
		source: languageList
	});	
}

/**
 * Add row for class
 */
function addClassRow() {
	$('#classes').append('<tr title="Drag to change the order. The top-most class will be used for your first level (x4 skill points, maximum HP)."><td><span class="classtitle">Class: </span><input onChange="recalculate();" title="Name of the class." class="classfield"></input></td><td><span class="classtitle">Variant: </span><select class="variantfield" onChange="recalculate();" title="Variant of that class (blank for the default class)"></select></td><td><span class="classtitle">Levels: </span><input onChange="recalculate();" title="Number of levels in that class." class="classlevelfield"></input></td><td><span class="iconbutton" title="Click to remove this class." onclick="deleteRow(this);"><img src="/util/character-sheets/delete.png" /></span></td></tr>');

	$( ".classfield" ).autocomplete({
		source: classList
	});

	$(".classlevelfield").spinner({ min: 1, step: 1, stop: function( event, ui ) { recalculate(); } }); 

	fixClassVariantDropdowns();

}

/**
 * Add equipment item
 */
function addEquipmentItem(location) {
	$(location).append('<li class="equipmentItem" title="Drag and drop to equip, carry or store this item"><input class="itemname"></input><select class="itemtype" onChange="recalculate();" ><option></option><option>Armour</option><option>Clothing</option><option>Creature</option><option>Equipment</option><option>Jewellery</option><option>Magic Item</option><option>Quest Item</option><option>Real Estate</option><option>Shield</option><option>Trade Good</option><option>Weapon</option><option>Other</option></select><input class="itemweight" onChange="recalculate();"></input>lb.<input class="itemvalue" onChange="recalculate();" ></input>gp<input class="itemnumber" onChange="recalculate();" >#</input><div class="iconbutton" title="Click to remove this item." onclick="deleteItem(this);"><img src="/util/character-sheets/delete.png" /></div></li>');
	
	$( "#owned, #carried, #equiped, #mount" ).sortable({
		connectWith: ".equipmentcontainer",
		items: "li:not(:first-child)",
		update: function( event, ui ) { recalculate(); }
	})

	$( ".itemname" ).autocomplete({
		source: itemList,
		select : function () { namedItem(this); }
	});

	$( ".itemname" ).change(function() { namedItem(this); });

}

function deleteItem(self) {
	$(self).parent().remove();
	recalculate();
}

/**
 * Open a specific popup
 */
function openPopup(id) {
	$("#" + id).dialog( "open" );
}

/**
 * Return if the character has a certain skill
 */
function hasSkill(skillName) {

	skillName = $.trim(skillName.toLowerCase());

	var retVal = false;
        $(".skillname").each(function(e) {
		if($.trim($(this).val().toLowerCase()) == skillName) {
			retVal = true;
		}
	});
	return retVal;
}

/**
 * Return if the character has a certain item (anywhere)
 */
function hasItem(itemName) {
	return hasItemHelper(itemName, ".equipmentItem");	
}

/**
 * Return if the character has a certain item on their person (i.e. carried or equiped)
 */
function hasItemWith(itemName) {
	return hasItemHelper(itemName, "#carried .equipmentItem, #equiped .equipmentItem");	
}

/**
 * Return if the character has a certain item near (i.e. not stored away)
 */
function hasItemNear(itemName) {
	return hasItemHelper(itemName, "#carried .equipmentItem, #equiped .equipmentItem, #mount .equipmentItem");	
}


/**
 * Return if the character has a certain item equiped (i.e. equiped)
 */
function hasItemEquiped(itemName) {
	return hasItemHelper(itemName, "#equiped .equipmentItem");	
}

function hasItemHelper(itemName, selector) {
	itemName = $.trim(itemName.toLowerCase());
	
	var retval = false;
	
	$(selector).each(function(e) {
		var name = $.trim($(this).find('.itemname').val().toLowerCase());
		if(itemName == name) {
			retval = true;
			return false;
		}
	});
	
	return retval;
}

/** 
 * Get the levels in a class
 */
function getLevels(classnameToFind) {
	classnameToFind = $.trim(classnameToFind.toLowerCase());
	level = 0;
        $("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
                var classlevels = parseInt($(this).find(".classlevelfield").val());
                if(!isNaN(classlevels)) {
			if(classname == classnameToFind) {
				level = classlevels;
				return false;
			}
		}
	});
	return level;
	
}

/**
 * Return if the character has a certain feat.
 */
function hasFeat(featName) {
	featName = $.trim(featName.toLowerCase());
	
	var found = false;
	$("input.featfield").each(function(e) {
		var feat = $.trim($(this).val().toLowerCase());
		if(feat == featName) {
			found = true;
			return false;
		}
	});
	return found;
}

/**
 * Count how often this character has a certain feat.
 */
function countFeat(featName) {
	featName = $.trim(featName.toLowerCase());
	
	var count = 0;
	$("input.featfield").each(function(e) {
		var feat = $.trim($(this).val().toLowerCase());
		if(feat == featName) {
			count++;
		}
	});
	return count;	
}

/**
 * Count how many psionic feats this character has.
 */
function numberOfPsionicFeats() {
	var count = 0;
	$("input.featfield").each(function(e) {
		var feat = $(this).val();
		if(isPsionicFeat(feat)) {
			count++;
		}
	});
	return count;
}

/**
 * Return if the character has a certain ability.
 */
function hasAbility(abilityName) {
	return countAbility(abilityName) > 0;
}


/**
 * Count how often the character has a certain ability.
 */
function countAbility(abilityName) {
	abilityName = $.trim(abilityName.toLowerCase());
	
	var count = 0;
	
	$("input.classabilityfield").each(function(e) {
		var ability = $.trim($(this).val().toLowerCase());
		if(ability == abilityName) {
			count++;
		}
	});
	
	return count;
}

/**
 * Remove all abilities with the name abilityName from the sheet
 */
function removeAbilities(abilityName) {
	
	abilityName = $.trim(abilityName.toLowerCase());
	
	$("input.classabilityfield").each(function(e) {
		var ability = $.trim($(this).val().toLowerCase());
		if(ability == abilityName) {
			$(this).parents("tr").remove();
		}
	});
}

/**
 * Add an ability to the sheet
 */
function addAbility(name) {
	$('#classabilities').append('<tr ><td class="calculatedRow"><input disabled=disabled class="classabilityfield" value="' + name + '"></input></td><td class="nodeletebutton"></td></tr>');
}


/**
 * Calculate the bonus of an ability
 */
function calculateAbilityBonus(value) {
	return Math.floor((parseInt(value) - 10) / 2);	
}

function getCharacterData(charname) {
	
	// initialize new wiki object
	var wiki = new chatwiki.Wiki('http://www.novus-utum.org/wiki/_export/strataendpoint/', 'tech:relations_endpoint', 'tech:resources_endpoint');
	var qb = wiki.qb();

	// query skills
	wiki.queryResources(qb.query(
		qb.fields('?data'),
		qb.where(
			'union {',
				'{',
					'?data PC[ref]: character_sheets/' + charname,
				'}',
				'{',
					'?data PC[ref]: under_construction/' + charname,
				'}',
			'}'
		)
	)).then(function(data) {
		
		var body = data.body;
		for(var key in body) {
			
			var entry = body[key];
			var type = entry['is a'][0];
			
			switch(type) {
				case "character":
					setCharacterTitles(entry["Titles"]);
					setCharacterAge(entry["Age"]);
					setCharacterGender(entry["Gender"]);
					setCharacterHeight(entry["Height"]);
					setCharacterWeight(entry["Weight"]);
					setCharacterNationality(entry["Nationality"]);
					setCharacterFaction(entry["Faction"]);
					setCharacterAlignment(entry["Alignment"]);
					setCharacterReligion(entry["Religion"]);
					setCharacterFate(entry["Fate"]);
					setCharacterExperience(entry["Experience"]);
					
					setCharacterAbility("strength", entry["Strength"]);
					setCharacterAbility("dexterity", entry["Dexterity"]);
					setCharacterAbility("constitution", entry["Constitution"]);
					setCharacterAbility("intelligence", entry["Intelligence"]);
					setCharacterAbility("wisdom", entry["Wisdom"]);
					setCharacterAbility("charisma", entry["Charisma"]);

					setCharacterRace(entry["Race"]);
					
					setCharacterWealth(entry["Wealth"]);
					setJobTitle(entry["Job Title"]);
					setJobType(entry["Job Type"]);
					setJobSkill(entry["Job Skill"]);
					setLifestyle(entry["Lifestyle"]);
					setDependentChildren(entry["Dependent Children"]);
					setDependentAdults(entry["Dependent Adults"]);
					setOtherIncome(entry["Other Income"]);
					setDoneUntil(entry["Done Until"]);

					addDomains(entry["Cleric Domains"]);
					setEnergy(entry["Cleric Energy Choice"]);

					setWizardDomain(entry["Wizard Domain"]);

					
					// feats
					for(var key in entry["Feats"]) {
						addCharacterFeat(entry["Feats"][key]);
					}
					// languages
					for(var key in entry["Languages"]) {
						addCharacterLanguage(entry["Languages"][key]);
					}
					// manual abilities
					for(var key in entry["Manual Abilities"]) {
						addCharacterManualClassAbility(entry["Manual Abilities"][key]);
					}
					
					
					if(entry["Abilities Notes"]) {
						setAbilityNotes(entry["Abilities Notes"][0]);
					}
					if(entry["Equipment Notes"]) {
						setEquipmentNotes(entry["Equipment Notes"][0]);
					}
					if(entry["Spells"]) {
						setCharacterSpells(entry["Spells"][0]);
					}
					if(entry["Notes"]) {
						setCharacterNotes(entry["Notes"][0]);
					}

					if(entry["Beguiler Advanced Learning"]) {
						for(var i = 3; i <=19; i+= 4) {
							var bl3 = entry["Beguiler Advanced Learning"][0];
							var bl7 = entry["Beguiler Advanced Learning"][1];
							var bl11 = entry["Beguiler Advanced Learning"][2];
							var bl15 = entry["Beguiler Advanced Learning"][3];
							var bl19 = entry["Beguiler Advanced Learning"][4];
							addBeguilerAdvancedLearning(bl3, bl7, bl11, bl15, bl19);
						}
					}

					if(entry["Dragon Shaman Auras"]) {
						var auraArray = [];
						for(var key in entry["Dragon Shaman Auras"]) {
							auraArray.push(entry["Dragon Shaman Auras"][key]);
						}
						setDragonShamanAuras(auraArray);
					}

					for(var i = 1; i <=4; i++) {
						for(var key in entry["Assassin Level " + i + " Spells Known"]) {
							addSpellsKnown("assassin", i, entry["Assassin Level " + i + " Spells Known"][key]);
						}
					}

					for(var i = 0; i <=6; i++) {
						for(var key in entry["Bard Level " + i + " Spells Known"]) {
							addSpellsKnown("bard", i, entry["Bard Level " + i + " Spells Known"][key]);
						}
					}

					for(var i = 0; i <=6; i++) {
						for(var key in entry["Bardic Sage Level " + i + " Spells Known"]) {
							addSpellsKnown("bardsage", i, entry["Bardic Sage Level " + i + " Spells Known"][key]);
						}
					}

					for(var i = 0; i <=5; i++) {
						for(var key in entry["Duskblade Level " + i + " Spells Known"]) {
							addSpellsKnown("duskblade", i, entry["Duskblade Level " + i + " Spells Known"][key]);
						}
					}

					for(var i = 1; i <=9; i++) {
						for(var key in entry["Psion Level " + i + " Powers Known"]) {
							addSpellsKnown("psion", i, entry["Psion Level " + i + " Powers Known"][key]);
						}
					}

					for(var i = 1; i <=5; i++) {
						for(var key in entry["Psionic Fist Level " + i + " Powers Known"]) {
							addSpellsKnown("psionicfist", i, entry["Psionic Fist Level " + i + " Powers Known"][key]);
						}
					}

					for(var i = 1; i <=6; i++) {
						for(var key in entry["Psychic Warrior Level " + i + " Powers Known"]) {
							addSpellsKnown("psychicwarrior", i, entry["Psychic Warrior Level " + i + " Powers Known"][key]);
						}
					}

					for(var i = 0; i <=9; i++) {
						for(var key in entry["Sorcerer Level " + i + " Spells Known"]) {
							addSpellsKnown("sorcerer", i, entry["Sorcerer Level " + i + " Spells Known"][key]);
						}
					}

					for(var i = 1; i <=5; i++) {
						for(var key in entry["War Mind Level " + i + " Powers Known"]) {
							addSpellsKnown("warmind", i, entry["War Mind Level " + i + " Powers Known"][key]);
						}
					}

					for(var i = 1; i <=9; i++) {
						for(var key in entry["Wilder Level " + i + " Powers Known"]) {
							addSpellsKnown("wilder", i, entry["Wilder Level " + i + " Powers Known"][key]);
						}
					}

					for(var i = 1; i <=9; i++) {
						for(var key in entry["Wizard Level " + i + " Spells Known"]) {
							addSpellsKnown("wizard", i, entry["Wizard Level " + i + " Spells Known"][key]);
						}
					}
					for(var key in entry["Prohibited Schools"]) {
						addProhibitedSchool(entry["Prohibited Schools"][key]);
					}
					break;
				case "item":
					addEquipment(entry["Name"], entry["Type"], entry["Weight"], entry["Value"], entry["Number"], entry["Location"]);
					break;
				case "skill":
					addSkill(entry["Name"], entry["Ranks"], entry["CC Ranks"], entry["Other Bonus"]);
					break;
				case "class":
					addCharacterClass(entry["Name"], entry["Level"]);
					break;
				case "bonuscasterlevel":
					addBonusCasterLevels(entry["Class"], entry["Level"]);
					break;
					
				default:
					break;
			}
		}
		var jobtext = $("#jobtypeselect").val();
                if(jobtext) {
                        var jobtype = $.trim($("#jobtypeselect").val().toLowerCase());
                        if(jobtype == "skilled labour") {
                                $("#skilledlabourtr").show();
                        }
                }
		recalculate();
		$("#loadicon").hide();
		$("#charactersheet").show();		
	});

}

/**
 * An item was named, check if we can fill in any additional values.
*/
function namedItem(self) {
	var itemObject = getItemDefaults($(self).val());

	// charges
	var name = $(self).val();
	var openChargesBlock = name.toLowerCase().indexOf("[");
	var closeChargesBlock = name.toLowerCase().indexOf("charges]");
	if(closeChargesBlock == -1) {
		closeChargesBlock = name.toLowerCase().indexOf("charge]");
	}
	var overwrite = false;
	if(openChargesBlock > 0 && closeChargesBlock > 0 && closeChargesBlock > openChargesBlock) {
		var pre = name.substring(0, openChargesBlock);
		var post = name.substring(closeChargesBlock);
		var num = parseInt(name.substring(openChargesBlock + 1, closeChargesBlock));
		if(!isNaN(num)) {
			itemObject = $.extend({}, getItemDefaults($.trim(pre) + " [" + $.trim(post)));
			if(itemObject.chargevalue) {
				var itemValue = itemObject.chargevalue * num;
				if(itemObject.basevalue) {
					itemValue += itemObject.basevalue;
				}
				itemObject.value = itemValue;
				overwrite = true;
			}
		}
	}



	if(itemObject) {
		if($(self).siblings(".itemtype").val().length == 0) {
			$(self).siblings(".itemtype").val(itemObject["type"]);
		}
		if($(self).siblings(".itemweight").val().length == 0) {
			$(self).siblings(".itemweight").val(itemObject["weight"]);
		}
		if($(self).siblings(".itemvalue").val().length == 0 || overwrite) {
			$(self).siblings(".itemvalue").val(itemObject["value"]);
		}
		if($(self).siblings(".itemnumber").val().length == 0) {
			if(itemObject["number"]) {
				$(self).siblings(".itemnumber").val(itemObject["number"]);
			} else {
				$(self).siblings(".itemnumber").val(1);
			}
		}
	}
	recalculate();
}


function load() {
	var characterName = $("#load").val();
	window.location = "/tools/character-editor?character=" + characterName;

}

function submit() {
	var icpagestring = getICWikiText();
	var pagestring = getWikiText();
	var location = getCharacterName();

	if($.trim(location.toLowerCase()) == "new character") {
		alert("Please enter a character name to create a new character.");
	} else {
		$.post("commit.php", { "comment" : $("#comment").val(), "icpagestring" : icpagestring, "pagestring" : pagestring, "location" : location, "sanction" : $("#sanctionedbutton").html() }, function( data ) { 
			if(data == "1") {
			        window.location = "/tools/character-editor/?character=" + getCharacterName();			
			} else {
				alert(data);
			}
		});
	}

}

function updateName() {
	$("#charname").html($("#charactername").val());
}

function swapSanction() {
	var sanctionStatus = $("#sanctionedbutton").html();
	switch(sanctionStatus) {
		case "Sanctioned":
			$("#sanctionedbutton").html("Unsanctioned");
			$("#charname").css( "color", "#FF9900" );
			break;
		case "Unsanctioned":
			$("#sanctionedbutton").html("Sanctioned");
			$("#charname").css( "color", "black" );
			break;
		default:
			alert("Invalid sanctioning state. This error should not occur. Please report it on the forum.");
	}
}

function autoCompleteLoadField() {

        // initialize new wiki object
        var wiki = new chatwiki.Wiki('http://www.novus-utum.org/wiki/_export/strataendpoint/', 'tech:relations_endpoint', 'tech:resources_endpoint');
        var qb = wiki.qb();

        // query skills
        wiki.queryRelations(qb.query(
                qb.fields('?name'),
                qb.where(
			'?c Name: ?name',
			'?c is a: character'
                )
        )).then(function(data) {

		var characterNames = [];

                var body = data.body;
                for(var key in body) {
                        var name = body[key][0][0];
			characterNames.push(name);
		}
		characterNames.sort();

                $("#load").autocomplete({source: characterNames, select: function( event, ui ) { window.location = "/tools/character-editor?character=" + ui.item.label } });
	});

}
