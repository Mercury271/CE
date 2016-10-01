var bonusCasterArray = [ ];

var recalculating = false;

/**
 * Recalculate all automatically calculated values
 */
function recalculate() {

	if(recalculating) {
		// already doing this, don't do it multiple times.
		return;
	}
	recalculating = true;

	// remove any lines added by calculation
	$(".calculated").remove();
	$(".calculatedRow").parents("tr").remove();

	// Set the dropdown for the selected classes correctly
	fixClassVariantDropdowns();
	
	// show or hide mount, move equipment to stored if there are no more mounts
	// TODO
	
	// Carrying Capacity
	recalculateEncumbrance();

	// Culture, Race and class abilities
	recalculateRacialAbilities();
	recalculateClassAbilities();
	recalculateCultureAbilities();
	recalculateDomainAbilities();

	// Age Category
	recalculateAgeCategory();

	// Armour Class
	recalculateAC();

	// Hit Points (must happen BEFORE ability bonusses)
	recalculateHitPointData();
	
	// Speed (must happen BEFORE skill bonusses)	
	recalculateSpeed();
	
	// Skill bonusses (must happen BEFORE ability bonusses)
	recalculateSkillBonusses();
	
	// Saves (must happen BEFORE ability bonusses)
	recalculateSaves();
	
	// ability bonusses - magic items alter the value here, no nothing to do about those
	recalculateAbilityBonusses();

	// Initiative and Initiative modifiers
	recalculateInitiative();

	// Number of skillpoints and maximum sp's
	recalculateSpentSkillPoints();
	recalculateSpentAbilityPoints();
	
	// Maximum number of languages
	recalculateMaxLanguages();
	
	// *'s
	recalculateCircumstantialBonusses();

	// Creator only starting gold
	if(IN_CREATOR) {
		recalculateStartingGold();
	}
	
	// calculate Net worth
	recalculateNetWorth();
	
	// special cases for abilities
	recalculateFinalFixSpecialAbilities();

	// recalculate spells
	recalculateSpells();	

	// Hide empty spell sections
	hideEmptySpellSections();

	// calculate turn values
	recalculateTurning();

	// calculate attacks
	recalculateAttacks();

	// calculate arcane spell failure
	recalculateArcaneSpellFailure();

	// calculate job, lifestyle, income
	recalculateJob();

	// reset autocompletes for psion because different psion classes autocomplete different classes
	autoPsion();

	// automatically calculate xp for new characters
	if(IN_CREATOR) {
		calculateXP();
	}

	// sort class abilities
	sortAbilities();

	recalculating = false;

	changeJob();
}

function calculateXP() {
	// calculate our current level
	var currentLevel = 0;
	$("#classes tr:not(:first-child)").each(function(e) {
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(!isNaN(classlevels)) {
			currentLevel += classlevels;
		}
	});

	// correct for non-classed characters
	if(currentLevel == 0) {
		currentLevel = 1;
	}

	var xp = getBaseXPforLevel(currentLevel);

	$("#characterexperience").val(xp);	
}

function recalculateStartingGold() {

	var currentLevel = 0;
	var baseClass = "";

	// calculate our current level
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(!isNaN(classlevels)) {
			currentLevel += classlevels;
			baseClass = classname;
		}
	});
	// determine the proper net value
	var finalValue = getStartingGold(currentLevel, baseClass);


	// calculate our current equipment value
	var itemworth = 0;
	$(".equipmentItem").each(function(e) {
                var itemvalue = parseFloat($(this).find(".itemvalue").val());
                var itemnumber = parseInt($(this).find(".itemnumber").val());

                if(!isNaN(itemvalue) && !isNaN(itemnumber)) {
                        itemworth += itemvalue * itemnumber;
                }
        });



	// set the amount of gold
	$("#gold").val( fpFix((finalValue - itemworth)) );


}

function sortAbilities() {
        $("#classabilities").html($("#classabilities tr").sort(classAbilitySort));
}


/**
 * Helper function to sort the class abilities
 */
function classAbilitySort(a,b) {
	var one = $(a);
	var other = $(b);

	var oneValue = $.trim(one.find(".classabilityfield").val().toLowerCase());
	var otherValue = $.trim(other.find(".classabilityfield").val().toLowerCase());

	var oneManual = one.find(".nodeletebutton").length > 0;
	var otherManual = other.find(".nodeletebutton").length > 0;

	if(oneManual && !otherManual) {
		return 1;
	} else if (otherManual && !oneManual) {
		return -1;
	} else if(oneValue > otherValue) {
		return 1;
	} else if(otherValue > oneValue) {
		return -1;
	} else {
		return 0;
	}
}


function fixClassVariantDropdowns() {
	$("#classes tr:not(:first-child)").each(function() {
		// clear the variants dropdown of options
		var variantDropdown = $(this).find(".variantfield");
		var currentValue = variantDropdown.val();

		variantDropdown.html("");

		// get selected class
		var val = $(this).find(".classfield").val();
		if(!val) {
			val = "";
		}
		var selectedClass = $.trim(val.toLowerCase());

		// if it is a valid class, make dropdown entries
		if(variantLists[selectedClass]) {
			for(var key in variantLists[selectedClass]) {
				variantDropdown.append("<option value='" + variantLists[selectedClass][key] + "'>" + variantLists[selectedClass][key] + "</option>");
			}
		} else {
			// otherwise do nothing
		}
		variantDropdown.val(currentValue);

		// while we're at it, also set a maximum level
		var maxLevel = getMaxLevel(selectedClass);
		$(this).find(".ui-spinner .classlevelfield").spinner( "option", "max", maxLevel );

	});
}

// THIS FUNCTION MUST BE CALLED AFTER PROCESSING DOMAINS AND EMPTY SPELL SECTIONS
function recalculateTurning() {
	// Turn level is cleric level or cloistered cleric level (but not champion cleric) + (paladin level (but not foe hunter) - 3) + (blackguard level -2)
	
	var turnlevel = 0;
	var hierophant = false;
	var turnRebuke = "";
	var turnsOthers = false;
	
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(!isNaN(classlevels)) {
			switch(classname) {
				case "cleric":
				case "cleric (cloistered)":
					turnlevel += classlevels;
					if($("#clericturnchoice").val() == "Positive Energy") {
						// turn
						turnRebuke = "Turn";
					} else if($("#clericturnchoice").val() == "Negative Energy") {
						// rebuke
						turnRebuke = "Rebuke";
					}
					break;
				case "blackguard":
					if(classlevels >= 3) {
						turnRebuke = "Rebuke";
						turnlevel += (classlevels - 2);
					}
					break;
				case "paladin":
				case "paladin (freedom)":
					if(classlevels >= 4) {
						turnRebuke = "Turn";
						turnlevel += (classlevels - 3);
					}
					break;
				case "paladin (slaughter)":
				case "paladin (tyranny)":
					if(classlevels >= 4) {
						turnRebuke = "Rebuke";
						turnlevel += (classlevels - 3);
					}
					break;
				case "hierophant":
					hierophant = true;
					break;
				default:
					break;
			}
		}
	});
	
	if(turnlevel == 0 || turnRebuke == "") {
		// nothing to do, character cannot turn or rebuke
		return;
	}

	// get charisma bonus
	var charismabonus = calculateAbilityBonus($("#abilityvaluecharisma").val());	
	
	// calculate times per day for all turning ability groups
	// Times per day (3 + charisma + extra turning feat)
	var turnTimesPerDay = 3;
	turnTimesPerDay += charismabonus;
	turnTimesPerDay += (4 * countFeat("Extra Turning"));
	
	var turnString = {};
	// Air Domain, Earth Domain, Fire Domain, Water Domain and Plant Domain add turn types
	var domain1 = $.trim($(".domainchoice:first").val().toLowerCase());
	var domain2 = $.trim($(".domainchoice:last").val().toLowerCase());
	var domain3 = $.trim($("#cloisteredclericdomain").val().toLowerCase());

		
	// Sun converts one regular turn attempt into a greater turn attempt, so -1 on the regular amount
	if(domain1 == "sun" || domain2 == "sun" || domain3 == "sun") {
		turnTimesPerDay -= 1;
	}

	// Turn or Rebuke Undead based on cleric choice (and paladin / blackguard)
	if(turnRebuke == "Turn") {
		turnString["Turn Undead"] = turnTimesPerDay + "x/day";
	} 
	if(turnRebuke == "Rebuke") {
		turnString["Rebuke Undead"] = turnTimesPerDay + "x/day";
	}

	// Sun converts one regular turn attempt into a greater turn attempt, so -1 on the regular amount
	if(domain1 == "sun" || domain2 == "sun" || domain3 == "sun") {
		turnTimesPerDay += 1;
		turnString["Greater Turning"] = "1x/day";
	}

	
	if(domain1 == "air" || domain2 == "air" || domain3 == "air") {
		// air domain
		turnsOthers = true;
		turnString["Turn Earth / Rebuke Air Creatures"] = turnTimesPerDay + "x/day";
	}
	if(domain1 == "earth" || domain2 == "earth" || domain3 == "earth") {
		// earth domain
		turnsOthers = true;
		turnString["Turn Air / Rebuke Earth Creatures"] = turnTimesPerDay + "x/day";
	}
	if(domain1 == "fire" || domain2 == "fire" || domain3 == "fire") {
		// fire domain
		turnsOthers = true;
		turnString["Turn Water / Rebuke Fire Creatures"] = turnTimesPerDay + "x/day";
	}
	if(domain1 == "water" || domain2 == "water" || domain3 == "water") {
		// water domain
		turnsOthers = true;
		turnString["Turn Fire / Rebuke Water Creatures"] = turnTimesPerDay + "x/day";
	}
	if(domain1 == "plant" || domain2 == "plant" || domain3 == "plant") {
		// plant domain
		turnsOthers = true;
		turnString["Rebuke Plant Creatures"] = turnTimesPerDay + "x/day";
	}
	if(domain1 == "scalykind" || domain2 == "scalykind" || domain3 == "scalykind") {
		// scalykind domain
		turnsOthers = true;
		turnString["Rebuke Reptilian Animals"] = turnTimesPerDay + "x/day";
	}

	
	// Turn check bonus (1D20 + turn level + charisma + Glory Domain + Hierophant Mastery of Energy)
	var turnCheckBonus = turnlevel;
	turnCheckBonus += charismabonus;
	if(domain1 == "glory" || domain2 == "glory" || domain3 == "glory") {
		turnCheckBonus += 2;
	}
	// knowledge religion
	if(getSkillRanks("knowledge: religion") >= 5) {
		turnCheckBonus += 2;
	}

	var turnCheckString = "1d20 + <span id='baseTurnCheckBonus'>";
	
	// mastery of energy grants an a additional +4
	if(hierophant  && hasAbility("Mastery of Energy")) {
		// if you turn more than undead, list undead bonus separately
		if(turnsOthers) {
			turnCheckString += turnCheckBonus + "</span> (+4 vs Undead)";
		} else {
			// otherwise list as a singular bonus
			turnCheckBonus += 4;
			turnCheckString += turnCheckBonus + "</span>";
		}
	} else {
		turnCheckString += turnCheckBonus + "</span>";
	}
	
	// Turning Damage (2d6 + turn level + charisma + 1d6 Glory Domain + Hierophant Mastery of Energy)
	var turnDamageString = "<span id='turnDamage'>";
	if(domain1 == "glory" || domain2 == "glory" || domain3 == "glory") {
		turnDamageString += "3d6";
	} else {
		turnDamageString += "2d6";
	}
	turnDamageString += " + ";
	
	var turnDamageBonus = turnlevel;
	turnDamageBonus += charismabonus;
	// mastery of energy grants an a additional +4
	if(hierophant  && hasAbility("Mastery of Energy")) {
		turnDamageBonus += 4;
	}
	
	turnDamageString += turnDamageBonus + "</span>";
	
	// turnString
	for(var turnType in turnString) {
		var timesPerDay = turnString[turnType];
		$("#turnTable").append("<tr class='calculated turnType'><th>" + turnType + ":</th><td>" + timesPerDay + "</td></tr>");
	}
	// turnCheckString
	$("#turnTable").append("<tr class='calculated'><th>Turn Check:</th><td>" + turnCheckString + "</td></tr>");
	// turnDamageString
	$("#turnTable").append("<tr class='calculated'><th>Turn Damage:</th><td>" + turnDamageString + "</td></tr>");
	// destroyLevel
	$("#turnTable").append("<tr class='calculated'><th>Turn Level:</th><td id='turnlevel'>" + turnlevel + "</td></tr>");
	
		
	
}

function recalculateAgeCategory() {
	var age = getAge();
	if(isNaN(age)) {
		return;
	}

        var race = $.trim($("#raceselect").val().toLowerCase());
	
	// if no race is set, just display actual age
	if(race == "") {
		$("#characterage").val(age);
		return;
	}

        var agecategory = getAgeCategory(age, race);

	$("#characterage").val(age + " (" + agecategory + ")");
}

function getAge() {
	// read age variable
	var age = $("#characterage").val();
	// remove text
	age = age.replace(/\D/g,"");
	// return as number
	return parseInt(age);
}

function recalculateSpentAbilityPoints() {

	// get current ability values
	var str = parseInt($.trim($("#abilityvaluestrength").val().toLowerCase()));
	var dex = parseInt($.trim($("#abilityvaluedexterity").val().toLowerCase()));
	var con = parseInt($.trim($("#abilityvalueconstitution").val().toLowerCase()));
	var int = parseInt($.trim($("#abilityvalueintelligence").val().toLowerCase()));
	var wis = parseInt($.trim($("#abilityvaluewisdom").val().toLowerCase()));
	var cha = parseInt($.trim($("#abilityvaluecharisma").val().toLowerCase()));

	// remove item bonusses
	if(hasItemEquiped("Amulet of Health +2")) {
		con -= 2;
	}	
	if(hasItemEquiped("Cloak of Charisma +2")) {
		cha -= 2;
	}	
	if(hasItemEquiped("Gauntlets of Ogre Power")) {
		str -= 2;
	}	
	if(hasItemEquiped("Gloves of Dexterity +2")) {
		dex -= 2;
	}	
	if(hasItemEquiped("Headband of Intellect +2")) {
		int -= 2;
	}	
	if(hasItemEquiped("Periapt of Wisdom +2")) {
		wis -= 2;
	}	
	if(hasItemEquiped("Amulet of Health +4")) {
		con -= 4;
	}	
	if(hasItemEquiped("Cloak of Charisma +4")) {
		cha -= 4;
	}	
	if(hasItemEquiped("Belt of Giant Strength +4")) {
		str -= 4;
	}	
	if(hasItemEquiped("Gloves of Dexterity +4")) {
		dex -= 4;
	}	
	if(hasItemEquiped("Headband of Intellect +4")) {
		int -= 4;
	}	
	if(hasItemEquiped("Periapt of Wisdom +4")) {
		wis -= 4;
	}	

	// remove racial values
	var race = $.trim($("#raceselect").val().toLowerCase());
	switch(race) {
		case "dwarf":
			con -= 2;
			cha += 2;
			break;
		case "elf":
			dex -= 2;
			con += 2;
			break;
		case "gnome":
			con -= 2;
			str += 2;
			break;
		case "half-elf":
			break;
		case "half-orc":
			str -= 2;
			int += 2;
			cha += 2;
			break;
		case "halfling":
			dex -= 2;
			str += 2;
			break;
		case "human":
			break;
	}

	// apply age modifiers
	var age = getAge();

	var agecategory = getAgeCategory(age, race);

	switch(agecategory) {
		case "Child":
			// no rules defined for this, do nothing
			break;
		case "Adult":
			// do nothing
			break;
		case "Venerable":
			str += 3;
			dex += 3;
			con += 3;
			int -= 1;
			wis -= 1;
			cha -= 1;
			// fall through
		case "Old":
			str += 2;
			dex += 2;
			con += 2;
			int -= 1;
			wis -= 1;
			cha -= 1;
			// fall through
		case "Middle Age":
			str += 1;
			dex += 1;
			con += 1;
			int -= 1;
			wis -= 1;
			cha -= 1;
			break;
		default:
			// do nothing, though this is likely an error state
	}



	var halfelfParagon = false;
	var humanParagon = false;
	var characterLevel = 0;

	// remove class bonusses
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(!isNaN(classlevels)) {
			characterLevel += classlevels;
			if(classname == "dragon disciple") {
				switch(classlevels) {
					case 10:
						str -= 4;
						cha -= 2;
						// fall through
					case 9:
					case 8:
						int -= 2;
						// fall through
					case 7:
					case 6:
						con -= 2;
						// fall through
					case 5:
					case 4:
						str -= 2;
						// fall through
					case 3:
					case 2:
						str -= 2;
						// fall through
					case 1:
						break;
				}
			}
			if(classname == "hauwk rider" && classlevels >= 5) {
				cha -= 2;
			}
			if(classname == "dwarf paragon" && classlevels >= 3) {
				con -= 2;
			}
			if(classname == "elf paragon" && classlevels >= 3) {
				int -= 2;
			}
			if(classname == "gnome paragon" && classlevels >= 3) {
				cha -= 2;
			}
			if(classname == "half-elf paragon" && classlevels >= 3) {
				halfelfParagon = true; 
			}
			if(classname == "half-orc paragon" && classlevels >= 3) {
				str -= 2;
			}
			if(classname == "halfling paragon" && classlevels >= 3) {
				dex -= 2;
			}
			if(classname == "human paragon" && classlevels >= 3) {
				humanParagon = true;
			}
			if(classname == "orc paragon" && classlevels >= 3) {
				str -= 2;
			}
		}
	});

	if(humanParagon) {
		var maxAbility = Math.max(str, dex, con, int, wis, cha);
		if(str == maxAbility) {
			str -= 2;
		} else if(dex == maxAbility) {
			dex -= 2;
		} else if(con == maxAbility) {
			con -= 2;
		} else if(int == maxAbility) {
			int -= 2;
		} else if(wis == maxAbility) {
			wis -= 2;
		} else {
			// cha is max ability
			cha -= 2;
		}
	}

	if(halfelfParagon) {
		var maxAbility = Math.max(str, dex, con, int, wis, cha);
		if(str == maxAbility) {
			str -= 2;
		} else if(dex == maxAbility) {
			dex -= 2;
		} else if(con == maxAbility) {
			con -= 2;
		} else if(int == maxAbility) {
			int -= 2;
		} else if(wis == maxAbility) {
			wis -= 2;
		} else {
			// cha is max ability
			cha -= 2;
		}
	}

	for(var i = 0; i < Math.floor( (characterLevel / 4) ); i++) {
		var maxAbility = Math.max(str, dex, con, int, wis, cha);
		if(str == maxAbility) {
			str -= 1;
		} else if(dex == maxAbility) {
			dex -= 1;
		} else if(con == maxAbility) {
			con -= 1;
		} else if(int == maxAbility) {
			int -= 1;
		} else if(wis == maxAbility) {
			wis -= 1;
		} else {
			// cha is max ability
			cha -= 1;
		}
	}

	var pointsSpent = 0;
	pointsSpent += pointsOnBaseAbility(str);
	pointsSpent += pointsOnBaseAbility(dex);
	pointsSpent += pointsOnBaseAbility(con);
	pointsSpent += pointsOnBaseAbility(int);
	pointsSpent += pointsOnBaseAbility(wis);
	pointsSpent += pointsOnBaseAbility(cha);

	if(str < 1 || dex < 1 || con < 1 || int < 1 || wis < 1 || cha < 1) {
		$("#abilitypointsspenttotal").html("One of your ability scores is too low").css('color', 'red');
	} else if(pointsSpent >= 1000) {
		$("#abilitypointsspenttotal").html("One of your ability scores is too high").css('color', 'red');
	} else if(pointsSpent > 32) {
		$("#abilitypointsspenttotal").html(pointsSpent + " points spent out of 32").css('color', 'red');
	} else {
		$("#abilitypointsspenttotal").html(pointsSpent + " points spent out of 32").css('color', 'black');
	}
}

function pointsOnBaseAbility(baseAbility) {
	switch(baseAbility) {
		case 18:
			return 16;
		case 17:
			return 13;
		case 16:
			return 10;
		case 15:
			return 8;
		case 14:
			return 6;
		case 13:
			return 5;
		case 12:
			return 4;
		case 11:
			return 3;
		case 10:
			return 2;
		case 9:
			return 1;
		case 8:
		case 7:
		case 6:
		case 5:
		case 4:
		case 3:
		case 2:
		case 1:
			return 0;
		default:
			return 1000;
	}
}

function getInsanityScore() {
	
	var insanity = 0;

	$("input.classabilityfield").each(function(e) {
		var ability = $.trim($(this).val().toLowerCase());
		if(ability.substring(0, 9) == "insanity ") {
			insanity = parseInt(ability.substring(9));
		}
	});
	
	return insanity;

}

function recalculateDomainAbilities() {
	var domain1 = $(".domainchoice:first").val();
	var domain2 = $(".domainchoice:last").val();
	var domain3 = $("#cloisteredclericdomain").val();

	var clericLevel = 0;

	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(!isNaN(classlevels)) {
			if(classname == "cleric" || classname == "cleric (cloistered)" || classname == "cleric (champion)") {
				clericLevel += classlevels;
			}
		}
	});



	processDomainAbilities(domain1, clericLevel);
	processDomainAbilities(domain2, clericLevel);
	processDomainAbilities(domain3, clericLevel);

}

function processDomainAbilities(domain, clericLevel) {

	domain = $.trim(domain.toLowerCase());
	switch(domain) {
		case "air":
			break;
		case "animal":
			addAbility("Speak with Animals 1x/day");
			break;
		case "artifice":
			addAbility("Conjuration (Creation) Spells +1 Caster Level");
			break;
		case "chaos":
			addAbility("Chaos Spells +1 Caster Level");
			break;
		case "charm":
			addAbility("Boost Charisma 1x/day");
			break;
		case "community":
			addAbility("Calm Emotions 1x/day");
			break;
		case "creation":
			addAbility("Conjuration (Creation) Spells +2 Caster Level");
			break;
		case "darkness":
			break;
		case "death":
			addAbility("Death Touch (" + clericLevel + "d6)");
			break;
		case "destruction":
			addAbility("Smite 1x/day");
			break;
		case "earth":
			break;
		case "evil":
			addAbility("Evil Spells +1 Caster Level");
			break;
		case "fire":
			break;
		case "glory":
			break;
		case "good":
			addAbility("Good Spells +1 Caster Level");
			break;
		case "healing":
			addAbility("Healing Spells +1 Caster Level");
			break;
		case "knowledge":
			addAbility("Divination Spells +1 Caster Level");
			break;
		case "law":
			addAbility("Law Spells +1 Caster Level");
			break;
		case "liberation":
			break;
		case "luck":
			addAbility("Good Fortune 1x/day");
			break;
		case "madness":
			addAbility("Insanity " + (Math.floor(clericLevel / 2)));
			addAbility("Clarity of True Madness 1x/day");
			break;
		case "magic":
			addAbility("Improved Scroll and Wand Use");
			break;
		case "mind":
			break;
		case "nobility":
			addAbility("Inspire Allies 1x/day");
			break;
		case "plant":
			break;
		case "protection":
			addAbility("Protective Ward (+" + clericLevel + ") 1x/day");
			break;
		case "repose":
			addAbility("Death Touch (" + clericLevel + "d6)");
			break;
		case "rune":
			break;
		case "scalykind":
			break;
		case "strength":
			addAbility("Boost Strength 1x/day");
			break;
		case "sun":
			break;
		case "travel":
			addAbility("Freedom of Movement (" + clericLevel + " rounds)");
			break;
		case "trickery":
			break;
		case "war":
			break;
		case "water":
			break;
		case "weather":
			break;
	}
}

function fpFix(num) {
	return Math.round(num * 10000)/10000;
}

function getClassName(self) {
	var className = $(self).find(".classfield").val();
	if(!className) {
		return "";
	}
	var classVariant = $(self).find(".variantfield").val();
	if(classVariant) {
		return $.trim(className.toLowerCase()) + " (" + $.trim(classVariant.toLowerCase()) + ")";
	} else {
		return $.trim(className.toLowerCase());
	}
}

function getJobTypeForTitle(jobtitle) {
        if(getSkillForJob(jobtitle) != "") {
                return "Skilled Labour";
        }
        if(getWageForPosition(jobtitle) != 0) {
                return "Position";
        }
        var ret = $("#jobtypeselect").val();
	if(!ret) {
		ret = "";
	}
	return ret;

}

function recalculateJob() {
	// Automatically calculate income from job
	// set job type based on title
	var jobtext = getJobTypeForTitle($("#jobtitle").val());
	$("#jobtypeselect").val(jobtext);

	var jobtype = $.trim(jobtext.toLowerCase());
	var lst = $("#lifestyleselect").val();
	var lifestyle = "";
	if(lst) {
		lifestyle = $.trim(lst.toLowerCase());
	}

	var stipend = 0;
	var noble = false;

	// Calculate Stipend
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(!isNaN(classlevels)) {
			if(classname == "aristocrat") {
				stipend += 2*classlevels;
				noble = true;
			}
		}
	});
	$("#stipendgpweek").html( stipend );	

	if(jobtype == "common job") {
		$("#jobgpweek").html("1");

		if(lifestyle == "self-sufficient") {
			$("#lifestylegpweek").html("1");
		} else if(lifestyle == "dirt poor") {
			$("#lifestylegpweek").html("0");
		} else if(lifestyle == "meagre") {
			$("#lifestylegpweek").html("-" + $("#jobgpweek").html());
		} else {
			$("#lifestylegpweek").html("0");
			$("#lifestyleselect").val("Dirt Poor");
		}

	} else if(jobtype == "skilled labour") {
		var jobskill = $.trim($("#jobskill").val().toLowerCase());

		if(jobskill == "") {
			jobskill = getSkillForJob($("#jobtitle").val());
			if(jobskill != "") {
				$("#jobskill").val(jobskill);
			}
		}


		var basePerRank = 0.4;
		if(jobskill.indexOf("craft:") >= 0) {
			basePerRank = 0.8;
		}
		if(jobskill.indexOf("profession:") >= 0) {
			basePerRank = 1.0;
		}

		var skillranks = getSkillRanks(jobskill);
		var actualRanks = skillranks;
		if(hasFeat("Skill Focus: " + jobskill)) {
			skillranks += 3;
		}

		// skill bonus feats
		var skillFeats = getBaseBonusFeats(jobskill);
		for(var key in skillFeats) {
			var feat = skillFeats[key];
			if(hasFeat(feat)) {
				skillranks += 2;
				break;
			}
		}

		$("#jobgpweek").html(fpFix(skillranks * basePerRank));


		if(actualRanks >= 10) {
			if(lifestyle == "meagre") {
				$("#lifestylegpweek").html("1");
			} else if(lifestyle == "comfortable") {
				$("#lifestylegpweek").html("0");
			} else if(lifestyle == "luxurious") {
				$("#lifestylegpweek").html("-" + $("#jobgpweek").html());
			} else {
				$("#lifestylegpweek").html("0");
				$("#lifestyleselect").val("Comfortable");
			}
		} else {
			if(lifestyle == "dirt poor") {
				$("#lifestylegpweek").html("1");
			} else if(lifestyle == "meagre") {
				$("#lifestylegpweek").html("0");
			} else if(lifestyle == "comfortable") {
				$("#lifestylegpweek").html("-" + $("#jobgpweek").html());
			} else {
				$("#lifestylegpweek").html("0");
				$("#lifestyleselect").val("Meagre");
			}
		}


	} else if(jobtype == "position") {
		var position = $("#jobtitle").val();
		$("#jobgpweek").html(getWageForPosition(position));

		if(lifestyle == "comfortable") {
			$("#lifestylegpweek").html("1");
		} else if(lifestyle == "luxurious") {
			$("#lifestylegpweek").html("0");
		} else if(lifestyle == "extravagant") {
			$("#lifestylegpweek").html($("-" + "#jobgpweek").html());
		} else {
			$("#lifestylegpweek").html("0");
			$("#lifestyleselect").val("Luxurious");
		}
	} else {
		$("#jobgpweek").html("0");
		if(lifestyle == "self-sufficient") {
			$("#lifestylegpweek").html("1");
		} else {
			$("#lifestylegpweek").html("0");
			if(noble) {
				$("#lifestyleselect").val("Luxurious");
			} else {
				$("#lifestyleselect").val("Dirt Poor");
			}
		}
	}

	var totalAnimalCost = 0;
	// Animals
        $(".equipmentItem").each(function(e) {
                var name = $.trim($(this).find('.itemname').val().toLowerCase());
                var type = $.trim($(this).find('.itemtype').val().toLowerCase());
                var num = parseInt($.trim($(this).find('.itemnumber').val().toLowerCase()));
		if(type == "creature") {
			if(animalcost[name]) {
				totalAnimalCost += animalcost[name];
			} else {
				if(name.indexOf("[huge]") > 0) {
					totalAnimalCost += 4;
				} else if(name.indexOf("[large]") > 0) {
					totalAnimalCost += 2;
				} else if(name.indexOf("[medium]") > 0) {
					totalAnimalCost += 1;
				} else if(name.indexOf("[small]") > 0) {
					totalAnimalCost += 0.5;
				} else if(name.indexOf("[tiny]") > 0) {
					totalAnimalCost += 0.1;
				} else if(name.indexOf("[free]") > 0) {
					totalAnimalCost += 0;
				} else {
					// probably tiny
					totalAnimalCost += 0.1;
				}
			}
		}
	});
	totalAnimalCost *= -1;

	$("#animalsgpweek").html(fpFix(totalAnimalCost));

	// children
	var children = parseInt($("#numchildren").val());
	if(isNaN(children)) {
		children = 0;
	}
	$("#childgpweek").html((children * -0.5));

	// adults
	var adults = parseInt($("#numadults").val());
	if(isNaN(adults)) {
		adults = 0;
	}
	$("#adultgpweek").html(adults * -1);


	// totals
	var job = parseFloat($("#jobgpweek").html());
	if(isNaN(job)) {
		job = 0;
	}
	var lifestyleGP = parseFloat($("#lifestylegpweek").html());
	if(isNaN(lifestyleGP)) {
		lifestyleGP = 0;
	}
	var childdependents = parseFloat($("#childgpweek").html());
	if(isNaN(childdependents)) {
		childdependents = 0;
	}
	var adultdependents = parseFloat($("#adultgpweek").html());
	if(isNaN(adultdependents)) {
		adultdependents = 0;
	}
	var other = parseInt($("#othergpweek").val());
	if(isNaN(other)) {
		other = 0;
	}

	var totalPerWeek = job + stipend + lifestyleGP + childdependents + adultdependents + other + totalAnimalCost;
	$("#totalgpweek").html(fpFix(totalPerWeek));

}

