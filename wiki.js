function getWikiText() {
	
	var wiki = "====== " + getCharacterName() + " ======\n\n[ [[Characters]] ]\n\n";
	wiki += "<data !character>\n";
	wiki += "PC[ref] : [[]]\n";
	wiki += "Name                     : " + getCharacterName() + "\n";
	wiki += "Character Page [ref]     : ic:" + getCharacterName() + "\n";
	wiki += "Avatar [image]           : {{" + $.trim(getAvatarURL()) + "}}\n";
	wiki += "Titles                   : " + getCharacterTitles() + "\n";
	wiki += "Age                      : " + getCharacterAge() + "\n";
	wiki += "Age Category             : " + getCharacterAgeCategory() + "\n";
	wiki += "Gender [wiki]            : " + getCharacterGender() + "\n";
	wiki += "Race [wiki]              : " + getCharacterRace() + "\n";
	wiki += "Height                   : " + getCharacterHeight() + "\n";
	wiki += "Weight                   : " + getCharacterWeight() + "\n";
	wiki += "Nationality [wiki]       : " + getCharacterNationality() + "\n";
	wiki += "Faction [wiki]           : " + getCharacterFaction() + "\n";
	wiki += "Alignment                : " + getCharacterAlignment() + "\n";
	wiki += "Religion [wiki]          : " + getCharacterReligion() + "\n";
	wiki += "Fate                     : " + getCharacterFate() + "\n";
	wiki += "Experience               : " + getCharacterExperience() + "\n";
	wiki += "Player                   : " + getPlayerName() + "\n\n";
	
	wiki += "Strength                 : " + getCharacterAbility("strength") + "\n";
	wiki += "Dexterity                : " + getCharacterAbility("dexterity") + "\n";
	wiki += "Constitution             : " + getCharacterAbility("constitution") + "\n";
	wiki += "Intelligence             : " + getCharacterAbility("intelligence") + "\n";
	wiki += "Wisdom                   : " + getCharacterAbility("wisdom") + "\n";
	wiki += "Charisma                 : " + getCharacterAbility("charisma") + "\n\n";
	
	wiki += "Initiative               : " + getCharacterInitiative() + "\n";
	wiki += "Hit Points               : " + getCharacterHP() + "\n";
	wiki += "Armour Class             : " + getCharacterAC() + "\n";
	wiki += "Touch Armour Class       : " + getCharacterTouchAC() + "\n";
	wiki += "Flatfooted Armour Class  : " + getCharacterFlatFootedAC() + "\n";
	wiki += "Fortitude                : " + getCharacterFortitudeSave() + "\n";
	wiki += "Reflex                   : " + getCharacterReflexSave() + "\n";
	wiki += "Will                     : " + getCharacterWillSave() + "\n\n";
	wiki += "Speed                    : " + getCharacterSpeed() + "\n\n";
	wiki += "Arcane Spell Failure     : " + getCharacterASF() + "\n\n";

	wiki += "Feats*                   : " + getCharacterFeats() + "\n";
	wiki += "Languages*               : " + getCharacterLanguages() + "\n";
	wiki += "Manual Abilities*        : " + getCharacterManualClassAbilities() + "\n";
	wiki += "Calculated Abilities*    : " + getCharacterAutomaticClassAbilities() + "\n\n";

	wiki += "Abilities Notes [wiki]   : " + getAbilityNotes() + "\n";
	wiki += "Equipment Notes [wiki]   : " + getEquipmentNotes() + "\n";
	wiki += "Spells [wiki]            : " + getCharacterSpells() + "\n";
	wiki += "Notes [wiki]             : " + getCharacterNotes() + "\n";

	wiki += "Wealth          : " + getCharacterWealth() + "\n";
	wiki += "Net Worth       : " + getCharacterNetWorth() + "\n";
	wiki += "Job Title       : " + getJobTitle() + "\n";
	wiki += "Job Type        : " + getJobType() + "\n";
	wiki += "Job Skill       : " + getJobSkill() + "\n";
	wiki += "Lifestyle       : " + getLifestyle() + "\n";
	wiki += "Dependent Children       : " + getDependentChildren() + "\n";
	wiki += "Dependent Adults         : " + getDependentAdults() + "\n";
	wiki += "Other Income       : " + getOtherIncome() + "\n";
	wiki += "Total Income       : " + getTotalIncome() + "\n";
	wiki += "Done Until       : " + getDoneUntil() + "\n";
	wiki += "View Link [link] : http://www.novus-utum.org/tools/character-viewer/?character=" + getCharacterName() + "\n"
	wiki += "Edit Link [link] : http://www.novus-utum.org/tools/character-editor/?character=" + getCharacterName() + "\n\n"

	wiki += "Turn Types*     : " + getTurnTypes() + "\n";
	wiki += "Turn Check      : " + getTurnCheck() + "\n";
	wiki += "Turn Damage     : " + getTurnDamage() + "\n";
	wiki += "Turn Level      : " + getTurnLevel() + "\n";
	wiki += "Cleric Domains*  : " + getClericDomains() + "\n";
	wiki += "Cleric Energy Choice : " + getClericEnergy() + "\n";

	wiki += "\n";

	wiki += "Prohibited Schools*   : " + getProhibitedSchools() + "\n";
	wiki += "Wizard Domain         : " + getWizardDomain() + "\n";
	wiki += "\n";
	wiki += "Dragon Shaman Auras* : " + getDragonShamanAuras() + "\n";
	wiki += "\n";

	wiki += "Melee Touch Attack         : " + getMeleeTouchAttack() + "\n";
	wiki += "Ranged Touch Attack         : " + getRangedTouchAttack() + "\n";
	wiki += "\n";

	wiki += getSpells();

	wiki += "</data>\n\n"
	
	wiki += "===== Classes =====\n\n";
	
	wiki += getCharacterClasses();
	
	wiki += "===== Skills =====\n\n";
	
	wiki += getSkills();
	
	wiki += "===== Equipment =====\n\n";

	wiki += getEquipment();

	wiki += "===== Bonus Caster Levels =====\n\n";

	wiki += getBonusCasterLevels();

	wiki += "===== Attacks =====\n\n";

	wiki += getAttacks();

	return fixIllegalCharacters(wiki);
}