function recalculateArcaneSpellFailure() {

	var isArcane = false;
	var ignoreLightArmour = false;
	var ignoreMediumArmour = false;
	var ignoreHeavyArmour = false;
	var ignoreBuckler = false;
	var ignoreLightShield = false;
	var ignoreHeavyShield = false;
	var ignoreTowerShield = false;

        $("#classes tr:not(:first-child)").each(function(e) {
                var classname = getClassName(this);
                var classlevels = parseInt($(this).find(".classlevelfield").val());
                if(!isNaN(classlevels)) {
			switch(classname) {
				case "duskblade":
					if(classlevels >= 7) {
						ignoreHeavyShield = true;
					}
					if(classlevels >= 4) {
						ignoreMediumArmour = true;
					}
					if(classlevels >= 1) {
						ignoreLightShield = true;
					}
				case "assassin":
				case "bard":
				case "bard (sage)":
				case "bard (savage)":
				case "beguiler":
				case "sorcerer (battle)":
					ignoreLightArmour = true;
				case "sorcerer (animal companion)":
				case "sorcerer":
				case "wizard":
				case "wizard (domain)":
				case "wizard (animal companion)":
				case "wizard (warrior)":
					isArcane = true;

			}
		}
	});

	if(!isArcane) {
		$("#asfPercentage").html("N/A");
		return;
	}
 
	var asf = 0;
        $("#equiped .equipmentItem").each(function(e) {
       	        var name = $(this).find('.itemname').val();
		var itemObject = getItemDefaults(name);
		if(itemObject && itemObject.asf) {
			if(ignoreLightArmour && itemObject.group == "light") {
				// don't add because we are allowed to ignore this item
			} else if(ignoreMediumArmour && itemObject.group == "medium") {
				// don't add because we are allowed to ignore this item
			} else if(ignoreHeavyArmour && itemObject.group == "heavy") {
				// don't add because we are allowed to ignore this item
			} else if(ignoreBuckler && itemObject.group == "buckler") {
				// don't add because we are allowed to ignore this item
			} else if(ignoreLightShield && itemObject.group == "light shield") {
				// don't add because we are allowed to ignore this item
			} else if(ignoreHeavyShield && itemObject.group == "heavy shield") {
				// don't add because we are allowed to ignore this item
			} else if(ignoreTowerShield && itemObject.group == "tower shield") {
				// don't add because we are allowed to ignore this item
			} else {
				asf += itemObject.asf;
			}
		}
	});

	$("#asfPercentage").html(asf + "%");
	
}

function autoPsion() {

	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(!isNaN(classlevels)) {
			var otherList = false;
			if(classname == "psion (egoist)") {
				otherList = spells["egoist"];
			} else if(classname == "psion (kineticist)") {
				otherList = spells["kineticist"];
			} else if(classname == "psion (nomad)") {
				otherList = spells["nomad"];
			} else if(classname == "psion (seer)") {
				otherList = spells["seer"];
			} else if(classname == "psion (shaper)") {
				otherList = spells["shaper"];
			} else if(classname == "psion (telepath)") {
				otherList = spells["telepath"];
			}

			if(otherList) {
				for(var i = 1; i <= 9; i++) {
					powerList = spells["psion"][i].concat(otherList[i]);
					powerList.sort();
					$("#psionspellsknown .level" + i + " input").autocomplete({source: powerList});
	
				}
			}
		}
	});
}

function recalculateAttacks() {
	// step 0: retrieve base attack bonus
	var bab = 0;
	var monklevels = 0;
	var dragondisciple = 0;
	var pyrolevels = 0;
	var soulknifelevels = 0;
	var shifterdruidlevels = 0;
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(!isNaN(classlevels)) {
			bab += getClassBAB(classname, classlevels);
			if(classname == "monk") {
				monklevels += classlevels;
			} else if(classname == "monk (cobra strike style)") {
				monklevels += classlevels;
			} else if(classname == "monk (denying stance style)") {
				monklevels += classlevels;
			} else if(classname == "monk (hand and foot style)") {
				monklevels += classlevels;
			} else if(classname == "monk (invisible eye style)") {
				monklevels += classlevels;
			} else if(classname == "monk (overwhelming attack style)") {
				monklevels += classlevels;
			} else if(classname == "monk (passive way style)") {
				monklevels += classlevels;
			} else if(classname == "monk (sleeping tiger style)") {
				monklevels += classlevels;
			} else if(classname == "monk (undying way style)") {
				monklevels += classlevels;
			} else if(classname == "monk (tough)") {
				monklevels += classlevels;
			} else if(classname == "psionic fist") {
				monklevels += classlevels;
			} else if(classname == "dragon disciple") {
				dragondisciple += classlevels;
			} else if (classname == "pyrokineticist") {
				pyrolevels += classlevels;
			} else if (classname == "soul knife") {
				soulknifelevels += classlevels;
			} else if (classname == "druid (shifter)") {
				shifterdruidlevels += classlevels;
			}
			
		}
	});
	var str = calculateAbilityBonus(parseInt($("#abilityvaluestrength").val()));
	var offhandStr = Math.floor((str/2));
	if(str < 0) {
		offhandStr = str;
	}


	// step 1: add unarmed strike
	var damageTypeUnarmed = "Subdual";
	if(monklevels > 0 || hasFeat("Improved Unarmed Strike")) {
		damageTypeUnarmed = "Bludgeoning";
	}

	// monk and regular unarmed strike
	if(monklevels <= 0) {
		var race = $("#raceselect").val();
		var isSmall = isSmallRace(race);
		var unarmedDamageDice = "1d3";
		if(isSmall) {
			unarmedDamageDice = "1d2";
		}

		addAttack("Unarmed Strike", calculateAttack(bab, "Unarmed Strike", 0), "20/x2", calculateDamage(unarmedDamageDice, str, "Unarmed Strike"), damageTypeUnarmed);

		if(hasFeat("two-weapon fighting")) {
			addDualAttack(calculateDualAttack(bab, "Unarmed Strike", "Unarmed Strike", 0), "Unarmed Strike", "20/x2", calculateDamage(unarmedDamageDice, str, "Unarmed Strike"), damageTypeUnarmed, "Unarmed Strike", "20/x2", calculateDamage(unarmedDamageDice, offhandStr, "Unarmed Strike"), damageTypeUnarmed);
		}

		if(pyrolevels >= 2 && pyrolevels < 8) {
			addAttack("Hand Afire", calculateAttack(bab, "Unarmed Strike", 0), "20/x2", calculateDamage(unarmedDamageDice, str, "Unarmed Strike") + "+2d6", damageTypeUnarmed + " and Fire");
		} else if(pyrolevels >= 8) {
			addAttack("Hand Afire", calculateAttack(bab, "Unarmed Strike", 0), "20/x2", calculateDamage(unarmedDamageDice, str, "Unarmed Strike") + "+4d6", damageTypeUnarmed + " and Fire");
		}
	} else if(monklevels <= 8) {
		// encumbrance level
		var isEncumbered;
		var isArmoured;
		var hasShield;
		// armour for sanity checking
		$("#equiped .equipmentItem").each(function(e) {
		var type = $(this).find(".itemtype").val();
			if(type == "Armour") {
				var name = $(this).find(".itemname").val();
				// special exception for bracers of armour
				if(name.toLowerCase().indexOf("bracers of armour") < 0) {
					isArmoured = true;
				}
			}
			if(type == "Shield") {
				hasShield = true;
			}
		});
	
		// encumbrance for sanity checking
		switch($("#encumbrancelevel").html()) {
			case "Light Load":
				isEncumbered = false;
				break;
			default:
				isEncumbered = true;
		}


		addAttack("Unarmed Strike", calculateAttack(bab, "Unarmed Strike", 0), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike"), damageTypeUnarmed);
		if(!hasShield && !isArmoured && !isEncumbered) {
			addAttack("Flurry of Blows", calculateMonkAttack(bab, monklevels), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike"), damageTypeUnarmed);
			if(hasFeat("two-weapon fighting")) {
				addDualAttack(calculateMonkDualAttack(bab, monklevels), "Flurry of Blows", "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike"), damageTypeUnarmed, "Unarmed Strike", "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), offhandStr, "Unarmed Strike"), damageTypeUnarmed);
			}
		} else {
			if(hasFeat("two-weapon fighting")) {
				addDualAttack(calculateDualAttack(bab, "Unarmed Strike", "Unarmed Strike", 0), "Unarmed Strike", "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike"), damageTypeUnarmed, "Unarmed Strike", "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), offhandStr, "Unarmed Strike"), damageTypeUnarmed);
			}
		}
		if(pyrolevels >= 2 && pyrolevels < 8) {
			addAttack("Hand Afire", calculateAttack(bab, "Unarmed Strike", 0), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike") + "+2d6", damageTypeUnarmed + " and Fire");
			if(!hasShield && !isArmoured && !isEncumbered) {
				addAttack("Flurry of Blows Afire", calculateMonkAttack(bab, monklevels), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()) + "+2d6", str, "Unarmed Strike"), damageTypeUnarmed + " and Fire");
			}
		} else if(pyrolevels >= 8) {
			addAttack("Hand Afire", calculateAttack(bab, "Unarmed Strike", 0), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike") + "+4d6", damageTypeUnarmed + " and Fire");
			if(!hasShield && !isArmoured && !isEncumbered) {
				addAttack("Flurry of Blows Afire", calculateMonkAttack(bab, monklevels), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()) + "+4d6", str, "Unarmed Strike"), damageTypeUnarmed + " and Fire");
			}
		}
	} else {
		// encumbrance level
		var isEncumbered;
		var isArmoured;
		var hasShield;
		// armour for sanity checking
		$("#equiped .equipmentItem").each(function(e) {
		var type = $(this).find(".itemtype").val();
			if(type == "Armour") {
				var name = $(this).find(".itemname").val();
				// special exception for bracers of armour
				if(name.toLowerCase().indexOf("bracers of armour") < 0) {
					isArmoured = true;
				}
			}
			if(type == "Shield") {
				hasShield = true;
			}
		});
	
		// encumbrance for sanity checking
		switch($("#encumbrancelevel").html()) {
			case "Light Load":
				isEncumbered = false;
				break;
			default:
				isEncumbered = true;
		}


		if(!hasShield && !isArmoured && !isEncumbered) {
			addAttack("Flurry of Blows", calculateMonkAttack(bab, monklevels), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike"), damageTypeUnarmed);
			if(hasFeat("two-weapon fighting")) {
				addDualAttack(calculateMonkDualAttack(bab, monklevels), "Flurry of Blows", "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike"), damageTypeUnarmed, "Unarmed Strike", "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), offhandStr, "Unarmed Strike"), damageTypeUnarmed);
			}
			if(pyrolevels >= 2 && pyrolevels < 8) {
				addAttack("Flurry of Blows Afire", calculateMonkAttack(bab, monklevels), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()) + "+2d6", str, "Unarmed Strike"), damageTypeUnarmed + " and Fire");
			} else if(pyrolevels >= 8) {
				addAttack("Flurry of Blows Afire", calculateMonkAttack(bab, monklevels), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()) + "+4d6", str, "Unarmed Strike"), damageTypeUnarmed + " and Fire");
			}
		} else {
			addAttack("Unarmed Strike", calculateAttack(bab, "Unarmed Strike", 0), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike"), damageTypeUnarmed);
			if(hasFeat("two-weapon fighting")) {
				addDualAttack(calculateDualAttack(bab, "Unarmed Strike", "Unarmed Strike", 0), "Unarmed Strike", "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike"), damageTypeUnarmed, "Unarmed Strike", "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), offhandStr, "Unarmed Strike"), damageTypeUnarmed);
			}
			if(pyrolevels >= 2 && pyrolevels < 8) {
				addAttack("Hand Afire", calculateAttack(bab, "Unarmed Strike", 0), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike") + "+2d6", damageTypeUnarmed + " and Fire");
			} else if(pyrolevels >= 8) {
				addAttack("Hand Afire", calculateAttack(bab, "Unarmed Strike", 0), "20/x2", calculateDamage(monkDamage(monklevels, $("#raceselect").val()), str, "Unarmed Strike") + "+4d6", damageTypeUnarmed + " and Fire");
			}
		}
	}

	// add Grapple Attack
	var classBonusToGrapple = 0;
	addGrappleAttack(bab, classBonusToGrapple, monklevels);

	// Shifter Druid form attacks
	if(shifterdruidlevels > 0) {
		var race = $("#raceselect").val();
		var small = false;
		if(isSmallRace(race)) {
			small = true;
		}


		var magicalBonus = Math.floor(shifterdruidlevels / 4);

		var predDam = str + 2;
		if(predDam > 0) {
			predDam = Math.floor(predDam * 1.5) + magicalBonus;
		}

		var attackName = "Predator Form Bite";
		if(magicalBonus > 0) {
			attackName = "+" + magicalBonus + " " + attackName;
		}
		var predDice = "1d6";
		if(small) {
			predDice = "1d4";
		}

		addAttack(attackName, calculateAttack(bab, "Bite", magicalBonus + 2), "20/x2", calculateDamage(predDice, predDam, "Bite") , "Piercing");
		

		if(shifterdruidlevels >= 5) {
			var airDam = str + 1;
			if(airDam > 0) {
				airDam = Math.floor(airDam * 1.5) + magicalBonus;
			}
			var airDice = "1d6";
			if(small) {
				airDice = "1d4";
			}

			addAttack("+" + magicalBonus + " Aerial Form Talon", calculateAttack(bab, "Talon", magicalBonus + 1), "20/x2", calculateDamage(airDice, airDam, "Talon") , "Piercing");
		}

		if(shifterdruidlevels >= 8) {
			var ferociousAttack = calculateAttack(bab, "Bite", magicalBonus + 3);
			var clawAttack = parseInt(calculateAttack(bab, "Claw", magicalBonus - 2).split("/")[0]);
			if(clawAttack >= 0) {
				clawAttack = "+" + clawAttack;
			}
			
			var clawDam = str + 4;
			if(clawDam > 0) {
				clawDam = Math.floor(clawDam * 0.5) + magicalBonus
			}
			var ferCrit = "20/x2";
			if(shifterdruidlevels >= 10) {
				ferCrit = "19-20/x2";	
			}
			var biteDice = "1d8";
			var clawDice = "1d6";
			if(small) {
				biteDice = "1d6";
				clawDice = "1d4";
			}

			addDualAttack(ferociousAttack + "<br/>" + clawAttack + "/" + clawAttack, "+" + magicalBonus + " Ferocious Slayer Form Bite", ferCrit, calculateDamage(biteDice, (str+4+magicalBonus), "Bite"), "Piercing", "+" + magicalBonus + " Ferocious Slayer Form Claw", ferCrit, calculateDamage(clawDice, clawDam, "Claw"), "Slashing");
		}

		if(shifterdruidlevels >= 12) {
			var forestAttack = calculateAttack(bab, "Slam", magicalBonus + 5);
			var forestAttack2 = forestAttack.split("/")[0];

			var forDam = str + 6 + magicalBonus;

			var forDice = "1d8";
			if(small) {
				forDice = "1d6";
			}

			addAttack("+" + magicalBonus + " Forest Avenger Form Slam", forestAttack2 + "/" + forestAttack, "20/x2", calculateDamage(forDice, forDam, "Slam"), "Bludgeoning");
		}

		if(shifterdruidlevels >= 16) {
			var elemAttack = calculateAttack(bab, "Slam", magicalBonus + 6);
			var elemAttack2 = elemAttack.split("/")[0];

			var elemDam = str + 8 + magicalBonus;

			var elemDice = "2d6";
			if(small) {
				elemDice = "1d10";
			}
			addAttack("+" + magicalBonus + " Elemental Fury Form Slam", elemAttack2 + "/" + elemAttack, "20/x2", calculateDamage(elemDice, elemDam, "Slam"), "Bludgeoning");
		}
	}

	// Dragon Disciple claw and bite attacks
	if(dragondisciple >= 2) {
		var race = $("#raceselect").val();
		var isSmall = isSmallRace(race);
		var clawDice = "1d4";
		var biteDice = "1d6";
		if(isSmall) {
			clawDice = "1d3";
			biteDice = "1d4";
		}
	
		var biteDamage = calculateDamage(biteDice, str, "Bite");
		var clawDamage = calculateDamage(clawDice, str, "Claw");

		var biteAttack = "" + calculateAttack(bab, "Bite", 0);
		var b = biteAttack.indexOf("/");
		if(b < 0) {
			b = biteAttack.length;
		}
		biteAttack = biteAttack.substring(0, b);

		var penalty = -5;

		if(hasFeat("Multiattack")) {
			penalty = -2;
		}

		var clawAttack = "" + calculateAttack(bab, "Claw", penalty);
		var c = clawAttack.indexOf("/");
		if(c < 0) {
			c = clawAttack.length;
		}
		clawAttack = clawAttack.substring(0, c);

		addAttack("Bite and Claws", biteAttack + "<br/>" + clawAttack + "/" + clawAttack, "20/x2", biteDamage + "<br/>" + clawDamage, "Piercing<br/>Slashing");

	}

	// Pyrokineticist abilities
	if(pyrolevels > 0) {
		addAttack("Fire Lash (Ranged Touch)", calculateAttack(bab, "Fire Lash", 0), "20/x2", calculateDamage("1d8", str, "Fire Lash"), "Fire");
		if(pyrolevels >= 3) {
			addAttack("Bolt of Fire (Ranged Touch)", calculateAttack(bab, "Bolt of Fire", 0), "20/x2", pyrolevels + "d6", "Fire");
		}
	}

	var weapon1 = false;
	var weapon2 = false;
	var shield = false;

	// step 2: getEquipedWeapons
        $("#equiped .equipmentItem").each(function(e) {
                var name = $(this).find('.itemname').val();
                var type = $.trim($(this).find('.itemtype').val().toLowerCase());
                var num = parseInt($.trim($(this).find('.itemnumber').val().toLowerCase()));
		if(type == "weapon") {
			if(!weapon1) {
				weapon1 = name;
				if(num >= 2) {
					weapon2 = name;
				}
			} else if(!weapon2) {
				weapon2 = name;
			} else {
				// too many weapons, ignore rest and make best effort
			}
		}
		if(type == "shield") {
			// always use shield
			shield = name;
		}
        });

	var shieldPenalty = 0;

	// cannot wield a twohander plus a shield, unless its a buckler in which case with a -1 penalty
	if(weapon1 && isTwoHanded(weapon1) && shield) {
		if(shield.toLowerCase().indexOf("buckler") >= 0) {
			shieldPenalty = -1;
		} else {
			shield = false;
		}
	}


	// can only wield one weapon with a shield (and if you have a weaponized shield, even with no weapon, you can attack with it)
	if(shield) {
		weapon2 = false;
		var shieldDetails = getItemDefaults(shield);
		if(shieldDetails && shieldDetails['isWeapon']) {
			addAttack(shield, calculateAttack(bab, shield, shieldPenalty), getCritRange(shield), calculateDamage(getWeaponDamage(shield), str, shield, false), getWeaponDamageType(shield));
		}
		if(shieldDetails && shieldDetails['rangedSpecial']) {
			var shieldDam = "1d8";
			if(shieldDetails['light']) {
				shieldDam = "1d6";
			}
			var shieldDamType = "Bludgeoning";
			if(shieldDetails['damageType']) {
				shieldDamType = shieldDetails['damageType'];
			}
			addThrownAttack(shield, calculateThrownAttack(bab, shield, shieldDetails['rangedSpecialBonus']), "20/x2", calculateDamage(shieldDam, str, shield, false), shieldDamType);
		} else if(hasFeat("Shield Sling")) {
			var shieldDam = shieldDetails['damage'];
			var shieldDamType = shieldDetails['damageType'];
			shieldDetails['rangeIncrement'] = "20 ft.";
			if(shieldDam && shieldDamType) {
				addThrownAttack(shield, calculateThrownAttack(bab, shield, 0), "20/x2", calculateDamage(shieldDam, str, shield, false), shieldDamType);
			}
		}
	}

	// cannot wield a twohander plus a secondary weapon
	if(weapon1 && isTwoHanded(weapon1)) {
		weapon2 = false;
	}

	if(weapon1 && !weapon2) {
		addAttack(weapon1, calculateAttack(bab, weapon1, shieldPenalty), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1));
		if(!isRangedWeapon(weapon1) && getWeaponRangeIncrement(weapon1)) {
			if($.trim(weapon1.toLowerCase()).indexOf("soul knife") < 0 || $.trim(weapon1.toLowerCase()).indexOf("soul knife") >= 0 && soulknifelevels >= 2) {
				addThrownAttack(weapon1, calculateThrownAttack(bab, weapon1, shieldPenalty), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1));
			}
		}
		if(isDoubleWeapon(weapon1)) {
			addDoubleWeaponAttack(bab, weapon1);
		}
		if(shield) {
			var shieldDetails = getItemDefaults(shield);
			if(shieldDetails && shieldDetails['isWeapon']) {
				addDualAttack(calculateDualAttack(bab, weapon1, shield, shieldPenalty), weapon1, getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, false), getWeaponDamageType(weapon1), shield, getCritRange(shield), calculateDamage(getWeaponDamage(shield), offhandStr, shield, false), getWeaponDamageType(shield), shield);
			}
		}

	}

	if(weapon1 && !weapon2 && isRangedWeapon(weapon1) && hasFeat("Rapid Shot")) {
		// do rapid shot
		addRapidShotAttack(weapon1, calculateAttack(bab, weapon1, -2 + shieldPenalty), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1));
	}

	if(weapon1 && !weapon2 && isRangedWeapon(weapon1) && hasFeat("Manyshot")) {
		// do many shot
		if(bab >= 6) {
			addManyShotAttack(weapon1, calculateAttack(bab, weapon1, -4 + shieldPenalty), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1), 2);
		}
		if(bab >= 11) {
			addManyShotAttack(weapon1, calculateAttack(bab, weapon1, -6 + shieldPenalty), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1), 3);
		}
		if(bab >= 16) {
			addManyShotAttack(weapon1, calculateAttack(bab, weapon1, -8 + shieldPenalty), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1), 4);
		}
	}

	

	if(weapon1 && weapon2) {
		addAttack(weapon1, calculateAttack(bab, weapon1, shieldPenalty), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1), getWeaponDamageType(weapon1));
		if(!isRangedWeapon(weapon1) && getWeaponRangeIncrement(weapon1)) {
			if($.trim(weapon1.toLowerCase()).indexOf("soul knife") < 0 || $.trim(weapon1.toLowerCase()).indexOf("soul knife") >= 0 && soulknifelevels >= 2) {
				addThrownAttack(weapon1, calculateThrownAttack(bab, weapon1, shieldPenalty), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1));
			}
		}
		if(weapon1 != weapon2) {
			addAttack(weapon2, calculateAttack(bab, weapon2, shieldPenalty), getCritRange(weapon2), calculateDamage(getWeaponDamage(weapon2), str, weapon2), getWeaponDamageType(weapon2));	
			if(!isRangedWeapon(weapon2) && getWeaponRangeIncrement(weapon2)) {
				if($.trim(weapon2.toLowerCase()).indexOf("soul knife") < 0 || $.trim(weapon2.toLowerCase()).indexOf("soul knife") >= 0 && soulknifelevels >= 2) {
					addThrownAttack(weapon2, calculateThrownAttack(bab, weapon2, shieldPenalty), getCritRange(weapon2), calculateDamage(getWeaponDamage(weapon2), str, weapon2, (!shield)), getWeaponDamageType(weapon2));
				}
			}
		}
		// do dual wield attack
		addDualAttack(calculateDualAttack(bab, weapon1, weapon2, shieldPenalty), weapon1, getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1), getWeaponDamageType(weapon1), weapon2, getCritRange(weapon2), calculateDamage(getWeaponDamage(weapon2), offhandStr, weapon2), getWeaponDamageType(weapon2));
	}

	// step 2: carried items
        $("#carried .equipmentItem").each(function(e) {
                var name = $(this).find('.itemname').val();
                var type = $.trim($(this).find('.itemtype').val().toLowerCase());
                var num = parseInt($.trim($(this).find('.itemnumber').val().toLowerCase()));
		if(type == "weapon") {
			weapon1 = name;
			addAttack(weapon1, calculateAttack(bab, weapon1, 0), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1));
			if(!isRangedWeapon(weapon1) && getWeaponRangeIncrement(weapon1)) {
				if($.trim(weapon1.toLowerCase()).indexOf("soul knife") < 0 || $.trim(weapon1.toLowerCase()).indexOf("soul knife") >= 0 && soulknifelevels >= 2) {
					addThrownAttack(weapon1, calculateThrownAttack(bab, weapon1, 0), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1));
				}
			}
			if(isRangedWeapon(weapon1) && hasFeat("Rapid Shot")) {
				// do rapid shot
				addRapidShotAttack(weapon1, calculateAttack(bab, weapon1, -2), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1));
			}

			if(isRangedWeapon(weapon1) && hasFeat("Manyshot")) {
				// do many shot
				if(bab >= 6) {
					addManyShotAttack(weapon1, calculateAttack(bab, weapon1, -4), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1), 2);
				}
				if(bab >= 11) {
					addManyShotAttack(weapon1, calculateAttack(bab, weapon1, -6), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1), 3);
				}
				if(bab >= 16) {
					addManyShotAttack(weapon1, calculateAttack(bab, weapon1, -8), getCritRange(weapon1), calculateDamage(getWeaponDamage(weapon1), str, weapon1, (!shield)), getWeaponDamageType(weapon1), 4);
				}
	
			}
			if(isDoubleWeapon(weapon1)) {
				addDoubleWeaponAttack(bab, weapon1);
			}
		}
        });

	// Step 3: melee and ranged touch attack
	var meleeTouchAttack = bab;
	meleeTouchAttack += str;
	var rangedTouchAttack = bab;
	rangedTouchAttack += calculateAbilityBonus(parseInt($("#abilityvaluedexterity").val()));
	var race = $("#raceselect").val();
	if(isSmallRace(race)) {
		meleeTouchAttack += 1;
		rangedTouchAttack += 1;
	}

	if(hasFeat("Weapon Focus: Ray")) {
		rangedTouchAttack += 1;
		if(hasFeat("Greater Weapon Focus: Ray")) {
			rangedTouchAttack += 1;
		}
	}

	if(hasFeat("Weapon Focus: Unarmed Strike")) {
		meleeTouchAttack += 1;
		if(hasFeat("Greater Weapon Focus: Unarmed Strike")) {
			meleeTouchAttack += 1;
		}
	}

	if(rangedTouchAttack >= 0) {
		rangedTouchAttack = "+" + rangedTouchAttack;
	}
	if(meleeTouchAttack >= 0) {
		meleeTouchAttack = "+" + meleeTouchAttack;
	}

	$("#meleetouchattack").html(meleeTouchAttack);
	$("#rangedtouchattack").html(rangedTouchAttack);
}

function calculateDamage(dice, str, weapon, otherhandFree) {

	// special case for crossbows
	if(maxStrength(weapon) < str) {
		str = maxStrength(weapon);
	}

	if(isTwoHanded(weapon) || (canBeTwoHanded(weapon) && otherhandFree)) {

		// special case for sling, longbows and shortbows
		if(!(
			$.trim(getPureWeapon(weapon).toLowerCase()) == "sling" ||
			$.trim(getPureWeapon(weapon).toLowerCase()) == "longbow" ||
			$.trim(getPureWeapon(weapon).toLowerCase()) == "shortbow"
		)) {
			if(str > 0) {
				str = Math.floor(str * 1.5);
			}
		}
	}

	if($.trim(getPureWeapon(weapon).toLowerCase()) == "light crossbow" ||
		$.trim(getPureWeapon(weapon).toLowerCase()) == "heavy crossbow" ||
		$.trim(getPureWeapon(weapon).toLowerCase()) == "repeating light crossbow" ||
		$.trim(getPureWeapon(weapon).toLowerCase()) == "repeating heavy crossbow" ||
		$.trim(getPureWeapon(weapon).toLowerCase()) == "hand crossbow"
	) {

		// handle Crossbow Sniper feat
		if(hasFeat("Crossbow Sniper")) {
			
			var dex = calculateAbilityBonus(parseInt($("#abilityvaluedexterity").val()));

			dex = Math.floor(dex / 2);
			if(dex < 0) {
				dex = 0;
			}
			if($.trim(getPureWeapon(weapon).toLowerCase()) == "light crossbow" && hasFeat("Weapon Focus: Light Crossbow")) {
				str = dex;	
			} else if($.trim(getPureWeapon(weapon).toLowerCase()) == "heavy crossbow" && hasFeat("Weapon Focus: Light Crossbow")) {
				str = dex;	
			} else if($.trim(getPureWeapon(weapon).toLowerCase()) == "repeating light crossbow" && hasFeat("Weapon Focus: Light Crossbow")) {
				str = dex;	
			} else if($.trim(getPureWeapon(weapon).toLowerCase()) == "repeating heavy crossbow" && hasFeat("Weapon Focus: Light Crossbow")) {
				str = dex;	
			} else if($.trim(getPureWeapon(weapon).toLowerCase()) == "hand crossbow" && hasFeat("Weapon Focus: Light Crossbow")) {
				str = dex;	
			} else {
				str = 0;
			}
		} else {
			str = 0;
		}
	}

	str += weaponDamageBonus(weapon);

	// Weapon Specialization
	if(hasFeat("weapon specialization: " + getPureWeapon(weapon))) {
		str += 2;
	}
	// Greater Weapon Specialization
	if(hasFeat("greater weapon specialization: " + getPureWeapon(weapon))) {
		str += 2;
	}

	// Weapon Mastery feats
	if(isRangedWeapon(getPureWeapon(weapon))) {
		// Ranged Weapon Mastery
		if(hasFeat("Ranged Weapon Mastery: Bludgeoning") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("bludgeoning") > -1) {
			str += 2;
		} else if(hasFeat("Ranged Weapon Mastery: Piercing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("piercing") > -1) {
			str += 2;
		} else if(hasFeat("Ranged Weapon Mastery: Slashing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("slashing") > -1) {
			str += 2;
		}
	} else {
		// Melee Weapon Mastery
		if(hasFeat("Melee Weapon Mastery: Bludgeoning") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("bludgeoning") > -1) {
			str += 2;
		} else if(hasFeat("Melee Weapon Mastery: Piercing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("piercing") > -1) {
			str += 2;
		} else if(hasFeat("Melee Weapon Mastery: Slashing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("slashing") > -1) {
			str += 2;
		}
	}

	
	if(str > 0) {
		str = "+" + str;
	} else if (str == 0) {
		str = "";
	}

	return dice + str;
}

function calculateAttack(bab, weapon, other) {

	var ability = calculateAbilityBonus(parseInt($("#abilityvaluestrength").val()));

	if(isRangedWeapon(weapon)) {
		ability = calculateAbilityBonus(parseInt($("#abilityvaluedexterity").val()));
	} else if(hasFeat("Weapon Finesse")) {
		if(isLightWeapon(weapon) || $.trim(getPureWeapon(weapon)) == "rapier" || $.trim(getPureWeapon(weapon)) == "spiked chain" || $.trim(getPureWeapon(weapon)) == "whip" || $.trim(getPureWeapon(weapon)) == "unarmed strike") {
			var dex = calculateAbilityBonus(parseInt($("#abilityvaluedexterity").val()));

			// check for shield
		        $("#equiped .equipmentItem").each(function(e) {
		                var name = $(this).find('.itemname').val();
		                var type = $.trim($(this).find('.itemtype').val().toLowerCase());
				if(type == "shield") {
					// always use shield
					var shield = getItemDefaults(name);
					dex += shield['acp'];
				}
		        });

			if(dex > ability) {
				ability = dex;
			}
		}
	}

	var onehandpenalty = 0;
	var isHeavyCrossbow = false;
	var isLightCrossbow = false;
	var isHandCrossbow = false;

	if(weapon.toLowerCase().indexOf("heavy crossbow") > -1) {

		isHeavyCrossbow = true;

		// check for shield with crossbows
		$("#equiped .equipmentItem").each(function(e) {
			var name = $(this).find('.itemname').val();
		        var type = $.trim($(this).find('.itemtype').val().toLowerCase());
			if(type == "shield") {
				onehandpenalty = -4;
			}
		});
	} else if(weapon.toLowerCase().indexOf("light crossbow") > -1) {

		isLightCrossbow = true;

		// check for shield with crossbows
		$("#equiped .equipmentItem").each(function(e) {
			var name = $(this).find('.itemname').val();
		        var type = $.trim($(this).find('.itemtype').val().toLowerCase());
			if(type == "shield") {
				onehandpenalty = -2;
			}
		});
	} else if(weapon.toLowerCase().indexOf("hand crossbow") > -1) {
		isHandCrossbow = true;
	}


	// TODO: test for too-heavy composite bow
	var lowStrCompositePenalty = 0;
	var str = calculateAbilityBonus(parseInt($("#abilityvaluestrength").val()));
	if(maxStrength(weapon) < 9999 && maxStrength(weapon) > str && weapon.toLowerCase().indexOf("composite") >= 0) {
		lowStrCompositePenalty = -2;		
	}

	var weaponBonus = weaponAttackBonus(weapon);

	var ff = 0;
	if(hasFeat("Weapon Focus: " + getPureWeapon(weapon))) {
		ff += 1;
	}
	if(hasFeat("Greater Weapon Focus: " + getPureWeapon(weapon))) {
		ff += 1;
	}


        // Weapon Mastery feats
        if(isRangedWeapon(getPureWeapon(weapon))) {
                // Ranged Weapon Mastery
                if(hasFeat("Ranged Weapon Mastery: Bludgeoning") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("bludgeoning") > -1) {
                        ff += 2;
                } else if(hasFeat("Ranged Weapon Mastery: Piercing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("piercing") > -1) {
                        ff += 2;
                } else if(hasFeat("Ranged Weapon Mastery: Slashing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("slashing") > -1) {
                        ff += 2;
                }
        } else {
                // Melee Weapon Mastery
                if(hasFeat("Melee Weapon Mastery: Bludgeoning") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("bludgeoning") > -1) {
                        ff += 2;
                } else if(hasFeat("Melee Weapon Mastery: Piercing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("piercing") > -1) {
                        ff += 2;
                } else if(hasFeat("Melee Weapon Mastery: Slashing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("slashing") > -1) {
                        ff += 2;
                }
        }


	var race = $("#raceselect").val();
	var sizeBonus = 0;
	if(isSmallRace(race)) {
		sizeBonus = 1;
	}
	if($.trim(race.toLowerCase()) == "halfling" && $.trim(getPureWeapon(weapon).toLowerCase()) == "sling") {
		sizeBonus += 1;
	}

	var totalBase = bab + ability + weaponBonus + other + ff + sizeBonus + onehandpenalty + lowStrCompositePenalty;

	// Lesser Bracers of Archery
	if($.trim(getPureWeapon(weapon).toLowerCase()) == "longbow" || $.trim(getPureWeapon(weapon).toLowerCase()) == "shortbow") {
		if(hasItem("lesser bracers of archery")) {
			totalBase++;
		}
	}

	var secondAttack = false;
	var thirdAttack = false;
	var fourthAttack = false;
	if(bab >= 16 && !isHeavyCrossbow && (!isLightCrossbow || (isLightCrossbow && hasFeat("Rapid Reload: Light Crossbow"))) && (!isHandCrossbow || (isHandCrossbow && hasFeat("Rapid Reload: Hand Crossbow")))) {
		fourthAttack = totalBase - 15;
		if(fourthAttack >= 0) {
			fourthAttack = "+" + fourthAttack;
		}
	}
	if(bab >= 11 && !isHeavyCrossbow && (!isLightCrossbow || (isLightCrossbow && hasFeat("Rapid Reload: Light Crossbow"))) && (!isHandCrossbow || (isHandCrossbow && hasFeat("Rapid Reload: Hand Crossbow")))) {
		thirdAttack = totalBase - 10;
		if(thirdAttack >= 0) {
			thirdAttack = "+" + thirdAttack;
		}
	}
	if(bab >= 6 && !isHeavyCrossbow && (!isLightCrossbow || (isLightCrossbow && hasFeat("Rapid Reload: Light Crossbow"))) && (!isHandCrossbow || (isHandCrossbow && hasFeat("Rapid Reload: Hand Crossbow")))) {
		secondAttack = totalBase - 5;
		if(secondAttack >= 0) {
			secondAttack = "+" + secondAttack;
		}
	}

	if(totalBase >= 0) {
		totalBase = "+" + totalBase;
	}

	var finalAttack = totalBase;
	if(secondAttack) {
		finalAttack += "/" + secondAttack;
		if(thirdAttack) {
			finalAttack += "/" + thirdAttack;
			if(fourthAttack) {
				finalAttack += "/" + fourthAttack;
			}
		}
	}

	return finalAttack;
}

function calculateMonkAttack(bab, monklevel, other) {

	if(!other) {
		other = 0;
	}

	var ability = calculateAbilityBonus(parseInt($("#abilityvaluestrength").val()));

	if(hasFeat("Weapon Finesse")) {
		var dex = calculateAbilityBonus(parseInt($("#abilityvaluedexterity").val()));

		if(dex > ability) {
			ability = dex;
		}
	}


	var ff = 0;
	if(hasFeat("Weapon Focus: Unarmed Strike")) {
		ff += 1;
	}
	if(hasFeat("Greater Weapon Focus: Unarmed Strike")) {
		ff += 1;
	}

        // Melee Weapon Mastery
        if(hasFeat("Melee Weapon Mastery: Bludgeoning")) {
                ff += 2;
        }


	var race = $("#raceselect").val();
	var sizeBonus = 0;
	if(isSmallRace(race)) {
		sizeBonus = 1;
	}

	monkPenalty = -2;
	if(monklevel >= 5) {
		monkPenalty = -1;
	}
	if(monklevel >= 9) {
		monkPenalty = 0;
	}

	var totalBase = bab + ability + ff + sizeBonus + monkPenalty + other;

	var secondAttack = false;
	var thirdAttack = false;
	var fourthAttack = false;
	if(bab >= 16) {
		fourthAttack = totalBase - 15;
		if(fourthAttack >= 0) {
			fourthAttack = "+" + fourthAttack;
		}
	}
	if(bab >= 11) {
		thirdAttack = totalBase - 10;
		if(thirdAttack >= 0) {
			thirdAttack = "+" + thirdAttack;
		}
	}
	if(bab >= 6) {
		secondAttack = totalBase - 5;
		if(secondAttack >= 0) {
			secondAttack = "+" + secondAttack;
		}
	}

	if(totalBase >= 0) {
		totalBase = "+" + totalBase;
	}

	var finalAttack = totalBase;
	if(secondAttack) {
		finalAttack += "/" + secondAttack;
		if(thirdAttack) {
			finalAttack += "/" + thirdAttack;
			if(fourthAttack) {
				finalAttack += "/" + fourthAttack;
			}
		}
	}

	// base extra flurry attack
	finalAttack = totalBase + "/" + finalAttack;

	// additional extra flurry attack
	if(monklevel >= 11) {
		finalAttack = totalBase + "/" + finalAttack;
	}

	return finalAttack;
}

function calculateMonkDualAttack(bab, monklevel) {

	var mainHandBase = calculateMonkAttack(bab, monklevel, -2);

	var ability = calculateAbilityBonus(parseInt($("#abilityvaluestrength").val()));

	if(hasFeat("Weapon Finesse")) {
		var dex = calculateAbilityBonus(parseInt($("#abilityvaluedexterity").val()));

		if(dex > ability) {
			ability = dex;
		}
	}


	var ff = 0;
	if(hasFeat("Weapon Focus: Unarmed Strike")) {
		ff += 1;
	}
	if(hasFeat("Greater Weapon Focus: Unarmed Strike")) {
		ff += 1;
	}

	if(hasFeat("Melee Weapon Mastery: Bludgeoning")) {
		ff += 2;
	}

	var race = $("#raceselect").val();
	var sizeBonus = 0;
	if(isSmallRace(race)) {
		sizeBonus = 1;
	}

	monkPenalty = -2;
	if(monklevel >= 5) {
		monkPenalty = -1;
	}
	if(monklevel >= 9) {
		monkPenalty = 0;
	}

	var totalBase = bab + ability + ff + sizeBonus + monkPenalty - 2;

	var secondAttack = false;
	var thirdAttack = false;

	if(bab >= 11 && hasFeat("Greater Two-Weapon Fighting")) {
		thirdAttack = totalBase - 10;
		if(thirdAttack >= 0) {
			thirdAttack = "+" + thirdAttack;
		}
	}
	if(bab >= 6 && hasFeat("Improved Two-Weapon Fighting")) {
		secondAttack = totalBase - 5;
		if(secondAttack >= 0) {
			secondAttack = "+" + secondAttack;
		}
	}

	if(totalBase >= 0) {
		totalBase = "+" + totalBase;
	}

	var finalAttack = totalBase;
	if(secondAttack) {
		finalAttack += "/" + secondAttack;
		if(thirdAttack) {
			finalAttack += "/" + thirdAttack;
		}
	}

	return mainHandBase + "<br/>" + finalAttack;
}


function calculateThrownAttack(bab, weapon, other) {

	var ability = calculateAbilityBonus(parseInt($("#abilityvaluedexterity").val()));

	var weaponBonus = weaponAttackBonus(weapon);

	var ff = 0;
	if(hasFeat("Weapon Focus: " + getPureWeapon(weapon))) {
		ff += 1;
	}
	if(hasFeat("Greater Weapon Focus: " + getPureWeapon(weapon))) {
		ff += 1;
	}


        // Ranged Weapon Mastery
        if(hasFeat("Ranged Weapon Mastery: Bludgeoning") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("bludgeoning") > -1) {
                ff += 2;
        } else if(hasFeat("Ranged Weapon Mastery: Piercing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("piercing") > -1) {
                ff += 2;
        } else if(hasFeat("Ranged Weapon Mastery: Slashing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("slashing") > -1) {
                ff += 2;
        }


	var race = $("#raceselect").val();
	var sizeBonus = 0;
	if(isSmallRace(race)) {
		sizeBonus = 1;
	}

	var raceBonus = 0;
	if($.trim(race.toLowerCase()) == "halfling") {
		raceBonus = 1;
	}
	var totalBase = bab + ability + weaponBonus + other + ff + sizeBonus + raceBonus;

	var secondAttack = false;
	var thirdAttack = false;
	var fourthAttack = false;
	if(bab >= 16 && hasFeat("Quick Draw")) {
		fourthAttack = totalBase - 15;
		if(fourthAttack >= 0) {
			fourthAttack = "+" + fourthAttack;
		}
	}
	if(bab >= 11 && hasFeat("Quick Draw")) {
		thirdAttack = totalBase - 10;
		if(thirdAttack >= 0) {
			thirdAttack = "+" + thirdAttack;
		}
	}
	if(bab >= 6 && hasFeat("Quick Draw")) {
		secondAttack = totalBase - 5;
		if(secondAttack >= 0) {
			secondAttack = "+" + secondAttack;
		}
	}

	if(totalBase >= 0) {
		totalBase = "+" + totalBase;
	}

	var finalAttack = totalBase;

	if(secondAttack) {
		finalAttack += "/" + secondAttack;
		if(thirdAttack) {
			finalAttack += "/" + thirdAttack;
			if(fourthAttack) {
				finalAttack += "/" + fourthAttack;
			}
		}
	}

	return finalAttack;
}

function calculateDualAttack(bab, weapon1, weapon2, other) {

	var ability1 = calculateAbilityBonus(parseInt($("#abilityvaluestrength").val()));
	var ability2 = calculateAbilityBonus(parseInt($("#abilityvaluestrength").val()));

	if(isRangedWeapon(weapon1)) {
		ability1 = calculateAbilityBonus(parseInt($("#abilityvaluedexterity").val()));
	}
	if(isRangedWeapon(weapon2)) {
		ability2 = calculateAbilityBonus(parseInt($("#abilityvaluedexterity").val()));
	}
	if(hasFeat("Weapon Finesse")) {
		var dex1 = false;
		var dex2 = false;

		if(isLightWeapon(weapon1) || $.trim(getPureWeapon(weapon1)) == "rapier" || $.trim(getPureWeapon(weapon1)) == "spiked chain" || $.trim(getPureWeapon(weapon1)) == "whip" || $.trim(getPureWeapon(weapon1)) == "unarmed strike") {
			dex1 = calculateAbilityBonus(parseInt($("#abilityvaluedexterity").val()));
		}
		if(isLightWeapon(weapon2) || $.trim(getPureWeapon(weapon2)) == "rapier" || $.trim(getPureWeapon(weapon2)) == "spiked chain" || $.trim(getPureWeapon(weapon2)) == "whip" || $.trim(getPureWeapon(weapon2)) == "unarmed strike") {
			dex2 = calculateAbilityBonus(parseInt($("#abilityvaluedexterity").val()));
		}

		if(dex1 || dex2) {

			// check for shield
		        $("#equiped .equipmentItem").each(function(e) {
	        	        var name = $(this).find('.itemname').val();
	                	var type = $.trim($(this).find('.itemtype').val().toLowerCase());
				if(type == "shield") {
					// always use shield
					var shield = getItemDefaults(name);
					if(dex1) {
						dex1 += shield['acp'];
					}
					if(dex2) {
						dex2 += shield['acp'];
					}
				}
		        });
		}

		if(dex1 && dex1 > ability1) {
			ability1 = dex1;
		}
		if(dex2 && dex2 > ability2) {
			ability2 = dex2;
		}
	}

	var weapon1Bonus = weaponAttackBonus(weapon1);

	var ff1 = 0;
	if(hasFeat("Weapon Focus: " + getPureWeapon(weapon1))) {
		ff1 += 1;
	}
	if(hasFeat("Greater Weapon Focus: " + getPureWeapon(weapon1))) {
		ff1 += 1;
	}

        // Weapon Mastery feats
        if(isRangedWeapon(getPureWeapon(weapon1))) {
                // Ranged Weapon Mastery
                if(hasFeat("Ranged Weapon Mastery: Bludgeoning") && getWeaponDamageType(getPureWeapon(weapon1)).toLowerCase().indexOf("bludgeoning") > -1) {
                        ff1 += 2;
                } else if(hasFeat("Ranged Weapon Mastery: Piercing") && getWeaponDamageType(getPureWeapon(weapon1)).toLowerCase().indexOf("piercing") > -1) {
                        ff1 += 2;
                } else if(hasFeat("Ranged Weapon Mastery: Slashing") && getWeaponDamageType(getPureWeapon(weapon1)).toLowerCase().indexOf("slashing") > -1) {
                        ff1 += 2;
                }
        } else {
                // Melee Weapon Mastery
                if(hasFeat("Melee Weapon Mastery: Bludgeoning") && getWeaponDamageType(getPureWeapon(weapon1)).toLowerCase().indexOf("bludgeoning") > -1) {
                        ff1 += 2;
                } else if(hasFeat("Melee Weapon Mastery: Piercing") && getWeaponDamageType(getPureWeapon(weapon1)).toLowerCase().indexOf("piercing") > -1) {
                        ff1 += 2;
                } else if(hasFeat("Melee Weapon Mastery: Slashing") && getWeaponDamageType(getPureWeapon(weapon1)).toLowerCase().indexOf("slashing") > -1) {
                        ff1 += 2;
                }
        }

	var weapon2Bonus = weaponAttackBonus(weapon2);

	var ff2 = 0;
	if(hasFeat("Weapon Focus: " + getPureWeapon(weapon2))) {
		ff2 += 1;
	}
	if(hasFeat("Greater Weapon Focus: " + getPureWeapon(weapon2))) {
		ff2 += 1;
	}

        // Weapon Mastery feats
        if(isRangedWeapon(getPureWeapon(weapon2))) {
                // Ranged Weapon Mastery
                if(hasFeat("Ranged Weapon Mastery: Bludgeoning") && getWeaponDamageType(getPureWeapon(weapon2)).toLowerCase().indexOf("bludgeoning") > -1) {
                        ff2 += 2;
                } else if(hasFeat("Ranged Weapon Mastery: Piercing") && getWeaponDamageType(getPureWeapon(weapon2)).toLowerCase().indexOf("piercing") > -1) {
                        ff2 += 2;
                } else if(hasFeat("Ranged Weapon Mastery: Slashing") && getWeaponDamageType(getPureWeapon(weapon2)).toLowerCase().indexOf("slashing") > -1) {
                        ff2 += 2;
                }
        } else {
                // Melee Weapon Mastery
                if(hasFeat("Melee Weapon Mastery: Bludgeoning") && getWeaponDamageType(getPureWeapon(weapon2)).toLowerCase().indexOf("bludgeoning") > -1) {
                        ff2 += 2;
                } else if(hasFeat("Melee Weapon Mastery: Piercing") && getWeaponDamageType(getPureWeapon(weapon2)).toLowerCase().indexOf("piercing") > -1) {
                        ff2 += 2;
                } else if(hasFeat("Melee Weapon Mastery: Slashing") && getWeaponDamageType(getPureWeapon(weapon2)).toLowerCase().indexOf("slashing") > -1) {
                        ff2 += 2;
                }
        }

	var offhandPenalty1 = -6;
	var offhandPenalty2 = -10;
	if(isLightWeapon(weapon2)) {
		offhandPenalty1 += 2;
		offhandPenalty2 += 2;
	}
	if(hasFeat("two-weapon fighting")) {
		offhandPenalty1 += 2;
		offhandPenalty2 += 6;
	}
	if(weapon2.toLowerCase().indexOf("shield") > -1 && hasFeat("Agile Shield Fighter")) {
		offhandPenalty1 = -2;
		offhandPenalty2 = -2;
	}

	var isHeavyCrossbow1 = false;
	var isLightCrossbow1 = false;
	var isHandCrossbow1 = false;
	var isHeavyCrossbow2 = false;
	var isLightCrossbow2 = false;
	var isHandCrossbow2 = false;

	if(weapon1.toLowerCase().indexOf("heavy crossbow") > -1) {
		isHeavyCrossbow1 = true;
		offhandPenalty1 -= 4;
	}
	if(weapon2.toLowerCase().indexOf("heavy crossbow") > -1) {
		isHeavyCrossbow2 = true;
		offhandPenalty2 -= 4;
	}

	if(weapon1.toLowerCase().indexOf("light crossbow") > -1) {
		isLightCrossbow1 = true;
		offhandPenalty1 -= 2;
	}
	if(weapon2.toLowerCase().indexOf("light crossbow") > -1) {
		isLightCrossbow2 = true;
		offhandPenalty2 -= 2;
	}

	if(weapon1.toLowerCase().indexOf("hand crossbow") > -1) {
		isHandCrossbow1 = true;
	}
	if(weapon2.toLowerCase().indexOf("hand crossbow") > -1) {
		isHandCrossbow2 = true;
	}

	var race = $("#raceselect").val();
	var sizeBonus = 0;
	if(isSmallRace(race)) {
		sizeBonus = 1;
	}

	var totalBase1 = bab + ability1 + weapon1Bonus + other + ff1 + offhandPenalty1 + sizeBonus;

        if($.trim(race.toLowerCase()) == "halfling" && $.trim(getPureWeapon(weapon1).toLowerCase()) == "sling") {
                totalBase1 += 1;
        }

	var totalBase2 = bab + ability2 + weapon2Bonus + other + ff2 + offhandPenalty2 + sizeBonus;

        if($.trim(race.toLowerCase()) == "halfling" && $.trim(getPureWeapon(weapon2).toLowerCase()) == "sling") {
                totalBase2 += 1;
        }


	var secondAttack = false;
	var thirdAttack = false;
	var fourthAttack = false;
	if(bab >= 16 && !isHeavyCrossbow1 && (!isLightCrossbow1 || (isLightCrossbow1 && hasFeat("Rapid Reload: Light Crossbow"))) && (!isHandCrossbow1 || (isHandCrossbow1 && hasFeat("Rapid Reload: Hand Crossbow")))) {
		fourthAttack = totalBase1 - 15;
		if(fourthAttack >= 0) {
			fourthAttack = "+" + fourthAttack;
		}
	}
	if(bab >= 11 && !isHeavyCrossbow1 && (!isLightCrossbow1 || (isLightCrossbow1 && hasFeat("Rapid Reload: Light Crossbow"))) && (!isHandCrossbow1 || (isHandCrossbow1 && hasFeat("Rapid Reload: Hand Crossbow")))) {
		thirdAttack = totalBase1 - 10;
		if(thirdAttack >= 0) {
			thirdAttack = "+" + thirdAttack;
		}
	}
	if(bab >= 6 && !isHeavyCrossbow1 && (!isLightCrossbow1 || (isLightCrossbow1 && hasFeat("Rapid Reload: Light Crossbow"))) && (!isHandCrossbow1 || (isHandCrossbow1 && hasFeat("Rapid Reload: Hand Crossbow")))) {
		secondAttack = totalBase1 - 5;
		if(secondAttack >= 0) {
			secondAttack = "+" + secondAttack;
		}
	}

	if(totalBase1 >= 0) {
		totalBase1 = "+" + totalBase1;
	}

	var finalAttack1 = totalBase1;
	if(secondAttack) {
		finalAttack1 += "/" + secondAttack;
		if(thirdAttack) {
			finalAttack1 += "/" + thirdAttack;
			if(fourthAttack) {
				finalAttack1 += "/" + fourthAttack;
			}
		}
	}

	secondAttack = false;
	thirdAttack = false;
	if(bab >= 6 && hasFeat("improved two-weapon fighting") && !isHeavyCrossbow2 && (!isLightCrossbow2 || (isLightCrossbow2 && hasFeat("Rapid Reload: Light Crossbow"))) && (!isHandCrossbow2 || (isHandCrossbow2 && hasFeat("Rapid Reload: Hand Crossbow")))) {
		secondAttack = totalBase2 - 5;
		if(secondAttack >= 0) {
			secondAttack = "+" + secondAttack;
		}
	}
	if(bab >= 11 && hasFeat("greater two-weapon fighting") && !isHeavyCrossbow2 && (!isLightCrossbow2 || (isLightCrossbow2 && hasFeat("Rapid Reload: Light Crossbow"))) && (!isHandCrossbow2 || (isHandCrossbow2 && hasFeat("Rapid Reload: Hand Crossbow")))) {
		thirdAttack = totalBase2 - 10;
		if(thirdAttack >= 0) {
			thirdAttack = "+" + thirdAttack;
		}
	}


	if(totalBase2 >= 0) {
		totalBase2 = "+" + totalBase2;
	}

	var finalAttack2 = totalBase2;
	if(secondAttack) {
		finalAttack2 += "/" + secondAttack;
		if(thirdAttack) {
			finalAttack2 += "/" + thirdAttack;
		}
	}

	return finalAttack1 + "<br/>" + finalAttack2;
}

function getPureWeapon(weapon) {
	weapon = weapon.toLowerCase();
	weapon = weapon.replace(/\[small\]/g, "");
	weapon = weapon.replace(/mw /g, "");
	weapon = weapon.replace(/composite/g, "");
	weapon = weapon.replace(/mighty str 1[2468]/g, "");
	weapon = weapon.replace(/mighty str 20/g, "");
	weapon = weapon.replace(/\+[12345]/g, "");
	weapon = weapon.replace(/adamantine /g, "");
	weapon = weapon.replace(/cold iron /g, "");
	weapon = weapon.replace(/mithral /g, "");
	weapon = weapon.replace(/silvered /g, "");
	weapon = weapon.replace(/darkwood /g, "");
	weapon = weapon.replace(/wooden /g, "");
	weapon = weapon.replace(/steel /g, "");
	weapon = weapon.replace(/heartening /g, "");
	weapon = weapon.replace(/ranged /g, "");
	weapon = weapon.replace(/arrow catching /g, "");
	weapon = weapon.replace(/bashing /g, "");
	weapon = weapon.replace(/blinding /g, "");
	weapon = weapon.replace(/light fortification /g, "");
	weapon = weapon.replace(/defending /g, "");
	weapon = weapon.replace(/keen /g, "");
	weapon = weapon.replace(/lucky /g, "");
	weapon = weapon.replace(/mighty cleaving /g, "");
	weapon = weapon.replace(/psychokinetic /g, "");
	weapon = weapon.replace(/sundering /g, "");
	weapon = weapon.replace(/vicious /g, "");
	weapon = weapon.replace(/ \(short sword\)/g, "");
	weapon = weapon.replace(/ \(longsword\)/g, "");
	weapon = weapon.replace(/ \(bastard sword\)/g, "");
	return $.trim(weapon);
}

function addAttack(weapon, attack, crit, damage, type) {
	var rangeIncrement = "-";
	if(isRangedWeapon(weapon)) {
		rangeIncrement = getWeaponRangeIncrement(weapon);
	}

	if(hasFeat("Improved Critical: " + getPureWeapon(weapon))) {
		switch(crit) {
			case "20/x2":
				crit = "19-20/x2";
				break;
			case "20/x3":
				crit = "19-20/x3";
				break;
			case "20/x4":
				crit = "19-20/x4";
				break;
			case "19-20/x2":
				crit = "17-20/x2";
				break;
			case "18-20/x2":
				crit = "15-20/x2";
				break;
			
		}
	}

	$("#attacktable").append("<tr class='calculated'><td>" + weapon + "</td><td>" + attack + "</td><td>" + crit + "</td><td>" + damage + "</td><td>" + type + "</td><td>" + rangeIncrement + "</td></tr>");
}

function addGrappleAttack(bab, classBonusToGrapple, monklevels) {
	var rangeIncrement = "-";
	var crit = "20/x2";
	var weapon = "Grapple";

	var size = 0;
	var race = $("#raceselect").val();
	var isSmall = isSmallRace(race);
	if(isSmall) {
		size = -4;
	}

	var feats = 0;
	if(hasFeat("Improved Grapple")) {
		feats += 4;
	}
	if(hasFeat("Weapon Focus: Grapple")) {
		feats += 1;
		if(hasFeat("Greater Weapon Focus: Grapple")) {
			feats += 1;
		}
	}

	var strength = calculateAbilityBonus(parseInt($("#abilityvaluestrength").val()));

	var attack = bab + classBonusToGrapple + strength + size + feats;
	if(attack >= 0) {
		attack = "+" + attack;
	}

	var damageDice = "1d3";
	var type = "Subdual";
	if(isSmall) {
		damageDice = "1d2";
	}
	if(monklevels > 0) {
		type = "Lethal";
		damageDice = monkDamage(monklevels, $("#raceselect").val());
	}
	
	var damageBonus = strength;
	if(hasFeat("Weapon Specialization: Grapple")) {
		damageBonus += 2;
		if(hasFeat("Greater Weapon Specialization: Grapple")) {
			damageBonus += 2;
		}
	}
	if(damageBonus >= 0) {
		damageBonus = "+" + damageBonus;
	}

	var damage = damageDice + damageBonus;
	if(damageBonus == 0) {
		damage = damageDice;
	}


	$("#attacktable").append("<tr class='calculated'><td>" + weapon + "</td><td>" + attack + "</td><td>" + crit + "</td><td>" + damage + "</td><td>" + type + "</td><td>" + rangeIncrement + "</td></tr>");
}

function addRapidShotAttack(weapon, attack, crit, damage, type) {
	var rangeIncrement = "-";
	if(isRangedWeapon(weapon)) {
		rangeIncrement = getWeaponRangeIncrement(weapon);
	}

	if(hasFeat("Improved Critical: " + getPureWeapon(weapon))) {
		switch(crit) {
			case "20/x2":
				crit = "19-20/x2";
				break;
			case "20/x3":
				crit = "19-20/x3";
				break;
			case "20/x4":
				crit = "19-20/x4";
				break;
			case "19-20/x2":
				crit = "17-20/x2";
				break;
			case "18-20/x2":
				crit = "15-20/x2";
				break;
			
		}
	}
	var end = attack.indexOf("/");
	if(end < 0) {
		end = attack.length;
	}
	attack = attack.substring(0, end) + "/" + attack;

	$("#attacktable").append("<tr class='calculated'><td>Rapid Shot with " + weapon + "</td><td>" + attack + "</td><td>" + crit + "</td><td>" + damage + "</td><td>" + type + "</td><td>" + rangeIncrement + "</td></tr>");
}

function addManyShotAttack(weapon, attack, crit, damage, type, arrows) {
	var rangeIncrement = "-";
	if(isRangedWeapon(weapon)) {
		rangeIncrement = getWeaponRangeIncrement(weapon);
	}

	if(hasFeat("Improved Critical: " + getPureWeapon(weapon))) {
		switch(crit) {
			case "20/x2":
				crit = "19-20/x2";
				break;
			case "20/x3":
				crit = "19-20/x3";
				break;
			case "20/x4":
				crit = "19-20/x4";
				break;
			case "19-20/x2":
				crit = "17-20/x2";
				break;
			case "18-20/x2":
				crit = "15-20/x2";
				break;
			
		}
	}
	var end = attack.indexOf("/");
	if(end < 0) {
		end = attack.length;
	}
	var singleattack = attack.substring(0, end);
	attack = "";
	for(var i = 0; i < arrows; i++) {
		attack += singleattack + "/";
	}
	attack = attack.substring(0, attack.length - 1);

	$("#attacktable").append("<tr class='calculated'><td>x" + arrows + " Manyshot with " + weapon + "</td><td>" + attack + "</td><td>" + crit + "</td><td>" + damage + "</td><td>" + type + "</td><td>" + rangeIncrement + "</td></tr>");
}


function addThrownAttack(weapon, attack, crit, damage, type) {
	var rangeIncrement = getWeaponRangeIncrement(weapon);
	if(!rangeIncrement || rangeIncrement == "") {
		rangeIncrement = "-";
	}
	if(hasFeat("Improved Critical: " + getPureWeapon(weapon))) {
		switch(crit) {
			case "20/x2":
				crit = "19-20/x2";
				break;
			case "20/x3":
				crit = "19-20/x3";
				break;
			case "20/x4":
				crit = "19-20/x4";
				break;
			case "19-20/x2":
				crit = "17-20/x2";
				break;
			case "18-20/x2":
				crit = "15-20/x2";
				break;
			
		}
	}

	$("#attacktable").append("<tr class='calculated'><td>" + weapon + " (Thrown)</td><td>" + attack + "</td><td>" + crit + "</td><td>" + damage + "</td><td>" + type + "</td><td>" + rangeIncrement + "</td></tr>");
}


function addDualAttack(attack, weapon1, crit1, damage1, type1, weapon2, crit2, damage2, type2) {
	var ri1 = getWeaponRangeIncrement(weapon1);
	var ri2 = getWeaponRangeIncrement(weapon2);
	var rangeIncrement = "-";
	if(ri1 && ri2) {
		rangeIncrement = getWeaponRangeIncrement(weapon1) + "<br/>" + getWeaponRangeIncrement(weapon2);
	}
	if(hasFeat("Improved Critical: " + getPureWeapon(weapon1))) {
		switch(crit1) {
			case "20/x2":
				crit1 = "19-20/x2";
				break;
			case "20/x3":
				crit1 = "19-20/x3";
				break;
			case "20/x4":
				crit1 = "19-20/x4";
				break;
			case "19-20/x2":
				crit1 = "17-20/x2";
				break;
			case "18-20/x2":
				crit1 = "15-20/x2";
				break;
			
		}
	}
	if(hasFeat("Improved Critical: " + getPureWeapon(weapon2))) {
		switch(crit2) {
			case "20/x2":
				crit2 = "19-20/x2";
				break;
			case "20/x3":
				crit2 = "19-20/x3";
				break;
			case "20/x4":
				crit2 = "19-20/x4";
				break;
			case "19-20/x2":
				crit2 = "17-20/x2";
				break;
			case "18-20/x2":
				crit2 = "15-20/x2";
				break;
			
		}
	}

	var weapon = weapon1 + " + <br/>" + weapon2;
	var crit = crit1;
	if(crit1 != crit2) {
		crit += "<br/>" + crit2;
	}
	var damage = damage1;
	if(damage1 != damage2) {
		damage += "<br/>" + damage2;
	}
	var type = type1;
	if(type1 != type2) {
		type += "<br/>" + type2;
	}

	$("#attacktable").append("<tr class='calculated'><td>" + weapon + "</td><td>" + attack + "</td><td>" + crit + "</td><td>" + damage + "</td><td>" + type + "</td><td>" + rangeIncrement + "</td></tr>");
}

function addDoubleWeaponAttack(bab, weapon) {

	// Calculate Attack
	var ability = calculateAbilityBonus(parseInt($("#abilityvaluestrength").val()));
	var weaponBonus = weaponAttackBonus(weapon);

	var ff = 0;
	if(hasFeat("Weapon Focus: " + getPureWeapon(weapon))) {
		ff += 1;
	}
	if(hasFeat("Greater Weapon Focus: " + getPureWeapon(weapon))) {
		ff += 1;
	}

        // Melee Weapon Mastery
        if(hasFeat("Melee Weapon Mastery: Bludgeoning") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("bludgeoning") > -1) {
                ff += 2;
        } else if(hasFeat("Melee Weapon Mastery: Piercing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("piercing") > -1) {
                ff += 2;
        } else if(hasFeat("Melee Weapon Mastery: Slashing") && getWeaponDamageType(getPureWeapon(weapon)).toLowerCase().indexOf("slashing") > -1) {
                ff += 2;
        }


	var offhandPenalty1 = -4;
	var offhandPenalty2 = -8;
	if(hasFeat("two-weapon fighting")) {
		offhandPenalty1 += 2;
		offhandPenalty2 += 6;
	}


	var race = $("#raceselect").val();
	var sizeBonus = 0;
	if(isSmallRace(race)) {
		sizeBonus = 1;
	}

	var totalBase1 = bab + ability + weaponBonus + ff + offhandPenalty1 + sizeBonus;
	var totalBase2 = bab + ability + weaponBonus + ff + offhandPenalty2 + sizeBonus;

	var secondAttack = false;
	var thirdAttack = false;
	var fourthAttack = false;
	if(bab >= 16) {
		fourthAttack = totalBase1 - 15;
		if(fourthAttack >= 0) {
			fourthAttack = "+" + fourthAttack;
		}
	}
	if(bab >= 11) {
		thirdAttack = totalBase1 - 10;
		if(thirdAttack >= 0) {
			thirdAttack = "+" + thirdAttack;
		}
	}
	if(bab >= 6) {
		secondAttack = totalBase1 - 5;
		if(secondAttack >= 0) {
			secondAttack = "+" + secondAttack;
		}
	}

	if(totalBase1 >= 0) {
		totalBase1 = "+" + totalBase1;
	}

	var finalAttack1 = totalBase1;
	if(secondAttack) {
		finalAttack1 += "/" + secondAttack;
		if(thirdAttack) {
			finalAttack1 += "/" + thirdAttack;
			if(fourthAttack) {
				finalAttack1 += "/" + fourthAttack;
			}
		}
	}

	secondAttack = false;
	thirdAttack = false;
	if(bab >= 6 && hasFeat("improved two-weapon fighting")) {
		secondAttack = totalBase2 - 5;
		if(secondAttack >= 0) {
			secondAttack = "+" + secondAttack;
		}
	}
	if(bab >= 6 && hasFeat("greater two-weapon fighting")) {
		thirdAttack = totalBase2 - 10;
		if(thirdAttack >= 0) {
			thirdAttack = "+" + thirdAttack;
		}
	}

	if(totalBase2 >= 0) {
		totalBase2 = "+" + totalBase2;
	}

	var finalAttack2 = totalBase2;
	if(secondAttack) {
		finalAttack2 += "/" + secondAttack;
		if(thirdAttack) {
			finalAttack2 += "/" + thirdAttack;
		}
	}

	var attack = finalAttack1 + "<br/>" + finalAttack2;

	var weaponDetails = getItemDefaults(weapon);

	var damage1 = 0;
	var damage2 = 0;

	if(ability > 0) {
		var damage1 = calculateDamage(weaponDetails.damage, ability / 1.5, weapon, false);
		var damage2 = calculateDamage(weaponDetails.damage2, Math.floor(ability / 2), weapon, false);
	} else {
		var damage1 = calculateDamage(weaponDetails.damage, ability, weapon, false);
		var damage2 = calculateDamage(weaponDetails.damage2, ability, weapon, false);
	}

	var rangeIncrement = "-";
	var crit1 = weaponDetails.critrange;
	var crit2 = weaponDetails.critrange2;
	var type1 = weaponDetails.damageType;
	var type2 = weaponDetails.damageType2;

	if(hasFeat("Improved Critical: " + getPureWeapon(weapon))) {
		switch(crit1) {
			case "20/x2":
				crit1 = "19-20/x2";
				break;
			case "20/x3":
				crit1 = "19-20/x3";
				break;
			case "20/x4":
				crit1 = "19-20/x4";
				break;
			case "19-20/x2":
				crit1 = "17-20/x2";
				break;
			case "18-20/x2":
				crit1 = "15-20/x2";
				break;
			
		}
		switch(crit2) {
			case "20/x2":
				crit2 = "19-20/x2";
				break;
			case "20/x3":
				crit2 = "19-20/x3";
				break;
			case "20/x4":
				crit2 = "19-20/x4";
				break;
			case "19-20/x2":
				crit2 = "17-20/x2";
				break;
			case "18-20/x2":
				crit2 = "15-20/x2";
				break;
			
		}
	}

	var weapon = weapon + " + <br/>Other End";
	var crit = crit1;
	if(crit1 != crit2) {
		crit += "<br/>" + crit2;
	}
	var damage = damage1;
	if(damage1 != damage2) {
		damage += "<br/>" + damage2;
	}
	var type = type1;
	if(type1 != type2) {
		type += "<br/>" + type2;
	}

	$("#attacktable").append("<tr class='calculated'><td>" + weapon + "</td><td>" + attack + "</td><td>" + crit + "</td><td>" + damage + "</td><td>" + type + "</td><td>" + rangeIncrement + "</td></tr>");
}


function recalculateNetWorth() {
	var itemworth = 0;

	$(".equipmentItem").each(function(e) {
                var itemvalue = parseFloat($(this).find(".itemvalue").val());
                var itemnumber = parseInt($(this).find(".itemnumber").val());

                if(!isNaN(itemvalue) && !isNaN(itemnumber)) {
                        itemworth += itemvalue * itemnumber;
                }
        });

	var gold = parseFloat($("#gold").val());

	if(isNaN(gold)) {
		gold = 0;
	}

	$("#netval").html( fpFix(itemworth + gold) )
}

function recalculateCultureAbilities() {
	var culture = $("#characterculture").val();
	var culturalAbilitiesArray = getCulturalAbilities(culture);
	for(var key in culturalAbilitiesArray) {
		addAbility(culturalAbilitiesArray[key]);
	}
	
}

function hideEmptySpellSections() {
	var isAssassin = false;
	var isBard = false;
	var isBardSage = false;
	var isBeguiler = false;
	var isCleric = false;
	var isCloistered = false;
	var isChampion = false;
	var isPsion = false;
	var isPsionicFist = false;
	var isPsychicWarrior = false;
	var isSorcerer = false;
	var isBattleSorcerer = false;
	var isWarMind = false;
	var isWilder = false;
	var isDiviner = false;
	var isSpecialistWizard = false;
	var isDomainWizard = false;
	var isWizard = false;
	var isHunterPaladin = false;
	var isPaladin = false;
	var isBlackguard = false;
	var isDragonShaman = false;
	var isDuskblade = false;

	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(!isNaN(classlevels)) {
			switch(classname) {
				case "assassin":
					isAssassin = true;
					break;
				case "bard (sage)":
					isBardSage = true;
				case "bard":
				case "bard (divine)":
				case "bard (druidic)":
				case "bard (savage)":
					isBard = true;
					break;
				case "beguiler":
					if(classlevels >= 3) {
						isBeguiler = true;
					}
				case "blackguard":
					if(classlevels >= 3) {
						isBlackguard = true;
					}
					break;
				case "cleric (cloistered)":
					isCloistered = true;
					// fall through
				case "cleric":
					isCleric = true;
					break;
				case "cleric (champion)":
					isCleric = true;
					isChampion = true;
					break;
				case "dragon shaman (black)":
				case "dragon shaman (blue)":
				case "dragon shaman (brass)":
				case "dragon shaman (bronze)":
				case "dragon shaman (copper)":
				case "dragon shaman (gold)":
				case "dragon shaman (green)":
				case "dragon shaman (red)":
				case "dragon shaman (silver)":
				case "dragon shaman (white)":
					isDragonShaman = true;
					break;
				case "duskblade":
					isDuskblade = true;
					break;
				case "paladin":
				case "paladin (freedom)":
				case "paladin (slaughter)":
				case "paladin (tyranny)":
					if(classlevels >= 4) {
						isPaladin = true;
					}
					break;
				case "paladin (hunter)":
					// is NOT listed as paladin because no turning
					break;
				case "psion (egoist)":
				case "psion (kineticist)":
				case "psion (nomad)":
				case "psion (seer)":
				case "psion (shaper)":
				case "psion (telepath)":
					isPsion = true;
					break;
				case "psionic fist":
					isPsionicFist = true;
					break;
				case "psychic warrior":
					isPsychicWarrior = true;
					break;
				case "sorcerer (battle)":
					isBattleSorcerer = true;
				case "sorcerer":
				case "sorcerer (animal companion)":
					isSorcerer = true;
					break;
				case "war mind":
					isWarMind = true;
					break;
				case "wilder":
					isWilder = true;
					break;
				case "wizard (diviner)":
					isDiviner = true;
					// fall through
				case "wizard (abjurer)":
				case "wizard (conjurer)":
				case "wizard (enchanter)":
				case "wizard (evoker)":
				case "wizard (illusionist)":
				case "wizard (necromancer)":
				case "wizard (transmuter)":
					isSpecialistWizard = true;
					// fall through
				case "wizard (warrior)":
				case "wizard (animal companion)":
				case "wizard":
					isWizard = true;
					break;				
				case "wizard (domain)":
					isDomainWizard = true;
					isWizard = true;
					break;
			}
		}
	});		

	if(isAssassin) {
		// show spells known section
		$("#assassinspellsknown").show();
	} else {
		// hide spells known section
		$("#assassinspellsknown").hide();
		// clear spells
		$("#assassinspellsknown input").val("");
	}

	if(isBard) {
		// show spells known section
		$("#bardspellsknown").show();
		if(isBardSage) {
			for(var i = 0; i <= 6; i++) {
				$("#bardspellsknown .level" + i + " input:last").show();
			}
		} else {
			for(var i = 0; i <= 6; i++) {
				$("#bardspellsknown .level" + i + " input:last").hide().val("");
			}
		}
	} else {
		// hide spells known section
		$("#bardspellsknown").hide();
		// clear spells
		$("#bardspellsknown input").val("");
	}

	if(isBeguiler) {
		$("#beguileradvancedlearning").show();
	} else {
		$("#beguileradvancedlearning").hide();
		$("#beguileradvancedlearning input").val("");
	}

	if(isDragonShaman) {
		$("#dragonshamanauras").show();
	} else {
		$("#dragonshamanauras").hide();
		$("#dragonshamanauras input").prop('checked', false);
	}

	if(isCleric) {
		// show domain selection
		$("#clericdomainchoice").show();
		if(isCloistered) {
			$("#cloisteredclericdomain").show().val("Knowledge");
		} else {
			$("#cloisteredclericdomain").hide().val("");
		}
	} else {
		// hide domain selection
		$("#clericdomainchoice").hide();
		// clear domain choices
		$(".domainchoice").val("");
	}

	if(isDuskblade) {
		// show spells known section
		$("#duskbladespellsknown").show();
		// Duskblade level 0 spells
		var num0 = 2 + calculateAbilityBonus($("#abilityvalueintelligence").val());
		if(num0 < 2) {
			num0 = 2;
		}
		var currCount = $("#duskbladespellsknown .level0 input").length;

		var safety = 0;
        	while(currCount < num0) {
			$("#duskbladespellsknown .level0").append("<input/>");
			currCount = $("#duskbladespellsknown .level0 input").length;
			safety++;
			if(safety > 1000) {
				break;
			}
	        }

		safety = 0;

	        while(currCount > num0) {
			$("#duskbladespellsknown .level0 input:last").remove();
			currCount = $("#duskbladespellsknown .level0 input").length;
			safety++;
			if(safety > 1000) {
				break;
			}
	        }

	        $("#duskbladespellsknown .level0 input").autocomplete({source: spells["duskblade"][0]});
	} else {
		// hide spells known section
		$("#duskbladespellsknown").hide();
		// clear spells
		$("#duskbladespellsknown input").val("");
	}

	if(isPsion) {
		// show spells known section
		$("#psionspellsknown").show();
	} else {
		// hide spells known section
		$("#psionspellsknown").hide();
		// clear spells
		$("#psionspellsknown input").val("");
	}

	if(isPsionicFist) {
		// show spells known section
		$("#psionicfistspellsknown").show();
	} else {
		// hide spells known section
		$("#psionicfistspellsknown").hide();
		// clear spells
		$("#psionicfistspellsknown input").val("");
	}

	if(isPsychicWarrior) {
		// show spells known section
		$("#psychicwarriorspellsknown").show();
	} else {
		// hide spells known section
		$("#psychicwarriorspellsknown").hide();
		// clear spells
		$("#psychicwarriorspellsknown input").val("");
	}

	if(isSorcerer) {
		// show spells known section
		$("#sorcererspellsknown").show();
		if(isBattleSorcerer) {
			for(var i = 0; i <= 9; i++) {
				$("#sorcererspellsknown .level" + i + " input:last").hide().val("");
			}
		} else {
			for(var i = 0; i <= 9; i++) {
				$("#sorcererspellsknown .level" + i + " input:last").show();
			}
		}
	} else {
		// hide spells known section
		$("#sorcererspellsknown").hide();
		// clear spells
		$("#sorcererspellsknown input").val("");
	}

	if(isWarMind) {
		// show spells known section
		$("#warmindspellsknown").show();
	} else {
		// hide spells known section
		$("#warmindspellsknown").hide();
		// clear spells
		$("#warmindspellsknown input").val("");
	}

	if(isWilder) {
		// show spells known section
		$("#wilderspellsknown").show();
	} else {
		// hide spells known section
		$("#wilderspellsknown").hide();
		// clear spells
		$("#wilderspellsknown input").val("");
	}

	if(isWizard) {
		// show spells known section
		$("#wizardspellsknown").show();
	} else {
		// hide spells known section
		$("#wizardspellsknown").hide();
		// clear spells
		$("#wizardspellsknown input").val("");
	}

	if((isCleric && !isChampion) || isPaladin || isBlackguard) {
		$("#turnblock").show();
	} else {
		$("#turnblock").hide();
	}

	if(isSpecialistWizard) {
		$("#opposedSchool").show();
		if(isDiviner) {
			$(".opposedSchoolChoice:last").hide().val("");
		} else {
			$(".opposedSchoolChoice:last").show();
		}
	} else {
		$("#opposedSchool").hide();
		// clear opposed school choices
		$(".opposedSchoolChoice").val("");
	}

	if(isDomainWizard) {
		$("#wizardDomain").show();
	} else {
		$("#wizardDomain").hide();
		$("#wizardDomainChoice").val("");
	}

	// magic options section
	if(isCleric || isPaladin || isBlackguard || isSpecialistWizard || isDomainWizard) {
		$("#magicoptions").show();
	} else {
		$("#magicoptions").hide();
	}

}

/**
 * Final fix on special abilities
 */
function recalculateFinalFixSpecialAbilities() {
	
	// Uncanny Dodge Duplicates
	var numUD = countAbility("Uncanny Dodge");
	var numIUD = countAbility("Improved Uncanny Dodge");
	if(numUD + numIUD > 1) {
		// remove all Uncanny Dodge Abilities
		removeAbilities("Uncanny Dodge");
		// remove all Improved Uncanny Dodge Abilities
		removeAbilities("Improved Uncanny Dodge");
		// add Improved Uncanny Dodge		
		addAbility("Improved Uncanny Dodge");
	}		
	
	// Evasion duplicates, Improved Evasion duplicates, Evasion + Improved Evasion duplicates
	var numIE = countAbility("Improved Evasion");
	if(numIE > 0) {
		removeAbilities("Evasion");
		if(numIE > 1) {
			removeAbilities("Improved Evasion");
			addAbility("Improved Evasion");
		}
	} else if(countAbility("Evasion") > 1) {
		removeAbilities("Evasion");
		addAbility("Evasion");
	}
	
	// Summon Familiar duplicates
	if(countAbility("Summon Familiar") > 1) {
		removeAbilities("Summon Familiar");
		addAbility("Summon Familiar");
	}
	
	// Timeless Body duplicates
	if(countAbility("Timeless Body") > 1) {
		removeAbilities("Timeless Body");
		addAbility("Timeless Body");
	}
	// Wild Empathy duplicates
	if(countAbility("Wild Empathy") > 1 || (countAbility("Wild Empathy") == 1 && countAbility("Wild Empathy (-4)") == 1)) {
		removeAbilities("Wild Empathy");
		removeAbilities("Wild Empathy (-4)");
		addAbility("Wild Empathy");
	}

	// Woodland Stride duplicates
	if(countAbility("Woodland Stride") > 1) {
		removeAbilities("Woodland Stride");
		addAbility("Woodland Stride");
	}
	// Hide in Plain Sight duplicates
	if(countAbility("Hide in Plain Sight") > 1) {
		removeAbilities("Hide in Plain Sight");
		addAbility("Hide in Plain Sight");
	}
	// Poison Use duplicates
	if(countAbility("Poison Use") > 1) {
		removeAbilities("Poison Use");
		addAbility("Poison Use");
	}
	// Low-light Vision duplicates
	if(countAbility("Low-light Vision") > 1) {
		removeAbilities("Low-light Vision");
		addAbility("Low-light Vision");
	}
	// Darkvision 60 ft. duplicates
	if(countAbility("Darkvision 60 ft") > 1) {
		removeAbilities("Darkvision 60 ft");
		addAbility("Darkvision 60 ft");
	}
	// Slippery Mind duplicates
	if(countAbility("Slippery Mind") > 1) {
		removeAbilities("Slippery Mind");
		addAbility("Slippery Mind");
	}
	// Fast Movement duplicates
	if(countAbility("Fast Movement") > 1) {
		removeAbilities("Fast Movement");
		addAbility("Fast Movement");
	}
	// Swift Tracker overlap
	if(countAbility("Swift Tracker") > 1) {
		removeAbilities("Swift Tracker");
		addAbility("Swift Tracker");
	}
	// Tireless Rage overlap
	if(countAbility("Tireless Rage") > 1) {
		removeAbilities("Tireless Rage");
		addAbility("Tireless Rage");
	}

	// Aura of Evil overlap
	if(countAbility("Aura of Evil") > 1) {
		removeAbilities("Aura of Evil");
		addAbility("Aura of Evil");
	}
	// Aura of Despair overlap
	if(countAbility("Aura of Despair") > 1) {
		removeAbilities("Aura of Despair");
		addAbility("Aura of Despair");
	}
	// Detect Good overlap
	if(countAbility("Detect Good") > 1) {
		removeAbilities("Detect Good");
		addAbility("Detect Good");
	}
	// Dark Blessing overlap
	if(countAbility("Dark Blessing") > 1) {
		removeAbilities("Dark Blessing");
		addAbility("Dark Blessing");
	}


	// Darkvision improvements
	if(hasAbility("Darkvision 60 ft") && hasAbility("Improved Darkvision 90 ft")) {
		removeAbilities("Darkvision 60 ft");
	}
	// Low-light Vision improvements
	if(hasAbility("Low-light Vision") && hasAbility("Improved Low-light Vision")) {
		removeAbilities("Low-light Vision");
	}

	// remove immunity to magic sleep if immune to sleep from dragon disciple
	if(hasAbility("Immune to Sleep and Paralysis effects")) {
		removeAbilities("Immune to magic Sleep");
	}
	

	// Half-Orc Paragon & Barbarian
	var rageCount = 0;
	var rageType = "";

	rageCount += countAbility("Rage 1x/day");
	rageCount += 2*countAbility("Rage 2x/day");
	rageCount += 3*countAbility("Rage 3x/day");
	rageCount += 4*countAbility("Rage 4x/day");
	rageCount += 5*countAbility("Rage 5x/day");
	rageCount += 3*countAbility("Greater Rage 3x/day");
	rageCount += 4*countAbility("Greater Rage 4x/day");
	rageCount += 5*countAbility("Greater Rage 5x/day");
	rageCount += 6*countAbility("Mighty Rage 6x/day");

	if(hasAbility("Mighty Rage 6x/day")) {
		rageType = "Mighty Rage";
	} else if(hasAbility("Greater Rage 3x/day") || hasAbility("Greater Rage 4x/day") || hasAbility("Greater Rage 5x/day")) {
		rageType = "Greater Rage";
	} else if(rageCount > 0) {
		rageType = "Rage";
	}

	removeAbilities("Rage 1x/day");
	removeAbilities("Rage 2x/day");
	removeAbilities("Rage 3x/day");
	removeAbilities("Rage 4x/day");
	removeAbilities("Rage 5x/day");
	removeAbilities("Greater Rage 3x/day");
	removeAbilities("Greater Rage 4x/day");
	removeAbilities("Greater Rage 5x/day");
	removeAbilities("Mighty Rage 6x/day");

	if(rageType == "Mighty Rage") {
		addAbility("Mighty Rage " + rageCount + "/day");
	} else if (rageType == "Greater Rage") {
		addAbility("Greater Rage " + rageCount + "/day");
	} else if (rageType == "Rage") {
		addAbility("Rage " + rageCount + "/day");
	}

	var bard = false;
	var sage = false;
	var lorelevels = 0;

	// Bardic Knowlede Bonus
	if(hasAbility("Bardic Knowledge") || hasAbility("Lore")) {
		$("#classes tr:not(:first-child)").each(function(e) {
			var classname = getClassName(this);
			var classlevels = parseInt($(this).find(".classlevelfield").val());
			if((classname == "bard" || classname == "bard (divine)" || classname == "bard (savage)" || classname == "bard (druidic)" || classname == "bard (sage)") && !isNaN(classlevels)) {
				bard = true;
				// Bonus is class ...
				lorelevels += classlevels;
				// Bardic Sage gets +2
				if(classname == "bard (sage)") {
					sage = true;
				}
			}
			if((classname == "loremaster" || classname == "cleric (cloistered)") && !isNaN(classlevels)) {
				lorelevels += classlevels;
			}			
		});

		var loreBonus = lorelevels;

		// ... plus intelligence ...
		loreBonus += calculateAbilityBonus($("#abilityvalueintelligence").val());
		// ... +2 if the character has 5+ ranks in Knowledge: History
		$("#skills tr:not(:first-child)").each(function(e) {
			var skillName = $.trim($(this).find("input.skillname").val().toLowerCase());
			if(skillName == "knowledge: history") {
				var skillRanks = parseInt($(this).find("input.skilldata.ranks").val());
				if(isNaN(skillRanks)) {
					skillRanks = 0;
				}
				var skillCCRanks = Math.floor(parseFloat($(this).find("input.skilldata.ccranks").val()));
				if(isNaN(skillCCRanks)) {
					skillCCRanks = 0;
				}
				
				if((skillRanks + skillCCRanks) >= 5) {
					loreBonus += 2;
					return false;
				}
			}
		});
		if(sage) {
			loreBonus += 2;
		}
				
		removeAbilities("Bardic Knowledge");
		removeAbilities("Lore");
		if(bard) {
			addAbility("Bardic Knowledge (+" + loreBonus + ")");
		} else {
			addAbility("Lore (+" + loreBonus + ")");
		}

	}

	// Both Artifice and Creation Domain
	if(hasAbility("Conjuration (Creation) Spells +1 Caster Level") && hasAbility("Conjuration (Creation) Spells +2 Caster Level")) {
		removeAbilities("Conjuration (Creation) Spells +1 Caster Level");
		removeAbilities("Conjuration (Creation) Spells +2 Caster Level");
		addAbility("Conjuration (Creation) Spells +3 Caster Level");
	}


	// Knight's Challenge times per day
	if(hasAbility("Knight's Challenge")) {
		removeAbilities("Knight's Challenge");
		var chaBonus = calculateAbilityBonus($("#abilityvaluecharisma").val());
		var cl = 0;
		$("#classes tr:not(:first-child)").each(function(e) {
			var classname = getClassName(this);
			var classlevels = parseInt($(this).find(".classlevelfield").val());
			if( (classname == "knight") && !isNaN(classlevels)) {
				cl += classlevels;
			}
		});
		cl = Math.floor(cl / 2.0);

		var times = chaBonus + cl;
		if(times < 1) {
			times = 1;
		}
		
                addAbility("Knight's Challenge (" + times + "x/day)");
	}
	
	// Lay on Hands / totals
	if(hasAbility("Lay on Hands")) {
		// ability not applicable if charisma is below 12
		removeAbilities("Lay on Hands");
		var lohLevels = 0;

		if($("#abilityvaluecharisma").val() >= 12) {
			$("#classes tr:not(:first-child)").each(function(e) {
				var classname = getClassName(this);
				var classlevels = parseInt($(this).find(".classlevelfield").val());
				if( (classname == "paladin" || classname == "paladin (freedom)" || (classname == "hauwk rider" && classlevels >= 4)) && !isNaN(classlevels)) {
					

					if(classname == "hauwk rider") {
						classlevels -= 3;
					}
					lohLevels += classlevels;
				}
			});
		}
		// Bonus is class ...
		// ... times charisma, 
		lohLevels *= calculateAbilityBonus($("#abilityvaluecharisma").val());
				
		addAbility("Lay on Hands (+" + lohLevels + " hp)");
	}

	// Touch of Vitality
	if(hasAbility("Touch of Vitality")) {
		// ability not applicable if charisma is below 12
		removeAbilities("Touch of Vitality");
		var tovLevels = 0;

		if($("#abilityvaluecharisma").val() >= 12) {
			$("#classes tr:not(:first-child)").each(function(e) {
				var classname = getClassName(this);
				var classlevels = parseInt($(this).find(".classlevelfield").val());
				if( (classname == "dragon shaman (black)" 
					|| classname == "dragon shaman (blue)" 
					|| classname == "dragon shaman (brass)" 
					|| classname == "dragon shaman (bronze)" 
					|| classname == "dragon shaman (copper)" 
					|| classname == "dragon shaman (gold)" 
					|| classname == "dragon shaman (green)" 
					|| classname == "dragon shaman (red)" 
					|| classname == "dragon shaman (silver)" 
					|| classname == "dragon shaman (white)" 
					) && !isNaN(classlevels)) {
						tovLevels += classlevels;
				}
			});
		}
		// Bonus is class ...
		// ... times charisma, 
		var heal = 2 * tovLevels * calculateAbilityBonus($("#abilityvaluecharisma").val());

		if(tovLevels >= 11) {
			addAbility("Touch of Vitality (" + heal + " hp + remove conditions)");
		} else {
			addAbility("Touch of Vitality (" + heal + " hp)");
		}
				
	}

	// Deadly Touch / totals
	if(hasAbility("Deadly Touch")) {
		// ability not applicable if charisma is below 12
		removeAbilities("Deadly Touch");
		if($("#abilityvaluecharisma").val() >= 12) {
			$("#classes tr:not(:first-child)").each(function(e) {
				var classname = getClassName(this);
				var classlevels = parseInt($(this).find(".classlevelfield").val());
				if( (classname == "paladin (tyranny)" || classname == "paladin (slaughter)") && !isNaN(classlevels)) {
					
					// Bonus is class ...
					lohBonus = classlevels;
					// ... times charisma, 
					lohBonus *= calculateAbilityBonus($("#abilityvaluecharisma").val());
					
					addAbility("Deadly Touch (+" + lohBonus + " dam)");
				}
			});
		}
	}
	
	// Vile Lay on Hands / totals
	if(hasAbility("Vile Lay on Hands")) {
		// ability not applicable if charisma is below 12
		removeAbilities("Vile Lay on Hands");
		if($("#abilityvaluecharisma").val() >= 12) {
			$("#classes tr:not(:first-child)").each(function(e) {
				var classname = getClassName(this);
				var classlevels = parseInt($(this).find(".classlevelfield").val());
				if(classname == "blackguard" && !isNaN(classlevels)) {
					
					// Bonus is class ...
					lohBonus = classlevels;
					// ... times charisma, 
					lohBonus *= calculateAbilityBonus($("#abilityvaluecharisma").val());
					
					addAbility("Vile Lay on Hands (+" + lohBonus + " hp)");
				}
			});
		}
	}

	// Arcane Attunement
	if(hasAbility("Arcane Attunement")) {
		removeAbilities("Arcane Attunement");
		var numTimes = 3 + calculateAbilityBonus($("#abilityvalueintelligence").val());
		addAbility("Arcane Attunement (" + numTimes + "x/day)");
	}

	// Fix Climb Speed ability
	if(hasAbility("Climb Speed: <X/2> ft / round")) {
		var racialSpeed = getRacialSpeed($("#raceselect").val());
		removeAbilities("Climb Speed: <X/2> ft / round");
		addAbility("Climb Speed: " + (racialSpeed / 2) + " ft / round");

	}	
	if(hasAbility("Climb Speed: <X> ft / round")) {
		var racialSpeed = getRacialSpeed($("#raceselect").val());
		removeAbilities("Climb Speed: <X> ft / round");
		addAbility("Climb Speed: " + (racialSpeed) + " ft / round");
	}

	if(hasAbility("Hauwk Companion")) {
		removeAbilities("Special Mount");
		removeAbilities("Summon Familiar");
		removeAbilities("Animal Companion");
	}
	
	// TODO: Ability DC's for various abilities
	
	// Add sneak attack bonusses together and remove superseded damage reduction
	var sneakAttackDice = 0;
	var maxDR = 0;
	var smiteGoodTimes = 0;
	var smiteEvilTimes = 0;
	
	$("input.classabilityfield").each(function(e) {
		var ability = $.trim($(this).val().toLowerCase());
		switch(ability) {
			case "smite evil 5x/day":
				smiteEvilTimes++;
			case "smite evil 4x/day":
				smiteEvilTimes++;
			case "smite evil 3x/day":
				smiteEvilTimes++;
			case "smite evil 2x/day":
				smiteEvilTimes++;
			case "smite evil 1x/day":
				smiteEvilTimes++;
				break;
			case "smite good 5x/day":
				smiteGoodTimes++;
			case "smite good 4x/day":
				smiteGoodTimes++;
			case "smite good 3x/day":
				smiteGoodTimes++;
			case "smite good 2x/day":
				smiteGoodTimes++;
			case "smite good 1x/day":
				smiteGoodTimes++;
				break;
			case "sneak attack +10d6":
				sneakAttackDice ++;
			case "sneak attack +9d6":
				sneakAttackDice ++;
			case "sneak attack +8d6":
				sneakAttackDice ++;
			case "sneak attack +7d6":
				sneakAttackDice ++;
			case "sneak attack +6d6":
				sneakAttackDice ++;
			case "sneak attack +5d6":
				sneakAttackDice ++;
			case "sneak attack +4d6":
				sneakAttackDice ++;
			case "sneak attack +3d6":
				sneakAttackDice ++;
			case "sneak attack +2d6":
				sneakAttackDice ++;
			case "sneak attack +1d6":
				sneakAttackDice ++;
				break;
			case "damage reduction 1/-":
				maxDR = Math.max(maxDR, 1);
				break;
			case "damage reduction 2/-":
				maxDR = Math.max(maxDR, 2);
				break;
			case "damage reduction 3/-":
				maxDR = Math.max(maxDR, 3);
				break;
			case "damage reduction 4/-":
				maxDR = Math.max(maxDR, 4);
				break;
			case "damage reduction 5/-":
				maxDR = Math.max(maxDR, 5);
				break;
			case "damage reduction 6/-":
				maxDR = Math.max(maxDR, 6);
				break;
		}
	});
	
	if(sneakAttackDice > 0) {
		removeAbilities("Sneak Attack +1d6");
		removeAbilities("Sneak Attack +2d6");
		removeAbilities("Sneak Attack +3d6");
		removeAbilities("Sneak Attack +4d6");
		removeAbilities("Sneak Attack +5d6");
		removeAbilities("Sneak Attack +6d6");
		removeAbilities("Sneak Attack +7d6");
		removeAbilities("Sneak Attack +8d6");
		removeAbilities("Sneak Attack +9d6");
		removeAbilities("Sneak Attack +10d6");
		addAbility("Sneak Attack +" + sneakAttackDice + "d6");
	}
	if(maxDR > 0) {
		removeAbilities("Damage Reduction 1/-");
		removeAbilities("Damage Reduction 2/-");
		removeAbilities("Damage Reduction 3/-");
		removeAbilities("Damage Reduction 4/-");
		removeAbilities("Damage Reduction 5/-");
		removeAbilities("Damage Reduction 6/-");
		addAbility("Damage Reduction " + maxDR + "/-");
	}
	if(smiteGoodTimes > 1) {
		removeAbilities("Smite Good 1x/day");
		removeAbilities("Smite Good 2x/day");
		removeAbilities("Smite Good 3x/day");
		removeAbilities("Smite Good 4x/day");
		removeAbilities("Smite Good 5x/day");
		addAbility("Smite Good " + smiteGoodTimes + "/day");
	}
	if(smiteEvilTimes > 1) {
		removeAbilities("Smite Evil 1x/day");
		removeAbilities("Smite Evil 2x/day");
		removeAbilities("Smite Evil 3x/day");
		removeAbilities("Smite Evil 4x/day");
		removeAbilities("Smite Evil 5x/day");
		addAbility("Smite Evil " + smiteEvilTimes + "/day");
	}

	if(hasFeat("Infernal Sorcerer Resistance")) {
		addAbility("Acid Resistance " + countInfernalSorcererFeats());
		addAbility("Cold Resistance " + countInfernalSorcererFeats());
	}

}


/**
 * Get the class abilities based on the characters classes and levels.
 */
function recalculateClassAbilities() {
	var clericLevels = 0;
	var championCleric = false;
	var fallenPaladinLevels = 0;
	var blackguardLevels = 0;
	
	var totalLevels = 0;
	var illiterateLevels = 0;

	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(classname && !isNaN(classlevels)) {
			totalLevels += classlevels;
			if(isIlliterateClass(classname)) {
				illiterateLevels += classlevels;
			}
			var abilities = getClassAbilities(classname, classlevels);
			for(var key in abilities) {
				if(typeof(abilities[key]) == "string") {
					addAbility(abilities[key]);
				} else {
					id = abilities[key]["id"];
					options = abilities[key]["options"];
					addAbilityDropdown(id, options);
				}
			}
			if(($.trim(classname.toLowerCase()) == "cleric") || ($.trim(classname.toLowerCase()) == "cleric (cloistered)") || ($.trim(classname.toLowerCase()) == "cleric (champion)")) {
				clericLevels = classlevels;
				if($.trim(classname.toLowerCase()) == "cleric (champion)") {
					championCleric = true;
				}
			}
			if($.trim(classname.toLowerCase()) == "fallen paladin") {
				fallenPaladinLevels = classlevels;
			}
			if($.trim(classname.toLowerCase()) == "blackguard") {
				blackguardLevels = classlevels;
			}
			if($.trim(classname.toLowerCase()) == "monk (denying stance style)") {
				if(classlevels >= 6 && hasFeat("Improved Grapple") && hasFeat("Combat Reflexes") && hasFeat("Improved Disarm") && getSkillRanks("Tumble") >= 9 && hasFeat("Combat Expertise")) {
					addAbility("Denying Stance grapple bonus");
				}
			}
			if($.trim(classname.toLowerCase()) == "monk (hand and foot style)") {
				if(classlevels >= 6 && hasFeat("Stunning Fist") && hasFeat("Deflect Arrows") && hasFeat("Improved Trip") && getSkillRanks("Balance") >= 9 && getSkillRanks("Tumble") >= 4) {
					addAbility("Hand and Foot special attack bonus");
				}
			}
			if($.trim(classname.toLowerCase()) == "monk (overwhelming attack style)") {
				if(classlevels >= 6 && hasFeat("Power Attack") && hasFeat("Improved Bull Rush") && hasFeat("Improved Overrun") && getSkillRanks("Intimidate") >= 4 && getSkillRanks("Perform: Dance") >= 4) {
					addAbility("Overwhelming Attack bull rush bonus");
				}
			}
			if($.trim(classname.toLowerCase()) == "monk (passive way style)") {
				if(classlevels >= 6 && hasFeat("Combat Expertise") && hasFeat("Improved Trip") && hasFeat("Improved Feint") && getSkillRanks("Bluff") >= 4 && getSkillRanks("Sense Motive") >= 4 && hasFeat("Skill Focus: Bluff")) {
					addAbility("Passive Way trip bonus");
				}
			}
			if($.trim(classname.toLowerCase()) == "monk (sleeping tiger style)") {
				if(classlevels >= 6 && hasFeat("Weapon Finesse") && hasFeat("Improved Initiative") && hasFeat("Improved Sunder") && getSkillRanks("Hide") >= 9 && hasFeat("Power Attack")) {
					addAbility("Sleeping Tiger damage bonus");
				}
			}
			if($.trim(classname.toLowerCase()) == "monk (undying way style)") {
				if(classlevels >= 6 && hasFeat("Toughness") && !hasFeat("Endurance") && !(hasFeat("Diehard") && getSkillRanks("Concentration") >= 9)) {
					addAbility("Undying Way Damage Reduction");
				}
			}
		}
	});
	
	// special cases:
	
	// Cleric, Turn Undead / Rebuke Undead based on alignment
	if(clericLevels > 0) {
		if($("#alignmentselect").val() == "Lawful Good" || $("#alignmentselect").val() == "Neutral Good" || $("#alignmentselect").val() == "Chaotic Good") {
			if(championCleric) {
				addAbility("Smite Evil " + (Math.floor((clericLevels / 5)) + 1) + "x/day");
			}
			addAbility("Spontaneous Cure Spells");
			$("#clericturnchoice").val("Positive Energy");
			$("#clericturnchoice option:not(:selected)").prop('disabled', 'disabled');
			$("#clericturnchoice option:selected").prop('disabled', false);
		} else if($("#alignmentselect").val() == "Lawful Evil" || $("#alignmentselect").val() == "Neutral Evil" || $("#alignmentselect").val() == "Chaotic Evil") {
			if(championCleric) {
				addAbility("Smite Good " + (Math.floor((clericLevels / 5)) + 1) + "x/day");
			}
			addAbility("Spontaneous Inflict Spells");
			$("#clericturnchoice").val("Negative Energy");
			$("#clericturnchoice option:not(:selected)").prop('disabled', 'disabled');
			$("#clericturnchoice option:selected").prop('disabled', false);
		} else if($("#clericturnchoice").val() == "Positive Energy") {
			if(championCleric) {
				addAbility("Smite Evil " + (Math.floor((clericLevels / 5)) + 1) + "x/day");
			}
			addAbility("Spontaneous Cure Spells");
			$("#clericturnchoice option").prop('disabled', false);
		} else if($("#clericturnchoice").val() == "Negative Energy") {
			if(championCleric) {
				addAbility("Smite Good " + (Math.floor((clericLevels / 5)) + 1) + "x/day");
			}
			addAbility("Spontaneous Inflict Spells");
			$("#clericturnchoice option").prop('disabled', false);
		}
	}
	
	// Blackguard with Fallen paladin levels
	if(blackguardLevels > 0 && fallenPaladinLevels > 0) {
		if(fallenPaladinLevels > 10) {
			fallenPaladinlevels = 10;
		}
		switch(fallenPaladinLevels) {
			case 10:
			case 9:
				addAbility("Undead Companion");
				addAbility("Smite Good 1x/day");
			case 8:
			case 7:
				addAbility("Fiendish Summoning (CL " + blackguardLevels * 2 + ") 1x/day");
			case 6:
			case 5:
				addAbility("Sneak Attack +1d6");
				addAbility("Smite Good 1x/day");
			case 4:
			case 3:
				addAbility("Vile Lay on Hands");
			case 2:
			case 1:
				addAbility("Smite Good 1x/day");
		}
	}

	// Barbarian and Commoner illiteracy
	if(illiterateLevels >= totalLevels) {
		var hasLiteracyLanguage = false;
		// check if one of the languages is Literacy
		$(".languagefield").each(function() {
			if($.trim($(this).val().toLowerCase()) == "literacy") {
				hasLiteracyLanguage = true;
			}
		});

		if(!hasLiteracyLanguage) {
			addAbility("Illiterate");
		}
	}

	
}

/**
 * Get the racial abilities based on the characters race. 
 */
function recalculateRacialAbilities() {
	var race = $("#raceselect").val();
	// special case for gnomes
	var chaOver10 = parseInt($("#abilityvaluecharisma").val()) >= 10;
	var racialAbilitiesArray = getRacialAbilities(race, chaOver10);
	for(var key in racialAbilitiesArray) {
		addAbility(racialAbilitiesArray[key]);
	}
}

/**
 * Calculate the number of languages
 */
function recalculateMaxLanguages() {
	var langCount;
	
	// base from race
	langCount = 0;
	
	// add int bonus
	var intbonus = calculateAbilityBonus($("#abilityvalueintelligence").val());
	if(intbonus < 0) {
		intbonus = 0;
	}
	langCount += intbonus;
	
	// add Speak Language Ranks
	$("#skills tr:not(:first-child)").each(function(e) {
		var skillName = $.trim($(this).find("input.skillname").val().toLowerCase());
		if(skillName == "speak language") {
			var skillRanks = parseInt($(this).find("input.skilldata.ranks").val());
			if(isNaN(skillRanks)) {
				skillRanks = 0;
			}
			var skillCCRanks = Math.floor(parseFloat($(this).find("input.skilldata.ccranks").val()));
			if(isNaN(skillCCRanks)) {
				skillCCRanks = 0;
			}
			langCount += skillRanks;
			langCount += skillCCRanks;
			return false;
		}		
	});
	
	var knowsDruidic = false;

	// add Loremaster Bonus languages
	// add Druidic bonus language
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(classname == "loremaster" && !isNaN(classlevels)) {
			if(classlevels >= 8) {
				langCount += 2;
			} else if(classlevels >= 4) {
				langCount += 1;
			}
		}
		if((classname == "druid" || classname == "druid (avenger)" || classname == "druid (hunter)" || classname == "druid (shifter)") && !isNaN(classlevels)) {
			knowsDruidic = true;
		}
	});

	// Crystal Mask of Languages
	if(hasItem("crystal mask of languages")) {
		langCount += 5;
	}

	// remove manually entered automatic languages
	$(".languagefield").each(function(e) {
		var langname = $.trim($(this).val().toLowerCase());
		if(langname.length > 0) {
			if(langname == "druidic" && knowsDruidic) {
				deleteRow($(this));
			} else if(langname == "hodgepot") {
				deleteRow($(this));
			} else if(langname == "silver" && $("#characterculture").val() == "Silverite") {
				deleteRow($(this));
			} else if(langname == "west voran" && $("#characterculture").val() == "Voran") {
				deleteRow($(this));
			} else if(langname == "south ecclesic" && $("#characterculture").val() == "Ecclesian") {
				deleteRow($(this));
			}
		}
	});

	// get the current number of language lines
	var currLang = $(".languagefield").length;
	
	// there are too few languages listed, add until its good
	while(currLang < langCount) {
		addLanguageRow();
		currLang = $(".languagefield").length;
	}

	// there are too many languages listed, delete superfluous ones
	while(currLang > langCount) {
		deleteRow($(".languagefield:last"));
		currLang = $(".languagefield").length;
	}
	
	langCount += 2;

	if(knowsDruidic) {
		langCount += 1;
	}

	$("#langcount").html(langCount);

	if(knowsDruidic) {
		addAutomaticLanguage("Druidic");
	}

	addAutomaticLanguage("Hodgepot");

	switch($("#characterculture").val()) {
		case "Ecclesian":
			addAutomaticLanguage("South Ecclisic");
			break;
		case "Silverite":
			addAutomaticLanguage("Silver");
			break;
		case "Voran":
			addAutomaticLanguage("West Voran");
			break;
	}

}

function addAutomaticLanguage(language) {
	$('#languages').append('<tr><td class="calculatedRow"><input class="languagefield" onChange="recalculate();" value="' + language + '" disabled=disabled></input></td></tr>');
}

/**
 * Calculate a characters Speed
 */
function recalculateSpeed() {
	// Base race speed
	var speed = getRacialSpeed($("#raceselect").val());
	// Base run modifier
	var run = 4;
	
	// get type of armour worn
	var armourType = "none";
	var armourBonus = 0;
	
	var shield = false;

	// armour for sanity checking
	$("#equiped .equipmentItem").each(function(e) {
		var type = $(this).find(".itemtype").val();
		if(type == "Armour") {
			var name = $(this).find(".itemname").val();
			var itemObject = getItemDefaults(name);
			if(itemObject && itemObject["acbonus"] > armourBonus) {
				armourBonus = itemObject["acbonus"];
				armourType = itemObject["group"];
			}
		}
		if(type == "Shield") {
			shield = true;
		}
		var name = $(this).find(".itemname").val();
		var itemObject = getItemDefaults(name);
		if(itemObject && itemObject["speedbonus"]) {
			speed += itemObject["speedbonus"];
		}
	});
	
	// encumbrance for sanity checking
	var encumbrancelevel;
	switch($("#encumbrancelevel").html()) {
		case "Light Load":
			encumbrancelevel = "light";
			break;
		case "Medium Load":
			encumbrancelevel = "medium";
			break;
		case "Heavy Load":
			encumbrancelevel = "heavy";
			break;
		case "Overloaded":
			encumbrancelevel = "overload";
			break;
		default:
			encumbranclevel = "unknown";
	}
			
	// Barbarian / Avenger Druid Fast Movement
	if(hasAbility("Fast Movement") && (armourType == "none" || armourType == "light" || armourType == "medium") && (encumbrancelevel == "light" || encumbrancelevel == "medium")) {
		speed += 10;
	}
	

	// Knight Levels
	var knightlevels = 0;

	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if((classname == "knight" || classname == "fallen knight") && !isNaN(classlevels)) {
			knightlevels += classlevels;
		}
	});

	// Monk Speed
	var monklevels = 0;

	if(armourType == "none" && encumbrancelevel == "light" && !shield) {
		$("#classes tr:not(:first-child)").each(function(e) {
			var classname = getClassName(this);
			var classlevels = parseInt($(this).find(".classlevelfield").val());
			if((classname == "monk" 
				|| classname == "monk (cobra strike style)" 
				|| classname == "monk (denying stance style)" 
				|| classname == "monk (hand and foot style)" 
				|| classname == "monk (invisible eye style)" 
				|| classname == "monk (overwhelming attack style)" 
				|| classname == "monk (passive way style)" 
				|| classname == "monk (sleeping tiger style)" 
				|| classname == "monk (undying way style)" 
				|| classname == "psionic fist" 
				|| classname == "druid (hunter)") 
				&& !isNaN(classlevels)) {
				monklevels += classlevels;
			}
		});
	}
	if(monklevels > 0) {
		speed += (Math.floor(monklevels / 3) * 10);
	}
	
	// Speed of Thought
	if(hasFeat("Speed of Thought") && (armourType == "none" || armourType == "light" || armourType == "medium") && (encumbrancelevel == "light" || encumbrancelevel == "medium")) {
		speed += 10;
	}
	
	// armour / encumbrance speed reduction
	if(armourType == "medium" || armourType == "heavy" || encumbrancelevel == "medium" || encumbrancelevel == "heavy") {
		// dwarves are not affect in their speed by armour / encumbrance
		if(!($.trim($("#raceselect").val().toLowerCase()) == "dwarf")) {
			// knights don't get their speed reduced with Armour Mastery
			if(
				(armourType == "medium" && encumbrancelevel == "light" && knightlevels >= 4)
				|| (armourType == "heavy" && encumbrancelevel == "light" && knightlevels >= 9)
			) {
				// do nothing
			} else {
				switch(speed) {
					case 20 :
						speed = 15;
						break;
					case 30 :
						speed = 20;
						break;
					case 40 :
						speed = 30;
						break;
					case 50 :
						speed = 35;
						break;
					case 60 :
						speed = 40;
						break;
					case 70 :
						speed = 50;
						break;
					case 80 :
						speed = 55;
						break;
					case 90 :
						speed = 60;
						break;
					case 100 :
						speed = 70;
						break;
					default :
						// best effort
						speed = Math.round(speed * 0.133333) * 5
						break;
				}
			}
		}
	}
	
	// reduced run modifier for load
	if(armourType == "heavy" || encumbrancelevel == "heavy") {
		if(!(armourType == "heavy" && !(encumbrancelevel == "heavy") && knightlevels >= 9)) {
			run -= 1;
		}
	}
	
	// increased run modifier for Run feat
	if(hasFeat("Run")) {
		run += 1;
	}
	
	// speed when overloaded
	if(encumbrancelevel == "overload" || encumbrancelevel == "unknown") {
		speed = 5;
		run = 0;
	}
	
	// set speed in document
	$("#speed").html(speed);
	$("#run").html(run);
}

/**
 * Helper function for recalculateCircumstantialBonusses(). Generates a row for a save or ac popup to be added.
 */
function getPopupDetailsRow(text, bonus) {
	return "<tr class='calculated'><td class='detailsinput'>" + text + "</td><td class='detailsvalue'>" + bonus + "</td></tr>";
}

/**
 * Set circumstantial bonusses with a * as markers to provide the info without taking up too much space (mouse hover)
 */
function recalculateCircumstantialBonusses() {
	
	// saves & ac
	var forthtml = "";
	var reflhtml = "";
	var willhtml = "";
	var achtml = "";
	
	// Racial bonusses
	if($.trim($("#raceselect").val().toLowerCase()) == "dwarf") {
		// Dwarf Paragon gets better bonusses
		var didDwarfParagon = false;
		$("#classes tr:not(:first-child)").each(function(e) {
			var classname = getClassName(this);
			var classlevels = parseInt($(this).find(".classlevelfield").val());
			if(!isNaN(classlevels) && classlevels >= 2) {
				switch(classname) {
					case "dwarf paragon" :
						forthtml += getPopupDetailsRow("Racial bonus against poison.", "+3");
						forthtml += getPopupDetailsRow("Racial bonus against spells and spell-like abilities.", "+3");
						reflhtml += getPopupDetailsRow("Racial bonus against spells and spell-like abilities.", "+3");
						willhtml += getPopupDetailsRow("Racial bonus against spells and spell-like abilities.", "+3");
						didDwarfParagon = true;
						break;
				}
			}
		});
		if(!didDwarfParagon) {
			forthtml += getPopupDetailsRow("Racial bonus against poison.", "+2");
			forthtml += getPopupDetailsRow("Racial bonus against spells and spell-like abilities.", "+2");
			reflhtml += getPopupDetailsRow("Racial bonus against spells and spell-like abilities.", "+2");
			willhtml += getPopupDetailsRow("Racial bonus against spells and spell-like abilities.", "+2");
		}
	}
	if($.trim($("#raceselect").val().toLowerCase()) == "elf") {
		// Elf Paragon gets better bonusses
		var didElfParagon = false;
		$("#classes tr:not(:first-child)").each(function(e) {
			var classname = getClassName(this);
			var classlevels = parseInt($(this).find(".classlevelfield").val());
			if(!isNaN(classlevels)) {
				switch(classname) {
					case "elf paragon" :
						willhtml += getPopupDetailsRow("Racial bonus against enchantment spells or effects.", "+4");
						didElfParagon = true;
						break;
				}
			}
		});
		if(!didElfParagon) {
			willhtml += getPopupDetailsRow("Racial bonus against enchantment spells or effects.", "+2");
		}

	}
	if($.trim($("#raceselect").val().toLowerCase()) == "half-elf") {
		willhtml += getPopupDetailsRow("Racial bonus against enchantment spells or effects.", "+2");
	}
	if($.trim($("#raceselect").val().toLowerCase()) == "gnome") {
		willhtml += getPopupDetailsRow("Racial bonus against illusions.", "+2");
	}
	if($.trim($("#raceselect").val().toLowerCase()) == "halfling") {
		willhtml += getPopupDetailsRow("Morale bonus against fear.", "+2");
	}
	if($.trim($("#raceselect").val().toLowerCase()) == "dwarf" || $.trim($("#raceselect").val().toLowerCase()) == "gnome") {
		achtml += getPopupDetailsRow("Dodge bonus against giants.", "+4");
	}
	
	var cobraMonkBonus = false;
	
	// class bonusses
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if((classname == "druid" || classname == "druid (avenger)" || classname == "druid (hunter)" || classname == "druid (shifter)" || classname == "bard (druidic)") && !isNaN(classlevels) && classlevels >= 4) {
			forthtml += getPopupDetailsRow("Resist Nature's Lure against Fey spell-like abilities.", "+4");
			reflhtml += getPopupDetailsRow("Resist Nature's Lure against Fey spell-like abilities.", "+4");
			willhtml += getPopupDetailsRow("Resist Nature's Lure against Fey spell-like abilities.", "+4");
		}
		if((classname == "monk"
			|| classname == "monk (cobra strike style)"
			|| classname == "monk (denying stance style)"
			|| classname == "monk (hand and foot style)"
			|| classname == "monk (invisible eye style)"
			|| classname == "monk (overwhelming attack style)"
			|| classname == "monk (passive way style)"
			|| classname == "monk (sleeping tiger style)"
			|| classname == "monk (undying way style)"
			|| classname == "monk (tough)"
		) && !isNaN(classlevels) && classlevels >= 3) {
			willhtml += getPopupDetailsRow("Still Mind bonus against enchantment spells or effects.", "+2");
		}
		if((classname == "rogue" || classname == "rogue (warrior)" || classname == "rogue (wilderness)") && !isNaN(classlevels) && classlevels >= 3) {
			var trapsensebonus = Math.floor(classlevels / 3);
			reflhtml += getPopupDetailsRow("Rogue Trap Sense bonus against traps.", "+" + trapsensebonus);
			achtml += getPopupDetailsRow("Rogue Trap Sense bonus against traps.", "+" + trapsensebonus);
		}
		if((classname == "barbarian" || classname == "barbarian (hunter)" || classname == "barbarian (lion totem)" || classname == "barbarian (jaguar totem)") && !isNaN(classlevels) && classlevels >= 3) {
			var trapsensebonus = Math.floor(classlevels / 3);
			reflhtml += getPopupDetailsRow("Barbarian Trap Sense bonus against traps.", "+" + trapsensebonus);
			achtml += getPopupDetailsRow("Barbarian Trap Sense bonus against traps.", "+" + trapsensebonus);
		}
		if((classname == "barbarian" || 
			classname == "barbarian (ape totem)" || 
			classname == "barbarian (bear totem)" || 
			classname == "barbarian (boar totem)" || 
			classname == "barbarian (dragon totem)" || 
			classname == "barbarian (eagle totem)" || 
			classname == "barbarian (horse totem)" || 
			classname == "barbarian (serpent totem)" || 
			classname == "barbarian (wolf totem)" || 
			classname == "barbarian (lion totem)" || 
			classname == "barbarian (jaguar totem)") 
			&& !isNaN(classlevels) && classlevels >= 14) {
			willhtml += getPopupDetailsRow("Indomitable Will bonus against enchantment spells.", "+4");
		}		
		if(classname == "assassin" && !isNaN(classlevels) && classlevels >= 2) {
			var bonus = Math.floor(classlevels / 2);
			forthtml += getPopupDetailsRow("Assassin bonus against Poison.", "+" + bonus);
		}
		if(classname == "duelist" && !isNaN(classlevels) && classlevels >= 3) {
			achtml += getPopupDetailsRow("Duelist Enhanced Mobility bonus against Attacks of Opportunity when moving out of a threatend square.", "+4");
		}
		if(classname == "dwarven defender" && !isNaN(classlevels) && classlevels >= 4) {
			var trapsensebonus = Math.floor(classlevels / 4);
			reflhtml += getPopupDetailsRow("Dwarven Defender Trap Sense bonus against traps.", "+" + trapsensebonus);
			achtml += getPopupDetailsRow("Dwarven Defender Trap Sense bonus against traps.", "+" + trapsensebonus);
		}
		// monk special types
		if(classname == "monk (invisible eye style)") {
			if(classlevels >= 6 && hasFeat("Combat Reflexes") && hasFeat("Lightning Reflexes") && hasFeat("Blind-Fight") && getSkillRanks("Listen") >= 9 && hasFeat("Agile")) {
				achtml += getPopupDetailsRow("Monk (Invisible Eye Style) bonus when fighting defensively.", "+1");
			}
		}
		if(classname == "monk (cobra strike style)") {
			if(classlevels >= 6 && hasFeat("Dodge") && hasFeat("Mobility") && hasFeat("Spring Attack") && getSkillRanks("Escape Artist") >= 9 && getSkillRanks("Balance") >= 4) {
				// qualifies as cobra strike monk
				cobraMonkBonus = true;
			}
		}
		if(classname == "slayer" && !isNaN(classlevels) && classlevels >= 3) {
			willhtml += getPopupDetailsRow("Lucid Buffer bonus against all compulsions and mind-affecting effects.", "+4");
		}
		if(classname == "pyrokineticist" && !isNaN(classlevels) && classlevels >= 2) {
			var bonus = 4;
			if(classlevels >= 7) {
				bonus = 8;
			}
			forthtml += getPopupDetailsRow("Fire Adaptation against fire and heat spells and effects.", "+" + bonus);
			reflhtml += getPopupDetailsRow("Fire Adaptation against fire and heat spells and effects.", "+" + bonus);
			willhtml += getPopupDetailsRow("Fire Adaptation against fire and heat spells and effects.", "+" + bonus);
		}
		if(classname == "barbarian (dragon totem)" && !isNaN(classlevels) && classlevels >= 2) {
			forthtml += getPopupDetailsRow("Barbarian (Dragon Totem) bonus against paralysis and sleep", "+2");
			reflhtml += getPopupDetailsRow("Barbarian (Dragon Totem) bonus against paralysis and sleep", "+2");
			willhtml += getPopupDetailsRow("Barbarian (Dragon Totem) bonus against paralysis and sleep", "+2");
		}
		if(classname == "barbarian (serpent totem)" && !isNaN(classlevels)) {
			forthtml += getPopupDetailsRow("Barbarian (Serpent Totem) bonus against poison", "+2");
		}
		
		
	});
	
	// wilder AC bonus must be done last :(
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		// Wilder: Elude Touch
		if(classname == "wilder" && !isNaN(classlevels) && classlevels >= 2) {
			var TouchAC = calculateAbilityBonus($("#abilityvaluecharisma").val());
			achtml += getPopupDetailsRow("Elude Touch ability (cannot bring Touch Armour Class above regular Armour Class).", "+" + TouchAC);
		}
	});

	
	// feat bonusses
	if(hasFeat("Dodge")) {
		if(hasFeat("Psionic Dodge")) {
			if(hasFeat("Combat Defense") && countCombatFeats() >= 3) {
				if(cobraMonkBonus) {
					achtml += getPopupDetailsRow("Dodge / Psionic bonus against designated opponent with Cobra Strike and Combat Defense bonus.", "+4");
				} else {
					achtml += getPopupDetailsRow("Dodge / Psionic bonus against designated opponent with Combat Defense bonus.", "+3");
				}
			} else {
				if(cobraMonkBonus) {
					achtml += getPopupDetailsRow("Dodge / Psionic bonus against designated opponent with Cobra Strike bonus.", "+3");
				} else {
					achtml += getPopupDetailsRow("Dodge / Psionic bonus against designated opponent.", "+2");
				}
			}
		} else {
			if(hasFeat("Combat Defense") && countCombatFeats() >= 3) {
				if(cobraMonkBonus) {
					achtml += getPopupDetailsRow("Dodge bonus against designated opponent with Cobra Strike and Combat Defense bonus.", "+3");
				} else {
					achtml += getPopupDetailsRow("Dodge bonus against designated opponent with Combat Defense bonus.", "+2");
				}
			} else {
				if(cobraMonkBonus) {
					achtml += getPopupDetailsRow("Dodge bonus against designated opponent with Cobra Strike bonus.", "+2");
				} else {
					achtml += getPopupDetailsRow("Dodge bonus against designated opponent.", "+1");
				}
			}
		}
	}

	if(hasFeat("Celestial Sorcerer Heritage")) {
		forthtml += getPopupDetailsRow("Celestial Sorcerer Heritage bonus against Electricity and Petrification.", "+" + countCelestialSorcererFeats());
		reflhtml += getPopupDetailsRow("Celestial Sorcerer Heritage bonus against Electricity and Petrification.", "+" + countCelestialSorcererFeats());
		willhtml += getPopupDetailsRow("Celestial Sorcerer Heritage bonus against Electricity and Petrification.", "+" + countCelestialSorcererFeats());
	}
	if(hasFeat("Infernal Sorcerer Heritage")) {
		forthtml += getPopupDetailsRow("Infernal Sorcerer Heritage bonus against Fire and Poison.", "+" + countInfernalSorcererFeats());
		reflhtml += getPopupDetailsRow("Infernal Sorcerer Heritage bonus against Fire and Poison.", "+" + countInfernalSorcererFeats());
		willhtml += getPopupDetailsRow("Infernal Sorcerer Heritage bonus against Fire and Poison.", "+" + countInfernalSorcererFeats());
	}
	
	if(hasFeat("Sidestep Charge")) {
		achtml += getPopupDetailsRow("Dodge bonus against charge attacks.", "+4");
	}
	
	if(hasFeat("Endurance")) {
		forthtml += getPopupDetailsRow("Endurance bonus to avoid nonlethal damage from hot or cold environments.", "+4");
		forthtml += getPopupDetailsRow("Endurance bonus to resist damage from suffocation.", "+4");
	}
	
	if(hasFeat("Mobility")) {
		achtml += getPopupDetailsRow("Mobility bonus against attacks of opportunity caused when you move out of or within a threatened area.", "+4");
	}
	
	if(hasFeat("Closed Mind")) {
		forthtml += getPopupDetailsRow("Closed Mind bonus to resist psionic powers.", "+2");
		reflhtml += getPopupDetailsRow("Closed Mind bonus to resist psionic powers.", "+2");
		willhtml += getPopupDetailsRow("Closed Mind bonus to resist psionic powers.", "+2");
	}
	
	// conditionals from items
	$("#equiped .equipmentItem").each(function(e) {
		var name = $(this).find(".itemname").val();
		var itemObject = getItemDefaults(name);
		if(itemObject) {
			// ac
			if(itemObject["conditionalAC"]) {
				achtml += getPopupDetailsRow(name + ": " + itemObject["conditionalAC"].condition, itemObject["conditionalAC"].bonus);
			}
			// fort
			if(itemObject["conditionalFort"]) {
				forthtml += getPopupDetailsRow(name + ": " + itemObject["conditionalFort"].condition, itemObject["conditionalFort"].bonus);
			}
			// reflex
			if(itemObject["conditionalRefl"]) {
				reflhtml += getPopupDetailsRow(name + ": " + itemObject["conditionalRefl"].condition, itemObject["conditionalRefl"].bonus);
			}
			// will
			if(itemObject["conditionalWill"]) {
				willhtml += getPopupDetailsRow(name + ": " + itemObject["conditionalWill"].condition, itemObject["conditionalWill"].bonus);
			}
		}
	});

	// conditionals from domains
	var domain1 = $.trim($(".domainchoice:first").val().toLowerCase());
	var domain2 = $.trim($(".domainchoice:last").val().toLowerCase());
	var domain3 = $.trim($("#cloisteredclericdomain").val().toLowerCase());

	if(domain1 == "liberation" || domain2 == "liberation" || domain3 == "liberation") {
		willhtml += getPopupDetailsRow("Liberation Domain: Morale versus Enchantment", "+2");
	}
	if(domain1 == "mind" || domain2 == "mind" || domain3 == "mind") {
		willhtml += getPopupDetailsRow("Mind Domain versus Enchantment", "+2");
	}

	// add to popups
	if(forthtml.length > 0) {
		$("#fortitudedetails .detailstable").append("<tr class='calculated'><td colspan=2><div class='hr'></div></td></tr><tr class='calculated'><th colspan=2>Conditional Bonusses</th></tr>" + forthtml);
	}
	if(reflhtml.length > 0) {
		$("#reflexdetails .detailstable").append("<tr class='calculated'><td colspan=2><div class='hr'></div></td></tr><tr class='calculated'><th colspan=2>Conditional Bonusses</th></tr>" + reflhtml);
	}
	if(willhtml.length > 0) {
		$("#willdetails .detailstable").append("<tr class='calculated'><td colspan=2><div class='hr'></div></td></tr><tr class='calculated'><th colspan=2>Conditional Bonusses</th></tr>" + willhtml);
	}
	if(achtml.length > 0) {
		$("#acdetails .detailstable").append("<tr class='calculated'><td colspan=2><div class='hr'></div></td></tr><tr class='calculated'><th colspan=2>Conditional Bonusses</th></tr>" + achtml);
	}

	
	
	// skill bonusses
	var skillStars = [];
	
	// synergies -> star on synergy, skill
	$("#skills tr:not(:first-child)").each(function(e) {
		var allBoosts = "";
		
		var skillName = $.trim($(this).find("input.skillname").val().toLowerCase());
		$("#skills tr:not(:first-child)").each(function(e) {
			var skillName2 = $.trim($(this).find("input.skillname").val().toLowerCase());
			var skillRanks = parseInt($(this).find("input.skilldata.ranks").val());
			if(isNaN(skillRanks)) {
				skillRanks = 0;
			}
			var skillCCRanks = Math.floor(parseFloat($(this).find("input.skilldata.ccranks").val()));
			if(isNaN(skillCCRanks)) {
				skillCCRanks = 0;
			}
			if(skillRanks + skillCCRanks >= 5) {			
				var temp = getConditionalSynergyBonus(skillName, skillName2);
				if(temp.length > 0) {
					allBoosts += "\n" + temp;
				}
			}
		});
		
		// special feat cases
		if(skillName == "concentration") {
			if(hasFeat("Combat Casting")) {
				allBoosts += "\n" + "+4 bonus on checks made to cast a spell or use a spell-like ability while on the defensive or while you are grappling or pinned.";
			}
			if(hasFeat("Combat Manifestation")) {
				allBoosts += "\n" + "+4 bonus on checks made to manifest a power or use a psi-like ability while on the defensive or while you are grappling or pinned.";
			}
			if(hasFeat("Narrow Mind")) {
				allBoosts += "\n" + "+4 bonus on checks to become psionically focused.";
			}
		}
		if(skillName == "swim" && hasFeat("Endurance")) {
			allBoosts += "\n" + "+4 bonus on swim checks made to resist non-lethal damage.";
		}
		if(skillName == "sense motive" && hasFeat("Inquisitor")) {
			allBoosts += "\n" + "Expend Psionic Focus for a +10 bonus to oppose a Bluff check.";
		}
		if(skillName == "jump" && hasFeat("Mental Leap")) {
			allBoosts += "\n" + "Expend Psionic Focus for a +10 bonus.";
		}
		
		// special race bonus
		if(skillName == "appraise" && $.trim($("#raceselect").val().toLowerCase()) == "dwarf") {
			allBoosts += "\n" + "+2 Racial bonus on checks related to stone or metal items.";
		}
		if(skillName == "search" && $.trim($("#raceselect").val().toLowerCase()) == "dwarf") {
			// Dwarf Paragon gets better bonusses
			var didDwarfParagon = false;
			$("#classes tr:not(:first-child)").each(function(e) {
				var classname = getClassName(this);
				var classlevels = parseInt($(this).find(".classlevelfield").val());
				if(!isNaN(classlevels)) {
					switch(classname) {
						case "dwarf paragon" :
							allBoosts += "\n" + "+4 Racial bonus to notice unusual stonework.";
							didDwarfParagon = true;
							break;
					}
				}
			});
			if(!didDwarfParagon) {
				allBoosts += "\n" + "+2 Racial bonus to notice unusual stonework.";
			}
		}

		// specialist bonus
		if(skillName == "spellcraft" || skillName == "psicraft") {
			// A psion gains a +2 bonus on Psicraft checks when dealing with a power or effect from his discipline. 
			// If you are a specialist wizard, you get a +2 bonus on Spellcraft checks when dealing with a spell or effect from your specialty school. You take a -5 penalty when dealing with a spell or effect from a prohibited school (and some tasks, such as learning a prohibited spell, are just impossible). 
			// class bonusses
			$("#classes tr:not(:first-child)").each(function(e) {
				var classname = getClassName(this);
				var classlevels = parseInt($(this).find(".classlevelfield").val());
				if(!isNaN(classlevels)) {
					switch(classname) {
						case "wizard (abjurer)" :
							allBoosts += "\n" + "+2 bonus on checks dealing with Abjuration spells or effects.";
							allBoosts += "\n" + "-5 penalty on checks dealing with spells or effects from prohibited schools.";
							break;
						case "wizard (conjurer)" : 		
							allBoosts += "\n" + "+2 bonus on checks dealing with Conjuration spells or effects.";
							allBoosts += "\n" + "-5 penalty on checks dealing with spells or effects from prohibited schools.";
							break;
						case "wizard (diviner)" : 		
							allBoosts += "\n" + "+2 bonus on checks dealing with Divination spells or effects.";
							allBoosts += "\n" + "-5 penalty on checks dealing with spells or effects from a prohibited school.";
							break;
						case "wizard (enchanter)" : 		
							allBoosts += "\n" + "+2 bonus on checks dealing with Enchantment spells or effects.";
							allBoosts += "\n" + "-5 penalty on checks dealing with spells or effects from prohibited schools.";
							break;
						case "wizard (evoker)" : 		
							allBoosts += "\n" + "+2 bonus on checks dealing with Evocation spells or effects.";
							allBoosts += "\n" + "-5 penalty on checks dealing with spells or effects from prohibited schools.";
							break;
						case "wizard (illusionist)" : 		
							allBoosts += "\n" + "+2 bonus on checks dealing with Illusion spells or effects.";
							allBoosts += "\n" + "-5 penalty on checks dealing with spells or effects from prohibited schools.";
							break;
						case "wizard (necromancer)" : 	
							allBoosts += "\n" + "+2 bonus on checks dealing with Necromancy spells or effects.";
							allBoosts += "\n" + "-5 penalty on checks dealing with spells or effects from prohibited schools.";
							break;
						case "wizard (transmuter)" : 		
							allBoosts += "\n" + "+2 bonus on checks dealing with Transmutation spells or effects.";
							allBoosts += "\n" + "-5 penalty on checks dealing with spells or effects from prohibited schools.";
							break;

						case "psion (seer)" : 			
							allBoosts += "\n" + "+2 bonus on checks dealing with powers or effects from the Clairsentience discipline.";
							break;
						case "psion (shaper)" : 		
							allBoosts += "\n" + "+2 bonus on checks dealing with powers or effects from the Metacreativity discipline.";
							break;
						case "psion (kineticist)" : 		
							allBoosts += "\n" + "+2 bonus on checks dealing with powers or effects from the Psychokinesis discipline.";
							break;
						case "psion (egoist)" : 			
							allBoosts += "\n" + "+2 bonus on checks dealing with powers or effects from the Psychometabolism discipline.";
							break;
						case "psion (nomad)" : 		
							allBoosts += "\n" + "+2 bonus on checks dealing with powers or effects from the Psychoportation discipline.";
							break;
						case "psion (telepath)" : 		
							allBoosts += "\n" + "+2 bonus on checks dealing with powers or effects from the Telepathy discipline.";
							break;
					}
				}
			});
		}

		// horse totem barbarian
		if(skillName == "handle animal" || skillName == "ride") {
 			$("#classes tr:not(:first-child)").each(function(e) {
				var classname = getClassName(this);
				var classlevels = parseInt($(this).find(".classlevelfield").val());
				if(!isNaN(classlevels)) {
					if(classname == "barbarian (horse totem)" && classlevels >= 3) {
						allBoosts += "\n" + "+2 bonus on checks involving horses.";
					}
				}
			});
		}

		
		
		// hawk and owl familiars on spot
		if(skillName == "spot") {
			if(hasItemNear("Hawk Familiar")) {
				allBoosts += "\n" + "+3 bonus on Spot checks in bright daylight.";
			}
			if(hasItemNear("Owl Familiar")) {
				allBoosts += "\n" + "+3 bonus on Spot checks in shadows.";
			}
		}
		
		// equipment
		if(skillName == "appraise") {
			if(hasItemWith("magnifying glass")) {
				allBoosts += "\n" + "+2 circumstance bonus on checks involving any item that is small or highly detailed.";
			}
			if(hasItemWith("merchant's scale") || hasItemWith("scale")) {
				allBoosts += "\n" + "+2 circumstance bonus on checks involving items that are valued by weight, including anything made of precious metals.";
			}
		}
		
		// add as *
		if(allBoosts.length > 0) {
			allBoosts = allBoosts.substr(1);
			$(this).find(".skilltotalbonus").append("*").attr( "title", allBoosts );
		}
		
	});
	
}