/**
 * Fixes illegal characters for the wiki
 */
function fixIllegalCharacters(string) {
	string = replaceAll(string, "‘", "'");
	string = replaceAll(string, "’", "'");
	string = replaceAll(string, '“', '"');
	string = replaceAll(string, '”', '"');
	return string;
}

function getMeleeTouchAttack() {
	return $("#meleetouchattack").html();
}
function getRangedTouchAttack() {
	return $("#rangedtouchattack").html();
}

function getSpells() {

	var adeptCasterLevel = 0;
	var blackguardCasterLevel = 0;
	var clericCasterLevel = 0;
	var isCloistered = false;
	var druidCasterLevel = 0;
	var paladinCasterLevel = 0;
	var isFreedom = false;
	var isTyranny = false;
	var isSlaughter = false;
	var rangerCasterLevel = 0;
	var isUrban = false;

	var assassinCasterLevel = 0;
	var bardCasterLevel = 0;
	var beguilerCasterLevel = 0;
	var duskbladeCasterLevel = 0;
	var psionCasterLevel = 0;
	var psionicFistCasterLevel = 0;
	var psychicWarriorCasterLevel = 0;
	var sorcererCasterLevel = 0;
	var warMindCasterLevel = 0;
	var wilderCasterLevel = 0;
	var wizardCasterLevel = 0;
	var wizardClass = "";


	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevel = parseInt($.trim($(this).find(".classlevelfield").val()));
		
		if(classname && !isNaN(classlevel)) {
			switch(classname) {
				case "adept":
					adeptCasterLevel += classlevel;
					break;
				case "beguiler":
					beguilerCasterLevel += classlevel;
					break;
				case "blackguard":
					blackguardCasterLevel += classlevel;
					break;
				case "cleric (cloistered)":
					isCloistered = true;
					// fall through
				case "cleric":
				case "cleric (champion)":
					clericCasterLevel += classlevel;
					break;
				case "druid":
				case "druid (avenger)":
				case "druid (hunter)":
					druidCasterLevel += classlevel;
					break;
				case "duskblade":
					duskbladeCasterLevel += classlevel;
					break;
				case "paladin (freedom)":
					isFreedom = true;
					// fall through
				case "paladin":
				case "paladin (hunter)":
					paladinCasterLevel += classlevel;
					break;
				case "paladin (tyranny)":
					isTyranny = true;
					paladinCasterLevel += classlevel;
					break;
				case "paladin (slaughter)":
					isSlaughter = true;
					paladinCasterLevel += classlevel;
					break;
				case "ranger (urban)":
					isUrban = true;
					// fall through
				case "ranger":
				case "ranger (planar)":
				case "ranger (shifter)":
					rangerCasterLevel += classlevel;
					break;
				
				case "assassin":
					assassinCasterLevel += classlevel;
					break;
				case "bard (sage)":
				case "bard":
				case "bard (divine)":
				case "bard (druidic)":
				case "bard (savage)":
					bardCasterLevel += classlevel;
					break;
				case "psion (egoist)":
				case "psion (kineticist)":
				case "psion (nomad)":
				case "psion (seer)":
				case "psion (shaper)":
				case "psion (telepath)":
					psionCasterLevel += classlevel;
					break;
				case "psionic fist":
					psionicFistCasterLevel += classlevel;
					break;
				case "psychic warrior":
					psychicWarriorCasterLevel += classlevel;
					break;
				case "sorcerer":
				case "sorcerer (animal companion)":
				case "sorcerer (battle)":
					sorcererCasterLevel += classlevel;
					break;
				case "war mind":
					warMindCasterLevel += classlevel;
					break;
				case "wilder":
					wilderCasterLevel += classlevel;
					break;
				case "wizard":
				case "wizard (abjurer)":
				case "wizard (animal companion)":
				case "wizard (conjurer)":
				case "wizard (diviner)":
				case "wizard (domain)":
				case "wizard (enchanter)":
				case "wizard (evoker)":
				case "wizard (illusionist)":
				case "wizard (necromancer)":
				case "wizard (transmuter)":
					wizardClass = classname;
					wizardCasterLevel += classlevel;
					break;
			}
		}
	});

	// now add the bonus caster levels
	$("#spellsperdaytable .calculated").each(function(e) {
		var classname = $(this).find("td:first-child").html();
		var bonuslevels = parseInt($(this).find("input").val());
		switch($.trim(classname.toLowerCase())) {
			case "adept":
				adeptCasterLevel += bonuslevels;
				break;
			case "beguiler":
				beguilerCasterLevel += bonuslevels;
				break;
			case "blackguard":
				blackguardCasterLevel += bonuslevels;
				break;
			case "cleric (cloistered)":
			case "cleric":
			case "cleric (champion)":
				clericCasterLevel += bonuslevels;
				break;
			case "druid":
			case "druid (avenger)":
			case "druid (hunter)":
				druidCasterLevel += bonuslevels;
				break;
			case "duskblade":
				duskbladeCasterLevel += bonuslevels;
				break;
			case "paladin (freedom)":
			case "paladin":
			case "paladin (hunter)":
			case "paladin (tyranny)":
			case "paladin (slaughter)":
				paladinCasterLevel += bonuslevels;
				break;
			case "ranger":
			case "ranger (planar)":
			case "ranger (shifter)":
			case "ranger (urban)":
				rangerCasterLevel += bonuslevels;
				break;
			
			case "assassin":
				assassinCasterLevel += bonuslevels;
				break;
			case "bard (sage)":
			case "bard":
			case "bard (divine)":
			case "bard (druidic)":
			case "bard (savage)":
				bardCasterLevel += bonuslevels;
				break;
			case "sorcerer":
			case "sorcerer (animal companion)":
			case "sorcerer (battle)":
				sorcererCasterLevel += bonuslevels;
				break;
			case "wizard":
			case "wizard (abjurer)":
			case "wizard (animal companion)":
			case "wizard (conjurer)":
			case "wizard (diviner)":
			case "wizard (domain)":
			case "wizard (enchanter)":
			case "wizard (evoker)":
			case "wizard (illusionist)":
			case "wizard (necromancer)":
			case "wizard (transmuter)":
				wizardCasterLevel += bonuslevels;
				break;
		}
	});

	$("#psionicbonuslevels .calculated").each(function(e) {
		var classname = $(this).find("td:first-child").html();
		var bonuslevels = parseInt($(this).find("input").val());
		switch($.trim(classname.toLowerCase())) {
			case "psion (egoist)":
			case "psion (kineticist)":
			case "psion (nomad)":
			case "psion (seer)":
			case "psion (shaper)":
			case "psion (telepath)":
				psionCasterLevel += bonuslevels;
				break;
			case "psionic fist":
				psionicFistCasterLevel += bonuslevels;
				break;
			case "psychic warrior":
				psychicWarriorCasterLevel += bonuslevels;
				break;
			case "war mind":
				warMindCasterLevel += bonuslevels;
				break;
			case "wilder":
				wilderCasterLevel += bonuslevels;
				break;
		}
	});

	var wiki = "";

	if(adeptCasterLevel > 0) {
	        for(var i = 0; i <= 5; i++) {
                	wiki += "Adept Level " + i + " Spells Known*  : " + getFreeSpells("adept", i, adeptCasterLevel) + "\n";
        	}
	        wiki += "\n";
	}
	if(blackguardCasterLevel > 0) {
	        for(var i = 1; i <= 4; i++) {
                	wiki += "Blackguard Level " + i + " Spells Known*  : " + getFreeSpells("blackguard", i, blackguardCasterLevel) + "\n";
        	}
	        wiki += "\n";
	}
	if(beguilerCasterLevel > 0) {
	        for(var i = 1; i <= 9; i++) {
                	wiki += "Beguiler Level " + i + " Spells Known*  : " + getFreeSpells("beguiler", i, beguilerCasterLevel) + "\n";
        	}
		wiki += "Beguiler Advanced Learning* : " + $("#beguilerAL3").val() + ", " + $("#beguilerAL7").val() + ", " + $("#beguilerAL11").val() + ", " + $("#beguilerAL15").val() + ", " + $("#beguilerAL19").val() + "\n";
	        wiki += "\n";

	}
	if(clericCasterLevel > 0) {
		if(isCloistered) {
		        for(var i = 0; i <= 9; i++) {
        	        	wiki += "Cleric Level " + i + " Spells Known*  : " + getFreeSpells("cleric (cloistered)", i, clericCasterLevel) + "\n";
        		}
		} else {
		        for(var i = 0; i <= 9; i++) {
        	        	wiki += "Cleric Level " + i + " Spells Known*  : " + getFreeSpells("cleric", i, clericCasterLevel) + "\n";
        		}
		}
	        wiki += "\n";
	}
	if(druidCasterLevel > 0) {
	        for(var i = 0; i <= 9; i++) {
                	wiki += "Druid Level " + i + " Spells Known*  : " + getFreeSpells("druid", i, druidCasterLevel) + "\n";
        	}
	        wiki += "\n";
	}
	if(paladinCasterLevel > 0) {
		if(isFreedom) {
		        for(var i = 1; i <= 4; i++) {
       	         		wiki += "Paladin Level " + i + " Spells Known*  : " + getFreeSpells("paladin (freedom)", i, paladinCasterLevel) + "\n";
       	 		}
		} else if (isTyranny) {
		        for(var i = 1; i <= 4; i++) {
        	        	wiki += "Paladin Level " + i + " Spells Known*  : " + getFreeSpells("paladin (tyranny)", i, paladinCasterLevel) + "\n";
        		}
		} else if (isSlaughter) {
		        for(var i = 1; i <= 4; i++) {
        	        	wiki += "Paladin Level " + i + " Spells Known*  : " + getFreeSpells("paladin (slaughter)", i, paladinCasterLevel) + "\n";
        		}
		} else {
		        for(var i = 1; i <= 4; i++) {
        	        	wiki += "Paladin Level " + i + " Spells Known*  : " + getFreeSpells("paladin", i, paladinCasterLevel) + "\n";
        		}
		}
	}
	if(rangerCasterLevel > 0) {
		if(isUrban) {
		        for(var i = 1; i <= 4; i++) {
        	        	wiki += "Ranger Level " + i + " Spells Known*  : " + getFreeSpells("ranger (urban)", i, rangerCasterLevel) + "\n";
        		}
		} else {
		        for(var i = 1; i <= 4; i++) {
        	        	wiki += "Ranger Level " + i + " Spells Known*  : " + getFreeSpells("ranger", i, rangerCasterLevel) + "\n";
        		}
		}
	}

	if(assassinCasterLevel > 0) {
	        for(var i = 1; i <= 4; i++) {
			var str = "";
			$("#assassinspellsknown").find(".level" + i + " input").each(function(e) {
				str += $(this).val() + ", ";
			});
                	wiki += "Assassin Level " + i + " Spells Known*  : " + str + "\n";
        	}
	}
	if(bardCasterLevel > 0) {
	        for(var i = 0; i <= 6; i++) {
			var str = "";
			$("#bardspellsknown").find(".level" + i + " input").each(function(e) {
				str += $(this).val() + ", ";
			});
                	wiki += "Bard Level " + i + " Spells Known*  : " + str + "\n";
        	}
	}
	if(duskbladeCasterLevel > 0) {
	        for(var i = 0; i <= 9; i++) {
			var str = "";
			$("#duskbladespellsknown").find(".level" + i + " input").each(function(e) {
				str += $(this).val() + ", ";
			});
                	wiki += "Duskblade Level " + i + " Spells Known*  : " + str + "\n";
        	}
	}
	if(psionCasterLevel > 0) {
	        for(var i = 1; i <= 9; i++) {
			var str = "";
			$("#psionspellsknown").find(".level" + i + " input").each(function(e) {
				str += $(this).val() + ", ";
			});
                	wiki += "Psion Level " + i + " Powers Known*  : " + str + "\n";
        	}
	}
	if(psionicFistCasterLevel > 0) {
	        for(var i = 1; i <= 5; i++) {
			var str = "";
			$("#psionicfistspellsknown").find(".level" + i + " input").each(function(e) {
				str += $(this).val() + ", ";
			});
                	wiki += "Psionic Fist Level " + i + " Powers Known*  : " + str + "\n";
        	}
	}
	if(psychicWarriorCasterLevel > 0) {
	        for(var i = 1; i <= 6; i++) {
			var str = "";
			$("#psychicwarriorspellsknown").find(".level" + i + " input").each(function(e) {
				str += $(this).val() + ", ";
			});
                	wiki += "Psychic Warrior Level " + i + " Powers Known*  : " + str + "\n";
        	}
	}
	if(sorcererCasterLevel > 0) {
	        for(var i = 0; i <= 9; i++) {
			var str = "";
			$("#sorcererspellsknown").find(".level" + i + " input").each(function(e) {
				str += $(this).val() + ", ";
			});
                	wiki += "Sorcerer Level " + i + " Spells Known*  : " + str + "\n";
        	}
	}
	if(warMindCasterLevel > 0) {
	        for(var i = 1; i <= 5; i++) {
			var str = "";
			$("#warmindspellsknown").find(".level" + i + " input").each(function(e) {
				str += $(this).val() + ", ";
			});
                	wiki += "War Mind Level " + i + " Powers Known*  : " + str + "\n";
        	}
	}
	if(wilderCasterLevel > 0) {
	        for(var i = 1; i <= 9; i++) {
			var str = "";
			$("#wilderspellsknown").find(".level" + i + " input").each(function(e) {
				str += $(this).val() + ", ";
			});
                	wiki += "Wilder Level " + i + " Powers Known*  : " + str + "\n";
        	}
	}
	if(wizardCasterLevel > 0) {
               	wiki += "Wizard Level 0 Spells Known*  : " + getFreeSpells(wizardClass, 0, wizardCasterLevel) + "\n";
	        for(var i = 1; i <= 9; i++) {
			var str = "";
			$("#wizardspellsknown").find(".level" + i + " input").each(function(e) {
				str += $(this).val() + ", ";
			});
                	wiki += "Wizard Level " + i + " Spells Known*  : " + str + "\n";
        	}
	}
	return wiki;
}