function countCombatFeats() {
	var total = 0;
	total += countFeat("Combat Awareness");
	total += countFeat("Combat Defense");
	total += countFeat("Combat Focus");
	total += countFeat("Combat Stability");
	total += countFeat("Combat Strike");
	total += countFeat("Combat Vigor");
	return total;
}

function countCelestialSorcererFeats() {
	var total = 0;
	total += countFeat("Celestial Sorcerer Aura");
	total += countFeat("Celestial Sorcerer Heritage");
	total += countFeat("Celestial Sorcerer Lance");
	total += countFeat("Celestial Sorcerer Lore");
	total += countFeat("Celestial Sorcerer Wings");
	return total;
}

function countInfernalSorcererFeats() {
	var total = 0;
	total += countFeat("Infernal Sorcerer Eyes");
	total += countFeat("Infernal Sorcerer Heritage");
	total += countFeat("Infernal Sorcerer Howl");
	total += countFeat("Infernal Sorcerer Resistance");
	return total;
}

/**
 * Determine skill values
 */
function recalculateSkillBonusses() {
	// get the ACP
	var armourACP = 0;
	var armourBonus = 0;
	var shieldACP = 0;
	var shieldBonus = 0;

	$("#equiped .equipmentItem").each(function(e) {
		var type = $(this).find(".itemtype").val();
		if(type == "Armour") {
			var name = $(this).find(".itemname").val();
			var itemObject = getItemDefaults(name);
			if(itemObject && itemObject["acbonus"] > armourBonus) {
				armourBonus = itemObject["acbonus"];
				armourACP = itemObject["acp"];
			}
		}
		if(type == "Shield") {
			var name = $(this).find(".itemname").val();
			var itemObject = getItemDefaults(name);
			if(itemObject && itemObject["acbonus"] > shieldBonus) {
				shieldBonus = itemObject["acbonus"];
				shieldACP = itemObject["acp"];
			}
		}
	});
	
	var armourAndShieldACP = armourACP + shieldACP;
	
	// check if encumbrance applies
	var encumbranceACP;
	switch($("#encumbrancelevel").html()) {
		case "Light Load":
			encumbranceACP = 0;
			break;
		case "Medium Load":
			encumbranceACP = -3;
			break;
		case "Heavy Load":
			encumbranceACP = -6;
			break;
		case "Overloaded":
			encumbranceACP = -1000;
			break;
	}
	
	var actualACP = Math.min(armourAndShieldACP, encumbranceACP);	
	
	// run through all skill lines
	$("#skills tr:not(:first-child)").each(function(e) {
		var totalBonus = 0;
		
		var skillName = $.trim($(this).find("input.skillname").val().toLowerCase());

		// special case: Use Psionic Device = use Magic Device
		if(skillName == "use psionic device") {
			skillName = "Use Magic Device";
		}
		// special case: Psicraft = Spellcraft
		if(skillName == "psicraft") {
			skillName = "Spellcraft";
		}		
		
		var skillRanks = parseInt($(this).find("input.skilldata.ranks").val());
		if(isNaN(skillRanks)) {
			skillRanks = 0;
		}
		totalBonus += skillRanks;
		var skillCCRanks = Math.floor(parseFloat($(this).find("input.skilldata.ccranks").val()));
		if(isNaN(skillCCRanks)) {
			skillCCRanks = 0;
		}
		totalBonus += skillCCRanks;
		var skillOtherBonusses = parseInt($(this).find("input.skilldata.other").val());
		if(isNaN(skillOtherBonusses)) {
			skillOtherBonusses = 0;
		}
		totalBonus += skillOtherBonusses;
		
		// ability
		var skillAbility = getSkillAbility(skillName);
		if($.trim(skillAbility.toLowerCase()) == "wisdom") {
			totalBonus -= getInsanityScore();
		}
		totalBonus += calculateAbilityBonus($("#abilityvalue" + skillAbility).val());
		$(this).find(".skilldata.ability").removeClass("strengthrawbonusfield").removeClass("dexterityrawbonusfield").removeClass("constitutionrawbonusfield").removeClass("intelligencerawbonusfield").removeClass("wisdomrawbonusfield").removeClass("charismarawbonusfield");
		$(this).find(".skilldata.ability").addClass(skillAbility + "rawbonusfield");
		
		// racial bonus
		var racial = getRacialSkillBonus($("#raceselect").val(), skillName);

		// special
		totalSpecial = 0;
		// run feat for jump
		if(hasFeat("Run") && skillName == "jump") {
			totalSpecial += 4;
		}
		// speed bonus
		if(skillName == "jump") {
			var speed = $("#speed").html();
			totalSpecial += getSpeedBonusOnJump(speed);
		}

		// paragon classes
		// class variant bonusses
		$("#classes tr:not(:first-child)").each(function(e) {
			var classname = getClassName(this);
			var classlevels = parseInt($(this).find(".classlevelfield").val());
			if(!isNaN(classlevels)) {
				switch(classname) {
					case "dwarf paragon" :
						switch(skillName) {
							case "craft: armoursmithing":
							case "craft: blacksmithing":
							case "craft: masonry":
							case "craft: weaponsmithing":
								racial = 2 + classlevels; 
						}
						break;
					case "elf paragon" :
						switch(skillName) {
							case "search":
							case "spot":
								racial = 4;
						}
						break;
					case "gnome paragon" :
						switch(skillName) {
							case "listen":
							case "craft: alchemy":
								racial = 4;
						}
						break;
					case "half-elf paragon" :
						switch(skillName) {
							case "search":
							case "spot":
								racial = 2;
								break;
						}
						if(classlevels >= 2) {
							switch(skillName) {
								case "diplomacy":
								case "gather information":
									racial = 3;
									break;
								case "bluff":
								case "disguise":
								case "handle animal":
								case "intimidate":
								case "perform: act":
								case "perform: comedy":
								case "perform: dance":
								case "perform: juggle":
								case "perform: keyboard instruments":
								case "perform: oratory":
								case "perform: percussion instruments":
								case "perform: string instruments":
								case "perform: wind instruments":
								case "perform: sing":
								case "use magic device":
									racial = 2;
									break;
							}
						}
						break;
					case "half-orc paragon" :
						switch(skillName) {
							case "intimidate":
								racial = 4;
								break;
						}
						break;
					case "halfling paragon" :
						switch(skillName) {
							case "climb":
							case "jump":
							case "move silently":
								racial = 3;
								break;
						}
						break;						
					case "barbarian (ape totem)":
						if(classlevels >= 2 && skillName == "intimidate") {
							totalSpecial += 2;
						}
						break;
					case "barbarian (eagle totem)":
						if(skillName == "spot") {
							totalSpecial += 2;
						}
						break
					case "barbarian (lion totem)":
						if(classlevels >= 2 && skillName == "hide") {
							totalSpecial += 2;
						}
						break;
					case "barbarian (serpent totem)":
						if(classlevels >=2 && skillName == "move silently") {
							totalSpecial += 2;
						}
						break;
					case "bard (druidic)":
					case "druid":
					case "druid (avenger)":
					case "druid (hunter)":
					case "druid (shifter)":
						if(skillName == "knowledge: nature" || skillName == "survival") {
							totalSpecial += 2;
						}
						break;
					case "monk (cobra strike style)":
						if(skillName == "escape artist" && hasFeat("Dodge")) {
							if(classlevels >= 2 && !hasFeat("Mobility")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Spring Attack") && getSkillRanks("Escape Artist") >= 9 && getSkillRanks("Balance") >= 4)) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (denying stance style)":
						if(skillName == "tumble" && hasFeat("Improved Grapple")) {
							if(classlevels >= 2 && !hasFeat("Combat Reflexes")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Improved Disarm") && getSkillRanks("Tumble") >= 9 && hasFeat("Combat Expertise"))) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (hand and foot style)":
						if(skillName == "balance" && hasFeat("Stunning Fist")) {
							if(classlevels >= 2 && !hasFeat("Deflect Arrows")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Improved Trip") && getSkillRanks("Balance") >= 9 && getSkillRanks("Tumble") >= 4)) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (invisible eye style)":
						if(skillName == "listen" && hasFeat("Combat Reflexes")) {
							if(classlevels >= 2 && !hasFeat("Lightning Reflexes")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Blind-Fight") && getSkillRanks("Listen") >= 9 && hasFeat("Agile"))) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (overwhelming attack style)":
						if(skillName == "intimidate" && hasFeat("Power Attack")) {
							if(classlevels >= 2 && !hasFeat("Improved Bull Rush")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Improved Overrun") && getSkillRanks("Intimidate") >= 4 && getSkillRanks("Perform: Dance") >= 4)) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (passive way style)":
						if(skillName == "bluff" && hasFeat("Combat Expertise")) {
							if(classlevels >= 2 && !hasFeat("Improved Trip")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Improved Feint") && getSkillRanks("Bluff") >= 4 && getSkillRanks("Sense Motive") >= 4 && hasFeat("Skill Focus: Bluff"))) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (sleeping tiger style)":
						if(skillName == "hide" && hasFeat("Weapon Finesse")) {
							if(classlevels >= 2 && !hasFeat("Improved Initiative")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Improved Sunder") && getSkillRanks("Hide") >= 9 && hasFeat("Power Attack"))) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (undying way style)":
						if(skillName == "concentration" && hasFeat("Toughness")) {
							if(classlevels >= 2 && !hasFeat("Endurance")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Diehard") && getSkillRanks("Concentration") >= 9)) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "hauwk rider":
						if(skillName == "spot") {
							totalSpecial += 4;
							if(classlevels >= 6) {
								totalSpecial += 4;
							}
						}
						break;
					case "dragon shaman (red)":
						if(skillName == "appraise" || skillName == "search") {
							if(classlevels >= 3) {
								totalSpecial += 5;
							}
						}
						break;
				}
			}
		});

		$(this).find(".skilldata.racial").html(racial);
		totalBonus += racial;
		
		// size bonus
		if(isSmallRace($("#raceselect").val()) && skillName == "hide") {
			$(this).find(".skilldata.size").html("4");
			totalBonus += 4;
		} else if(isSmallRace($("#raceselect").val()) && skillName == "intimidate") {
			$(this).find(".skilldata.size").html("-4");
			totalBonus += -4;
		} else {
			$(this).find(".skilldata.size").html("0");
		}
		
		// synergy bonusses (only lists unconditional synergy bonusses)
		var synergyTotal = 0;
		
		$("#skills tr:not(:first-child)").each(function(e) {
			var sn = $(this).find("input.skillname").val();
			var sr = parseInt($(this).find("input.skilldata.ranks").val());
			if(isNaN(sr)) {
				sr = 0;
			}
			var sccr = Math.floor(parseFloat($(this).find("input.skilldata.ccranks").val()));
			if(isNaN(sccr)) {
				sccr = 0;
			}
			
			if((sr + sccr) >= 5) {
				synergyTotal += getSynergyBonus(skillName, sn);
			}
		});
		$(this).find(".skilldata.synergy").html(synergyTotal);
		totalBonus += synergyTotal;
		
		// feat bonusses
		var totalFeatBonus = 0;
		
		// Skill Focus Feat
		if(hasFeat("Skill Focus: " + skillName)) {
			totalFeatBonus += 3;
		}
		// special cases
		if(skillName == "spellcraft") {
			if(hasFeat("Skill Focus: Psicraft")) {
				totalFeatBonus += 3;
			}
		}
		if(skillName == "use magic device") {
			if(hasFeat("Skill Focus: Use Psionic Device")) {
				totalFeatBonus += 3;
			}
		}
		
		// skill bonus feats
		var skillFeats = getBaseBonusFeats(skillName);
		for(var key in skillFeats) {
			var feat = skillFeats[key];
			if(hasFeat(feat)) {
				totalFeatBonus += 2;
				break;
			}
		}
		
		$(this).find(".skilldata.feats").html(totalFeatBonus);
		totalBonus += totalFeatBonus;

		// armour check penalty
		if(isACPSkill(skillName)) {
		
			// Swim: double ACP
			if(skillName == "swim") {
				totalBonus += (2*actualACP);
				$(this).find(".skilldata.acp").html((2*actualACP));			
			} else {
				totalBonus += actualACP;
				$(this).find(".skilldata.acp").html(actualACP);			
			}
		} else {
			$(this).find(".skilldata.acp").html(0);			
		}
		
		var equipmentBonus = 0;

		// equipment bonusses
		$("#equiped .equipmentItem").each(function(e) {
			var details = getItemDefaults($(this).find('.itemname').val());
			if(details && details['skillboost']) {
				for(var key in details['skillboost']) {
					if(details['skillboost'][key]['skillname'] == skillName) {
						// familiar bonus if any
						totalSpecial += details['skillboost'][key]['specialbonus'];
						// regular bonus if any
						if(details['skillboost'][key]['regularbonus'] > equipmentBonus) {
							equipmentBonus = details['skillboost'][key]['regularbonus'];
						}
					}
				}
			}
		});

		// domain bonusses
		var domain1 = $.trim($(".domainchoice:first").val().toLowerCase());
		var domain2 = $.trim($(".domainchoice:last").val().toLowerCase());
		var domain3 = $.trim($("#cloisteredclericdomain").val().toLowerCase());
		
		switch(skillName) {
			case "diplomacy":
				if(domain1 == "community" || domain2 == "community" || domain3 == "community") {
					// ensure no overlap with competence bonus
					if(!hasItemEquiped("circlet of persuasion")) {
						totalSpecial += 2;
					}
				}
				// fall through
			case "bluff":
			case "sense motive":
				if(domain1 == "mind" || domain2 == "mind" || domain3 == "mind") {
					totalSpecial += 2;
				}
				break;
			case "craft: alchemy":
			case "craft: armoursmithing":
			case "craft: blacksmithing":
			case "craft: leatherworking":
			case "craft: masonry":
			case "craft: poison":
			case "craft: shipbuilding":
			case "craft: tailoring":
			case "craft: weaponsmithing":
			case "craft: woodworking":
				if(domain1 == "artifice" || domain2 == "artifice" || domain3 == "artifice") {
					totalSpecial += 4;
				}
		}
		
		$(this).find(".skilldata.equipment").html(equipmentBonus);
		totalBonus += equipmentBonus;

		$(this).find(".skilldata.special").html(totalSpecial);
		totalBonus += totalSpecial;

		if(totalBonus >= 0) {
			totalBonus = "+" + totalBonus;
		}
		$(this).find(".skilltotalbonus").html(totalBonus);
	});	
}

/**
 * Determine skill values
 */
function recalculateSkillBonussesOLD() {
	// get the ACP
	var armourACP = 0;
	var armourBonus = 0;
	var shieldACP = 0;
	var shieldBonus = 0;

	$("#equiped .equipmentItem").each(function(e) {
		var type = $(this).find(".itemtype").val();
		if(type == "Armour") {
			var name = $(this).find(".itemname").val();
			var itemObject = getItemDefaults(name);
			if(itemObject && itemObject["acbonus"] > armourBonus) {
				armourBonus = itemObject["acbonus"];
				armourACP = itemObject["acp"];
			}
		}
		if(type == "Shield") {
			var name = $(this).find(".itemname").val();
			var itemObject = getItemDefaults(name);
			if(itemObject && itemObject["acbonus"] > shieldBonus) {
				shieldBonus = itemObject["acbonus"];
				shieldACP = itemObject["acp"];
			}
		}
	});
	
	var armourAndShieldACP = armourACP + shieldACP;
	
	// check if encumbrance applies
	var encumbranceACP;
	switch($("#encumbrancelevel").html()) {
		case "Light Load":
			encumbranceACP = 0;
			break;
		case "Medium Load":
			encumbranceACP = -3;
			break;
		case "Heavy Load":
			encumbranceACP = -6;
			break;
		case "Overloaded":
			encumbranceACP = -1000;
			break;
	}
	
	var actualACP = Math.min(armourAndShieldACP, encumbranceACP);	
	
	// run through all skill lines
	$("#skills tr:not(:first-child)").each(function(e) {
		var totalBonus = 0;
		
		var skillName = $(this).find("input.skillname").val();

		// special case: Use Psionic Device = use Magic Device
		if($.trim(skillName.toLowerCase()) == "use psionic device") {
			skillName = "Use Magic Device";
		}
		// special case: Psicraft = Spellcraft
		if($.trim(skillName.toLowerCase()) == "psicraft") {
			skillName = "Spellcraft";
		}		
		
		var skillRanks = parseInt($(this).find("input.skilldata.ranks").val());
		if(isNaN(skillRanks)) {
			skillRanks = 0;
		}
		totalBonus += skillRanks;
		var skillCCRanks = Math.floor(parseFloat($(this).find("input.skilldata.ccranks").val()));
		if(isNaN(skillCCRanks)) {
			skillCCRanks = 0;
		}
		totalBonus += skillCCRanks;
		var skillOtherBonusses = parseInt($(this).find("input.skilldata.other").val());
		if(isNaN(skillOtherBonusses)) {
			skillOtherBonusses = 0;
		}
		totalBonus += skillOtherBonusses;
		
		// ability
		var skillAbility = getSkillAbility(skillName);
		if($.trim(skillAbility.toLowerCase()) == "wisdom") {
			totalBonus -= getInsanityScore();
		}
		totalBonus += calculateAbilityBonus($("#abilityvalue" + skillAbility).val());
		$(this).find(".skilldata.ability").removeClass("strengthrawbonusfield").removeClass("dexterityrawbonusfield").removeClass("constitutionrawbonusfield").removeClass("intelligencerawbonusfield").removeClass("wisdomrawbonusfield").removeClass("charismarawbonusfield");
		$(this).find(".skilldata.ability").addClass(skillAbility + "rawbonusfield");
		
		// racial bonus
		var racial = getRacialSkillBonus($("#raceselect").val(), skillName);

		// paragon classes
		$("#classes tr:not(:first-child)").each(function(e) {
			var classname = getClassName(this);
			var classlevels = parseInt($(this).find(".classlevelfield").val());
			if(!isNaN(classlevels)) {
				switch(classname) {
					case "dwarf paragon" :
						switch($.trim(skillName.toLowerCase())) {
							case "craft: armoursmithing":
							case "craft: blacksmithing":
							case "craft: masonry":
							case "craft: weaponsmithing":
								racial = 2 + classlevels; 
						}
						break;
					case "elf paragon" :
						switch($.trim(skillName.toLowerCase())) {
							case "search":
							case "spot":
								racial = 4;
						}
						break;
					case "gnome paragon" :
						switch($.trim(skillName.toLowerCase())) {
							case "listen":
							case "craft: alchemy":
								racial = 4;
						}
						break;
					case "half-elf paragon" :
						switch($.trim(skillName.toLowerCase())) {
							case "search":
							case "spot":
								racial = 2;
								break;
						}
						if(classlevels >= 2) {
							switch($.trim(skillName.toLowerCase())) {
								case "diplomacy":
								case "gather information":
									racial = 3;
									break;
								case "bluff":
								case "disguise":
								case "handle animal":
								case "intimidate":
								case "perform: act":
								case "perform: comedy":
								case "perform: dance":
								case "perform: juggle":
								case "perform: keyboard instruments":
								case "perform: oratory":
								case "perform: percussion instruments":
								case "perform: string instruments":
								case "perform: wind instruments":
								case "perform: sing":
								case "use magic device":
									racial = 2;
									break;
							}
						}
						break;
					case "half-orc paragon" :
						switch($.trim(skillName.toLowerCase())) {
							case "intimidate":
								racial = 4;
								break;
						}
						break;
					case "halfling paragon" :
						switch($.trim(skillName.toLowerCase())) {
							case "climb":
							case "jump":
							case "move silently":
								racial = 3;
								break;
						}
						break;						
				}
			}
		});

		$(this).find(".skilldata.racial").html(racial);
		totalBonus += racial;
		
		// size bonus
		if(isSmallRace($("#raceselect").val()) && $.trim(skillName.toLowerCase()) == "hide") {
			$(this).find(".skilldata.size").html("4");
			totalBonus += 4;
		} else if(isSmallRace($("#raceselect").val()) && $.trim(skillName.toLowerCase()) == "intimidate") {
			$(this).find(".skilldata.size").html("-4");
			totalBonus += -4;
		} else {
			$(this).find(".skilldata.size").html("0");
		}
		
		// synergy bonusses (only lists unconditional synergy bonusses)
		var synergyTotal = 0;
		
		$("#skills tr:not(:first-child)").each(function(e) {
			var sn = $(this).find("input.skillname").val();
			var sr = parseInt($(this).find("input.skilldata.ranks").val());
			if(isNaN(sr)) {
				sr = 0;
			}
			var sccr = Math.floor(parseFloat($(this).find("input.skilldata.ccranks").val()));
			if(isNaN(sccr)) {
				sccr = 0;
			}
			
			if((sr + sccr) >= 5) {
				synergyTotal += getSynergyBonus(skillName, sn);
			}
		});
		$(this).find(".skilldata.synergy").html(synergyTotal);
		totalBonus += synergyTotal;
		
		// feat bonusses
		var totalFeatBonus = 0;
		
		// Skill Focus Feat
		if(hasFeat("Skill Focus: " + skillName)) {
			totalFeatBonus += 3;
		}
		// special cases
		if($.trim(skillName.toLowerCase()) == "spellcraft") {
			if(hasFeat("Skill Focus: Psicraft")) {
				totalFeatBonus += 3;
			}
		}
		if($.trim(skillName.toLowerCase()) == "use magic device") {
			if(hasFeat("Skill Focus: Use Psionic Device")) {
				totalFeatBonus += 3;
			}
		}
		
		// skill bonus feats
		var skillFeats = getBaseBonusFeats(skillName);
		for(var key in skillFeats) {
			var feat = skillFeats[key];
			if(hasFeat(feat)) {
				totalFeatBonus += 2;
				break;
			}
		}
		
		$(this).find(".skilldata.feats").html(totalFeatBonus);
		totalBonus += totalFeatBonus;

		// special
		totalSpecial = 0;
		// run feat for jump
		if(hasFeat("Run") && $.trim(skillName.toLowerCase()) == "jump") {
			totalSpecial += 4;
		}
		// speed bonus
		if($.trim(skillName.toLowerCase()) == "jump") {
			var speed = $("#speed").html();
			totalSpecial += getSpeedBonusOnJump(speed);
		}
		// class variant bonusses
		$("#classes tr:not(:first-child)").each(function(e) {
			var classname = getClassName(this);
			var classlevels = parseInt($(this).find(".classlevelfield").val());
			if(!isNaN(classlevels)) {
				switch(classname) {
					case "barbarian (ape totem)":
						if(classlevels >= 2 && $.trim(skillName.toLowerCase()) == "intimidate") {
							totalSpecial += 2;
						}
						break;
					case "barbarian (eagle totem)":
						if($.trim(skillName.toLowerCase()) == "spot") {
							totalSpecial += 2;
						}
						break
					case "barbarian (lion totem)":
						if(classlevels >= 2 && $.trim(skillName.toLowerCase()) == "hide") {
							totalSpecial += 2;
						}
						break;
					case "barbarian (serpent totem)":
						if(classlevels >=2 && $.trim(skillName.toLowerCase()) == "move silently") {
							totalSpecial += 2;
						}
						break;
					case "bard (druidic)":
					case "druid":
					case "druid (avenger)":
					case "druid (hunter)":
					case "druid (shifter)":
						if($.trim(skillName.toLowerCase()) == "knowledge: nature" || $.trim(skillName.toLowerCase()) == "survival") {
							totalSpecial += 2;
						}
						break;
					case "monk (cobra strike style)":
						if($.trim(skillName.toLowerCase()) == "escape artist" && hasFeat("Dodge")) {
							if(classlevels >= 2 && !hasFeat("Mobility")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Spring Attack") && getSkillRanks("Escape Artist") >= 9 && getSkillRanks("Balance") >= 4)) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (denying stance style)":
						if($.trim(skillName.toLowerCase()) == "tumble" && hasFeat("Improved Grapple")) {
							if(classlevels >= 2 && !hasFeat("Combat Reflexes")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Improved Disarm") && getSkillRanks("Tumble") >= 9 && hasFeat("Combat Expertise"))) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (hand and foot style)":
						if($.trim(skillName.toLowerCase()) == "balance" && hasFeat("Stunning Fist")) {
							if(classlevels >= 2 && !hasFeat("Deflect Arrows")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Improved Trip") && getSkillRanks("Balance") >= 9 && getSkillRanks("Tumble") >= 4)) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (invisible eye style)":
						if($.trim(skillName.toLowerCase()) == "listen" && hasFeat("Combat Reflexes")) {
							if(classlevels >= 2 && !hasFeat("Lightning Reflexes")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Blind-Fight") && getSkillRanks("Listen") >= 9 && hasFeat("Agile"))) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (overwhelming attack style)":
						if($.trim(skillName.toLowerCase()) == "intimidate" && hasFeat("Power Attack")) {
							if(classlevels >= 2 && !hasFeat("Improved Bull Rush")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Improved Overrun") && getSkillRanks("Intimidate") >= 4 && getSkillRanks("Perform: Dance") >= 4)) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (passive way style)":
						if($.trim(skillName.toLowerCase()) == "bluff" && hasFeat("Combat Expertise")) {
							if(classlevels >= 2 && !hasFeat("Improved Trip")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Improved Feint") && getSkillRanks("Bluff") >= 4 && getSkillRanks("Sense Motive") >= 4 && hasFeat("Skill Focus: Bluff"))) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (sleeping tiger style)":
						if($.trim(skillName.toLowerCase()) == "hide" && hasFeat("Weapon Finesse")) {
							if(classlevels >= 2 && !hasFeat("Improved Initiative")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Improved Sunder") && getSkillRanks("Hide") >= 9 && hasFeat("Power Attack"))) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "monk (undying way style)":
						if($.trim(skillName.toLowerCase()) == "concentration" && hasFeat("Toughness")) {
							if(classlevels >= 2 && !hasFeat("Endurance")) {
								return;
							}
							if(classlevels >= 6 && !(hasFeat("Diehard") && getSkillRanks("Concentration") >= 9)) {
								return;
							}
							totalSpecial += 2;
						}
						break;
					case "hauwk rider":
						if($.trim(skillName.toLowerCase()) == "spot") {
							totalSpecial += 4;
							if(classlevels >= 6) {
								totalSpecial += 4;
							}
						}
						break;
						
				}
			}
		});

		
		// armour check penalty
		if(isACPSkill(skillName)) {
		
			// Swim: double ACP
			if($.trim(skillName.toLowerCase()) == "swim") {
				totalBonus += (2*actualACP);
				$(this).find(".skilldata.acp").html((2*actualACP));			
			} else {
				totalBonus += actualACP;
				$(this).find(".skilldata.acp").html(actualACP);			
			}
		} else {
			$(this).find(".skilldata.acp").html(0);			
		}
		
		var equipmentBonus = 0;

		// equipment bonusses
		$("#equiped .equipmentItem").each(function(e) {
			var details = getItemDefaults($(this).find('.itemname').val());
			if(details && details['skillboost']) {
				for(var key in details['skillboost']) {
					if(details['skillboost'][key]['skillname'] == $.trim(skillName.toLowerCase())) {
						// familiar bonus if any
						totalSpecial += details['skillboost'][key]['specialbonus'];
						// regular bonus if any
						if(details['skillboost'][key]['regularbonus'] > equipmentBonus) {
							equipmentBonus = details['skillboost'][key]['regularbonus'];
						}
					}
				}
			}
		});

		// domain bonusses
		var domain1 = $.trim($(".domainchoice:first").val().toLowerCase());
		var domain2 = $.trim($(".domainchoice:last").val().toLowerCase());
		var domain3 = $.trim($("#cloisteredclericdomain").val().toLowerCase());
		
		switch($.trim(skillName.toLowerCase())) {
			case "diplomacy":
				if(domain1 == "community" || domain2 == "community" || domain3 == "community") {
					// ensure no overlap with competence bonus
					if(!hasItemEquiped("circlet of persuasion")) {
						totalSpecial += 2;
					}
				}
				// fall through
			case "bluff":
			case "sense motive":
				if(domain1 == "mind" || domain2 == "mind" || domain3 == "mind") {
					totalSpecial += 2;
				}
				break;
			case "craft: alchemy":
			case "craft: armoursmithing":
			case "craft: blacksmithing":
			case "craft: leatherworking":
			case "craft: masonry":
			case "craft: poison":
			case "craft: shipbuilding":
			case "craft: tailoring":
			case "craft: weaponsmithing":
			case "craft: woodworking":
				if(domain1 == "artifice" || domain2 == "artifice" || domain3 == "artifice") {
					totalSpecial += 4;
				}
		}
		
		$(this).find(".skilldata.equipment").html(equipmentBonus);
		totalBonus += equipmentBonus;

		$(this).find(".skilldata.special").html(totalSpecial);
		totalBonus += totalSpecial;

		if(totalBonus >= 0) {
			totalBonus = "+" + totalBonus;
		}
		$(this).find(".skilltotalbonus").html(totalBonus);
	});	
}

/**
 * Determine the save bonusses.
 */
function recalculateSaves() {
	var fort = 0;
	var refl = 0;
	var will = 0;
	
	// calculate ability bonusses
	var dex = calculateAbilityBonus($("#abilityvaluedexterity").val());
	var con = calculateAbilityBonus($("#abilityvalueconstitution").val());
	var wis = calculateAbilityBonus($("#abilityvaluewisdom").val());

	fort += con;
	refl += dex

	if(hasFeat("Steadfast Determination") && (con > wis)) {
		will += con;
		$("#willdetails .detailsinput:first").html("Constitution");
		$("#willdetails .detailsvalue:first").removeClass("wisdombonusfield").addClass("constitutionbonusfield");
	} else {
		will += wis;
		$("#willdetails .detailsinput:first").html("Wisdom");
		$("#willdetails .detailsvalue:first").addClass("wisdombonusfield").removeClass("constitutionbonusfield");
	}

	will -= getInsanityScore();
	
	// add class bonusses
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(classname && !isNaN(classlevels)) {
			var fortFromClass = getClassFortitudeSave(classname, classlevels);
			$("#fortitudedetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>" + toTitleCase(classname) + " " + classlevels + "</td><td class='detailsvalue'>+" + fortFromClass + "</td></tr>");
			fort += fortFromClass;
			
			var reflexFromClass = getClassReflexSave(classname, classlevels);
			$("#reflexdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>" + toTitleCase(classname) + " " + classlevels + "</td><td class='detailsvalue'>+" + reflexFromClass + "</td></tr>");
			refl += reflexFromClass;
			
			var willFromClass = getClassWillSave(classname, classlevels);
			$("#willdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>" + toTitleCase(classname) + " " + classlevels + "</td><td class='detailsvalue'>+" + willFromClass + "</td></tr>");
			will += willFromClass;
			
			// Duelist Grace ability
			if(classname == "duelist" && classlevels >= 4) {
				// check type of armour worn
				var armourType = "none";
				var armourBonus = 0;
				var shield = false;
				
				// encumbrance for sanity checking
				$("#equiped .equipmentItem").each(function(e) {
					var type = $(this).find(".itemtype").val();
					if(type == "Armour") {
						var name = $(this).find(".itemname").val();
						var itemObject = getItemDefaults(name);
						if(itemObject && itemObject["acbonus"] > armourBonus) {
							armourBonus = 
							armourType = itemObject["group"];
						}
					}
					if(type == "Shield") {
						shield = true;
					}
				});
				if(armourType == "none" && !shield) {
					$("#reflexdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Duelist Grace ability</td><td class='detailsvalue'>+2</td></tr>");
				}
			}
		}
	});
	
	// halfling bonus
	if($.trim($("#raceselect").val().toLowerCase()) == "halfling") {

		// Halfling Paragons gets better bonusses
		var didParagon = false;
		$("#classes tr:not(:first-child)").each(function(e) {
			var classname = getClassName(this);
			var classlevels = parseInt($(this).find(".classlevelfield").val());
			if(!isNaN(classlevels)) {
				switch(classname) {
					case "halfling paragon" :
						$("#fortitudedetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Halfling racial save bonus</td><td class='detailsvalue'>+2</td></tr>");
						fort+=2;
			
						$("#reflexdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Halfling racial save bonus</td><td class='detailsvalue'>+2</td></tr>");
						refl+=2;
			
						$("#willdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Halfling racial save bonus</td><td class='detailsvalue'>+2</td></tr>");
						will+=2;
						didParagon = true;
						break;
				}
			}
		});
		if(!didParagon) {
			$("#fortitudedetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Halfling racial save bonus</td><td class='detailsvalue'>+1</td></tr>");
			fort++;
				
			$("#reflexdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Halfling racial save bonus</td><td class='detailsvalue'>+1</td></tr>");
			refl++;
				
			$("#willdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Halfling racial save bonus</td><td class='detailsvalue'>+1</td></tr>");
			will++;
		}


	}
	
	// divine grace
	if(hasAbility("Divine Grace") || hasAbility("Dark Blessing")) {
		charismabonus = calculateAbilityBonus($("#abilityvaluecharisma").val());
		
		if(charismabonus < 0) {
			charismabonus = 0;
		}

		$("#fortitudedetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Charisma</td><td class='detailsvalue'>+" + charismabonus + "</td></tr>");
		fort += charismabonus;
			
		$("#reflexdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Charisma</td><td class='detailsvalue'>+" + charismabonus + "</td></tr>");
		refl += charismabonus;
			
		$("#willdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Charisma</td><td class='detailsvalue'>+" + charismabonus + "</td></tr>");
		will += charismabonus;
	}
	
	// great fortitude, iron will, lightning reflexes
	if(hasFeat("Great Fortitude")) {
		fort += 2;
		$("#fortitudedetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Great Fortitude feat</td><td class='detailsvalue'>+2</td></tr>");
	}
	if(hasFeat("Iron Will")) {
		will += 2;
		$("#willdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Iron Will feat</td><td class='detailsvalue'>+2</td></tr>");
	}
	if(hasFeat("Lightning Reflexes")) {
		refl += 2;
		$("#reflexdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Lightning Reflexes feat</td><td class='detailsvalue'>+2</td></tr>");
	}
	
	// familiars and psicrystals
	if(hasItemNear("Rat Familiar")) {
		fort += 2;
		$("#fortitudedetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Rat Familiar</td><td class='detailsvalue'>+2</td></tr>");
	}
	if(hasItemNear("Weasel Familiar")) {
		refl += 2;
		$("#reflexdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Weasel Familiar</td><td class='detailsvalue'>+2</td></tr>");
	}
	if(hasItemNear("Hero Psicrystal")) {
		fort += 2;
		$("#fortitudedetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Hero Psicrystal</td><td class='detailsvalue'>+2</td></tr>");
	}
	if(hasItemNear("Resolved Psicrystal")) {
		will += 2;
		$("#willdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Resolved Psicrystal</td><td class='detailsvalue'>+2</td></tr>");
	}	

	$("#equiped .equipmentItem").each(function(e) {
		var name = $(this).find(".itemname").val();
		var itemObject = getItemDefaults(name);
		if(itemObject) {
			if(itemObject.fortsave) {
				fort += itemObject.fortsave;
				$("#fortitudedetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>" + toTitleCase(name) + "</td><td class='detailsvalue'>+" + itemObject.fortsave + "</td></tr>");
			}
			if(itemObject.reflsave) {
				refl += itemObject.reflsave;
				$("#reflexdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>" + toTitleCase(name) + "</td><td class='detailsvalue'>+" + itemObject.reflsave + "</td></tr>");
			}
			if(itemObject.willsave) {
				will += itemObject.willsave;
				$("#willdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>" + toTitleCase(name) + "</td><td class='detailsvalue'>+" + itemObject.willsave + "</td></tr>");
			}
		}
	});

	
	// add plus if appropriate
	if(fort >= 0) {
		fort = "+" + fort;
	}
	if(refl >= 0) {
		refl = "+" + refl;
	}
	if(will >= 0) {
		will = "+" + will;
	}
	
	// set totals
	$("#totalFortValue").html(fort);
	$("#totalReflValue").html(refl);
	$("#totalWillValue").html(will);
}

/**
 * Recalculate the AC
 */
function recalculateAC() {
	var AC = 10;
	var TouchAC = 10; // no Armour, natural armour or shield bonus
	var FlatfootedAC = 10; // no dex bonus unless uncanny dodge is a class ability

	// get best armour and shield
	
	var armourBonus = 0;
	var armourType = "none";
	var shieldBonus = 0;
	var shieldType = "none";
	var maxdexArmour = 1000000;
	var maxdexShield = 1000000;
	var maxDexEncumbrance = 1000000;

	var deflectionBonus = 0;
	var deflectionSource = "";
	var insightBonus = 0;
	var insightSource = "";
	var naturalBonus = 0;
	var naturalSource = "";
	var luckBonus = 0;
	var luckSource = "";
	
	$("#equiped .equipmentItem").each(function(e) {
		var name = $(this).find(".itemname").val();
		var itemObject = getItemDefaults(name);
		var type = $(this).find(".itemtype").val();
		if(type == "Armour") {
			if(itemObject && itemObject["acbonus"] > armourBonus) {
				armourBonus = itemObject["acbonus"];
				maxdexArmour = itemObject["maxdex"];
				armourType = name;
			}
		}
		if(type == "Shield") {
			if(itemObject && itemObject["acbonus"] > shieldBonus) {
				shieldBonus = itemObject["acbonus"];
				maxdexShield = itemObject["maxdex"];
				shieldType = name;
			}
		}
		if(itemObject) {
			if(itemObject.deflectionac) {
				if(itemObject.deflectionac > deflectionBonus) {
					deflectionBonus = itemObject.deflectionac;
					deflectionSource = name;
				}
			}
			if(itemObject.insightac) {
				if(itemObject.insightac > insightBonus) {
					insightBonus = itemObject.insightac;
					insightSource = name;
				}
			}
			if(itemObject.luckac) {
				if(itemObject.luckac > luckBonus) {
					luckBonus = itemObject.luckac;
					luckSource = name;
				}
			}
			if(itemObject.naturalac) {
				if(itemObject.naturalac > naturalBonus) {
					naturalBonus = itemObject.naturalac;
					naturalSource = name;
				}
			}
		}
		
	});
	
	$("#armourtype").html(armourType);
	$("#armourbonustoac").html("+" + armourBonus);
	AC += armourBonus;
	FlatfootedAC += armourBonus;

	// now erase for bracers of armour
	if(armourType.toLowerCase().indexOf("bracers of armour") >= 0) {
		armourType = "none";
	}
	
	// DR special ability from Armor Specialization Feat
	if(hasFeat("Armor Specialization: Banded Mail") && armourType.toLowerCase().indexOf("banded mail") >= 0) {
		addAbility("Damage Reduction 2/-");
	} else if(hasFeat("Armor Specialization: Breastplate") && armourType.toLowerCase().indexOf("breastplate") >= 0) {
		addAbility("Damage Reduction 2/-");
	} else if(hasFeat("Armor Specialization: Chainmail") && armourType.toLowerCase().indexOf("chainmail") >= 0) {
		addAbility("Damage Reduction 2/-");
	} else if(hasFeat("Armor Specialization: Full Plate") && armourType.toLowerCase().indexOf("full plate") >= 0) {
		addAbility("Damage Reduction 2/-");
	} else if(hasFeat("Armor Specialization: Halfplate") && armourType.toLowerCase().indexOf("halfplate") >= 0) {
		addAbility("Damage Reduction 2/-");
	} else if(hasFeat("Armor Specialization: Hide") && (armourType.toLowerCase() == "hide" || armourType.toLowerCase().indexOf(" hide") >= 0)) {
		addAbility("Damage Reduction 2/-");
	} else if(hasFeat("Armor Specialization: Scale Mail") && armourType.toLowerCase().indexOf("scale mail") >= 0) {
		addAbility("Damage Reduction 2/-");
	} else if(hasFeat("Armor Specialization: Splint Mail") && armourType.toLowerCase().indexOf("splint mail") >= 0) {
		addAbility("Damage Reduction 2/-");
	}

	// Shield Specialization feat
	if(hasFeat("Shield Specialization: Buckler") && shieldType.toLowerCase().indexOf("buckler") >= 0) {
		shieldBonus += 1;
	} else if(hasFeat("Shield Specialization: Light") && shieldType.toLowerCase().indexOf("light") >= 0) {
		shieldBonus += 1;		
	} else if(hasFeat("Shield Specialization: Heavy") && shieldType.toLowerCase().indexOf("heavy") >= 0) {
		shieldBonus += 1;		
	}
	
	$("#shieldtype").html(shieldType);
	$("#shieldbonustoac").html("+" + shieldBonus);
	AC += shieldBonus;
	FlatfootedAC += shieldBonus;

	if(hasFeat("Shield Ward")) {
		TouchAC += shieldBonus;
	}

	// now take encumbrance over the speed
	switch($("#encumbrancelevel").html()) {
		case "Light Load":
			break;
		case "Medium Load":
			maxDexEncumbrance = 3
			break;
		case "Heavy Load":
			maxDexEncumbrance = 1;
			break;
		case "Overloaded":
			maxDexEncumbrance = 0;
			break;
	}

	var dexbonus = Math.min(maxdexArmour, maxdexShield, maxDexEncumbrance, calculateAbilityBonus($("#abilityvaluedexterity").val()));
	
	// dexterity bonus (set in popup automagically)
	AC += dexbonus;
	TouchAC += dexbonus;
	// applies if character has Uncanny Dodge
	if(hasAbility("Uncanny Dodge") || hasAbility("Improved Uncanny Dodge")) {
		FlatfootedAC += dexbonus;
	}
	
	if(dexbonus >= 0) {
		dexbonus = "+" + dexbonus;
	}

	$("#dextoac").html(dexbonus);
		
	// size bonus if appropriate
	if(isSmallRace($("#raceselect").val())) {
		var html = "<tr class='calculated'><td class='detailsinput'>Size</td><td class='detailsvalue'>+1</td></tr>";
		$("#acdetails .detailstable").append(html);
		AC++;
		TouchAC++;
		FlatfootedAC++;		
	}
	
	var monklevels = 0;
	var toughMonk = false;

	// add class bonusses
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		
		// monk AC bonus 
		if( (classname == "monk" 
		|| classname == "monk (cobra strike style)" 
		|| classname == "monk (denying stance style)" 
		|| classname == "monk (hand and foot style)" 
		|| classname == "monk (invisible eye style)" 
		|| classname == "monk (overwhelming attack style)" 
		|| classname == "monk (passive way style)" 
		|| classname == "monk (sleeping tiger style)" 
		|| classname == "monk (undying way style)" 
		|| classname == "monk (tough)" 
		|| classname == "druid (hunter)" 
		|| classname == "psionic fist") && !isNaN(classlevels) && shieldType == "none" && armourType == "none" && $("#encumbrancelevel").html() == "Light Load") {
			monklevels += classlevels;
		}
		
		if(classname == "monk (tough)") {
			toughMonk = true;
		}
		
		// Dragon Disciple
		if(classname == "dragon disciple" && !isNaN(classlevels)) {
			var bonus = Math.ceil(classlevels / 3);
			var html = "<tr class='calculated'><td class='detailsinput'>Natural Armour from Dragon Disciple</td><td class='detailsvalue'>+" + bonus + "</td></tr>";
			$("#acdetails .detailstable").append(html);
			AC += bonus;
			FlatfootedAC += bonus;
		}
		// Dragon Shaman
		if(classname == "dragon shaman (black)"
		|| classname == "dragon shaman (blue)"
		|| classname == "dragon shaman (brass)"
		|| classname == "dragon shaman (bronze)"
		|| classname == "dragon shaman (copper)"
		|| classname == "dragon shaman (gold)"
		|| classname == "dragon shaman (green)"
		|| classname == "dragon shaman (red)"
		|| classname == "dragon shaman (silver)"
		|| classname == "dragon shaman (white)" && !isNaN(classlevels)) {
			var bonus = 0;
			if(classlevels >= 7) {
				bonus++;
			}
			if(classlevels >= 12) {
				bonus++;
			}
			if(classlevels >= 17) {
				bonus++;
			}
			if(bonus > 0) {
				var html = "<tr class='calculated'><td class='detailsinput'>Natural Armour from Dragon Shaman</td><td class='detailsvalue'>+" + bonus + "</td></tr>";
				$("#acdetails .detailstable").append(html);
				AC += bonus;
				FlatfootedAC += bonus;
			}
		}
		
		// Duelist Int bonus to AC
		if(classname == "duelist" && !isNaN(classlevels) && shieldType == "none" && armourType == "none") {
			var bonus = calculateAbilityBonus($("#abilityvalueintelligence").val());;
			if(bonus < 0) {
				bonus = 0;
			}
			if(bonus > classlevels) {
				bonus = classlevels;
			}
			AC += bonus;
			TouchAC += bonus;
			if(hasAbility("Uncanny Dodge") || hasAbility("Improved Uncanny Dodge")) {
				FlatfootedAC += bonus;
			}
		}
		
	});
	
	if(monklevels > 0) {
		var bonus = addMonkBonusToAC(monklevels, toughMonk);
		AC += bonus;
		TouchAC += bonus;
		FlatfootedAC += bonus;
	}

	
	// wilder AC bonus must be done last :(
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		// Wilder: Elude Touch
		if(classname == "wilder" && !isNaN(classlevels) && classlevels >= 2) {
			TouchAC += calculateAbilityBonus($("#abilityvaluecharisma").val());
			if(TouchAC > AC) {
				TouchAC = AC;
			}
		}
	});

	if(deflectionBonus > 0) {
		var html = "<tr class='calculated'><td class='detailsinput'>Deflection Bonus from " + deflectionSource + "</td><td class='detailsvalue'>+" + deflectionBonus + "</td></tr>";
		$("#acdetails .detailstable").append(html);
		AC+=deflectionBonus;
		TouchAC+=deflectionBonus;
		FlatfootedAC+=deflectionBonus;		
	}

	if(insightBonus > 0) {
		var html = "<tr class='calculated'><td class='detailsinput'>Insight Bonus from " + insightSource + "</td><td class='detailsvalue'>+" + insightBonus + "</td></tr>";
		$("#acdetails .detailstable").append(html);
		AC+=insightBonus;
		TouchAC+=insightBonus;
		FlatfootedAC+=insightBonus;		
	}

	if(luckBonus > 0) {
		var html = "<tr class='calculated'><td class='detailsinput'>Luck Bonus from " + luckSource + "</td><td class='detailsvalue'>+" + luckBonus + "</td></tr>";
		$("#acdetails .detailstable").append(html);
		AC+=luckBonus;
		TouchAC+=luckBonus;
		FlatfootedAC+=luckBonus;		
	}

	if(naturalBonus > 0) {
		var html = "<tr class='calculated'><td class='detailsinput'>Enhancement to Natural AC from " + naturalSource + "</td><td class='detailsvalue'>+" + naturalBonus + "</td></tr>";
		$("#acdetails .detailstable").append(html);
		AC+=naturalBonus;
		FlatfootedAC+=naturalBonus;		
	}

	
	// set totals
	var html = "<tr class='calculated'><td colspan=2><div class='hr'></div></td></tr>";
	html += "<tr class='calculated'><td class='detailsinput'>Touch Armour Class</td><td id='touchAC' class='detailsvalue'>" + TouchAC + "</td></tr>";
	html += "<tr class='calculated'><td class='detailsinput'>Flat-Footed Armour Class</td><td id='ffAC' class='detailsvalue'>" + FlatfootedAC + "</td></tr>";
	$("#acdetails .detailstable").append(html);
	
	$("#totalACvalue").html(AC);
	
}

/**
 * Helper function forrecalculateAC counting monk bonus
 */
function addMonkBonusToAC(levels, toughMonk) {
	
	// add wisdom
	var wisdomBonus = calculateAbilityBonus($("#abilityvaluewisdom").val());
	wisdomBonus -= getInsanityScore();

	if(wisdomBonus < 0) {
		wisdomBonus = 0;
	}
	var html = "<tr class='calculated'><td class='detailsinput'>Wisdom</td><td class='detailsvalue'>+" + wisdomBonus + "</td></tr>";
	$("#acdetails .detailstable").append(html);
	
	if(!toughMonk) {

		// add monk level bonus
		var monkLevelBonus = Math.floor(levels / 5);
		var html = "<tr class='calculated'><td class='detailsinput'>Additional Monk Level Bonus</td><td class='detailsvalue'>+" + monkLevelBonus + "</td></tr>";
		$("#acdetails .detailstable").append(html);
	
		// return bonus
		return wisdomBonus + monkLevelBonus;
	} else {
		return wisdomBonus
	}
	
}

/**
 * Calculate how many skill points were spent and how many are allowed to be spent
 */
function recalculateSpentSkillPoints() {
	var first = true;
	var totalSP = 0;
	var usedSP = 0;
	
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = $(this).find(".classlevelfield").val();
		if(classname && classlevels) {
			
			for(var i = 0; i < classlevels; i++) {
				// sp from class
				var sp = getClassSP(classname);
				// add sp from intelligence
				sp += calculateAbilityBonus($("#abilityvalueintelligence").val());

				if(sp < 1) {
					sp = 1;
				}

				// add sp from human if applicable
				if($("#raceselect").val() == "Human") {
					sp++;
				}
				
				if(first) {
					sp = sp*4;
					first = false;
				}
				totalSP += sp;
			}
		}
	});

	// open minded feat
	totalSP += countFeat("open minded") * 5;
	
	$(".skilldata.ranks").each(function(e) {
		var temp = parseInt($(this).val());
		if(isNaN(temp)) {
			temp = 0;
		}
		usedSP += temp;
	});
	
	$(".skilldata.ccranks").each(function(e) {
		var temp = parseFloat($(this).val());
		if(isNaN(temp)) {
			temp = 0;
		}
		usedSP += temp * 2;
	});
	
	$("#skillrankdata").html("(" + usedSP + " out of " + totalSP + ")");
}

/**
 * Set the total HP as well as the data regarding how those values are calculated
 */
function recalculateHitPointData() {
	
	var first = true;
	var totalHP = 0;
	
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = $(this).find(".classlevelfield").val();
		if(classname && classlevels) {
			
			// ugly 1 based counting
			for(var i = 1; i <= classlevels; i++) {
				var hp = getClassHP(classname);
				if(!first) {
					hp = (hp / 2) + 1;
				} else {
					first = false;
				}
				totalHP += hp;
				totalHP += calculateAbilityBonus($("#abilityvalueconstitution").val());
				
				var html = "<tr class='calculated'><td>" + toTitleCase(classname) + " " + i + "</td><td class='hpnumber'>" + hp + "</td><td class='hpnumber'>+</td><td class='hpnumber constitutionrawbonusfield'>+0</td></tr>";
				$("#hpdetails .detailstable").append(html);
			}
		}
	});
	
	// special case: Toughness feat
	for(var i = 0; i < countFeat("Toughness"); i++) {
		var html = "<tr class='calculated'><td>Toughness Feat</td><td class='hpnumber'>3</td><td class='hpnumber'></td><td></td></tr>";
		$("#hpdetails .detailstable").append(html);
		totalHP += 3;
	}
	
	// special case: Toad familiar
	if(hasItemNear("Toad Familiar")) {
		var html = "<tr class='calculated'><td>Toad Familiar</td><td class='hpnumber'>3</td><td class='hpnumber'></td><td></td></tr>";
		$("#hpdetails .detailstable").append(html);
		totalHP += 3;
	}

	// special case: Psionic Body
	if(hasFeat("Psionic Body")) {
		var psionicFeatCount = numberOfPsionicFeats();
		var html = "<tr class='calculated'><td>Psionic Body</td><td class='hpnumber'>" + (2*psionicFeatCount) + "</td><td class='hpnumber'></td><td></td></tr>";
		$("#hpdetails .detailstable").append(html);
		totalHP += (2*psionicFeatCount);
	}
	
	$("#totalHPvalue").html(totalHP);
	
}

/**
 * Set the initiative bonus
 */
function recalculateInitiative() {
	
	// calculate base dex (already added automatically)
	var initBonus = calculateAbilityBonus($("#abilityvaluedexterity").val());
	
	// special case: Improved Initiative
	if(hasFeat("Improved Initiative")) {
		initBonus += 4;
		$("#initdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Improved Initiative feat</td><td class='detailsvalue'>+4</td></tr>");
	}
	
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(classname == "duelist" && !isNaN(classlevels)) {
			if(classlevels >= 8) {
				initBonus += 4;
				$("#initdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Duelist Improved Reaction +4</td><td class='detailsvalue'>+4</td></tr>");
			} else if(classlevels >= 2) {
				initBonus += 2;
				$("#initdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Duelist Improved Reaction +2</td><td class='detailsvalue'>+2</td></tr>");
			}
		}
	});
	
	if(hasItemNear("Nimble Psicrystal")) {
		initBonus += 2;
		$("#initdetails .detailstable").append("<tr class='calculated'><td class='detailsinput'>Nimble Psicrystal</td><td class='detailsvalue'>+2</td></tr>");
	}
	
	if(initBonus >= 0) {
		initBonus = "+" + initBonus;
	}
	
	$("#totalInitValue").html(initBonus);
	
}

/**
 * Calculate and set the ability bonusses based on 
 */
function recalculateAbilityBonusses() {
	
	// run through all ability scores
	for(var key in abilities) {
		// get the name from the list
		var abilityname = abilities[key];
		// get the value in the input field
		var ability = $("#abilityvalue" + abilityname).val();
		// calculate the actual bonus
		var bonus = calculateAbilityBonus(ability);
		
		if(abilityname == "wisdom") {
			bonus = bonus - getInsanityScore();
		}

		// set that value in any raw bonus fields
		$("." + abilityname + "rawbonusfield").html(bonus);

		// add a + if its positive
		if(bonus >= 0) {
			bonus = "+" + bonus;
		}
		// set that value in any not raw bonus fields
		$("." + abilityname + "bonusfield").html(bonus);
		
		// set the actual value in the data field for the ability
		$("#" + abilityname + "bonus").html("(" + bonus + ")");
	}	
}

/**
 * Calculate encumbrance based on strength
 */
function recalculateEncumbrance() {
	
	// step 1: get the strength score
	var strength = parseInt($("#abilityvaluestrength").val());

	// step 2: get maximum load for strength score
	var maxLoad = getMaxLoad(strength);
	
	// step 3: check if we're small
	if(isSmallRace($("#raceselect").val())) {
		maxLoad = maxLoad * 0.75;
	}
	
	// step 4: set loads:
	var lightMax = Math.floor(maxLoad * (1/3));
	var mediumMin = lightMax + 1;
	var mediumMax = Math.floor(maxLoad * (2/3));
	var heavyMin = mediumMax + 1;
	var liftOffGround = 2 * maxLoad;
	var pushDrag = 5 * maxLoad;

	// step 5: set HTML
	$("#lightLoad").html(lightMax + " lb. or less");
	$("#mediumLoad").html(mediumMin + " - " + mediumMax + " lb.");
	$("#heavyLoad").html(heavyMin + " - " + maxLoad + " lb.");
	$("#liftOffGround").html(liftOffGround + " lb. or less");
	$("#pushDrag").html(pushDrag + " lb. or less");
	
	
	// step 6: add weight of all items carried and equiped
	var totalCarried = 0.0;
	$("#carried .equipmentItem, #equiped .equipmentItem").each(function(e) {
		var itemweight = parseFloat($(this).find(".itemweight").val());
		var itemnumber = parseInt($(this).find(".itemnumber").val());
		
		if(!isNaN(itemweight) && !isNaN(itemnumber)) {
			totalCarried += itemweight * itemnumber;
		}
	});
	$("#currentload").html(fpFix(totalCarried) + " lb.");
	
	// step 7: calculate actual load
	if(totalCarried < mediumMin) {
		// light load
		$("#encumbrancelevel").html("Light Load");
	} else if(totalCarried < heavyMin) {
		// medium load
		$("#encumbrancelevel").html("Medium Load");
	} else if(totalCarried <= maxLoad) {
		// heavy load
		$("#encumbrancelevel").html("Heavy Load");
	} else {
		// overencumbered
		$("#encumbrancelevel").html("Overloaded");
	}
	
}

function recalculateSpells() {

	var totalPowerPoints = 0;

	// run through the base classes
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevels = parseInt($(this).find(".classlevelfield").val());
		if(classname && !isNaN(classlevels)) {
			makeSpellsPerDayLine(classname, classlevels);
			totalPowerPoints += makePowerPointsPerDayLine(classname, classlevels);
		}
	});
	
 	// do feats 
	// Psionic Talent
	for(var i = 0; i < countFeat("Psionic Talent"); i++) {
		var html = "<tr class='calculated'><td>Psionic Talent</td><td class='hpnumber'>" + (2 + i) + "</td><td class='hpnumber'></td><td class='hpnumber'></td></tr>";
		$("#powerpointdetails .detailstable").append(html);
		totalPowerPoints += (2 + i);
	}
	// Wild Talent
	if(hasFeat("Wild Talent")) {
		var html = "<tr class='calculated'><td>Wild Talent</td><td class='hpnumber'>2</td><td class='hpnumber'></td><td class='hpnumber'></td></tr>";
		$("#powerpointdetails .detailstable").append(html);
		totalPowerPoints += 2;
	}

	$("#totalPowerPoints").html(totalPowerPoints);
}

function makePowerPointsPerDayLine(classname, classlevels) {

	var totalPowerPoints = 0;

	var bonusLevel = bonusCasterArray[toTitleCase(classname)];
	if(!bonusLevel) {
		bonusLevel = 0;
	}

	var base = getBasePowerPointsPerDay(classname, (parseInt(classlevels) + parseInt(bonusLevel)));
	if(base != -1) {
		var castingAbility = getCasterAbility(classname);
		var abilityScore = $("#abilityvalue" + castingAbility).val();
		var bonus = getBonusPowerPoints(classlevels, abilityScore);
		var html = "<tr class='calculated'><td>" + toTitleCase(classname) + " " + (parseInt(classlevels) + parseInt(bonusLevel)) + "</td><td class='hpnumber'>" + base + "</td><td class='hpnumber'>+</td><td class='hpnumber'>" + bonus + "</td></tr>";
		$("#powerpointdetails .detailstable").append(html);
		totalPowerPoints += base;
		totalPowerPoints += bonus;

		var html2 = "<tr class='calculated'><td>" + toTitleCase(classname) + "</td><td class='bonusspellstd'><span class='bonusspellspacer'></span><input value='" + bonusLevel + "' class='bonusspelllevels'></input></td>"
		$("#psionicbonuslevels").append(html2);
	}		
	$(".bonusspelllevels").spinner({ min: 0, step: 1, stop: function( event, ui ) { doBonusSpellLevels(this); recalculate(); } });

	return totalPowerPoints;
}

function makeSpellsPerDayLine(classname, classlevels) {

	var bonusLevel = bonusCasterArray[toTitleCase(classname)];
	if(!bonusLevel) {
		bonusLevel = 0;
	}


	var spellsPerDay = getBaseSpellsPerDay(classname, (parseInt(classlevels) + parseInt(bonusLevel)));

	if(spellsPerDay) {
		var html = "";
		var castingAbility = getCasterAbility(classname);
		var abilityScore = $("#abilityvalue" + castingAbility).val();
		var bonusSpells = getBonusSpells(abilityScore, castingAbility, classname);

		if(classname == "bard (divine)") {
			abilityScore = $("#abilityvaluewisdom").val();
		}

		// cleric, cloistered cleric and champion cleric

		if(classname == "cleric" || classname == "cleric (cloistered)" || classname == "cleric (champion)") {
			switch(spellsPerDay.length) {
				case 10:
					if(abilityScore >= 19) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[9] + bonusSpells[9]) + "+D</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 9:
					if(abilityScore >= 18) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[8] + bonusSpells[8]) + "+D</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 8:
					if(abilityScore >= 17) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[7] + bonusSpells[7]) + "+D</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 7:
					if(abilityScore >= 16) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[6] + bonusSpells[6]) + "+D</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 6:
					if(abilityScore >= 15) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[5] + bonusSpells[5]) + "+D</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 5:
					if(abilityScore >= 14) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[4] + bonusSpells[4]) + "+D</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 4:
					if(abilityScore >= 13) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[3] + bonusSpells[3]) + "+D</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 3:
					if(abilityScore >= 12) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[2] + bonusSpells[2]) + "+D</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 2:
					if(abilityScore >= 11) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[1] + bonusSpells[1]) + "+D</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 1:
					if(spellsPerDay[0] && abilityScore >= 10) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[0] + bonusSpells[0]) + "</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
			
			}
		} else if(classname == "wizard (abjurer)" 
			|| classname == "wizard (conjurer)"
			|| classname == "wizard (diviner)"
			|| classname == "wizard (enchanter)"
			|| classname == "wizard (evoker)"
			|| classname == "wizard (illusionist)"
			|| classname == "wizard (necromancer)"
			|| classname == "wizard (transmuter)"
			|| classname == "wizard (domain)") {
			switch(spellsPerDay.length) {
				case 10:
					if(abilityScore >= 19) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[9] + bonusSpells[9]) + "+1</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 9:
					if(abilityScore >= 18) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[8] + bonusSpells[8]) + "+1</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 8:
					if(abilityScore >= 17) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[7] + bonusSpells[7]) + "+1</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 7:
					if(abilityScore >= 16) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[6] + bonusSpells[6]) + "+1</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 6:
					if(abilityScore >= 15) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[5] + bonusSpells[5]) + "+1</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 5:
					if(abilityScore >= 14) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[4] + bonusSpells[4]) + "+1</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 4:
					if(abilityScore >= 13) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[3] + bonusSpells[3]) + "+1</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 3:
					if(abilityScore >= 12) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[2] + bonusSpells[2]) + "+1</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 2:
					if(abilityScore >= 11) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[1] + bonusSpells[1]) + "+1</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 1:
					if(spellsPerDay[0] && abilityScore >= 10) {
						html = "<td style='font-size:10px'>" + (spellsPerDay[0] + bonusSpells[0]) + "+1</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
			
			}
		} else {
			switch(spellsPerDay.length) {
				case 10:
					if(abilityScore >= 19) {
						html = "<td>" + (spellsPerDay[9] + bonusSpells[9]) + "</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 9:
					if(abilityScore >= 18) {
						html = "<td>" + (spellsPerDay[8] + bonusSpells[8]) + "</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 8:
					if(abilityScore >= 17) {
						html = "<td>" + (spellsPerDay[7] + bonusSpells[7]) + "</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 7:
					if(abilityScore >= 16) {
						html = "<td>" + (spellsPerDay[6] + bonusSpells[6]) + "</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 6:
					if(abilityScore >= 15) {
						html = "<td>" + (spellsPerDay[5] + bonusSpells[5]) + "</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 5:
					if(abilityScore >= 14) {
						html = "<td>" + (spellsPerDay[4] + bonusSpells[4]) + "</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 4:
					if(abilityScore >= 13) {
						html = "<td>" + (spellsPerDay[3] + bonusSpells[3]) + "</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 3:
					if(abilityScore >= 12) {
						html = "<td>" + (spellsPerDay[2] + bonusSpells[2]) + "</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 2:
					if(abilityScore >= 11) {
						html = "<td>" + (spellsPerDay[1] + bonusSpells[1]) + "</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
				case 1:
					if(spellsPerDay[0] && abilityScore >= 10) {
						html = "<td>" + (spellsPerDay[0] + bonusSpells[0]) + "</td>" + html;
					} else {
						html = "<td>-</td>" + html;
					}
			
			}
		}
		for(var i = 0; i < (10 - spellsPerDay.length); i++) {
			html += "<td>-</td>";
		}
		var UCclassname = toTitleCase(classname);
		html = "<tr class='calculated'><td>" + UCclassname + "</td><td>" + classlevels + "<td class='bonusspellstd'><span class='bonusspellspacer'></span><input value='" + bonusLevel + "' class='bonusspelllevels'></input></td>" + html + "</tr>";

		$("#spellsperdaytable").append(html);

	}
	$(".bonusspelllevels").spinner({ min: 0, step: 1, stop: function( event, ui ) { doBonusSpellLevels(this); recalculate(); } });
}

function doBonusSpellLevels(self) {

	var classname = $(self).parents("tr").find("td:first-child").html().toLowerCase();
	var level = $(self).val();
	bonusCasterArray[toTitleCase(classname)] = level;
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