function getWizardDomain() {
	return $("#wizardDomainChoice").val();
}

function setWizardDomain(domain) {
	$("#wizardDomainChoice").val(domain);
}

function getProhibitedSchools() {
	var retString = "";
	$(".opposedSchoolChoice").each(function() {
		retString += $(this).val() + ",";
	});
	return retString;
}

function getTurnTypes() {
	var retString = "";

	$(".turnType").each(function() {
		var type = $(this).find("th").html();
		type = type.substr(0, type.length - 1);
		var times = $(this).find("td").html();
		retString += type + " (" + times + "),";
	});
	
	return retString;
}
function getTurnCheck() {
	var checkBonus = $("#baseTurnCheckBonus").html();
	if(checkBonus) {
		return "1d20 + " + checkBonus;
	} else {
		return "";
	}
}
function getTurnDamage() {
	var dam = $("#turnDamage").html();
	if(dam) {
		return dam;
	} else {
		return "";
	}	
}
function getTurnLevel() {
	var level = $("#turnlevel").html();	
	if(level) {
		return level;
	} else {
		return "";
	}
}

function getJobTitle() {
	return $("#jobtitle").val();	
}
function getJobType() {
	return $("#jobtypeselect").val();	
}
function getJobSkill() {
	return $("#jobskill").val();	
}
function getLifestyle() {
	return $("#lifestyleselect").val();	
}
function getDependentChildren() {
	return $("#numchildren").val();	
}
function getDependentAdults() {
	return $("#numadults").val();	
}
function getOtherIncome() {
	return $("#othergpweek").val();	
}
function getTotalIncome() {
	return $("#totalgpweek").html();	
}
function getDoneUntil() {
	return $("#lastprocesseddate").val();	
}

function getClericDomains() {
	var domain1 = $(".domainchoice:first").val();
	var domain2 = $(".domainchoice:last").val();
	var domain3 = $("#cloisteredclericdomain").val();

	// check for duplicates
	if(domain1 == domain2) {
		domain2 = "";
	} else if(domain1 == domain3) {
		domain3 = "";
	} else if(domain2 == domain3) {
		domain3 = "";
	}

	// only store knowledge domain if the other two are properly set
	if(!domain1 || domain1 == "" || !domain2 || domain2 == "") {
		domain3 = "";
	}

	return domain1 + ", " + domain2 + ", " + domain3;
}

function getClericEnergy() {
	return $("#clericturnchoice").val();
}


function getAttacks() {
	var attackID = 0;
	var attackStrings = "";

	$("#attacktable tr:not(:first-child)").each(function() {
		var weapon = $(this).find("td:nth-child(1)").html();
		var attackBonus = $(this).find("td:nth-child(2)").html();
		var critical = $(this).find("td:nth-child(3)").html();
		var damage = $(this).find("td:nth-child(4)").html();
		var type = $(this).find("td:nth-child(5)").html();
		var rangeIncrement = $(this).find("td:nth-child(6)").html();

		if(weapon.indexOf("+ <") > 0) {
			// this is a dual wield attack

			var weapon1 = $.trim(weapon.substring(0, weapon.indexOf("+ <")));
			var weapon2 = $.trim(weapon.substring(weapon.indexOf(">") + 1));

			var attackBonus1 = $.trim(attackBonus.substring(0, attackBonus.indexOf("<")));
			var attackBonus2 = $.trim(attackBonus.substring(attackBonus.indexOf(">") + 1));

			var critical1 = critical;
			var critical2 = critical;
			if(critical.indexOf("<br") > 0) {
				critical1 = $.trim(critical.substring(0, critical.indexOf("<")));
				critical2 = $.trim(critical.substring(critical.indexOf(">") + 1));
			}

			var damage1 = damage;
			var damage2 = damage;
			if(damage.indexOf("<br") > 0) {
				damage1 = $.trim(damage.substring(0, damage.indexOf("<")));
				damage2 = $.trim(damage.substring(damage.indexOf(">") + 1));
			}

			var type1 = type;
			var type2 = type;
			if(type.indexOf("<br") > 0) {
				type1 = $.trim(type.substring(0, type.indexOf("<")));
				type2 = $.trim(type.substring(type.indexOf(">") + 1));
			}

			var rangeIncrement1 = rangeIncrement;
			var rangeIncrement2 = rangeIncrement;
			if(rangeIncrement.indexOf("<br") > 0) {
				rangeIncrement1 = $.trim(rangeIncrement.substring(0, rangeIncrement.indexOf("<")));
				rangeIncrement2 = $.trim(rangeIncrement.substring(rangeIncrement.indexOf(">") + 1));
			}

			var attack = "<data !dualattack #attackID" + attackID + ">\n";
			attack += "PC[ref] : [[]]\n";
			attack += "Weapon 1           : " + weapon1 + "\n";
			attack += "Attack Bonus 1     : " + attackBonus1 + "\n";
			attack += "Critical 1         : " + critical1 + "\n";
			attack += "Damage 1           : " + damage1 + "\n";
			attack += "Type 1             : " + type1 + "\n";
			attack += "Range Increment 1  : " + rangeIncrement1 + "\n";
			attack += "Weapon 2           : " + weapon2 + "\n";
			attack += "Attack Bonus 2     : " + attackBonus2 + "\n";
			attack += "Critical 2         : " + critical2 + "\n";
			attack += "Damage 2           : " + damage2 + "\n";
			attack += "Type 2             : " + type2 + "\n";
			attack += "Range Increment 2  : " + rangeIncrement2 + "\n";
			attack += "</data>\n\n";

		} else {
			
			var attack = "<data !attack #attackID" + attackID + ">\n";
			attack += "PC[ref] : [[]]\n";
			attack += "Weapon           : " + weapon + "\n";
			attack += "Attack Bonus     : " + attackBonus + "\n";
			attack += "Critical         : " + critical + "\n";
			attack += "Damage           : " + damage + "\n";
			attack += "Type             : " + type + "\n";
			attack += "Range Increment  : " + rangeIncrement + "\n";
			attack += "</data>\n\n";
			
		}
		attackStrings += attack;
		attackID++;


	});

	return attackStrings;
}

function getCharacterAbility(ability) {
	return $("#abilityvalue" + ability).val();
}

function getCharacterName() {
	return $.trim($("#charname").html());
}

function getPlayerName() {
	return $("#playername").html();
}

function getCharacterImage() {
	var patt=/\"|\'|\)|\(|url/g;
	return $("#characterimage").css('background-image').replace(patt,'');
}

function getCharacterTitles() {
	return $("#charactertitles").val();
}

function getCharacterAge() {
	return $("#characterage").val().replace(/\D/g,"");
}

function getCharacterAgeCategory() {
	return getAgeCategory(getCharacterAge(), getCharacterRace());	
}

function getCharacterGender() {
	return $("#genderselect").val();
}

function getCharacterRace() {
	return $("#raceselect").val();
}

function getCharacterHeight() {
	return $("#characterheight").val();
}

function getCharacterWeight() {
	return $("#characterweight").val();
}

function getCharacterNationality() {
	return $("#characterculture").val();
}

function getCharacterFaction() {
	return $("#characterfaction").val();
}

function getCharacterAlignment() {
	return $("#alignmentselect").val();
}

function getCharacterReligion() {
	return $("#characterreligion").val();
}

function getCharacterFate() {
	return $("#characterfate").val();
}

function getCharacterExperience() {
	return $("#characterexperience").val();
}

function getCharacterInitiative() {
	return $("#totalInitValue").html();
}
function getCharacterHP() {
	return $("#totalHPvalue").html();
}
function getCharacterAC() {
	return $("#totalACvalue").html();
}
function getCharacterTouchAC() {
	return $("#touchAC").html();
}
function getCharacterFlatFootedAC() {
	return $("#ffAC").html();
}
function getCharacterFortitudeSave() {
	return $("#totalFortValue").html();
}
function getCharacterReflexSave() {
	return $("#totalReflValue").html();
}
function getCharacterWillSave() {
	return $("#totalWillValue").html();
}
function getCharacterSpeed() {
	return $("#speed").html();
}
function getCharacterASF() {
	return $("#asfPercentage").html();
}


function getCharacterWealth() {
	return $("#gold").val();
}

function getCharacterNetWorth() {
	return $("#netval").html();
}

function getCharacterClasses() {
	var classes = "";
	var index = 1;
	$("#classes tr:not(:first-child)").each(function(e) {
		var classname = getClassName(this);
		var classlevel = $.trim($(this).find(".classlevelfield").val());
		
		if(classname && classlevel) {
			
			var cl = "<data !class #" + index + "_" + replaceAll(classname, " ", "_") + ">\n";
			cl += "PC[ref] : [[]]\n";
			cl += "Name         : " + toTitleCase(classname) + "\n";
			cl += "Level        : " + classlevel + "\n";
			cl += "</data>\n\n";
			
			index++;
			classes += cl;
		}
	});
	
	return classes;	
}
function getCharacterFeats() {
	var feats = [];
	$(".featfield").each(function(e) {
		var featname = $.trim($(this).val());
		if(featname.length > 0) {
			feats.push(featname);
		}
	});

	feats.sort();
	
	featString = "";
	
	var hadAlready = [];

	for(key in feats) {
		var feat = feats[key];
		
		var duplicate = false;
		for(checkKey in hadAlready) {
			if(hadAlready[checkKey] == feat) {
				duplicate = true;
			}
		}

		if(duplicate) {
			continue;
		} else {
			hadAlready.push(feat);
		}

		var count = 0;
		for(key2 in feats) {
			if(feat == feats[key2]) {
				count++;
			}
		}
		if(count <= 1) {
			featString += feat + ", ";
		} else {
			featString += feat + " [x" + count + "], ";
		}
	}	


	if(featString.length > 0) {
		featString = featString.substring(0, featString.length - 2)
	}
	return featString;
}


function getCharacterLanguages() {
	var languages = [];
	$(".languagefield:enabled").each(function(e) {
		var langname = $.trim($(this).val());
		if(langname.length > 0) {
			languages.push(langname);
		}
	});
	
	languages.sort();

	$(".languagefield:disabled").each(function(e) {
		var langname = $.trim($(this).val());
		if(langname.length > 0) {
			languages.push(langname);
		}
	});

	var languageString = "";
	for(var key in languages) {
		languageString += languages[key] + ", ";
	}

	if(languages.length > 0) {
		languageString = languageString.substring(0, languageString.length - 2);
	}
	return languageString;
}
function getCharacterManualClassAbilities() {
	var abilities = "";
	$(".classabilityfield:not(:disabled)").each(function(e) {
		var abilname = $.trim($(this).val());
		if(abilname.length > 0) {
			abilities += abilname + ", ";
		}
	});
	
	if(abilities.length > 0) {
		abilities = abilities.substring(0, abilities.length - 2);
	}
	return abilities;
}
function getCharacterAutomaticClassAbilities() {
	var abilities = "";
	$(".classabilityfield:disabled").each(function(e) {
		var abilname = $.trim($(this).val());
		if(abilname.length > 0) {
			abilities += abilname + ", ";
		}
	});
	
	if(abilities.length > 0) {
		abilities = abilities.substring(0, abilities.length - 2);
	}
	return abilities;
}
function getCharacterSpells() {
	return replaceAll($("#spellsfield").val(), "\n", "\\\\ ");
}
function getAbilityNotes() {
	return replaceAll($("#abilitiesfield").val(), "\n", "\\\\ ");
}
function getEquipmentNotes() {
	return replaceAll($("#equipmentnotes").val(), "\n", "\\\\ ");
}
function getCharacterNotes() {
	return replaceAll($("#notes").val(), "\n", "\\\\ ");
}

function getSkills() {
	
	var skills = "";
	
	$("#skills tr:not(:first-child)").each(function(e) {
		
		var skillname = $.trim($(this).find(".skillname").val());
		var bonus = $(this).find(".skilltotalbonus").html();
		var ranks = $(this).find(".skilldata.ranks").val();
		if(ranks.length == 0) {
			ranks = 0;
		}
		var ccranks = $(this).find(".skilldata.ccranks").val();
		if(ccranks.length == 0) {
			ccranks = 0;
		}
		var other = $(this).find(".skilldata.other").val();
		if(other.length == 0) {
			other = 0;
		}
		
		if((skillname.length > 0) && (bonus.length > 0)) {
		
			var skill = "<data !skill #" + replaceAll(skillname, " ", "_") + ">\n";
			skill += "PC[ref] : [[]]\n";
			skill += "Name         : " + skillname + "\n";
			skill += "Bonus        : " + bonus + "\n";
			skill += "Ranks        : " + ranks + "\n";
			skill += "CC Ranks     : " + ccranks + "\n";
			skill += "Other Bonus  : " + other + "\n";
			skill += "</data>\n\n";
			
			skills += skill;
		}
		
	});
	
	return skills;
}

function getEquipment() {
	var items = "";
	var itemID = 0;
	
	$(".equipmentItem").each(function(e) {
		
		var itemname = $.trim($(this).find(".itemname").val());
		var itemtype = $.trim($(this).find(".itemtype").val());
		var weight = $.trim($(this).find(".itemweight").val());
		var value = $.trim($(this).find(".itemvalue").val());
		var number = $.trim($(this).find(".itemnumber").val());
		var location = $.trim($(this).parents("ul").attr('id'));
		
		if(itemname) {
			var item = "<data !item #itemID" + itemID + ">\n";
			item += "PC[ref] : [[]]\n";
			item += "Name         : " + itemname + "\n";
			item += "Type         : " + itemtype + "\n";
			item += "Weight       : " + weight + "\n";
			item += "Value        : " + value + "\n";
			item += "Number       : " + number + "\n";
			item += "Location     : " + location + "\n";
			item += "</data>\n\n";
			
			items += item;
			itemID++;
		}
		
	});
	
	return items;
}

function getBonusCasterLevels() {
	var data = "";
	$("#spellsperdaytable .calculated").each(function(e) {
		var classname = $(this).find("td:first-child").html();
		var bonuslevels = $(this).find("input").val();
		data += "<data !bonuscasterlevel #" + replaceAll(classname, " ", "_") + "BonusLevels>\n";
		data += "PC[ref] : [[]]\n";
		data += "Class : " + classname + "\n";
		data += "Level : " + bonuslevels + "\n";
		data += "</data>\n\n";
	});

	$("#psionicbonuslevels .calculated").each(function(e) {
		var classname = $(this).find("td:first-child").html();
		var bonuslevels = $(this).find("input").val();
		data += "<data !bonuscasterlevel #" + replaceAll(classname, " ", "_") + "BonusLevels>\n";
		data += "PC[ref] : [[]]\n";
		data += "Class : " + classname + "\n";
		data += "Level : " + bonuslevels + "\n";
		data += "</data>\n\n";
	});
	
	return data;
}

function getDragonShamanAuras() {
	var ret = "";
	if($("#dsa_energy_shield").prop('checked')) {
		ret += "Energy Shield, ";
	}
	if($("#dsa_power").prop('checked')) {
		ret += "Power, ";
	}
	if($("#dsa_presence").prop('checked')) {
		ret += "Presence, ";
	}
	if($("#dsa_resistance").prop('checked')) {
		ret += "Resistance, ";
	}
	if($("#dsa_senses").prop('checked')) {
		ret += "Senses, ";
	}
	if($("#dsa_toughness").prop('checked')) {
		ret += "Toughness, ";
	}
	if($("#dsa_vigor").prop('checked')) {
		ret += "Vigor, ";
	}
	return ret;
}

/**
 * Setters
 */

function setDragonShamanAuras(auraArray) {
	if($.inArray("Energy Shield", auraArray) >= 0) {
		$("#dsa_energy_shield").prop('checked', true);
	} else {
		$("#dsa_energy_shield").prop('checked', false);
	}
	if($.inArray("Power", auraArray) >= 0) {
		$("#dsa_power").prop('checked', true);
	} else {
		$("#dsa_power").prop('checked', false);
	}
	if($.inArray("Presence", auraArray) >= 0) {
		$("#dsa_presence").prop('checked', true);
	} else {
		$("#dsa_presence").prop('checked', false);
	}
	if($.inArray("Resistance", auraArray) >= 0) {
		$("#dsa_resistance").prop('checked', true);
	} else {
		$("#dsa_resistance").prop('checked', false);
	}
	if($.inArray("Senses", auraArray) >= 0) {
		$("#dsa_senses").prop('checked', true);
	} else {
		$("#dsa_senses").prop('checked', false);
	}
	if($.inArray("Toughness", auraArray) >= 0) {
		$("#dsa_toughness").prop('checked', true);
	} else {
		$("#dsa_toughness").prop('checked', false);
	}
	if($.inArray("Vigor", auraArray) >= 0) {
		$("#dsa_vigor").prop('checked', true);
	} else {
		$("#dsa_vigor").prop('checked', false);
	}
}

function setCharacterAbility(ability, value) {
	$("#abilityvalue" + ability).val(value);
}

function setCharacterImage(url) {
	$("#characterimage").css('background-image', 'url(' + url + ')');
}

function setCharacterTitles(titles) {
	$("#charactertitles").val(titles);
}

function setCharacterAge(age) {
	$("#characterage").val(age);
}

function setCharacterGender(gender) {
	$("#genderselect").val(gender);
}

function setCharacterRace(race) {
	$("#raceselect").val(race);
}

function setCharacterHeight(height) {
	$("#characterheight").val(height);
}

function setCharacterWeight(weight) {
	$("#characterweight").val(weight);
}

function setCharacterNationality(nation) {
	$("#characterculture").val(nation);
}

function setCharacterFaction(faction) {
	$("#characterfaction").val(faction);
}

function setCharacterAlignment(alignment) {
	$("#alignmentselect").val(alignment);
}

function setCharacterReligion(religion) {
	$("#characterreligion").val(religion);
}

function setCharacterFate(fate) {
	$("#characterfate").val(fate);
}

function setCharacterExperience(xp) {
	$("#characterexperience").val(xp);
}


function setCharacterSpells(spells) {
	if(spells) {
		$("#spellsfield").val(replaceAll(spells, "\\\\ ", "\n"));
	}
}
function setAbilityNotes(abilitynotes) {
	if(abilitynotes) {
		$("#abilitiesfield").val(replaceAll(abilitynotes, "\\\\ ", "\n"));
	}
}
function setEquipmentNotes(equipmentnotes) {
	if(equipmentnotes) {
		$("#equipmentnotes").val(replaceAll(equipmentnotes, "\\\\ ", "\n"));
	}
}
function setCharacterNotes(characternotes) {
	if(characternotes) {
		$("#notes").val(replaceAll(characternotes, "\\\\ ", "\n"));
	}
}
function setCharacterWealth(gp) {
	$("#gold").val(gp);
}

function setJobTitle(jobtitle) {
	$("#jobtitle").val(jobtitle);	
}
function setJobType(jobtype) {
	$("#jobtypeselect").val(jobtype);	
}
function setJobSkill(skill) {
	$("#jobskill").val(skill);	
}
function setLifestyle(lifestyle) {
	$("#lifestyleselect").val(lifestyle);	
}
function setDependentChildren(depChild) {
	$("#numchildren").val(depChild);	
}
function setDependentAdults(depAdult) {
	$("#numadults").val(depAdult);	
}
function setOtherIncome(otherIncome) {
	$("#othergpweek").val(otherIncome);	
}
function setDoneUntil(untilDate) {
	$("#lastprocesseddate").val(untilDate);	
}

function addDomains(domains) {
	if(!domains) {
		return;
	}
	var domain1 = "";
	var domain2 = "";
	var domain3 = "";
	switch(domains.length) {
		case 3:
			domain3 = domains[2];
		case 2:
			domain2 = domains[1];
		case 1:
			domain1 = domains[0];
			break;
		case 0:
			return;
	}
	// cloistered cleric
	if(domains.length == 3) {
		if(domain1 == "Knowledge") {
			domain1 = domain2;
			domain2 = domain3;
			domain3 = "Knowledge";
		} else if(domain2 == "Knowledge") {
			domain2 = domain3;
			domain3 = "Knowledge";
		}
	}
	$(".domainchoice:first").val(domain1);
	$(".domainchoice:last").val(domain2);
	$("#cloisteredclericdomain").val(domain3);
}

function setEnergy(energytype) {
	$("#clericturnchoice").val(energytype);
}

function addCharacterClass(cl, level) {
	addClassRow();

	cl = "" + cl;

	// make split here based on brackets
	var openBr = cl.indexOf("(");
	var closeBracket = cl.indexOf(")");
	if(openBr >= 0 && closeBracket >= 0 && openBr < closeBracket) {
		var className = toTitleCase($.trim(cl.substring(0, openBr)));
		var classvariant = toTitleCase($.trim(cl.substring(openBr+1, closeBracket)));
	 	$("#classes tr:last-child").find(".classfield").val(className);
		fixClassVariantDropdowns();
	 	$("#classes tr:last-child").find(".variantfield").val(classvariant);
		$("#classes tr:last-child").find(".classlevelfield").val(level);
	} else {
	 	$("#classes tr:last-child").find(".classfield").val(cl);
		$("#classes tr:last-child").find(".classlevelfield").val(level);
		fixClassVariantDropdowns();
	}
}
function addSkill(skill, ranks, ccranks, other) {
	addSkillRow();
	$("#skills tr:last-child").find(".skillname").val(skill);
	$("#skills tr:last-child").find(".skilldata.ranks").val(ranks);
	$("#skills tr:last-child").find(".skilldata.ccranks").val(ccranks);
	$("#skills tr:last-child").find(".skilldata.other").val(other);
}
function addEquipment(name, type, weight, value, number, location) {
	addEquipmentItem("#" + location);
	$("#" + location + " li.equipmentItem:last-child").find(".itemname").val(name);
	$("#" + location + " li.equipmentItem:last-child").find(".itemtype").val(type);
	$("#" + location + " li.equipmentItem:last-child").find(".itemweight").val(weight);
	$("#" + location + " li.equipmentItem:last-child").find(".itemvalue").val(value);
	$("#" + location + " li.equipmentItem:last-child").find(".itemnumber").val(number);
}
function addCharacterFeat(feat) {

	// filter out the [xY] and if so do multiple times

	var startOfMultiplier = feat.indexOf("[x");

	if(startOfMultiplier != -1) {
		var multiplier = parseInt(feat.substring(startOfMultiplier +2, feat.indexOf("]", startOfMultiplier)));
		feat = $.trim(feat.substring(0, startOfMultiplier)); 
		for(var i = 0; i < multiplier; i++) {
			addFeatRow();
			$("#feats tr:last-child").find(".featfield").val(feat);
		}
	} else {
		addFeatRow();
		$("#feats tr:last-child").find(".featfield").val(feat);
	}
}
function addCharacterLanguage(language) {
	addLanguageRow();
	var v = $("#languages .languagefield").filter(function() {
		return !this.value;
	}).val(language);
}
function addCharacterManualClassAbility(ability) {
	addClassAbilityRow();
	$("#classabilities tr").find(".classabilityfield").filter(function() {
		return !this.value;
	}).val(ability);
}

function addBonusCasterLevels(classname, levels) {
	bonusCasterArray[ classname ] = levels;
}

function replaceAll(source,stringToFind,stringToReplace){
	var temp = source;
	var index = temp.indexOf(stringToFind);
	while(index != -1){
		temp = temp.replace(stringToFind,stringToReplace);
		index = temp.indexOf(stringToFind);
	}
	return temp;
}

function addBeguilerAdvancedLearning(level3, level7, level11, level15, level19) {

	if(!level19) {
		level19 = "";
	}
	if(!level15) {
		level15 = "";
	}
	if(!level11) {
		level11 = "";
	}
	if(!level7) {
		level7 = "";
	}
	if(!level3) {
		level3 = "";
	}

	$("#beguilerAL3").val(level3);
	$("#beguilerAL7").val(level7);
	$("#beguilerAL11").val(level11);
	$("#beguilerAL15").val(level15);
	$("#beguilerAL19").val(level19);
}

function addSpellsKnown(classname, spelllevel, spellname) {

	if(classname == "wizard") {
		addWizardSpell(spelllevel, spellname);
	} else if(classname == "duskblade" && spelllevel == 0) {
		addDuskbladeLevel0Spell(spellname);
	} else {
		// stupid 1 based counting and not properly selection *frussen wussen*
		$("#" + classname + "spellsknown .level" + spelllevel + " input").each(function(e) {
			if($(this).val() == "") {
				$(this).val(spellname);
				return false;
			}
		});
	}
}

function getAvatarURL() {
	// do we have the user id?
	if(typeof avatarURL != "undefined" && avatarURL != "/forum/download/file.php?avatar=/util/no-avatar.jpg") {
		return "http://www.novus-utum.org" + avatarURL;
	}

	// if not, return the no-avatar image
	return "http://www.novus-utum.org/util/no-avatar.jpg";
}

function addProhibitedSchool(schoolname) {
	 $(".opposedSchoolChoice").each(function(e) {
                if($(this).val() == "") {
                        $(this).val(schoolname);
                	return false;
        	}
	});

}

function getICWikiText() {

	var name = getCharacterName();
	name = toTitleCase(name);
	var wikiStr = "====== " + name + " ======\n\n"

	wikiStr += "<view ?Name ?Race ?Avatar ?Gender ?Height ?Weight ?Age ?Titles>\n";
	wikiStr += "template {\n";
	wikiStr += "template:pc\n";
        wikiStr += "}\n\n";

        wikiStr += "?p is a: character\n";
        wikiStr += "?p entry title: " + name + "\n";
        wikiStr += "?p Name: ?Name\n";
        wikiStr += "optional {\n";
        wikiStr += "?p Race: ?Race\n";
        wikiStr += "}\n\n";
        wikiStr += "optional {\n";
        wikiStr += "?p Avatar [image::300x300]: ?Avatar\n";
        wikiStr += "}\n\n";
        wikiStr += "optional {\n";
        wikiStr += "?p Gender: ?Gender\n";
        wikiStr += "}\n\n";
        wikiStr += "optional {\n";
        wikiStr += "?p Height: ?Height\n";
        wikiStr += "}\n\n";
        wikiStr += "optional {\n";
        wikiStr += "?p Weight: ?Weight\n";
        wikiStr += "}\n\n";
        wikiStr += "optional {\n";
        wikiStr += "?p Age: ?Age\n";
        wikiStr += "}\n\n";
        wikiStr += "optional {\n";
        wikiStr += "?p Titles: ?Titles\n";
        wikiStr += "}\n\n";

        wikiStr += "</view>\n\n";

        wikiStr += "[ [[ic:People]] ]\n\n";

        wikiStr += "<<Write your description here>>";

	return wikiStr;
}

