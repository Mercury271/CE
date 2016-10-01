/**
 * List of the six abilities.
 */
var abilities = [ 
	"strength", 
	"dexterity", 
	"constitution", 
	"intelligence", 
	"wisdom", 
	"charisma",
];

var untrainedSkills = [
	"appraise",
	"balance",
	"bluff",
	"climb",
	"concentration",
	"diplomacy",
	"disguise",
	"escape artist",
	"forgery",
	"gather information",
	"heal",
	"hide",
	"intimidate",
	"jump",
	"listen",
	"move silently",
	"ride",
	"search",
	"sense motive",
	"spot",
	"survival",
	"swim",
	"use rope",
];

var cultures = [
	"Ecclesian",
	"Silverite",
	"Voran",
];

var religions = [
	"Aelus",
	"Aex",
	"Alurt",
	"Ecclesia",
	"Ekal",
	"Mythos",
	"Ovusa",
	"Pantheon of Vorus",
	"Qzia",
	"Raya-Thu",
	"Shami",
	"Spirits of Nature",
	"Temperia",
	"Wsaryi",
	"Wutysa",
];

var factions = [
	"Cult of Saint Molina",
	"Cult of Saint Theris",
	"Eccles",
	"House Asa",
	"House Atianna",
	"House Dankil",
	"House Demha",
	"House Elwyn",
	"House Ferency",
	"House Groas",
	"House Merout",
	"House Naikl",
	"House Reant",
	"House Tenderfoot",
	"House Treny",
	"House Winford",
	"House Xueris",
	"Silver Rain Republic",
	"Vorus",
];

var domainList = [
	"Air",
	"Animal",
	"Artifice",
	"Chaos",
	"Charm",
	"Community",
	"Creation",
	"Darkness",
	"Death",
	"Destruction",
	"Earth",
	"Evil",
	"Fire",
	"Glory",
	"Good",
	"Healing",
	"Knowledge",
	"Law",
	"Liberation",
	"Luck",
	"Madness",
	"Magic",
	"Mind",
	"Nobility",
	"Plant",
	"Protection",
	"Repose",
	"Rune",
	"Scalykind",
	"Strength",
	"Sun",
	"Travel",
	"Trickery",
	"War",
	"Water",
	"Weather",
]

function isIlliterateClass(classname) {
	classname = $.trim(classname.toLowerCase());
	switch(classname) {
		case "barbarian" :
		case "barbarian (hunter)" :
	        case "barbarian (ape totem)" :       
	        case "barbarian (bear totem)" :      
	        case "barbarian (boar totem)" :      
	        case "barbarian (dragon totem)" :    
	        case "barbarian (eagle totem)" :     
	        case "barbarian (horse totem)" :     
	        case "barbarian (jaguar totem)" :    
	        case "barbarian (lion totem)" :      
	        case "barbarian (serpent totem)" :   
	        case "barbarian (wolf totem)" :   
		case "commoner" :
			return true;
		default:
			return false;
	}
}

function getBaseXPforLevel(level) {
	return ((((level * level) - level) / 2) * 1000);
}

function getStartingGold(level, baseClass) {

	if(baseClass.indexOf("(") >= 0) {
		baseClass = $.trim(baseClass.substring(0, baseClass.indexOf("(")).toLowerCase());
	}

	switch(level) {
		case 1:
			switch(baseClass) {
				case "adapt":
					return 40;
				case "aristocrat":
					return 240;
				case "barbarian":
					return 80;
				case "bard":
					return 80;
				case "beguiler":
					return 120;
				case "fallen cleric":
				case "cleric":
					return 100;
				case "commoner":
					return 10;
				case "fallen dragon shaman":
				case "dragon shaman":
					return 80;
				case "fallen druid":
				case "druid":
					return 40;
				case "duskblade":
					return 120;
				case "expert":
					return 60;
				case "fighter":
					return 120;
				case "fallen knight":
				case "knight":
					return 120;
				case "monk":
					return 10;
				case "fallen paladin":
				case "paladin":
					return 120;
				case "psion":
					return 60;
				case "psychic warrior":
					return 100;
				case "ranger":
					return 120;
				case "rogue":
					return 100;
				case "sorcerer":
					return 60;
				case "soul knife":
					return 100;
				case "warrior":
					return 60;
				case "wilder":
					return 80;
				case "wizard":
					return 60;
			}
			break;
		case 2:
			return 625;
		case 3:
			return 1250;
		case 4:
			return 2500;
		case 5:
			return 3750;
		case 6:
			return 5000;
		case 7:
			return 7500;
		case 8:
			return 10000;
		case 9:
			return 12500;
		case 10:
			return 16250;
		case 11:
			return 20000;
		case 12:
			return 24000;
		case 13:
			return 28000;
		case 14:
			return 33000;
		case 15:
			return 38000;
	}

	return 0;
}

/**
 * Get the age category of a character of age [age] and race [raceName]
 *
 * One of: "Child", "Adult", "Middle Age", "Old" or "Venerable"
 */
function getAgeCategory(age, raceName) {

	// sanitize age
	age = parseInt($.trim(age));
	if(isNaN(age)) {
		// age is not a number, return 
		return "Adult";
	}

        raceName = $.trim(raceName.toLowerCase());

        switch(raceName) {
                case "dwarf":
			if(age < 40) {
				return "Child";
			} else if(age < 125) {
				return "Adult";
			} else if(age < 188) {
				return "Middle Age";
			} else if(age < 250) {
				return "Old";
			} else {
				return "Venerable";
			}
			break;
                case "elf":
			if(age < 110) {
				return "Child";
			} else if(age < 175) {
				return "Adult";
			} else if(age < 263) {
				return "Middle Age";
			} else if(age < 350) {
				return "Old";
			} else {
				return "Venerable";
			}
			break;
                case "gnome":
			if(age < 40) {
				return "Child";
			} else if(age < 100) {
				return "Adult";
			} else if(age < 150) {
				return "Middle Age";
			} else if(age < 200) {
				return "Old";
			} else {
				return "Venerable";
			}
			break;
                case "half-elf":
			if(age < 20) {
				return "Child";
			} else if(age < 62) {
				return "Adult";
			} else if(age < 93) {
				return "Middle Age";
			} else if(age < 125) {
				return "Old";
			} else {
				return "Venerable";
			}
			break;
                case "half-orc":
			if(age < 14) {
				return "Child";
			} else if(age < 30) {
				return "Adult";
			} else if(age < 45) {
				return "Middle Age";
			} else if(age < 60) {
				return "Old";
			} else {
				return "Venerable";
			}
			break;
                case "halfling":
			if(age < 20) {
				return "Child";
			} else if(age < 50) {
				return "Adult";
			} else if(age < 75) {
				return "Middle Age";
			} else if(age < 100) {
				return "Old";
			} else {
				return "Venerable";
			}
			break;
                case "human":
			if(age < 15) {
				return "Child";
			} else if(age < 35) {
				return "Adult";
			} else if(age < 53) {
				return "Middle Age";
			} else if(age < 70) {
				return "Old";
			} else {
				return "Venerable";
			}
			break;
		default:
			return "Adult";

        }
}

function getCulturalAbilities(culture) {
	if(culture) {
		culture = $.trim(culture.toLowerCase());
	
		switch(culture) {
			case "ecclesian":
				return [ "Favoured Classes: Aristocrat, Cleric, Fighter, Paladin" ];
			case "silverite":
				return [ "Favoured Classes: Adapt, Druid, Expert, Ranger, Rogue" ];
			case "voran":
				return [ "Favoured Classes: Psion, Sorcerer, Wilder, Wizard" ];
		}
	}
}

/**
 * Give the race name, get the base speed
 */
function getRacialSpeed(raceName) {

	raceName = $.trim(raceName.toLowerCase());
	
	switch(raceName) {
		case "dwarf":
		case "gnome":
		case "halfling":
			return 20;
		case "elf":
		case "half-elf":
		case "half-orc":
		case "human":
			return 30;
	}
}

/**
 * Give the race name, get the racial abilities.
 */
function getRacialAbilities(raceName, chaOver10) {
	raceName = $.trim(raceName.toLowerCase());
	
	switch(raceName) {
		case "dwarf":
			return [ "Darkvision 60 ft", "Stonecunning", "Dwarven Weapon Familiarity", "Stability", "+1 Attack vs Orcs, Goblins" ];
		case "elf":
			return [ "Immune to magic Sleep", "Low-Light Vision", "Elven Weapon Proficiencies" ];
		case "gnome":
			if(chaOver10) {
				return [ "Low-Light Vision", "Gnome Weapon Familiarity", "+1 Save DC on own Illusion Spells", "+1 Attack vs Kobolds, Goblins", "Spells: Dancing Lights, Ghost Sound, Prestidigitation, Speak with Animals (burrowing mammals only) 1x/day" ];
			}
			return [ "Low-Light Vision", "Gnome Weapon Familiarity", "+1 Save DC on own Illusion Spells", "+1 Attack vs Kobolds, Goblins", "Speak with Animals (burrowing mammals only) 1x / day" ];
		case "half-elf":
			return [ "Immune to magic Sleep", "Low-Light Vision", "Elven Blood" ];
		case "half-orc":
			return [ "Darkvision 60 ft", "Orc Blood" ];
		case "halfling":
			return [ ];
		case "human":
			return [ ];
	}
}

/**
 * Give the race name and the skill, get the racial bonus to that skill.
 */
function getRacialSkillBonus(race, skill) {
	
	race = $.trim(race.toLowerCase());
	skill = $.trim(skill.toLowerCase());
	
	switch(race) {
		case "dwarf":
			switch(skill) {
				case "craft: armorsmithing":
				case "craft: blacksmithing":
				case "craft: masonry":
				case "craft: weaponsmithing":
					return 2;
			}
		case "elf":
			switch(skill) {
				case "listen":
				case "search":
				case "spot":
					return 2;
			}
		case "gnome":
			switch(skill) {
				case "listen":
				case "craft: alchemy":
					return 2;
			}
		case "half-elf":
			switch(skill) {
				case "diplomacy":
				case "gather information":
					return 2;
				case "listen":
				case "search":
				case "spot":
					return 1;
			}
		case "halfling":
			switch(skill) {
				case "climb":
				case "jump":
				case "listen":
				case "move silently":
					return 2;
			}
	}
	return 0;
}

function getWageForPosition(position) {
	position = $.trim(position.toLowerCase());
	var wage = positionWages[position];

	if(!wage) {
		return 0;
	}
	return wage;
}

function getSkillForJob(jobtitle) {
	jobtitle = $.trim(jobtitle.toLowerCase());


	var skill = jobSkills[jobtitle];
	
	if(!skill) {
		return "";
	}
	return skill;
}

var positionWages = {
	"field officer" : 10,
	"general officer" : 15,
	"junior officer" : 3,
	"officer" : 7,
}

var jobs = [
	"Acrobat",
	"Actor",
	"Actress",
	"Alchemist",
	"Animal Trainer",
	"Apothecary",
	"Architect",
	"Armourer",
	"Armoursmith",
	"Atilliator",
	"Barmaid",
	"Barwench",
	"Blacksmith",
	"Boater",
	"Bookkeeper",
	"Bouncer",
	"Bower",
	"Bowyer",
	"Brewer",
	"Butler",
	"Carpenter",
	"Cartographer",
	"Chamberlain",
	"Clothier",
	"Clothweaver",
	"Clown",
	"Comedian",
	"Comic",
	"Contortionist",
	"Cook",
	"Courtisan",
	"Dancer",
	"Diplomat",
	"Driver",
	"Drummer",
	"Escape Artist",
	"Farmer",
	"Farrier",
	"Fiddler",
	"Field Officer",
	"Fisher",
	"Fisherman",
	"Fletcher",
	"Fluter",
	"Forger",
	"General Officer",
	"Geologist",
	"Goatherd",
	"Groom",
	"Guide",
	"Healer",
	"Herald",
	"Herbalist",
	"Herder",
	"Historian",
	"Hornblower",
	"Hostler",
	"Hunter",
	"Innkeeper",
	"Interpreter",
	"Janitor",
	"Jester",
	"Jiggalo",
	"Juggler",
	"Junior Officer",
	"Leatherworker",
	"Locksmith",
	"Lumberjack",
	"Maid",
	"Mason",
	"Merchant",
	"Midwife",
	"Miller",
	"Miner",
	"Negotiator",
	"Officer",
	"Page",
	"Painter",
	"Peasant",
	"Pickpocket",
	"Poet",
	"Porter",
	"Priest",
	"Prostitute",
	"Rancher",
	"Reeve",
	"Sage",
	"Sailor",
	"Scribe",
	"Scullerymaid",
	"Scullion",
	"Seaman",
	"Seamstress",
	"Servant",
	"Shepherd",
	"Shepherdess",
	"Shipbuilder",
	"Shipwright",
	"Singer",
	"Smith",
	"Spinner",
	"Spinster",
	"Spy",
	"Squire",
	"Stableboy",
	"Stablegirl",
	"Stablehand",
	"Stablemaster",
	"Town-crier",
	"Vallet",
	"Watchman",
];

var jobSkills = {
        "merchant" : "Appraise",
        "trader" : "Appraise",
        "alchemist" : "Craft: Alchemy",
        "armoursmith" : "Craft: Armoursmithing",
        "armourer" : "Craft: Armoursmithing",
        "blacksmith" : "Craft: Blacksmithing",
        "smith" : "Craft: Blacksmithing",
        "bowyer" : "Craft: Bowmaking",
        "bower" : "Craft: Bowmaking",
        "fletcher" : "Craft: Bowmaking",
        "atilliator" : "Craft: Bowmaking",
        "leatherworker" : "Craft: Leatherworking",
        "mason" : "Craft: Masonry",
        "stonecutter" : "Craft: Masonry",
        "shipwright" : "Craft: Shipbuilding",
        "shipbuilder" : "Craft: Shipbuilding",
        "tailor" : "Craft: Tailoring",
        "seamstress" : "Craft: Tailoring",
        "weaver" : "Craft: Tailoring",
        "clothweaver" : "Craft: Tailoring",
        "spinner" : "Craft: Tailoring",
        "spinster" : "Craft: Tailoring",
        "clothier" : "Craft: Tailoring",
	"weaponsmith" : "Craft: Weaponsmithing",
	"carpenter" : "Craft: Woodworking",
	"woodworker" : "Craft: Woodworking",
	"diplomat" : "Diplomacy",
	"negotiator" : "Diplomacy",
	"escape artist" : "Escape Artist",
	"contortionist" : "Escape Artist",
	"forger" : "Forgery",
	"spy" : "Gather Information",
	"shepherd" : "Handle Animal",
	"goatherd" : "Handle Animal",
	"stableboy" : "Handle Animal",
	"stablegirl" : "Handle Animal",
	"stablehand" : "Handle Animal",
	"animal trainer" : "Handle Animal",
	"shepherdess" : "Handle Animal",
	"groom" : "Handle Animal",
	"stablemaster" : "Handle Animal",
	"veterinarian" : "Handle Animal",
	"hostler" : "Handle Animal",
	"farrier" : "Handle Animal",
	"healer" : "Heal",
	"midwife" : "Heal",
	"bouncer" : "Intimidate",
	"architect" : "Knowledge: Architecture and Engineering",
	"geologist" : "Knowledge: Geography",
	"historian" : "Knowledge: History",
	"sage" : "Knowledge: Local",
	"priest" : "Knowledge: Religion",
	"locksmith" : "Open Lock",
	"actor" : "Perform: Act",
	"actress" : "Perform: Act",
	"thespian" : "Perform: Act",
	"comedian" : "Perform: Comedy",
	"comic" : "Perform: Comedy",
	"clown" : "Perform: Comedy",
	"jester" : "Perform: Comedy",
	"dancer" : "Perform: Dance",
	"juggler" : "Perform: Juggle",
	"poet" : "Perform: Oratory",
	"storyteller" : "Perform: Oratory",
	"drummer" : "Perform: Percussion Instruments",
	"singer" : "Perform: Sing",
	"fiddler" : "Perform: String Instruments",
	"troubadour" : "Perform: String Instruments",
	"minstrel" : "Perform: String Instruments",
	"hornblower" : "Perform: Wind Instruments",
	"fluter" : "Perform: Wind Instruments",
	"trumpetist" : "Perform: Wind Instruments",
	"organist" : "Perform: Keyboard Instruments",
	"apothecary" : "Profession: Apothecary",
	"astronomer" : "Profession: Astronomy",
	"boater" : "Profession: Boater",
	"bookkeeper" : "Profession: Bookkeeper",
	"brewer" : "Profession: Brewer",
	"butcher" : "Profession: Butcher",
	"butler" : "Profession: Butler",
	"cartographer" : "Profession: Cartographer",
	"cook" : "Profession: Cook",
	"driver" : "Profession: Driver",
	"farmer" : "Profession: Farmer",
	"peasant" : "Profession: Farmer",
	"fisher" : "Profession: Fisher",
	"fisherman" : "Profession: Fisher",
	"guide" : "Profession: Guide",
	"herbalist" : "Profession: Herbalist",
	"herder" : "Profession: Herder",
	"hunter" : "Profession: Hunter",
	"innkeeper" : "Profession: Innkeeper",
	"lumberjack" : "Profession: Lumberjack",
	"miller" : "Profession: Miller",
	"miner" : "Profession: Miner",
	"prostitute" : "Profession: Prostitute",
	"whore" : "Profession: Prostitute",
	"courtisan" : "Profession: Prostitute",
	"jiggalo" : "Profession: Prostitute",
	"rancher" : "Profession: Rancher",
	"sailor" : "Profession: Sailor",
	"seaman" : "Profession: Sailor",
	"scribe" : "Profession: Scribe",
	"tanner" : "Profession: Tanner",
	"teamster" : "Profession: Teamster",
	"woodcutter" : "Profession: Woodcutter",	
	"woodsman" : "Profession: Woodcutter",	
	"messenger" : "Ride",
	"pickpocket" : "Sleight of Hand",
	"translator" : "Speak Language",
	"interpreter" : "Speak Language",
	"acrobat" : "Tumble",
	"painter" : "Profession: Artist",
	"sculpter" : "Profession: Artist",
}



/**
 * Known skills
 */
var skillList = [
	"Appraise",
	"Autohypnosis",
	"Balance",
	"Bluff",
	"Climb",
	"Concentration",
	"Craft: Alchemy",
	"Craft: Armoursmithing",
	"Craft: Blacksmithing",
	"Craft: Bowmaking",
	"Craft: Leatherworking",
	"Craft: Masonry",
	"Craft: Poison",
	"Craft: Shipbuilding", 
	"Craft: Tailoring",
	"Craft: Weaponsmithing",
	"Craft: Woodworking",
	"Decipher Script",
	"Diplomacy",
	"Disable Device",
	"Disguise",
	"Escape Artist",
	"Forgery",
	"Gather Information",
	"Handle Animal",
	"Heal",
	"Hide",
	"Intimidate",
	"Jump",
	"Knowledge: Arcana",
	"Knowledge: Architecture and Engineering",
	"Knowledge: Dungeoneering",
	"Knowledge: Geography",
	"Knowledge: History",
	"Knowledge: Local",
	"Knowledge: Nature",
	"Knowledge: Nobility and Royalty",
	"Knowledge: Psionics",
	"Knowledge: Religion",
	"Knowledge: The Planes",
	"Listen",
	"Move Silently",
	"Open Lock",
	"Perform: Act",
	"Perform: Comedy",
	"Perform: Dance",
	"Perform: Juggle",
	"Perform: Keyboard Instruments",
	"Perform: Oratory",
	"Perform: Percussion Instruments",
	"Perform: Sing",
	"Perform: String Instruments",
	"Perform: Wind Instruments",
	"Profession: Apothecary",
	"Profession: Artist",
	"Profession: Astronomer",
	"Profession: Boater",
	"Profession: Bookkeeper",
	"Profession: Brewer",
	"Profession: Butcher",
	"Profession: Butler",
	"Profession: Cartographer",
	"Profession: Cook",
	"Profession: Driver",
	"Profession: Farmer",
	"Profession: Fisher",
	"Profession: Guide",
	"Profession: Herbalist",
	"Profession: Herder",
	"Profession: Hunter",
	"Profession: Innkeeper",
	"Profession: Lumberjack",
	"Profession: Miller",
	"Profession: Miner",
	"Profession: Prostitute",
	"Profession: Rancher",
	"Profession: Sailor",
	"Profession: Scribe",
	"Profession: Tanner",
	"Profession: Teamster",
	"Profession: Woodcutter",
	"Ride",
	"Search",
	"Sense Motive",
	"Sleight of Hand",
	"Speak Language",
	"Spellcraft",
	"Spot",
	"Survival",
	"Swim",
	"Tumble",
	"Use Magic Device",
	"Use Rope",
];

function getSkillAbility(skillName) {
	
	skillName = $.trim(skillName.toLowerCase());
	
	switch(skillName) {
		
		case "climb":
		case "jump":
		case "swim":
			return "strength";
		case "balance":
		case "disable device":
		case "escape artist":
		case "hide":
		case "move silently":
		case "open lock":
		case "ride":
		case "sleight of hand":
		case "tumble":
		case "use rope":
			return "dexterity";
		case "concentration":
			return "constitution";
		case "appraise":
		case "craft: alchemy":
		case "craft: armoursmithing":
		case "craft: blacksmithing":
		case "craft: bowmaking":
		case "craft: leatherworking":
		case "craft: masonry":
		case "craft: poison":
		case "craft: shipbuilding": 
		case "craft: tailoring":
		case "craft: weaponsmithing":
		case "craft: woodworking":
		case "decipher script":
		case "forgery":
		case "knowledge: arcana":
		case "knowledge: architecture and engineering":
		case "knowledge: dungeoneering":
		case "knowledge: geography":
		case "knowledge: history":
		case "knowledge: local":
		case "knowledge: nature":
		case "knowledge: nobility and royalty":
		case "knowledge: psionics":
		case "knowledge: religion":
		case "knowledge: the planes":
		case "search":
		case "speak language":
		case "spellcraft":
			return "intelligence";
		case "autohypnosis":
		case "heal":
		case "listen":
		case "profession: apothecary":
		case "profession: artist":
		case "profession: astronomer":
		case "profession: boater":
		case "profession: bookkeeper":
		case "profession: butcher":
		case "profession: brewer":
		case "profession: butler":
		case "profession: cartographer":
		case "profession: cook":
		case "profession: driver":
		case "profession: farmer":
		case "profession: fisher":
		case "profession: guide":
		case "profession: herbalist":
		case "profession: herder":
		case "profession: hunter":
		case "profession: innkeeper":
		case "profession: lumberjack":
		case "profession: miller":
		case "profession: miner":
		case "profession: prostitute":
		case "profession: rancher":
		case "profession: sailor":
		case "profession: scribe":
		case "profession: tanner":
		case "profession: teamster":
		case "profession: woodcutter":
		case "sense motive":
		case "spot":
		case "survival":
			return "wisdom";
		case "bluff":
		case "diplomacy":
		case "disguise":
		case "gather information":
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
			return "charisma";
	}
	return "unknown";
}

/**
 * Gives COMPLETE synergy skill bonus ONLY (i.e. conditionals are NOT included)
 */
function getSynergyBonus(skillToBoost, skillThatGives) {
	
	skillToBoost = $.trim(skillToBoost.toLowerCase());
	skillThatGives = $.trim(skillThatGives.toLowerCase());
	
	var returnvalue = 0;
	
	switch(skillThatGives) {
		case "autohypnosis":
			switch(skillToBoost) {
				case "knowledge: psionics":
					returnvalue = 2;
			}
			break;
		case "bluff":
			switch(skillToBoost) {
				case "diplomacy":
				case "intimidate":
				case "sleight of hand":
					returnvalue = 2;
			}
			break;
		case "concentration":
			switch(skillToBoost) {
				case "autohypnosis":
					returnvalue = 2;
			}
			break;
		case "handle animal":
			switch(skillToBoost) {
				case "ride":
					returnvalue = 2;
			}
			break;
		case "jump":
			switch(skillToBoost) {
				case "tumble":
					returnvalue = 2;
			}
			break;
		case "knowledge: arcana":
			switch(skillToBoost) {
				case "spellcraft":
					returnvalue = 2;
			}
			break;
		case "knowledge: local":
			switch(skillToBoost) {
				case "gather information":
					returnvalue = 2;
			}
			break;
		case "knowledge: nobility and royalty":
			switch(skillToBoost) {
				case "diplomacy":
					returnvalue = 2;
			}
			break;
		case "knowledge: psionics":
			switch(skillToBoost) {
				case "spellcraft":
					returnvalue = 2;
			}
			break;
		case "sense motive":
			switch(skillToBoost) {
				case "diplomacy":
					returnvalue = 2;
			}
			break;
		case "survival":
			switch(skillToBoost) {
				case "knowledge: nature":
					returnvalue = 2;
			}
			break;
		case "tumble":
			switch(skillToBoost) {
				case "balance":
				case "jump":
					returnvalue = 2;
			}
			break;
	}
	
	return returnvalue;
}

/**
 * Gives CONDITIONAL synergy skill bonus ONLY (i.e. complete bonusses are NOT included)
 */
function getConditionalSynergyBonus(skillToBoost, skillThatGives) {

	skillToBoost = $.trim(skillToBoost.toLowerCase());
	skillThatGives = $.trim(skillThatGives.toLowerCase());


	switch(skillThatGives) {
		case "bluff":
			switch(skillToBoost) {
				case "disguise":
					return "+2 Synergy on checks to Act in character.";
			}
			break;
		case "decipher script":
			switch(skillToBoost) {
				case "use magic device":
					return "+2 Synergy on checks involving scrolls.";
			}
			break;
		case "escape artist":
			switch(skillToBoost) {
				case "use rope":
					return "+2 Synergy on checks involving bindings.";
			}
			break;
		case "knowledge: architecture and engineering":
			switch(skillToBoost) {
				case "search":
					return "+2 Synergy on search checks involving secret doors and similar compartments.";
			}
			break;
		case "knowledge: dungeoneering":
			switch(skillToBoost) {
				case "survival":
					return "+2 Synergy on checks when underground.";
			}
			break;
		case "knowledge: geography":
			switch(skillToBoost) {
				case "survival":
					return "+2 Synergy on checks to keep from getting lost or for avoiding hazards.";
			}
			break;
		case "knowledge: nature":
			switch(skillToBoost) {
				case "survival":
					return "+2 Synergy on checks in above ground, natural environments.";
			}
			break;
		case "knowledge: the planes":
			switch(skillToBoost) {
				case "survival":
					return "+2 Synergy on checks when on other planes.";
			}
			break;
		case "search":
			switch(skillToBoost) {
				case "survival":
					return "+2 Synergy on checks when following tracks.";
			}
			break;
		case "spellcraft":
			switch(skillToBoost) {
				case "use magic device":
					return "+2 Synergy on checks involving scrolls.";
				case "use psionic device":
					return "+2 Synergy on checks involving power stones.";
			}
			break;
		case "use magic device":
			switch(skillToBoost) {
				case "spellcraft":
					return "+2 Synergy on checks to decipher scrolls.";
				case "psicraft":
					return "+2 Synergy on checks to address power stones.";
			}
			break;
		case "use rope":
			switch(skillToBoost) {
				case "climb":
					return "+2 Synergy on checks involving climbing ropes.";
				case "escape artist":
					return "+2 Synergy on checks involving ropes.";
			}
			break;
		case "psicraft":
			switch(skillToBoost) {
				case "use magic device":
					return "+2 Synergy on checks involving scrolls.";
				case "use psionic device":
					return "+2 Synergy on checks involving power stones.";
			}
			break;
		case "use psionic device":
			switch(skillToBoost) {
				case "spellcraft":
					return "+2 Synergy on checks to decipher scrolls.";
				case "psicraft":
					return "+2 Synergy on checks to address power stones.";
			}
			break;
	}
	
	return "";
}

function getBaseBonusFeats(skillName) {
	skillName = $.trim(skillName.toLowerCase());
	
	switch(skillName) {
		case "appraise":
			return [ "Diligent" ];
		case "autohypnosis":
			return [ "Autonomous" ];
		case "balance":
			return [ "Agile" ];
		case "bluff":
			return [ "Persuasive" ];
		case "climb":
			return [ "Athletic" ];
		case "decipher script":
			return [ "Diligent" ];
		case "diplomacy":
			return [ "Negotiator" ];
		case "disable device":
			return [ "Nimble Fingers" ];
		case "disguise":
			return [ "Deceitful" ];
		case "escape artist":
			return [ "Agile" ];
		case "forgery":
			return [ "Deceitful" ];
		case "gather information":
			return [ "Investigator" ];
		case "handle animal":
			return [ "Animal Affinity" ];
		case "heal":
			return [ "Self-Sufficient" ];
		case "hide":
			return [ "Stealthy" ];
		case "intimidate":
			return [ "Persuasive" ];
		case "jump":
			return [ "Acrobatic" ];
		case "knowledge: psionics":
			return [ "Autonomous" ];
		case "listen":
			return [ "Alertness" ];
		case "move silently":
			return [ "Stealthy" ];
		case "open lock":
			return [ "Nimble Fingers" ];
		case "ride":
			return [ "Animal Affinity" ];
		case "search":
			return [ "Investigator" ];
		case "sense motive":
			return [ "Negotiator" ];
		case "sleight of hand":
			return [ "Deft Hands" ];
		case "spellcraft":
			return [ "Magical Aptitude", "Psionic Affinity" ];
		case "spot":
			return [ "Alertness" ];
		case "survival":
			return [ "Self-Sufficient" ];
		case "swim":
			return [ "Athletic" ];
		case "tumble":
			return [ "Acrobatic" ];
		case "use magic device":
			return [ "Magical Aptitude", "Psionic Affinity" ];
		case "use rope":
			return [ "Deft Hands" ];
		
	}
	return [];	
}

function isACPSkill(skillName) {
	skillName = $.trim(skillName.toLowerCase());
	
	switch(skillName) {
		case "balance":
		case "climb":
		case "escape artist":
		case "hide":
		case "jump":
		case "move silently":
		case "sleight of hand":
		case "swim":
		case "tumble":
			return true;
	}
	
	return false;
}

var HIGH_SAVE = 1;
var LOW_SAVE = 0;

var HIGH_BAB = 2;
var MED_BAB = 1;
var LOW_BAB = 0;

var classData = {
	"adept" : 				{ hp : 6, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"aristocrat" : 			{ hp : 8, 	sp : 4,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"barbarian" : 			{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"bard" : 				{ hp : 6, 	sp : 6,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"cleric" : 				{ hp : 8, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"commoner" : 			{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : LOW_BAB, },
	"druid" : 				{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"expert" : 				{ hp : 6, 	sp : 6,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"fighter" :				{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"monk" : 				{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"paladin" : 				{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"psychic warrior" : 		{ hp : 8, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : MED_BAB, },
	"ranger" : 				{ hp : 8, 	sp : 6,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"rogue" : 				{ hp : 6, 	sp : 8,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : MED_BAB, },
	"sorcerer" : 			{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"soul knife" : 			{ hp : 10, 	sp : 4,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"warrior" : 				{ hp : 8, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"wilder" : 				{ hp : 6, 	sp : 4,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"wizard" : 				{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },

	"beguiler" :			{ hp : 6,	sp : 6,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack: LOW_BAB, },
	"dragon shaman (black)" :	{ hp : 10,	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"dragon shaman (blue)" :	{ hp : 10,	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"dragon shaman (brass)" :	{ hp : 10,	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"dragon shaman (bronze)" :	{ hp : 10,	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"dragon shaman (copper)" :	{ hp : 10,	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"dragon shaman (gold)" :	{ hp : 10,	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"dragon shaman (green)" :	{ hp : 10,	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"dragon shaman (red)" :		{ hp : 10,	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"dragon shaman (silver)" :	{ hp : 10,	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"dragon shaman (white)" :	{ hp : 10,	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"duskblade" : 			{ hp : 8, 	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : HIGH_BAB, },
	"knight" :			{ hp : 12,	sp : 2, fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : HIGH_BAB, },

	"wizard (abjurer)" : 		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"wizard (conjurer)" : 		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"wizard (diviner)" : 		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"wizard (enchanter)" : 		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"wizard (evoker)" : 		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"wizard (illusionist)" : 		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"wizard (necromancer)" : 	{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"wizard (transmuter)" : 		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },

	"psion (seer)" : 			{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"psion (shaper)" : 		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"psion (kineticist)" : 		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"psion (egoist)" : 			{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"psion (nomad)" : 		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"psion (telepath)" : 		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },

	"fallen cleric" : 			{ hp : 8, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"fallen druid" : 			{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"fallen paladin" : 			{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"fallen dragon shaman" :		{ hp : 10,	sp : 2, fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"fallen knight" :			{ hp : 12,	sp : 2, fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : HIGH_BAB, },
	
	"barbarian (hunter)" : 			{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"barbarian (ape totem)" : 	{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"barbarian (bear totem)" : 	{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"barbarian (boar totem)" : 	{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"barbarian (dragon totem)" : 	{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"barbarian (eagle totem)" : 	{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"barbarian (horse totem)" : 	{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"barbarian (jaguar totem)" : 	{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"barbarian (lion totem)" : 	{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"barbarian (serpent totem)" : 	{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"barbarian (wolf totem)" : 	{ hp : 12, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },

	"bard (divine)" : 				{ hp : 6, 	sp : 6,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"bard (druidic)" : 				{ hp : 6, 	sp : 6,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"bard (sage)" : 				{ hp : 6, 	sp : 6,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"bard (savage)" : 				{ hp : 6, 	sp : 6,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },

	"cleric (cloistered)" : 	{ hp : 6, 	sp : 6,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"cleric (champion)" : 		{ hp : 8, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"fallen cleric (cloistered)" : 	{ hp : 6, 	sp : 6,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"fallen cleric (champion)" : 		{ hp : 8, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },

	"druid (avenger)" : 				{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"druid (hunter)" : 				{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"fallen druid (avenger)" : 			{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"fallen druid (hunter)" : 			{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"druid (shifter)" : 				{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"fallen druid (shifter)" : 			{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },

	"fighter (thug)" :		{ hp : 10, sp : 4, fortitude: HIGH_SAVE, reflex: LOW_SAVE, will:LOW_SAVE, attack : HIGH_BAB, },
	"fighter (sneak attack)" :		{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"fighter (sneak attack and thug)" :	{ hp : 10, sp : 4, fortitude: HIGH_SAVE, reflex: LOW_SAVE, will:LOW_SAVE, attack : HIGH_BAB, },

	"monk (cobra strike style)" : 		{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"monk (denying stance style)" : 	{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"monk (hand and foot style)" : 	{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"monk (invisible eye style)" : 		{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"monk (overwhelming attack style)" : 	{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"monk (passive way style)" : 		{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"monk (sleeping tiger style)" : 	{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"monk (undying way style)" : 		{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"monk (tough)" : 				{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },

	"paladin (tyranny)" : 				{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"fallen paladin (tyranny)" : 			{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"paladin (freedom)" : 				{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"fallen paladin (freedom)" : 			{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"paladin (slaughter)" : 				{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"fallen paladin (slaughter)" : 			{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"paladin (hunter)" : 				{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"fallen paladin (hunter)" : 			{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },

	"ranger (planar)" : 				{ hp : 8, 	sp : 6,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"ranger (urban)" : 				{ hp : 8, 	sp : 6,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"ranger (shifter)" : 				{ hp : 8, 	sp : 6,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },

	"rogue (wilderness)" : 				{ hp : 6, 	sp : 8,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : MED_BAB, },
	"rogue (warrior)" : 				{ hp : 6, 	sp : 8,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : MED_BAB, },

	"sorcerer (battle)" : 			{ hp : 8, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"sorcerer (animal companion)" : 	{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },

	"wizard (animal companion)" :		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"wizard (warrior)" :			{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"wizard (domain)" : 			{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },


	"arcane archer" :			{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"arcane trickster" :		{ hp : 4, 	sp : 4,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"archmage" :			{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"assassin" :				{ hp : 6, 	sp : 4,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : MED_BAB, },
	"blackguard" :			{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"cerebremancer" :		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"dragon disciple" :		{ hp : 12, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"duelist" :				{ hp : 10, 	sp : 4,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"dwarven defender" :		{ hp : 12, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : HIGH_BAB, },
	"eldritch knight" :			{ hp : 6, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"elocator" :				{ hp : 6, 	sp : 6,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"hierophant" :			{ hp : 8, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"horizon walker" :			{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"loremaster" :			{ hp : 4, 	sp : 4,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"metamind" :			{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"mystic theurge" :		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"psion uncarnate" :		{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"psionic fist" :			{ hp : 6, 	sp : 4,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"pyrokineticist" :			{ hp : 8, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : MED_BAB, },
	"shadowdancer" :			{ hp : 8, 	sp : 6,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : MED_BAB, },
	"slayer" :				{ hp : 8, 	sp : 4,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : HIGH_BAB, },
	"thaumaturgist" :			{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"thrallherd" :			{ hp : 4, 	sp : 2,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : LOW_BAB, },
	"war mind" :			{ hp : 10, 	sp : 2,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },

	"dwarf paragon" :		{ hp : 10,	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"elf paragon" :			{ hp : 8,	sp : 2,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : MED_BAB, },
	"gnome paragon" :		{ hp : 6,	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"half-elf paragon" :		{ hp : 8,	sp : 4,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : MED_BAB, },
	"half-orc paragon" :		{ hp : 8,	sp : 4,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },
	"halfling paragon" :		{ hp : 6,	sp : 4,	fortitude: LOW_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : MED_BAB, },
	"human paragon" :		{ hp : 8,	sp : 4,	fortitude: LOW_SAVE,	reflex: LOW_SAVE,	will: HIGH_SAVE,	attack : MED_BAB, },
	"orc paragon" :			{ hp : 10,	sp : 2,	fortitude: HIGH_SAVE,	reflex: LOW_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },

	"hauwk rider" :			{ hp : 8, 	sp : 4,	fortitude: HIGH_SAVE,	reflex: HIGH_SAVE,	will: LOW_SAVE,	attack : HIGH_BAB, },

};

var classAbilities = {
	"adept" : {
		1 : [],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	"aristocrat" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"barbarian" : {
		1 : [ "Fast Movement", "Rage 1x/day" ],
		2 : [ "Fast Movement", "Rage 1x/day", "Uncanny Dodge" ],
		3 : [ "Fast Movement", "Rage 1x/day", "Uncanny Dodge" ],
		4 : [ "Fast Movement", "Rage 2x/day", "Uncanny Dodge" ],
		5 : [ "Fast Movement", "Rage 2x/day", "Improved Uncanny Dodge" ],
		6 : [ "Fast Movement", "Rage 2x/day", "Improved Uncanny Dodge" ],
		7 : [ "Fast Movement", "Rage 2x/day", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
		8 : [ "Fast Movement", "Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
		9 : [ "Fast Movement", "Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
		10 : [ "Fast Movement", "Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
		11 : [ "Fast Movement", "Greater Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
		12 : [ "Fast Movement", "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
		13 : [ "Fast Movement", "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
		14 : [ "Fast Movement", "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
		15 : [ "Fast Movement", "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
		16 : [ "Fast Movement", "Greater Rage 5x/day", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
		17 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
		18 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
		19 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 5/-" ],
		20 : [ "Fast Movement", "Mighty Rage 6x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 5/-" ],
	},
	"bard" : {
		1 : [ "Bardic Music 1x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1" ],
		2 : [ "Bardic Music 2x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1" ],
		3 : [ "Bardic Music 3x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence" ],
		4 : [ "Bardic Music 4x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence" ],
		5 : [ "Bardic Music 5x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence" ],
		6 : [ "Bardic Music 6x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence", "Suggestion" ],
		7 : [ "Bardic Music 7x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence", "Suggestion" ],
		8 : [ "Bardic Music 8x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Suggestion" ],
		9 : [ "Bardic Music 9x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion" ],
		10 : [ "Bardic Music 10x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion" ],
		11 : [ "Bardic Music 11x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion", ],
		12 : [ "Bardic Music 12x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion", "Song of Freedom" ],
		13 : [ "Bardic Music 13x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion", "Song of Freedom" ],
		14 : [ "Bardic Music 14x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Suggestion", "Song of Freedom" ],
		15 : [ "Bardic Music 15x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Song of Freedom" ],
		16 : [ "Bardic Music 16x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Song of Freedom" ],
		17 : [ "Bardic Music 17x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Song of Freedom" ],
		18 : [ "Bardic Music 18x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
		19 : [ "Bardic Music 19x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
		20 : [ "Bardic Music 20x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +4", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
	},
	"beguiler" : {
		1 : [ "Trapfinding" ],
		2 : [ "Trapfinding", "Cloaked Casting +1 DC", "Surpise Casting" ],
		3 : [ "Trapfinding", "Cloaked Casting +1 DC", "Surpise Casting" ],
		4 : [ "Trapfinding", "Cloaked Casting +1 DC", "Surpise Casting" ],
		5 : [ "Trapfinding", "Cloaked Casting +1 DC", "Surpise Casting" ],
		6 : [ "Trapfinding", "Cloaked Casting +1 DC", "Surpise Casting (Move Action)" ],
		7 : [ "Trapfinding", "Cloaked Casting +1 DC", "Surpise Casting (Move Action)" ],
		8 : [ "Trapfinding", "Cloaked Casting +1 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		9 : [ "Trapfinding", "Cloaked Casting +1 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		10 : [ "Trapfinding", "Cloaked Casting +1 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		11 : [ "Trapfinding", "Cloaked Casting +1 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		12 : [ "Trapfinding", "Cloaked Casting +1 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		13 : [ "Trapfinding", "Cloaked Casting +1 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		14 : [ "Trapfinding", "Cloaked Casting +2 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		15 : [ "Trapfinding", "Cloaked Casting +2 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		16 : [ "Trapfinding", "Cloaked Casting +2 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		17 : [ "Trapfinding", "Cloaked Casting +2 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		18 : [ "Trapfinding", "Cloaked Casting +2 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		19 : [ "Trapfinding", "Cloaked Casting +2 DC", "Cloaked Casting +2 vs SR", "Surpise Casting (Move Action)" ],
		20 : [ "Trapfinding", "Cloaked Casting +2 DC", "Cloaked Casting Overcomes SR", "Surpise Casting (Move Action)" ],
	},
	"cleric" : {
		1 : [ "Aura" ],
		2 : [ "Aura" ],
		3 : [ "Aura" ],
		4 : [ "Aura" ],
		5 : [ "Aura" ],
		6 : [ "Aura" ],
		7 : [ "Aura" ],
		8 : [ "Aura" ],
		9 : [ "Aura" ],
		10 : [ "Aura" ],
		11 : [ "Aura" ],
		12 : [ "Aura" ],
		13 : [ "Aura" ],
		14 : [ "Aura" ],
		15 : [ "Aura" ],
		16 : [ "Aura" ],
		17 : [ "Aura" ],
		18 : [ "Aura" ],
		19 : [ "Aura" ],
		20 : [ "Aura" ],
	},
	"commoner" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"dragon shaman (black)" : {
		1 : [ "Dragon Aura +1" ],
                2 : [ "Dragon Aura +1" ],
                3 : [ "Dragon Aura +1", "Draconic Adaptation: Water Breathing" ],
                4 : [ "Dragon Aura +1", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Acid (2d6)", "Draconic Resolve" ],
                5 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Acid (2d6)", "Draconic Resolve" ],
                6 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Acid (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                7 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Acid (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                8 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Acid (4d6)", "Draconic Resolve", "Touch of Vitality" ],
                9 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Acid (4d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                10 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Acid (5d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                11 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Acid (5d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                12 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 60-ft. Line of Acid (6d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                13 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Acid (6d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                14 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Acid (7d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                15 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Acid (7d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                16 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Acid (8d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                17 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Acid (8d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                18 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Acid (9d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                19 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Acid (9d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
                20 : [ "Dragon Aura +5", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 120-ft. Line of Acid (10d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
	},
	"dragon shaman (blue)" : {
                1 : [ "Dragon Aura +1" ],
                2 : [ "Dragon Aura +1" ],
                3 : [ "Dragon Aura +1", "Draconic Adaptation: Ventriloquism" ],
                4 : [ "Dragon Aura +1", "Draconic Adaptation: Ventriloquism", "Breath Weapon: 30-ft. Line of Electricity (2d6)", "Draconic Resolve" ],
                5 : [ "Dragon Aura +2", "Draconic Adaptation: Ventriloquism", "Breath Weapon: 30-ft. Line of Electricity (2d6)", "Draconic Resolve" ],
                6 : [ "Dragon Aura +2", "Draconic Adaptation: Ventriloquism", "Breath Weapon: 30-ft. Line of Electricity (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                7 : [ "Dragon Aura +2", "Draconic Adaptation: Ventriloquism", "Breath Weapon: 30-ft. Line of Electricity (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                8 : [ "Dragon Aura +2", "Draconic Adaptation: Ventriloquism", "Breath Weapon: 30-ft. Line of Electricity (4d6)", "Draconic Resolve", "Touch of Vitality" ],
                9 : [ "Dragon Aura +2", "Draconic Adaptation: Ventriloquism", "Breath Weapon: 30-ft. Line of Electricity (4d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity" ],
                10 : [ "Dragon Aura +3", "Draconic Adaptation: Ventriloquism", "Breath Weapon: 30-ft. Line of Electricity (5d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity" ],
                11 : [ "Dragon Aura +3", "Draconic Adaptation: Ventriloquism", "Breath Weapon: 30-ft. Line of Electricity (5d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity" ],
                12 : [ "Dragon Aura +3", "Draconic Adaptation: Ventriloquism", "Breath Weapon: 60-ft. Line of Electricity (6d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity" ],
                13 : [ "Dragon Aura +3", "Draconic Adaptation: Ventriloquism (shareable)", "Breath Weapon: 60-ft. Line of Electricity (6d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity" ],
                14 : [ "Dragon Aura +3", "Draconic Adaptation: Ventriloquism (shareable)", "Breath Weapon: 60-ft. Line of Electricity (7d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit" ],
                15 : [ "Dragon Aura +4", "Draconic Adaptation: Ventriloquism (shareable)", "Breath Weapon: 60-ft. Line of Electricity (7d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit" ],
                16 : [ "Dragon Aura +4", "Draconic Adaptation: Ventriloquism (shareable)", "Breath Weapon: 60-ft. Line of Electricity (8d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit" ],
                17 : [ "Dragon Aura +4", "Draconic Adaptation: Ventriloquism (shareable)", "Breath Weapon: 60-ft. Line of Electricity (8d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit" ],
                18 : [ "Dragon Aura +4", "Draconic Adaptation: Ventriloquism (shareable)", "Breath Weapon: 60-ft. Line of Electricity (9d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit" ],
                19 : [ "Dragon Aura +4", "Draconic Adaptation: Ventriloquism (shareable)", "Breath Weapon: 60-ft. Line of Electricity (9d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
                20 : [ "Dragon Aura +5", "Draconic Adaptation: Ventriloquism (shareable)", "Breath Weapon: 120-ft. Line of Electricity (10d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
	},
	"dragon shaman (brass)" : {
                1 : [ "Dragon Aura +1" ],
                2 : [ "Dragon Aura +1" ],
                3 : [ "Dragon Aura +1", "Draconic Adaptation: Endure Elements" ],
                4 : [ "Dragon Aura +1", "Draconic Adaptation: Endure Elements", "Breath Weapon: 30-ft. Line of Fire (2d6)", "Draconic Resolve" ],
                5 : [ "Dragon Aura +2", "Draconic Adaptation: Endure Elements", "Breath Weapon: 30-ft. Line of Fire (2d6)", "Draconic Resolve" ],
                6 : [ "Dragon Aura +2", "Draconic Adaptation: Endure Elements", "Breath Weapon: 30-ft. Line of Fire (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                7 : [ "Dragon Aura +2", "Draconic Adaptation: Endure Elements", "Breath Weapon: 30-ft. Line of Fire (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                8 : [ "Dragon Aura +2", "Draconic Adaptation: Endure Elements", "Breath Weapon: 30-ft. Line of Fire (4d6)", "Draconic Resolve", "Touch of Vitality" ],
                9 : [ "Dragon Aura +2", "Draconic Adaptation: Endure Elements", "Breath Weapon: 30-ft. Line of Fire (4d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                10 : [ "Dragon Aura +3", "Draconic Adaptation: Endure Elements", "Breath Weapon: 30-ft. Line of Fire (5d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                11 : [ "Dragon Aura +3", "Draconic Adaptation: Endure Elements", "Breath Weapon: 30-ft. Line of Fire (5d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                12 : [ "Dragon Aura +3", "Draconic Adaptation: Endure Elements", "Breath Weapon: 60-ft. Line of Fire (6d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                13 : [ "Dragon Aura +3", "Draconic Adaptation: Endure Elements (shareable)", "Breath Weapon: 60-ft. Line of Fire (6d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                14 : [ "Dragon Aura +3", "Draconic Adaptation: Endure Elements (shareable)", "Breath Weapon: 60-ft. Line of Fire (7d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                15 : [ "Dragon Aura +4", "Draconic Adaptation: Endure Elements (shareable)", "Breath Weapon: 60-ft. Line of Fire (7d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                16 : [ "Dragon Aura +4", "Draconic Adaptation: Endure Elements (shareable)", "Breath Weapon: 60-ft. Line of Fire (8d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                17 : [ "Dragon Aura +4", "Draconic Adaptation: Endure Elements (shareable)", "Breath Weapon: 60-ft. Line of Fire (8d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                18 : [ "Dragon Aura +4", "Draconic Adaptation: Endure Elements (shareable)", "Breath Weapon: 60-ft. Line of Fire (9d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                19 : [ "Dragon Aura +4", "Draconic Adaptation: Endure Elements (shareable)", "Breath Weapon: 60-ft. Line of Fire (9d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
                20 : [ "Dragon Aura +5", "Draconic Adaptation: Endure Elements (shareable)", "Breath Weapon: 120-ft. Line of Fire (10d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
	},
	"dragon shaman (bronze)" : {
                1 : [ "Dragon Aura +1" ],
                2 : [ "Dragon Aura +1" ],
                3 : [ "Dragon Aura +1", "Draconic Adaptation: Water Breathing" ],
                4 : [ "Dragon Aura +1", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Electricity (2d6)", "Draconic Resolve" ],
                5 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Electricity (2d6)", "Draconic Resolve" ],
                6 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Electricity (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                7 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Electricity (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                8 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Electricity (4d6)", "Draconic Resolve", "Touch of Vitality" ],
                9 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Electricity (4d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity" ],
                10 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Electricity (5d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity" ],
                11 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Line of Electricity (5d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity" ],
                12 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 60-ft. Line of Electricity (6d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity" ],
                13 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Electricity (6d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity" ],
                14 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Electricity (7d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit" ],
                15 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Electricity (7d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit" ],
                16 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Electricity (8d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit" ],
                17 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Electricity (8d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit" ],
                18 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Electricity (9d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit" ],
                19 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Line of Electricity (9d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
                20 : [ "Dragon Aura +5", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 120-ft. Line of Electricity (10d6)", "Draconic Resolve", "Touch of Vitality", "Electricity Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
	},
	"dragon shaman (copper)" : {
                1 : [ "Dragon Aura +1" ],
                2 : [ "Dragon Aura +1" ],
                3 : [ "Dragon Aura +1", "Draconic Adaptation: Spider Climb" ],
                4 : [ "Dragon Aura +1", "Draconic Adaptation: Spider Climb", "Breath Weapon: 30-ft. Line of Acid (2d6)", "Draconic Resolve" ],
                5 : [ "Dragon Aura +2", "Draconic Adaptation: Spider Climb", "Breath Weapon: 30-ft. Line of Acid (2d6)", "Draconic Resolve" ],
                6 : [ "Dragon Aura +2", "Draconic Adaptation: Spider Climb", "Breath Weapon: 30-ft. Line of Acid (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                7 : [ "Dragon Aura +2", "Draconic Adaptation: Spider Climb", "Breath Weapon: 30-ft. Line of Acid (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                8 : [ "Dragon Aura +2", "Draconic Adaptation: Spider Climb", "Breath Weapon: 30-ft. Line of Acid (4d6)", "Draconic Resolve", "Touch of Vitality" ],
                9 : [ "Dragon Aura +2", "Draconic Adaptation: Spider Climb", "Breath Weapon: 30-ft. Line of Acid (4d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                10 : [ "Dragon Aura +3", "Draconic Adaptation: Spider Climb", "Breath Weapon: 30-ft. Line of Acid (5d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                11 : [ "Dragon Aura +3", "Draconic Adaptation: Spider Climb", "Breath Weapon: 30-ft. Line of Acid (5d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                12 : [ "Dragon Aura +3", "Draconic Adaptation: Spider Climb", "Breath Weapon: 60-ft. Line of Acid (6d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                13 : [ "Dragon Aura +3", "Draconic Adaptation: Spider Climb (shareable)", "Breath Weapon: 60-ft. Line of Acid (6d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                14 : [ "Dragon Aura +3", "Draconic Adaptation: Spider Climb (shareable)", "Breath Weapon: 60-ft. Line of Acid (7d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                15 : [ "Dragon Aura +4", "Draconic Adaptation: Spider Climb (shareable)", "Breath Weapon: 60-ft. Line of Acid (7d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                16 : [ "Dragon Aura +4", "Draconic Adaptation: Spider Climb (shareable)", "Breath Weapon: 60-ft. Line of Acid (8d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                17 : [ "Dragon Aura +4", "Draconic Adaptation: Spider Climb (shareable)", "Breath Weapon: 60-ft. Line of Acid (8d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                18 : [ "Dragon Aura +4", "Draconic Adaptation: Spider Climb (shareable)", "Breath Weapon: 60-ft. Line of Acid (9d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                19 : [ "Dragon Aura +4", "Draconic Adaptation: Spider Climb (shareable)", "Breath Weapon: 60-ft. Line of Acid (9d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
                20 : [ "Dragon Aura +5", "Draconic Adaptation: Spider Climb (shareable)", "Breath Weapon: 120-ft. Line of Acid (10d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
	},
	"dragon shaman (gold)" : {
                1 : [ "Dragon Aura +1" ],
                2 : [ "Dragon Aura +1" ],
                3 : [ "Dragon Aura +1", "Draconic Adaptation: Water Breathing" ],
                4 : [ "Dragon Aura +1", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Fire (2d6)", "Draconic Resolve" ],
                5 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Fire (2d6)", "Draconic Resolve" ],
                6 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Fire (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                7 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Fire (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                8 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Fire (4d6)", "Draconic Resolve", "Touch of Vitality" ],
                9 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Fire (4d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                10 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Fire (5d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                11 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Fire (5d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                12 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Cone of Fire (6d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                13 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Fire (6d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                14 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Fire (7d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                15 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Fire (7d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                16 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Fire (8d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                17 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Fire (8d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                18 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Fire (9d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                19 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Fire (9d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
                20 : [ "Dragon Aura +5", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Cone of Fire (10d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
	},
	"dragon shaman (green)" : {
                1 : [ "Dragon Aura +1" ],
                2 : [ "Dragon Aura +1" ],
                3 : [ "Dragon Aura +1", "Draconic Adaptation: Water Breathing" ],
                4 : [ "Dragon Aura +1", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Acid (2d6)", "Draconic Resolve" ],
                5 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Acid (2d6)", "Draconic Resolve" ],
                6 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Acid (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                7 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Acid (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                8 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Acid (4d6)", "Draconic Resolve", "Touch of Vitality" ],
                9 : [ "Dragon Aura +2", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Acid (4d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                10 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Acid (5d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                11 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 15-ft. Cone of Acid (5d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                12 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing", "Breath Weapon: 30-ft. Cone of Acid (6d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                13 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Acid (6d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity" ],
                14 : [ "Dragon Aura +3", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Acid (7d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                15 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Acid (7d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                16 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Acid (8d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                17 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Acid (8d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                18 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Acid (9d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit" ],
                19 : [ "Dragon Aura +4", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 30-ft. Cone of Acid (9d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
                20 : [ "Dragon Aura +5", "Draconic Adaptation: Water Breathing (shareable)", "Breath Weapon: 60-ft. Cone of Acid (10d6)", "Draconic Resolve", "Touch of Vitality", "Acid Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
	},
	"dragon shaman (red)" : {
                1 : [ "Dragon Aura +1" ],
                2 : [ "Dragon Aura +1" ],
                3 : [ "Dragon Aura +1", "Draconic Adaptation: Treasure Seeker" ],
                4 : [ "Dragon Aura +1", "Draconic Adaptation: Treasure Seeker", "Breath Weapon: 15-ft. Cone of Fire (2d6)", "Draconic Resolve" ],
                5 : [ "Dragon Aura +2", "Draconic Adaptation: Treasure Seeker", "Breath Weapon: 15-ft. Cone of Fire (2d6)", "Draconic Resolve" ],
                6 : [ "Dragon Aura +2", "Draconic Adaptation: Treasure Seeker", "Breath Weapon: 15-ft. Cone of Fire (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                7 : [ "Dragon Aura +2", "Draconic Adaptation: Treasure Seeker", "Breath Weapon: 15-ft. Cone of Fire (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                8 : [ "Dragon Aura +2", "Draconic Adaptation: Treasure Seeker", "Breath Weapon: 15-ft. Cone of Fire (4d6)", "Draconic Resolve", "Touch of Vitality" ],
                9 : [ "Dragon Aura +2", "Draconic Adaptation: Treasure Seeker", "Breath Weapon: 15-ft. Cone of Fire (4d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                10 : [ "Dragon Aura +3", "Draconic Adaptation: Treasure Seeker", "Breath Weapon: 15-ft. Cone of Fire (5d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                11 : [ "Dragon Aura +3", "Draconic Adaptation: Treasure Seeker", "Breath Weapon: 15-ft. Cone of Fire (5d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                12 : [ "Dragon Aura +3", "Draconic Adaptation: Treasure Seeker", "Breath Weapon: 30-ft. Cone of Fire (6d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                13 : [ "Dragon Aura +3", "Draconic Adaptation: Treasure Seeker (shareable)", "Breath Weapon: 30-ft. Cone of Fire (6d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity" ],
                14 : [ "Dragon Aura +3", "Draconic Adaptation: Treasure Seeker (shareable)", "Breath Weapon: 30-ft. Cone of Fire (7d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                15 : [ "Dragon Aura +4", "Draconic Adaptation: Treasure Seeker (shareable)", "Breath Weapon: 30-ft. Cone of Fire (7d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                16 : [ "Dragon Aura +4", "Draconic Adaptation: Treasure Seeker (shareable)", "Breath Weapon: 30-ft. Cone of Fire (8d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                17 : [ "Dragon Aura +4", "Draconic Adaptation: Treasure Seeker (shareable)", "Breath Weapon: 30-ft. Cone of Fire (8d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                18 : [ "Dragon Aura +4", "Draconic Adaptation: Treasure Seeker (shareable)", "Breath Weapon: 30-ft. Cone of Fire (9d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit" ],
                19 : [ "Dragon Aura +4", "Draconic Adaptation: Treasure Seeker (shareable)", "Breath Weapon: 30-ft. Cone of Fire (9d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
                20 : [ "Dragon Aura +5", "Draconic Adaptation: Treasure Seeker (shareable)", "Breath Weapon: 60-ft. Cone of Fire (10d6)", "Draconic Resolve", "Touch of Vitality", "Fire Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
	},
	"dragon shaman (silver)" : {
                1 : [ "Dragon Aura +1" ],
                2 : [ "Dragon Aura +1" ],
                3 : [ "Dragon Aura +1", "Draconic Adaptation: Feather Fall" ],
                4 : [ "Dragon Aura +1", "Draconic Adaptation: Feather Fall", "Breath Weapon: 15-ft. Cone of Cold (2d6)", "Draconic Resolve" ],
                5 : [ "Dragon Aura +2", "Draconic Adaptation: Feather Fall", "Breath Weapon: 15-ft. Cone of Cold (2d6)", "Draconic Resolve" ],
                6 : [ "Dragon Aura +2", "Draconic Adaptation: Feather Fall", "Breath Weapon: 15-ft. Cone of Cold (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                7 : [ "Dragon Aura +2", "Draconic Adaptation: Feather Fall", "Breath Weapon: 15-ft. Cone of Cold (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                8 : [ "Dragon Aura +2", "Draconic Adaptation: Feather Fall", "Breath Weapon: 15-ft. Cone of Cold (4d6)", "Draconic Resolve", "Touch of Vitality" ],
                9 : [ "Dragon Aura +2", "Draconic Adaptation: Feather Fall", "Breath Weapon: 15-ft. Cone of Cold (4d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity" ],
                10 : [ "Dragon Aura +3", "Draconic Adaptation: Feather Fall", "Breath Weapon: 15-ft. Cone of Cold (5d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity" ],
                11 : [ "Dragon Aura +3", "Draconic Adaptation: Feather Fall", "Breath Weapon: 15-ft. Cone of Cold (5d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity" ],
                12 : [ "Dragon Aura +3", "Draconic Adaptation: Feather Fall", "Breath Weapon: 30-ft. Cone of Cold (6d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity" ],
                13 : [ "Dragon Aura +3", "Draconic Adaptation: Feather Fall (shareable)", "Breath Weapon: 30-ft. Cone of Cold (6d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity" ],
                14 : [ "Dragon Aura +3", "Draconic Adaptation: Feather Fall (shareable)", "Breath Weapon: 30-ft. Cone of Cold (7d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit" ],
                15 : [ "Dragon Aura +4", "Draconic Adaptation: Feather Fall (shareable)", "Breath Weapon: 30-ft. Cone of Cold (7d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit" ],
                16 : [ "Dragon Aura +4", "Draconic Adaptation: Feather Fall (shareable)", "Breath Weapon: 30-ft. Cone of Cold (8d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit" ],
                17 : [ "Dragon Aura +4", "Draconic Adaptation: Feather Fall (shareable)", "Breath Weapon: 30-ft. Cone of Cold (8d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit" ],
                18 : [ "Dragon Aura +4", "Draconic Adaptation: Feather Fall (shareable)", "Breath Weapon: 30-ft. Cone of Cold (9d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit" ],
                19 : [ "Dragon Aura +4", "Draconic Adaptation: Feather Fall (shareable)", "Breath Weapon: 30-ft. Cone of Cold (9d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
                20 : [ "Dragon Aura +5", "Draconic Adaptation: Feather Fall (shareable)", "Breath Weapon: 60-ft. Cone of Cold (10d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
	},
	"dragon shaman (white)" : {
                1 : [ "Dragon Aura +1" ],
                2 : [ "Dragon Aura +1" ],
                3 : [ "Dragon Aura +1", "Draconic Adaptation: Icewalker" ],
                4 : [ "Dragon Aura +1", "Draconic Adaptation: Icewalker", "Breath Weapon: 15-ft. Cone of Cold (2d6)", "Draconic Resolve" ],
                5 : [ "Dragon Aura +2", "Draconic Adaptation: Icewalker", "Breath Weapon: 15-ft. Cone of Cold (2d6)", "Draconic Resolve" ],
                6 : [ "Dragon Aura +2", "Draconic Adaptation: Icewalker", "Breath Weapon: 15-ft. Cone of Cold (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                7 : [ "Dragon Aura +2", "Draconic Adaptation: Icewalker", "Breath Weapon: 15-ft. Cone of Cold (3d6)", "Draconic Resolve", "Touch of Vitality" ],
                8 : [ "Dragon Aura +2", "Draconic Adaptation: Icewalker", "Breath Weapon: 15-ft. Cone of Cold (4d6)", "Draconic Resolve", "Touch of Vitality" ],
                9 : [ "Dragon Aura +2", "Draconic Adaptation: Icewalker", "Breath Weapon: 15-ft. Cone of Cold (4d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity" ],
                10 : [ "Dragon Aura +3", "Draconic Adaptation: Icewalker", "Breath Weapon: 15-ft. Cone of Cold (5d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity" ],
                11 : [ "Dragon Aura +3", "Draconic Adaptation: Icewalker", "Breath Weapon: 15-ft. Cone of Cold (5d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity" ],
                12 : [ "Dragon Aura +3", "Draconic Adaptation: Icewalker", "Breath Weapon: 30-ft. Cone of Cold (6d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity" ],
                13 : [ "Dragon Aura +3", "Draconic Adaptation: Icewalker (shareable)", "Breath Weapon: 30-ft. Cone of Cold (6d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity" ],
                14 : [ "Dragon Aura +3", "Draconic Adaptation: Icewalker (shareable)", "Breath Weapon: 30-ft. Cone of Cold (7d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit" ],
                15 : [ "Dragon Aura +4", "Draconic Adaptation: Icewalker (shareable)", "Breath Weapon: 30-ft. Cone of Cold (7d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit" ],
                16 : [ "Dragon Aura +4", "Draconic Adaptation: Icewalker (shareable)", "Breath Weapon: 30-ft. Cone of Cold (8d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit" ],
                17 : [ "Dragon Aura +4", "Draconic Adaptation: Icewalker (shareable)", "Breath Weapon: 30-ft. Cone of Cold (8d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit" ],
                18 : [ "Dragon Aura +4", "Draconic Adaptation: Icewalker (shareable)", "Breath Weapon: 30-ft. Cone of Cold (9d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit" ],
                19 : [ "Dragon Aura +4", "Draconic Adaptation: Icewalker (shareable)", "Breath Weapon: 30-ft. Cone of Cold (9d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
                20 : [ "Dragon Aura +5", "Draconic Adaptation: Icewalker (shareable)", "Breath Weapon: 60-ft. Cone of Cold (10d6)", "Draconic Resolve", "Touch of Vitality", "Cold Immunity", "Commune with Dragon Spirit", "Draconic Wings" ],
	},
	"druid" : {
		1 : [ "Animal Companion", "Wild Empathy" ],
		2 : [ "Animal Companion", "Wild Empathy", "Woodland Stride" ],
		3 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
		4 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
		5 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 1x/day" ],
		6 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 2x/day" ],
		7 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 3x/day" ],
		8 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 3x/day, Large" ],
		9 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 3x/day, Large", "Venom Immunity" ],
		10 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 4x/day, Large", "Venom Immunity" ],
		11 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 4x/day, Tiny, Large", "Venom Immunity" ],
		12 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 4x/day, Tiny, Large, Plant", "Venom Immunity" ],
		13 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 4x/day, Tiny, Large, Plant", "Venom Immunity", "A Thousand Faces" ],
		14 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 5x/day, Tiny, Large, Plant", "Venom Immunity", "A Thousand Faces" ],
		15 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 5x/day, Tiny, Large, Huge, Plant", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		16 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 5x/day, Tiny, Large, Huge, Plant", "Elemental Wild Shape 1x/day", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		17 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 5x/day, Tiny, Large, Huge, Plant", "Elemental Wild Shape 1x/day", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		18 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 6x/day, Tiny, Large, Huge, Plant", "Elemental Wild Shape 2x/day", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		19 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 6x/day, Tiny, Large, Huge, Plant", "Elemental Wild Shape 2x/day", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		20 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Wild Shape 6x/day, Tiny, Large, Huge, Plant", "Elemental Wild Shape 3x/day, Huge", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
	},
	"duskblade" : {
		1 : [ "Arcane Attunement" ],
		2 : [ "Arcane Attunement" ],
		3 : [ "Arcane Attunement", "Arcane channeling" ],
		4 : [ "Arcane Attunement", "Arcane channeling" ],
		5 : [ "Arcane Attunement", "Arcane channeling", "Quick cast 1/day" ],
		6 : [ "Arcane Attunement", "Arcane channeling", "Quick cast 1/day", "Spell Power +2" ],
		7 : [ "Arcane Attunement", "Arcane channeling", "Quick cast 1/day", "Spell Power +2" ],
		8 : [ "Arcane Attunement", "Arcane channeling", "Quick cast 1/day", "Spell Power +2" ],
		9 : [ "Arcane Attunement", "Arcane channeling", "Quick cast 1/day", "Spell Power +2" ],
		10 : [ "Arcane Attunement", "Arcane channeling", "Quick cast 2/day", "Spell Power +2" ],
		11 : [ "Arcane Attunement", "Arcane channeling", "Quick cast 2/day", "Spell Power +3" ],
		12 : [ "Arcane Attunement", "Arcane channeling", "Quick cast 2/day", "Spell Power +3" ],
		13 : [ "Arcane Attunement", "Arcane channeling (full attack)", "Quick cast 2/day", "Spell Power +3" ],
		14 : [ "Arcane Attunement", "Arcane channeling (full attack)", "Quick cast 2/day", "Spell Power +3" ],
		15 : [ "Arcane Attunement", "Arcane channeling (full attack)", "Quick cast 3/day", "Spell Power +3" ],
		16 : [ "Arcane Attunement", "Arcane channeling (full attack)", "Quick cast 3/day", "Spell Power +4" ],
		17 : [ "Arcane Attunement", "Arcane channeling (full attack)", "Quick cast 3/day", "Spell Power +4" ],
		18 : [ "Arcane Attunement", "Arcane channeling (full attack)", "Quick cast 3/day", "Spell Power +5" ],
		19 : [ "Arcane Attunement", "Arcane channeling (full attack)", "Quick cast 3/day", "Spell Power +5" ],
		20 : [ "Arcane Attunement", "Arcane channeling (full attack)", "Quick cast 4/day", "Spell Power +5" ],
	},
	"expert" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"fighter" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"knight" : {
		1 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +1", ],
		2 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +1", "Shield Block +1", ],
		3 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +1", "Shield Block +1", "Bulwark of Defense",],
		4 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +1", "Test of Mettle", "Shield Block +1", "Bulwark of Defense", ],
		5 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +1", "Test of Mettle", "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+5 Tumble DC)", ],
		6 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +1", "Test of Mettle", "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+6 Tumble DC)", "Shield Ally", ],
		7 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +2", "Test of Mettle", "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+7 Tumble DC)", "Shield Ally", ],
		8 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +2", "Test of Mettle", "Call to Battle", "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+8 Tumble DC)", "Shield Ally", ],
		9 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +2", "Test of Mettle", "Call to Battle", "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+9 Tumble DC)", "Shield Ally", ],
		10 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +2", "Test of Mettle", "Call to Battle", "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+10 Tumble DC)", "Shield Ally", ],
		11 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +2", "Test of Mettle", "Call to Battle", "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+11 Tumble DC)", "Shield Ally", ],
		12 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +2", "Test of Mettle", "Call to Battle", "Daunting Challenge", "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+12 Tumble DC)", "Shield Ally", ],
		13 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +3", "Test of Mettle", "Call to Battle", "Daunting Challenge", "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+13 Tumble DC)", "Shield Ally", ],
		14 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +3", "Test of Mettle", "Call to Battle", "Daunting Challenge", "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+14 Tumble DC)", "Improved Shield Ally", ],
		15 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +3", "Test of Mettle", "Call to Battle", "Daunting Challenge", "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+15 Tumble DC)", "Improved Shield Ally", ],
		16 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +3", "Test of Mettle", "Call to Battle", "Daunting Challenge", "Bond of Loyalty", "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+16 Tumble DC)", "Improved Shield Ally", ],
		17 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +3", "Test of Mettle", "Call to Battle", "Daunting Challenge", "Bond of Loyalty", "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+17 Tumble DC)", "Improved Shield Ally", "Impetuous Endurance", ],
		18 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +3", "Test of Mettle", "Call to Battle", "Daunting Challenge", "Bond of Loyalty", "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+18 Tumble DC)", "Improved Shield Ally", "Impetuous Endurance", ],
		19 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +4", "Test of Mettle", "Call to Battle", "Daunting Challenge", "Bond of Loyalty", "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+19 Tumble DC)", "Improved Shield Ally", "Impetuous Endurance", ],
		20 : [ "Knight's Code", "Knight's Challenge", "Fighting Challenge +4", "Test of Mettle", "Call to Battle", "Daunting Challenge", "Bond of Loyalty", "Loyal Beyond Death", "Shield Block +3", "Bulwark of Defense", "Vigilant Defender (+20 Tumble DC)", "Improved Shield Ally", "Impetuous Endurance", ],
	},
	"monk" : {
		1 : [ "Flurry of Blows" ],
		2 : [ "Flurry of Blows", "Evasion" ],
		3 : [ "Flurry of Blows", "Evasion" ],
		4 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft." ],
		5 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft.", "Purity of Body" ],
		6 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body" ],
		7 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body", "Wholeness of Body (14 hp)" ],
		8 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (16 hp)" ],
		9 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (18 hp)" ],
		10 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (20 hp)" ],
		11 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (22 hp)", "Diamond Body" ],
		12 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (24 hp)", "Diamond Body", "Abundant Step" ],
		13 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (26 hp)", "Diamond Body", "Diamond Soul (SR 23)", "Abundant Step" ],
		14 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (28 hp)", "Diamond Body", "Diamond Soul (SR 24)", "Abundant Step" ],
		15 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (30 hp)", "Diamond Body", "Diamond Soul (SR 25)", "Abundant Step", "Quivering Palm" ],
		16 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (32 hp)", "Diamond Body", "Diamond Soul (SR 26)", "Abundant Step", "Quivering Palm" ],
		17 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (34 hp)", "Diamond Body", "Diamond Soul (SR 27)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		18 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (36 hp)", "Diamond Body", "Diamond Soul (SR 28)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		19 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (38 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 29)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		20 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall", "Purity of Body", "Wholeness of Body (40 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 30)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon", "Perfect Self"  ],
	},
	"paladin" : {
		1 : [ "Aura of Good", "Detect Evil", "Smite Evil 1x/day" ],
		2 : [ "Aura of Good", "Detect Evil", "Smite Evil 1x/day", "Divine Grace", "Lay on Hands" ],
		3 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 1x/day", "Divine Grace", "Divine Health", "Lay on Hands" ],
		4 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 1x/day", "Divine Grace", "Divine Health", "Lay on Hands" ],
		5 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Special Mount" ],
		6 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 1x/week", "Special Mount" ],
		7 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 1x/week", "Special Mount" ],
		8 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 1x/week", "Special Mount" ],
		9 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 2x/week", "Special Mount" ],
		10 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 2x/week", "Special Mount" ],
		11 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 2x/week", "Special Mount" ],
		12 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 3x/week", "Special Mount" ],
		13 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 3x/week", "Special Mount" ],
		14 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 3x/week", "Special Mount" ],
		15 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 4x/week", "Special Mount" ],
		16 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 4x/week", "Special Mount" ],
		17 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 4x/week", "Special Mount" ],
		18 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 5x/week", "Special Mount" ],
		19 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 5x/week", "Special Mount" ],
		20 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 5x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 5x/week", "Special Mount" ],
	},
	"psychic warrior" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"ranger" : {
		1 : [ "Wild Empathy" ],
		2 : [ "Wild Empathy" ],
		3 : [ "Wild Empathy" ],
		4 : [ "Wild Empathy", "Animal Companion" ],
		5 : [ "Wild Empathy", "Animal Companion" ],
		6 : [ "Wild Empathy", "Animal Companion" ],
		7 : [ "Wild Empathy", "Animal Companion", "Woodland Stride" ],
		8 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker" ],
		9 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion" ],
		10 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion" ],
		11 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion" ],
		12 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion" ],
		13 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage" ],
		14 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage" ],
		15 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage" ],
		16 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage" ],
		17 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight" ],
		18 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight" ],
		19 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight" ],
		20 : [ "Wild Empathy", "Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight" ],
	},
	"rogue" : {
		1 : [ "Trapfinding", "Sneak Attack +1d6" ],
		2 : [ "Trapfinding", "Sneak Attack +1d6", "Evasion" ],
		3 : [ "Trapfinding", "Sneak Attack +2d6", "Evasion" ],
		4 : [ "Trapfinding", "Sneak Attack +2d6", "Evasion", "Uncanny Dodge" ],
		5 : [ "Trapfinding", "Sneak Attack +3d6", "Evasion", "Uncanny Dodge" ],
		6 : [ "Trapfinding", "Sneak Attack +3d6", "Evasion", "Uncanny Dodge" ],
		7 : [ "Trapfinding", "Sneak Attack +4d6", "Evasion", "Uncanny Dodge" ],
		8 : [ "Trapfinding", "Sneak Attack +4d6", "Evasion", "Improved Uncanny Dodge" ],
		9 : [ "Trapfinding", "Sneak Attack +5d6", "Evasion", "Improved Uncanny Dodge" ],
		10 : [ "Trapfinding", "Sneak Attack +5d6", "Evasion", "Improved Uncanny Dodge" ],
		11 : [ "Trapfinding", "Sneak Attack +6d6", "Evasion", "Improved Uncanny Dodge" ],
		12 : [ "Trapfinding", "Sneak Attack +6d6", "Evasion", "Improved Uncanny Dodge" ],
		13 : [ "Trapfinding", "Sneak Attack +7d6", "Evasion", "Improved Uncanny Dodge" ],
		14 : [ "Trapfinding", "Sneak Attack +7d6", "Evasion", "Improved Uncanny Dodge" ],
		15 : [ "Trapfinding", "Sneak Attack +8d6", "Evasion", "Improved Uncanny Dodge" ],
		16 : [ "Trapfinding", "Sneak Attack +8d6", "Evasion", "Improved Uncanny Dodge" ],
		17 : [ "Trapfinding", "Sneak Attack +9d6", "Evasion", "Improved Uncanny Dodge" ],
		18 : [ "Trapfinding", "Sneak Attack +9d6", "Evasion", "Improved Uncanny Dodge" ],
		19 : [ "Trapfinding", "Sneak Attack +10d6", "Evasion", "Improved Uncanny Dodge" ],
		20 : [ "Trapfinding", "Sneak Attack +10d6", "Evasion", "Improved Uncanny Dodge" ],
	},
	"sorcerer" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	"soul knife" : {
		1 : [ "Mind Blade" ],
		2 : [ "Mind Blade", "Throw Mind Blade" ],
		3 : [ "Mind Blade", "Throw Mind Blade", "Psychic Strike +1d8" ],
		4 : [ "+1 Mind Blade", "Throw Mind Blade", "Psychic Strike +1d8" ],
		5 : [ "+1 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Psychic Strike +1d8", "Free Draw" ],
		6 : [ "+1 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Mind Blade Enhancement +1", "Psychic Strike +1d8", "Free Draw" ],
		7 : [ "+1 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Mind Blade Enhancement +1", "Psychic Strike +2d8", "Free Draw" ],
		8 : [ "+2 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Mind Blade Enhancement +1", "Psychic Strike +2d8", "Free Draw" ],
		9 : [ "+2 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Mind Blade Enhancement +1", "Psychic Strike +2d8", "Free Draw", "Bladewind" ],
		10 : [ "+2 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Mind Blade Enhancement +2", "Psychic Strike +2d8", "Free Draw", "Bladewind" ],
		11 : [ "+2 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Mind Blade Enhancement +2", "Psychic Strike +3d8", "Free Draw", "Bladewind" ],
		12 : [ "+3 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Mind Blade Enhancement +2", "Psychic Strike +3d8", "Free Draw", "Bladewind" ],
		13 : [ "+3 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Mind Blade Enhancement +2", "Psychic Strike +3d8", "Free Draw", "Bladewind", "Knife to the Soul" ],
		14 : [ "+3 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Mind Blade Enhancement +3", "Psychic Strike +3d8", "Free Draw", "Bladewind", "Knife to the Soul" ],
		15 : [ "+3 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Mind Blade Enhancement +3", "Psychic Strike +4d8", "Free Draw", "Bladewind", "Knife to the Soul" ],
		16 : [ "+4 Mind Blade", "Throw Mind Blade", "Shape Mind Blade", "Mind Blade Enhancement +3", "Psychic Strike +4d8", "Free Draw", "Bladewind", "Knife to the Soul" ],
		17 : [ "+4 Mind Blade", "Throw Multiple Mind Blades", "Shape Mind Blade", "Mind Blade Enhancement +3", "Psychic Strike +4d8", "Free Draw", "Bladewind", "Knife to the Soul" ],
		18 : [ "+4 Mind Blade", "Throw Multiple Mind Blades", "Shape Mind Blade", "Mind Blade Enhancement +4", "Psychic Strike +4d8", "Free Draw", "Bladewind", "Knife to the Soul" ],
		19 : [ "+4 Mind Blade", "Throw Multiple Mind Blades", "Shape Mind Blade", "Mind Blade Enhancement +4", "Psychic Strike +5d8", "Free Draw", "Bladewind", "Knife to the Soul" ],
		20 : [ "+5 Mind Blade", "Throw Multiple Mind Blades", "Shape Mind Blade", "Mind Blade Enhancement +4", "Psychic Strike +5d8", "Free Draw", "Bladewind", "Knife to the Soul" ],
	},
	"warrior" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"wilder" : {
		1 : [ "Wild Surge +1", "Psychic Enervation" ],
		2 : [ "Wild Surge +1", "Psychic Enervation" ],
		3 : [ "Wild Surge +2", "Psychic Enervation" ],
		4 : [ "Wild Surge +2", "Surging Euphoria +1", "Psychic Enervation" ],
		5 : [ "Wild Surge +2", "Surging Euphoria +1", "Psychic Enervation", "Volatile Mind (1 power point)" ],
		6 : [ "Wild Surge +2", "Surging Euphoria +1", "Psychic Enervation", "Volatile Mind (1 power point)" ],
		7 : [ "Wild Surge +3", "Surging Euphoria +1", "Psychic Enervation", "Volatile Mind (1 power point)" ],
		8 : [ "Wild Surge +3", "Surging Euphoria +1", "Psychic Enervation", "Volatile Mind (1 power point)" ],
		9 : [ "Wild Surge +3", "Surging Euphoria +1", "Psychic Enervation", "Volatile Mind (2 power point)" ],
		10 : [ "Wild Surge +3", "Surging Euphoria +1", "Psychic Enervation", "Volatile Mind (2 power point)" ],
		11 : [ "Wild Surge +4", "Surging Euphoria +1", "Psychic Enervation", "Volatile Mind (2 power point)" ],
		12 : [ "Wild Surge +4", "Surging Euphoria +2", "Psychic Enervation", "Volatile Mind (2 power point)" ],
		13 : [ "Wild Surge +4", "Surging Euphoria +2", "Psychic Enervation", "Volatile Mind (3 power point)" ],
		14 : [ "Wild Surge +4", "Surging Euphoria +2", "Psychic Enervation", "Volatile Mind (3 power point)" ],
		15 : [ "Wild Surge +5", "Surging Euphoria +2", "Psychic Enervation", "Volatile Mind (3 power point)" ],
		16 : [ "Wild Surge +5", "Surging Euphoria +2", "Psychic Enervation", "Volatile Mind (3 power point)" ],
		17 : [ "Wild Surge +5", "Surging Euphoria +2", "Psychic Enervation", "Volatile Mind (4 power point)" ],
		18 : [ "Wild Surge +5", "Surging Euphoria +2", "Psychic Enervation", "Volatile Mind (4 power point)" ],
		19 : [ "Wild Surge +6", "Surging Euphoria +2", "Psychic Enervation", "Volatile Mind (4 power point)" ],
		20 : [ "Wild Surge +6", "Surging Euphoria +3", "Psychic Enervation", "Volatile Mind (4 power point)" ],
	},
	"wizard" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},

	"wizard (abjurer)" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	"wizard (conjurer)" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	"wizard (diviner)" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	"wizard (enchanter)" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	"wizard (evoker)" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	"wizard (illusionist)" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	"wizard (necromancer)" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	"wizard (transmuter)" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	
	"psion (seer)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},	
	"psion (shaper)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},	
	"psion (kineticist)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},	
	"psion (egoist)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},	
	"psion (nomad)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},	
	"psion (telepath)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},	

	
	"fallen cleric" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"fallen druid" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"fallen paladin" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"fallen dragon shaman" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"fallen knight" : {
		1 : [],
		2 : [ "Shield Block +1", ],
		3 : [ "Shield Block +1", "Bulwark of Defense",],
		4 : [ "Shield Block +1", "Bulwark of Defense", ],
		5 : [ "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+5 Tumble DC)", ],
		6 : [ "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+6 Tumble DC)", "Shield Ally", ],
		7 : [ "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+7 Tumble DC)", "Shield Ally", ],
		8 : [ "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+8 Tumble DC)", "Shield Ally", ],
		9 : [ "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+9 Tumble DC)", "Shield Ally", ],
		10 : [ "Shield Block +1", "Bulwark of Defense", "Vigilant Defender (+10 Tumble DC)", "Shield Ally", ],
		11 : [ "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+11 Tumble DC)", "Shield Ally", ],
		12 : [ "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+12 Tumble DC)", "Shield Ally", ],
		13 : [ "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+13 Tumble DC)", "Shield Ally", ],
		14 : [ "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+14 Tumble DC)", "Improved Shield Ally", ],
		15 : [ "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+15 Tumble DC)", "Improved Shield Ally", ],
		16 : [ "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+16 Tumble DC)", "Improved Shield Ally", ],
		17 : [ "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+17 Tumble DC)", "Improved Shield Ally", "Impetuous Endurance", ],
		18 : [ "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+18 Tumble DC)", "Improved Shield Ally", "Impetuous Endurance", ],
		19 : [ "Shield Block +2", "Bulwark of Defense", "Vigilant Defender (+19 Tumble DC)", "Improved Shield Ally", "Impetuous Endurance", ],
		20 : [ "Shield Block +3", "Bulwark of Defense", "Vigilant Defender (+20 Tumble DC)", "Improved Shield Ally", "Impetuous Endurance", ],
	},

       "barbarian (ape totem)" : {
                1 : [ "Climb Speed: <X/2> ft / round", "Rage 1x/day" ],
                2 : [ "Climb Speed: <X/2> ft / round", "Rage 1x/day" ],
                3 : [ "Climb Speed: <X/2> ft / round", "Rage 1x/day" ],
                4 : [ "Climb Speed: <X/2> ft / round", "Rage 2x/day" ],
                5 : [ "Climb Speed: <X> ft / round", "Rage 2x/day" ],
                6 : [ "Climb Speed: <X> ft / round", "Rage 2x/day" ],
                7 : [ "Climb Speed: <X> ft / round", "Rage 2x/day", "Damage Reduction 1/-" ],
                8 : [ "Climb Speed: <X> ft / round", "Rage 3x/day", "Damage Reduction 1/-" ],
                9 : [ "Climb Speed: <X> ft / round", "Rage 3x/day", "Damage Reduction 1/-" ],
                10 : [ "Climb Speed: <X> ft / round", "Rage 3x/day", "Damage Reduction 2/-" ],
                11 : [ "Climb Speed: <X> ft / round", "Greater Rage 3x/day", "Damage Reduction 2/-" ],
                12 : [ "Climb Speed: <X> ft / round", "Greater Rage 4x/day", "Damage Reduction 2/-" ],
                13 : [ "Climb Speed: <X> ft / round", "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                14 : [ "Climb Speed: <X> ft / round", "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                15 : [ "Climb Speed: <X> ft / round", "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                16 : [ "Climb Speed: <X> ft / round", "Greater Rage 5x/day", "Damage Reduction 4/-" ],
                17 : [ "Climb Speed: <X> ft / round", "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 4/-" ],
                18 : [ "Climb Speed: <X> ft / round", "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 4/-" ],
                19 : [ "Climb Speed: <X> ft / round", "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 5/-" ],
                20 : [ "Climb Speed: <X> ft / round", "Mighty Rage 6x/day", "Tireless Rage", "Damage Reduction 5/-" ],
        },
       "barbarian (bear totem)" : {
                1 : [ "Rage 1x/day" ],
                2 : [ "Rage 1x/day" ],
                3 : [ "Rage 1x/day" ],
                4 : [ "Rage 2x/day" ],
                5 : [ "Rage 2x/day", "+4 Grapple Bonus during Rage" ],
                6 : [ "Rage 2x/day", "+4 Grapple Bonus during Rage" ],
                7 : [ "Rage 2x/day", "+4 Grapple Bonus during Rage", "Damage Reduction 1/-" ],
                8 : [ "Rage 3x/day", "+4 Grapple Bonus during Rage", "Damage Reduction 1/-" ],
                9 : [ "Rage 3x/day", "+4 Grapple Bonus during Rage", "Damage Reduction 1/-" ],
                10 : [ "Rage 3x/day", "+4 Grapple Bonus during Rage", "Damage Reduction 2/-" ],
                11 : [ "Greater Rage 3x/day", "+4 Grapple Bonus during Rage", "Damage Reduction 2/-" ],
                12 : [ "Greater Rage 4x/day", "+4 Grapple Bonus during Rage", "Damage Reduction 2/-" ],
                13 : [ "Greater Rage 4x/day", "+4 Grapple Bonus during Rage", "Damage Reduction 3/-" ],
                14 : [ "Greater Rage 4x/day", "+4 Grapple Bonus during Rage", "Damage Reduction 3/-" ],
                15 : [ "Greater Rage 4x/day", "+4 Grapple Bonus during Rage", "Damage Reduction 3/-" ],
                16 : [ "Greater Rage 5x/day", "+4 Grapple Bonus during Rage", "Damage Reduction 4/-" ],
                17 : [ "Greater Rage 5x/day", "+4 Grapple Bonus during Rage", "Tireless Rage", "Damage Reduction 4/-" ],
                18 : [ "Greater Rage 5x/day", "+4 Grapple Bonus during Rage", "Tireless Rage", "Damage Reduction 4/-" ],
                19 : [ "Greater Rage 5x/day", "+4 Grapple Bonus during Rage", "Tireless Rage", "Damage Reduction 5/-" ],
                20 : [ "Mighty Rage 6x/day", "+4 Grapple Bonus during Rage", "Tireless Rage", "Damage Reduction 5/-" ],
        },
       "barbarian (boar totem)" : {
                1 : [ "Rage 1x/day" ],
                2 : [ "Rage 1x/day" ],
                3 : [ "Rage 1x/day", "Extended Rage (+2 rounds) (+2 rounds)" ],
                4 : [ "Rage 2x/day", "Extended Rage (+2 rounds)" ],
                5 : [ "Rage 2x/day", "Extended Rage (+2 rounds)" ],
                6 : [ "Rage 2x/day", "Extended Rage (+2 rounds)" ],
                7 : [ "Rage 2x/day", "Extended Rage (+2 rounds)", "Damage Reduction 2/-" ],
                8 : [ "Rage 3x/day", "Extended Rage (+2 rounds)", "Damage Reduction 2/-" ],
                9 : [ "Rage 3x/day", "Extended Rage (+2 rounds)", "Damage Reduction 2/-" ],
                10 : [ "Rage 3x/day", "Extended Rage (+2 rounds)", "Damage Reduction 3/-" ],
                11 : [ "Greater Rage 3x/day", "Extended Rage (+2 rounds)", "Damage Reduction 3/-" ],
                12 : [ "Greater Rage 4x/day", "Extended Rage (+2 rounds)", "Damage Reduction 3/-" ],
                13 : [ "Greater Rage 4x/day", "Extended Rage (+2 rounds)", "Damage Reduction 4/-" ],
                14 : [ "Greater Rage 4x/day", "Extended Rage (+2 rounds)", "Damage Reduction 4/-" ],
                15 : [ "Greater Rage 4x/day", "Extended Rage (+2 rounds)", "Damage Reduction 4/-" ],
                16 : [ "Greater Rage 5x/day", "Extended Rage (+2 rounds)", "Damage Reduction 5/-" ],
                17 : [ "Greater Rage 5x/day", "Extended Rage (+2 rounds)", "Tireless Rage", "Damage Reduction 5/-" ],
                18 : [ "Greater Rage 5x/day", "Extended Rage (+2 rounds)", "Tireless Rage", "Damage Reduction 5/-" ],
                19 : [ "Greater Rage 5x/day", "Extended Rage (+2 rounds)", "Tireless Rage", "Damage Reduction 6/-" ],
                20 : [ "Mighty Rage 6x/day", "Extended Rage (+2 rounds)", "Tireless Rage", "Damage Reduction 6/-" ],
        },
       "barbarian (dragon totem)" : {
                1 : [ "Rage 1x/day" ],
                2 : [ "Rage 1x/day" ],
                3 : [ "Rage 1x/day" ],
                4 : [ "Rage 2x/day" ],
                5 : [ "Rage 2x/day", "Frightful Presence" ],
                6 : [ "Rage 2x/day", "Frightful Presence" ],
                7 : [ "Rage 2x/day", "Frightful Presence", "Damage Reduction 1/-" ],
                8 : [ "Rage 3x/day", "Frightful Presence", "Damage Reduction 1/-" ],
                9 : [ "Rage 3x/day", "Frightful Presence", "Damage Reduction 1/-" ],
                10 : [ "Rage 3x/day", "Frightful Presence", "Damage Reduction 2/-" ],
                11 : [ "Greater Rage 3x/day", "Frightful Presence", "Damage Reduction 2/-" ],
                12 : [ "Greater Rage 4x/day", "Frightful Presence", "Damage Reduction 2/-" ],
                13 : [ "Greater Rage 4x/day", "Frightful Presence", "Damage Reduction 3/-" ],
                14 : [ "Greater Rage 4x/day", "Frightful Presence", "Damage Reduction 3/-" ],
                15 : [ "Greater Rage 4x/day", "Frightful Presence", "Damage Reduction 3/-" ],
                16 : [ "Greater Rage 5x/day", "Frightful Presence", "Damage Reduction 4/-" ],
                17 : [ "Greater Rage 5x/day", "Frightful Presence", "Tireless Rage", "Damage Reduction 4/-" ],
                18 : [ "Greater Rage 5x/day", "Frightful Presence", "Tireless Rage", "Damage Reduction 4/-" ],
                19 : [ "Greater Rage 5x/day", "Frightful Presence", "Tireless Rage", "Damage Reduction 5/-" ],
                20 : [ "Mighty Rage 6x/day", "Frightful Presence", "Tireless Rage", "Damage Reduction 5/-" ],
        },
       "barbarian (eagle totem)" : {
                1 : [ "Rage 1x/day" ],
                2 : [ "Rage 1x/day", "Uncanny Dodge" ],
                3 : [ "Rage 1x/day", "Uncanny Dodge" ],
                4 : [ "Rage 2x/day", "Uncanny Dodge" ],
                5 : [ "Rage 2x/day", "Improved Uncanny Dodge" ],
                6 : [ "Rage 2x/day", "Improved Uncanny Dodge" ],
                7 : [ "Rage 2x/day", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
                8 : [ "Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
                9 : [ "Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
                10 : [ "Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
                11 : [ "Greater Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
                12 : [ "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
                13 : [ "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
                14 : [ "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
                15 : [ "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
                16 : [ "Greater Rage 5x/day", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
                17 : [ "Greater Rage 5x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
                18 : [ "Greater Rage 5x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
                19 : [ "Greater Rage 5x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 5/-" ],
                20 : [ "Mighty Rage 6x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 5/-" ],
        },
	"barbarian (horse totem)" : {
                1 : [ "Fast Movement", "Rage 1x/day" ],
                2 : [ "Fast Movement", "Rage 1x/day" ],
                3 : [ "Fast Movement", "Rage 1x/day" ],
                4 : [ "Fast Movement", "Rage 2x/day" ],
                5 : [ "Fast Movement", "Rage 2x/day" ],
                6 : [ "Fast Movement", "Rage 2x/day" ],
                7 : [ "Fast Movement", "Rage 2x/day", "Damage Reduction 1/-" ],
                8 : [ "Fast Movement", "Rage 3x/day", "Damage Reduction 1/-" ],
                9 : [ "Fast Movement", "Rage 3x/day", "Damage Reduction 1/-" ],
                10 : [ "Fast Movement", "Rage 3x/day", "Damage Reduction 2/-" ],
                11 : [ "Fast Movement", "Greater Rage 3x/day", "Damage Reduction 2/-" ],
                12 : [ "Fast Movement", "Greater Rage 4x/day", "Damage Reduction 2/-" ],
                13 : [ "Fast Movement", "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                14 : [ "Fast Movement", "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                15 : [ "Fast Movement", "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                16 : [ "Fast Movement", "Greater Rage 5x/day", "Damage Reduction 4/-" ],
                17 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 4/-" ],
                18 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 4/-" ],
                19 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 5/-" ],
                20 : [ "Fast Movement", "Mighty Rage 6x/day", "Tireless Rage", "Damage Reduction 5/-" ],
        },
       "barbarian (jaguar totem)" : {
                1 : [ "Fast Movement", "Rage 1x/day" ],
                2 : [ "Fast Movement", "Rage 1x/day", "Uncanny Dodge" ],
                3 : [ "Fast Movement", "Rage 1x/day", "Uncanny Dodge" ],
                4 : [ "Fast Movement", "Rage 2x/day", "Uncanny Dodge" ],
                5 : [ "Fast Movement", "Rage 2x/day", "Improved Uncanny Dodge" ],
                6 : [ "Fast Movement", "Rage 2x/day", "Improved Uncanny Dodge" ],
                7 : [ "Fast Movement", "Rage 2x/day", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
                8 : [ "Fast Movement", "Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
                9 : [ "Fast Movement", "Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
                10 : [ "Fast Movement", "Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
                11 : [ "Fast Movement", "Greater Rage 3x/day", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
                12 : [ "Fast Movement", "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
                13 : [ "Fast Movement", "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
                14 : [ "Fast Movement", "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
                15 : [ "Fast Movement", "Greater Rage 4x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
                16 : [ "Fast Movement", "Greater Rage 5x/day", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
                17 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
                18 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
                19 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 5/-" ],
                20 : [ "Fast Movement", "Mighty Rage 6x/day", "Tireless Rage", "Improved Uncanny Dodge", "Damage Reduction 5/-" ],
        },	
       "barbarian (lion totem)" : {
                1 : [ "Rage 1x/day", "+2 Damage on Charge" ],
                2 : [ "Rage 1x/day", "+2 Damage on Charge" ],
                3 : [ "Rage 1x/day", "+2 Damage on Charge" ],
                4 : [ "Rage 2x/day", "+2 Damage on Charge" ],
                5 : [ "Rage 2x/day", "+2 Damage on Charge" ],
                6 : [ "Rage 2x/day", "+2 Damage on Charge" ],
                7 : [ "Rage 2x/day", "+2 Damage on Charge", "Damage Reduction 1/-" ],
                8 : [ "Rage 3x/day", "+2 Damage on Charge", "Damage Reduction 1/-" ],
                9 : [ "Rage 3x/day", "+2 Damage on Charge", "Damage Reduction 1/-" ],
                10 : [ "Rage 3x/day", "+2 Damage on Charge", "Damage Reduction 2/-" ],
                11 : [ "Greater Rage 3x/day", "+2 Damage on Charge", "Damage Reduction 2/-" ],
                12 : [ "Greater Rage 4x/day", "+2 Damage on Charge", "Damage Reduction 2/-" ],
                13 : [ "Greater Rage 4x/day", "+2 Damage on Charge", "Damage Reduction 3/-" ],
                14 : [ "Greater Rage 4x/day", "+2 Damage on Charge", "Damage Reduction 3/-" ],
                15 : [ "Greater Rage 4x/day", "+2 Damage on Charge", "Damage Reduction 3/-" ],
                16 : [ "Greater Rage 5x/day", "+2 Damage on Charge", "Damage Reduction 4/-" ],
                17 : [ "Greater Rage 5x/day", "+2 Damage on Charge", "Tireless Rage", "Damage Reduction 4/-" ],
                18 : [ "Greater Rage 5x/day", "+2 Damage on Charge", "Tireless Rage", "Damage Reduction 4/-" ],
                19 : [ "Greater Rage 5x/day", "+2 Damage on Charge", "Tireless Rage", "Damage Reduction 5/-" ],
                20 : [ "Mighty Rage 6x/day", "+2 Damage on Charge", "Tireless Rage", "Damage Reduction 5/-" ],
        },
       "barbarian (serpent totem)" : {
                1 : [ "Rage 1x/day" ],
                2 : [ "Rage 1x/day" ],
                3 : [ "Rage 1x/day" ],
                4 : [ "Rage 2x/day" ],
                5 : [ "Rage 2x/day" ],
                6 : [ "Rage 2x/day" ],
                7 : [ "Rage 2x/day", "Damage Reduction 1/-" ],
                8 : [ "Rage 3x/day", "Damage Reduction 1/-" ],
                9 : [ "Rage 3x/day", "Damage Reduction 1/-" ],
                10 : [ "Rage 3x/day", "Damage Reduction 2/-" ],
                11 : [ "Greater Rage 3x/day", "Damage Reduction 2/-" ],
                12 : [ "Greater Rage 4x/day", "Damage Reduction 2/-" ],
                13 : [ "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                14 : [ "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                15 : [ "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                16 : [ "Greater Rage 5x/day", "Damage Reduction 4/-" ],
                17 : [ "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 4/-" ],
                18 : [ "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 4/-" ],
                19 : [ "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 5/-" ],
                20 : [ "Mighty Rage 6x/day", "Tireless Rage", "Damage Reduction 5/-" ],
        },
       "barbarian (wolf totem)" : {
                1 : [ "Fast Movement", "Rage 1x/day" ],
                2 : [ "Fast Movement", "Rage 1x/day" ],
                3 : [ "Fast Movement", "Rage 1x/day" ],
                4 : [ "Fast Movement", "Rage 2x/day" ],
                5 : [ "Fast Movement", "Rage 2x/day" ],
                6 : [ "Fast Movement", "Rage 2x/day" ],
                7 : [ "Fast Movement", "Rage 2x/day", "Damage Reduction 1/-" ],
                8 : [ "Fast Movement", "Rage 3x/day", "Damage Reduction 1/-" ],
                9 : [ "Fast Movement", "Rage 3x/day", "Damage Reduction 1/-" ],
                10 : [ "Fast Movement", "Rage 3x/day", "Damage Reduction 2/-" ],
                11 : [ "Fast Movement", "Greater Rage 3x/day", "Damage Reduction 2/-" ],
                12 : [ "Fast Movement", "Greater Rage 4x/day", "Damage Reduction 2/-" ],
                13 : [ "Fast Movement", "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                14 : [ "Fast Movement", "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                15 : [ "Fast Movement", "Greater Rage 4x/day", "Damage Reduction 3/-" ],
                16 : [ "Fast Movement", "Greater Rage 5x/day", "Damage Reduction 4/-" ],
                17 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 4/-" ],
                18 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 4/-" ],
                19 : [ "Fast Movement", "Greater Rage 5x/day", "Tireless Rage", "Damage Reduction 5/-" ],
                20 : [ "Fast Movement", "Mighty Rage 6x/day", "Tireless Rage", "Damage Reduction 5/-" ],
        },
	"barbarian (hunter)" : {
		1 : [ "Fast Movement" ],
		2 : [ "Fast Movement", "Uncanny Dodge" ],
		3 : [ "Fast Movement", "Uncanny Dodge" ],
		4 : [ "Fast Movement", "Uncanny Dodge" ],
		5 : [ "Fast Movement", "Improved Uncanny Dodge" ],
		6 : [ "Fast Movement", "Improved Uncanny Dodge" ],
		7 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
		8 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
		9 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 1/-" ],
		10 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
		11 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
		12 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 2/-" ],
		13 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
		14 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
		15 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
		16 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
		17 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
		18 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 4/-" ],
		19 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 5/-" ],
		20 : [ "Fast Movement", "Improved Uncanny Dodge", "Damage Reduction 5/-" ],
	},

	"bard (divine)" : {
		1 : [ "Bardic Music 1x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1" ],
		2 : [ "Bardic Music 2x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1" ],
		3 : [ "Bardic Music 3x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence" ],
		4 : [ "Bardic Music 4x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence" ],
		5 : [ "Bardic Music 5x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence" ],
		6 : [ "Bardic Music 6x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence", "Suggestion" ],
		7 : [ "Bardic Music 7x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence", "Suggestion" ],
		8 : [ "Bardic Music 8x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Suggestion" ],
		9 : [ "Bardic Music 9x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion" ],
		10 : [ "Bardic Music 10x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion" ],
		11 : [ "Bardic Music 11x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion", ],
		12 : [ "Bardic Music 12x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion", "Song of Freedom" ],
		13 : [ "Bardic Music 13x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion", "Song of Freedom" ],
		14 : [ "Bardic Music 14x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Suggestion", "Song of Freedom" ],
		15 : [ "Bardic Music 15x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Song of Freedom" ],
		16 : [ "Bardic Music 16x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Song of Freedom" ],
		17 : [ "Bardic Music 17x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Song of Freedom" ],
		18 : [ "Bardic Music 18x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
		19 : [ "Bardic Music 19x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
		20 : [ "Bardic Music 20x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +4", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
	},
	"bard (druidic)" : {
                1 : [ "Animal Companion", "Wild Empathy", "Bardic Music 1x/day", "Countersong", "Fascinate" ],
                2 : [ "Animal Companion", "Wild Empathy", "Bardic Music 2x/day", "Countersong", "Fascinate" ],
                3 : [ "Animal Companion", "Wild Empathy", "Bardic Music 3x/day", "Countersong", "Fascinate" ],
                4 : [ "Animal Companion", "Wild Empathy", "Bardic Music 4x/day", "Countersong", "Fascinate" ],
                5 : [ "Animal Companion", "Wild Empathy", "Bardic Music 5x/day", "Countersong", "Fascinate" ],
                6 : [ "Animal Companion", "Wild Empathy", "Bardic Music 6x/day", "Countersong", "Fascinate", "Suggestion" ],
                7 : [ "Animal Companion", "Wild Empathy", "Bardic Music 7x/day", "Countersong", "Fascinate", "Suggestion" ],
                8 : [ "Animal Companion", "Wild Empathy", "Bardic Music 8x/day", "Countersong", "Fascinate", "Suggestion" ],
                9 : [ "Animal Companion", "Wild Empathy", "Bardic Music 9x/day", "Countersong", "Fascinate", "Suggestion" ],
                10 : [ "Animal Companion", "Wild Empathy", "Bardic Music 10x/day", "Countersong", "Fascinate", "Suggestion" ],
                11 : [ "Animal Companion", "Wild Empathy", "Bardic Music 11x/day", "Countersong", "Fascinate", "Suggestion", ],
                12 : [ "Animal Companion", "Wild Empathy", "Bardic Music 12x/day", "Countersong", "Fascinate", "Suggestion", "Song of Freedom" ],
                13 : [ "Animal Companion", "Wild Empathy", "Bardic Music 13x/day", "Countersong", "Fascinate", "Suggestion", "Song of Freedom" ],
                14 : [ "Animal Companion", "Wild Empathy", "Bardic Music 14x/day", "Countersong", "Fascinate", "Suggestion", "Song of Freedom" ],
                15 : [ "Animal Companion", "Wild Empathy", "Bardic Music 15x/day", "Countersong", "Fascinate", "Suggestion", "Song of Freedom" ],
                16 : [ "Animal Companion", "Wild Empathy", "Bardic Music 16x/day", "Countersong", "Fascinate", "Suggestion", "Song of Freedom" ],
                17 : [ "Animal Companion", "Wild Empathy", "Bardic Music 17x/day", "Countersong", "Fascinate", "Suggestion", "Song of Freedom" ],
                18 : [ "Animal Companion", "Wild Empathy", "Bardic Music 18x/day", "Countersong", "Fascinate", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
                19 : [ "Animal Companion", "Wild Empathy", "Bardic Music 19x/day", "Countersong", "Fascinate", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
                20 : [ "Animal Companion", "Wild Empathy", "Bardic Music 20x/day", "Countersong", "Fascinate", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
        },
	"bard (sage)" : {
		1 : [ "Bardic Music 1x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1 (3 rounds)" ],
		2 : [ "Bardic Music 2x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1 (3 rounds)" ],
		3 : [ "Bardic Music 3x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1 (3 rounds)", "Inspire Competence" ],
		4 : [ "Bardic Music 4x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1 (3 rounds)", "Inspire Competence" ],
		5 : [ "Bardic Music 5x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1 (3 rounds)", "Inspire Competence" ],
		6 : [ "Bardic Music 6x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1 (3 rounds)", "Inspire Competence", "Suggestion" ],
		7 : [ "Bardic Music 7x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1 (3 rounds)", "Inspire Competence", "Suggestion" ],
		8 : [ "Bardic Music 8x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2 (3 rounds)", "Inspire Competence", "Suggestion" ],
		9 : [ "Bardic Music 9x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Suggestion" ],
		10 : [ "Bardic Music 10x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Suggestion" ],
		11 : [ "Bardic Music 11x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Suggestion", ],
		12 : [ "Bardic Music 12x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Suggestion", "Song of Freedom" ],
		13 : [ "Bardic Music 13x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Suggestion", "Song of Freedom" ],
		14 : [ "Bardic Music 14x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Suggestion", "Song of Freedom" ],
		15 : [ "Bardic Music 15x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Inspire Heroics (3 rounds)", "Suggestion", "Song of Freedom" ],
		16 : [ "Bardic Music 16x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Inspire Heroics (3 rounds)", "Suggestion", "Song of Freedom" ],
		17 : [ "Bardic Music 17x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Inspire Heroics (3 rounds)", "Suggestion", "Song of Freedom" ],
		18 : [ "Bardic Music 18x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Inspire Heroics (3 rounds)", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
		19 : [ "Bardic Music 19x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Inspire Heroics (3 rounds)", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
		20 : [ "Bardic Music 20x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +4 (3 rounds)", "Inspire Competence", "Inspire Greatness (3 rounds)", "Inspire Heroics (3 rounds)", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
	},
	"bard (savage)" : {
		1 : [ "Bardic Music 1x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1" ],
		2 : [ "Bardic Music 2x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1" ],
		3 : [ "Bardic Music 3x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence" ],
		4 : [ "Bardic Music 4x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence" ],
		5 : [ "Bardic Music 5x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence" ],
		6 : [ "Bardic Music 6x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence", "Suggestion" ],
		7 : [ "Bardic Music 7x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +1", "Inspire Competence", "Suggestion" ],
		8 : [ "Bardic Music 8x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Suggestion" ],
		9 : [ "Bardic Music 9x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion" ],
		10 : [ "Bardic Music 10x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion" ],
		11 : [ "Bardic Music 11x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion", ],
		12 : [ "Bardic Music 12x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion", "Song of Freedom" ],
		13 : [ "Bardic Music 13x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +2", "Inspire Competence", "Inspire Greatness", "Suggestion", "Song of Freedom" ],
		14 : [ "Bardic Music 14x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Suggestion", "Song of Freedom" ],
		15 : [ "Bardic Music 15x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Song of Freedom" ],
		16 : [ "Bardic Music 16x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Song of Freedom" ],
		17 : [ "Bardic Music 17x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Song of Freedom" ],
		18 : [ "Bardic Music 18x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
		19 : [ "Bardic Music 19x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +3", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
		20 : [ "Bardic Music 20x/day", "Bardic Knowledge", "Countersong", "Fascinate", "Inspire Courage +4", "Inspire Competence", "Inspire Greatness", "Inspire Heroics", "Suggestion", "Mass Suggestion", "Song of Freedom" ],
	},

	"cleric (champion)" : {
		1 : [ "Aura" ],
		2 : [ "Aura" ],
		3 : [ "Aura", "Aura of Courage" ],
		4 : [ "Aura", "Aura of Courage" ],
		5 : [ "Aura", "Aura of Courage" ],
		6 : [ "Aura", "Aura of Courage" ],
		7 : [ "Aura", "Aura of Courage" ],
		8 : [ "Aura", "Aura of Courage" ],
		9 : [ "Aura", "Aura of Courage" ],
		10 : [ "Aura", "Aura of Courage" ],
		11 : [ "Aura", "Aura of Courage" ],
		12 : [ "Aura", "Aura of Courage" ],
		13 : [ "Aura", "Aura of Courage" ],
		14 : [ "Aura", "Aura of Courage" ],
		15 : [ "Aura", "Aura of Courage" ],
		16 : [ "Aura", "Aura of Courage" ],
		17 : [ "Aura", "Aura of Courage" ],
		18 : [ "Aura", "Aura of Courage" ],
		19 : [ "Aura", "Aura of Courage" ],
		20 : [ "Aura", "Aura of Courage" ],
	},
	"cleric (cloistered)" : {
                1 : [ "Aura", "Lore" ],
                2 : [ "Aura", "Lore" ],
                3 : [ "Aura", "Lore" ],
                4 : [ "Aura", "Lore" ],
                5 : [ "Aura", "Lore" ],
                6 : [ "Aura", "Lore" ],
                7 : [ "Aura", "Lore" ],
                8 : [ "Aura", "Lore" ],
                9 : [ "Aura", "Lore" ],
                10 : [ "Aura", "Lore" ],
                11 : [ "Aura", "Lore" ],
                12 : [ "Aura", "Lore" ],
                13 : [ "Aura", "Lore" ],
                14 : [ "Aura", "Lore" ],
                15 : [ "Aura", "Lore" ],
                16 : [ "Aura", "Lore" ],
                17 : [ "Aura", "Lore" ],
                18 : [ "Aura", "Lore" ],
                19 : [ "Aura", "Lore" ],
                20 : [ "Aura", "Lore" ],
	},
	"fallen cleric (cloistered)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"fallen cleric (champion)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},

	"druid (avenger)" : {
		1 : [ "Fast Movement", "Rage 1x/day", "Wild Empathy (-4)" ],
		2 : [ "Fast Movement", "Rage 1x/day", "Wild Empathy (-4)", "Woodland Stride" ],
		3 : [ "Fast Movement", "Rage 1x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step" ],
		4 : [ "Fast Movement", "Rage 1x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step" ],
		5 : [ "Fast Movement", "Rage 2x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 1x/day" ],
		6 : [ "Fast Movement", "Rage 2x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 2x/day" ],
		7 : [ "Fast Movement", "Rage 2x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 3x/day" ],
		8 : [ "Fast Movement", "Rage 2x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 3x/day, Large" ],
		9 : [ "Fast Movement", "Rage 2x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 3x/day, Large", "Venom Immunity" ],
		10 : [ "Fast Movement", "Rage 3x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 4x/day, Large", "Venom Immunity" ],
		11 : [ "Fast Movement", "Rage 3x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 4x/day, Tiny, Large", "Venom Immunity" ],
		12 : [ "Fast Movement", "Rage 3x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 4x/day, Tiny, Large, Plant", "Venom Immunity" ],
		13 : [ "Fast Movement", "Rage 3x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 4x/day, Tiny, Large, Plant", "Venom Immunity", "A Thousand Faces" ],
		14 : [ "Fast Movement", "Rage 3x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 5x/day, Tiny, Large, Plant", "Venom Immunity", "A Thousand Faces" ],
		15 : [ "Fast Movement", "Rage 4x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 5x/day, Tiny, Large, Huge, Plant", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		16 : [ "Fast Movement", "Rage 4x/day", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 5x/day, Tiny, Large, Huge, Plant", "Elemental Wild Shape 1x/day", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		17 : [ "Fast Movement", "Rage 4x/day", "Tireless Rage", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 5x/day, Tiny, Large, Huge, Plant", "Elemental Wild Shape 1x/day", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		18 : [ "Fast Movement", "Rage 4x/day", "Tireless Rage", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 6x/day, Tiny, Large, Huge, Plant", "Elemental Wild Shape 2x/day", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		19 : [ "Fast Movement", "Rage 4x/day", "Tireless Rage", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 6x/day, Tiny, Large, Huge, Plant", "Elemental Wild Shape 2x/day", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		20 : [ "Fast Movement", "Rage 5x/day", "Tireless Rage", "Wild Empathy (-4)", "Woodland Stride", "Trackless Step", "Wild Shape 6x/day, Tiny, Large, Huge, Plant", "Elemental Wild Shape 3x/day, Huge", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
	},
	"druid (hunter)" : {
		1 : [ "Animal Companion", "Wild Empathy" ],
		2 : [ "Animal Companion", "Wild Empathy", "Woodland Stride" ],
		3 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
		4 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
		5 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
		6 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
		7 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
		8 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker" ],
		9 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity" ],
		10 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity" ],
		11 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity" ],
		12 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity" ],
		13 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity", "A Thousand Faces" ],
		14 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity", "A Thousand Faces" ],
		15 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		16 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		17 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		18 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		19 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
		20 : [ "Animal Companion", "Wild Empathy", "Woodland Stride", "Trackless Step", "Swift Tracker", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
	},
	"druid (shifter)" : {
                1 : [ "Predator Form", "Wild Empathy" ],
                2 : [ "Predator Form", "Wild Empathy", "Woodland Stride" ],
                3 : [ "Predator Form", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
                4 : [ "Mobile Predator Form", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
                5 : [ "Mobile Predator Form", "Aerial Form", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
                6 : [ "Mobile Predator Form", "Aerial Form", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
                7 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
                8 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Ferocious Slayer Form", "Wild Empathy", "Woodland Stride", "Trackless Step" ],
                9 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Ferocious Slayer Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity" ],
                10 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Critical Ferocious Slayer Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity" ],
                11 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Critical Ferocious Slayer Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity" ],
                12 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Critical Ferocious Slayer Form", "Frost Avenger Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity" ],
                13 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Critical Ferocious Slayer Form", "Frost Avenger Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity", "A Thousand Faces" ],
                14 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Critical Ferocious Slayer Form", "Overrun Frost Avenger Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity", "A Thousand Faces" ],
                15 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Critical Ferocious Slayer Form", "Overrun Frost Avenger Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
                16 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Critical Ferocious Slayer Form", "Overrun Frost Avenger Form", "Elemental Fury Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
                17 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Critical Ferocious Slayer Form", "Overrun Frost Avenger Form", "Elemental Fury Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
                18 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Critical Ferocious Slayer Form", "Overrun Frost Avenger Form", "Cleaving Elemental Fury Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
                19 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Critical Ferocious Slayer Form", "Overrun Frost Avenger Form", "Cleaving Elemental Fury Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
                20 : [ "Mobile Predator Form", "Fly-by Aerial Form", "Critical Ferocious Slayer Form", "Overrun Frost Avenger Form", "Cleaving Elemental Fury Form", "Wild Empathy", "Woodland Stride", "Trackless Step", "Venom Immunity", "A Thousand Faces", "Timeless Body" ],
	},
	"fallen druid (avenger)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"fallen druid (hunter)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"fallen druid (shifter)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},

 	"fighter (thug)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
 	"fighter (sneak attack)" : {
		1 : [ "Sneak Attack +1d6" ],
		2 : [ "Sneak Attack +1d6" ],
		3 : [ "Sneak Attack +2d6" ],
		4 : [ "Sneak Attack +2d6" ],
		5 : [ "Sneak Attack +3d6" ],
		6 : [ "Sneak Attack +3d6" ],
		7 : [ "Sneak Attack +4d6" ],
		8 : [ "Sneak Attack +4d6" ],
		9 : [ "Sneak Attack +5d6" ],
		10 : [ "Sneak Attack +5d6" ],
		11 : [ "Sneak Attack +6d6" ],
		12 : [ "Sneak Attack +6d6" ],
		13 : [ "Sneak Attack +7d6" ],
		14 : [ "Sneak Attack +7d6" ],
		15 : [ "Sneak Attack +8d6" ],
		16 : [ "Sneak Attack +8d6" ],
		17 : [ "Sneak Attack +9d6" ],
		18 : [ "Sneak Attack +9d6" ],
		19 : [ "Sneak Attack +10d6" ],
		20 : [ "Sneak Attack +10d6" ],
	},
 	"fighter (sneak attack and thug)" : {
		1 : [ "Sneak Attack +1d6" ],
		2 : [ "Sneak Attack +1d6" ],
		3 : [ "Sneak Attack +2d6" ],
		4 : [ "Sneak Attack +2d6" ],
		5 : [ "Sneak Attack +3d6" ],
		6 : [ "Sneak Attack +3d6" ],
		7 : [ "Sneak Attack +4d6" ],
		8 : [ "Sneak Attack +4d6" ],
		9 : [ "Sneak Attack +5d6" ],
		10 : [ "Sneak Attack +5d6" ],
		11 : [ "Sneak Attack +6d6" ],
		12 : [ "Sneak Attack +6d6" ],
		13 : [ "Sneak Attack +7d6" ],
		14 : [ "Sneak Attack +7d6" ],
		15 : [ "Sneak Attack +8d6" ],
		16 : [ "Sneak Attack +8d6" ],
		17 : [ "Sneak Attack +9d6" ],
		18 : [ "Sneak Attack +9d6" ],
		19 : [ "Sneak Attack +10d6" ],
		20 : [ "Sneak Attack +10d6" ],
	},

	"monk (cobra strike style)" : {
		1 : [ "Flurry of Blows" ],
		2 : [ "Flurry of Blows", "Evasion" ],
		3 : [ "Flurry of Blows", "Evasion" ],
		4 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft." ],
		5 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft.", "Purity of Body" ],
		6 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body" ],
		7 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body", "Wholeness of Body (14 hp)" ],
		8 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (16 hp)" ],
		9 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (18 hp)" ],
		10 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (20 hp)" ],
		11 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (22 hp)", "Diamond Body" ],
		12 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (24 hp)", "Diamond Body", "Abundant Step" ],
		13 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (26 hp)", "Diamond Body", "Diamond Soul (SR 23)", "Abundant Step" ],
		14 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (28 hp)", "Diamond Body", "Diamond Soul (SR 24)", "Abundant Step" ],
		15 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (30 hp)", "Diamond Body", "Diamond Soul (SR 25)", "Abundant Step", "Quivering Palm" ],
		16 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (32 hp)", "Diamond Body", "Diamond Soul (SR 26)", "Abundant Step", "Quivering Palm" ],
		17 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (34 hp)", "Diamond Body", "Diamond Soul (SR 27)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		18 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (36 hp)", "Diamond Body", "Diamond Soul (SR 28)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		19 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (38 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 29)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		20 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (40 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 30)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon", "Perfect Self"  ],
	},
	"monk (denying stance style)" : {
		1 : [ "Flurry of Blows" ],
		2 : [ "Flurry of Blows", "Evasion" ],
		3 : [ "Flurry of Blows", "Evasion" ],
		4 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft." ],
		5 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft.", "Purity of Body" ],
		6 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body" ],
		7 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body", "Wholeness of Body (14 hp)" ],
		8 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (16 hp)" ],
		9 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (18 hp)" ],
		10 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (20 hp)" ],
		11 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (22 hp)", "Diamond Body" ],
		12 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (24 hp)", "Diamond Body", "Abundant Step" ],
		13 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (26 hp)", "Diamond Body", "Diamond Soul (SR 23)", "Abundant Step" ],
		14 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (28 hp)", "Diamond Body", "Diamond Soul (SR 24)", "Abundant Step" ],
		15 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (30 hp)", "Diamond Body", "Diamond Soul (SR 25)", "Abundant Step", "Quivering Palm" ],
		16 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (32 hp)", "Diamond Body", "Diamond Soul (SR 26)", "Abundant Step", "Quivering Palm" ],
		17 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (34 hp)", "Diamond Body", "Diamond Soul (SR 27)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		18 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (36 hp)", "Diamond Body", "Diamond Soul (SR 28)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		19 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (38 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 29)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		20 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (40 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 30)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon", "Perfect Self"  ],
	},
	"monk (hand and foot style)" : {
		1 : [ "Flurry of Blows" ],
		2 : [ "Flurry of Blows", "Evasion" ],
		3 : [ "Flurry of Blows", "Evasion" ],
		4 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft." ],
		5 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft.", "Purity of Body" ],
		6 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body" ],
		7 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body", "Wholeness of Body (14 hp)" ],
		8 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (16 hp)" ],
		9 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (18 hp)" ],
		10 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (20 hp)" ],
		11 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (22 hp)", "Diamond Body" ],
		12 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (24 hp)", "Diamond Body", "Abundant Step" ],
		13 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (26 hp)", "Diamond Body", "Diamond Soul (SR 23)", "Abundant Step" ],
		14 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (28 hp)", "Diamond Body", "Diamond Soul (SR 24)", "Abundant Step" ],
		15 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (30 hp)", "Diamond Body", "Diamond Soul (SR 25)", "Abundant Step", "Quivering Palm" ],
		16 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (32 hp)", "Diamond Body", "Diamond Soul (SR 26)", "Abundant Step", "Quivering Palm" ],
		17 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (34 hp)", "Diamond Body", "Diamond Soul (SR 27)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		18 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (36 hp)", "Diamond Body", "Diamond Soul (SR 28)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		19 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (38 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 29)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		20 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (40 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 30)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon", "Perfect Self"  ],
	},
	"monk (invisible eye style)" : {
		1 : [ "Flurry of Blows" ],
		2 : [ "Flurry of Blows", "Evasion" ],
		3 : [ "Flurry of Blows", "Evasion" ],
		4 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft." ],
		5 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft.", "Purity of Body" ],
		6 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body" ],
		7 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body", "Wholeness of Body (14 hp)" ],
		8 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (16 hp)" ],
		9 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (18 hp)" ],
		10 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (20 hp)" ],
		11 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (22 hp)", "Diamond Body" ],
		12 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (24 hp)", "Diamond Body", "Abundant Step" ],
		13 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (26 hp)", "Diamond Body", "Diamond Soul (SR 23)", "Abundant Step" ],
		14 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (28 hp)", "Diamond Body", "Diamond Soul (SR 24)", "Abundant Step" ],
		15 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (30 hp)", "Diamond Body", "Diamond Soul (SR 25)", "Abundant Step", "Quivering Palm" ],
		16 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (32 hp)", "Diamond Body", "Diamond Soul (SR 26)", "Abundant Step", "Quivering Palm" ],
		17 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (34 hp)", "Diamond Body", "Diamond Soul (SR 27)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		18 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (36 hp)", "Diamond Body", "Diamond Soul (SR 28)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		19 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (38 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 29)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		20 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (40 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 30)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon", "Perfect Self"  ],
	},
	"monk (overwhelming attack style)" : {
		1 : [ "Flurry of Blows" ],
		2 : [ "Flurry of Blows", "Evasion" ],
		3 : [ "Flurry of Blows", "Evasion" ],
		4 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft." ],
		5 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft.", "Purity of Body" ],
		6 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body" ],
		7 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body", "Wholeness of Body (14 hp)" ],
		8 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (16 hp)" ],
		9 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (18 hp)" ],
		10 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (20 hp)" ],
		11 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (22 hp)", "Diamond Body" ],
		12 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (24 hp)", "Diamond Body", "Abundant Step" ],
		13 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (26 hp)", "Diamond Body", "Diamond Soul (SR 23)", "Abundant Step" ],
		14 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (28 hp)", "Diamond Body", "Diamond Soul (SR 24)", "Abundant Step" ],
		15 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (30 hp)", "Diamond Body", "Diamond Soul (SR 25)", "Abundant Step", "Quivering Palm" ],
		16 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (32 hp)", "Diamond Body", "Diamond Soul (SR 26)", "Abundant Step", "Quivering Palm" ],
		17 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (34 hp)", "Diamond Body", "Diamond Soul (SR 27)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		18 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (36 hp)", "Diamond Body", "Diamond Soul (SR 28)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		19 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (38 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 29)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		20 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (40 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 30)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon", "Perfect Self"  ],
	},
	"monk (passive way style)" : {
		1 : [ "Flurry of Blows" ],
		2 : [ "Flurry of Blows", "Evasion" ],
		3 : [ "Flurry of Blows", "Evasion" ],
		4 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft." ],
		5 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft.", "Purity of Body" ],
		6 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body" ],
		7 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body", "Wholeness of Body (14 hp)" ],
		8 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (16 hp)" ],
		9 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (18 hp)" ],
		10 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (20 hp)" ],
		11 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (22 hp)", "Diamond Body" ],
		12 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (24 hp)", "Diamond Body", "Abundant Step" ],
		13 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (26 hp)", "Diamond Body", "Diamond Soul (SR 23)", "Abundant Step" ],
		14 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (28 hp)", "Diamond Body", "Diamond Soul (SR 24)", "Abundant Step" ],
		15 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (30 hp)", "Diamond Body", "Diamond Soul (SR 25)", "Abundant Step", "Quivering Palm" ],
		16 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (32 hp)", "Diamond Body", "Diamond Soul (SR 26)", "Abundant Step", "Quivering Palm" ],
		17 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (34 hp)", "Diamond Body", "Diamond Soul (SR 27)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		18 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (36 hp)", "Diamond Body", "Diamond Soul (SR 28)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		19 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (38 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 29)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		20 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (40 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 30)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon", "Perfect Self"  ],
	},
	"monk (sleeping tiger style)" : {
		1 : [ "Flurry of Blows" ],
		2 : [ "Flurry of Blows", "Evasion" ],
		3 : [ "Flurry of Blows", "Evasion" ],
		4 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft." ],
		5 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft.", "Purity of Body" ],
		6 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body" ],
		7 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body", "Wholeness of Body (14 hp)" ],
		8 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (16 hp)" ],
		9 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (18 hp)" ],
		10 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (20 hp)" ],
		11 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (22 hp)", "Diamond Body" ],
		12 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (24 hp)", "Diamond Body", "Abundant Step" ],
		13 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (26 hp)", "Diamond Body", "Diamond Soul (SR 23)", "Abundant Step" ],
		14 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (28 hp)", "Diamond Body", "Diamond Soul (SR 24)", "Abundant Step" ],
		15 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (30 hp)", "Diamond Body", "Diamond Soul (SR 25)", "Abundant Step", "Quivering Palm" ],
		16 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (32 hp)", "Diamond Body", "Diamond Soul (SR 26)", "Abundant Step", "Quivering Palm" ],
		17 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (34 hp)", "Diamond Body", "Diamond Soul (SR 27)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		18 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (36 hp)", "Diamond Body", "Diamond Soul (SR 28)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		19 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (38 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 29)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		20 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (40 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 30)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon", "Perfect Self"  ],
	},
	"monk (undying way style)" : {
		1 : [ "Flurry of Blows" ],
		2 : [ "Flurry of Blows", "Evasion" ],
		3 : [ "Flurry of Blows", "Evasion" ],
		4 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft." ],
		5 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft.", "Purity of Body" ],
		6 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body" ],
		7 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body", "Wholeness of Body (14 hp)" ],
		8 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (16 hp)" ],
		9 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (18 hp)" ],
		10 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (20 hp)" ],
		11 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (22 hp)", "Diamond Body" ],
		12 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (24 hp)", "Diamond Body", "Abundant Step" ],
		13 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (26 hp)", "Diamond Body", "Diamond Soul (SR 23)", "Abundant Step" ],
		14 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (28 hp)", "Diamond Body", "Diamond Soul (SR 24)", "Abundant Step" ],
		15 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (30 hp)", "Diamond Body", "Diamond Soul (SR 25)", "Abundant Step", "Quivering Palm" ],
		16 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (32 hp)", "Diamond Body", "Diamond Soul (SR 26)", "Abundant Step", "Quivering Palm" ],
		17 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (34 hp)", "Diamond Body", "Diamond Soul (SR 27)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		18 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (36 hp)", "Diamond Body", "Diamond Soul (SR 28)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		19 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (38 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 29)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		20 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (40 hp)", "Empty Body", "Diamond Body", "Diamond Soul (SR 30)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon", "Perfect Self"  ],
	},
	"monk (tough)" : {
		1 : [ "Flurry of Blows" ],
		2 : [ "Flurry of Blows", "Evasion" ],
		3 : [ "Flurry of Blows", "Evasion" ],
		4 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft." ],
		5 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 20 ft.", "Purity of Body" ],
		6 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body" ],
		7 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 30 ft.", "Purity of Body", "Wholeness of Body (14 hp)", "Damage Reduction 1/-" ],
		8 : [ "Flurry of Blows", "Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (16 hp)", "Damage Reduction 1/-" ],
		9 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (magic)", "Slow Fall 40 ft.", "Purity of Body", "Wholeness of Body (18 hp)", "Damage Reduction 1/-" ],
		10 : [ "Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (20 hp)", "Damage Reduction 2/-" ],
		11 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 50 ft.", "Purity of Body", "Wholeness of Body (22 hp)", "Damage Reduction 2/-", "Diamond Body" ],
		12 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (24 hp)", "Damage Reduction 2/-", "Diamond Body", "Abundant Step" ],
		13 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 60 ft.", "Purity of Body", "Wholeness of Body (26 hp)", "Damage Reduction 3/-", "Diamond Body", "Diamond Soul (SR 23)", "Abundant Step" ],
		14 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (28 hp)", "Damage Reduction 3/-", "Diamond Body", "Diamond Soul (SR 24)", "Abundant Step" ],
		15 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (lawful, magic)", "Slow Fall 70 ft.", "Purity of Body", "Wholeness of Body (30 hp)", "Damage Reduction 3/-", "Diamond Body", "Diamond Soul (SR 25)", "Abundant Step", "Quivering Palm" ],
		16 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (32 hp)", "Damage Reduction 4/-", "Diamond Body", "Diamond Soul (SR 26)", "Abundant Step", "Quivering Palm" ],
		17 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 80 ft.", "Purity of Body", "Wholeness of Body (34 hp)", "Damage Reduction 4/-", "Diamond Body", "Diamond Soul (SR 27)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		18 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (36 hp)", "Damage Reduction 4/-", "Diamond Body", "Diamond Soul (SR 28)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		19 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (38 hp)", "Damage Reduction 5/-", "Empty Body", "Diamond Body", "Diamond Soul (SR 29)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon" ],
		20 : [ "Greater Flurry of Blows", "Improved Evasion", "Ki Strike (adamantine, lawful, magic)", "Slow Fall 90 ft.", "Purity of Body", "Wholeness of Body (40 hp)", "Damage Reduction 5/-", "Empty Body", "Diamond Body", "Diamond Soul (SR 30)", "Abundant Step", "Quivering Palm", "Timeless Body", "Tongue of the Sun and Moon", "Perfect Self"  ],
	},

	"paladin (tyranny)" : {
                1 : [ "Aura of Evil", "Detect Good", "Smite Good 1x/day" ],
                2 : [ "Aura of Evil", "Detect Good", "Smite Good 1x/day", "Dark Blessing", "Deadly Touch" ],
		3 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 1x/day", "Dark Blessing", "Divine Health", "Deadly Touch" ],
                4 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 1x/day", "Dark Blessing", "Divine Health", "Deadly Touch" ],
                5 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 2x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Special Mount" ],
                6 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 2x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 1x/week", "Special Mount" ],
                7 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 2x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 1x/week", "Special Mount" ],
                8 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 2x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 1x/week", "Special Mount" ],
                9 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 2x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 2x/week", "Special Mount" ],
                10 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 3x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 2x/week", "Special Mount" ],
                11 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 3x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 2x/week", "Special Mount" ],
                12 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 3x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 3x/week", "Special Mount" ],
                13 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 3x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 3x/week", "Special Mount" ],
                14 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 3x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 3x/week", "Special Mount" ],
                15 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 4x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 4x/week", "Special Mount" ],
                16 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 4x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 4x/week", "Special Mount" ],
                17 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 4x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 4x/week", "Special Mount" ],
                18 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 4x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 5x/week", "Special Mount" ],
                19 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 4x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 5x/week", "Special Mount" ],
                20 : [ "Aura of Evil", "Aura of Despair", "Detect Good", "Smite Good 5x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 5x/week", "Special Mount" ],
  	},
	"fallen paladin (tyranny)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"paladin (freedom)" : {
                1 : [ "Aura of Good", "Detect Evil", "Smite Evil 1x/day" ],
                2 : [ "Aura of Good", "Detect Evil", "Smite Evil 1x/day", "Divine Grace", "Lay on Hands" ],
                3 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 1x/day", "Divine Grace", "Divine Health", "Lay on Hands" ],
                4 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 1x/day", "Divine Grace", "Divine Health", "Lay on Hands" ],
                5 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Special Mount" ],
                6 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 1x/week", "Special Mount" ],
                7 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 1x/week", "Special Mount" ],
                8 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 1x/week", "Special Mount" ],
                9 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 2x/week", "Special Mount" ],
                10 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 2x/week", "Special Mount" ],
                11 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 2x/week", "Special Mount" ],
                12 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 3x/week", "Special Mount" ],
                13 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 3x/week", "Special Mount" ],
                14 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 3x/week", "Special Mount" ],
                15 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 4x/week", "Special Mount" ],
                16 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 4x/week", "Special Mount" ],
                17 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 4x/week", "Special Mount" ],
                18 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 5x/week", "Special Mount" ],
                19 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 5x/week", "Special Mount" ],
                20 : [ "Aura of Good", "Aura of Resolve", "Detect Evil", "Smite Evil 5x/day", "Divine Grace", "Divine Health", "Lay on Hands", "Remove Disease 5x/week", "Special Mount" ],
   	},
	"fallen paladin (freedom)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"paladin (slaughter)" : {
		1 : [ "Aura of Evil", "Detect Good", "Smite Good 1x/day" ],
                2 : [ "Aura of Evil", "Detect Good", "Smite Good 1x/day", "Dark Blessing", "Deadly Touch" ],
                3 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 1x/day", "Dark Blessing", "Divine Health", "Deadly Touch" ],
                4 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 1x/day", "Dark Blessing", "Divine Health", "Deadly Touch" ],
                5 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 2x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Special Mount" ],
                6 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 2x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 1x/week", "Special Mount" ],
                7 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 2x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 1x/week", "Special Mount" ],
                8 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 2x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 1x/week", "Special Mount" ],
                9 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 2x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 2x/week", "Special Mount" ],
                10 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 3x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 2x/week", "Special Mount" ],
                11 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 3x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 2x/week", "Special Mount" ],
                12 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 3x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 3x/week", "Special Mount" ],
                13 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 3x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 3x/week", "Special Mount" ],
                14 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 3x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 3x/week", "Special Mount" ],
                15 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 4x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 4x/week", "Special Mount" ],
                16 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 4x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 4x/week", "Special Mount" ],
                17 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 4x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 4x/week", "Special Mount" ],
                18 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 4x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 5x/week", "Special Mount" ],
                19 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 4x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 5x/week", "Special Mount" ],
                20 : [ "Aura of Evil", "Debilitating Aura", "Detect Good", "Smite Good 5x/day", "Dark Blessing", "Divine Health", "Deadly Touch", "Cause Disease 5x/week", "Special Mount" ],
   	},
	"fallen paladin (slaughter)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},
	"paladin (hunter)" : {
		1 : [ "Aura of Good", "Detect Evil", "Smite Evil 1x/day" ],
		2 : [ "Aura of Good", "Detect Evil", "Smite Evil 1x/day", "Divine Grace" ],
		3 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 1x/day", "Divine Grace", "Divine Health" ],
		4 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 1x/day", "Divine Grace", "Divine Health" ],
		5 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		6 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		7 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		8 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		9 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 2x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		10 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		11 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		12 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		13 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		14 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 3x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		15 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		16 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		17 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		18 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		19 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 4x/day", "Divine Grace", "Divine Health", "Special Mount" ],
		20 : [ "Aura of Good", "Aura of Courage", "Detect Evil", "Smite Evil 5x/day", "Divine Grace", "Divine Health", "Special Mount" ],
	},
	"fallen paladin (hunter)" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
		11 : [],
		12 : [],
		13 : [],
		14 : [],
		15 : [],
		16 : [],
		17 : [],
		18 : [],
		19 : [],
		20 : [],
	},

	"ranger (planar)" : {
		1 : [ "Planar Wild Empathy", "Planar Ranger Spell Effects" ],
		2 : [ "Planar Wild Empathy", "Planar Ranger Spell Effects" ],
		3 : [ "Planar Wild Empathy", "Planar Ranger Spell Effects" ],
		4 : [ "Planar Wild Empathy", "Planar Animal Companion", "Planar Ranger Spell Effects" ],
		5 : [ "Planar Wild Empathy", "Planar Animal Companion", "Planar Ranger Spell Effects" ],
		6 : [ "Planar Wild Empathy", "Planar Animal Companion", "Planar Ranger Spell Effects" ],
		7 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Planar Ranger Spell Effects" ],
		8 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Planar Ranger Spell Effects" ],
		9 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Planar Ranger Spell Effects" ],
		10 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Planar Ranger Spell Effects" ],
		11 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Planar Ranger Spell Effects" ],
		12 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Planar Ranger Spell Effects" ],
		13 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Planar Ranger Spell Effects" ],
		14 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Planar Ranger Spell Effects" ],
		15 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Planar Ranger Spell Effects" ],
		16 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Planar Ranger Spell Effects" ],
		17 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight", "Planar Ranger Spell Effects" ],
		18 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight", "Planar Ranger Spell Effects" ],
		19 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight", "Planar Ranger Spell Effects" ],
		20 : [ "Planar Wild Empathy", "Planar Animal Companion", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight", "Planar Ranger Spell Effects" ],
	},
	"ranger (urban)" : {
		1 : [ "Limited Wild Empathy" ],
		2 : [ "Limited Wild Empathy" ],
		3 : [ "Limited Wild Empathy" ],
		4 : [ "Limited Wild Empathy", "Urbam Animal Companion" ],
		5 : [ "Limited Wild Empathy", "Urban Animal Companion" ],
		6 : [ "Limited Wild Empathy", "Urban Animal Companion" ],
		7 : [ "Limited Wild Empathy", "Urban Animal Companion" ],
		8 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker" ],
		9 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion" ],
		10 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion" ],
		11 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion" ],
		12 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion" ],
		13 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion" ],
		14 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion" ],
		15 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion" ],
		16 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion" ],
		17 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion", "Hide in plain Sight" ],
		18 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion", "Hide in plain Sight" ],
		19 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion", "Hide in plain Sight" ],
		20 : [ "Limited Wild Empathy", "Urban Animal Companion", "Swift Tracker", "Evasion", "Hide in plain Sight" ],
	},
	"ranger (shifter)" : {
		1 : [ "Fast Movement", "Wild Empathy" ],
		2 : [ "Fast Movement", "Wild Empathy" ],
		3 : [ "Fast Movement", "Wild Empathy" ],
		4 : [ "Fast Movement", "Wild Empathy", "Animal Companion" ],
		5 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 1x/day" ],
		6 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 2x/day" ],
		7 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 3x/day", "Woodland Stride" ],
		8 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 3x/day", "Woodland Stride", "Swift Tracker" ],
		9 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 3x/day", "Woodland Stride", "Swift Tracker", "Evasion" ],
		10 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 4x/day", "Woodland Stride", "Swift Tracker", "Evasion" ],
		11 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 4x/day", "Woodland Stride", "Swift Tracker", "Evasion" ],
		12 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 4x/day", "Woodland Stride", "Swift Tracker", "Evasion" ],
		13 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 4x/day", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage" ],
		14 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 5x/day", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage" ],
		15 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 5x/day", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage" ],
		16 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 5x/day", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage" ],
		17 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 5x/day", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight" ],
		18 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 6x/day", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight" ],
		19 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 6x/day", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight" ],
		20 : [ "Fast Movement", "Wild Empathy", "Animal Companion", "Wild Shape 6x/day", "Woodland Stride", "Swift Tracker", "Evasion", "Camouflage", "Hide in plain Sight" ],
	},

	"rogue (wilderness)" : {
		1 : [ "Trapfinding", "Sneak Attack +1d6" ],
		2 : [ "Trapfinding", "Sneak Attack +1d6", "Evasion" ],
		3 : [ "Trapfinding", "Sneak Attack +2d6", "Evasion" ],
		4 : [ "Trapfinding", "Sneak Attack +2d6", "Evasion", "Uncanny Dodge" ],
		5 : [ "Trapfinding", "Sneak Attack +3d6", "Evasion", "Uncanny Dodge" ],
		6 : [ "Trapfinding", "Sneak Attack +3d6", "Evasion", "Uncanny Dodge" ],
		7 : [ "Trapfinding", "Sneak Attack +4d6", "Evasion", "Uncanny Dodge" ],
		8 : [ "Trapfinding", "Sneak Attack +4d6", "Evasion", "Improved Uncanny Dodge" ],
		9 : [ "Trapfinding", "Sneak Attack +5d6", "Evasion", "Improved Uncanny Dodge" ],
		10 : [ "Trapfinding", "Sneak Attack +5d6", "Evasion", "Improved Uncanny Dodge" ],
		11 : [ "Trapfinding", "Sneak Attack +6d6", "Evasion", "Improved Uncanny Dodge" ],
		12 : [ "Trapfinding", "Sneak Attack +6d6", "Evasion", "Improved Uncanny Dodge" ],
		13 : [ "Trapfinding", "Sneak Attack +7d6", "Evasion", "Improved Uncanny Dodge" ],
		14 : [ "Trapfinding", "Sneak Attack +7d6", "Evasion", "Improved Uncanny Dodge" ],
		15 : [ "Trapfinding", "Sneak Attack +8d6", "Evasion", "Improved Uncanny Dodge" ],
		16 : [ "Trapfinding", "Sneak Attack +8d6", "Evasion", "Improved Uncanny Dodge" ],
		17 : [ "Trapfinding", "Sneak Attack +9d6", "Evasion", "Improved Uncanny Dodge" ],
		18 : [ "Trapfinding", "Sneak Attack +9d6", "Evasion", "Improved Uncanny Dodge" ],
		19 : [ "Trapfinding", "Sneak Attack +10d6", "Evasion", "Improved Uncanny Dodge" ],
		20 : [ "Trapfinding", "Sneak Attack +10d6", "Evasion", "Improved Uncanny Dodge" ],
	},
	"rogue (warrior)" : {
		1 : [ "Trapfinding" ],
		2 : [ "Trapfinding", "Evasion" ],
		3 : [ "Trapfinding", "Evasion" ],
		4 : [ "Trapfinding", "Evasion", "Uncanny Dodge" ],
		5 : [ "Trapfinding", "Evasion", "Uncanny Dodge" ],
		6 : [ "Trapfinding", "Evasion", "Uncanny Dodge" ],
		7 : [ "Trapfinding", "Evasion", "Uncanny Dodge" ],
		8 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		9 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		10 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		11 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		12 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		13 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		14 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		15 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		16 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		17 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		18 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		19 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
		20 : [ "Trapfinding", "Evasion", "Improved Uncanny Dodge" ],
	},
	
	"sorcerer (battle)" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	"sorcerer (animal companion)" : {
		1 : [ "Animal Companion" ],
		2 : [ "Animal Companion" ],
		3 : [ "Animal Companion" ],
		4 : [ "Animal Companion" ],
		5 : [ "Animal Companion" ],
		6 : [ "Animal Companion" ],
		7 : [ "Animal Companion" ],
		8 : [ "Animal Companion" ],
		9 : [ "Animal Companion" ],
		10 : [ "Animal Companion" ],
		11 : [ "Animal Companion" ],
		12 : [ "Animal Companion" ],
		13 : [ "Animal Companion" ],
		14 : [ "Animal Companion" ],
		15 : [ "Animal Companion" ],
		16 : [ "Animal Companion" ],
		17 : [ "Animal Companion" ],
		18 : [ "Animal Companion" ],
		19 : [ "Animal Companion" ],
		20 : [ "Animal Companion" ],
	},

	"wizard (animal companion)" : {
		1 : [ "Animal Companion" ],
		2 : [ "Animal Companion" ],
		3 : [ "Animal Companion" ],
		4 : [ "Animal Companion" ],
		5 : [ "Animal Companion" ],
		6 : [ "Animal Companion" ],
		7 : [ "Animal Companion" ],
		8 : [ "Animal Companion" ],
		9 : [ "Animal Companion" ],
		10 : [ "Animal Companion" ],
		11 : [ "Animal Companion" ],
		12 : [ "Animal Companion" ],
		13 : [ "Animal Companion" ],
		14 : [ "Animal Companion" ],
		15 : [ "Animal Companion" ],
		16 : [ "Animal Companion" ],
		17 : [ "Animal Companion" ],
		18 : [ "Animal Companion" ],
		19 : [ "Animal Companion" ],
		20 : [ "Animal Companion" ],
	},
	"wizard (warrior)" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},
	"wizard (domain)" : {
		1 : [ "Summon Familiar" ],
		2 : [ "Summon Familiar" ],
		3 : [ "Summon Familiar" ],
		4 : [ "Summon Familiar" ],
		5 : [ "Summon Familiar" ],
		6 : [ "Summon Familiar" ],
		7 : [ "Summon Familiar" ],
		8 : [ "Summon Familiar" ],
		9 : [ "Summon Familiar" ],
		10 : [ "Summon Familiar" ],
		11 : [ "Summon Familiar" ],
		12 : [ "Summon Familiar" ],
		13 : [ "Summon Familiar" ],
		14 : [ "Summon Familiar" ],
		15 : [ "Summon Familiar" ],
		16 : [ "Summon Familiar" ],
		17 : [ "Summon Familiar" ],
		18 : [ "Summon Familiar" ],
		19 : [ "Summon Familiar" ],
		20 : [ "Summon Familiar" ],
	},


	
	"arcane archer" : {
		1 : [ "Enhance Arrow +1" ],
		2 : [ "Enhance Arrow +1", "Imbue Arrow" ],
		3 : [ "Enhance Arrow +2", "Imbue Arrow" ],
		4 : [ "Enhance Arrow +2", "Imbue Arrow", "Seeker Arrow" ],
		5 : [ "Enhance Arrow +3", "Imbue Arrow", "Seeker Arrow" ],
		6 : [ "Enhance Arrow +3", "Imbue Arrow", "Seeker Arrow", "Phase Arrow" ],
		7 : [ "Enhance Arrow +4", "Imbue Arrow", "Seeker Arrow", "Phase Arrow" ],
		8 : [ "Enhance Arrow +4", "Imbue Arrow", "Seeker Arrow", "Phase Arrow", "Hail of Arrows" ],
		9 : [ "Enhance Arrow +5", "Imbue Arrow", "Seeker Arrow", "Phase Arrow", "Hail of Arrows" ],
		10 : [ "Enhance Arrow +5", "Imbue Arrow", "Seeker Arrow", "Phase Arrow", "Hail of Arrows", "Arrow of Death" ],
	},
	"arcane trickster" : {
		1 : [ "Ranged Legerdemain 1x/day" ],
		2 : [ "Ranged Legerdemain 1x/day", "Sneak Attack +1d6" ],
		3 : [ "Ranged Legerdemain 1x/day", "Sneak Attack +1d6", "Impromptu Sneak Attack 1x/day" ],
		4 : [ "Ranged Legerdemain 1x/day", "Sneak Attack +2d6", "Impromptu Sneak Attack 1x/day" ],
		5 : [ "Ranged Legerdemain 2x/day", "Sneak Attack +2d6", "Impromptu Sneak Attack 1x/day" ],
		6 : [ "Ranged Legerdemain 2x/day", "Sneak Attack +3d6", "Impromptu Sneak Attack 1x/day" ],
		7 : [ "Ranged Legerdemain 2x/day", "Sneak Attack +3d6", "Impromptu Sneak Attack 2x/day" ],
		8 : [ "Ranged Legerdemain 2x/day", "Sneak Attack +4d6", "Impromptu Sneak Attack 2x/day" ],
		9 : [ "Ranged Legerdemain 3x/day", "Sneak Attack +4d6", "Impromptu Sneak Attack 2x/day" ],
		10 : [ "Ranged Legerdemain 3x/day", "Sneak Attack +5d6", "Impromptu Sneak Attack 2x/day" ],
	},
	"archmage" : {
		1 : [ "" ],
		2 : [ "" ],
		3 : [ "" ],
		4 : [ "" ],
		5 : [ "" ],
	},
	"assassin" : {
		1 : [ "Sneak Attack +1d6", "Death Attack", "Poison Use" ],
		2 : [ "Sneak Attack +1d6", "Death Attack", "Poison Use", "Uncanny Dodge" ],
		3 : [ "Sneak Attack +2d6", "Death Attack", "Poison Use", "Uncanny Dodge" ],
		4 : [ "Sneak Attack +2d6", "Death Attack", "Poison Use", "Uncanny Dodge" ],
		5 : [ "Sneak Attack +3d6", "Death Attack", "Poison Use", "Improved Uncanny Dodge" ],
		6 : [ "Sneak Attack +3d6", "Death Attack", "Poison Use", "Improved Uncanny Dodge" ],
		7 : [ "Sneak Attack +4d6", "Death Attack", "Poison Use", "Improved Uncanny Dodge" ],
		8 : [ "Sneak Attack +4d6", "Death Attack", "Poison Use", "Improved Uncanny Dodge", "Hide in Plain Sight" ],
		9 : [ "Sneak Attack +5d6", "Death Attack", "Poison Use", "Improved Uncanny Dodge", "Hide in Plain Sight" ],
		10 : [ "Sneak Attack +5d6", "Death Attack", "Poison Use", "Improved Uncanny Dodge", "Hide in Plain Sight" ],
	},
	"blackguard" : {
		1 : [ "Aura of Evil", "Detect Good", "Poison Use" ],
		2 : [ "Aura of Evil", "Detect Good", "Poison Use", "Dark Blessing", "Smite Good 1x/day" ],
		3 : [ "Aura of Evil", "Detect Good", "Poison Use", "Dark Blessing", "Smite Good 1x/day", "Aura of Despair" ],
		4 : [ "Aura of Evil", "Detect Good", "Poison Use", "Dark Blessing", "Smite Good 1x/day", "Aura of Despair", "Sneak Attack +1d6" ],
		5 : [ "Aura of Evil", "Detect Good", "Poison Use", "Dark Blessing", "Smite Good 2x/day", "Aura of Despair", "Sneak Attack +1d6", "Fiendish Servant" ],
		6 : [ "Aura of Evil", "Detect Good", "Poison Use", "Dark Blessing", "Smite Good 2x/day", "Aura of Despair", "Sneak Attack +1d6", "Fiendish Servant" ],
		7 : [ "Aura of Evil", "Detect Good", "Poison Use", "Dark Blessing", "Smite Good 2x/day", "Aura of Despair", "Sneak Attack +2d6", "Fiendish Servant" ],
		8 : [ "Aura of Evil", "Detect Good", "Poison Use", "Dark Blessing", "Smite Good 2x/day", "Aura of Despair", "Sneak Attack +2d6", "Fiendish Servant" ],
		9 : [ "Aura of Evil", "Detect Good", "Poison Use", "Dark Blessing", "Smite Good 2x/day", "Aura of Despair", "Sneak Attack +2d6", "Fiendish Servant" ],
		10 : [ "Aura of Evil", "Detect Good", "Poison Use", "Dark Blessing", "Smite Good 3x/day", "Aura of Despair", "Sneak Attack +3d6", "Fiendish Servant" ],
	},
	"dragon disciple" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [ "Blindsense 30 ft." ],
		6 : [ "Blindsense 30 ft." ],
		7 : [ "Blindsense 30 ft." ],
		8 : [ "Blindsense 30 ft." ],
		9 : [ "Blindsense 30 ft.", "Wings" ],
		10 : [ "Blindsense 60 ft.", "Wings", "Low-light Vision", "Darkvision 60 ft", "Immune to Sleep and Paralysis effects" ],
	},
	"duelist" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [ "Precise Strike +1d6" ],
		6 : [ "Precise Strike +1d6", "Acrobatic Charge" ],
		7 : [ "Precise Strike +1d6", "Acrobatic Charge", "Elaborate Parry" ],
		8 : [ "Precise Strike +1d6", "Acrobatic Charge", "Elaborate Parry" ],
		9 : [ "Precise Strike +1d6", "Acrobatic Charge", "Elaborate Parry" ],
		10 : [ "Precise Strike +2d6", "Acrobatic Charge", "Elaborate Parry" ],
	},
	"dwarven defender" : {
		1 : [ "Defensive Stance 1x/day" ],
		2 : [ "Defensive Stance 1x/day", "Uncanny Dodge" ],
		3 : [ "Defensive Stance 2x/day", "Uncanny Dodge" ],
		4 : [ "Defensive Stance 2x/day", "Uncanny Dodge" ],
		5 : [ "Defensive Stance 3x/day", "Uncanny Dodge" ],
		6 : [ "Defensive Stance 3x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
		7 : [ "Defensive Stance 4x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-" ],
		8 : [ "Defensive Stance 4x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-", "Mobile Defense" ],
		9 : [ "Defensive Stance 5x/day", "Improved Uncanny Dodge", "Damage Reduction 3/-", "Mobile Defense" ],
		10 : [ "Defensive Stance 5x/day", "Improved Uncanny Dodge", "Damage Reduction 6/-", "Mobile Defense" ],
	},
	"eldritch knight" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
	},
	"hierophant" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
	},
	"horizon walker" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
	},	
	"loremaster" : {
		1 : [],
		2 : [ "Lore" ],
		3 : [ "Lore" ],
		4 : [ "Lore" ],
		5 : [ "Lore" ],
		6 : [ "Lore", "Greater Lore" ],
		7 : [ "Lore", "Greater Lore" ],
		8 : [ "Lore", "Greater Lore" ],
		9 : [ "Lore", "Greater Lore" ],
		10 : [ "Lore", "Greater Lore", "True Lore" ],
	},		
	"mystic theurge" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
	},		
	"shadowdancer" : {
		1 : [ "Hide in Plain Sight" ],
		2 : [ "Hide in Plain Sight", "Evasion", "Darkvision 60 ft", "Uncanny Dodge" ],
		3 : [ "Hide in Plain Sight", "Evasion", "Darkvision 60 ft", "Uncanny Dodge", "Shadow Illusion", "Summon Shadow" ],
		4 : [ "Hide in Plain Sight", "Evasion", "Darkvision 60 ft", "Uncanny Dodge", "Shadow Illusion", "Summon Shadow", "Shadow Jump 20 ft." ],
		5 : [ "Hide in Plain Sight", "Evasion", "Darkvision 60 ft", "Improved Uncanny Dodge", "Shadow Illusion", "Summon Shadow", "Shadow Jump 20 ft.", "Defensive Roll" ],
		6 : [ "Hide in Plain Sight", "Evasion", "Darkvision 60 ft", "Improved Uncanny Dodge", "Shadow Illusion", "Summon Shadow +2 HD", "Shadow Jump 40 ft.", "Defensive Roll" ],
		7 : [ "Hide in Plain Sight", "Evasion", "Darkvision 60 ft", "Improved Uncanny Dodge", "Shadow Illusion", "Summon Shadow +2 HD", "Shadow Jump 40 ft.", "Defensive Roll", "Slippery Mind" ],
		8 : [ "Hide in Plain Sight", "Evasion", "Darkvision 60 ft", "Improved Uncanny Dodge", "Shadow Illusion", "Summon Shadow +2 HD", "Shadow Jump 80 ft.", "Defensive Roll", "Slippery Mind" ],
		9 : [ "Hide in Plain Sight", "Evasion", "Darkvision 60 ft", "Improved Uncanny Dodge", "Shadow Illusion", "Summon Shadow +4 HD", "Shadow Jump 80 ft.", "Defensive Roll", "Slippery Mind" ],
		10 : [ "Hide in Plain Sight", "Improved Evasion", "Darkvision 60 ft", "Improved Uncanny Dodge", "Shadow Illusion", "Summon Shadow +4 HD", "Shadow Jump 160 ft.", "Defensive Roll", "Slippery Mind" ],
	},
	"thaumaturgist" : {
		1 : [ "Improved Ally" ],
		2 : [ "Improved Ally" ],
		3 : [ "Improved Ally", "Extended Summoning" ],
		4 : [ "Improved Ally", "Extended Summoning", "Contingent Conjuration" ],
		5 : [ "Improved Ally", "Extended Summoning", "Contingent Conjuration", "Planar Cohort" ],
	},
	
	"cerebremancer" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
	},		
	"elocator" : {
		1 : [ "Scorn Earth" ],
		2 : [ "Scorn Earth", "Opportunistic Strike +2" ],
		3 : [ "Scorn Earth", "Opportunistic Strike +2", "Dimension Step" ],
		4 : [ "Scorn Earth", "Opportunistic Strike +2", "Dimension Step", "Flanker" ],
		5 : [ "Scorn Earth", "Opportunistic Strike +4", "Dimension Step", "Flanker" ],
		6 : [ "Scorn Earth", "Opportunistic Strike +4", "Dimension Step", "Flanker" ],
		7 : [ "Scorn Earth", "Opportunistic Strike +4", "Dimension Step", "Flanker", "Capricious Step" ],
		8 : [ "Scorn Earth", "Opportunistic Strike +6", "Dimension Step", "Flanker", "Capricious Step" ],
		9 : [ "Scorn Earth", "Opportunistic Strike +6", "Dimension Step", "Flanker", "Capricious Step", "Dimensional Spring Attack" ],
		10 : [ "Scorn Earth", "Opportunistic Strike +6", "Dimension Step", "Flanker", "Capricious Step", "Dimensional Spring Attack", "Accelerated Action" ],
	},
	"metamind" : {
		1 : [ "Free Manifesting 1st 3x/day" ],
		2 : [ "Free Manifesting 1st 3x/day", "Cognizance Psicrystal 5 points" ],
		3 : [ "Free Manifesting 1st 3x/day, 2nd 3x/day", "Cognizance Psicrystal 5 points" ],
		4 : [ "Free Manifesting 1st 3x/day, 2nd 3x/day", "Cognizance Psicrystal 7 points" ],
		5 : [ "Free Manifesting 1st 3x/day, 2nd 3x/day, 3rd 1x/day", "Cognizance Psicrystal 7 points" ],
		6 : [ "Free Manifesting 1st 3x/day, 2nd 3x/day, 3rd 1x/day", "Cognizance Psicrystal 9 points" ],
		7 : [ "Free Manifesting 1st 3x/day, 2nd 3x/day, 3rd 1x/day, 4th 1x/day", "Cognizance Psicrystal 9 points" ],
		8 : [ "Free Manifesting 1st 3x/day, 2nd 3x/day, 3rd 1x/day, 4th 1x/day", "Cognizance Psicrystal 11 points" ],
		9 : [ "Free Manifesting 1st 3x/day, 2nd 3x/day, 3rd 1x/day, 4th 1x/day, 5th 1x/day", "Cognizance Psicrystal 11 points" ],
		10 : [ "Free Manifesting 1st 3x/day, 2nd 3x/day, 3rd 1x/day, 4th 1x/day, 5th 1x/day", "Cognizance Psicrystal 11 points", "Font of Power" ],
	},
	"psion uncarnate" : {
		1 : [ "Incorporeal Touch 1d6", "Uncarnate Armour" ],
		2 : [ "Incorporeal Touch 1d6", "Uncarnate Armour", "Shed Body 1x/day" ],
		3 : [ "Incorporeal Touch 1d6", "Uncarnate Armour", "Shed Body 1x/day", "Assume Equipment" ],
		4 : [ "Incorporeal Touch 1d6", "Uncarnate Armour", "Shed Body 1x/day", "Assume Equipment", "Assume Likeness" ],
		5 : [ "Incorporeal Touch 2d6", "Uncarnate Armour", "Shed Body 1x/day", "Assume Equipment", "Assume Likeness" ],
		6 : [ "Incorporeal Touch 2d6", "Uncarnate Armour", "Shed Body 2x/day", "Assume Equipment", "Assume Likeness" ],
		7 : [ "Incorporeal Touch 2d6", "Uncarnate Armour", "Shed Body 2x/day", "Assume Equipment", "Assume Likeness", "Telekinetic Force" ],
		8 : [ "Incorporeal Touch 2d6", "Uncarnate Armour", "Shed Body 2x/day", "Assume Equipment", "Assume Likeness", "Telekinetic Force", "Uncarnate Bridge" ],
		9 : [ "Incorporeal Touch 3d6", "Uncarnate Armour", "Shed Body 2x/day", "Assume Equipment", "Assume Likeness", "Telekinetic Force", "Uncarnate Bridge" ],
		10 : [ "Incorporeal Touch 3d6", "Uncarnate Armour", "Shed Body 2x/day", "Assume Equipment", "Assume Likeness", "Telekinetic Force", "Uncarnate Bridge", "Uncarnate" ],
	},
	"psionic fist" : {
		1 : [],
		2 : [],
		3 : [],
		4 : [],
		5 : [],
		6 : [],
		7 : [],
		8 : [],
		9 : [],
		10 : [],
	},
	"pyrokineticist" : {
		1 : [ "Fire Lash" ],
		2 : [ "Fire Lash", "Fire Resistance 10", "Hand Afire" ], 
		3 : [ "Fire Lash", "Fire Resistance 10", "Hand Afire", "Bolt of Fire" ], 
		4 : [ "Fire Lash", "Fire Resistance 10", "Hand Afire", "Bolt of Fire", "Weapon Afire" ], 
		5 : [ "Fire Lash", "Fire Resistance 10", "Hand Afire", "Bolt of Fire", "Weapon Afire", "Nimbus" ], 
		6 : [ "Fire Lash", "Fire Resistance 10", "Hand Afire", "Bolt of Fire", "Weapon Afire", "Nimbus", "Fire Walk" ], 
		7 : [ "Fire Lash", "Fire Resistance 20", "Hand Afire", "Bolt of Fire", "Weapon Afire", "Nimbus", "Fire Walk" ], 
		8 : [ "Fire Lash", "Fire Resistance 20", "Hand Afire", "Bolt of Fire", "Greater Weapon Afire", "Nimbus", "Fire Walk" ], 
		9 : [ "Fire Lash", "Fire Resistance 20", "Hand Afire", "Bolt of Fire", "Greater Weapon Afire", "Nimbus", "Fire Walk", "Heat Death" ], 
		10 : [ "Fire Lash", "Fire Resistance 20", "Hand Afire", "Bolt of Fire", "Greater Weapon Afire", "Nimbus", "Fire Walk", "Heat Death", "Conflagration" ], 
	},
	"slayer" : {
		1 : [ "Enemy Sense" ],
		2 : [ "Enemy Sense", "Brain Nausia" ],
		3 : [ "Enemy Sense", "Brain Nausia" ],
		4 : [ "Enemy Sense", "Brain Nausia" ],
		5 : [ "Enemy Sense", "Brain Nausia" ],
		6 : [ "Enemy Sense", "Brain Nausia", "Cerebral Blind" ],
		7 : [ "Enemy Sense", "Brain Nausia", "Cerebral Blind" ],
		8 : [ "Enemy Sense", "Brain Nausia", "Cerebral Blind", "Breach Power Resistance" ],
		9 : [ "Enemy Sense", "Brain Nausia", "Cerebral Blind", "Breach Power Resistance", "Cerebral Immunity" ],
		10 : [ "Enemy Sense", "Brain Nausia", "Cerebral Blind", "Breach Power Resistance", "Cerebral Immunity", "Blast Feedback" ],
	},
	"thrallherd" : {
		1 : [ "Thrallherd" ],
		2 : [ "Thrallherd" ],
		3 : [ "Thrallherd", "Psionic Charm" ],
		4 : [ "Thrallherd", "Psionic Charm" ],
		5 : [ "Thrallherd", "Psionic Charm", "Psionic Dominate" ],
		6 : [ "Thrallherd", "Psionic Charm", "Psionic Dominate" ],
		7 : [ "Thrallherd", "Psionic Charm", "Greater Psionic Dominate" ],
		8 : [ "Thrallherd", "Psionic Charm", "Greater Psionic Dominate" ],
		9 : [ "Thrallherd", "Psionic Charm", "Superior Psionic Dominate" ],
		10 : [ "Thrallherd", "Psionic Charm", "Superior Psionic Dominate", "Twofold Master" ],
	},
	"war mind" : {
		1 : [ "Chain of Personal Superiority +2" ],
		2 : [ "Chain of Personal Superiority +2", "Chain of Defensive Posture +2" ],
		3 : [ "Chain of Personal Superiority +2", "Chain of Defensive Posture +2", "Damage Reduction 1/-" ],
		4 : [ "Chain of Personal Superiority +2", "Chain of Defensive Posture +2", "Damage Reduction 1/-" ],
		5 : [ "Chain of Personal Superiority +2", "Chain of Defensive Posture +2", "Damage Reduction 1/-", "Sweeping Strike" ],
		6 : [ "Chain of Personal Superiority +2", "Chain of Defensive Posture +2", "Damage Reduction 2/-", "Sweeping Strike" ],
		7 : [ "Chain of Personal Superiority +4", "Chain of Defensive Posture +2", "Damage Reduction 2/-", "Sweeping Strike" ],
		8 : [ "Chain of Personal Superiority +4", "Chain of Defensive Posture +4", "Damage Reduction 2/-", "Sweeping Strike" ],
		9 : [ "Chain of Personal Superiority +4", "Chain of Defensive Posture +4", "Damage Reduction 3/-", "Sweeping Strike" ],
		10 : [ "Chain of Personal Superiority +4", "Chain of Defensive Posture +4", "Chain of Overwhelming Force", "Damage Reduction 3/-", "Sweeping Strike" ],
	},	

	"dwarf paragon" : {
		1 : [ "Improved Stonecunning" ],
		2 : [ "Improved Stonecunning", "Improved Darkvision 90 ft" ],
		3 : [ "Improved Stonecunning", "Improved Darkvision 90 ft" ],
	},
	"elf paragon" : {
		1 : [ "Improved Low-light Vision" ],
		2 : [ "Improved Low-light Vision" ],
		3 : [ "Improved Low-light Vision" ],
	},
	"gnome paragon" : {
		1 : [ "Illusion Aptitude" ],
		2 : [ "Illusion Aptitude", "Mirror Image" ],
		3 : [ "Illusion Aptitude", "Mirror Image" ],
	},
	"half-elf paragon" : {
		1 : [ ],
		2 : [],
		3 : [],
	},
	"half-orc paragon" : {
		1 : [],
		2 : [ "Rage 1x/day" ],
		3 : [ "Rage 1x/day" ],
	},
	"halfling paragon" : {
		1 : [],
		2 : [ "Thrown Weapon Mastery" ],
		3 : [ "Thrown Weapon Mastery" ],
	},
	"human paragon" : {
		1 : [],
		2 : [],
		3 : [],
	},
	"orc paragon" : {
		1 : [ "Improved Darkvision 90 ft" ],
		1 : [ "Improved Darkvision 90 ft", "Elf Slayer" ],
		1 : [ "Improved Darkvision 90 ft", "Elf Slayer" ],
	},

	"hauwk rider" : {
		1 : [ "Hauwk Companion" ],
		2 : [ "Hauwk Companion", "Hauwk: Quick Flier (+10 ft.)" ],
		3 : [ "Hauwk Companion", "Hauwk: Quick Flier (+10 ft.)", "Feather Falling" ],
		4 : [ "Hauwk Companion", "Hauwk: Quick Flier (+10 ft.)", "Feather Falling", "Lay on Hands" ],
		5 : [ "Hauwk Companion", "Hauwk: Quick Flier (+20 ft.)", "Feather Falling", "Lay on Hands" ],
		6 : [ "Hauwk Companion", "Hauwk: Quick Flier (+20 ft.)", "Feather Falling", "Lay on Hands" ],
		7 : [ "Hauwk Companion", "Hauwk: Quick Flier (+20 ft.)", "Feather Falling", "Lay on Hands", "Hawk Spells", "Hauwk: Shriek" ],
		8 : [ "Hauwk Companion", "Hauwk: Quick Flier (+30 ft.)", "Feather Falling", "Lay on Hands", "Hawk Spells", "Hauwk: Shriek" ],
		9 : [ "Hauwk Companion", "Hauwk: Quick Flier (+30 ft.)", "Feather Falling", "Lay on Hands", "Hawk Spells", "Hauwk: Shriek", "Hauwk: Improved Grab" ],
		10 : [ "Hauwk Companion", "Hauwk: Quick Flier (+30 ft.)", "Feather Falling", "Lay on Hands", "Hawk Spells", "Hauwk: Shriek", "Hauwk: Improved Grab", "Hauwk: Adamantine Talons", "Hauwk: Free Flier" ],
	},	

}

function getClassAbilities(className, level) {
	className = $.trim(className).toLowerCase();
	if(classAbilities[className]) {
		return classAbilities[className][level];
	}
}

var variantLists = {
	"barbarian": [ "", "Ape Totem", "Bear Totem", "Boar Totem", "Dragon Totem", "Eagle Totem", "Horse Totem", "Hunter", "Jaguar Totem", "Lion Totem", "Serpent Totem", "Wolf Totem", ],
	"bard": [ "", "Divine", "Druidic", "Sage", "Savage", ],
	"cleric": [ "", "Champion", "Cloistered", ],
	"druid": [ "", "Avenger", "Hunter", "Shifter", ],
	"fighter": [ "", "Sneak Attack", "Sneak Attack And Thug", "Thug", ],
	"monk": [ "", "Cobra Strike Style", "Denying Stance Style", "Hand and Foot Style", "Invisible Eye Style", "Overwhelming Attack Style", "Passive Way Style", "Sleeping Tiger Style", "Tough", "Undying Way Style", ],
	"paladin": [ "", "Freedom", "Hunter", "Slaughter", "Tyranny", ],
	"psion": [ "Egoist", "Kineticist", "Nomad", "Seer", "Shaper", "Telepath", ],
	"ranger": [ "", "Planar", "Shifter", "Urban", ],
	"rogue": [ "", "Warrior",  "Wilderness", ],
	"sorcerer": [ "", "Animal Companion", "Battle", ],
	"wizard": [ "", "Abjurer", "Animal Companion", "Conjurer", "Diviner", "Domain", "Enchanter", "Evoker", "Illusionist", "Necromancer", "Transmuter", "Warrior", ],
	"dragon shaman": [ "Black", "Blue", "Brass", "Bronze", "Copper", "Gold", "Green", "Red", "Silver", "White" ],
	"adept": [ "", ],
	"arcane archer": [ "", ],
	"arcane trickster": [ "", ],
	"archmage": [ "", ],
	"aristocrat": [ "", ],
	"assassin": [ "", ],
	"blackguard": [ "", ],
	"beguiler": [ "", ],
	"cerebremancer": [ "", ],
	"commoner": [ "", ],
	"dragon disciple": [ "", ],
	"dwarf paragon": [ "", ],
	"duelist": [ "", ],
	"duskblade" : [ "", ],
	"dwarven defender": [ "", ],
	"eldritch knight": [ "", ],
	"elf paragon": [ "", ],
	"elocator": [ "", ],
	"expert": [ "", ],
	"fallen cleric": [ "", "Champion", "Cloistered", ],
	"fallen dragon shaman": [ "", ],
	"fallen druid": [ "", "Avenger", "Hunter", "Slayer", ],
	"fallen knight": [ "", ],
	"fallen paladin": [ "", "Freedom", "Hunter", "Slaughter", "Tyranny", ],
	"gnome paragon": [ "", ],
	"half-elf paragon": [ "", ],
	"half-orc paragon": [ "", ],
	"halfling paragon": [ "", ],
	"hauwk rider": [ "", ],
	"hierophant": [ "", ],
	"human paragon": [ "", ],
	"horizon walker": [ "", ],
	"knight": [ "", ],
	"loremaster": [ "", ],
	"metamind": [ "", ],
	"mystic theurge": [ "", ],
	"orc paragon": [ "", ],
	"psion uncarnate": [ "", ],
	"psionic fist": [ "", ],
	"psychic warrior": [ "", ],
	"pyrokineticist": [ "", ],
	"shadowdancer": [ "", ],
	"slayer": [ "", ],
	"soul knife": [ "", ],
	"thaumaturgist": [ "", ],
	"thrallherd": [ "", ],
	"war mind": [ "", ],
	"warrior": [ "", ],
	"wilder": [ "", ],
}

var classList = [
	"Adept",
	"Arcane Archer",
	"Arcane Trickster",
	"Archmage",
	"Aristocrat",
	"Assassin",
	"Barbarian",
	"Bard",
	"Beguiler",
	"Blackguard",
	"Cerebremancer",
	"Cleric",
	"Commoner",
	"Dragon Disciple",
	"Dragon Shaman",
	"Druid",
	"Dwarf Paragon",
	"Duelist",
	"Duskblade",
	"Dwarven Defender",
	"Eldritch Knight",
	"Elf Paragon",
	"Elocator",
	"Expert",
	"Fallen Cleric",
	"Fallen Dragon Shaman",
	"Fallen Druid",
	"Fallen Paladin",
	"Fighter",
	"Gnome Paragon",
	"Half-Elf Paragon",
	"Half-Orc Paragon",
	"Halfling Paragon",
	"Hierophant",
	"Human Paragon",
	"Horizon Walker",
	"Hauwk Rider",
	"Knight",
	"Loremaster",
	"Metamind",
	"Monk",
	"Mystic Theurge",
	"Orc Paragon",
	"Paladin",
	"Psion",
	"Psion Uncarnate",
	"Psionic Fist",
	"Psychic Warrior",
	"Pyrokineticist",
	"Ranger",
	"Rogue",
	"Shadowdancer",
	"Slayer",
	"Sorcerer",
	"Soul Knife",
	"Thaumaturgist",
	"Thrallherd",
	"War Mind",
	"Warrior",
	"Wilder",
	"Wizard",
];

function getMaxLevel(classname) {

	classname = $.trim(classname.toLowerCase());

	switch(classname) {
		case "barbarian": 
		case "bard": 
		case "cleric": 
		case "druid": 
		case "fighter": 
		case "monk": 
		case "paladin": 
		case "ranger": 
		case "rogue": 
		case "sorcerer": 
		case "wizard": 
		case "beguiler":
		case "dragon shaman":
		case "duskblade":
		case "knight":
		case "psion": 
		case "psychic warrior":
		case "soul knife":
		case "wilder":
		case "adept": 
		case "aristocrat":
		case "commoner":
		case "expert":
		case "warrior":
		case "fallen cleric":
		case "fallen dragon shaman":
		case "fallen druid":
		case "fallen paladin":
		case "fallen knight":
			return 20;
		case "dwarf paragon":
		case "elf paragon":
		case "gnome paragon":
		case "half-elf paragon":
		case "half-orc paragon":
		case "halfling paragon":
		case "human paragon":
		case "orc paragon":
			return 3;
		case "arcane archer":
		case "arcane trickster":
		case "assassin":
		case "blackguard":
		case "cerebremancer":
		case "dragon disciple":
		case "duelist":
		case "dwarven defender":
		case "eldritch knight":
		case "elocator":
		case "horizon walker":
		case "hauwk rider":
		case "loremaster":
		case "metamind":
		case "mystic theurge":
		case "psion uncarnate":
		case "psionic fist":
		case "pyrokineticist":
		case "shadowdancer":
		case "slayer":
		case "thrallherd":
		case "war mind":
			return 10;
		case "archmage":
		case "hierophant":
		case "thaumaturgist":
			return 5;
		default:
			return 20;
	}

}

function monkDamage(levels, race) {
	var small = false;
	if(isSmallRace(race)) {
		small = true;
	}

	switch(levels) {
		case 1:
		case 2:
		case 3:
			if(small) {
				return "1d4";
			} else {
				return "1d6";
			}
		case 4:
		case 5:
		case 6:
		case 7:
			if(small) {
				return "1d6";
			} else {
				return "1d8";
			}
		case 8:
		case 9:
		case 10:
		case 11:
			if(small) {
				return "1d8";
			} else {
				return "1d10";
			}
		case 12:
		case 13:
		case 14:
		case 15:
			if(small) {
				return "1d10";
			} else {
				return "2d6";
			}
		case 16:
		case 17:
		case 18:
		case 19:
			if(small) {
				return "2d6";
			} else {
				return "2d8";
			}
		case 20:
			if(small) {
				return "2d8";
			} else {
				return "2d10";
			}
	}

}

function getClassHP(className) {
	
	className = $.trim(className.toLowerCase());
	
	if(classData[className]) {
		return classData[className].hp;
	} else {
		return 0;
	}
}

function getClassSP(className) {
	
	className = $.trim(className.toLowerCase());
	
	if(classData[className]) {
		return classData[className].sp;
	} else {
		return 0;
	}

}

function getClassBAB(className, levels) {
	
	className = $.trim(className.toLowerCase());
	
	if(classData[className] && classData[className].attack == HIGH_BAB) {
		return levels;
	} else if(classData[className] && classData[className].attack == MED_BAB) {
		return Math.floor(levels * 0.75);
	} else {
		return Math.floor(levels / 2);
	}
	
}

function getClassFortitudeSave(className, levels) {
	
	className = $.trim(className.toLowerCase());
	
	if(classData[className] && classData[className].fortitude == HIGH_SAVE) {
		return Math.floor(levels / 2) + 2;
	} else {
		return Math.floor(levels / 3);
	}	
}

function getClassReflexSave(className, levels) {
	
	className = $.trim(className.toLowerCase());
	
	if(classData[className] && classData[className].reflex == HIGH_SAVE) {
		return Math.floor(levels / 2) + 2;
	} else {
		return Math.floor(levels / 3);
	}	
}

function getClassWillSave(className, levels) {
	
	className = $.trim(className.toLowerCase());
	
	if(classData[className] && classData[className].will == HIGH_SAVE) {
		return Math.floor(levels / 2) + 2;
	} else {
		return Math.floor(levels / 3);
	}	
}

var featList = [
	"Acrobatic",
	"Acrobatic Strike",
	"Active Shield Defense",
	"Adaptable Flanker",
	"Agile",
	"Agile Shield Fighter",
	"Alertness",
	"Aligned Attack: Chaos",
	"Aligned Attack: Evil",
	"Aligned Attack: Good",
	"Aligned Attack: Law",
	"Animal Affinity",
	"Antipsionic Magic",
	"Arcane Accompaniment",
	"Arcane Consumption",
	"Arcane Flourish",
	"Arcane Thesis: Acid Arrow",
	"Arcane Thesis: Acid Fog",
	"Arcane Thesis: Acid Splash",
	"Arcane Thesis: Alarm",
	"Arcane Thesis: Alter Self",
	"Arcane Thesis: Analyze Dweomer",
	"Arcane Thesis: Animal Growth",
	"Arcane Thesis: Animal Messenger",
	"Arcane Thesis: Animal Trance",
	"Arcane Thesis: Animate Dead",
	"Arcane Thesis: Animate Objects",
	"Arcane Thesis: Animate Rope",
	"Arcane Thesis: Antimagic Field",
	"Arcane Thesis: Antipathy",
	"Arcane Thesis: Arcane Eye",
	"Arcane Thesis: Arcane Lock",
	"Arcane Thesis: Arcane Mark",
	"Arcane Thesis: Arcane Sight",
	"Arcane Thesis: Astral Projection",
	"Arcane Thesis: Baleful Polymorph",
	"Arcane Thesis: Banishment",
	"Arcane Thesis: Bear's Endurance",
	"Arcane Thesis: Bestow Curse",
	"Arcane Thesis: Binding",
	"Arcane Thesis: Black Tentacles",
	"Arcane Thesis: Blacklight",
	"Arcane Thesis: Blight",
	"Arcane Thesis: Blindness/Deafness",
	"Arcane Thesis: Blink",
	"Arcane Thesis: Blur",
	"Arcane Thesis: Break Enchantment",
	"Arcane Thesis: Bull's Strength",
	"Arcane Thesis: Burning Hands",
	"Arcane Thesis: Calm Emotions",
	"Arcane Thesis: Cat's Grace",
	"Arcane Thesis: Cause Fear",
	"Arcane Thesis: Chain Lightning",
	"Arcane Thesis: Charm Monster",
	"Arcane Thesis: Charm Person",
	"Arcane Thesis: Chill Touch",
	"Arcane Thesis: Circle of Death",
	"Arcane Thesis: Clairaudience/Clairvoyance",
	"Arcane Thesis: Clenched Fist",
	"Arcane Thesis: Clone",
	"Arcane Thesis: Cloudkill",
	"Arcane Thesis: Color Spray",
	"Arcane Thesis: Command Undead",
	"Arcane Thesis: Comprehend Languages",
	"Arcane Thesis: Cone of Cold",
	"Arcane Thesis: Confusion",
	"Arcane Thesis: Contact Other Plane",
	"Arcane Thesis: Contagion",
	"Arcane Thesis: Contingency",
	"Arcane Thesis: Continual Flame",
	"Arcane Thesis: Control Undead",
	"Arcane Thesis: Control Water",
	"Arcane Thesis: Control Weather",
	"Arcane Thesis: Create Greater Undead",
	"Arcane Thesis: Create Undead",
	"Arcane Thesis: Crushing Despair",
	"Arcane Thesis: Crushing Hand",
	"Arcane Thesis: Cure Critical Wounds",
	"Arcane Thesis: Cure Light Wounds",
	"Arcane Thesis: Cure Moderate Wounds",
	"Arcane Thesis: Cure Serious Wounds",
	"Arcane Thesis: Dace",
	"Arcane Thesis: Dancing Lights",
	"Arcane Thesis: Darkness",
	"Arcane Thesis: Darkvision",
	"Arcane Thesis: Daylight",
	"Arcane Thesis: Daze",
	"Arcane Thesis: Daze Monster",
	"Arcane Thesis: Deep Slumber",
	"Arcane Thesis: Deeper Darkness",
	"Arcane Thesis: Delay Poison",
	"Arcane Thesis: Delayed Blast Fireball",
	"Arcane Thesis: Demand",
	"Arcane Thesis: Detect Chaos",
	"Arcane Thesis: Detect Evil",
	"Arcane Thesis: Detect Good",
	"Arcane Thesis: Detect Law",
	"Arcane Thesis: Detect Magic",
	"Arcane Thesis: Detect Poison",
	"Arcane Thesis: Detect Scrying",
	"Arcane Thesis: Detect Secret Doors",
	"Arcane Thesis: Detect Thoughts",
	"Arcane Thesis: Detect Undead",
	"Arcane Thesis: Dimension Door",
	"Arcane Thesis: Dimensional Anchor",
	"Arcane Thesis: Dimensional Lock",
	"Arcane Thesis: Discern Location",
	"Arcane Thesis: Disguise Self",
	"Arcane Thesis: Disintegrate",
	"Arcane Thesis: Dismissal",
	"Arcane Thesis: Dispel Magic",
	"Arcane Thesis: Displacement",
	"Arcane Thesis: Disrupt Undead",
	"Arcane Thesis: Dominate Monster",
	"Arcane Thesis: Dominate Person",
	"Arcane Thesis: Dream",
	"Arcane Thesis: Dweomer of Transference",
	"Arcane Thesis: Eagle's Splendor",
	"Arcane Thesis: Endure Elements",
	"Arcane Thesis: Energy Drain",
	"Arcane Thesis: Enervation",
	"Arcane Thesis: Enlarge Person",
	"Arcane Thesis: Enthrall",
	"Arcane Thesis: Erase",
	"Arcane Thesis: Ethereal Jaunt",
	"Arcane Thesis: Etherealness",
	"Arcane Thesis: Expeditious Retreat",
	"Arcane Thesis: Explosive Runes",
	"Arcane Thesis: Eyebite",
	"Arcane Thesis: Fabricate",
	"Arcane Thesis: False Life",
	"Arcane Thesis: False Vision",
	"Arcane Thesis: Fear",
	"Arcane Thesis: Feather Fall",
	"Arcane Thesis: Feeblemind",
	"Arcane Thesis: Find the Path",
	"Arcane Thesis: Finger of Death",
	"Arcane Thesis: Fire Shield",
	"Arcane Thesis: Fire Trap",
	"Arcane Thesis: Fireball",
	"Arcane Thesis: Flame Arrow",
	"Arcane Thesis: Flaming Sphere",
	"Arcane Thesis: Flare",
	"Arcane Thesis: Flesh to Stone",
	"Arcane Thesis: Floating Disk",
	"Arcane Thesis: Fly",
	"Arcane Thesis: Fog Cloud",
	"Arcane Thesis: Forcecage",
	"Arcane Thesis: Forceful Hand",
	"Arcane Thesis: Foresight",
	"Arcane Thesis: Fox' Cunning",
	"Arcane Thesis: Fox's Cunning",
	"Arcane Thesis: Freedom",
	"Arcane Thesis: Freedom of Movement",
	"Arcane Thesis: Freezing Sphere",
	"Arcane Thesis: Gaseous Form",
	"Arcane Thesis: Gate",
	"Arcane Thesis: Geas/Quest",
	"Arcane Thesis: Gentle Repose",
	"Arcane Thesis: Ghost Sound",
	"Arcane Thesis: Ghoul Touch",
	"Arcane Thesis: Glibness",
	"Arcane Thesis: Glitterdust",
	"Arcane Thesis: Globe of Invulnerability",
	"Arcane Thesis: Glossolalia",
	"Arcane Thesis: Good Hope",
	"Arcane Thesis: Grasping Hand",
	"Arcane Thesis: Grease",
	"Arcane Thesis: Greater Arcane Sight",
	"Arcane Thesis: Greater Dispel Magic",
	"Arcane Thesis: Greater Heroism",
	"Arcane Thesis: Greater Invisibility",
	"Arcane Thesis: Greater Magic Weapon",
	"Arcane Thesis: Greater Planar Binding",
	"Arcane Thesis: Greater Prying Eyes",
	"Arcane Thesis: Greater Psychic Turmoil",
	"Arcane Thesis: Greater Scrying",
	"Arcane Thesis: Greater Shadow Conjuration",
	"Arcane Thesis: Greater Shadow Evocation",
	"Arcane Thesis: Greater Shout",
	"Arcane Thesis: Greater Teleport",
	"Arcane Thesis: Guards and Wards",
	"Arcane Thesis: Gust of Wind",
	"Arcane Thesis: Hallucinatory Terrain",
	"Arcane Thesis: Halt Undead",
	"Arcane Thesis: Hardening",
	"Arcane Thesis: Haste",
	"Arcane Thesis: Heroes' Feast",
	"Arcane Thesis: Heroism",
	"Arcane Thesis: Hideous Laughter",
	"Arcane Thesis: Hold Monster",
	"Arcane Thesis: Hold Person",
	"Arcane Thesis: Hold Portal",
	"Arcane Thesis: Horrid Wilting",
	"Arcane Thesis: Hypnotic Pattern",
	"Arcane Thesis: Hypnotism",
	"Arcane Thesis: Ice Storm",
	"Arcane Thesis: Identify",
	"Arcane Thesis: Illusory Script",
	"Arcane Thesis: Illusory Wall",
	"Arcane Thesis: Imprisonment",
	"Arcane Thesis: Incendiary Cloud",
	"Arcane Thesis: Insanity",
	"Arcane Thesis: Instant Summons",
	"Arcane Thesis: Interposing Hand",
	"Arcane Thesis: Invisibility",
	"Arcane Thesis: Invisibility Sphere",
	"Arcane Thesis: Iron Body",
	"Arcane Thesis: Irresistible Dance",
	"Arcane Thesis: Jump",
	"Arcane Thesis: Keen Edge",
	"Arcane Thesis: Knock",
	"Arcane Thesis: Know Direction",
	"Arcane Thesis: Legend Lore",
	"Arcane Thesis: Lesser Confusion",
	"Arcane Thesis: Lesser Geas",
	"Arcane Thesis: Lesser Globe of Invulnerability",
	"Arcane Thesis: Lesser Planar Binding",
	"Arcane Thesis: Lesser Telepathic Bond",
	"Arcane Thesis: Levitate",
	"Arcane Thesis: Light",
	"Arcane Thesis: Lightning Bolt",
	"Arcane Thesis: Limited Wish",
	"Arcane Thesis: Locate Creature",
	"Arcane Thesis: Locate Object",
	"Arcane Thesis: Lullaby",
	"Arcane Thesis: Maddening Scream",
	"Arcane Thesis: Mage Armor",
	"Arcane Thesis: Mage Hand",
	"Arcane Thesis: Mage's Disjunction",
	"Arcane Thesis: Mage's Faithful Hound",
	"Arcane Thesis: Mage's Lucubration",
	"Arcane Thesis: Mage's Magnificent Mansion",
	"Arcane Thesis: Mage's Private Sanctum",
	"Arcane Thesis: Mage's Sword",
	"Arcane Thesis: Magic Aura",
	"Arcane Thesis: Magic Circle against Chaos",
	"Arcane Thesis: Magic Circle against Evil",
	"Arcane Thesis: Magic Circle Against Good",
	"Arcane Thesis: Magic Circle against Law",
	"Arcane Thesis: Magic Jar",
	"Arcane Thesis: Magic Missile",
	"Arcane Thesis: Magic Mouth",
	"Arcane Thesis: Magic Weapon",
	"Arcane Thesis: Major Creation",
	"Arcane Thesis: Major Image",
	"Arcane Thesis: Mass Bear's Endurance",
	"Arcane Thesis: Mass Bull's Strength",
	"Arcane Thesis: Mass Cat's Grace",
	"Arcane Thesis: Mass Charm Monster",
	"Arcane Thesis: Mass Cure Light Wounds",
	"Arcane Thesis: Mass Cure Moderate Wounds",
	"Arcane Thesis: Mass Eagle's Splendor",
	"Arcane Thesis: Mass Enlarge Person",
	"Arcane Thesis: Mass Fox's Cunning",
	"Arcane Thesis: Mass Hold Monster",
	"Arcane Thesis: Mass Hold Person",
	"Arcane Thesis: Mass Invisibility",
	"Arcane Thesis: Mass Owl's Wisdom",
	"Arcane Thesis: Mass Reduce Person",
	"Arcane Thesis: Mass Suggestion",
	"Arcane Thesis: Maze",
	"Arcane Thesis: Mending",
	"Arcane Thesis: Mental Pinnacle",
	"Arcane Thesis: Message",
	"Arcane Thesis: Meteor Swarm",
	"Arcane Thesis: Mind Blank",
	"Arcane Thesis: Mind Fog",
	"Arcane Thesis: Minor Creation",
	"Arcane Thesis: Minor Image",
	"Arcane Thesis: Mirage Arcana",
	"Arcane Thesis: Mirror Image",
	"Arcane Thesis: Misdirection",
	"Arcane Thesis: Mislead",
	"Arcane Thesis: Mnemonic Enhancer",
	"Arcane Thesis: Modify Memory",
	"Arcane Thesis: Moment of Prescience",
	"Arcane Thesis: Mount",
	"Arcane Thesis: Move Earth",
	"Arcane Thesis: Neutralize Poison",
	"Arcane Thesis: Nightmare",
	"Arcane Thesis: Nondetection",
	"Arcane Thesis: Obscure Object",
	"Arcane Thesis: Obscuring Mist",
	"Arcane Thesis: Open/Close",
	"Arcane Thesis: Overland Flight",
	"Arcane Thesis: Owl's Wisdom",
	"Arcane Thesis: Pass Without Trace",
	"Arcane Thesis: Passwall",
	"Arcane Thesis: Permanency",
	"Arcane Thesis: Permanent Image",
	"Arcane Thesis: Persistent Image",
	"Arcane Thesis: Phantasmal Killer",
	"Arcane Thesis: Phantom Steed",
	"Arcane Thesis: Phantom Trap",
	"Arcane Thesis: Phase Door",
	"Arcane Thesis: Planar Binding",
	"Arcane Thesis: Plane Shift",
	"Arcane Thesis: Poison",
	"Arcane Thesis: Polar Ray",
	"Arcane Thesis: Polymorph",
	"Arcane Thesis: Polymorph Any Object",
	"Arcane Thesis: Power Word Blind",
	"Arcane Thesis: Power Word Kill",
	"Arcane Thesis: Power Word Stun",
	"Arcane Thesis: Prestidigitation",
	"Arcane Thesis: Prismatic Sphere",
	"Arcane Thesis: Prismatic Spray",
	"Arcane Thesis: Prismatic Wall",
	"Arcane Thesis: Probe Thoughts",
	"Arcane Thesis: Programmed Image",
	"Arcane Thesis: Project Image",
	"Arcane Thesis: Protection from Arrows",
	"Arcane Thesis: Protection from Chaos",
	"Arcane Thesis: Protection from Energy",
	"Arcane Thesis: Protection from Evil",
	"Arcane Thesis: Protection from Good",
	"Arcane Thesis: Protection from Law",
	"Arcane Thesis: Protection from Spells",
	"Arcane Thesis: Prying Eyes",
	"Arcane Thesis: Psychic Turmoil",
	"Arcane Thesis: Pyrotechnics",
	"Arcane Thesis: Rage",
	"Arcane Thesis: Rainbow Pattern",
	"Arcane Thesis: Ray of Enfeeblement",
	"Arcane Thesis: Ray of Exhaustion",
	"Arcane Thesis: Ray of Frost",
	"Arcane Thesis: Read Magic",
	"Arcane Thesis: Reduce Person",
	"Arcane Thesis: Refuge",
	"Arcane Thesis: Remove Curse",
	"Arcane Thesis: Remove Fear",
	"Arcane Thesis: Repel Vermin",
	"Arcane Thesis: Repulsion",
	"Arcane Thesis: Resilient Sphere",
	"Arcane Thesis: Resist Energy",
	"Arcane Thesis: Resistance",
	"Arcane Thesis: Reverse Gravity",
	"Arcane Thesis: Rope Trick",
	"Arcane Thesis: Scare",
	"Arcane Thesis: Scintillating Pattern",
	"Arcane Thesis: Scorching Ray",
	"Arcane Thesis: Screen",
	"Arcane Thesis: Scrying",
	"Arcane Thesis: Sculpt Sound",
	"Arcane Thesis: Secret Chest",
	"Arcane Thesis: Secret Page",
	"Arcane Thesis: Secure Shelter",
	"Arcane Thesis: See Invisibility",
	"Arcane Thesis: Seeming",
	"Arcane Thesis: Sending",
	"Arcane Thesis: Sepia Snake Sigil",
	"Arcane Thesis: Sequester",
	"Arcane Thesis: Shades",
	"Arcane Thesis: Shadow Conjuration",
	"Arcane Thesis: Shadow Evocation",
	"Arcane Thesis: Shadow Walk",
	"Arcane Thesis: Shapechange",
	"Arcane Thesis: Shatter",
	"Arcane Thesis: Shield",
	"Arcane Thesis: Shocking Grasp",
	"Arcane Thesis: Shout",
	"Arcane Thesis: Shrink Item",
	"Arcane Thesis: Silence",
	"Arcane Thesis: Silent Image",
	"Arcane Thesis: Simulacrum",
	"Arcane Thesis: Sleep",
	"Arcane Thesis: Sleet Storm",
	"Arcane Thesis: Slow",
	"Arcane Thesis: Solid Fog",
	"Arcane Thesis: Song of Discord",
	"Arcane Thesis: Soul Bind",
	"Arcane Thesis: Sound Burst",
	"Arcane Thesis: Speak with Animals",
	"Arcane Thesis: Speak with Plants",
	"Arcane Thesis: Spectral Hand",
	"Arcane Thesis: Spell Turning",
	"Arcane Thesis: Spider Climb",
	"Arcane Thesis: Statue",
	"Arcane Thesis: Stinking Cloud",
	"Arcane Thesis: Stone Shape",
	"Arcane Thesis: Stone to Flesh",
	"Arcane Thesis: Stoneskin",
	"Arcane Thesis: Suggestion",
	"Arcane Thesis: Summon Instrument",
	"Arcane Thesis: Summon Monster",
	"Arcane Thesis: Summon Monster I",
	"Arcane Thesis: Summon Monster II",
	"Arcane Thesis: Summon Monster III",
	"Arcane Thesis: Summon Monster IV",
	"Arcane Thesis: Summon Monster IX",
	"Arcane Thesis: Summon Monster V",
	"Arcane Thesis: Summon Monster VI",
	"Arcane Thesis: Summon Monster VII",
	"Arcane Thesis: Summon Monster VIII",
	"Arcane Thesis: Summon Swarm",
	"Arcane Thesis: Sunburst",
	"Arcane Thesis: Symbol of Death",
	"Arcane Thesis: Symbol of Fear",
	"Arcane Thesis: Symbol of Insanity",
	"Arcane Thesis: Symbol of Pain",
	"Arcane Thesis: Symbol of Persuasion",
	"Arcane Thesis: Symbol of Sleep",
	"Arcane Thesis: Symbol of Stunning",
	"Arcane Thesis: Symbol of Weakness",
	"Arcane Thesis: Sympathetic Vibration",
	"Arcane Thesis: Sympathy",
	"Arcane Thesis: Telekinesis",
	"Arcane Thesis: Telekinetic Sphere",
	"Arcane Thesis: Telepathic Bond",
	"Arcane Thesis: Teleport",
	"Arcane Thesis: Teleport Object",
	"Arcane Thesis: Teleportation Circle",
	"Arcane Thesis: Temporal Stasis",
	"Arcane Thesis: Time Stop",
	"Arcane Thesis: Tiny Hut",
	"Arcane Thesis: Tongues",
	"Arcane Thesis: Touch of Fatigue",
	"Arcane Thesis: Touch of Idiocy",
	"Arcane Thesis: Transformation",
	"Arcane Thesis: Transmute Mud to Rock",
	"Arcane Thesis: Transmute Rock to Mud",
	"Arcane Thesis: Trap the Soul",
	"Arcane Thesis: True Seeing",
	"Arcane Thesis: True Strike",
	"Arcane Thesis: Undeath to Death",
	"Arcane Thesis: Undetectable Alignment",
	"Arcane Thesis: Unseen Servant",
	"Arcane Thesis: Vampiric Touch",
	"Arcane Thesis: Veil",
	"Arcane Thesis: Ventriloquism",
	"Arcane Thesis: Vision",
	"Arcane Thesis: Wail of the Banshee",
	"Arcane Thesis: Wall of Fire",
	"Arcane Thesis: Wall of Force",
	"Arcane Thesis: Wall of Ice",
	"Arcane Thesis: Wall of Iron",
	"Arcane Thesis: Wall of Stone",
	"Arcane Thesis: Water Breathing",
	"Arcane Thesis: Waves of Exhaustion",
	"Arcane Thesis: Waves of Fatigue",
	"Arcane Thesis: Web",
	"Arcane Thesis: Weird",
	"Arcane Thesis: Whispering Wind",
	"Arcane Thesis: Wind Wall",
	"Arcane Thesis: Wish",
	"Arcane Thesis: Zone of Silence",
	"Arcane Thesis: Zone of Truth",
	"Arcane Toughness",
	"Armor Proficiency (Heavy)",
	"Armor Proficiency (Light)",
	"Armor Proficiency (Medium)",
	"Armor Specialization: Banded Mail",
	"Armor Specialization: Breastplate",
	"Armor Specialization: Chainmail",
	"Armor Specialization: Full Plate",
	"Armor Specialization: Halfplate",
	"Armor Specialization: Hide",
	"Armor Specialization: Scale Mail",
	"Armor Specialization: Splint Mail",
	"Athletic",
	"Augment Summoning",
	"Autonomous",
	"Battle Dancer",
	"Blind-Fight",
	"Blistering Spell",
	"Blood-spiked Charger",
	"Body Fuel",
	"Bonded Familiar",
	"Boost Construct",
	"Bounding Assault",
	"Brutal Strike",
	"Burrowing Power",
	"Celestial Sorcerer Aura",
	"Celestial Sorcerer Heritage",
	"Celestial Sorcerer Lance",
	"Celestial Sorcerer Lore",
	"Celestial Sorcerer Wings",
	"Chain Power",
	"Chaotic Mind",
	"Cleave",
	"Cloak Dance",
	"Closed Mind",
	"Combat Acrobat",
	"Combat Awareness",
	"Combat Casting",
	"Combat Cloak Expert",
	"Combat Defense",
	"Combat Expertise",
	"Combat Familiar",
	"Combat Focus",
	"Combat Manifestation",
	"Combat Panache",
	"Combat Reflexes",
	"Combat Stability",
	"Combat Strike",
	"Combat Tactician",
	"Combat Vigor",
	"Cometary Collision",
	"Companion Spellbond",
	"Craft Battle Gear",
	"Craft Permanent Item",
	"Craft Spell Dispenser",
	"Craft Spell Font",
	"Craft Spell Store",
	"Crossbow Sniper",
	"Crushing Strike",
	"Cunning Evasion",
	"Dampen Spell",
	"Deadeye Shot",
	"Deadly Precision",
	"Deceitful",
	"Deep Impact",
	"Defensive Sweep",
	"Deflect Arrows",
	"Deft Hands",
	"Delay Power",
	"Diehard",
	"Diligent",
	"Divine Armor",
	"Divine Fortune",
	"Divine Justice",
	"Divine Ward",
	"Dodge",
	"Driving Attack",
	"Earthbound Spell",
	"Einhander",
	"Elven Spell Lore: Acid Arrow",
	"Elven Spell Lore: Acid Fog",
	"Elven Spell Lore: Acid Splash",
	"Elven Spell Lore: Alarm",
	"Elven Spell Lore: Alter Self",
	"Elven Spell Lore: Analyze Dweomer",
	"Elven Spell Lore: Animal Growth",
	"Elven Spell Lore: Animate Dead",
	"Elven Spell Lore: Animate Rope",
	"Elven Spell Lore: Antimagic Field",
	"Elven Spell Lore: Antipathy",
	"Elven Spell Lore: Arcane Eye",
	"Elven Spell Lore: Arcane Lock",
	"Elven Spell Lore: Arcane Mark",
	"Elven Spell Lore: Arcane Sight",
	"Elven Spell Lore: Astral Projection",
	"Elven Spell Lore: Baleful Polymorph",
	"Elven Spell Lore: Banishment",
	"Elven Spell Lore: Bear's Endurance",
	"Elven Spell Lore: Bestow Curse",
	"Elven Spell Lore: Binding",
	"Elven Spell Lore: Black Tentacles",
	"Elven Spell Lore: Blacklight",
	"Elven Spell Lore: Blight",
	"Elven Spell Lore: Blindness/Deafness",
	"Elven Spell Lore: Blink",
	"Elven Spell Lore: Blur",
	"Elven Spell Lore: Break Enchantment",
	"Elven Spell Lore: Bull's Strength",
	"Elven Spell Lore: Burning Hands",
	"Elven Spell Lore: Cat's Grace",
	"Elven Spell Lore: Cause Fear",
	"Elven Spell Lore: Chain Lightning",
	"Elven Spell Lore: Charm Monster",
	"Elven Spell Lore: Charm Person",
	"Elven Spell Lore: Chill Touch",
	"Elven Spell Lore: Circle of Death",
	"Elven Spell Lore: Clairaudience/Clairvoyance",
	"Elven Spell Lore: Clenched Fist",
	"Elven Spell Lore: Clone",
	"Elven Spell Lore: Cloudkill",
	"Elven Spell Lore: Color Spray",
	"Elven Spell Lore: Command Undead",
	"Elven Spell Lore: Comprehend Languages",
	"Elven Spell Lore: Cone of Cold",
	"Elven Spell Lore: Confusion",
	"Elven Spell Lore: Contact Other Plane",
	"Elven Spell Lore: Contagion",
	"Elven Spell Lore: Contingency",
	"Elven Spell Lore: Continual Flame",
	"Elven Spell Lore: Control Undead",
	"Elven Spell Lore: Control Water",
	"Elven Spell Lore: Control Weather",
	"Elven Spell Lore: Create Greater Undead",
	"Elven Spell Lore: Create Undead",
	"Elven Spell Lore: Crushing Despair",
	"Elven Spell Lore: Crushing Hand",
	"Elven Spell Lore: Dancing Lights",
	"Elven Spell Lore: Darkness",
	"Elven Spell Lore: Darkvision",
	"Elven Spell Lore: Daylight",
	"Elven Spell Lore: Daze",
	"Elven Spell Lore: Daze Monster",
	"Elven Spell Lore: Deep Slumber",
	"Elven Spell Lore: Delayed Blast Fireball",
	"Elven Spell Lore: Demand",
	"Elven Spell Lore: Detect Magic",
	"Elven Spell Lore: Detect Poison",
	"Elven Spell Lore: Detect Scrying",
	"Elven Spell Lore: Detect Secret Doors",
	"Elven Spell Lore: Detect Thoughts",
	"Elven Spell Lore: Detect Undead",
	"Elven Spell Lore: Dimension Door",
	"Elven Spell Lore: Dimensional Anchor",
	"Elven Spell Lore: Dimensional Lock",
	"Elven Spell Lore: Discern Location",
	"Elven Spell Lore: Disguise Self",
	"Elven Spell Lore: Disintegrate",
	"Elven Spell Lore: Dismissal",
	"Elven Spell Lore: Dispel Magic",
	"Elven Spell Lore: Displacement",
	"Elven Spell Lore: Disrupt Undead",
	"Elven Spell Lore: Dominate Monster",
	"Elven Spell Lore: Dominate Person",
	"Elven Spell Lore: Dream",
	"Elven Spell Lore: Dweomer of Transference",
	"Elven Spell Lore: Eagle's Splendor",
	"Elven Spell Lore: Endure Elements",
	"Elven Spell Lore: Energy Drain",
	"Elven Spell Lore: Enervation",
	"Elven Spell Lore: Enlarge Person",
	"Elven Spell Lore: Erase",
	"Elven Spell Lore: Ethereal Jaunt",
	"Elven Spell Lore: Etherealness",
	"Elven Spell Lore: Expeditious Retreat",
	"Elven Spell Lore: Explosive Runes",
	"Elven Spell Lore: Eyebite",
	"Elven Spell Lore: Fabricate",
	"Elven Spell Lore: False Life",
	"Elven Spell Lore: False Vision",
	"Elven Spell Lore: Fear",
	"Elven Spell Lore: Feather Fall",
	"Elven Spell Lore: Feeblemind",
	"Elven Spell Lore: Finger of Death",
	"Elven Spell Lore: Fire Shield",
	"Elven Spell Lore: Fire Trap",
	"Elven Spell Lore: Fireball",
	"Elven Spell Lore: Flame Arrow",
	"Elven Spell Lore: Flaming Sphere",
	"Elven Spell Lore: Flare",
	"Elven Spell Lore: Flesh to Stone",
	"Elven Spell Lore: Floating Disk",
	"Elven Spell Lore: Fly",
	"Elven Spell Lore: Fog Cloud",
	"Elven Spell Lore: Forcecage",
	"Elven Spell Lore: Forceful Hand",
	"Elven Spell Lore: Foresight",
	"Elven Spell Lore: Fox's Cunning",
	"Elven Spell Lore: Freedom",
	"Elven Spell Lore: Freezing Sphere",
	"Elven Spell Lore: Gaseous Form",
	"Elven Spell Lore: Gate",
	"Elven Spell Lore: Geas/Quest",
	"Elven Spell Lore: Gentle Repose",
	"Elven Spell Lore: Ghost Sound",
	"Elven Spell Lore: Ghoul Touch",
	"Elven Spell Lore: Glitterdust",
	"Elven Spell Lore: Globe of Invulnerability",
	"Elven Spell Lore: Grasping Hand",
	"Elven Spell Lore: Grease",
	"Elven Spell Lore: Greater Arcane Sight",
	"Elven Spell Lore: Greater Dispel Magic",
	"Elven Spell Lore: Greater Heroism",
	"Elven Spell Lore: Greater Invisibility",
	"Elven Spell Lore: Greater Magic Weapon",
	"Elven Spell Lore: Greater Planar Binding",
	"Elven Spell Lore: Greater Prying Eyes",
	"Elven Spell Lore: Greater Psychic Turmoil",
	"Elven Spell Lore: Greater Scrying",
	"Elven Spell Lore: Greater Shadow Conjuration",
	"Elven Spell Lore: Greater Shadow Evocation",
	"Elven Spell Lore: Greater Shout",
	"Elven Spell Lore: Greater Teleport",
	"Elven Spell Lore: Guards and Wards",
	"Elven Spell Lore: Gust of Wind",
	"Elven Spell Lore: Hallucinatory Terrain",
	"Elven Spell Lore: Halt Undead",
	"Elven Spell Lore: Hardening",
	"Elven Spell Lore: Haste",
	"Elven Spell Lore: Heroism",
	"Elven Spell Lore: Hideous Laughter",
	"Elven Spell Lore: Hold Monster",
	"Elven Spell Lore: Hold Person",
	"Elven Spell Lore: Hold Portal",
	"Elven Spell Lore: Horrid Wilting",
	"Elven Spell Lore: Hypnotic Pattern",
	"Elven Spell Lore: Hypnotism",
	"Elven Spell Lore: Ice Storm",
	"Elven Spell Lore: Identify",
	"Elven Spell Lore: Illusory Script",
	"Elven Spell Lore: Illusory Wall",
	"Elven Spell Lore: Imprisonment",
	"Elven Spell Lore: Incendiary Cloud",
	"Elven Spell Lore: Insanity",
	"Elven Spell Lore: Instant Summons",
	"Elven Spell Lore: Interposing Hand",
	"Elven Spell Lore: Invisibility",
	"Elven Spell Lore: Invisibility Sphere",
	"Elven Spell Lore: Iron Body",
	"Elven Spell Lore: Irresistible Dance",
	"Elven Spell Lore: Jump",
	"Elven Spell Lore: Keen Edge",
	"Elven Spell Lore: Knock",
	"Elven Spell Lore: Legend Lore",
	"Elven Spell Lore: Lesser Geas",
	"Elven Spell Lore: Lesser Globe of Invulnerability",
	"Elven Spell Lore: Lesser Planar Binding",
	"Elven Spell Lore: Lesser Telepathic Bond",
	"Elven Spell Lore: Levitate",
	"Elven Spell Lore: Light",
	"Elven Spell Lore: Lightning Bolt",
	"Elven Spell Lore: Limited Wish",
	"Elven Spell Lore: Locate Creature",
	"Elven Spell Lore: Locate Object",
	"Elven Spell Lore: Maddening Scream",
	"Elven Spell Lore: Mage Armor",
	"Elven Spell Lore: Mage Hand",
	"Elven Spell Lore: Mage's Disjunction",
	"Elven Spell Lore: Mage's Faithful Hound",
	"Elven Spell Lore: Mage's Lucubration",
	"Elven Spell Lore: Mage's Magnificent Mansion",
	"Elven Spell Lore: Mage's Private Sanctum",
	"Elven Spell Lore: Mage's Sword",
	"Elven Spell Lore: Magic Aura",
	"Elven Spell Lore: Magic Circle against Chaos",
	"Elven Spell Lore: Magic Circle against Evil",
	"Elven Spell Lore: Magic Circle against Good",
	"Elven Spell Lore: Magic Circle against Law",
	"Elven Spell Lore: Magic Jar",
	"Elven Spell Lore: Magic Missile",
	"Elven Spell Lore: Magic Mouth",
	"Elven Spell Lore: Magic Weapon",
	"Elven Spell Lore: Major Creation",
	"Elven Spell Lore: Major Image",
	"Elven Spell Lore: Mass Bear's Endurance",
	"Elven Spell Lore: Mass Bull's Strength",
	"Elven Spell Lore: Mass Cat's Grace",
	"Elven Spell Lore: Mass Charm Monster",
	"Elven Spell Lore: Mass Eagle's Splendor",
	"Elven Spell Lore: Mass Enlarge Person",
	"Elven Spell Lore: Mass Fox's Cunning",
	"Elven Spell Lore: Mass Hold Monster",
	"Elven Spell Lore: Mass Hold Person",
	"Elven Spell Lore: Mass Invisibility",
	"Elven Spell Lore: Mass Owl's Wisdom",
	"Elven Spell Lore: Mass Reduce Person",
	"Elven Spell Lore: Mass Suggestion",
	"Elven Spell Lore: Maze",
	"Elven Spell Lore: Mending",
	"Elven Spell Lore: Mental Pinnacle",
	"Elven Spell Lore: Message",
	"Elven Spell Lore: Meteor Swarm",
	"Elven Spell Lore: Mind Blank",
	"Elven Spell Lore: Mind Fog",
	"Elven Spell Lore: Minor Creation",
	"Elven Spell Lore: Minor Image",
	"Elven Spell Lore: Mirage Arcana",
	"Elven Spell Lore: Mirror Image",
	"Elven Spell Lore: Misdirection",
	"Elven Spell Lore: Mislead",
	"Elven Spell Lore: Mnemonic Enhancer",
	"Elven Spell Lore: Moment of Prescience",
	"Elven Spell Lore: Mount",
	"Elven Spell Lore: Move Earth",
	"Elven Spell Lore: Nightmare",
	"Elven Spell Lore: Nondetection",
	"Elven Spell Lore: Obscure Object",
	"Elven Spell Lore: Obscuring Mist",
	"Elven Spell Lore: Open/Close",
	"Elven Spell Lore: Overland Flight",
	"Elven Spell Lore: Owl's Wisdom",
	"Elven Spell Lore: Passwall",
	"Elven Spell Lore: Permanency",
	"Elven Spell Lore: Permanent Image",
	"Elven Spell Lore: Persistent Image",
	"Elven Spell Lore: Phantasmal Killer",
	"Elven Spell Lore: Phantom Steed",
	"Elven Spell Lore: Phantom Trap",
	"Elven Spell Lore: Phase Door",
	"Elven Spell Lore: Planar Binding",
	"Elven Spell Lore: Plane Shift",
	"Elven Spell Lore: Polar Ray",
	"Elven Spell Lore: Polymorph",
	"Elven Spell Lore: Polymorph Any Object",
	"Elven Spell Lore: Power Word Blind",
	"Elven Spell Lore: Power Word Kill",
	"Elven Spell Lore: Power Word Stun",
	"Elven Spell Lore: Prestidigitation",
	"Elven Spell Lore: Prismatic Sphere",
	"Elven Spell Lore: Prismatic Spray",
	"Elven Spell Lore: Prismatic Wall",
	"Elven Spell Lore: Probe Thoughts",
	"Elven Spell Lore: Programmed Image",
	"Elven Spell Lore: Project Image",
	"Elven Spell Lore: Protection from Arrows",
	"Elven Spell Lore: Protection from Chaos",
	"Elven Spell Lore: Protection from Energy",
	"Elven Spell Lore: Protection from Evil",
	"Elven Spell Lore: Protection from Good",
	"Elven Spell Lore: Protection from Law",
	"Elven Spell Lore: Protection from Spells",
	"Elven Spell Lore: Prying Eyes",
	"Elven Spell Lore: Psychic Turmoil",
	"Elven Spell Lore: Pyrotechnics",
	"Elven Spell Lore: Rage",
	"Elven Spell Lore: Rainbow Pattern",
	"Elven Spell Lore: Ray of Enfeeblement",
	"Elven Spell Lore: Ray of Exhaustion",
	"Elven Spell Lore: Ray of Frost",
	"Elven Spell Lore: Read Magic",
	"Elven Spell Lore: Reduce Person",
	"Elven Spell Lore: Refuge",
	"Elven Spell Lore: Remove Curse",
	"Elven Spell Lore: Repulsion",
	"Elven Spell Lore: Resilient Sphere",
	"Elven Spell Lore: Resist Energy",
	"Elven Spell Lore: Resistance",
	"Elven Spell Lore: Reverse Gravity",
	"Elven Spell Lore: Rope Trick",
	"Elven Spell Lore: Scare",
	"Elven Spell Lore: Scintillating Pattern",
	"Elven Spell Lore: Scorching Ray",
	"Elven Spell Lore: Screen",
	"Elven Spell Lore: Scrying",
	"Elven Spell Lore: Secret Chest",
	"Elven Spell Lore: Secret Page",
	"Elven Spell Lore: Secure Shelter",
	"Elven Spell Lore: See Invisibility",
	"Elven Spell Lore: Seeming",
	"Elven Spell Lore: Sending",
	"Elven Spell Lore: Sepia Snake Sigil",
	"Elven Spell Lore: Sequester",
	"Elven Spell Lore: Shades",
	"Elven Spell Lore: Shadow Conjuration",
	"Elven Spell Lore: Shadow Evocation",
	"Elven Spell Lore: Shadow Walk",
	"Elven Spell Lore: Shapechange",
	"Elven Spell Lore: Shatter",
	"Elven Spell Lore: Shield",
	"Elven Spell Lore: Shocking Grasp",
	"Elven Spell Lore: Shout",
	"Elven Spell Lore: Shrink Item",
	"Elven Spell Lore: Silent Image",
	"Elven Spell Lore: Simulacrum",
	"Elven Spell Lore: Sleep",
	"Elven Spell Lore: Sleet Storm",
	"Elven Spell Lore: Slow",
	"Elven Spell Lore: Solid Fog",
	"Elven Spell Lore: Soul Bind",
	"Elven Spell Lore: Spectral Hand",
	"Elven Spell Lore: Spell Turning",
	"Elven Spell Lore: Spider Climb",
	"Elven Spell Lore: Statue",
	"Elven Spell Lore: Stinking Cloud",
	"Elven Spell Lore: Stone Shape",
	"Elven Spell Lore: Stone to Flesh",
	"Elven Spell Lore: Stoneskin",
	"Elven Spell Lore: Suggestion",
	"Elven Spell Lore: Summon Monster I",
	"Elven Spell Lore: Summon Monster II",
	"Elven Spell Lore: Summon Monster III",
	"Elven Spell Lore: Summon Monster IV",
	"Elven Spell Lore: Summon Monster IX",
	"Elven Spell Lore: Summon Monster V",
	"Elven Spell Lore: Summon Monster VI",
	"Elven Spell Lore: Summon Monster VII",
	"Elven Spell Lore: Summon Monster VIII",
	"Elven Spell Lore: Summon Swarm",
	"Elven Spell Lore: Sunburst",
	"Elven Spell Lore: Symbol of Death",
	"Elven Spell Lore: Symbol of Fear",
	"Elven Spell Lore: Symbol of Insanity",
	"Elven Spell Lore: Symbol of Pain",
	"Elven Spell Lore: Symbol of Persuasion",
	"Elven Spell Lore: Symbol of Sleep",
	"Elven Spell Lore: Symbol of Stunning",
	"Elven Spell Lore: Symbol of Weakness",
	"Elven Spell Lore: Sympathy",
	"Elven Spell Lore: Telekinesis",
	"Elven Spell Lore: Telekinetic Sphere",
	"Elven Spell Lore: Telepathic Bond",
	"Elven Spell Lore: Teleport",
	"Elven Spell Lore: Teleport Object",
	"Elven Spell Lore: Teleportation Circle",
	"Elven Spell Lore: Temporal Stasis",
	"Elven Spell Lore: Time Stop",
	"Elven Spell Lore: Tiny Hut",
	"Elven Spell Lore: Tongues",
	"Elven Spell Lore: Touch of Fatigue",
	"Elven Spell Lore: Touch of Idiocy",
	"Elven Spell Lore: Transformation",
	"Elven Spell Lore: Transmute Mud to Rock",
	"Elven Spell Lore: Transmute Rock to Mud",
	"Elven Spell Lore: Trap the Soul",
	"Elven Spell Lore: True Seeing",
	"Elven Spell Lore: True Strike",
	"Elven Spell Lore: Undeath to Death",
	"Elven Spell Lore: Unseen Servant",
	"Elven Spell Lore: Vampiric Touch",
	"Elven Spell Lore: Veil",
	"Elven Spell Lore: Ventriloquism",
	"Elven Spell Lore: Vision",
	"Elven Spell Lore: Wail of the Banshee",
	"Elven Spell Lore: Wall of Fire",
	"Elven Spell Lore: Wall of Force",
	"Elven Spell Lore: Wall of Ice",
	"Elven Spell Lore: Wall of Iron",
	"Elven Spell Lore: Wall of Stone",
	"Elven Spell Lore: Water Breathing",
	"Elven Spell Lore: Waves of Exhaustion",
	"Elven Spell Lore: Waves of Fatigue",
	"Elven Spell Lore: Web",
	"Elven Spell Lore: Weird",
	"Elven Spell Lore: Whispering Wind",
	"Elven Spell Lore: Wind Wall",
	"Elven Spell Lore: Wish",
	"Empower Power",
	"Empower Spell",
	"Endurance",
	"Enlarge Power",
	"Enlarge Spell",
	"Eschew Materials",
	"Exotic Weapon Proficiency: Bastard Sword",
	"Exotic Weapon Proficiency: Bolas",
	"Exotic Weapon Proficiency: Dire Flail",
	"Exotic Weapon Proficiency: Dwarven Urgrosh",
	"Exotic Weapon Proficiency: Dwarven Waraxe",
	"Exotic Weapon Proficiency: Gnome Hooked Hammer",
	"Exotic Weapon Proficiency: Hand Crossbow",
	"Exotic Weapon Proficiency: Kama",
	"Exotic Weapon Proficiency: Net",
	"Exotic Weapon Proficiency: Nunchaku",
	"Exotic Weapon Proficiency: Orc Double Axe",
	"Exotic Weapon Proficiency: Repeating Heavy Crossbow",
	"Exotic Weapon Proficiency: Repeating Light Crossbow",
	"Exotic Weapon Proficiency: Sai",
	"Exotic Weapon Proficiency: Shuriken",
	"Exotic Weapon Proficiency: Siangham",
	"Exotic Weapon Proficiency: Spiked Chain",
	"Exotic Weapon Proficiency: Two-bladed Sword",
	"Exotic Weapon Proficiency: Whip",
	"Expanded Knowledge: Adapt Body",
	"Expanded Knowledge: Affinity Field",
	"Expanded Knowledge: Anchored Navigation",
	"Expanded Knowledge: Animal Affinity",
	"Expanded Knowledge: Apopsi",
	"Expanded Knowledge: Assimilate",
	"Expanded Knowledge: Astral Caravan",
	"Expanded Knowledge: Astral Construct",
	"Expanded Knowledge: Astral Seed",
	"Expanded Knowledge: Astral Traveler",
	"Expanded Knowledge: Attraction",
	"Expanded Knowledge: Aura Alteration",
	"Expanded Knowledge: Aura Sight",
	"Expanded Knowledge: Aversion",
	"Expanded Knowledge: Baleful Teleport",
	"Expanded Knowledge: Bend Reality",
	"Expanded Knowledge: Bestow Power",
	"Expanded Knowledge: Biofeedback",
	"Expanded Knowledge: Bite of the Wolf",
	"Expanded Knowledge: Body Adjustment",
	"Expanded Knowledge: Body Equilibrium",
	"Expanded Knowledge: Body Purification",
	"Expanded Knowledge: Bolt",
	"Expanded Knowledge: Brain Lock",
	"Expanded Knowledge: Breath of the Black Dragon",
	"Expanded Knowledge: Burst",
	"Expanded Knowledge: Call to Mind",
	"Expanded Knowledge: Call Weaponry",
	"Expanded Knowledge: Catapsi",
	"Expanded Knowledge: Catfall",
	"Expanded Knowledge: Chameleon",
	"Expanded Knowledge: Clairtangent Hand",
	"Expanded Knowledge: Clairvoyant Sense",
	"Expanded Knowledge: Claw of Energy",
	"Expanded Knowledge: Claws of the Beast",
	"Expanded Knowledge: Claws of the Vampire",
	"Expanded Knowledge: Cloud Mind",
	"Expanded Knowledge: Co-Opt Concentration",
	"Expanded Knowledge: Compression",
	"Expanded Knowledge: Conceal Thoughts",
	"Expanded Knowledge: Concealing Amorpha",
	"Expanded Knowledge: Concussion Blast",
	"Expanded Knowledge: Control Air",
	"Expanded Knowledge: Control Body",
	"Expanded Knowledge: Control Flames",
	"Expanded Knowledge: Control Light",
	"Expanded Knowledge: Control Object",
	"Expanded Knowledge: Control Sound",
	"Expanded Knowledge: Correspond",
	"Expanded Knowledge: Create Sound",
	"Expanded Knowledge: Crisis of Breath",
	"Expanded Knowledge: Crisis of Life",
	"Expanded Knowledge: Crystal Shard",
	"Expanded Knowledge: Crystallize",
	"Expanded Knowledge: Danger Sense",
	"Expanded Knowledge: Death Urge",
	"Expanded Knowledge: Deceleration",
	"Expanded Knowledge: Decerebrate",
	"Expanded Knowledge: Defensive Precognition",
	"Expanded Knowledge: Deja Vu",
	"Expanded Knowledge: Demoralize",
	"Expanded Knowledge: Destiny Dissonance",
	"Expanded Knowledge: Detect Hostile Intent",
	"Expanded Knowledge: Detect Psionics",
	"Expanded Knowledge: Detect Remote Viewing",
	"Expanded Knowledge: Detect Teleportation",
	"Expanded Knowledge: Dimension Slide",
	"Expanded Knowledge: Dimension Swap",
	"Expanded Knowledge: Disable",
	"Expanded Knowledge: Dismiss Ectoplasm",
	"Expanded Knowledge: Dispel Psionics",
	"Expanded Knowledge: Dispelling Buffer",
	"Expanded Knowledge: Dissipating Touch",
	"Expanded Knowledge: Dissolving Touch",
	"Expanded Knowledge: Dissolving Weapon",
	"Expanded Knowledge: Distract",
	"Expanded Knowledge: Divert Teleport",
	"Expanded Knowledge: Dream Travel",
	"Expanded Knowledge: Duodimensional Claw",
	"Expanded Knowledge: Ecto Protection",
	"Expanded Knowledge: Ectoplasmic Cocoon",
	"Expanded Knowledge: Ectoplasmic Form",
	"Expanded Knowledge: Ectoplasmic Shambler",
	"Expanded Knowledge: Ego Whip",
	"Expanded Knowledge: Elfsight",
	"Expanded Knowledge: Empathic Feedback",
	"Expanded Knowledge: Empathic Transfer",
	"Expanded Knowledge: Empathy",
	"Expanded Knowledge: Empty Mind",
	"Expanded Knowledge: Energy Adaptation",
	"Expanded Knowledge: Energy Ball",
	"Expanded Knowledge: Energy Bolt",
	"Expanded Knowledge: Energy Burst",
	"Expanded Knowledge: Energy Cone",
	"Expanded Knowledge: Energy Conversion",
	"Expanded Knowledge: Energy Current",
	"Expanded Knowledge: Energy Missile",
	"Expanded Knowledge: Energy Push",
	"Expanded Knowledge: Energy Ray",
	"Expanded Knowledge: Energy Retort",
	"Expanded Knowledge: Energy Stun",
	"Expanded Knowledge: Energy Wall",
	"Expanded Knowledge: Energy Wave",
	"Expanded Knowledge: Entangling Ectoplasm",
	"Expanded Knowledge: Eradicate Invisibility",
	"Expanded Knowledge: Escape Detection",
	"Expanded Knowledge: Evade Burst",
	"Expanded Knowledge: Exhalation of the Black Dragon",
	"Expanded Knowledge: Expansion",
	"Expanded Knowledge: False Sensory Input",
	"Expanded Knowledge: Far Hand",
	"Expanded Knowledge: Fate Link",
	"Expanded Knowledge: Fate of One",
	"Expanded Knowledge: Feat Leech",
	"Expanded Knowledge: Fiery Discorporation",
	"Expanded Knowledge: Fission",
	"Expanded Knowledge: Float",
	"Expanded Knowledge: Force Screen",
	"Expanded Knowledge: Forced Sense Link",
	"Expanded Knowledge: Forced Share Pain",
	"Expanded Knowledge: Form of Doom",
	"Expanded Knowledge: Fuse Flesh",
	"Expanded Knowledge: Fusion",
	"Expanded Knowledge: Genesis",
	"Expanded Knowledge: Graft Weapon",
	"Expanded Knowledge: Greater Concealing Amorpha",
	"Expanded Knowledge: Greater Metamorphosis",
	"Expanded Knowledge: Greater Precognition",
	"Expanded Knowledge: Greater Psionic Fabricate",
	"Expanded Knowledge: Grip of Iron",
	"Expanded Knowledge: Hail of Crystals",
	"Expanded Knowledge: Hammer",
	"Expanded Knowledge: Hostile Empathic Transfer",
	"Expanded Knowledge: Hustle",
	"Expanded Knowledge: Hypercognition",
	"Expanded Knowledge: Id Insinuation",
	"Expanded Knowledge: Immovability",
	"Expanded Knowledge: Incarnate",
	"Expanded Knowledge: Inertial Armor",
	"Expanded Knowledge: Inertial Barrier",
	"Expanded Knowledge: Inflict Pain",
	"Expanded Knowledge: Insanity",
	"Expanded Knowledge: Intellect Fortress",
	"Expanded Knowledge: Know Direction and Location",
	"Expanded Knowledge: Leech Field",
	"Expanded Knowledge: Mass Cloud Mind",
	"Expanded Knowledge: Mass Ectoplasmic Cocoon",
	"Expanded Knowledge: Mass Missive",
	"Expanded Knowledge: Mass Time Hop",
	"Expanded Knowledge: Matter Agitation",
	"Expanded Knowledge: Matter Manipulation",
	"Expanded Knowledge: Mental Barrier",
	"Expanded Knowledge: Mental Disruption",
	"Expanded Knowledge: Metaconcert",
	"Expanded Knowledge: Metafaculty",
	"Expanded Knowledge: Metamorphosis",
	"Expanded Knowledge: Metaphysical Claw",
	"Expanded Knowledge: Metaphysical Weapon",
	"Expanded Knowledge: Microcosm",
	"Expanded Knowledge: Mind Probe",
	"Expanded Knowledge: Mind Seed",
	"Expanded Knowledge: Mind Switch",
	"Expanded Knowledge: Mind Thrust",
	"Expanded Knowledge: Mind Trap",
	"Expanded Knowledge: Mindlink",
	"Expanded Knowledge: Mindwipe",
	"Expanded Knowledge: Missive",
	"Expanded Knowledge: My Light",
	"Expanded Knowledge: Null Psionics Field",
	"Expanded Knowledge: Oak Body",
	"Expanded Knowledge: Object Reading",
	"Expanded Knowledge: Offensive Precognition",
	"Expanded Knowledge: Offensive Prescience",
	"Expanded Knowledge: Painful Strike",
	"Expanded Knowledge: Personal Mind Blank",
	"Expanded Knowledge: Personality Parasite",
	"Expanded Knowledge: Power Leech",
	"Expanded Knowledge: Power Resistance",
	"Expanded Knowledge: Precognition",
	"Expanded Knowledge: Prevenom",
	"Expanded Knowledge: Prevenom Weapon",
	"Expanded Knowledge: Prowess",
	"Expanded Knowledge: Psionic Banishment",
	"Expanded Knowledge: Psionic Blast",
	"Expanded Knowledge: Psionic Charm",
	"Expanded Knowledge: Psionic Contingency",
	"Expanded Knowledge: Psionic Darkvision",
	"Expanded Knowledge: Psionic Daze",
	"Expanded Knowledge: Psionic Dimension Door",
	"Expanded Knowledge: Psionic Dimensional Anchor",
	"Expanded Knowledge: Psionic Disintegrate",
	"Expanded Knowledge: Psionic Dismissal",
	"Expanded Knowledge: Psionic Divination",
	"Expanded Knowledge: Psionic Dominate",
	"Expanded Knowledge: Psionic Ethereal Jaunt",
	"Expanded Knowledge: Psionic Etherealness",
	"Expanded Knowledge: Psionic Fabricate",
	"Expanded Knowledge: Psionic Fly",
	"Expanded Knowledge: Psionic Freedom of Movement",
	"Expanded Knowledge: Psionic Grease",
	"Expanded Knowledge: Psionic Greater Teleport",
	"Expanded Knowledge: Psionic Identify",
	"Expanded Knowledge: Psionic Iron Body",
	"Expanded Knowledge: Psionic Keen Edge",
	"Expanded Knowledge: Psionic Knock",
	"Expanded Knowledge: Psionic Levitate",
	"Expanded Knowledge: Psionic Lion's Charge",
	"Expanded Knowledge: Psionic Lock",
	"Expanded Knowledge: Psionic Major Creation",
	"Expanded Knowledge: Psionic Mind Blank",
	"Expanded Knowledge: Psionic Minor Creation",
	"Expanded Knowledge: Psionic Modify Memory",
	"Expanded Knowledge: Psionic Moment of Prescience",
	"Expanded Knowledge: Psionic Overland Flight",
	"Expanded Knowledge: Psionic Phase Door",
	"Expanded Knowledge: Psionic Plane Shift",
	"Expanded Knowledge: Psionic Repair Damage",
	"Expanded Knowledge: Psionic Restoration",
	"Expanded Knowledge: Psionic Revivify",
	"Expanded Knowledge: Psionic Scent",
	"Expanded Knowledge: Psionic Sequester",
	"Expanded Knowledge: Psionic Suggestion",
	"Expanded Knowledge: Psionic Telekinetic Sphere",
	"Expanded Knowledge: Psionic Teleport",
	"Expanded Knowledge: Psionic Teleportation Circle",
	"Expanded Knowledge: Psionic Tongues",
	"Expanded Knowledge: Psionic True Seeing",
	"Expanded Knowledge: Psychic Chirurgery",
	"Expanded Knowledge: Psychic Crush",
	"Expanded Knowledge: Psychic Reformation",
	"Expanded Knowledge: Psychic Vampire",
	"Expanded Knowledge: Psychofeedback",
	"Expanded Knowledge: Quintessence",
	"Expanded Knowledge: Read Thoughts",
	"Expanded Knowledge: Reality Revision",
	"Expanded Knowledge: Recall Agony",
	"Expanded Knowledge: Recall Death",
	"Expanded Knowledge: Reddopsi",
	"Expanded Knowledge: Remote View Trap",
	"Expanded Knowledge: Remote Viewing",
	"Expanded Knowledge: Restore Extremity",
	"Expanded Knowledge: Retrieve",
	"Expanded Knowledge: Schism",
	"Expanded Knowledge: Second Chance",
	"Expanded Knowledge: Sense Link",
	"Expanded Knowledge: Sensitivity to Psychic Impressions",
	"Expanded Knowledge: Shadow Body",
	"Expanded Knowledge: Share Pain",
	"Expanded Knowledge: Shatter Mind Blank",
	"Expanded Knowledge: Skate",
	"Expanded Knowledge: Solicit Psicrystal",
	"Expanded Knowledge: Specified Energy Adaptation",
	"Expanded Knowledge: Steadfast Perception",
	"Expanded Knowledge: Stomp",
	"Expanded Knowledge: Strength of My Enemy",
	"Expanded Knowledge: Suspend Life",
	"Expanded Knowledge: Sustenance",
	"Expanded Knowledge: Swarm of Crystals",
	"Expanded Knowledge: Synesthete",
	"Expanded Knowledge: Telekinetic Force",
	"Expanded Knowledge: Telekinetic Maneuver",
	"Expanded Knowledge: Telekinetic Thrust",
	"Expanded Knowledge: Telempathic Projection",
	"Expanded Knowledge: Teleport Trigger",
	"Expanded Knowledge: Temporal Acceleration",
	"Expanded Knowledge: Thicken Skin",
	"Expanded Knowledge: Thieving Mindlink",
	"Expanded Knowledge: Thought Shield",
	"Expanded Knowledge: Time Hop",
	"Expanded Knowledge: Time Regression",
	"Expanded Knowledge: Timeless Body",
	"Expanded Knowledge: Tornado Blast",
	"Expanded Knowledge: Touchsight",
	"Expanded Knowledge: Tower of Iron Will",
	"Expanded Knowledge: Trace Teleport",
	"Expanded Knowledge: True Creation",
	"Expanded Knowledge: True Metabolism",
	"Expanded Knowledge: True Mind Switch",
	"Expanded Knowledge: Truevenom",
	"Expanded Knowledge: Truevenom Weapon",
	"Expanded Knowledge: Ubiquitous Vision",
	"Expanded Knowledge: Ultrablast",
	"Expanded Knowledge: Vampiric Blade",
	"Expanded Knowledge: Vigor",
	"Expanded Knowledge: Wall of Ectoplasm",
	"Expanded Knowledge: Wall Walker",
	"Expanded Knowledge: Weapon of Energy",
	"Extend Power",
	"Extend Spell",
	"Extra Turning",
	"Fade Into Violence",
	"Far Shot",
	"Fell Shot",
	"Fiery Fist",
	"Fiery Ki Defense",
	"Flash Frost Spell",
	"Flay",
	"Focused Sunder",
	"Force Of Will",
	"Ghost Attack",
	"Great Cleave",
	"Great Fortitude",
	"Greater Manyshot",
	"Greater Power Penetration",
	"Greater Power Specialization",
	"Greater Psionic Endowment",
	"Greater Psionic Fist",
	"Greater Psionic Shot",
	"Greater Psionic Weapon",
	"Greater Spell Focus: Abjuration",
	"Greater Spell Focus: Conjuration",
	"Greater Spell Focus: Divination",
	"Greater Spell Focus: Enchantment",
	"Greater Spell Focus: Evocation",
	"Greater Spell Focus: Illusion",
	"Greater Spell Focus: Necromancy",
	"Greater Spell Focus: Transmutation",
	"Greater Spell Penetration",
	"Greater Two-Weapon Fighting",
	"Greater Weapon Focus: Bastard Sword",
	"Greater Weapon Focus: Battleaxe",
	"Greater Weapon Focus: Bolas",
	"Greater Weapon Focus: Club",
	"Greater Weapon Focus: Dagger",
	"Greater Weapon Focus: Dart",
	"Greater Weapon Focus: Dire Flail",
	"Greater Weapon Focus: Dwarven Urgrosh",
	"Greater Weapon Focus: Dwarven Waraxe",
	"Greater Weapon Focus: Falchion",
	"Greater Weapon Focus: Fire Lash",
	"Greater Weapon Focus: Flail",
	"Greater Weapon Focus: Gauntlet",
	"Greater Weapon Focus: Glaive",
	"Greater Weapon Focus: Gnome Hooked Hammer",
	"Greater Weapon Focus: Grapple",
	"Greater Weapon Focus: Greataxe",
	"Greater Weapon Focus: Greatclub",
	"Greater Weapon Focus: Greatsword",
	"Greater Weapon Focus: Guisarme",
	"Greater Weapon Focus: Halberd",
	"Greater Weapon Focus: Hand Crossbow",
	"Greater Weapon Focus: Handaxe",
	"Greater Weapon Focus: Heavy Crossbow",
	"Greater Weapon Focus: Heavy Flail",
	"Greater Weapon Focus: Heavy Mace",
	"Greater Weapon Focus: Heavy Pick",
	"Greater Weapon Focus: Javelin",
	"Greater Weapon Focus: Kama",
	"Greater Weapon Focus: Kukri",
	"Greater Weapon Focus: Lance",
	"Greater Weapon Focus: Light Crossbow",
	"Greater Weapon Focus: Light Hammer",
	"Greater Weapon Focus: Light Mace",
	"Greater Weapon Focus: Light Pick",
	"Greater Weapon Focus: Longbow",
	"Greater Weapon Focus: Longspear",
	"Greater Weapon Focus: Longsword",
	"Greater Weapon Focus: Mind Blade",
	"Greater Weapon Focus: Morningstar",
	"Greater Weapon Focus: Net",
	"Greater Weapon Focus: Nunchaku",
	"Greater Weapon Focus: Orc Double Axe",
	"Greater Weapon Focus: Punching Dagger",
	"Greater Weapon Focus: Quarterstaff",
	"Greater Weapon Focus: Ranseur",
	"Greater Weapon Focus: Rapier",
	"Greater Weapon Focus: Ray",
	"Greater Weapon Focus: Repeating Heavy Crossbow",
	"Greater Weapon Focus: Repeating Light Crossbow",
	"Greater Weapon Focus: Sai",
	"Greater Weapon Focus: Sap",
	"Greater Weapon Focus: Scimitar",
	"Greater Weapon Focus: Scythe",
	"Greater Weapon Focus: Short Sword",
	"Greater Weapon Focus: Shortbow",
	"Greater Weapon Focus: Shortspear",
	"Greater Weapon Focus: Shuriken",
	"Greater Weapon Focus: Siangham",
	"Greater Weapon Focus: Sickle",
	"Greater Weapon Focus: Sling",
	"Greater Weapon Focus: Spear",
	"Greater Weapon Focus: Spiked Armour",
	"Greater Weapon Focus: Spiked Chain",
	"Greater Weapon Focus: Spiked Gauntlet",
	"Greater Weapon Focus: Spiked Heavy Shield",
	"Greater Weapon Focus: Spiked Light Shield",
	"Greater Weapon Focus: Throwing Axe",
	"Greater Weapon Focus: Trident",
	"Greater Weapon Focus: Two-bladed Sword",
	"Greater Weapon Focus: Unarmed Strike",
	"Greater Weapon Focus: Warhammer",
	"Greater Weapon Focus: Whip",
	"Greater Weapon Specialization: Bastard Sword",
	"Greater Weapon Specialization: Battleaxe",
	"Greater Weapon Specialization: Bolas",
	"Greater Weapon Specialization: Club",
	"Greater Weapon Specialization: Dagger",
	"Greater Weapon Specialization: Dart",
	"Greater Weapon Specialization: Dire Flail",
	"Greater Weapon Specialization: Dwarven Urgrosh",
	"Greater Weapon Specialization: Dwarven Waraxe",
	"Greater Weapon Specialization: Falchion",
	"Greater Weapon Specialization: Fire Lash",
	"Greater Weapon Specialization: Flail",
	"Greater Weapon Specialization: Gauntlet",
	"Greater Weapon Specialization: Glaive",
	"Greater Weapon Specialization: Gnome Hooked Hammer",
	"Greater Weapon Specialization: Grapple",
	"Greater Weapon Specialization: Greataxe",
	"Greater Weapon Specialization: Greatclub",
	"Greater Weapon Specialization: Greatsword",
	"Greater Weapon Specialization: Guisarme",
	"Greater Weapon Specialization: Halberd",
	"Greater Weapon Specialization: Hand Crossbow",
	"Greater Weapon Specialization: Handaxe",
	"Greater Weapon Specialization: Heavy Crossbow",
	"Greater Weapon Specialization: Heavy Flail",
	"Greater Weapon Specialization: Heavy Mace",
	"Greater Weapon Specialization: Heavy Pick",
	"Greater Weapon Specialization: Javelin",
	"Greater Weapon Specialization: Kama",
	"Greater Weapon Specialization: Kukri",
	"Greater Weapon Specialization: Lance",
	"Greater Weapon Specialization: Light Crossbow",
	"Greater Weapon Specialization: Light Hammer",
	"Greater Weapon Specialization: Light Mace",
	"Greater Weapon Specialization: Light Pick",
	"Greater Weapon Specialization: Longbow",
	"Greater Weapon Specialization: Longspear",
	"Greater Weapon Specialization: Longsword",
	"Greater Weapon Specialization: Mind Blade",
	"Greater Weapon Specialization: Morningstar",
	"Greater Weapon Specialization: Net",
	"Greater Weapon Specialization: Nunchaku",
	"Greater Weapon Specialization: Orc Double Axe",
	"Greater Weapon Specialization: Punching Dagger",
	"Greater Weapon Specialization: Quarterstaff",
	"Greater Weapon Specialization: Ranseur",
	"Greater Weapon Specialization: Rapier",
	"Greater Weapon Specialization: Repeating Heavy Crossbow",
	"Greater Weapon Specialization: Repeating Light Crossbow",
	"Greater Weapon Specialization: Sai",
	"Greater Weapon Specialization: Sap",
	"Greater Weapon Specialization: Scimitar",
	"Greater Weapon Specialization: Scythe",
	"Greater Weapon Specialization: Short Sword",
	"Greater Weapon Specialization: Shortbow",
	"Greater Weapon Specialization: Shortspear",
	"Greater Weapon Specialization: Shuriken",
	"Greater Weapon Specialization: Siangham",
	"Greater Weapon Specialization: Sickle",
	"Greater Weapon Specialization: Sling",
	"Greater Weapon Specialization: Spear",
	"Greater Weapon Specialization: Spiked Armour",
	"Greater Weapon Specialization: Spiked Chain",
	"Greater Weapon Specialization: Spiked Gauntlet",
	"Greater Weapon Specialization: Spiked Heavy Shield",
	"Greater Weapon Specialization: Spiked Light Shield",
	"Greater Weapon Specialization: Throwing Axe",
	"Greater Weapon Specialization: Trident",
	"Greater Weapon Specialization: Two-bladed Sword",
	"Greater Weapon Specialization: Unarmed Strike",
	"Greater Weapon Specialization: Warhammer",
	"Greater Weapon Specialization: Whip",
	"Grenadier",
	"Heighten Spell",
	"Hindering Opportunist",
	"Hostile Mind",
	"Imbued Summoning",
	"Improved Bull Rush",
	"Improved Counterspell",
	"Improved Critical: Bastard Sword",
	"Improved Critical: Battleaxe",
	"Improved Critical: Bolas",
	"Improved Critical: Club",
	"Improved Critical: Dagger",
	"Improved Critical: Dart",
	"Improved Critical: Dire Flail",
	"Improved Critical: Dwarven Urgrosh",
	"Improved Critical: Dwarven Waraxe",
	"Improved Critical: Falchion",
	"Improved Critical: Fire Lash",
	"Improved Critical: Flail",
	"Improved Critical: Gauntlet",
	"Improved Critical: Glaive",
	"Improved Critical: Gnome Hooked Hammer",
	"Improved Critical: Greataxe",
	"Improved Critical: Greatclub",
	"Improved Critical: Greatsword",
	"Improved Critical: Guisarme",
	"Improved Critical: Halberd",
	"Improved Critical: Hand Crossbow",
	"Improved Critical: Handaxe",
	"Improved Critical: Heavy Crossbow",
	"Improved Critical: Heavy Flail",
	"Improved Critical: Heavy Mace",
	"Improved Critical: Heavy Pick",
	"Improved Critical: Javelin",
	"Improved Critical: Kama",
	"Improved Critical: Kukri",
	"Improved Critical: Lance",
	"Improved Critical: Light Crossbow",
	"Improved Critical: Light Hammer",
	"Improved Critical: Light Mace",
	"Improved Critical: Light Pick",
	"Improved Critical: Longbow",
	"Improved Critical: Longspear",
	"Improved Critical: Longsword",
	"Improved Critical: Mind Blade",
	"Improved Critical: Morningstar",
	"Improved Critical: Net",
	"Improved Critical: Nunchaku",
	"Improved Critical: Orc Double Axe",
	"Improved Critical: Punching Dagger",
	"Improved Critical: Quarterstaff",
	"Improved Critical: Ranseur",
	"Improved Critical: Rapier",
	"Improved Critical: Repeating Heavy Crossbow",
	"Improved Critical: Repeating Light Crossbow",
	"Improved Critical: Sai",
	"Improved Critical: Sap",
	"Improved Critical: Scimitar",
	"Improved Critical: Scythe",
	"Improved Critical: Short Sword",
	"Improved Critical: Shortbow",
	"Improved Critical: Shortspear",
	"Improved Critical: Shuriken",
	"Improved Critical: Siangham",
	"Improved Critical: Sickle",
	"Improved Critical: Sling",
	"Improved Critical: Spear",
	"Improved Critical: Spiked Armour",
	"Improved Critical: Spiked Chain",
	"Improved Critical: Spiked Gauntlet",
	"Improved Critical: Spiked Heavy Shield",
	"Improved Critical: Spiked Light Shield",
	"Improved Critical: Throwing Axe",
	"Improved Critical: Trident",
	"Improved Critical: Two-bladed Sword",
	"Improved Critical: Unarmed Strike",
	"Improved Critical: Warhammer",
	"Improved Critical: Whip",
	"Improved Disarm",
	"Improved Familiar",
	"Improved Feint",
	"Improved Grapple",
	"Improved Initiative",
	"Improved Overrun",
	"Improved Precise Shot",
	"Improved Psicrystal",
	"Improved Shield Bash",
	"Improved Sunder",
	"Improved Trip",
	"Improved Turning",
	"Improved Two-Weapon Fighting",
	"Improved Unarmed Strike",
	"Indomitable Soul",
	"Infernal Sorcerer Eyes",
	"Infernal Sorcerer Heritage",
	"Infernal Sorcerer Howl",
	"Infernal Sorcerer Resistance",
	"Inquisitor",
	"Intimidating Strike",
	"Investigator",
	"Iron Will",
	"Keen-eared Scout",
	"Ki Blast",
	"Leadership",
	"Leap of the Heavens",
	"Lightning Reflexes",
	"Lunging Strike",
	"Lurking Familiar",
	"Mad Alchemist",
	"Mad Foam Rager",
	"Magical Aptitude",
	"Manyshot",
	"Martial Weapon Proficiency: Battleaxe",
	"Martial Weapon Proficiency: Falchion",
	"Martial Weapon Proficiency: Flail",
	"Martial Weapon Proficiency: Glaive",
	"Martial Weapon Proficiency: Greataxe",
	"Martial Weapon Proficiency: Greatclub",
	"Martial Weapon Proficiency: Greatsword",
	"Martial Weapon Proficiency: Guisarme",
	"Martial Weapon Proficiency: Halberd",
	"Martial Weapon Proficiency: Handaxe",
	"Martial Weapon Proficiency: Heavy Flail",
	"Martial Weapon Proficiency: Heavy Pick",
	"Martial Weapon Proficiency: Kukri",
	"Martial Weapon Proficiency: Lance",
	"Martial Weapon Proficiency: Light Hammer",
	"Martial Weapon Proficiency: Light Pick",
	"Martial Weapon Proficiency: Longbow",
	"Martial Weapon Proficiency: Longsword",
	"Martial Weapon Proficiency: Ranseur",
	"Martial Weapon Proficiency: Rapier",
	"Martial Weapon Proficiency: Sap",
	"Martial Weapon Proficiency: Scimitar",
	"Martial Weapon Proficiency: Scythe",
	"Martial Weapon Proficiency: Short Sword",
	"Martial Weapon Proficiency: Shortbow",
	"Martial Weapon Proficiency: Spiked Armour",
	"Martial Weapon Proficiency: Spiked Heavy Shield",
	"Martial Weapon Proficiency: Spiked Light Shield",
	"Martial Weapon Proficiency: Throwing Axe",
	"Martial Weapon Proficiency: Trident",
	"Martial Weapon Proficiency: Warhammer",
	"Master Manipulator",
	"Maximize Power",
	"Maximize Spell",
	"Melee Evasion",
	"Melee Weapon Mastery: Bludgeoning",
	"Melee Weapon Mastery: Piercing",
	"Melee Weapon Mastery: Slashing",
	"Mental Leap",
	"Mental Resistance",
	"Metamorphic Transfer",
	"Mind Over Body",
	"Mobility",
	"Mounted Archery",
	"Mounted Combat",
	"Narrow Mind",
	"Natural Spell",
	"Negotiator",
	"Nimble Fingers",
	"Open Minded",
	"Opportunity Power",
	"Overchannel",
	"Overwhelming Assault",
	"Penetrating Shot",
	"Persuasive",
	"Point Blank Shot",
	"Power Attack",
	"Power Penetration",
	"Power Specialization",
	"Precise Shot",
	"Profane Aura",
	"Psicrystal Affinity",
	"Psicrystal Containment",
	"Psionic Affinity",
	"Psionic Body",
	"Psionic Charge",
	"Psionic Dodge",
	"Psionic Endowment",
	"Psionic Fist",
	"Psionic Hole",
	"Psionic Meditation",
	"Psionic Shot",
	"Psionic Talent",
	"Psionic Weapon",
	"Quick Draw",
	"Quicken Power",
	"Quicken Spell",
	"Ranged Weapon Mastery: Bludgeoning",
	"Ranged Weapon Mastery: Piercing",
	"Ranged Weapon Mastery: Slashing",
	"Rapid Blitz",
	"Rapid Metabolism",
	"Rapid Reload: Hand Crossbow",
	"Rapid Reload: Heavy Crossbow",
	"Rapid Reload: Light Crossbow",
	"Rapid Shot",
	"Reckless Offense",
	"Return Shot",
	"Ride-By Attack",
	"Ritual Blessing",
	"Ritual Blood Bonds",
	"Robilars Gambit",
	"Run",
	"Sacred Healing",
	"Sacred Purification",
	"Sacred Radiance",
	"Self-Sufficient",
	"Shadow Striker",
	"Shield Proficiency",
	"Shield Sling",
	"Shield Specialization: Buckler",
	"Shield Specialization: Heavy",
	"Shield Specialization: Light",
	"Shield Ward",
	"Short Haft",
	"Shot On The Run",
	"Sidestep Charge",
	"Silent Spell",
	"Simple Weapon Proficiency",
	"Skill Focus: Appraise",
	"Skill Focus: Autohypnosis",
	"Skill Focus: Balance",
	"Skill Focus: Bluff",
	"Skill Focus: Climb",
	"Skill Focus: Concentration",
	"Skill Focus: Craft: Alchemy",
	"Skill Focus: Craft: Armoursmithing",
	"Skill Focus: Craft: Blacksmithing",
	"Skill Focus: Craft: Bowmaking",
	"Skill Focus: Craft: Leatherworking",
	"Skill Focus: Craft: Masonry",
	"Skill Focus: Craft: Poison",
	"Skill Focus: Craft: Shipbuilding",
	"Skill Focus: Craft: Tailoring",
	"Skill Focus: Craft: Weaponsmithing",
	"Skill Focus: Craft: Woodworking",
	"Skill Focus: Decipher Script",
	"Skill Focus: Diplomacy",
	"Skill Focus: Disable Device",
	"Skill Focus: Disguise",
	"Skill Focus: Escape Artist",
	"Skill Focus: Forgery",
	"Skill Focus: Gather Information",
	"Skill Focus: Handle Animal",
	"Skill Focus: Heal",
	"Skill Focus: Hide",
	"Skill Focus: Intimidate",
	"Skill Focus: Jump",
	"Skill Focus: Knowledge: Arcana",
	"Skill Focus: Knowledge: Architecture and Engineering",
	"Skill Focus: Knowledge: Dungeoneering",
	"Skill Focus: Knowledge: Geography",
	"Skill Focus: Knowledge: History",
	"Skill Focus: Knowledge: Local",
	"Skill Focus: Knowledge: Nature",
	"Skill Focus: Knowledge: Nobility and Royalty",
	"Skill Focus: Knowledge: Psionics",
	"Skill Focus: Knowledge: Religion",
	"Skill Focus: Knowledge: The Planes",
	"Skill Focus: Listen",
	"Skill Focus: Move Silently",
	"Skill Focus: Open Lock",
	"Skill Focus: Perform: Act",
	"Skill Focus: Perform: Comedy",
	"Skill Focus: Perform: Dance",
	"Skill Focus: Perform: Juggle",
	"Skill Focus: Perform: Keyboard Instruments",
	"Skill Focus: Perform: Oratory",
	"Skill Focus: Perform: Percussion Instruments",
	"Skill Focus: Perform: Sing",
	"Skill Focus: Perform: String Instruments",
	"Skill Focus: Perform: Wind Instruments",
	"Skill Focus: Profession: Apothecary",
	"Skill Focus: Profession: Artist",
	"Skill Focus: Profession: Astronomer",
	"Skill Focus: Profession: Boater",
	"Skill Focus: Profession: Bookkeeper",
	"Skill Focus: Profession: Brewer",
	"Skill Focus: Profession: Butcher",
	"Skill Focus: Profession: Butler",
	"Skill Focus: Profession: Cartographer",
	"Skill Focus: Profession: Cook",
	"Skill Focus: Profession: Driver",
	"Skill Focus: Profession: Farmer",
	"Skill Focus: Profession: Fisher",
	"Skill Focus: Profession: Guide",
	"Skill Focus: Profession: Herbalist",
	"Skill Focus: Profession: Herder",
	"Skill Focus: Profession: Hunter",
	"Skill Focus: Profession: Innkeeper",
	"Skill Focus: Profession: Lumberjack",
	"Skill Focus: Profession: Miller",
	"Skill Focus: Profession: Miner",
	"Skill Focus: Profession: Prostitute",
	"Skill Focus: Profession: Rancher",
	"Skill Focus: Profession: Sailor",
	"Skill Focus: Profession: Scribe",
	"Skill Focus: Profession: Tanner",
	"Skill Focus: Profession: Teamster",
	"Skill Focus: Profession: Woodcutter",
	"Skill Focus: Ride",
	"Skill Focus: Search",
	"Skill Focus: Sense Motive",
	"Skill Focus: Sleight of Hand",
	"Skill Focus: Speak Language",
	"Skill Focus: Spellcraft",
	"Skill Focus: Spot",
	"Skill Focus: Survival",
	"Skill Focus: Swim",
	"Skill Focus: Tumble",
	"Skill Focus: Use Magic Device",
	"Skill Focus: Use Rope",
	"Slashing Flurry",
	"Smiting Spell",
	"Snatch Arrows",
	"Spectral Skirmisher",
	"Speed Of Thought",
	"Spell Focus: Abjuration",
	"Spell Focus: Conjuration",
	"Spell Focus: Divination",
	"Spell Focus: Enchantment",
	"Spell Focus: Evocation",
	"Spell Focus: Illusion",
	"Spell Focus: Necromancy",
	"Spell Focus: Transmutation",
	"Spell Mastery",
	"Spell Penetration",
	"Spell-linked Familiar",
	"Spirited Charge",
	"Split Psionic Ray",
	"Spring Attack",
	"Stalwart Defense",
	"Stand Still",
	"Steadfast Determination",
	"Stealthy",
	"Still Spell",
	"Stunning Fist",
	"Talented",
	"Telling Blow",
	"Toughness",
	"Tower Shield Proficiency",
	"Track",
	"Trample",
	"Tumbling Feint",
	"Twin Power",
	"Two-Weapon Defense",
	"Two-Weapon Fighting",
	"Two-weapon Pounce",
	"Two-weapon Rend",
	"Unavoidable Strike",
	"Unconditional Power",
	"Up The Walls",
	"Urban Tracking",
	"Vatic Gaze",
	"Versatile Unarmed Strike",
	"Vexing Flanker",
	"Water Splitting Stone",
	"Weapon Finesse",
	"Weapon Focus: Bastard Sword",
	"Weapon Focus: Battleaxe",
	"Weapon Focus: Bolas",
	"Weapon Focus: Club",
	"Weapon Focus: Dagger",
	"Weapon Focus: Dart",
	"Weapon Focus: Dire Flail",
	"Weapon Focus: Dwarven Urgrosh",
	"Weapon Focus: Dwarven Waraxe",
	"Weapon Focus: Falchion",
	"Weapon Focus: Fire Lash",
	"Weapon Focus: Flail",
	"Weapon Focus: Gauntlet",
	"Weapon Focus: Glaive",
	"Weapon Focus: Gnome Hooked Hammer",
	"Weapon Focus: Grapple",
	"Weapon Focus: Greataxe",
	"Weapon Focus: Greatclub",
	"Weapon Focus: Greatsword",
	"Weapon Focus: Guisarme",
	"Weapon Focus: Halberd",
	"Weapon Focus: Hand Crossbow",
	"Weapon Focus: Handaxe",
	"Weapon Focus: Heavy Crossbow",
	"Weapon Focus: Heavy Flail",
	"Weapon Focus: Heavy Mace",
	"Weapon Focus: Heavy Pick",
	"Weapon Focus: Javelin",
	"Weapon Focus: Kama",
	"Weapon Focus: Kukri",
	"Weapon Focus: Lance",
	"Weapon Focus: Light Crossbow",
	"Weapon Focus: Light Hammer",
	"Weapon Focus: Light Mace",
	"Weapon Focus: Light Pick",
	"Weapon Focus: Longbow",
	"Weapon Focus: Longspear",
	"Weapon Focus: Longsword",
	"Weapon Focus: Mind Blade",
	"Weapon Focus: Morningstar",
	"Weapon Focus: Net",
	"Weapon Focus: Nunchaku",
	"Weapon Focus: Orc Double Axe",
	"Weapon Focus: Punching Dagger",
	"Weapon Focus: Quarterstaff",
	"Weapon Focus: Ranseur",
	"Weapon Focus: Rapier",
	"Weapon Focus: Ray",
	"Weapon Focus: Repeating Heavy Crossbow",
	"Weapon Focus: Repeating Light Crossbow",
	"Weapon Focus: Sai",
	"Weapon Focus: Sap",
	"Weapon Focus: Scimitar",
	"Weapon Focus: Scythe",
	"Weapon Focus: Short Sword",
	"Weapon Focus: Shortbow",
	"Weapon Focus: Shortspear",
	"Weapon Focus: Shuriken",
	"Weapon Focus: Siangham",
	"Weapon Focus: Sickle",
	"Weapon Focus: Sling",
	"Weapon Focus: Spear",
	"Weapon Focus: Spiked Armour",
	"Weapon Focus: Spiked Chain",
	"Weapon Focus: Spiked Gauntlet",
	"Weapon Focus: Spiked Heavy Shield",
	"Weapon Focus: Spiked Light Shield",
	"Weapon Focus: Throwing Axe",
	"Weapon Focus: Trident",
	"Weapon Focus: Two-bladed Sword",
	"Weapon Focus: Unarmed Strike",
	"Weapon Focus: Warhammer",
	"Weapon Focus: Whip",
	"Weapon Specialization: Bastard Sword",
	"Weapon Specialization: Battleaxe",
	"Weapon Specialization: Bolas",
	"Weapon Specialization: Club",
	"Weapon Specialization: Dagger",
	"Weapon Specialization: Dart",
	"Weapon Specialization: Dire Flail",
	"Weapon Specialization: Dwarven Urgrosh",
	"Weapon Specialization: Dwarven Waraxe",
	"Weapon Specialization: Falchion",
	"Weapon Specialization: Fire Lash",
	"Weapon Specialization: Flail",
	"Weapon Specialization: Gauntlet",
	"Weapon Specialization: Glaive",
	"Weapon Specialization: Gnome Hooked Hammer",
	"Weapon Specialization: Grapple",
	"Weapon Specialization: Greataxe",
	"Weapon Specialization: Greatclub",
	"Weapon Specialization: Greatsword",
	"Weapon Specialization: Guisarme",
	"Weapon Specialization: Halberd",
	"Weapon Specialization: Hand Crossbow",
	"Weapon Specialization: Handaxe",
	"Weapon Specialization: Heavy Crossbow",
	"Weapon Specialization: Heavy Flail",
	"Weapon Specialization: Heavy Mace",
	"Weapon Specialization: Heavy Pick",
	"Weapon Specialization: Javelin",
	"Weapon Specialization: Kama",
	"Weapon Specialization: Kukri",
	"Weapon Specialization: Lance",
	"Weapon Specialization: Light Crossbow",
	"Weapon Specialization: Light Hammer",
	"Weapon Specialization: Light Mace",
	"Weapon Specialization: Light Pick",
	"Weapon Specialization: Longbow",
	"Weapon Specialization: Longspear",
	"Weapon Specialization: Longsword",
	"Weapon Specialization: Mind Blade",
	"Weapon Specialization: Morningstar",
	"Weapon Specialization: Net",
	"Weapon Specialization: Nunchaku",
	"Weapon Specialization: Orc Double Axe",
	"Weapon Specialization: Punching Dagger",
	"Weapon Specialization: Quarterstaff",
	"Weapon Specialization: Ranseur",
	"Weapon Specialization: Rapier",
	"Weapon Specialization: Repeating Heavy Crossbow",
	"Weapon Specialization: Repeating Light Crossbow",
	"Weapon Specialization: Sai",
	"Weapon Specialization: Sap",
	"Weapon Specialization: Scimitar",
	"Weapon Specialization: Scythe",
	"Weapon Specialization: Short Sword",
	"Weapon Specialization: Shortbow",
	"Weapon Specialization: Shortspear",
	"Weapon Specialization: Shuriken",
	"Weapon Specialization: Siangham",
	"Weapon Specialization: Sickle",
	"Weapon Specialization: Sling",
	"Weapon Specialization: Spear",
	"Weapon Specialization: Spiked Armour",
	"Weapon Specialization: Spiked Chain",
	"Weapon Specialization: Spiked Gauntlet",
	"Weapon Specialization: Spiked Heavy Shield",
	"Weapon Specialization: Spiked Light Shield",
	"Weapon Specialization: Throwing Axe",
	"Weapon Specialization: Trident",
	"Weapon Specialization: Two-bladed Sword",
	"Weapon Specialization: Unarmed Strike",
	"Weapon Specialization: Warhammer",
	"Weapon Specialization: Whip",
	"Weapon Supremacy",
	"Whirlwind Attack",
	"Widen Power",
	"Widen Spell",
	"Wild Talent",
	"Wounding Attack",
];

function isPsionicFeat(feat) {
	feat = $.trim(feat.toLowerCase());
	switch(feat) {
		case "aligned attack":
		case "body fuel":
		case "boost construct":
		case "combat manifestation":
		case "deep impact":
		case "expanded knowledge: adapt body":
		case "expanded knowledge: affinity field":
		case "expanded knowledge: anchored navigation":
		case "expanded knowledge: animal affinity":
		case "expanded knowledge: apopsi":
		case "expanded knowledge: assimilate":
		case "expanded knowledge: astral caravan":
		case "expanded knowledge: astral construct":
		case "expanded knowledge: astral seed":
		case "expanded knowledge: astral traveler":
		case "expanded knowledge: attraction":
		case "expanded knowledge: aura alteration":
		case "expanded knowledge: aura sight":
		case "expanded knowledge: aversion":
		case "expanded knowledge: baleful teleport":
		case "expanded knowledge: bend reality":
		case "expanded knowledge: bestow power":
		case "expanded knowledge: biofeedback":
		case "expanded knowledge: bite of the wolf":
		case "expanded knowledge: body adjustment":
		case "expanded knowledge: body equilibrium":
		case "expanded knowledge: body purification":
		case "expanded knowledge: bolt":
		case "expanded knowledge: brain lock":
		case "expanded knowledge: breath of the black dragon":
		case "expanded knowledge: burst":
		case "expanded knowledge: call to mind":
		case "expanded knowledge: call weaponry":
		case "expanded knowledge: catapsi":
		case "expanded knowledge: catfall":
		case "expanded knowledge: chameleon":
		case "expanded knowledge: clairtangent hand":
		case "expanded knowledge: clairvoyant sense":
		case "expanded knowledge: claw of energy":
		case "expanded knowledge: claws of the beast":
		case "expanded knowledge: claws of the vampire":
		case "expanded knowledge: cloud mind":
		case "expanded knowledge: co-opt concentration":
		case "expanded knowledge: compression":
		case "expanded knowledge: conceal thoughts":
		case "expanded knowledge: concealing amorpha":
		case "expanded knowledge: concussion blast":
		case "expanded knowledge: control air":
		case "expanded knowledge: control body":
		case "expanded knowledge: control flames":
		case "expanded knowledge: control light":
		case "expanded knowledge: control object":
		case "expanded knowledge: control sound":
		case "expanded knowledge: correspond":
		case "expanded knowledge: create sound":
		case "expanded knowledge: crisis of breath":
		case "expanded knowledge: crisis of life":
		case "expanded knowledge: crystal shard":
		case "expanded knowledge: crystallize":
		case "expanded knowledge: danger sense":
		case "expanded knowledge: death urge":
		case "expanded knowledge: deceleration":
		case "expanded knowledge: decerebrate":
		case "expanded knowledge: defensive precognition":
		case "expanded knowledge: deja vu":
		case "expanded knowledge: demoralize":
		case "expanded knowledge: destiny dissonance":
		case "expanded knowledge: detect hostile intent":
		case "expanded knowledge: detect psionics":
		case "expanded knowledge: detect remote viewing":
		case "expanded knowledge: detect teleportation":
		case "expanded knowledge: dimension slide":
		case "expanded knowledge: dimension swap":
		case "expanded knowledge: disable":
		case "expanded knowledge: dismiss ectoplasm":
		case "expanded knowledge: dispel psionics":
		case "expanded knowledge: dispelling buffer":
		case "expanded knowledge: dissipating touch":
		case "expanded knowledge: dissolving touch":
		case "expanded knowledge: dissolving weapon":
		case "expanded knowledge: distract":
		case "expanded knowledge: divert teleport":
		case "expanded knowledge: dream travel":
		case "expanded knowledge: duodimensional claw":
		case "expanded knowledge: ecto protection":
		case "expanded knowledge: ectoplasmic cocoon":
		case "expanded knowledge: ectoplasmic form":
		case "expanded knowledge: ectoplasmic shambler":
		case "expanded knowledge: ego whip":
		case "expanded knowledge: elfsight":
		case "expanded knowledge: empathic feedback":
		case "expanded knowledge: empathic transfer":
		case "expanded knowledge: empathy":
		case "expanded knowledge: empty mind":
		case "expanded knowledge: energy adaptation":
		case "expanded knowledge: energy ball":
		case "expanded knowledge: energy bolt":
		case "expanded knowledge: energy burst":
		case "expanded knowledge: energy cone":
		case "expanded knowledge: energy conversion":
		case "expanded knowledge: energy current":
		case "expanded knowledge: energy missile":
		case "expanded knowledge: energy push":
		case "expanded knowledge: energy ray":
		case "expanded knowledge: energy retort":
		case "expanded knowledge: energy stun":
		case "expanded knowledge: energy wall":
		case "expanded knowledge: energy wave":
		case "expanded knowledge: entangling ectoplasm":
		case "expanded knowledge: eradicate invisibility":
		case "expanded knowledge: escape detection":
		case "expanded knowledge: evade burst":
		case "expanded knowledge: exhalation of the black dragon":
		case "expanded knowledge: expansion":
		case "expanded knowledge: false sensory input":
		case "expanded knowledge: far hand":
		case "expanded knowledge: fate link":
		case "expanded knowledge: fate of one":
		case "expanded knowledge: feat leech":
		case "expanded knowledge: fiery discorporation":
		case "expanded knowledge: fission":
		case "expanded knowledge: float":
		case "expanded knowledge: force screen":
		case "expanded knowledge: forced sense link":
		case "expanded knowledge: forced share pain":
		case "expanded knowledge: form of doom":
		case "expanded knowledge: fuse flesh":
		case "expanded knowledge: fusion":
		case "expanded knowledge: genesis":
		case "expanded knowledge: graft weapon":
		case "expanded knowledge: greater concealing amorpha":
		case "expanded knowledge: greater metamorphosis":
		case "expanded knowledge: greater precognition":
		case "expanded knowledge: greater psionic fabricate":
		case "expanded knowledge: grip of iron":
		case "expanded knowledge: hail of crystals":
		case "expanded knowledge: hammer":
		case "expanded knowledge: hostile empathic transfer":
		case "expanded knowledge: hustle":
		case "expanded knowledge: hypercognition":
		case "expanded knowledge: id insinuation":
		case "expanded knowledge: immovability":
		case "expanded knowledge: incarnate":
		case "expanded knowledge: inertial armor":
		case "expanded knowledge: inertial barrier":
		case "expanded knowledge: inflict pain":
		case "expanded knowledge: insanity":
		case "expanded knowledge: intellect fortress":
		case "expanded knowledge: know direction and location":
		case "expanded knowledge: leech field":
		case "expanded knowledge: mass cloud mind":
		case "expanded knowledge: mass ectoplasmic cocoon":
		case "expanded knowledge: mass missive":
		case "expanded knowledge: mass time hop":
		case "expanded knowledge: matter agitation":
		case "expanded knowledge: matter manipulation":
		case "expanded knowledge: mental barrier":
		case "expanded knowledge: mental disruption":
		case "expanded knowledge: metaconcert":
		case "expanded knowledge: metafaculty":
		case "expanded knowledge: metamorphosis":
		case "expanded knowledge: metaphysical claw":
		case "expanded knowledge: metaphysical weapon":
		case "expanded knowledge: microcosm":
		case "expanded knowledge: mind probe":
		case "expanded knowledge: mind seed":
		case "expanded knowledge: mind switch":
		case "expanded knowledge: mind thrust":
		case "expanded knowledge: mind trap":
		case "expanded knowledge: mindlink":
		case "expanded knowledge: mindwipe":
		case "expanded knowledge: missive":
		case "expanded knowledge: my light":
		case "expanded knowledge: null psionics field":
		case "expanded knowledge: oak body":
		case "expanded knowledge: object reading":
		case "expanded knowledge: offensive precognition":
		case "expanded knowledge: offensive prescience":
		case "expanded knowledge: painful strike":
		case "expanded knowledge: personal mind blank":
		case "expanded knowledge: personality parasite":
		case "expanded knowledge: power leech":
		case "expanded knowledge: power resistance":
		case "expanded knowledge: precognition":
		case "expanded knowledge: prevenom":
		case "expanded knowledge: prevenom weapon":
		case "expanded knowledge: prowess":
		case "expanded knowledge: psionic banishment":
		case "expanded knowledge: psionic blast":
		case "expanded knowledge: psionic charm":
		case "expanded knowledge: psionic contingency":
		case "expanded knowledge: psionic darkvision":
		case "expanded knowledge: psionic daze":
		case "expanded knowledge: psionic dimension door":
		case "expanded knowledge: psionic dimensional anchor":
		case "expanded knowledge: psionic disintegrate":
		case "expanded knowledge: psionic dismissal":
		case "expanded knowledge: psionic divination":
		case "expanded knowledge: psionic dominate":
		case "expanded knowledge: psionic ethereal jaunt":
		case "expanded knowledge: psionic etherealness":
		case "expanded knowledge: psionic fabricate":
		case "expanded knowledge: psionic fly":
		case "expanded knowledge: psionic freedom of movement":
		case "expanded knowledge: psionic grease":
		case "expanded knowledge: psionic greater teleport":
		case "expanded knowledge: psionic identify":
		case "expanded knowledge: psionic iron body":
		case "expanded knowledge: psionic keen edge":
		case "expanded knowledge: psionic knock":
		case "expanded knowledge: psionic levitate":
		case "expanded knowledge: psionic lion's charge":
		case "expanded knowledge: psionic lock":
		case "expanded knowledge: psionic major creation":
		case "expanded knowledge: psionic mind blank":
		case "expanded knowledge: psionic minor creation":
		case "expanded knowledge: psionic modify memory":
		case "expanded knowledge: psionic moment of prescience":
		case "expanded knowledge: psionic overland flight":
		case "expanded knowledge: psionic phase door":
		case "expanded knowledge: psionic plane shift":
		case "expanded knowledge: psionic repair damage":
		case "expanded knowledge: psionic restoration":
		case "expanded knowledge: psionic revivify":
		case "expanded knowledge: psionic scent":
		case "expanded knowledge: psionic sequester":
		case "expanded knowledge: psionic suggestion":
		case "expanded knowledge: psionic telekinetic sphere":
		case "expanded knowledge: psionic teleport":
		case "expanded knowledge: psionic teleportation circle":
		case "expanded knowledge: psionic tongues":
		case "expanded knowledge: psionic true seeing":
		case "expanded knowledge: psychic chirurgery":
		case "expanded knowledge: psychic crush":
		case "expanded knowledge: psychic reformation":
		case "expanded knowledge: psychic vampire":
		case "expanded knowledge: psychofeedback":
		case "expanded knowledge: quintessence":
		case "expanded knowledge: read thoughts":
		case "expanded knowledge: reality revision":
		case "expanded knowledge: recall agony":
		case "expanded knowledge: recall death":
		case "expanded knowledge: reddopsi":
		case "expanded knowledge: remote view trap":
		case "expanded knowledge: remote viewing":
		case "expanded knowledge: restore extremity":
		case "expanded knowledge: retrieve":
		case "expanded knowledge: schism":
		case "expanded knowledge: second chance":
		case "expanded knowledge: sense link":
		case "expanded knowledge: sensitivity to psychic impressions":
		case "expanded knowledge: shadow body":
		case "expanded knowledge: share pain":
		case "expanded knowledge: shatter mind blank":
		case "expanded knowledge: skate":
		case "expanded knowledge: solicit psicrystal":
		case "expanded knowledge: specified energy adaptation":
		case "expanded knowledge: steadfast perception":
		case "expanded knowledge: stomp":
		case "expanded knowledge: strength of my enemy":
		case "expanded knowledge: suspend life":
		case "expanded knowledge: sustenance":
		case "expanded knowledge: swarm of crystals":
		case "expanded knowledge: synesthete":
		case "expanded knowledge: telekinetic force":
		case "expanded knowledge: telekinetic maneuver":
		case "expanded knowledge: telekinetic thrust":
		case "expanded knowledge: telempathic projection":
		case "expanded knowledge: teleport trigger":
		case "expanded knowledge: temporal acceleration":
		case "expanded knowledge: thicken skin":
		case "expanded knowledge: thieving mindlink":
		case "expanded knowledge: thought shield":
		case "expanded knowledge: time hop":
		case "expanded knowledge: time regression":
		case "expanded knowledge: timeless body":
		case "expanded knowledge: tornado blast":
		case "expanded knowledge: touchsight":
		case "expanded knowledge: tower of iron will":
		case "expanded knowledge: trace teleport":
		case "expanded knowledge: true creation":
		case "expanded knowledge: true metabolism":
		case "expanded knowledge: true mind switch":
		case "expanded knowledge: truevenom":
		case "expanded knowledge: truevenom weapon":
		case "expanded knowledge: ubiquitous vision":
		case "expanded knowledge: ultrablast":
		case "expanded knowledge: vampiric blade":
		case "expanded knowledge: vigor":
		case "expanded knowledge: wall of ectoplasm":
		case "expanded knowledge: wall walker":
		case "expanded knowledge: weapon of energy":
		case "fell shot":
		case "focused sunder":
		case "ghost attack":
		case "greater power penetration":
		case "greater power specialization":
		case "greater psionic endowment":
		case "greater psionic fist":
		case "greater psionic shot":
		case "greater psionic weapon":
		case "improved psicrystal":
		case "inquisitor":
		case "mental leap":
		case "metamorphic transfer":
		case "narrow mind":
		case "overchannel":
		case "power penetration":
		case "power specialization":
		case "psicrystal affinity":
		case "psicrystal containment":
		case "psionic body":
		case "psionic charge":
		case "psionic dodge":
		case "psionic endowment":
		case "psionic fist":
		case "psionic meditation":
		case "psionic shot":
		case "psionic talent":
		case "psionic weapon":
		case "return shot":
		case "speed of thought":
		case "talented":
		case "unavoidable strike":
		case "up the walls":
		case "wounding attack":
			return true;
		default:
			return false;
	}
}

var languageList = [
	"Abyssal",
	"Aquasian",
	"Briss",
	"Celestial",
	"Draconic",
	"Drak",
	"Dread",
	"Druidic",
	"East Voran",
	"Eldar",
	"Gia",
	"Hodgepot",
	"Ignus",
	"Infernal",
	"Literacy",
	"Luzga",
	"North Ecclisic",
	"Sanctis",
	"Sequee",
	"Silver",
	"South Ecclisic",
	"Sylvan",
	"West Voran",
]

function getMaxLoad(strength) {
	switch(strength) {
		case 1:
			return 10;
		case 2:
			return 20;
		case 3:
			return 30;
		case 4:
			return 40;
		case 5:
			return 50;
		case 6:
			return 60;
		case 7:
			return 70;
		case 8:
			return 80;
		case 9:
			return 90;
		case 10:
			return 100;
		case 11:
			return 115;
		case 12:
			return 130;
		case 13:
			return 150;
		case 14:
			return 175;
		case 15:
			return 200;
		case 16:
			return 230;
		case 17:
			return 260;
		case 18:
			return 300;
		case 19:
			return 350;
		case 20:
			return 400;
		case 21:
			return 460;
		case 22:
			return 520;
		case 23:
			return 600;
		case 24:
			return 700;
		case 25:
			return 800;
		case 26:
			return 920;
		case 27:
			return 1040;
		case 28:
			return 1200;
		case 29:
			return 1400;
	}
	
	if(strength >= 30) {
		return 4 * getMaxLoad(strength - 10);
	}
	
	return -1;	
}

function isSmallRace(raceName) {
	
	raceName = $.trim(raceName.toLowerCase());
	
	return (raceName == "gnome" || raceName == "halfling");
}

function getSpeedBonusOnJump(speed) {
	if(speed <= 0) {
		return -24;
	} else if(speed > 0 && speed < 10) {
		return -18
	} else if(speed >= 10 && speed < 20) {
		return -12
	} else if(speed >= 20 && speed < 30) {
		return -6
	} else if(speed > 30) {
		return Math.floor((speed-30) / 10) * 4;
	} else {
		return 0;
	}
	
}

function getItemDefaults(itemName) {
	itemName = $.trim(itemName.toLowerCase());
	return items[itemName];
}

function initializeSpecialMaterialCommonItems() {
	// darkwood items
	for(var key in darkwoodItems) {
		var dwitem = $.extend({}, items[key]);
		var weightvalue = Math.ceil(dwitem.weight);
		if(weightvalue <= 0) {
			weightvalue = 1;
		}		
		dwitem.value += weightvalue * 10;
		dwitem.weight = dwitem.weight / 2;
		var dwitemname = "darkwood " + key;
		if(darkwoodItems[key]) {
			dwitemname = darkwoodItems[key];
		}
		addItemToList(dwitemname, dwitem);
	}
	// mithral items
	for(var key in mithralItems) {
		var mitem = $.extend({}, items[key]);
		var weightvalue = Math.ceil(mitem.weight);
		if(weightvalue <= 0) {
			weightvalue = 1;
		}
		if(key.indexOf("mw ") == 0) {
			mitem.value = items[key.substring(3)].value;
		}
		mitem.value += weightvalue * 500;
		mitem.weight = mitem.weight / 2;
		var mitemname = "mithral " + key;
		if(mithralItems[key]) {
			mitemname = mithralItems[key];
		}
		addItemToList(mitemname, mitem);
	}

}

var mithralItems = {
	"amazing lock" : "amazing mithral lock",
	"average lock" : "average mithral lock",
	"bell" : false,
	"bullseye lantern" : false,
	"caltrops" : false,
	"chain (10 ft.)" : false,
	"chain (20 ft.)" : false,
	"chain (30 ft.)" : false,
	"chain (40 ft.)" : false,
	"chain (50 ft.)" : false,
	"climber's kit" : false,
	"climber's kit [small]" : false,
	"crowbar" : false,
	"fishhook" : false,
	"flask" : false,
	"good lock" : "good mithral lock",
	"grappling hook" : false,
	"hammer" : false,
	"hooded lantern" : false,
	"iron pot" : "mithral pot",
	"merchant's scale" : false,
	"miner's pick" : false,
	"mw artisan's tools" : "mithral artisan's tools",
	"mw artisan's tools (craft: armoursmithing)" : "mithral artisan's tools (craft: armoursmithing)",
	"mw artisan's tools (craft: blacksmithing)" : "mithral artisan's tools (craft: blacksmithing)",
	"mw artisan's tools (craft: bowmaking)" : "mithral artisan's tools (craft: bowmaking)",
	"mw artisan's tools (craft: leatherworking)" : "mithral artisan's tools (craft: leatherworking)",
	"mw artisan's tools (craft: masonry)" : "mithral artisan's tools (craft: masonry)",
	"mw artisan's tools (craft: poison)" : "mithral artisan's tools (craft: poison)",
	"mw artisan's tools (craft: shipbuilding)" : "mithral artisan's tools (craft: shipbuilding)",
	"mw artisan's tools (craft: tailoring)" : "mithral artisan's tools (craft: tailoring)",
	"mw artisan's tools (craft: weaponsmithing)" : "mithral artisan's tools (craft: weaponsmithing)",
	"mw artisan's tools (craft: woodworking)" : "mithral artisan's tools (craft: woodworking)",
	"mw horn" : "mithral horn",
	"mw horn [small]" : "mithral horn [small]",
	"mw manacles" : "mithral manacles",
	"mw thieves' tools" : "mithral thieves' tools",
	"piton" : false,
	"sewing needle" : false,
	"shovel" : false,
	"signet ring" : false,
	"spade" : false,
	"very simple lock" : "very simple mithral lock",
}

var darkwoodItems = {
	"10-foot ladder" : "10-foot darkwood ladder",
	"10-foot pole" : "10-foot darkwood pole",
	"barrel" : false,
	"block and tackle" : false,
	"bucket" : false,
	"carriage" : false,
	"cart" : false,
	"chest" : false,
	"firewood (per day)" : false,
	"mw bandores" : "darkwood bandalores",
	"mw bandores [small]" : "darkwood bandalores [small]",
	"mw drum" : "darkwood drum",
	"mw drum [small]" : "darkwood drum [small]",
	"mw flute" : "darkwood flute",
	"mw flute [small]" : "darkwood flute [small]",
	"mw harp" : "darkwood harp",
	"mw harp [small]" : "darkwood harp [small]",
	"mw lute" : "darkwood lute",
	"mw lute [small]" : "darkwood lute [small]",
	"mw lyre" : "darkwood lyre",
	"mw lyre [small]" : "darkwood lyre [small]",
	"mw mandolin" : "darkwood mandolin",
	"mw mandolin [small]" : "darkwood mandolin [small]",
	"mw musical instrument" : "darkwood musical instrument",
	"mw musical instrument [small]" : "darkwood musical instrument [small]",
	"mw sitar" : "darkwood sitar",
	"mw sitar [small]" : "darkwood sitar [small]",
	"oar" : false,
	"portable ram" : false,
	"rowboat" : false,
	"sled" : false,
	"sledge" : false,
	"torch" : false,
	"wagon" : false,
	"wooden holy symbol" : "darkwood holy symbol",
}

function initializeOneUseItems() {
	// scrolls & powerstones level 0-4
	
	// arcane scrolls (sor-wiz)
	for(var i = 0; i <= 4; i++) {
		for(var j = 0; j < spells['sorcerer'][i].length; j++) {
			var spell = $.trim(spells['sorcerer'][i][j].toLowerCase());
			var base = Math.max(0.5, i);
			var casterlevel = 1;
			if(i > 1) {
				casterlevel = (2*i) - 1;
			}
			var baseprice = casterlevel * base * 25;
			var extra = spellMaterialComponentCosts[spell];
			if(!extra) {
				extra = 0;
			}
			if(!items["arcane scroll of " + spell]) {
				var scroll = {
					type : "Magic Item",
					value : (baseprice + extra),
					weight : 0,
				};
				addItemToList("arcane scroll of " + spell, scroll);
			}
		}
	}

	// bard
	for(var i = 0; i <= 4; i++) {
		for(var j = 0; j < spells['bard'][i].length; j++) {
			var spell = $.trim(spells['bard'][i][j].toLowerCase());
			var base = Math.max(0.5, i);
			var casterlevel = 1;
			switch(i) {
				case 1:
					casterlevel = 2;
					break;
				case 2:
					casterlevel = 4;
					break;
				case 3:
					casterlevel = 7;
					break;
				case 4:
					casterlevel = 10;
					break;
			}
			var baseprice = casterlevel * base * 25;
			var extra = spellMaterialComponentCosts[spell];
			if(!extra) {
				extra = 0;
			}
			if(!items["arcane scroll of " + spell]) {
				var scroll = {
					type : "Magic Item",
					value : (baseprice + extra),
					weight : 0,
				};
				addItemToList("arcane scroll of " + spell, scroll);
			}
		}
	}

	// divine spells cleric	
	for(var i = 0; i <= 4; i++) {
		for(var j = 0; j < spells['cleric'][i].length; j++) {
			var spell = $.trim(spells['cleric'][i][j].toLowerCase());
			var base = Math.max(0.5, i);
			var casterlevel = 1;
			if(i > 1) {
				casterlevel = (2*i) - 1;
			}
			var baseprice = casterlevel * base * 25;
			var extra = spellMaterialComponentCosts[spell];
			if(!extra) {
				extra = 0;
			}
			if(!items["divine scroll of " + spell]) {
				var scroll = {
					type : "Magic Item",
					value : (baseprice + extra),
					weight : 0,
				};
				addItemToList("divine scroll of " + spell, scroll);
			}
		}
	}
	for(var i = 0; i <= 4; i++) {
		for(var j = 0; j < spells['druid'][i].length; j++) {
			var spell = $.trim(spells['druid'][i][j].toLowerCase());
			var base = Math.max(0.5, i);
			var casterlevel = 1;
			if(i > 1) {
				casterlevel = (2*i) - 1;
			}
			var baseprice = casterlevel * base * 25;
			var extra = spellMaterialComponentCosts[spell];
			if(!extra) {
				extra = 0;
			}
			if(!items["divine scroll of " + spell]) {
				var scroll = {
					type : "Magic Item",
					value : (baseprice + extra),
					weight : 0,
				};
				addItemToList("divine scroll of " + spell, scroll);
			}
		}
	}

	for(var i = 1; i <= 4; i++) {
		for(var j = 0; j < spells['ranger'][i].length; j++) {
			var spell = $.trim(spells['ranger'][i][j].toLowerCase());
			var base = Math.max(0.5, i);
			var casterlevel = 4;
			switch(i) {
				case 2:
					casterlevel = 8;
					break;
				case 3:
					casterlevel = 11;
					break;
				case 4:
					casterlevel = 14;
					break;
			}
			var baseprice = casterlevel * base * 25;
			var extra = spellMaterialComponentCosts[spell];
			if(!extra) {
				extra = 0;
			}
			if(!items["divine scroll of " + spell]) {
				var scroll = {
					type : "Magic Item",
					value : (baseprice + extra),
					weight : 0,
				};
				addItemToList("divine scroll of " + spell, scroll);
			}
		}
	}
	for(var i = 1; i <= 4; i++) {
		for(var j = 0; j < spells['paladin'][i].length; j++) {
			var spell = $.trim(spells['paladin'][i][j].toLowerCase());
			var base = Math.max(0.5, i);
			var casterlevel = 4;
			switch(i) {
				case 2:
					casterlevel = 8;
					break;
				case 3:
					casterlevel = 11;
					break;
				case 4:
					casterlevel = 14;
					break;
			}
			var baseprice = casterlevel * base * 25;
			var extra = spellMaterialComponentCosts[spell];
			if(!extra) {
				extra = 0;
			}
			if(!items["divine scroll of " + spell]) {
				var scroll = {
					type : "Magic Item",
					value : (baseprice + extra),
					weight : 0,
				};
				addItemToList("divine scroll of " + spell, scroll);
			}
		}
	}
	for(var i = 1; i <= 4; i++) {
		for(var j = 0; j < spells['blackguard'][i].length; j++) {
			var spell = $.trim(spells['blackguard'][i][j].toLowerCase());
			var base = Math.max(0.5, i);
			var casterlevel = 1;
			switch(i) {
				case 2:
					casterlevel = 3;
					break;
				case 3:
					casterlevel = 5;
					break;
				case 4:
					casterlevel = 7;
					break;
			}
			var baseprice = casterlevel * base * 25;
			var extra = spellMaterialComponentCosts[spell];
			if(!extra) {
				extra = 0;
			}
			if(!items["divine scroll of " + spell]) {
				var scroll = {
					type : "Magic Item",
					value : (baseprice + extra),
					weight : 0,
				};
				addItemToList("divine scroll of " + spell, scroll);
			}
		}
	}

	// power stones
	for(var i = 1; i <= 4; i++) {
		var psionSpells = spells['psion'][i].concat(spells['telepath'][i]).concat(spells['seer'][i]).concat(spells['shaper'][i]).concat(spells['kineticist'][i]).concat(spells['nomad'][i]).concat(spells['egoist'][i]);
		for(var j = 0; j < psionSpells.length; j++) {
			var spell = $.trim(psionSpells[j].toLowerCase());
			var base = Math.max(0.5, i);
			var casterlevel = 1;
			if(i > 1) {
				casterlevel = (2*i) - 1;
			}
			var baseprice = casterlevel * base * 25;
			var extra = spellMaterialComponentCosts[spell];
			if(!extra) {
				extra = 0;
			}
			if(!items["power stone of " + spell]) {
				var stone = {
					type : "Magic Item",
					value : (baseprice + extra),
					weight : 0,
				};
				addItemToList("power stone of " + spell, stone);
			}
		}
	}
	for(var i = 1; i <= 4; i++) {
		for(var j = 0; j < spells['psychic warrior'][i].length; j++) {
			var spell = $.trim(spells['psychic warrior'][i][j].toLowerCase());
			var base = Math.max(0.5, i);
			var casterlevel = 1;
			if(i > 1) {
				casterlevel = (3*i) - 2;
			}
			var baseprice = casterlevel * base * 25;
			var extra = spellMaterialComponentCosts[spell];
			if(!extra) {
				extra = 0;
			}
			if(!items["power stone of " + spell]) {
				var scroll = {
					type : "Magic Item",
					value : (baseprice + extra),
					weight : 0,
				};
				addItemToList("power stone of " + spell, scroll);
			}
		}
	}

	// potions, tattoo's and crawling tattoo's level 0-2
	for(var key in potionSpells) {
		potionSpells[key].weight = 0.1;
		potionSpells[key].type = "Magic Item";
		addItemToList("potion of " + key, potionSpells[key]);
	}

	for(var key in oilSpells) {
		oilSpells[key].weight = 0.1;
		oilSpells[key].type = "Magic Item";
		addItemToList("oil of " + key, oilSpells[key]);
	}

	for(var key in tattooPowers) {
		tattooPowers[key].weight = 0;
		tattooPowers[key].type = "Magic Item";
		addItemToList("psionic tattoo of " + key, tattooPowers[key]);
	}

	for(var key in crawlingPowers) {
		crawlingPowers[key].weight = 0;
		crawlingPowers[key].type = "Magic Item";
		addItemToList("crawling tattoo of " + key, crawlingPowers[key]);
	}

	// wands & dorjes level 0-1
	for(var key in wandSpells) {
		wandSpells[key].weight = 0.0625;
		wandSpells[key].type = "Magic Item";
		wandSpells[key].value = wandSpells[key].chargevalue;

		items["wand of " + key + " [charges]"] = $.extend({}, wandSpells[key]);
		itemList.push("Wand of " + toTitleCase(key) + " [50 charges]");
	}

	for(var key in dorjePowers) {
		dorjePowers[key].weight = 0.25;
		dorjePowers[key].type = "Magic Item";
		dorjePowers[key].value = dorjePowers[key].dorjePowers;

		items["dorje of " + key + " [1 charge]"] = $.extend({}, dorjePowers[key]);

		for(var i = 1; i < 50; i++) {
			dorjePowers[key].value = i * dorjePowers[key].chargevalue;
			items["dorje of " + key + " [" + i + " charges]"] = $.extend({}, dorjePowers[key]);
		}
		dorjePowers[key].value = 50 * dorjePowers[key].chargevalue;
		addItemToList("dorje of " + key + " [50 charges]", dorjePowers[key]);

	}

	// shards +1-+10
	for(var i = 1; i <= 10; i++) {
		var shardPrice = i*i*10;
		var baseShard = { weight : 0.1, type : "Magic Item", value : shardPrice };
		
		for(var j = 0; j < skillList.length; j++) {
			var skillname = skillList[j].toLowerCase();
			addItemToList("shard of " + skillname + " +" + i, $.extend({}, baseShard));
		}		
	}
}

var wandSpells = {
	"acid splash" : { chargevalue : 7.5 },
	"alarm" : { chargevalue : 15 },
	"animate rope" : { chargevalue : 15 },
	"arcane mark" : { chargevalue : 7.5 },
	"bane" : { chargevalue : 15 },
	"bless" : { chargevalue : 15 },
	"bless water" : { chargevalue : 15 },
	"bless weapon" : { chargevalue : 30 },
	"burning hands" : { chargevalue : 15 },
	"calm animals" : { chargevalue : 15 },
	"cause fear" : { chargevalue : 15 },
	"charm animal" : { chargevalue : 15 },
	"charm person" : { chargevalue : 15 },
	"chill touch" : { chargevalue : 15 },
	"color spray" : { chargevalue : 15 },
	"command" : { chargevalue : 15 },
	"comprehend languages" : { chargevalue : 15 },
	"confusion, lesser" : { chargevalue : 30 },
	"create water" : { chargevalue : 7.5 },
	"cure light wounds" : { chargevalue : 15 },
	"cure minor wounds" : { chargevalue : 7.5 },
	"curse water" : { chargevalue : 15 },
	"dancing lights" : { chargevalue : 7.5 },
	"daze" : { chargevalue : 7.5 },
	"deathwatch" : { chargevalue : 15 },
	"detect animals or plants" : { chargevalue : 15 },
	"detect chaos" : { chargevalue : 15 },
	"detect evil" : { chargevalue : 15 },
	"detect good" : { chargevalue : 15 },
	"detect law" : { chargevalue : 15 },
	"detect magic" : { chargevalue : 7.5 },
	"detect poison" : { chargevalue : 7.5 },
	"detect secret doors" : { chargevalue : 15 },
	"detect snares and pits" : { chargevalue : 15 },
	"detect undead" : { chargevalue : 15 },
	"disguise self" : { chargevalue : 15 },
	"disrupt undead" : { chargevalue : 7.5 },
	"divine favor" : { chargevalue : 15 },
	"doom" : { chargevalue : 15 },
	"endure elements" : { chargevalue : 15 },
	"enlarge person" : { chargevalue : 15 },
	"entangle" : { chargevalue : 15 },
	"entropic shield" : { chargevalue : 15 },
	"erase" : { chargevalue : 15 },
	"expeditious retreat" : { chargevalue : 15 },
	"faerie fire" : { chargevalue : 15 },
	"feather fall" : { chargevalue : 15 },
	"flare" : { chargevalue : 7.5 },
	"floating disk" : { chargevalue : 15 },
	"ghost sound" : { chargevalue : 7.5 },
	"goodberry" : { chargevalue : 15 },
	"grease" : { chargevalue : 15 },
	"guidance" : { chargevalue : 7.5 },
	"hide from animals" : { chargevalue : 15 },
	"hide from undead" : { chargevalue : 15 },
	"hideous laughter" : { chargevalue : 15 },
	"hold portal" : { chargevalue : 15 },
	"hypnotism" : { chargevalue : 15 },
	"identify" : { chargevalue : 15 },
	"inflict light wounds" : { chargevalue : 15 },
	"inflict minor wounds" : { chargevalue : 7.5 },
	"jump" : { chargevalue : 15 },
	"know direction" : { chargevalue : 7.5 },
	"light" : { chargevalue : 7.5 },
	"longstrider" : { chargevalue : 15 },
	"lullaby" : { chargevalue : 7.5 },
	"mage armor" : { chargevalue : 15 },
	"mage hand" : { chargevalue : 7.5 },
	"magic aura" : { chargevalue : 15 },
	"magic fang" : { chargevalue : 15 },
	"magic missile" : { chargevalue : 15 },
	"magic stone" : { chargevalue : 15 },
	"magic weapon" : { chargevalue : 15 },
	"mending" : { chargevalue : 7.5 },
	"message" : { chargevalue : 7.5 },
	"mount" : { chargevalue : 15 },
	"obscuring mist" : { chargevalue : 15 },
	"open/close" : { chargevalue : 7.5 },
	"pass without trace" : { chargevalue : 15 },
	"prestidigitation" : { chargevalue : 7.5 },
	"produce flame" : { chargevalue : 15 },
	"protection from chaos" : { chargevalue : 15 },
	"protection from evil" : { chargevalue : 15 },
	"protection from good" : { chargevalue : 15 },
	"protection from law" : { chargevalue : 15 },
	"purify food and drink" : { chargevalue : 7.5 },
	"ray of enfeeblement" : { chargevalue : 15 },
	"ray of frost" : { chargevalue : 7.5 },
	"read magic" : { chargevalue : 7.5 },
	"reduce person" : { chargevalue : 15 },
	"remove fear" : { chargevalue : 15 },
	"resistance" : { chargevalue : 7.5 },
	"sanctuary" : { chargevalue : 15 },
	"shield" : { chargevalue : 15 },
	"shield of faith" : { chargevalue : 15 },
	"shillelagh" : { chargevalue : 15 },
	"shocking grasp" : { chargevalue : 15 },
	"silent image" : { chargevalue : 15 },
	"sleep" : { chargevalue : 15 },
	"speak with animals" : { chargevalue : 15 },
	"summon instrument" : { chargevalue : 7.5 },
	"summon monster i" : { chargevalue : 15 },
	"summon nature's ally i" : { chargevalue : 15 },
	"touch of fatigue" : { chargevalue : 7.5 },
	"true strike" : { chargevalue : 15 },
	"undetectable alignment" : { chargevalue : 15 },
	"unseen servant" : { chargevalue : 15 },
	"ventriloquism" : { chargevalue : 15 },
	"virtue" : { chargevalue : 7.5 },
}

var dorjePowers = {
	"astral construct" : { chargevalue : 15 },
	"astral traveler" : { chargevalue : 15 },
	"attraction" : { chargevalue : 15 },
	"bite of the wolf" : { chargevalue : 15 },
	"bolt" : { chargevalue : 15 },
	"burst" : { chargevalue : 15 },
	"call to mind" : { chargevalue : 15 },
	"call weaponry" : { chargevalue : 15 },
	"catfall" : { chargevalue : 15 },
	"claws of the beast" : { chargevalue : 15 },
	"compression" : { chargevalue : 15 },
	"conceal thoughts" : { chargevalue : 15 },
	"control flames" : { chargevalue : 15 },
	"control light" : { chargevalue : 15 },
	"control object" : { chargevalue : 15 },
	"create sound" : { chargevalue : 15 },
	"crystal shard" : { chargevalue : 15 },
	"deceleration" : { chargevalue : 15 },
	"defensive precognition" : { chargevalue : 15 },
	"deja vu" : { chargevalue : 15 },
	"demoralize" : { chargevalue : 15 },
	"destiny dissonance" : { chargevalue : 15 },
	"detect psionics" : { chargevalue : 15 },
	"detect teleportation" : { chargevalue : 15 },
	"disable" : { chargevalue : 15 },
	"dissipating touch" : { chargevalue : 15 },
	"distract" : { chargevalue : 15 },
	"ecto protection" : { chargevalue : 15 },
	"empathy" : { chargevalue : 15 },
	"empty mind" : { chargevalue : 15 },
	"energy ray" : { chargevalue : 15 },
	"entangling ectoplasm" : { chargevalue : 15 },
	"expansion" : { chargevalue : 15 },
	"far hand" : { chargevalue : 15 },
	"float" : { chargevalue : 15 },
	"force screen" : { chargevalue : 15 },
	"grease, psionic" : { chargevalue : 15 },
	"grip of iron" : { chargevalue : 15 },
	"hammer" : { chargevalue : 15 },
	"inertial armor" : { chargevalue : 15 },
	"know direction and location" : { chargevalue : 15 },
	"matter agitation" : { chargevalue : 15 },
	"metaphysical claw" : { chargevalue : 15 },
	"metaphysical weapon" : { chargevalue : 15 },
	"mind thrust" : { chargevalue : 15 },
	"mindlink" : { chargevalue : 15 },
	"minor creation, psionic" : { chargevalue : 15 },
	"missive" : { chargevalue : 15 },
	"my light" : { chargevalue : 15 },
	"precognition" : { chargevalue : 15 },
	"offensive precognition" : { chargevalue : 15 },
	"offensive prescience" : { chargevalue : 15 },
	"prevenom" : { chargevalue : 15 },
	"prevenom weapon" : { chargevalue : 15 },
	"psionic charm" : { chargevalue : 15 },
	"psionic daze" : { chargevalue : 15 },
	"sense link" : { chargevalue : 15 },
	"skate" : { chargevalue : 15 },
	"stomp" : { chargevalue : 15 },
	"synesthete" : { chargevalue : 15 },
	"telempathic projection" : { chargevalue : 15 },
	"thicken skin" : { chargevalue : 15 },
	"vigor" : { chargevalue : 15 },
}

var potionSpells = {
	"aid" : { value : 300 },
	"alter self" : { value : 300 },
	"barkskin +2" : { value : 300 },
	"barkskin +3" : { value : 600 },
	"barkskin +4" : { value : 900 },
	"barkskin +5" : { value : 1200 },
	"bear's endurance" : { value : 300 },
	"bless" : { value : 50 },
	"blindness/deafness" : { value : 300 },
	"blur" : { value : 300 },
	"bull's strength" : { value : 300 },
	"cat's grace" : { value : 300 },
	"comprehend languages" : { value : 50 },
	"cure light wounds" : { value : 50 },
	"cure minor wounds" : { value : 25 },
	"cure moderate wounds" : { value : 300 },
	"darkvision" : { value : 300 },
	"deathwatch" : { value : 50 },
	"delay poison" : { value : 300 },
	"detect animals or plants" : { value : 50 },
	"detect chaos" : { value : 50 },
	"detect evil" : { value : 50 },
	"detect good" : { value : 50 },
	"detect law" : { value : 50 },
	"detect magic" : { value : 25 },
	"detect poison" : { value : 25 },
	"detect secret doors" : { value : 50 },
	"detect snares and pits" : { value : 50 },
	"detect thoughts" : { value : 300 },
	"detect undead" : { value : 50 },
	"disguise self" : { value : 50 },
	"divine favor" : { value : 50 },
	"eagle's splendor" : { value : 300 },
	"endure elements" : { value : 50 },
	"enlarge person" : { value : 250 },
	"entropic shield" : { value : 50 },
	"expeditious retreat" : { value : 50 },
	"false life" : { value : 300 },
	"feather fall" : { value : 50 },
	"find traps" : { value : 300 },
	"fox's cunning" : { value : 300 },
	"guidance" : { value : 25 },
	"hide from animals" : { value : 50 },
	"hide from undead" : { value : 50 },
	"hideous laughter" : { value : 300 },
	"hold animal" : { value : 300 },
	"hold person" : { value : 300 },
	"inflict light wounds" : { value : 50 },
	"inflict minor wounds" : { value : 25 },
	"inflict moderate wounds" : { value : 300 },
	"invisibility" : { value : 300 },
	"jump" : { value : 50 },
	"know direction" : { value : 25 },
	"lesser restoration" : { value : 300 },
	"levitate" : { value : 300 },
	"locate object" : { value : 300 },
	"longstrider" : { value : 50 },
	"mage armor" : { value : 50 },
	"magic fang" : { value : 50 },
	"mirror image" : { value : 300 },
	"misdirection" : { value : 300 },
	"obscuring mist" : { value : 50 },
	"owl's wisdom" : { value : 300 },
	"pass without trace" : { value : 50 },
	"protection from arrows" : { value : 300 },
	"protection from chaos" : { value : 50 },
	"protection from evil" : { value : 50 },
	"protection from good" : { value : 50 },
	"protection from law" : { value : 50 },
	"rage" : { value : 300 },
	"read magic" : { value : 25 },
	"reduce animal" : { value : 300 },
	"reduce person" : { value : 250 },
	"remove fear" : { value : 50 },
	"remove paralysis" : { value : 300 },
	"resist energy (10 acid)" : { value : 300 },
	"resist energy (10 cold)" : { value : 300 },
	"resist energy (10 electric)" : { value : 300 },
	"resist energy (10 fire)" : { value : 300 },
	"resist energy (10 sonic)" : { value : 300 },
	"resist energy (20 acid)" : { value : 700 },
	"resist energy (20 cold)" : { value : 700 },
	"resist energy (20 electric)" : { value : 700 },
	"resist energy (20 fire)" : { value : 700 },
	"resist energy (20 sonic)" : { value : 700 },
	"resist energy (30 acid)" : { value : 1100 },
	"resist energy (30 cold)" : { value : 1100 },
	"resist energy (30 electric)" : { value : 1100 },
	"resist energy (30 fire)" : { value : 1100 },
	"resist energy (30 sonic)" : { value : 1100 },
	"resistance" : { value : 25 },
	"sanctuary" : { value : 50 },
	"see invisibility" : { value : 300 },
	"shield" : { value : 50 },
	"shield of faith" : { value : 50 },
	"sleep" : { value : 50 },
	"speak with animals" : { value : 50 },
	"speak with plants" : { value : 300 },
	"spider climb" : { value : 300 },
	"tree shape" : { value : 300 },
	"true strike" : { value : 50 },
	"undetectable alignment" : { value : 300 },
	"virtue" : { value : 25 },
}

var oilSpells = {
	"alarm" : { value : 50 },
	"align weapon" : { value : 300 },
	"animate rope" : { value : 50 },
	"arcane lock" : { value : 325 },
	"arcane mark" : { value : 25 },
	"bless weapon" : { value : 100 },
	"chill metal" : { value : 300 },
	"consecrate" : { value : 325 },
	"continual flame" : { value : 350 },
	"darkness" : { value : 300 },
	"desecrate" : { value : 325 },
	"erase" : { value : 50 },
	"flame blade" : { value : 300 },
	"fog cloud" : { value : 300 },
	"gentle repose" : { value : 300 },
	"glitterdust" : { value : 300 },
	"goodberry" : { value : 50 },
	"grease" : { value : 50 },
	"gust of wind" : { value : 300 },
	"heat metal" : { value : 300 },
	"hold portal" : { value : 50 },
	"illusory script" : { value : 350 },
	"knock" : { value : 300 },
	"light" : { value : 25 },
	"magic aura" : { value : 50 },
	"magic mouth" : { value : 310 },
	"magic stone" : { value : 50 },
	"magic weapon" : { value : 50 },
	"make whole" : { value : 300 },
	"mending" : { value : 25 },
	"mount" : { value : 50 },
	"obscure object" : { value : 300 },
	"phantom trap" : { value : 300 },
	"purify food and drink" : { value : 25 },
	"rope trick" : { value : 300 },
	"shatter" : { value : 300 },
	"shield other" : { value : 300 },
	"shillelagh" : { value : 50 },
	"silence" : { value : 300 },
	"soften earth and stone" : { value : 300 },
	"spectral hand" : { value : 300 },
	"spike growth" : { value : 300 },
	"spiritual weapon" : { value : 300 },
	"status" : { value : 300 },
	"summon instrument" : { value : 25 },
	"summon monster i" : { value : 50 },
	"summon monster ii" : { value : 300 },
	"summon nature's ally i" : { value : 50 },
	"summon nature's ally ii" : { value : 300 },
	"summon swarm" : { value : 300 },
	"warp wood" : { value : 300 },
	"wood shape" : { value : 300 },
}

var tattooPowers = {
	"animal affinity" : { value : 300 },
	"astral traveler" : { value : 50 },
	"biofeedback" : { value : 300 },
	"bite of the wolf" : { value : 50 },
	"body equilibrium" : { value : 300 },
	"burst" : { value : 50 },
	"call to mind" : { value : 50 },
	"call weaponry" : { value : 50 },
	"catfall" : { value : 50 },
	"chameleon" : { value : 300 },
	"clairvoyant sense" : { value : 300 },
	"claws of the beast" : { value : 50 },
	"cloud mind" : { value : 300 },
	"compression" : { value : 50 },
	"conceal thoughts" : { value : 50 },
	"concealing amorpha" : { value : 300 },
	"control air" : { value : 300 },
	"defensive precognition" : { value : 50 },
	"detect hostile intent" : { value : 300 },
	"detect psionics" : { value : 50 },
	"detect teleportation" : { value : 50 },
	"dimension swap" : { value : 300 },
	"dissolving touch" : { value : 300 },
	"dissolving weapon" : { value : 300 },
	"elfsight" : { value : 300 },
	"empathic transfer" : { value : 300 },
	"empathy" : { value : 50 },
	"empty mind" : { value : 50 },
	"entangling ectoplasm" : { value : 50 },
	"expansion" : { value : 50 },
	"float" : { value : 50 },
	"force screen" : { value : 50 },
	"grip of iron" : { value : 50 },
	"hammer" : { value : 50 },
	"inertial armor" : { value : 50 },
	"know direction and location" : { value : 50 },
	"metaphysical claw" : { value : 50 },
	"metaphysical weapon" : { value : 50 },
	"my light" : { value : 50 },
	"object reading" : { value : 300 },
	"offensive precognition" : { value : 50 },
	"offensive prescience" : { value : 50 },
	"painful strike" : { value : 300 },
	"precognition" : { value : 50 },
	"prevenom" : { value : 50 },
	"prevenom weapon" : { value : 50 },
	"prowess" : { value : 300 },
	"psionic levitate" : { value : 300 },
	"psionic lion’s charge" : { value : 300 },
	"psionic minor creation" : { value : 50 },
	"psionic scent" : { value : 300 },
	"psionic tongues" : { value : 300 },
	"read thoughts" : { value : 300 },
	"sensitivity to psychic impressions" : { value : 300 },
	"skate" : { value : 50 },
	"specific energy adaptiotion 10 acid" : { value : 300 },
	"specific energy adaptiotion 10 cold" : { value : 300 },
	"specific energy adaptiotion 10 electric" : { value : 300 },
	"specific energy adaptiotion 10 fire" : { value : 300 },
	"specific energy adaptiotion 10 sonic" : { value : 300 },
	"specific energy adaptiotion 20 acid" : { value : 900 },
	"specific energy adaptiotion 20 cold" : { value : 900 },
	"specific energy adaptiotion 20 electric" : { value : 900 },
	"specific energy adaptiotion 20 fire" : { value : 900 },
	"specific energy adaptiotion 20 sonic" : { value : 900 },
	"specific energy adaptiotion 30 acid" : { value : 1300 },
	"specific energy adaptiotion 30 cold" : { value : 1300 },
	"specific energy adaptiotion 30 electric" : { value : 1300 },
	"specific energy adaptiotion 30 fire" : { value : 1300 },
	"specific energy adaptiotion 30 sonic" : { value : 1300 },
	"strength of my enemy" : { value : 300 },
	"sustenance" : { value : 300 },
	"synesthete" : { value : 50 },
	"thicken skin" : { value : 50 },
	"thought shield" : { value : 300 },
	"vigor" : { value : 50 },
	"wall walker" : { value : 300 },
}

var crawlingPowers = {
	"brain lock" : { value : 300 },
	"concussion blast" : { value : 300 },
	"deceleration" : { value : 50 },
	"deja vu" : { value : 50 },
	"destiny dissonance" : { value : 50 },
	"dissipating touch" : { value : 50 },
	"distract" : { value : 50 },
	"ego whip" : { value : 300 },
	"energy missile" : { value : 300 },
	"energy push" : { value : 300 },
	"energy ray" : { value : 50 },
	"energy stun" : { value : 300 },
	"far hand" : { value : 50 },
	"feat leech" : { value : 300 },
	"inflict pain" : { value : 300 },
	"matter agitation" : { value : 50 },
	"mind thrust" : { value : 50 },
	"psionic charm" : { value : 50 },
	"psionic daze" : { value : 50 },
	"recall agony" : { value : 300 },
	"stomp" : { value : 50 },
	"swarm of crystals" : { value : 300 },
}

var spellMaterialComponentCosts = {
	"animate dead" : 250,
	"arcane lock" : 25,
	"augury" : 25,
	"bless water" : 25,
	"consecrate" : 25,
	"continual flame" : 50,
	"curse water" : 25,
	"desecrate" : 25,
	"divination" : 25,
	"fire trap" : 25,
	"glyph of warding" : 200,
	"identify" : 100,
	"illusory script" : 50,
	"legend lore" : 250,
	"magic mouth" : 10,
	"nondetection" : 50,
	"planar ally, lesser" : 500,
	"reincarnate" : 1000,
	"restoration" : 100,
	"sepia snake sigil" : 500,
}

function initializeShieldsInItemsList() {

	for( var key in shields ) {
		shields[key + " [small]"] = makeShieldSmall($.extend({}, shields[key]));
		if(shields[key].isWeapon) {
			shields["spiked " + key] = makeShieldSpiked($.extend({}, shields[key]));
			shields["spiked " + key + " [small]"] = makeShieldSmall(makeShieldSpiked($.extend({}, shields[key])));
		}
	}

	for( var key in shields ) {
		// add shield
		addItemToList(key, shields[key]);

		if(!(shields[key].darkwood) && !(shields[key].crystal) && !(shields[key].dragonhide)) {
			// MW version
			addItemToList("mw " + key, makeShieldMasterwork($.extend({}, shields[key])));

			if(shields[key].material == "metal") {

				var mithralkey = "mithral " + key;
				var adamantinekey = "adamantine " + key;
				if(key.indexOf("steel") >= 0) {
					var before = key.substring(0, key.indexOf("steel"));
					var after = key.substring(key.indexOf("steel") + 5);
					mithralkey = before + "mithral" + after;
					adamantinekey = before + "adamantine" + after;
				}

				// mithral shield
				addItemToList(mithralkey, makeShieldMithral($.extend({}, shields[key])));
				// +1 mithral
				addItemToList("+1 " + mithralkey, makeShieldMagical(makeShieldMithral($.extend({}, shields[key])), 1));
				// +1 mithral heartening
				addItemToList("+1 heartening " + mithralkey, makeShieldHeartening(makeShieldMagical(makeShieldMithral($.extend({}, shields[key])), 1)));

				// adamantine shield
				addItemToList(adamantinekey, makeShieldAdamantine($.extend({}, shields[key])));
				// +1 adamantine
				addItemToList("+1 " + adamantinekey, makeShieldMagical(makeShieldAdamantine($.extend({}, shields[key])), 1));
				// +1 adamantine heartening
				addItemToList("+1 heartening " + adamantinekey, makeShieldHeartening(makeShieldMagical(makeShieldAdamantine($.extend({}, shields[key])), 1)));
			}

		}
		// +1 shield
		addItemToList("+1 " + key, makeShieldMagical(makeShieldMasterwork($.extend({}, shields[key])), 1));
		// +1 heartening
		addItemToList("+1 heartening " + key, makeShieldHeartening(makeShieldMagical(makeShieldMasterwork($.extend({}, shields[key])), 1)));
		// +2 shield
		addItemToList("+2 " + key, makeShieldMagical(makeShieldMasterwork($.extend({}, shields[key])), 2));
		// +2 heartening
		addItemToList("+2 heartening " + key, makeShieldHeartening(makeShieldMagical(makeShieldMasterwork($.extend({}, shields[key])), 2)));

		// +1 blinding 
		addItemToList("+1 blinding " + key, makeShieldMoreMagical(makeShieldMasterwork($.extend({}, shields[key])), 1, 1));
		// +1 blinding heartening
		addItemToList("+1 heartening blinding " + key, makeShieldHeartening(makeShieldMoreMagical(makeShieldMasterwork($.extend({}, shields[key])), 1, 1)));

		// +1 light fortification
		addItemToList("+1 light fortification " + key, makeShieldMoreMagical(makeShieldMasterwork($.extend({}, shields[key])), 1, 1));
		// +1 light fortification heartening
		addItemToList("+1 heartening light fortification " + key, makeShieldHeartening(makeShieldMoreMagical(makeShieldMasterwork($.extend({}, shields[key])), 1, 1)));

		// +1 arrow catching // conditional bonus to AC
		addItemToList("+1 arrow catching " + key, makeShieldArrowCatching(makeShieldMoreMagical(makeShieldMasterwork($.extend({}, shields[key])), 1, 1)));
		// +1 arrow catching heartening
		addItemToList("+1 heartening arrow catching " + key, makeShieldHeartening(makeShieldArrowCatching(makeShieldMoreMagical(makeShieldMasterwork($.extend({}, shields[key])), 1, 1))));

		if(shields[key].isWeapon) {
			// +1 bashing [not on tower or buckler] (weapon) // only light and heavy
			addItemToList("+1 bashing " + key, makeShieldBashing(makeShieldMoreMagical(makeShieldMasterwork($.extend({}, shields[key])), 1, 1)));
			// +1 bashing heartening
			addItemToList("+1 heartening bashing " + key, makeShieldHeartening(makeShieldBashing(makeShieldMoreMagical(makeShieldMasterwork($.extend({}, shields[key])), 1, 1))));
		}

		if(!key.indexOf("tower") >= 0) {
			// +1 ranged (weapon, no tower shield)
			addItemToList("+1 ranged " + key, makeShieldRanged(makeShieldMoreMagical(makeShieldMasterwork($.extend({}, shields[key])), 1, 1), 1));
			// +1 ranged heartening
			addItemToList("+1 ranged " + key, makeShieldHeartening(makeShieldRanged(makeShieldMoreMagical(makeShieldMasterwork($.extend({}, shields[key])), 1, 1), 1)));
		}

	}
}

function makeShieldBashing(item) {
	switch(item.damage) {
		case "1d2":
			item.damage = "1d4";
			break;
		case "1d3":
			item.damage = "1d6";
			break;
		case "1d4":
			item.damage = "1d8";
			break;
		case "1d6":
			item.damage = "2d6";
			break;
	}
	item.attackbonus = 1;
	item.dambonus = 1;
	return item;
}

function makeShieldRanged(item, bonus) {
	item.rangedSpecial = true;
	item.rangedSpecialBonus = bonus;
	item.dambonus = bonus;
	if(!item.attackbonus) {
		item.attackbonus = 0;
	}
	return item;
}

function makeShieldArrowCatching(item, bonus) {
	item.conditionalAC = { condition : "Deflection against Ranged Weapons", bonus : "+1" };
	return item;
}

function makeShieldMoreMagical(item, bonus, extra) {
	item.value += (bonus+extra) * (bonus+extra) * 1000;
	item.acbonus += bonus;
	return item;	
}

function makeShieldAdamantine(item) {
	item.value += 2000;
	item.acp += 1;
	if(item.acp > 0) {
		item.acp = 0;
	}
	return item;
}

function makeShieldHeartening(item) {
	item.value += 720;
	return item;
}

function makeShieldMithral(item) {
	item.weight = item.weight / 2;
	item.maxdex += 2;
	item.acp += 3;
	if(item.acp > 0) {
		item.acp = 0;
	}
	item.value += 1000;
	item.asf -= 10;
	if(item.asf < 0) {
		item.asf = 0;
	}
	return item;
}

function makeShieldMagical(item, bonus) {
	item.value += bonus * bonus * 1000;
	item.acbonus += bonus;
	return item;	
}

function makeShieldMasterwork(item) {
	if(item.darkwood || item.crystal || item.dragonhide) {
		return item;
	}
	item.acp += 1;
	if(item.acp > 0) {
		item.acp = 0;
	}
	item.value += 150;
	return item;
}

function makeShieldSpiked(item) {
	item.weight += 5;
	item.value += 10;
	switch(item.damage) {
		case "1d2":
			item.damage = "1d3";
			break;
		case "1d3":
			item.damage = "1d4";
			break;
		case "1d4":
			item.damage = "1d6";
			break;
	}
	item.damageType = "Piercing";
	return item;
}

function makeShieldSmall(item) {
	item.weight = item.weight / 2;
	if(item.damage) {
		switch(item.damage) {
			case "1d2":
				item.damage = "1";
				break;
			case "1d3":
				item.damage = "1d2";
				break;
			case "1d4":
				item.damage = "1d3";
				break;
			case "1d6":
				item.damage = "1d4";
				break;
			case "2d4":
				item.damage = "1d6";
				break;
			case "1d8":
				item.damage = "1d6";
				break;
			case "1d10":
				item.damage = "1d8";
				break;
			case "1d12":
				item.damage = "1d10";
				break;
			case "2d6":
				item.damage = "1d10";
				break;
		}
	}
	return item;
}

function initializeArmoursInItemsList() {
	// make a small variant of all weapons
	for( var key in armours ) {
		// small armour
		armours[key + " [small]"] = makeArmourSmall($.extend({}, armours[key]));

		// spiked armour
		armours["spiked " + key] = makeArmourSpiked($.extend({}, armours[key]));
		// small spiked armour
		armours["spiked " + key + " [small]"] = makeArmourSmall(makeArmourSpiked($.extend({}, armours[key])));

		// barding (riding dog, pony, horse)
		addItemToList(key + " barding [riding dog]", makeArmourBardingMedium($.extend({}, armours[key])));
		addItemToList(key + " barding [pony]", makeArmourBardingMedium($.extend({}, armours[key])));
		addItemToList(key + " barding [horse]", makeArmourBardingLarge($.extend({}, armours[key])));
		// mw barding
		addItemToList("mw " + key + " barding [riding dog]", makeArmourBardingMedium(makeArmourMasterwork($.extend({}, armours[key]))));
		addItemToList("mw " + key + " barding [pony]", makeArmourBardingMedium(makeArmourMasterwork($.extend({}, armours[key]))));
		addItemToList("mw " + key + " barding [horse]", makeArmourBardingLarge(makeArmourMasterwork($.extend({}, armours[key]))));
	}

	for( var key in armours ) {
		// add armour
		addItemToList(key, armours[key]);
		// add MW item
		addItemToList("mw " + key, makeArmourMasterwork($.extend({}, armours[key])));

		// add +1 and +2 items
		addItemToList("+1 " + key, makeArmourMagical(makeArmourMasterwork($.extend({}, armours[key])), 1));
		addItemToList("+2 " + key, makeArmourMagical(makeArmourMasterwork($.extend({}, armours[key])), 2));

		// +1 & glamered
		addItemToList("+1 glamered " + key, makeArmourGlamered(makeArmourMagical(makeArmourMasterwork($.extend({}, armours[key])), 1)));
		// +1 & slick
		addItemToList("+1 slick " + key, makeArmourSlick(makeArmourMagical(makeArmourMasterwork($.extend({}, armours[key])), 1)));
		// +1 & shadow
		addItemToList("+1 shadow " + key, makeArmourShadow(makeArmourMagical(makeArmourMasterwork($.extend({}, armours[key])), 1)));
		// +1 & silent moves
		addItemToList("+1 silent moves " + key, makeArmourSilentMoves(makeArmourMagical(makeArmourMasterwork($.extend({}, armours[key])), 1)));
		// +1 light fortification
		addItemToList("+1 light fortification " + key, makeArmourExtraMagical(makeArmourMasterwork($.extend({}, armours[key])), 1, 1));
		// +1 landing
		addItemToList("+1 landing " + key, makeArmourLanding(makeArmourMagical(makeArmourMasterwork($.extend({}, armours[key])), 1)));
		// +1 floating [+4 to swim]
		addItemToList("+1 floating " + key, makeArmourFloating(makeArmourMagical(makeArmourMasterwork($.extend({}, armours[key])), 1)));

		// +1 quickness [+5 ft movement]
		addItemToList("+1 quickness " + key, makeArmourQuickness(makeArmourExtraMagical(makeArmourMasterwork($.extend({}, armours[key])), 1, 1)));

		// dragonhide
		addItemToList("dragonhide " + key, makeArmourDragonhide($.extend({}, armours[key])));
		addItemToList("+1 dragonhide " + key, makeArmourMagical(makeArmourDragonhide($.extend({}, armours[key])), 1));
		addItemToList("+2 dragonhide " + key, makeArmourMagical(makeArmourDragonhide($.extend({}, armours[key])), 2));
		// +1 & glamered & dragonhide
		addItemToList("+1 glamered dragonhide " + key, makeArmourGlamered(makeArmourMagical(makeArmourDragonhide($.extend({}, armours[key])), 1)));
		// +1 & slick & dragonhide
		addItemToList("+1 slick dragonhide " + key, makeArmourSlick(makeArmourMagical(makeArmourDragonhide($.extend({}, armours[key])), 1)));
		// +1 & shadow & dragonhide
		addItemToList("+1 shadow dragonhide " + key, makeArmourShadow(makeArmourMagical(makeArmourDragonhide($.extend({}, armours[key])), 1)));
		// +1 & silent moves & dragonhide
		addItemToList("+1 silent moves dragonhide " + key, makeArmourSilentMoves(makeArmourMagical(makeArmourDragonhide($.extend({}, armours[key])), 1)));
		// +1 light fortification & dragonhide
		addItemToList("+1 light fortification dragonhide " + key, makeArmourExtraMagical(makeArmourDragonhide($.extend({}, armours[key])), 1, 1));
		// +1 landing & dragonhide
		addItemToList("+1 landing dragonhide " + key, makeArmourLanding(makeArmourMagical(makeArmourDragonhide($.extend({}, armours[key])), 1)));
		// +1 floating [+4 to swim] & dragonhide
		addItemToList("+1 floating dragonhide " + key, makeArmourFloating(makeArmourMagical(makeArmourDragonhide($.extend({}, armours[key])), 1)));
		// +1 quickness [+5 ft movement] & dragonhide
		addItemToList("+1 quickness dragonhide " + key, makeArmourQuickness(makeArmourExtraMagical(makeArmourDragonhide($.extend({}, armours[key])), 1, 1)));

		if(armours[key].material == "metal") {
			// adamantine
			addItemToList("adamantine " + key, makeArmourAdamantine($.extend({}, armours[key])));
			// mithral
			addItemToList("mithral " + key, makeArmourMithral($.extend({}, armours[key])));
			// +1 mithral
			addItemToList("+1 mithral " + key, makeArmourMagical(makeArmourMithral($.extend({}, armours[key])), 1));
			// crystal
			addItemToList("mundane crystal " + key, makeArmourMithral($.extend({}, armours[key])));
			// +1 crystal
			addItemToList("+1 mundane crystal " + key, makeArmourMagical(makeArmourCrystal($.extend({}, armours[key])), 1));
			// +1 crystal & glamered
			addItemToList("+1 glamered mundane crystal " + key, makeArmourGlamered(makeArmourMagical(makeArmourCrystal($.extend({}, armours[key])), 1)));
			// +1 crystal & slick
			addItemToList("+1 slick mundane crystal " + key, makeArmourSlick(makeArmourMagical(makeArmourCrystal($.extend({}, armours[key])), 1)));
			// +1 crystal & shadow
			addItemToList("+1 shadow mundane crystal " + key, makeArmourShadow(makeArmourMagical(makeArmourCrystal($.extend({}, armours[key])), 1)));
			// +1 crystal & silent moves
			addItemToList("+1 silent moves mundane crystal " + key, makeArmourSilentMoves(makeArmourMagical(makeArmourCrystal($.extend({}, armours[key])), 1)));
			// +1 crystal & light fortification
			addItemToList("+1 light fortification mundane crystal " + key, makeArmourExtraMagical(makeArmourCrystal($.extend({}, armours[key])), 1, 1));
			// +1 crystal & landing
			addItemToList("+1 landing mundane crystal " + key, makeArmourLanding(makeArmourMagical(makeArmourCrystal($.extend({}, armours[key])), 1)));
			// +1 crystal & floating [+4 to swim]
			addItemToList("+1 floating mundane crystal " + key, makeArmourFloating(makeArmourMagical(makeArmourCrystal($.extend({}, armours[key])), 1)));
			// +1 crystal & quickness [+5 ft movement]
			addItemToList("+1 quickness mundane crystal " + key, makeArmourQuickness(makeArmourExtraMagical(makeArmourCrystal($.extend({}, armours[key])), 1, 1)));
		}
	}
}

function makeArmourMithral(item) {
	switch(item.group) {
		case "light":
			item.value += 1000;
			break;
		case "medium":
			item.value += 4000;
			item.group = "light";
			break;
		case "heavy":
			item.value += 9000;
			item.group = "medium";
			break;
	}
	item.acp += 3;
	if(item.acp > 0) {
		item.acp = 0;
	}
	item.maxdex += 2;
	item.weight = item.weight / 2;
	item.asf -= 10;
	if(item.asf < 0) {
		item.asf = 0;
	}
	return item;
}

function makeArmourAdamantine(item) {
	switch(item.group) {
		case "light":
			item.value += 5000;
			break;
		case "medium":
			item.value += 10000;
			break;
		case "heavy":
			item.value += 15000;
			break;
	}
	item.acp += 1;
	if(item.acp > 0) {
		item.acp = 0;
	}
	return item;
}

function makeArmourCrystal(item) {
	item.value += 150;
	item.acp += 1;
	if(item.acp > 0) {
		item.acp = 0;
	}
	return item;
}

function makeArmourQuickness(item) {
	item.speedbonus = 5;
	return item;
}

function makeArmourFloating(item) {
	item.value += 4000;
	if(item.skillboost) {
		item.skillboost.push( { skillname : "swim", specialbonus : 0, regularbonus : 4 } );
	} else {
		item.skillboost = [ { skillname : "swim", specialbonus : 0, regularbonus : 4 } ]
	}
	return item;
}

function makeArmourLanding(item) {
	item.value += 4000;
	return item;
}

function makeArmourExtraMagical(item, bonus, extraCostFactor) {
	item.value += (bonus + extraCostFactor) * (bonus + extraCostFactor) * 1000;
	item.acbonus += bonus;
	return item;	
}

function makeArmourGlamered(item) {
	item.value += 2700;
	return item;
}

function makeArmourSlick(item) {
	item.value += 3750;
	if(item.skillboost) {
		item.skillboost.push( { skillname : "escape artist", specialbonus : 0, regularbonus : 5 } );
	} else {
		item.skillboost = [ { skillname : "escape artist", specialbonus : 0, regularbonus : 5 } ];
	}
	return item;
}

function makeArmourShadow(item) {
	item.value += 3750;
	if(item.skillboost) {
		item.skillboost.push( { skillname : "hide", specialbonus : 0, regularbonus : 5 } );
	} else {
		item.skillboost = [ { skillname : "hide", specialbonus : 0, regularbonus : 5 } ];
	}
	return item;
}

function makeArmourSilentMoves(item) {
	item.value += 3750;
	if(item.skillboost) {
		item.skillboost.push( { skillname : "move silently", specialbonus : 0, regularbonus : 5 } );
	} else {
		item.skillboost = [ { skillname : "move silently", specialbonus : 0, regularbonus : 5 } ];
	}
	return item;
}

function makeArmourMagical(item, bonus) {
	item.value += bonus * bonus * 1000;
	item.acbonus += bonus;
	return item;
}

function makeArmourMasterwork(item) {
	item.value += 150;
	item.acp += 1;
	if(item.acp > 0) {
		item.acp = 0;
	}
	return item;
}

function makeArmourDragonhide(item) {
	item.value += 150;
	item.value = item.value * 2;
	item.acp += 1;
	item.dragonhide = true;
	if(item.acp > 0) {
		item.acp = 0;
	}
	return item;
}


function makeArmourBardingMedium(item) {
	item.value = item.value * 2;
	return item;
}

function makeArmourBardingLarge(item) {
	item.weight = item.weight * 2;
	item.value = item.value * 4;
	return item;
}

function makeArmourSmall(item) {
	item.weight = item.weight / 2;
	return item;
}

function makeArmourSpiked(item) {
	item.weight += 10;
	item.value += 50;
	return item;
}



function initializeWeaponsInItemsList() {
	// make a small variant of all weapons
	for( var key in weapons ) {
		// basic weapon
		weapons[key + " [small]"] = makeWeaponSmall($.extend({}, weapons[key]));
	}

	// then add special variants. Saves space to do small first
	for( var key in weapons ) {
		// add weapon
		addItemToList(key, weapons[key]);
		// MW weapon
		addItemToList("mw " + key, makeWeaponMasterwork($.extend({}, weapons[key])));
		// +1 
		addItemToList("+1 " + key, makeWeaponMagical(makeWeaponMasterwork($.extend({}, weapons[key])), 1));
		// special materials
		switch(weapons[key].material) {
			case "metal":
				// Adamantine
				addItemToList("adamantine " + key, makeWeaponAdamantine($.extend({}, weapons[key])));
				addItemToList("+1 adamantine " + key, makeWeaponMagical(makeWeaponAdamantine($.extend({}, weapons[key])), 1));
				// Cold Iron
				addItemToList("cold iron " + key, makeWeaponColdIron($.extend({}, weapons[key]), false));
				addItemToList("mw cold iron " + key, makeWeaponMasterwork(makeWeaponColdIron($.extend({}, weapons[key]), false)));
				addItemToList("+1 cold iron " + key, makeWeaponMagical(makeWeaponColdIron(makeWeaponMasterwork($.extend({}, weapons[key])), true), 1));
				// Mithral
				addItemToList("mithral " + key, makeWeaponMithral($.extend({}, weapons[key])));
				addItemToList("+1 mithral " + key, makeWeaponMagical(makeWeaponMithral($.extend({}, weapons[key])), 1));
				// Silvered
				addItemToList("silvered " + key, makeWeaponSilvered($.extend({}, weapons[key])));
				addItemToList("mw silvered " + key, makeWeaponSilvered(makeWeaponMasterwork($.extend({}, weapons[key]))));
				addItemToList("+1 silvered " + key, makeWeaponSilvered(makeWeaponMagical($.extend({}, weapons[key]), 1)));
				// Mundane Crystal
				addItemToList("mundane crystal " + key, makeWeaponMundaneCrystal($.extend({}, weapons[key])));
				addItemToList("+1 mundane crystal " + key, makeWeaponMagical(makeWeaponMundaneCrystal($.extend({}, weapons[key])), 1));
				// Deep Crystal
				addItemToList("deep crystal " + key, makeWeaponDeepCrystal($.extend({}, weapons[key])));
				addItemToList("+1 deep crystal " + key, makeWeaponMagical(makeWeaponDeepCrystal($.extend({}, weapons[key])), 1));
				break;
			case "wood":
				// Darkwood
				addItemToList("darkwood " + key, makeWeaponDarkwood(makeWeaponMasterwork($.extend({}, weapons[key]))));
				addItemToList("+1 darkwood " + key, makeWeaponMagical(makeWeaponDarkwood(makeWeaponMasterwork($.extend({}, weapons[key]))), 1));
				break;
		}
	}

	// add subtype specific items
	for(var i = 0; i < typesAndSubtypes.length; i++) {
		addItemToList("slaying arrow (" + typesAndSubtypes[i] + ")",  { material : "metal", type : "Other", value : 2282, weight : 0.15 }); 	
		addItemToList("greater slaying arrow (" + typesAndSubtypes[i] + ")",  { material : "metal", type : "Other", value : 4057, weight : 0.15 }); 	
	}

	itemList.sort();	
}

var typesAndSubtypes = [
	"aberrations",
	"animals",
	"constructs",
	"dragons",
	"elementals",
	"fey",
	"giants",
	"aquatic humanoids",
	"dwarves",
	"elves",
	"gnomes",
	"gnolls",
	"goblins",
	"halflings",
	"humans",
	"reptilian humanoids",
	"orcs",
	"magical beasts",
	"monstrous humanoids",
	"oozes",
	"air outsiders",
	"chaotic outsiders",
	"earth outsiders",
	"evil outsiders",
	"fire outsiders",
	"good outsiders",
	"lawful outsiders",
	"water outsiders",
	"plants",
	"undead",
	"vermin",
]

function makeWeaponMundaneCrystal(item) {
	item.attackbonus = 1;
	var masterworkComponent = 300;
	if(item.number) {
		masterworkComponent = masterworkComponent / item.number;
	}
	if(item.doubleweapon) {
		// double masterwork component
		masterworkComponent += masterworkComponent
	}
	item.value = item.value + masterworkComponent;
	return item;
}

function makeWeaponDeepCrystal(item) {
	item.attackbonus = 1;
	var masterworkComponent = 300;
	if(item.number) {
		masterworkComponent = masterworkComponent / item.number;
	}
	if(item.doubleweapon) {
		// double masterwork component
		masterworkComponent += masterworkComponent
	}
	item.value = item.value + masterworkComponent;
	item.value += 1000;
	return item;
}

function makeWeaponDarkwood(item) {
	var weightFactor = Math.ceil(item.weight);
	item.value += 10 * weightFactor;
	item.weight = item.weight / 2;
	return item;
}

function makeWeaponSilvered(item) {
	if(item.type == "Other") {
		// ammunition
		item.value += 2;
	} else if(item.light) {
		item.value += 20;
	} else if(item.twohanded || item.doubleweapon) {
		item.value += 180;
	} else {
		item.value += 90;
	}

	item.dambonus -= 1;

	return item;
}

function makeWeaponMithral(item) {
	var weightFactor = Math.ceil(item.weight);
	item.value += 500 * weightFactor;
	item.weight = item.weight / 2;
	if(item.attackbonus < 1) {
		item.attackbonus = 1;
	}
	return item;
}

function makeWeaponColdIron(item, magical) {
	item.value += item.value;
	if(magical) {
		item.value += 2000;
	}
	return item;
}

function makeWeaponAdamantine(item) {
	if(item.attackbonus < 1) {
		item.attackbonus = 1;
	}
	item.value = item.value + 3000;
	return item;
}

function addItemToList(itemname, itemobject) {
	items[itemname] = itemobject;
	// fix item name

	itemname = toTitleCase(itemname);
	itemname = itemname.replace("Mw ", "MW ");

	itemList.push(itemname);
}

function makeWeaponMagical(item, bonus) {
	item.attackbonus = bonus;
	item.dambonus = bonus;
	var magicalPrice = bonus * bonus * 2000;
	if(item.number) {
		magicalPrice = magicalPrice / item.number;
	}
	if(item.doubleweapon) {
		magicalPrice += magicalPrice;
	}
	item.value = item.value + magicalPrice;
	return item;
}


function makeWeaponMasterwork(item) {
	item.attackbonus = 1;
	var masterworkComponent = 300;
	if(item.number) {
		masterworkComponent = masterworkComponent / item.number;
	}
	if(item.doubleweapon) {
		// double masterwork component
		masterworkComponent += masterworkComponent
	}
	item.value = item.value + masterworkComponent;
	return item;
}

function makeWeaponSmall(item) {
	item.weight = item.weight / 2;
	if(item.damage) {
		switch(item.damage) {
			case "1d2":
				item.damage = "1";
				break;
			case "1d3":
				item.damage = "1d2";
				break;
			case "1d4":
				item.damage = "1d3";
				break;
			case "1d6":
				item.damage = "1d4";
				break;
			case "2d4":
				item.damage = "1d6";
				break;
			case "1d8":
				item.damage = "1d6";
				break;
			case "1d10":
				item.damage = "1d8";
				break;
			case "1d12":
				item.damage = "1d10";
				break;
			case "2d6":
				item.damage = "1d10";
				break;
		}
	}
	if(item.damage2) {
		switch(item.damage2) {
			case "1d2":
				item.damage2 = "1";
				break;
			case "1d3":
				item.damage2 = "1d2";
				break;
			case "1d4":
				item.damage2 = "1d3";
				break;
			case "1d6":
				item.damage2 = "1d4";
				break;
			case "2d4":
				item.damage2 = "1d6";
				break;
			case "1d8":
				item.damage2 = "1d6";
				break;
			case "1d10":
				item.damage2 = "1d8";
				break;
			case "1d12":
				item.damage2 = "1d10";
				break;
			case "2d6":
				item.damage2 = "1d10";
				break;
		}
	}
	return item;
}

var shields = {
	"buckler" : { group : "buckler", material : "metal", type : "Shield", value : 15, weight : 5, acbonus : 1, maxdex : 1000000, acp : -1, asf : 5, },
	"light wooden shield" : { group : "light shield", material : "wood", type : "Shield", value : 3, weight : 5, acbonus : 1, maxdex : 1000000, acp : -1, isWeapon : true, critrange : "20/x2", damage : "1d3", damageType : "Bludgeoning", twohander : false, doubleweapon : false, light : true, maxStr : 9999, attackbonus : 0, dambonus : 0, rangeIncrement : false, asf : 5, },
	"light steel shield" : { group : "light shield", material : "metal", type : "Shield", value : 9, weight : 6, acbonus : 1, maxdex : 1000000, acp : -1, isWeapon : true, critrange : "20/x2", damage : "1d3", damageType : "Bludgeoning", twohander : false, doubleweapon : false, light : true, maxStr : 9999, attackbonus : 0, dambonus : 0, rangeIncrement : false, asf : 5, },
	"heavy wooden shield" : { group : "heavy shield", material : "wood", type : "Shield", value : 7, weight : 10, acbonus : 2, maxdex : 1000000, acp : -2, isWeapon : true, critrange : "20/x2", damage : "1d4", damageType : "Bludgeoning", twohander : false, doubleweapon : false, light : false, maxStr : 9999, attackbonus : 0, dambonus : 0, rangeIncrement : false, asp : 15, },
	"heavy steel shield" : { group : "heavy shield", material : "metal", type : "Shield", value : 20, weight : 15, acbonus : 2, maxdex : 1000000, acp : -2, isWeapon : true, critrange : "20/x2", damage : "1d4", damageType : "Bludgeoning", twohander : false, doubleweapon : false, light : false, maxStr : 9999, attackbonus : 0, dambonus : 0, rangeIncrement : false, asf : 15, },
	"tower shield" : { group : "tower shield", material : "wood", type : "Shield", value : 30, weight : 45, acbonus : 4, maxdex : 2, acp : -10, asf : 50 },

	"darkwood buckler" : { group : "buckler", darkwood : true, material : "wood", type : "Shield", value : 205, weight : 2.5, acbonus : 1, maxdex : 1000000, acp : 0, asf : 5, },
	"light darkwood shield" : { group : "light shield", darkwood : true, material : "wood", type : "Shield", value : 203, weight : 2.5, acbonus : 1, maxdex : 1000000, acp : 0, isWeapon : true, critrange : "20/x2", damage : "1d3", damageType : "Bludgeoning", twohander : false, doubleweapon : false, light : true, maxStr : 9999, attackbonus : 0, dambonus : 0, rangeIncrement : false, asf : 5, },
	"heavy darkwood shield" : { group : "heavy shield", darkwood : true, material : "wood", type : "Shield", value : 257, weight : 5, acbonus : 2, maxdex : 1000000, acp : 0, isWeapon : true, critrange : "20/x2", damage : "1d4", damageType : "Bludgeoning", twohander : false, doubleweapon : false, light : false, maxStr : 9999, attackbonus : 0, dambonus : 0, rangeIncrement : false, asf : 5, },
	"darkwood tower shield" : { group : "tower shield", darkwood : true, material : "wood", type : "Shield", value : 630, weight : 22.5, acbonus : 4, maxdex : 2, acp : -8, asf : 50 },

	"mundane crystal buckler" : { group : "buckler", crystal : true, material : "metal", type : "Shield", value : 165, weight : 5, acbonus : 1, maxdex : 1000000, acp : 0, asf : 5, },
	"light mundane crystal shield" : { group : "light shield", crystal : true, material : "metal", type : "Shield", value : 159, weight : 6, acbonus : 1, maxdex : 1000000, acp : 0, isWeapon : true, critrange : "20/x2", damage : "1d3", damageType : "Bludgeoning", twohander : false, doubleweapon : false, light : true, maxStr : 9999, attackbonus : 0, dambonus : 0, rangeIncrement : false, asf : 5, },
	"heavy mundane crystal shield" : { group : "heavy shield", crystal : true, material : "metal", type : "Shield", value : 170, weight : 15, acbonus : 2, maxdex : 1000000, acp : -1, isWeapon : true, critrange : "20/x2", damage : "1d4", damageType : "Bludgeoning", twohander : false, doubleweapon : false, light : false, maxStr : 9999, attackbonus : 0, dambonus : 0, rangeIncrement : false, asf : 15, },

	"dragonhide buckler" : { group : "buckler", dragonhide : true, material : "metal", type : "Shield", value : 330, weight : 5, acbonus : 1, maxdex : 1000000, acp : 0, asf : 5, },
	"light dragonhide shield" : { group : "light shield", dragonhide : true, material : "metal", type : "Shield", value : 318, weight : 6, acbonus : 1, maxdex : 1000000, acp : 0, isWeapon : true, critrange : "20/x2", damage : "1d3", damageType : "Bludgeoning", twohander : false, doubleweapon : false, light : true, maxStr : 9999, attackbonus : 0, dambonus : 0, rangeIncrement : false, asf : 5, },
	"heavy dragonhide shield" : { group : "heavy shield", dragonhide : true, material : "metal", type : "Shield", value : 340, weight : 15, acbonus : 2, maxdex : 1000000, acp : -1, isWeapon : true, critrange : "20/x2", damage : "1d4", damageType : "Bludgeoning", twohander : false, doubleweapon : false, light : false, maxStr : 9999, attackbonus : 0, dambonus : 0, rangeIncrement : false, asf : 15, },
}

var armours = {
	"padded" : { material : "leather", type : "Armour", value : 5, weight : 10, acbonus : 1, maxdex : 8, acp : 0, group : "light", asf : 5, },
	"leather" : { material : "leather", type : "Armour", value : 10, weight : 15, acbonus : 2, maxdex : 6, acp : 0, group : "light", asf : 10, },
	"studded leather" : { material : "leather", type : "Armour", value : 25, weight : 20, acbonus : 3, maxdex : 5, acp : -1, group : "light", asf : 15, },
	"chain shirt" : { material : "metal", type : "Armour", value : 100, weight : 25, acbonus : 4, maxdex : 4, acp : -2, group : "light", asf : 20, },
	"hide" : { material : "leather", type : "Armour", value : 15, weight : 15, acbonus : 3, maxdex : 4, acp : -3, group : "medium", asf : 20, },
	"scale mail" : { material : "metal", type : "Armour", value : 50, weight : 30, acbonus : 4, maxdex : 3, acp : -4, group : "medium", asf : 25, },
	"chainmail" : { material : "metal", type : "Armour", value : 150, weight : 40, acbonus : 5, maxdex : 2, acp : -5, group : "medium", asf : 30, },
	"breastplate" : { material : "metal", type : "Armour", value : 200, weight : 30, acbonus : 5, maxdex : 3, acp : -4, group : "medium", asf : 25, },
	"splint mail" : { material : "metal", type : "Armour", value : 200, weight : 45, acbonus : 6, maxdex : 0, acp : -7, group : "heavy", asf : 40, },
	"banded mail" : { material : "metal", type : "Armour", value : 250, weight : 35, acbonus : 6, maxdex : 1, acp : -6, group : "heavy", asf : 35, },
	"halfplate" : { material : "metal", type : "Armour", value : 600, weight : 50, acbonus : 7, maxdex : 0, acp : -7, group : "heavy", asf : 40, },
	"full plate" : { material : "metal", type : "Armour", value : 1500, weight : 50, acbonus : 8, maxdex : 1, acp : -6, group : "heavy", asf : 35, },
}

var weapons = {
	"arrow" : { material : "metal", type : "Other", value : 0.05, weight : 0.15, number : 20 },
	"crossbow bolt" : { material : "metal", type : "Other", value : 0.1, weight : 0.1, number : 10 },
	"repeating crossbow bolt" : { material : "metal", type : "Other", value : 0.2, weight : 0.2, number : 5 },
	"sling bullet" : { material : "metal", type : "Other", value : 0.01, weight : 0.5, number : 10 },
	"bastard sword" : { material : "metal", type : "Weapon", value : 35, weight : 6, critrange:"19-20/x2", damage:"1d10", damageType:"Slashing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"battleaxe" : { material : "metal", type : "Weapon", value : 10, weight : 6, critrange:"20/x3", damage:"1d8", damageType:"Slashing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"bolas" : { material : "metal", type : "Weapon", value : 5, weight : 2, critrange:"20/x2", damage:"1d4", damageType:"Bludgeoning", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"10 ft.", range: true,},
	"club" : { material : "wood", type : "Weapon", value : 0, weight : 3, critrange:"20/x2", damage:"1d6", damageType:"Bludgeoning", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"10 ft.",},
	"composite longbow" : { material : "wood", type : "Weapon", value : 100, weight : 3, critrange:"20/x3", damage:"1d8", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:0, attackbonus:0, dambonus:0, rangeIncrement:"110 ft.",range:true,},
	"mighty str 12 composite longbow" : { material : "wood", type : "Weapon", value : 200, weight : 3, critrange:"20/x3", damage:"1d8", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:1, attackbonus:0, dambonus:0, rangeIncrement:"110 ft.", range:true,},
	"mighty str 14 composite longbow" : { material : "wood", type : "Weapon", value : 300, weight : 3, critrange:"20/x3", damage:"1d8", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:2, attackbonus:0, dambonus:0, rangeIncrement:"110 ft.", range:true,},
	"mighty str 16 composite longbow" : { material : "wood", type : "Weapon", value : 400, weight : 3, critrange:"20/x3", damage:"1d8", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:3, attackbonus:0, dambonus:0, rangeIncrement:"110 ft.", range:true,},
	"mighty str 18 composite longbow" : { material : "wood", type : "Weapon", value : 500, weight : 3, critrange:"20/x3", damage:"1d8", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:4, attackbonus:0, dambonus:0, rangeIncrement:"110 ft.", range:true,},
	"mighty str 20 composite longbow" : { material : "wood", type : "Weapon", value : 600, weight : 3, critrange:"20/x3", damage:"1d8", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:5, attackbonus:0, dambonus:0, rangeIncrement:"110 ft.", range:true,},
	"composite shortbow" : { material : "wood", type : "Weapon", value : 75, weight : 2, critrange:"20/x3", damage:"1d6", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:0, attackbonus:0, dambonus:0, rangeIncrement:"70 ft.", range:true,},
	"mighty str 12 composite shortbow" : { material : "wood", type : "Weapon", value : 150, weight : 2, critrange:"20/x3", damage:"1d6", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:1, attackbonus:0, dambonus:0, rangeIncrement:"70 ft.", range:true,},
	"mighty str 14 composite shortbow" : { material : "wood", type : "Weapon", value : 225, weight : 2, critrange:"20/x3", damage:"1d6", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:2, attackbonus:0, dambonus:0, rangeIncrement:"70 ft.", range:true,},
	"mighty str 16 composite shortbow" : { material : "wood", type : "Weapon", value : 300, weight : 2, critrange:"20/x3", damage:"1d6", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:3, attackbonus:0, dambonus:0, rangeIncrement:"70 ft.", range:true,},
	"mighty str 18 composite shortbow" : { material : "wood", type : "Weapon", value : 375, weight : 2, critrange:"20/x3", damage:"1d6", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:4, attackbonus:0, dambonus:0, rangeIncrement:"70 ft.", range:true,},
	"mighty str 20 composite shortbow" : { material : "wood", type : "Weapon", value : 450, weight : 2, critrange:"20/x3", damage:"1d6", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:5, attackbonus:0, dambonus:0, rangeIncrement:"70 ft.", range:true,},
	"dagger" : { material : "metal", type : "Weapon", value : 2, weight : 1, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing or slashing", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"10 ft.",},
	"dart" : { material : "metal", type : "Weapon", value : 0.5, weight : 0.5, critrange:"20/x2", damage:"1d4", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"20 ft.", range:true,},
	"dire flail" : { material : "metal", type : "Weapon", value : 90, weight : 10, critrange:"20/x2", damage:"1d8", damageType:"Bludgeoning", twohander: true, doubleweapon: true, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false, critrange2:"20/x2", damage2:"1d8", damageType2:"Bludgeoning", },
	"dwarven urgrosh" : { material : "metal", type : "Weapon", value : 50, weight : 12, critrange:"20/x3", damage:"1d8", damageType:"Slashing", twohander: true, doubleweapon: true, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false, critrange2:"20/x3", damage2:"1d6", damageType2:"Piercing", },
	"dwarven waraxe" : { material : "metal", type : "Weapon", value : 30, weight : 8, critrange:"20/x3", damage:"1d10", damageType:"Slashing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"falchion" : { material : "metal", type : "Weapon", value : 75, weight : 8, critrange:"18-20/x2", damage:"2d4", damageType:"Slashing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"flail" : { material : "metal", type : "Weapon", value : 8, weight : 5, critrange:"20/x2", damage:"1d8", damageType:"Bludgeoning", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"gauntlet" : { material : "metal", type : "Weapon", value : 2, weight : 1, critrange:"20/x2", damage:"1d3", damageType:"Bludgeoning", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"glaive" : { material : "metal", type : "Weapon", value : 8, weight : 10, critrange:"20/x3", damage:"1d8", damageType:"Slashing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"gnome hooked hammer" : { material : "metal", type : "Weapon", value : 20, weight : 6, critrange:"20/x3", damage:"1d8", damageType:"Bludgeoning", twohander: true, doubleweapon: true, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false, critrange2:"20/x4", damage2:"1d6", damageType2:"Piercing", },
	"greataxe" : { material : "metal", type : "Weapon", value : 20, weight : 12, critrange:"20/x3", damage:"1d12", damageType:"Slashing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"greatclub" : { material : "wood", type : "Weapon", value : 5, weight : 8, critrange:"20/x2", damage:"1d8", damageType:"Bludgeoning", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"greatsword" : { material : "metal", type : "Weapon", value : 50, weight : 8, critrange:"19-20/x2", damage:"2d6", damageType:"Slashing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"guisarme" : { material : "metal", type : "Weapon", value : 9, weight : 12, critrange:"20/x3", damage:"2d4", damageType:"Slashing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"halberd" : { material : "metal", type : "Weapon", value : 10, weight : 12, critrange:"20/x3", damage:"1d8", damageType:"Piercing or slashing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"hand crossbow" : { material : "wood", type : "Weapon", value : 100, weight : 2, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:0, attackbonus:0, dambonus:0, rangeIncrement:"30 ft.", range:true,},
	"handaxe" : { material : "metal", type : "Weapon", value : 6, weight : 3, critrange:"20/x3", damage:"1d6", damageType:"Slashing", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"heavy crossbow" : { material : "wood", type : "Weapon", value : 50, weight : 8, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"120 ft.", range:true,},
	"heavy flail" : { material : "metal", type : "Weapon", value : 15, weight : 10, critrange:"19-20/x2", damage:"1d10", damageType:"Bludgeoning", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"heavy mace" : { material : "metal", type : "Weapon", value : 12, weight : 8, critrange:"20/x2", damage:"1d8", damageType:"Bludgeoning", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"heavy pick" : { material : "metal", type : "Weapon", value : 8, weight : 6, critrange:"20/x4", damage:"1d6", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"javelin" : { material : "wood", type : "Weapon", value : 1, weight : 2, critrange:"20/x2", damage:"1d6", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"30 ft.", range:true,},
	"kama" : { material : "metal", type : "Weapon", value : 2, weight : 2, critrange:"20/x2", damage:"1d6", damageType:"Slashing", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"kukri" : { material : "metal", type : "Weapon", value : 8, weight : 2, critrange:"18-20/x2", damage:"1d4", damageType:"Slashing", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"lance" : { material : "wood", type : "Weapon", value : 10, weight : 10, critrange:"20/x3", damage:"1d8", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"light crossbow" : { material : "wood", type : "Weapon", value : 35, weight : 4, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:0, attackbonus:0, dambonus:0, rangeIncrement:"80 ft.", range:true,},
	"light hammer" : { material : "metal", type : "Weapon", value : 1, weight : 2, critrange:"20/x2", damage:"1d4", damageType:"Bludgeoning", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"20 ft.",},
	"light mace" : { material : "metal", type : "Weapon", value : 5, weight : 4, critrange:"20/x2", damage:"1d6", damageType:"Bludgeoning", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"light pick" : { material : "metal", type : "Weapon", value : 4, weight : 3, critrange:"20/x4", damage:"1d4", damageType:"Piercing", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"longbow" : { material : "wood", type : "Weapon", value : 75, weight : 3, critrange:"20/x3", damage:"1d8", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:0, attackbonus:0, dambonus:0, rangeIncrement:"100 ft.", range:true,},
	"longspear" : { material : "metal", type : "Weapon", value : 5, weight : 9, critrange:"20/x3", damage:"1d8", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"longsword" : { material : "metal", type : "Weapon", value : 15, weight : 4, critrange:"19-20/x2", damage:"1d8", damageType:"Slashing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"morningstar" : { material : "metal", type : "Weapon", value : 8, weight : 6, critrange:"20/x2", damage:"1d8", damageType:"Bludgeoning and piercing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"net" : { material : "leather", type : "Weapon", value : 20, weight : 6, critrange:"20/x2", damage:"-", damageType: "N/A", twohander: false, doubleweapon: false, light: false, maxStr:0, attackbonus:0, dambonus:0, rangeIncrement:"10 ft.", range:true,},
	"nunchaku" : { material : "metal", type : "Weapon", value : 2, weight : 2, critrange:"20/x2", damage:"1d6", damageType:"Bludgeoning", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"orc double axe" : { material : "metal", type : "Weapon", value : 60, weight : 15, critrange:"20/x3", damage:"1d8", damageType:"Slashing", twohander: true, doubleweapon: true, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false, critrange2:"20/x3", damage2:"1d8", damageType2:"Slashing", },
	"punching dagger" : { material : "metal", type : "Weapon", value : 2, weight : 1, critrange:"20/x3", damage:"1d4", damageType:"Piercing", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"quarterstaff" : { material : "wood", type : "Weapon", value : 0, weight : 4, critrange:"20/x2", damage:"1d6", damageType:"Bludgeoning", twohander: true, doubleweapon: true, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false, critrange2:"20/x2", damage2:"1d6", damageType2:"Bludgeoning", },
	"ranseur" : { material : "metal", type : "Weapon", value : 10, weight : 12, critrange:"20/x3", damage:"2d4", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"rapier" : { material : "metal", type : "Weapon", value : 20, weight : 2, critrange:"18-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"repeating heavy crossbow" : { material : "wood", type : "Weapon", value : 400, weight : 12, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:0, attackbonus:0, dambonus:0, rangeIncrement:"120 ft.", range:true,},
	"repeating light crossbow" : { material : "wood", type : "Weapon", value : 250, weight : 6, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:0, attackbonus:0, dambonus:0, rangeIncrement:"80 ft.", range:true,},
	"sai" : { material : "metal", type : "Weapon", value : 1, weight : 1, critrange:"20/x2", damage:"1d4", damageType:"Bludgeoning", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"10 ft.",},
	"sap" : { material : "leather", type : "Weapon", value : 1, weight : 2, critrange:"20/x2", damage:"1d6", damageType:"Subdual", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"scimitar" : { material : "metal", type : "Weapon", value : 15, weight : 4, critrange:"18-20/x2", damage:"1d6", damageType:"Slashing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"scythe" : { material : "metal", type : "Weapon", value : 18, weight : 10, critrange:"20/x4", damage:"2d4", damageType:"Piercing or slashing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"short sword" : { material : "metal", type : "Weapon", value : 10, weight : 2, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"shortbow" : { material : "wood", type : "Weapon", value : 30, weight : 2, critrange:"20/x3", damage:"1d6", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:0, attackbonus:0, dambonus:0, rangeIncrement:"60 ft.", range:true,},
	"shortspear" : { material : "wood", type : "Weapon", value : 1, weight : 3, critrange:"20/x2", damage:"1d6", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"20 ft.",},
	"shuriken" : { material : "metal", type : "Weapon", value : 0.2, weight : 0.1, critrange:"20/x2", damage:"1d2", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"10 ft.", number : 5 },
	"siangham" : { material : "metal", type : "Weapon", value : 3, weight : 1, critrange:"20/x2", damage:"1d6", damageType:"Piercing", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"sickle" : { material : "metal", type : "Weapon", value : 6, weight : 2, critrange:"20/x2", damage:"1d6", damageType:"Slashing", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"sling" : { material : "leather", type : "Weapon", value : 0, weight : 0, critrange:"20/x2", damage:"1d4", damageType:"Bludgeoning", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"50 ft.", range:true,},
	"spear" : { material : "wood", type : "Weapon", value : 2, weight : 6, critrange:"20/x3", damage:"1d8", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"20 ft.",},
	"spiked chain" : { material : "metal", type : "Weapon", value : 25, weight : 10, critrange:"20/x2", damage:"2d4", damageType:"Piercing", twohander: true, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"spiked gauntlet" : { material : "metal", type : "Weapon", value : 5, weight : 1, critrange:"20/x2", damage:"1d4", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"throwing axe" : { material : "metal", type : "Weapon", value : 8, weight : 2, critrange:"20/x2", damage:"1d6", damageType:"Slashing", twohander: false, doubleweapon: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"10 ft.", range:true,},
	"trident" : { material : "metal", type : "Weapon", value : 15, weight : 4, critrange:"20/x2", damage:"1d8", damageType:"Piercing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement:"10 ft.",},
	"two-bladed sword" : { material : "metal", type : "Weapon", value : 100, weight : 10, critrange:"19-20/x2", damage:"1d8", damageType:"Slashing", twohander: true, doubleweapon: true, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false, critrange2:"19-20/x2", damage2:"1d8", damageType2:"Slashing", },
	"warhammer" : { material : "metal", type : "Weapon", value : 12, weight : 5, critrange:"20/x3", damage:"1d8", damageType:"Bludgeoning", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
	"whip" : { material : "leather", type : "Weapon", value : 1, weight : 2, critrange:"20/x2", damage:"1d3", damageType:"Slashing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: false,},
}

var items = {
	"nitharit" : { value : 650, weight : 0.1, type : "Other", },
	"sassone leaf residue" : { value : 300, weight : 0.1, type : "Other", },
	"malyss root paste" : { value : 500, weight : 0.1, type : "Other", },
	"terinav root" : { value : 750, weight : 0.1, type : "Other", },
	"black lotus extract" : { value : 4500, weight : 0.1, type : "Other", },
	"dragon bile" : { value : 1500, weight : 0.1, type : "Other", },
	"striped toadstool" : { value : 180, weight : 0.1, type : "Other", },
	"arsenic" : { value : 120, weight : 0.1, type : "Other", },
	"id moss" : { value : 125, weight : 0.1, type : "Other", },
	"oil of taggit" : { value : 90, weight : 0.1, type : "Other", },
	"lich dust" : { value : 250, weight : 0.1, type : "Other", },
	"dark reaver powder" : { value : 300, weight : 0.1, type : "Other", },
	"ungol dust" : { value : 1000, weight : 0.1, type : "Other", },
	"insanity mist" : { value : 1500, weight : 0.1, type : "Other", },
	"burnt othur fumes" : { value : 2100, weight : 0.1, type : "Other", },
	"black adder venom" : { value : 120, weight : 0.1, type : "Other", },
	"small centipede poison" : { value : 90, weight : 0.1, type : "Other", },
	"bloodroot" : { value : 100, weight : 0.1, type : "Other", },
	"drow poison" : { value : 75, weight : 0.1, type : "Other", },
	"greenblood oil" : { value : 100, weight : 0.1, type : "Other", },
	"blue whinnis" : { value : 120, weight : 0.1, type : "Other", },
	"medium spider venom" : { value : 150, weight : 0.1, type : "Other", },
	"shadow essence" : { value : 250, weight : 0.1, type : "Other", },
	"wyvern poison" : { value : 3000, weight : 0.1, type : "Other", },
	"large scorpion venom" : { value : 200, weight : 0.1, type : "Other", },
	"giant wasp poison" : { value : 210, weight : 0.1, type : "Other", },
	"deathblade" : { value : 1800, weight : 0.1, type : "Other", },
	"purple worm poison" : { value : 700, weight : 0.1, type : "Other", },

	"screaming bolt" : { type : "Other", value : 267, weight : 0.1 },
	"sleep arrow" : { type : "Other", value : 132, weight : 0.15 },
	"javelin of lightning" : { type : "Other", value : 1500, weight : 2 },
	"shatterspike" : { type : "Weapon", value : 15, weight : 4, critrange:"19-20/x2", damage:"1d8", damageType:"Slashing", twohander: false, doubleweapon: false, light: false, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: false,},

	"caster's shield" : { type : "Shield", value : 1653, weight : 5, acbonus : 2, maxdex : 1000000, acp : 0, isWeapon : true, critrange : "20/x2", damage : "1d3", damageType : "Bludgeoning", twohander : false, doubleweapon : false, light : true, maxStr : 9999, attackbonus : 0, dambonus : 0, rangeIncrement : false, asf : 5 },

	"cognizance crystal [1 pp]" : { type : "Magic Item", value : 1000, weight : 1 },
	"cognizance crystal [3 pp]" : { type : "Magic Item", value : 4000, weight : 1 },

	"amulet of natural armour +1" : { type : "Magic Item", value : 2000, weight : 0, naturalac : 1 },
	"dusty rose prism ioun stone" : { type : "Magic Item", value : 5000, weight : 0, insightac : 1 },

	"cloak of resistance +1" : { type : "Magic Item", value : 1000, weight : 0, fortsave : 1, reflsave : 1, willsave : 1 },
	"cloak of resistance +2" : { type : "Magic Item", value : 4000, weight : 0, fortsave : 2, reflsave : 2, willsave : 2 },

	"amulet of health +2" : { type : "Magic Item", value : 4000, weight : 0 },
	"cloak of charisma +2" : { type : "Magic Item", value : 4000, weight : 0 },
	"gauntlets of ogre power" : { type : "Magic Item", value : 4000, weight : 0 },
	"gloves of dexterity +2" : { type : "Magic Item", value : 4000, weight : 0 },
	"headband of intellect +2" : { type : "Magic Item", value : 4000, weight : 0 },
	"periapt of wisdom +2" : { type : "Magic Item", value : 4000, weight : 0 },

	"amulet of health +4" : { type : "Magic Item", value : 16000, weight : 0 },
	"cloak of charisma +4" : { type : "Magic Item", value : 16000, weight : 0 },
	"belt of giant strength +4" : { type : "Magic Item", value : 16000, weight : 0 },
	"gloves of dexterity +4" : { type : "Magic Item", value : 16000, weight : 0 },
	"headband of intellect +4" : { type : "Magic Item", value : 16000, weight : 0 },
	"periapt of wisdom +4" : { type : "Magic Item", value : 16000, weight : 0 },

	"goggles of minute seeing" : { type : "Magic Item", value : 1250, weight : 0, skillboost : [ { skillname : "search", specialbonus : 5, regularbonus : 0 } ],},
	"lesser bracers of archery" : { type : "Magic Item", value : 5000, weight : 0 },
	"crystal mask of languages" : { type : "Magic Item", value : 2500, weight : 0.5 },
	"eyes of expanded vision" : { type : "Magic Item", value : 3000, weight : 0, skillboost : [ { skillname : "spot", specialbonus : 1, regularbonus : 0 } ], conditionalFort : { condition : "Penalty against Gaze Attacks", bonus : "-2" }, conditionalRefl : { condition : "Penalty against Gaze Attacks", bonus : "-2" }, conditionalWill : { condition : "Penalty against Gaze Attacks", bonus : "-2" }, },

	"ring of protection +1" : { type : "Magic Item", value : 2000, weight : 0, deflectionac : 1 },
	"ring of feather falling" : { type : "Magic Item", value : 2200, weight : 0 },
	"ring of sustenance" : { type : "Magic Item", value : 2500, weight : 0 },
	"ring of climbing" : { type : "Magic Item", value : 2500, weight : 0, skillboost : [ { skillname : "climb", specialbonus : 5, regularbonus : 0 } ],},
	"ring of jumping" : { type : "Magic Item", value : 2500, weight : 0, skillboost : [ { skillname : "jump", specialbonus : 5, regularbonus : 0 } ],},
	"ring of swimming" : { type : "Magic Item", value : 2500, weight : 0, skillboost : [ { skillname : "swim", specialbonus : 5, regularbonus : 0 } ],},
	"ring of counterspells" : { type : "Magic Item", value : 4000, weight : 0 },

	"bracers of armour +1" : { type : "Armour", value : 1000, weight : 1, acbonus : 1, maxdex : 100000, acp : 0, group : "none" },
	"bracers of armour +2" : { type : "Armour", value : 4000, weight : 1, acbonus : 2, maxdex : 100000, acp : 0, group : "none" },

	"boots of elvenkind" : { type : "Magic Item", value : 2500, weight : 1, skillboost : [ { skillname : "move silently", specialbonus : 5, regularbonus : 0 } ],},
	"cloak of elvenkind" : { type : "Magic Item", value : 2500, weight : 1, skillboost : [ { skillname : "hide", specialbonus : 5, regularbonus : 0 } ],},
	"eyes of the eagle" : { type : "Magic Item", value : 2500, weight : 0, skillboost : [ { skillname : "spot", specialbonus : 5, regularbonus : 0 } ],},
	"crystal mask of knowledge: arcana" : { type : "Magic Item", value : 2500, weight : 0.5, skillboost : [ { skillname : "knowledge: arcana", specialbonus : 5, regularbonus : 0 } ],},
	"crystal mask of knowledge: architecture and engineering" : { type : "Magic Item", value : 2500, weight : 0.5, skillboost : [ { skillname : "knowledge: architecture and engineering", specialbonus : 5, regularbonus : 0 } ],},
	"crystal mask of knowledge: dungeoneering" : { type : "Magic Item", value : 2500, weight : 0.5, skillboost : [ { skillname : "knowledge: dungeoneering", specialbonus : 5, regularbonus : 0 } ],},
	"crystal mask of knowledge: geography" : { type : "Magic Item", value : 2500, weight : 0.5, skillboost : [ { skillname : "knowledge: geography", specialbonus : 5, regularbonus : 0 } ],},
	"crystal mask of knowledge: history" : { type : "Magic Item", value : 2500, weight : 0.5, skillboost : [ { skillname : "knowledge: history", specialbonus : 5, regularbonus : 0 } ],},
	"crystal mask of knowledge: local" : { type : "Magic Item", value : 2500, weight : 0.5, skillboost : [ { skillname : "knowledge: local", specialbonus : 5, regularbonus : 0 } ],},
	"crystal mask of knowledge: nature" : { type : "Magic Item", value : 2500, weight : 0.5, skillboost : [ { skillname : "knowledge: nature", specialbonus : 5, regularbonus : 0 } ],},
	"crystal mask of knowledge: nobility and royalty" : { type : "Magic Item", value : 2500, weight : 0.5, skillboost : [ { skillname : "knowledge: nobility and royalty", specialbonus : 5, regularbonus : 0 } ],},
	"crystal mask of knowledge: psionics" : { type : "Magic Item", value : 2500, weight : 0.5, skillboost : [ { skillname : "knowledge: psionics", specialbonus : 5, regularbonus : 0 } ],},
	"crystal mask of knowledge: religion" : { type : "Magic Item", value : 2500, weight : 0.5, skillboost : [ { skillname : "knowledge: religion", specialbonus : 5, regularbonus : 0 } ],},
	"crystal mask of knowledge: the planes" : { type : "Magic Item", value : 2500, weight : 0.5, skillboost : [ { skillname : "knowledge: the planes", specialbonus : 5, regularbonus : 0 } ],},
	"circlet of persuasion" : { type : "Magic Item", value : 2500, weight : 0, skillboost : [ 
		{ skillname : "bluff", specialbonus : 3, regularbonus : 0 },
		{ skillname : "diplomacy", specialbonus : 3, regularbonus : 0 },
		{ skillname : "disguise", specialbonus : 3, regularbonus : 0 },
		{ skillname : "gather information", specialbonus : 3, regularbonus : 0 },
		{ skillname : "handle animal", specialbonus : 3, regularbonus : 0 },
		{ skillname : "intimidate", specialbonus : 3, regularbonus : 0 },
		{ skillname : "perform: act", specialbonus : 3, regularbonus : 0 },
		{ skillname : "perform: comedy", specialbonus : 3, regularbonus : 0 },
		{ skillname : "perform: dance", specialbonus : 3, regularbonus : 0 },
		{ skillname : "perform: juggle", specialbonus : 3, regularbonus : 0 },
		{ skillname : "perform: keyboard instruments", specialbonus : 3, regularbonus : 0 },
		{ skillname : "perform: oratory", specialbonus : 3, regularbonus : 0 },
		{ skillname : "perform: percussion instruments", specialbonus : 3, regularbonus : 0 },
		{ skillname : "perform: sing", specialbonus : 3, regularbonus : 0 },
		{ skillname : "perform: string instruments", specialbonus : 3, regularbonus : 0 },
		{ skillname : "perform: wind instruments", specialbonus : 3, regularbonus : 0 },
		{ skillname : "use magic device", specialbonus : 3, regularbonus : 0 },
	],},

	"lesser metamagic rod of enlarge" : { type : "Magic Item", value : 3000, weight : 5 },
	"lesser metamagic rod of extend" : { type : "Magic Item", value : 3000, weight : 5 },
	"lesser metamagic rod of silent" : { type : "Magic Item", value : 3000, weight : 5 },
	"immovable rod" : { type : "Magic Item", value : 5000, weight : 5 },

	"anchor feather token" : { type : "Magic Item", value : 50, weight : 0 },
	"bag of holding type i" : { type : "Magic Item", value : 2500, weight : 15 },
	"bag of holding type ii" : { type : "Magic Item", value : 5000, weight : 25 },
	"bead of force" : { type : "Magic Item", value : 3000, weight : 0 },
	"bird feather token " : { type : "Magic Item", value : 300, weight : 0 },
	"boots of the winterlands" : { type : "Magic Item", value : 2500, weight : 1 },
	"brooch of shielding" : { type : "Magic Item", value : 1500, weight : 0 },
	"candle of truth" : { type : "Magic Item", value : 2500, weight : 0 },
	"chime of opening" : { type : "Magic Item", value : 3000, weight : 1 },
	"clear spindle ioun stone" : { type : "Magic Item", value : 4000, weight : 0 },
	"dust of appearance" : { type : "Magic Item", value : 1800, weight : 0 },
	"dust of disappearance" : { type : "Magic Item", value : 3500, weight : 0 },
	"dust of dryness" : { type : "Magic Item", value : 850, weight : 0 },
	"dust of illusion" : { type : "Magic Item", value : 1200, weight : 0 },
	"dust of tracelessness" : { type : "Magic Item", value : 250, weight : 0 },
	"efficient quiver" : { type : "Magic Item", value : 1800, weight : 2 },
	"elemental gem [air]" : { type : "Magic Item", value : 2250, weight : 0 },
	"elemental gem [earth]" : { type : "Magic Item", value : 2250, weight : 0 },
	"elemental gem [fire]" : { type : "Magic Item", value : 2250, weight : 0 },
	"elemental gem [water]" : { type : "Magic Item", value : 2250, weight : 0 },
	"elixir of fire breath" : { type : "Magic Item", value : 1100, weight : 0.1 },
	"elixir of hiding" : { type : "Magic Item", value : 250, weight : 0.1 },
	"elixir of love" : { type : "Magic Item", value : 150, weight : 0.1 },
	"elixir of sneaking" : { type : "Magic Item", value : 250, weight : 0.1 },
	"elixir of swimming" : { type : "Magic Item", value : 250, weight : 0.1 },
	"elixir of truth" : { type : "Magic Item", value : 500, weight : 0.1 },
	"elixir of vision" : { type : "Magic Item", value : 250, weight : 0.1 },
	"fan feather token" : { type : "Magic Item", value : 200, weight : 0 },
	"figurine of wondrous power: silver raven" : { type : "Magic Item", value : 3800, weight : 1 },
	"gloves of arrow snaring" : { type : "Magic Item", value : 4000, weight : 0 },
	"golembane scarab" : { type : "Magic Item", value : 2500, weight : 0 },
	"gray bag of tricks" : { type : "Magic Item", value : 900, weight : 0.5 },
	"hand of the mage" : { type : "Magic Item", value : 900, weight : 2 },
	"handy haversack" : { type : "Magic Item", value : 2000, weight : 5 },
	"hat of disguise" : { type : "Magic Item", value : 1800, weight : 0 },
	"horn of fog" : { type : "Magic Item", value : 2000, weight : 1 },
	"horseshoes of speed" : { type : "Magic Item", value : 3000, weight : 12 },
	"incense of meditation" : { type : "Magic Item", value : 4900, weight : 1 },
	"lens of detection" : { type : "Magic Item", value : 3500, weight : 1 },
	"marvelous pigments" : { type : "Magic Item", value : 4000, weight : 0 },
	"necklace of fireballs type i" : { type : "Magic Item", value : 1650, weight : 0 },
	"necklace of fireballs type ii" : { type : "Magic Item", value : 2700, weight : 0 },
	"necklace of fireballs type iii" : { type : "Magic Item", value : 4350, weight : 0 },
	"pearl of power i" : { type : "Magic Item", value : 1000, weight : 0 },
	"pearl of power ii" : { type : "Magic Item", value : 4000, weight : 0 },
	"phylactery of faithfulness" : { type : "Magic Item", value : 1000, weight : 0 },
	"pipes of sounding" : { type : "Magic Item", value : 1800, weight : 3 },
	"pipes of the sewers" : { type : "Magic Item", value : 1150, weight : 3 },
	"restorative ointment" : { type : "Magic Item", value : 4000, weight : 0.5 },
	"robe of bones" : { type : "Magic Item", value : 2400, weight : 1 },
	"rope of climbing" : { type : "Magic Item", value : 3000, weight : 3 },
	"rust bag of tricks" : { type : "Magic Item", value : 3000, weight : 0.1 },
	"salve of slipperiness" : { type : "Magic Item", value : 1000, weight : 0.1 },
	"silversheen" : { type : "Magic Item", value : 250, weight : 0.1 },
	"slippers of spider climbing" : { type : "Magic Item", value : 4800, weight : 0.5 },
	"sovereign glue" : { type : "Magic Item", value : 2400, weight : 0.0625 },
	"stone of alarm" : { type : "Magic Item", value : 2700, weight : 2 },
	"stone salve" : { type : "Magic Item", value : 4000, weight : 0.0625 },
	"swan boat feather token " : { type : "Magic Item", value : 450, weight : 0 },
	"tree feather token" : { type : "Magic Item", value : 400, weight : 0 },
	"unguent of timelessness" : { type : "Magic Item", value : 150, weight : 0.1 },
	"universal solvent" : { type : "Magic Item", value : 50, weight : 0.1 },
	"whip feather token" : { type : "Magic Item", value : 500, weight : 0 },

	"boots of landing" : { type : "Magic Item", weight : 1, value : 1000, },
	"boots of stomping" : { type : "Magic Item", weight : 1, value : 600, },
	"brain lock pearl" : { type : "Magic Item", weight : 0, value : 300, },
	"breath crisis pearl" : { type : "Magic Item", weight : 0, value : 750, },
	"gloves of oject reading" : { type : "Magic Item", weight : 0, value : 3000, },
	"lesser psionic restraints" : { type : "Magic Item", weight : 1, value : 1000, },
	"mirror of suggestion" : { type : "Magic Item", weight : 0.5, value : 3600, },
	"personality parasite pearl" : { type : "Magic Item", weight : 0, value : 1400, },


	"mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: "30 ft.",},
	"mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: "30 ft.",},
	"mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: "30 ft.",},
	"mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: "30 ft.",},
	"mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: "30 ft.",},
	"mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:0, dambonus:0, rangeIncrement: "30 ft.",},
	"+1 mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",}, 
	"+1 mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+2 mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",}, 
	"+2 mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+1 defending mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",}, 
	"+1 defending mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 defending mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 defending mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 defending mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 defending mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+2 defending mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",}, 
	"+2 defending mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 defending mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 defending mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 defending mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 defending mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+1 keen mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",}, 
	"+1 keen mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 keen mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 keen mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 keen mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 keen mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+2 keen mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",}, 
	"+2 keen mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 keen mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 keen mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 keen mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 keen mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"17-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+1 lucky mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",}, 
	"+1 lucky mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 lucky mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 lucky mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 lucky mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 lucky mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+2 lucky mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",}, 
	"+2 lucky mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 lucky mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 lucky mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 lucky mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 lucky mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+1 mighty cleaving mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",}, 
	"+1 mighty cleaving mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 mighty cleaving mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 mighty cleaving mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 mighty cleaving mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 mighty cleaving mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+2 mighty cleaving mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",}, 
	"+2 mighty cleaving mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 mighty cleaving mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 mighty cleaving mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 mighty cleaving mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 mighty cleaving mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+1 psychokinetic mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4+1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",}, 
	"+1 psychokinetic mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6+1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 psychokinetic mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6+1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 psychokinetic mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8+1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 psychokinetic mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8+1d4", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 psychokinetic mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10+1d4", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+2 psychokinetic mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4+1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",}, 
	"+2 psychokinetic mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6+1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 psychokinetic mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6+1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 psychokinetic mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8+1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 psychokinetic mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8+1d4", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 psychokinetic mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10+1d4", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+1 sundering mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",}, 
	"+1 sundering mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 sundering mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 sundering mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 sundering mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 sundering mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+2 sundering mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",}, 
	"+2 sundering mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 sundering mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 sundering mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 sundering mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 sundering mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10", damageType:"Piercing", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+1 vicious mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4+2d6", damageType:"Piercing + 1d6 to wielder", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",}, 
	"+1 vicious mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6+2d6", damageType:"Piercing + 1d6 to wielder", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 vicious mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6+2d6", damageType:"Piercing + 1d6 to wielder", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 vicious mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8+2d6", damageType:"Piercing + 1d6 to wielder", twohander: false, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 vicious mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8+2d6", damageType:"Piercing + 1d6 to wielder", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+1 vicious mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10+2d6", damageType:"Piercing + 1d6 to wielder", twohander: true, light: true, maxStr:9999, attackbonus:1, dambonus:1, rangeIncrement: "30 ft.",},
	"+2 vicious mind blade (short sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d4+2d6", damageType:"Piercing + 1d6 to wielder", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",}, 
	"+2 vicious mind blade (short sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6+2d6", damageType:"Piercing + 1d6 to wielder", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 vicious mind blade (longsword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d6+2d6", damageType:"Piercing + 1d6 to wielder", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 vicious mind blade (longsword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8+2d6", damageType:"Piercing + 1d6 to wielder", twohander: false, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 vicious mind blade (bastard sword) [small]" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d8+2d6", damageType:"Piercing + 1d6 to wielder", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},
	"+2 vicious mind blade (bastard sword)" : { type : "Weapon", value : 0, weight : 0, critrange:"19-20/x2", damage:"1d10+2d6", damageType:"Piercing + 1d6 to wielder", twohander: true, light: true, maxStr:9999, attackbonus:2, dambonus:2, rangeIncrement: "30 ft.",},



	"10-foot ladder" : { type : "Equipment", value : 0.05, weight : 20}, 
	"10-foot pole" : { type : "Equipment", value : 0.2, weight : 8}, 
	"amazing lock" : { type : "Equipment", value : 150, weight : 1}, 
	"average lock" : { type : "Equipment", value : 40, weight : 1}, 
	"backpack" : { type : "Equipment", value : 2, weight : 2}, 
	"backpack [small]" : { type : "Equipment", value : 2, weight : 0.5}, 
	"barrel" : { type : "Equipment", value : 2, weight : 30}, 
	"basket" : { type : "Equipment", value : 0.4, weight : 1}, 
	"bedroll" : { type : "Equipment", value : 0.1, weight : 5}, 
	"bedroll [small]" : { type : "Equipment", value : 0.1, weight : 1.25}, 
	"bell" : { type : "Equipment", value : 1, weight : 0}, 
	"belt pouch" : { type : "Equipment", value : 1, weight : 0.5}, 
	"belt pouch [small]" : { type : "Equipment", value : 1, weight : 0.125}, 
	"blanket" : { type : "Equipment", value : 0.5, weight : 3}, 
	"blanket [small]" : { type : "Equipment", value : 0.5, weight : 0.75}, 
	"block and tackle" : { type : "Equipment", value : 5, weight : 5}, 
	"bottle" : { type : "Equipment", value : 2, weight : 0}, 
	"bucket" : { type : "Equipment", value : 0.5, weight : 2}, 
	"bullseye lantern" : { type : "Equipment", value : 12, weight : 3}, 
	"caltrops" : { type : "Equipment", value : 1, weight : 2}, 
	"candle" : { type : "Equipment", value : 0.01, weight : 0}, 
	"canvas (sq. yd.)" : { type : "Equipment", value : 0.1, weight : 1}, 
	"chain (10 ft.)" : { type : "Equipment", value : 30, weight : 2}, 
	"chain (20 ft.)" : { type : "Equipment", value : 60, weight : 4}, 
	"chain (30 ft.)" : { type : "Equipment", value : 90, weight : 6}, 
	"chain (40 ft.)" : { type : "Equipment", value : 120, weight : 8}, 
	"chain (50 ft.)" : { type : "Equipment", value : 150, weight : 10}, 
	"chest" : { type : "Equipment", value : 2, weight : 25}, 
	"clay jug" : { type : "Equipment", value : 0.03, weight : 9}, 
	"clay mug" : { type : "Equipment", value : 0.02, weight : 1}, 
	"clay pitcher" : { type : "Equipment", value : 0.02, weight : 5}, 
	"clay tankard" : { type : "Equipment", value : 0.02, weight : 1}, 
	"common lamp" : { type : "Equipment", value : 0.1, weight : 1}, 
	"crowbar" : { type : "Equipment", value : 2, weight : 5}, 
	"firewood (per day)" : { type : "Equipment", value : 0.01, weight : 20}, 
	"fishhook" : { type : "Equipment", value : 0.1, weight : 0}, 
	"fishing net, 25 sq. ft." : { type : "Equipment", value : 4, weight : 5}, 
	"flask" : { type : "Equipment", value : 0.03, weight : 1.5}, 
	"flint and steel" : { type : "Equipment", value : 1, weight : 0}, 
	"glass bottle" : { type : "Equipment", value : 2, weight : 0}, 
	"good lock" : { type : "Equipment", value : 80, weight : 1}, 
	"grappling hook" : { type : "Equipment", value : 1, weight : 4}, 
	"hammer" : { type : "Equipment", value : 0.5, weight : 2}, 
	"hempen rope (10 ft.)" : { type : "Equipment", value : 0.2, weight : 2}, 
	"hempen rope (20 ft.)" : { type : "Equipment", value : 0.4, weight : 4}, 
	"hempen rope (30 ft.)" : { type : "Equipment", value : 0.6, weight : 6}, 
	"hempen rope (40 ft.)" : { type : "Equipment", value : 0.8, weight : 8}, 
	"hempen rope (50 ft.)" : { type : "Equipment", value : 1, weight : 10}, 
	"hempen rope (60 ft.)" : { type : "Equipment", value : 1.2, weight : 12}, 
	"hempen rope (70 ft.)" : { type : "Equipment", value : 1.4, weight : 14}, 
	"hempen rope (80 ft.)" : { type : "Equipment", value : 1.6, weight : 16}, 
	"hempen rope (90 ft.)" : { type : "Equipment", value : 1.8, weight : 18}, 
	"hempen rope (100 ft.)" : { type : "Equipment", value : 2, weight : 20}, 
	"hooded lantern" : { type : "Equipment", value : 7, weight : 2}, 
	"ink (1 oz. vial)" : { type : "Equipment", value : 8, weight : 0}, 
	"ink vial" : { type : "Equipment", value : 1, weight : 0.1}, 
	"inkpen" : { type : "Equipment", value : 0.1, weight : 0}, 
	"iron pot" : { type : "Equipment", value : 0.5, weight : 10}, 
	"jug" : { type : "Equipment", value : 0.03, weight : 9}, 
	"lamp" : { type : "Equipment", value : 0.1, weight : 1}, 
	"locked gauntlet" : { type : "Equipment", value : 8, weight : 5 },
	"locked gauntlet [small]" : { type : "Equipment", value : 8, weight : 2.5 },
	"manacles" : { type : "Equipment", value : 15, weight : 2}, 
	"map case" : { type : "Equipment", value : 1, weight : 0.5}, 
	"miner's pick" : { type : "Equipment", value : 3, weight : 10}, 
	"mug" : { type : "Equipment", value : 0.02, weight : 1}, 
	"mw manacles" : { type : "Equipment", value : 50, weight : 2}, 
	"oil (1-pint flask)" : { type : "Equipment", value : 0.1, weight : 1}, 
	"paper (sheet)" : { type : "Equipment", value : 0.4, weight : 0}, 
	"parchment (sheet)" : { type : "Equipment", value : 0.2, weight : 0}, 
	"piece of chalk" : { type : "Equipment", value : 0.01, weight : 0}, 
	"piton" : { type : "Equipment", value : 0.1, weight : 0.5}, 
	"portable ram" : { type : "Equipment", value : 10, weight : 20}, 
	"potion vial" : { type : "Equipment", value : 1, weight : 0.1}, 
	"sack" : { type : "Equipment", value : 0.1, weight : 0.5}, 
	"sack [small]" : { type : "Equipment", value : 0.1, weight : 0.125}, 
	"scroll case" : { type : "Equipment", value : 1, weight : 0.5}, 
	"sealing wax" : { type : "Equipment", value : 1, weight : 1}, 
	"sewing needle" : { type : "Equipment", value : 0.5, weight : 0}, 
	"shovel" : { type : "Equipment", value : 2, weight : 8}, 
	"signal whistle" : { type : "Equipment", value : 0.8, weight : 0}, 
	"signet ring" : { type : "Equipment", value : 5, weight : 0}, 
	"sledge" : { type : "Equipment", value : 1, weight : 10}, 
	"small steel mirror" : { type : "Equipment", value : 10, weight : 0.5}, 
	"soap (per lb.)" : { type : "Equipment", value : 0.5, weight : 1}, 
	"spade" : { type : "Equipment", value : 2, weight : 8}, 
	"spyglass" : { type : "Equipment", value : 1000, weight : 1}, 
	"tankard" : { type : "Equipment", value : 0.02, weight : 1}, 
	"tent" : { type : "Equipment", value : 10, weight : 20}, 
	"tent [small]" : { type : "Equipment", value : 10, weight : 5}, 
	"torch" : { type : "Equipment", value : 0.01, weight : 1}, 
	"trail rations (per day)" : { type : "Equipment", value : 0.5, weight : 1}, 
	"trail rations (per day) [small]" : { type : "Equipment", value : 0.5, weight : 0.25}, 
	"very simple lock" : { type : "Equipment", value : 20, weight : 1}, 
	"waterskin" : { type : "Equipment", value : 1, weight : 4}, 
	"waterskin [small]" : { type : "Equipment", value : 1, weight : 1}, 
	"whetstone" : { type : "Equipment", value : 0.02, weight : 1}, 
	"wine bottle" : { type : "Equipment", value : 2, weight : 0}, 
	"winter blanket" : { type : "Equipment", value : 0.5, weight : 3}, 
	"winter blanket [small]" : { type : "Equipment", value : 0.5, weight : 0.75}, 
	"bandores" : { type : "Equipment", value : 5, weight: 3}, 
	"bandores [small]" : { type : "Equipment", value : 5, weight: 0.75}, 
	"bit and bridle" : { type : "Equipment", value : 2, weight: 1}, 
	"blank book" : { type : "Equipment", value : 15, weight: 3}, 
	"bottle of fine wine" : { type : "Equipment", value : 10, weight: 10.5}, 
	"bottle of wine" : { type : "Equipment", value : 10, weight: 10.5}, 
	"bread" : { type : "Equipment", value : 0.02, weight: 0.5}, 
	"carriage" : { type : "Equipment", value : 100, weight: 600}, 
	"cart" : { type : "Equipment", value : 15, weight: 200}, 
	"cheese" : { type : "Equipment", value : 0.1, weight: 0.5}, 
	"chunk of meat" : { type : "Equipment", value : 0.3, weight: 0.5}, 
	"common musical instrument" : { type : "Equipment", value : 5, weight: 3}, 
	"common musical instrument [small]" : { type : "Equipment", value : 5, weight: 0.75}, 
	"common wine" : { type : "Equipment", value : 0.2, weight: 6}, 
	"drum" : { type : "Equipment", value : 5, weight: 3}, 
	"drum [small]" : { type : "Equipment", value : 5, weight: 0.75}, 
	"empty spellbook" : { type : "Equipment", value : 15, weight: 3}, 
	"empty wizards spellbook" : { type : "Equipment", value : 15, weight: 3}, 
	"exotic military saddle" : { type : "Equipment", value : 60, weight: 40}, 
	"exotic pack saddle" : { type : "Equipment", value : 15, weight: 20}, 
	"exotic riding saddle" : { type : "Equipment", value : 30, weight: 30}, 
	"feed (day)" : { type : "Equipment", value : 0.05, weight: 10}, 
	"fine wine" : { type : "Equipment", value : 10, weight: 10.5}, 
	"flute" : { type : "Equipment", value : 5, weight: 3}, 
	"flute [small]" : { type : "Equipment", value : 5, weight: 0.75}, 
	"galley" : { type : "Equipment", value : 30000, weight: 0}, 
	"gallon of ale" : { type : "Equipment", value : 0.2, weight: 8}, 
	"harp" : { type : "Equipment", value : 5, weight: 3}, 
	"harp [small]" : { type : "Equipment", value : 5, weight: 0.75}, 
	"holly and mistletoe" : { type : "Equipment", value : 0, weight: 0}, 
	"horn" : { type : "Equipment", value : 5, weight: 3}, 
	"horn [small]" : { type : "Equipment", value : 5, weight: 0.75}, 
	"hourglass" : { type : "Equipment", value : 25, weight: 1}, 
	"hunk of cheese" : { type : "Equipment", value : 0.1, weight: 0.5}, 
	"keelboat" : { type : "Equipment", value : 3000, weight: 0}, 
	"loaf of bread" : { type : "Equipment", value : 0.02, weight: 0.5}, 
	"longship" : { type : "Equipment", value : 10000, weight: 0}, 
	"lute" : { type : "Equipment", value : 5, weight: 3}, 
	"lute [small]" : { type : "Equipment", value : 5, weight: 0.75}, 
	"lyre" : { type : "Equipment", value : 5, weight: 3}, 
	"lyre [small]" : { type : "Equipment", value : 5, weight: 0.75}, 
	"mandolin" : { type : "Equipment", value : 5, weight: 3}, 
	"mandolin [small]" : { type : "Equipment", value : 5, weight: 0.75}, 
	"meat" : { type : "Equipment", value : 0.3, weight: 0.5}, 
	"military saddle" : { type : "Equipment", value : 20, weight: 30}, 
	"mug of ale" : { type : "Equipment", value : 0.04, weight: 1}, 
	"oar" : { type : "Equipment", value : 2, weight: 10}, 
	"pack saddle" : { type : "Equipment", value : 5, weight: 15}, 
	"pitcher of common wine" : { type : "Equipment", value : 0.2, weight: 6}, 
	"riding saddle" : { type : "Equipment", value : 10, weight: 25}, 
	"rowboat" : { type : "Equipment", value : 50, weight: 100}, 
	"saddlebags" : { type : "Equipment", value : 4, weight: 8}, 
	"sailing ship" : { type : "Equipment", value : 10000, weight: 0}, 
	"silver holy symbol" : { type : "Equipment", value : 25, weight: 1}, 
	"sitar" : { type : "Equipment", value : 5, weight: 3}, 
	"sitar [small]" : { type : "Equipment", value : 5, weight: 0.75}, 
	"sled" : { type : "Equipment", value : 20, weight: 300}, 
	"spell component pouch" : { type : "Equipment", value : 5, weight: 2}, 
	"wagon" : { type : "Equipment", value : 35, weight: 400}, 
	"warship" : { type : "Equipment", value : 25000, weight: 0}, 
	"water clock" : { type : "Equipment", value : 1000, weight: 200}, 
	"wine" : { type : "Equipment", value : 10, weight: 10.5}, 
	"wooden holy symbol" : { type : "Equipment", value : 1, weight: 0}, 
	"acid" : { type : "Equipment", value : 10, weight : 1 },
	"alchemist's fire" : { type : "Equipment", value : 20, weight : 1}, 
	"antitoxin" : { type : "Equipment", value : 50, weight : 0}, 
	"everburning torch" : { type : "Equipment", value : 110, weight : 1}, 
	"flask of acid" : { type : "Equipment", value : 10, weight : 1 },
	"flask of alchemist's fire" : { type : "Equipment", value : 20, weight : 1}, 
	"flask of holy water" : { type : "Equipment", value : 25, weight : 1}, 
	"holy water" : { type : "Equipment", value : 25, weight : 1}, 
	"smokestick" : { type : "Equipment", value : 20, weight : 0.5}, 
	"sunrod" : { type : "Equipment", value : 2, weight : 1}, 
	"tanglefoot bag" : { type : "Equipment", value : 50, weight : 4}, 
	"thunderstone" : { type : "Equipment", value : 30, weight : 1}, 
	"tindertwig" : { type : "Equipment", value : 1, weight : 0}, 
	"vial of antitoxin" : { type : "Equipment", value : 50, weight : 0},
	"artisan's outfit" : { type : "Clothing", value : 1, weight: 4}, 
	"artisan's outfit [small]" : { type : "Clothing", value : 1, weight: 1}, 
	"cleric's vestments" : { type : "Clothing", value : 5, weight: 6}, 
	"cleric's vestments [small]" : { type : "Clothing", value : 5, weight: 1.5}, 
	"cold weather outfit" : { type : "Clothing", value : 8, weight: 7}, 
	"cold weather outfit [small]" : { type : "Clothing", value : 8, weight: 1.75}, 
	"courtier's outfit" : { type : "Clothing", value : 30, weight: 6}, 
	"courtier's outfit [small]" : { type : "Clothing", value : 30, weight: 1.5}, 
	"entertainer's outfit" : { type : "Clothing", value : 3, weight: 4}, 
	"entertainer's outfit [small]" : { type : "Clothing", value : 3, weight: 1}, 
	"explorer's outfit" : { type : "Clothing", value : 10, weight: 8}, 
	"explorer's outfit [small]" : { type : "Clothing", value : 10, weight: 2}, 
	"monk's outfit" : { type : "Clothing", value : 5, weight: 2}, 
	"monk's outfit [small]" : { type : "Clothing", value : 5, weight: 0.5}, 
	"noble's outfit" : { type : "Clothing", value : 75, weight: 10}, 
	"noble's outfit [small]" : { type : "Clothing", value : 75, weight: 2.5}, 
	"peasant's outfit" : { type : "Clothing", value : 0.1, weight: 2}, 
	"peasant's outfit [small]" : { type : "Clothing", value : 0.1, weight: 0.5}, 
	"royal outfit" : { type : "Clothing", value : 200, weight: 15}, 
	"royal outfit [small]" : { type : "Clothing", value : 200, weight: 3.75}, 
	"scholar's outfit" : { type : "Clothing", value : 5, weight: 6}, 
	"scholar's outfit [small]" : { type : "Clothing", value : 5, weight: 1.5}, 
	"traveler's outfit" : { type : "Clothing", value : 1, weight: 5}, 
	"traveler's outfit [small]" : { type : "Clothing", value : 1, weight: 1.25}, 
	"chicken" : { type : "Creature", value : 0.02, weight: 0}, 
	"cow" : { type : "Creature", value : 10, weight: 0}, 
	"donkey" : { type : "Creature", value : 8, weight: 0}, 
	"goat" : { type : "Creature", value : 1, weight: 0}, 
	"guard dog" : { type : "Creature", value : 25, weight: 0}, 
	"heavy horse" : { type : "Creature", value : 200, weight: 0}, 
	"heavy warhorse" : { type : "Creature", value : 400, weight: 0}, 
	"light horse" : { type : "Creature", value : 75, weight: 0}, 
	"light warhorse" : { type : "Creature", value : 150, weight: 0}, 
	"mule" : { type : "Creature", value : 8, weight: 0}, 
	"ox" : { type : "Creature", value : 15, weight: 0}, 
	"pig" : { type : "Creature", value : 3, weight: 0}, 
	"pony" : { type : "Creature", value : 30, weight: 0}, 
	"riding dog" : { type : "Creature", value : 150, weight: 0}, 
	"sheep" : { type : "Creature", value : 2, weight: 0}, 
	"warpony" : { type : "Creature", value : 100, weight: 0}, 
	"bat familiar" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "listen", specialbonus : 3, regularbonus : 0 } ] },
	"cat familiar" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "move silently", specialbonus : 3, regularbonus : 0 } ] },
	"hawk familiar" : { type : "Creature", value : 100, weight : 0 },
	"lizard familiar" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "climb", specialbonus : 3, regularbonus : 0 } ] },
	"owl familiar" : { type : "Creature", value : 100, weight : 0 },
	"rat familiar" : { type : "Creature", value : 100, weight : 0 },
	"raven familiar" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "appraise", specialbonus : 3, regularbonus : 0 } ] },
	"snake familiar" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "bluff", specialbonus : 3, regularbonus : 0 } ] },
	"toad familiar" : { type : "Creature", value : 100, weight : 0},
	"weasel familiar" : { type : "Creature", value : 100, weight : 0},
	"shocker lizard familiar" : { type : "Creature", value : 100, weight : 0 },
	"stirge familiar" : { type : "Creature", value : 100, weight : 0 },
	"formian worker familiar" : { type : "Creature", value : 100, weight : 0 },
	"imp familiar" : { type : "Creature", value : 100, weight : 0 },
	"pseudodragon familiar" : { type : "Creature", value : 100, weight : 0 },
	"quasit familiar" : { type : "Creature", value : 100, weight : 0 },
	"celestial hawk familiar" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "listen", specialbonus : 3, regularbonus : 0 } ] },
	"fiendish snake familiar" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "bluff", specialbonus : 3, regularbonus : 0 } ] },
	"air elemental familiar" : { type : "Creature", value : 100, weight : 0 },
	"earth elemental familiar" : { type : "Creature", value : 100, weight : 0 },
	"fire elemental familiar" : { type : "Creature", value : 100, weight : 0 },
	"water elemental familiar" : { type : "Creature", value : 100, weight : 0 },
	"homunculus familiar" : { type : "Creature", value : 100, weight : 0 },
	"ice mephit familiar" : { type : "Creature", value : 100, weight : 0 },
	"artiste psicrystal (alchemy)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "craft: alchemy", specialbonus : 3, regularbonus : 0 } ] },
	"artiste psicrystal (armoursmithing)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "craft: armoursmithing", specialbonus : 3, regularbonus : 0 } ] },
	"artiste psicrystal (blacksmithing)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "craft: blacksmithing", specialbonus : 3, regularbonus : 0 } ] },
	"artiste psicrystal (bowmaking)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "craft: bowmaking", specialbonus : 3, regularbonus : 0 } ] },
	"artiste psicrystal (leatherworking)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "craft: leatherworking", specialbonus : 3, regularbonus : 0 } ] },
	"artiste psicrystal (masonry)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "craft: masonry", specialbonus : 3, regularbonus : 0 } ] },
	"artiste psicrystal (poison)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "craft: poison", specialbonus : 3, regularbonus : 0 } ] },
	"artiste psicrystal (shipbuilding)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "craft: shipbuilding", specialbonus : 3, regularbonus : 0 } ] },
	"artiste psicrystal (tailoring)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "craft: tailoring", specialbonus : 3, regularbonus : 0 } ] },
	"artiste psicrystal (weaponsmithing)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "craft: weaponsmithing", specialbonus : 3, regularbonus : 0 } ] },
	"artiste psicrystal (woodworking)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "craft: woodworking", specialbonus : 3, regularbonus : 0 } ] },
	"bully psicrystal" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "intimidate", specialbonus : 3, regularbonus : 0 } ] },
	"coward psicrystal" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "hide", specialbonus : 3, regularbonus : 0 } ] },
	"friendly psicrystal" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "diplomacy", specialbonus : 3, regularbonus : 0 } ] },
	"hero psicrystal" : { type : "Creature", value : 100, weight : 0 },
	"liar psicrystal" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "bluff", specialbonus : 3, regularbonus : 0 } ] },
	"meticulous psicrystal" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "search", specialbonus : 3, regularbonus : 0 } ] },
	"nimble psicrystal" : { type : "Creature", value : 100, weight : 0 },
	"observant psicrystal" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "spot", specialbonus : 3, regularbonus : 0 } ] },
	"poised psicrystal" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "balance", specialbonus : 3, regularbonus : 0 } ] },
	"resolved psicrystal" : { type : "Creature", value : 100, weight : 0 },
	"sage psicrystal (arcana)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "knowledge: arcana", specialbonus : 3, regularbonus : 0 } ] },
	"sage psicrystal (architecture and engineering)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "knowledge: architecture and engineering", specialbonus : 3, regularbonus : 0 } ] },
	"sage psicrystal (dungeoneering)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "knowledge: dungeoneering", specialbonus : 3, regularbonus : 0 } ] },
	"sage psicrystal (geography)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "knowledge: geography", specialbonus : 3, regularbonus : 0 } ] },
	"sage psicrystal (history)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "knowledge: history", specialbonus : 3, regularbonus : 0 } ] },
	"sage psicrystal (local)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "knowledge: local", specialbonus : 3, regularbonus : 0 } ] },
	"sage psicrystal (nature)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "knowledge: nature", specialbonus : 3, regularbonus : 0 } ] },
	"sage psicrystal (nobility and royalty)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "knowledge: nobility and royalty", specialbonus : 3, regularbonus : 0 } ] },
	"sage psicrystal (psionics)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "knowledge: psionics", specialbonus : 3, regularbonus : 0 } ] },
	"sage psicrystal (religion)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "knowledge: religion", specialbonus : 3, regularbonus : 0 } ] },
	"sage psicrystal (the planes)" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "knowledge: the planes", specialbonus : 3, regularbonus : 0 } ] },
	"single-minded psicrystal" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "concentration", specialbonus : 3, regularbonus : 0 } ] },
	"sneaky psicrystal" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "move silently", specialbonus : 3, regularbonus : 0 } ] },
	"sympathetic psicrystal" : { type : "Creature", value : 100, weight : 0, skillboost : [ { skillname : "sense motive", specialbonus : 3, regularbonus : 0 } ] },
	"badger animal companion" : { type : "Creature", value : 0, weight : 0 },
	"camel animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dire rat animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dog animal companion" : { type : "Creature", value : 0, weight : 0 },
	"riding dog animal companion" : { type : "Creature", value : 0, weight : 0 },
	"eagle animal companion" : { type : "Creature", value : 0, weight : 0 },
	"hawk animal companion" : { type : "Creature", value : 0, weight : 0 },
	"light horse animal companion" : { type : "Creature", value : 0, weight : 0 },
	"heavy horse animal companion" : { type : "Creature", value : 0, weight : 0 },
	"owl animal companion" : { type : "Creature", value : 0, weight : 0 },
	"pony animal companion" : { type : "Creature", value : 0, weight : 0 },
	"small viper animal companion" : { type : "Creature", value : 0, weight : 0 },
	"medium viper animal companion" : { type : "Creature", value : 0, weight : 0 },
	"wolf animal companion" : { type : "Creature", value : 0, weight : 0 },
	"porpoise animal companion" : { type : "Creature", value : 0, weight : 0 },
	"medium shark animal companion" : { type : "Creature", value : 0, weight : 0 },
	"squid animal companion" : { type : "Creature", value : 0, weight : 0 },
	"ape animal companion" : { type : "Creature", value : 0, weight : 0 },
	"black bear animal companion" : { type : "Creature", value : 0, weight : 0 },
	"bison animal companion" : { type : "Creature", value : 0, weight : 0 },
	"boar animal companion" : { type : "Creature", value : 0, weight : 0 },
	"cheetah animal companion" : { type : "Creature", value : 0, weight : 0 },
	"crocodile animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dire badger animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dire bat animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dire weasel animal companion" : { type : "Creature", value : 0, weight : 0 },
	"leopard animal companion" : { type : "Creature", value : 0, weight : 0 },
	"monitor lizard animal companion" : { type : "Creature", value : 0, weight : 0 },
	"large shark animal companion" : { type : "Creature", value : 0, weight : 0 },
	"constrictor snake animal companion" : { type : "Creature", value : 0, weight : 0 },
	"large viper animal companion" : { type : "Creature", value : 0, weight : 0 },
	"wolverine animal companion" : { type : "Creature", value : 0, weight : 0 },
	"brown bear animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dire wolf animal companion" : { type : "Creature", value : 0, weight : 0 },
	"giant crocodile animal companion" : { type : "Creature", value : 0, weight : 0 },
	"deinonychus animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dire ape animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dire boar animal companion" : { type : "Creature", value : 0, weight : 0 },
	"elasmosaurus animal companion" : { type : "Creature", value : 0, weight : 0 },
	"lion animal companion" : { type : "Creature", value : 0, weight : 0 },
	"rhinoceros animal companion" : { type : "Creature", value : 0, weight : 0 },
	"huge viper animal companion" : { type : "Creature", value : 0, weight : 0 },
	"tiger animal companion" : { type : "Creature", value : 0, weight : 0 },
	"polar bear animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dire lion animal companion" : { type : "Creature", value : 0, weight : 0 },
	"megaraptor animal companion" : { type : "Creature", value : 0, weight : 0 },
	"huge shark animal companion" : { type : "Creature", value : 0, weight : 0 },
	"giant constrictor snake animal companion" : { type : "Creature", value : 0, weight : 0 },
	"orca animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dire bear animal companion" : { type : "Creature", value : 0, weight : 0 },
	"elephant animal companion" : { type : "Creature", value : 0, weight : 0 },
	"giant octopus animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dire shark animal companion" : { type : "Creature", value : 0, weight : 0 },
	"dire tiger animal companion" : { type : "Creature", value : 0, weight : 0 },
	"giant squid animal companion" : { type : "Creature", value : 0, weight : 0 },
	"triceratops animal companion" : { type : "Creature", value : 0, weight : 0 },
	"tyrannosaurus animal companion" : { type : "Creature", value : 0, weight : 0 },
	"bar of copper" : { type : "Trade Good", value : 0.5, weight: 1}, 
	"bar of gold" : { type : "Trade Good", value : 50, weight: 1}, 
	"bar of iron" : { type : "Trade Good", value : 0.1, weight: 1}, 
	"bar of platinum" : { type : "Trade Good", value : 50, weight: 1}, 
	"bar of silver" : { type : "Trade Good", value : 5, weight: 1}, 
	"cinnamon" : { type : "Trade Good", value : 1, weight: 1}, 
	"cloves" : { type : "Trade Good", value : 15, weight: 1}, 
	"copper" : { type : "Trade Good", value : 0.5, weight: 1}, 
	"flour" : { type : "Trade Good", value : 0.02, weight: 1}, 
	"ginger" : { type : "Trade Good", value : 2, weight: 1}, 
	"gold" : { type : "Trade Good", value : 50, weight: 1}, 
	"iron" : { type : "Trade Good", value : 0.1, weight: 1}, 
	"linnen (sq. yr.)" : { type : "Trade Good", value : 4, weight: 1}, 
	"pepper" : { type : "Trade Good", value : 2, weight: 1}, 
	"platinum" : { type : "Trade Good", value : 50, weight: 1}, 
	"saffron" : { type : "Trade Good", value : 15, weight: 1}, 
	"salt" : { type : "Trade Good", value : 5, weight: 1}, 
	"silk (sq. yr)" : { type : "Trade Good", value : 10, weight: 0.5}, 
	"silver" : { type : "Trade Good", value : 5, weight: 1}, 
	"tobacco" : { type : "Trade Good", value : 0.5, weight: 1}, 
	"wheat" : { type : "Trade Good", value : 0.01, weight: 1}, 
	"alchemist's lab" : { type :"Equipment", value : 500, weight: 40, skillboost : [ { skillname : "craft: alchemy", specialbonus : 0, regularbonus : 2 } ]}, 
	"climber's kit" : { type :"Equipment", value : 80, weight: 5, skillboost : [ { skillname : "climb", specialbonus : 0, regularbonus : 2 } ]}, 
	"climber's kit [small]" : { type :"Equipment", value : 80, weight: 1.25, skillboost : [ { skillname : "climb", specialbonus : 0, regularbonus : 2 } ]}, 
	"disguise kit" : { type :"Equipment", value : 50, weight: 8, skillboost : [ { skillname : "disguise", specialbonus : 0, regularbonus : 2 } ]}, 
	"disguise kit [small]" : { type :"Equipment", value : 50, weight: 2, skillboost : [ { skillname : "disguise", specialbonus : 0, regularbonus : 2 } ]}, 
	"healer's kit" : { type :"Equipment", value : 50, weight: 1, skillboost : [ { skillname : "heal", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw drum" : { type :"Equipment", value : 100, weight: 3, skillboost : [ { skillname : "perform: percussion instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw drum [small]" : { type :"Equipment", value : 100, weight: 0.75, skillboost : [ { skillname : "perform: percussion instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw flute" : { type :"Equipment", value : 100, weight: 3, skillboost : [ { skillname : "perform: wind instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw flute [small]" : { type :"Equipment", value : 100, weight: 0.75, skillboost : [ { skillname : "perform: wind instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw horn" : { type :"Equipment", value : 100, weight: 3, skillboost : [ { skillname : "perform: wind instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw horn [small]" : { type :"Equipment", value : 100, weight: 0.75, skillboost : [ { skillname : "perform: wind instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw bandores" : { type :"Equipment", value : 100, weight: 3, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw bandores [small]" : { type :"Equipment", value : 100, weight: 0.75, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw harp" : { type :"Equipment", value : 100, weight: 3, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw harp [small]" : { type :"Equipment", value : 100, weight: 0.75, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw lute" : { type :"Equipment", value : 100, weight: 3, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw lute [small]" : { type :"Equipment", value : 100, weight: 0.75, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw lyre" : { type :"Equipment", value : 100, weight: 3, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw lyre [small]" : { type :"Equipment", value : 100, weight: 0.75, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw mandolin" : { type :"Equipment", value : 100, weight: 3, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw mandolin [small]" : { type :"Equipment", value : 100, weight: 0.75, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw sitar" : { type :"Equipment", value : 100, weight: 3, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw sitar [small]" : { type :"Equipment", value : 100, weight: 0.75, skillboost : [ { skillname : "perform: string instruments", specialbonus : 0, regularbonus : 2 } ]}, 
	"mw musical instrument" : { type :"Equipment", value : 100, weight: 3}, 
	"mw musical instrument [small]" : { type :"Equipment", value : 100, weight: 0.75}, 
	"silk rope (10 ft.)" : { type : "Equipment", value : 2, weight : 1, skillboost : [ { skillname : "use rope", specialbonus : 0, regularbonus : 2 } ] }, 
	"silk rope (20 ft.)" : { type : "Equipment", value : 4, weight : 2, skillboost : [ { skillname : "use rope", specialbonus : 0, regularbonus : 2 } ] }, 
	"silk rope (30 ft.)" : { type : "Equipment", value : 6, weight : 3, skillboost : [ { skillname : "use rope", specialbonus : 0, regularbonus : 2 } ] }, 
	"silk rope (40 ft.)" : { type : "Equipment", value : 8, weight : 4, skillboost : [ { skillname : "use rope", specialbonus : 0, regularbonus : 2 } ] }, 
	"silk rope (50 ft.)" : { type : "Equipment", value : 10, weight : 5, skillboost : [ { skillname : "use rope", specialbonus : 0, regularbonus : 2 } ] }, 
	"silk rope (60 ft.)" : { type : "Equipment", value : 12, weight : 6, skillboost : [ { skillname : "use rope", specialbonus : 0, regularbonus : 2 } ] }, 
	"silk rope (70 ft.)" : { type : "Equipment", value : 14, weight : 7, skillboost : [ { skillname : "use rope", specialbonus : 0, regularbonus : 2 } ] }, 
	"silk rope (80 ft.)" : { type : "Equipment", value : 16, weight : 8, skillboost : [ { skillname : "use rope", specialbonus : 0, regularbonus : 2 } ] }, 
	"silk rope (90 ft.)" : { type : "Equipment", value : 18, weight : 9, skillboost : [ { skillname : "use rope", specialbonus : 0, regularbonus : 2 } ] }, 
	"silk rope (100 ft.)" : { type : "Equipment", value : 20, weight : 10, skillboost : [ { skillname : "use rope", specialbonus : 0, regularbonus : 2 } ] },
	"artisan's tools" : { type :"Equipment", value : 5, weight: 5}, 
	"artisan's tools (craft: armoursmithing)" : { type :"Equipment", value : 5, weight: 5}, 
	"artisan's tools (craft: blacksmithing)" : { type :"Equipment", value : 5, weight: 5}, 
	"artisan's tools (craft: bowmaking)" : { type :"Equipment", value : 5, weight: 5}, 
	"artisan's tools (craft: leatherworking)" : { type :"Equipment", value : 5, weight: 5}, 
	"artisan's tools (craft: masonry)" : { type :"Equipment", value : 5, weight: 5}, 
	"artisan's tools (craft: poison)" : { type :"Equipment", value : 5, weight: 5}, 
	"artisan's tools (craft: shipbuilding)" : { type :"Equipment", value : 5, weight: 5}, 
	"artisan's tools (craft: tailoring)" : { type :"Equipment", value : 5, weight: 5}, 
	"artisan's tools (craft: weaponsmithing)" : { type :"Equipment", value : 5, weight: 5}, 
	"artisan's tools (craft: woodworking)" : { type :"Equipment", value : 5, weight: 5}, 
	"mw artisan's tools" : { type :"Equipment", value : 55, weight: 5 }, 
	"mw artisan's tools (craft: armoursmithing)" : { type :"Equipment", value : 55, weight: 5, skillboost : [ { skillname : "craft: armoursmithing", specialbonus : 0, regularbonus : 2 } ] }, 
	"mw artisan's tools (craft: blacksmithing)" : { type :"Equipment", value : 55, weight: 5, skillboost : [ { skillname : "craft: blacksmithing", specialbonus : 0, regularbonus : 2 } ] }, 
	"mw artisan's tools (craft: bowmaking)" : { type :"Equipment", value : 55, weight: 5, skillboost : [ { skillname : "craft: bowmaking", specialbonus : 0, regularbonus : 2 } ] }, 
	"mw artisan's tools (craft: leatherworking)" : { type :"Equipment", value : 55, weight: 5, skillboost : [ { skillname : "craft: leatherworking", specialbonus : 0, regularbonus : 2 } ] }, 
	"mw artisan's tools (craft: masonry)" : { type :"Equipment", value : 55, weight: 5, skillboost : [ { skillname : "craft: masonry", specialbonus : 0, regularbonus : 2 } ] }, 
	"mw artisan's tools (craft: poison)" : { type :"Equipment", value : 55, weight: 5, skillboost : [ { skillname : "craft: poison", specialbonus : 0, regularbonus : 2 } ] }, 
	"mw artisan's tools (craft: shipbuilding)" : { type :"Equipment", value : 55, weight: 5, skillboost : [ { skillname : "craft: shipbuilding", specialbonus : 0, regularbonus : 2 } ] }, 
	"mw artisan's tools (craft: tailoring)" : { type :"Equipment", value : 55, weight: 5, skillboost : [ { skillname : "craft: tailoring", specialbonus : 0, regularbonus : 2 } ] }, 
	"mw artisan's tools (craft: weaponsmithing)" : { type :"Equipment", value : 55, weight: 5, skillboost : [ { skillname : "craft: weaponsmithing", specialbonus : 0, regularbonus : 2 } ] }, 
	"mw artisan's tools (craft: woodworking)" : { type :"Equipment", value : 55, weight: 5, skillboost : [ { skillname : "craft: woodworking", specialbonus : 0, regularbonus : 2 } ] }, 
	"magnifying glass" : { type : "Equipment", value : 100, weight: 0}, 
	"merchant's scale" : { type :"Equipment", value : 2, weight: 1}, 
	"scale" : { type :"Equipment", value : 2, weight: 1}, 
	"thieves' tools" : { type :"Equipment", value : 30, weight: 1}, 
	"mw thieves' tools" : { type :"Equipment", value : 100, weight: 2, skillboost : [ { skillname : "disable device", specialbonus : 0, regularbonus : 2 }, { skillname : "open lock", specialbonus : 0, regularbonus : 2 } ] }, 
}

var itemList = [
"Nitharit",
"Sassone Leaf Residue",
"Malyss Root Paste",
"Terinav Root",
"Black Lotus Extract",
"Dragon Bile",
"Striped Toadstool",
"Arsenic",
"Id Moss",
"Oil Of Taggit",
"Lich Dust",
"Dark Reaver Powder",
"Ungol Dust",
"Insanity Mist",
"Burnt Othur Fumes",
"Black Adder Venom",
"Small Centipede Poison",
"Bloodroot",
"Drow Poison",
"Greenblood Oil",
"Blue Whinnis",
"Medium Spider Venom",
"Shadow Essence",
"Wyvern Poison",
"Large Scorpion Venom",
"Giant Wasp Poison",
"Deathblade",
"Purple Worm Poison",
"Badger Animal Companion",
"Camel Animal Companion",
"Dire Rat Animal Companion",
"Dog Animal Companion",
"Riding Dog Animal Companion",
"Eagle Animal Companion",
"Hawk Animal Companion",
"Light Horse Animal Companion",
"Heavy Horse Animal Companion",
"Owl Animal Companion",
"Pony Animal Companion",
"Small Viper Animal Companion",
"Medium Viper Animal Companion",
"Wolf Animal Companion",
"Porpoise Animal Companion",
"Medium Shark Animal Companion",
"Squid Animal Companion",
"Ape Animal Companion",
"Black Bear Animal Companion",
"Bison Animal Companion",
"Boar Animal Companion",
"Cheetah Animal Companion",
"Crocodile Animal Companion",
"Dire Badger Animal Companion",
"Dire Bat Animal Companion",
"Dire Weasel Animal Companion",
"Leopard Animal Companion",
"Monitor Lizard Animal Companion",
"Large Shark Animal Companion",
"Constrictor Snake Animal Companion",
"Large Viper Animal Companion",
"Wolverine Animal Companion",
"Brown Bear Animal Companion",
"Dire Wolf Animal Companion",
"Giant Crocodile Animal Companion",
"Deinonychus Animal Companion",
"Dire Ape Animal Companion",
"Dire Boar Animal Companion",
"Elasmosaurus Animal Companion",
"Lion Animal Companion",
"Rhinoceros Animal Companion",
"Huge Viper Animal Companion",
"Tiger Animal Companion",
"Polar Bear Animal Companion",
"Dire Lion Animal Companion",
"Megaraptor Animal Companion",
"Huge Shark Animal Companion",
"Giant Constrictor Snake Animal Companion",
"Orca Animal Companion",
"Dire Bear Animal Companion",
"Elephant Animal Companion",
"Giant Octopus Animal Companion",
"Dire Shark Animal Companion",
"Dire Tiger Animal Companion",
"Giant Squid Animal Companion",
"Triceratops Animal Companion",
"Tyrannosaurus Animal Companion",
"Cognizance Crystal [1 pp]",
"Cognizance Crystal [3 pp]",
"Cloak of Resistance +1",
"Cloak of Resistance +2",
"Goggles of Minute Seeing",
"Amulet of Health +2",
"Cloak of Charisma +2",
"Gauntlets of Ogre Power",
"Gloves of Dexterity +2",
"Headband of Intellect +2",
"Periapt of Wisdom +2",
"Amulet of Health +4",
"Cloak of Charisma +4",
"Belt of Giant Strength +4",
"Gloves of Dexterity +4",
"Headband of Intellect +4",
"Periapt of Wisdom +4",
"Lesser Bracers of Archery",
"Crystal Mask of Languages",
"Eyes of Expanded Vision",
"Amulet of Natural Armour +1",
"Dusty Rose Prism Ioun Stone",
"Boots of the Winterlands",
"Bracers of Armour +1",
"Bracers of Armour +2",
"Boots of Elvenkind",
"Cloak of Elvenkind",
"Eyes of the Eagle",
"Crystal Mask of Knowledge: Arcana",
"Crystal Mask of Knowledge: Architecture and Engineering",
"Crystal Mask of Knowledge: Dungeoneering",
"Crystal Mask of Knowledge: Geography",
"Crystal Mask of Knowledge: History",
"Crystal Mask of Knowledge: Local",
"Crystal Mask of Knowledge: Nature",
"Crystal Mask of Knowledge: Nobility and Royalty",
"Crystal Mask of Knowledge: Psionics",
"Crystal Mask of Knowledge: Religion",
"Crystal Mask of Knowledge: The Planes",
"Circlet of Persuasion",
"Boots of Landing",
"Boots of Stomping",
"Brain Lock Pearl",
"Breath Crisis Pearl",
"Gloves of Object Reading",
"Lesser Psionic Restraints",
"Mirror of Suggestion",
"Personality Parasite Pearl",
"Anchor Feather Token",
"Bag Of Holding Type I",
"Bag Of Holding Type II",
"Bead Of Force",
"Bird Feather Token ",
"Brooch Of Shielding",
"Candle Of Truth",
"Chime Of Opening",
"Clear Spindle Ioun Stone",
"Dust Of Appearance",
"Dust Of Disappearance",
"Dust Of Dryness",
"Dust Of Illusion",
"Dust Of Tracelessness",
"Efficient Quiver",
"Elemental Gem [Air]",
"Elemental Gem [Earth]",
"Elemental Gem [Fire]",
"Elemental Gem [Water]",
"Elixir Of Fire Breath",
"Elixir Of Hiding",
"Elixir Of Love",
"Elixir Of Sneaking",
"Elixir Of Swimming",
"Elixir Of Truth",
"Elixir Of Vision",
"Fan Feather Token",
"Figurine Of Wondrous Power: Silver Raven",
"Gloves Of Arrow Snaring",
"Golembane Scarab",
"Gray Bag Of Tricks",
"Hand Of The Mage",
"Handy Haversack",
"Hat Of Disguise",
"Horn Of Fog",
"Horseshoes Of Speed",
"Incense Of Meditation",
"Lens Of Detection",
"Marvelous Pigments",
"Necklace Of Fireballs Type I",
"Necklace Of Fireballs Type II",
"Necklace Of Fireballs Type III",
"Pearl Of Power I",
"Pearl Of Power II",
"Phylactery Of Faithfulness",
"Pipes Of Sounding",
"Pipes Of The Sewers",
"Restorative Ointment",
"Robe Of Bones",
"Rope Of Climbing",
"Rust Bag Of Tricks",
"Salve Of Slipperiness",
"Silversheen",
"Slippers Of Spider Climbing",
"Sovereign Glue",
"Stone Of Alarm",
"Stone Salve",
"Swan Boat Feather Token ",
"Tree Feather Token",
"Unguent Of Timelessness",
"Universal Solvent",
"Whip Feather Token",
"10-foot Ladder",
"10-foot Pole",
"Acid",
"Air Elemental Familiar",
"Alchemist's Fire",
"Alchemist's Lab",
"Amazing Lock",
"Antitoxin",
"Artisan's Outfit",
"Artisan's Outfit [Small]",
"Artisan's Tools (Craft: Armoursmithing)",
"Artisan's Tools (Craft: Blacksmithing)",
"Artisan's Tools (Craft: Bowmaking)",
"Artisan's Tools (Craft: Leatherworking)",
"Artisan's Tools (Craft: Masonry)",
"Artisan's Tools (Craft: Poison)",
"Artisan's Tools (Craft: Shipbuilding)",
"Artisan's Tools (Craft: Tailoring)",
"Artisan's Tools (Craft: Weaponsmithing)",
"Artisan's Tools (Craft: Woodworking)",
"Artisan's Tools",
"Artiste Psicrystal (Alchemy)",
"Artiste Psicrystal (Armoursmithing)",
"Artiste Psicrystal (Blacksmithing)",
"Artiste Psicrystal (Bowmaking)",
"Artiste Psicrystal (Leatherworking)",
"Artiste Psicrystal (Masonry)",
"Artiste Psicrystal (Shipbuilding)",
"Artiste Psicrystal (Tailoring)",
"Artiste Psicrystal (Weaponsmithing)",
"Artiste Psicrystal (Woodworking)",
"Average Lock",
"Backpack [Small]",
"Backpack",
"Bandores [Small]",
"Bandores",
"Bar Of Copper",
"Bar Of Gold",
"Bar Of Iron",
"Bar Of Platinum",
"Bar Of Silver",
"Barrel",
"Basket",
"Bat Familiar",
"Bedroll [Small]",
"Bedroll",
"Bell",
"Belt Pouch [Small]",
"Belt Pouch",
"Bit and Bridle",
"Blank Book",
"Blanket [Small]",
"Blanket",
"Block and Tackle",
"Bottle Of Fine Wine",
"Bottle Of Wine",
"Bottle",
"Bread",
"Bucket",
"Bullseye Lantern",
"Bully Psicrystal",
"Caltrops",
"Candle",
"Canvas (sq. yd.)",
"Carriage",
"Cart",
"Caster's Shield",
"Cat Familiar",
"Celestial Hawk Familiar",
"Chain (10 ft.)",
"Chain (20 ft.)",
"Chain (30 ft.)",
"Chain (40 ft.)",
"Chain (50 ft.)",
"Cheese",
"Chest",
"Chicken",
"Chunk Of Meat",
"Cinnamon",
"Clay Jug",
"Clay Mug",
"Clay Pitcher",
"Clay Tankard",
"Cleric's Vestments",
"Cleric's Vestments [Small]",
"Climber's Kit [Small]",
"Climber's Kit",
"Cloves",
"Cold Weather Outfit",
"Cold Weather Outfit [Small]",
"Common Lamp",
"Common Musical Instrument [Small]",
"Common Musical Instrument",
"Common Wine",
"Copper",
"Courtier's Outfit",
"Courtier's Outfit [Small]",
"Cow",
"Coward Psicrystal",
"Crowbar",
"Disguise Kit [Small]",
"Disguise Kit",
"Donkey",
"Drum [Small]",
"Drum",
"Earth Elemental Familiar",
"Empty Spellbook",
"Empty Wizards Spellbook",
"Entertainer's Outfit",
"Entertainer's Outfit [Small]",
"Everburning Torch",
"Exotic Military Saddle",
"Exotic Pack Saddle",
"Exotic Riding Saddle",
"Explorer's Outfit",
"Explorer's Outfit [Small]",
"Feed (Day)",
"Fiendish Snake Familiar",
"Fine Wine",
"Fire Elemental Familiar",
"Firewood (per Day)",
"Fishhook",
"Fishing Net, 25 sq. ft.",
"Flask Of Acid",
"Flask Of Alchemist's Fire",
"Flask Of Holy Water",
"Flask",
"Flint and Steel",
"Flour",
"Flute [Small]",
"Flute",
"Formian Worker Familiar",
"Friendly Psicrystal",
"Galley",
"Gallon Of Ale",
"Ginger",
"Glass Bottle",
"Goat",
"Gold",
"Good Lock",
"Grappling Hook",
"Guard Dog",
"Hammer",
"Harp [Small]",
"Harp",
"Hawk Familiar",
"Healer's Kit",
"Heavy Horse",
"Heavy Warhorse",
"Hempen Rope (10 ft.)",
"Hempen Rope (100 ft.)",
"Hempen Rope (20 ft.)",
"Hempen Rope (30 ft.)",
"Hempen Rope (40 ft.)",
"Hempen Rope (50 ft.)",
"Hempen Rope (60 ft.)",
"Hempen Rope (70 ft.)",
"Hempen Rope (80 ft.)",
"Hempen Rope (90 ft.)",
"Hero Psicrystal",
"Holly and Mistletoe",
"Holy Water",
"Homunculus Familiar",
"Hooded Lantern",
"Horn [Small]",
"Horn",
"Hourglass",
"Hunk Of Cheese",
"Ice Mephit Familiar",
"Immovable Rod",	
"Imp Familiar",
"Ink (1 oz. Vial)",
"Ink Vial",
"Inkpen",
"Iron Pot",
"Iron",
"Javelin of Lightning",
"Jug",
"Keelboat",
"Lamp",
"Lesser Metamagic Rod of Enlarge",
"Lesser Metamagic Rod of Extend",
"Lesser Metamagic Rod of Silent",
"Liar Psicrystal",
"Light Horse",
"Light Warhorse",
"Linnen (sq. yr.)",
"Lizard Familiar",
"Loaf Of Bread",
"Locked Gauntlet [Small]",
"Locked Gauntlet",
"Longship",
"Lute [Small]",
"Lute",
"Lyre [Small]",
"Lyre",
"Magnifying Glass",
"Manacles",
"Mandolin [Small]",
"Mandolin",
"Map Case",
"Meat",
"Merchant's Scale",
"Meticulous Psicrystal",
"Mind Blade (Short Sword) [Small]",
"Mind Blade (Short Sword)",
"Mind Blade (Longsword) [Small]",
"Mind Blade (Longsword)",
"Mind Blade (Bastard Sword) [Small]",
"Mind Blade (Bastard Sword)",
"+1 Mind Blade (Short Sword) [Small]",
"+1 Mind Blade (Short Sword)",
"+1 Mind Blade (Longsword) [Small]",
"+1 Mind Blade (Longsword)",
"+1 Mind Blade (Bastard Sword) [Small]",
"+1 Mind Blade (Bastard Sword)",
"+2 Mind Blade (Short Sword) [Small]",
"+2 Mind Blade (Short Sword)",
"+2 Mind Blade (Longsword) [Small]",
"+2 Mind Blade (Longsword)",
"+2 Mind Blade (Bastard Sword) [Small]",
"+2 Mind Blade (Bastard Sword)",
"+1 Defending Mind Blade (Short Sword) [Small]",
"+1 Defending Mind Blade (Short Sword)",
"+1 Defending Mind Blade (Longsword) [Small]",
"+1 Defending Mind Blade (Longsword)",
"+1 Defending Mind Blade (Bastard Sword) [Small]",
"+1 Defending Mind Blade (Bastard Sword)",
"+2 Defending Mind Blade (Short Sword) [Small]",
"+2 Defending Mind Blade (Short Sword)",
"+2 Defending Mind Blade (Longsword) [Small]",
"+2 Defending Mind Blade (Longsword)",
"+2 Defending Mind Blade (Bastard Sword) [Small]",
"+2 Defending Mind Blade (Bastard Sword)",
"+1 Keen Mind Blade (Short Sword) [Small]",
"+1 Keen Mind Blade (Short Sword)",
"+1 Keen Mind Blade (Longsword) [Small]",
"+1 Keen Mind Blade (Longsword)",
"+1 Keen Mind Blade (Bastard Sword) [Small]",
"+1 Keen Mind Blade (Bastard Sword)",
"+2 Keen Mind Blade (Short Sword) [Small]",
"+2 Keen Mind Blade (Short Sword)",
"+2 Keen Mind Blade (Longsword) [Small]",
"+2 Keen Mind Blade (Longsword)",
"+2 Keen Mind Blade (Bastard Sword) [Small]",
"+2 Keen Mind Blade (Bastard Sword)",
"+1 Lucky Mind Blade (Short Sword) [Small]",
"+1 Lucky Mind Blade (Short Sword)",
"+1 Lucky Mind Blade (Longsword) [Small]",
"+1 Lucky Mind Blade (Longsword)",
"+1 Lucky Mind Blade (Bastard Sword) [Small]",
"+1 Lucky Mind Blade (Bastard Sword)",
"+2 Lucky Mind Blade (Short Sword) [Small]",
"+2 Lucky Mind Blade (Short Sword)",
"+2 Lucky Mind Blade (Longsword) [Small]",
"+2 Lucky Mind Blade (Longsword)",
"+2 Lucky Mind Blade (Bastard Sword) [Small]",
"+2 Lucky Mind Blade (Bastard Sword)",
"+1 Mighty Cleaving Mind Blade (Short Sword) [Small]",
"+1 Mighty Cleaving Mind Blade (Short Sword)",
"+1 Mighty Cleaving Mind Blade (Longsword) [Small]",
"+1 Mighty Cleaving Mind Blade (Longsword)",
"+1 Mighty Cleaving Mind Blade (Bastard Sword) [Small]",
"+1 Mighty Cleaving Mind Blade (Bastard Sword)",
"+2 Mighty Cleaving Mind Blade (Short Sword) [Small]",
"+2 Mighty Cleaving Mind Blade (Short Sword)",
"+2 Mighty Cleaving Mind Blade (Longsword) [Small]",
"+2 Mighty Cleaving Mind Blade (Longsword)",
"+2 Mighty Cleaving Mind Blade (Bastard Sword) [Small]",
"+2 Mighty Cleaving Mind Blade (Bastard Sword)",
"+1 Psychokinetic Mind Blade (Short Sword) [Small]",
"+1 Psychokinetic Mind Blade (Short Sword)",
"+1 Psychokinetic Mind Blade (Longsword) [Small]",
"+1 Psychokinetic Mind Blade (Longsword)",
"+1 Psychokinetic Mind Blade (Bastard Sword) [Small]",
"+1 Psychokinetic Mind Blade (Bastard Sword)",
"+2 Psychokinetic Mind Blade (Short Sword) [Small]",
"+2 Psychokinetic Mind Blade (Short Sword)",
"+2 Psychokinetic Mind Blade (Longsword) [Small]",
"+2 Psychokinetic Mind Blade (Longsword)",
"+2 Psychokinetic Mind Blade (Bastard Sword) [Small]",
"+2 Psychokinetic Mind Blade (Bastard Sword)",
"+1 Sundering Mind Blade (Short Sword) [Small]",
"+1 Sundering Mind Blade (Short Sword)",
"+1 Sundering Mind Blade (Longsword) [Small]",
"+1 Sundering Mind Blade (Longsword)",
"+1 Sundering Mind Blade (Bastard Sword) [Small]",
"+1 Sundering Mind Blade (Bastard Sword)",
"+2 Sundering Mind Blade (Short Sword) [Small]",
"+2 Sundering Mind Blade (Short Sword)",
"+2 Sundering Mind Blade (Longsword) [Small]",
"+2 Sundering Mind Blade (Longsword)",
"+2 Sundering Mind Blade (Bastard Sword) [Small]",
"+2 Sundering Mind Blade (Bastard Sword)",
"+1 Vicious Mind Blade (Short Sword) [Small]",
"+1 Vicious Mind Blade (Short Sword)",
"+1 Vicious Mind Blade (Longsword) [Small]",
"+1 Vicious Mind Blade (Longsword)",
"+1 Vicious Mind Blade (Bastard Sword) [Small]",
"+1 Vicious Mind Blade (Bastard Sword)",
"+2 Vicious Mind Blade (Short Sword) [Small]",
"+2 Vicious Mind Blade (Short Sword)",
"+2 Vicious Mind Blade (Longsword) [Small]",
"+2 Vicious Mind Blade (Longsword)",
"+2 Vicious Mind Blade (Bastard Sword) [Small]",
"+2 Vicious Mind Blade (Bastard Sword)",
"Military Saddle",
"Miner's Pick",
"Monk's Outfit",
"Monk's Outfit [Small]",
"Mug Of Ale",
"Mug",
"Mule",
"MW Artisan's Tools (Craft: Armoursmithing)",
"MW Artisan's Tools (Craft: Blacksmithing)",
"MW Artisan's Tools (Craft: Bowmaking)",
"MW Artisan's Tools (Craft: Leatherworking)",
"MW Artisan's Tools (Craft: Masonry)",
"MW Artisan's Tools (Craft: Poison)",
"MW Artisan's Tools (Craft: Shipbuilding)",
"MW Artisan's Tools (Craft: Tailoring)",
"MW Artisan's Tools (Craft: Weaponsmithing)",
"MW Artisan's Tools (Craft: Woodworking)",
"MW Artisan's Tools",
"MW Bandores [Small]",
"MW Bandores",
"MW Drum [Small]",
"MW Drum",
"MW Flute [Small]",
"MW Flute",
"MW Harp [Small]",
"MW Harp",
"MW Horn [Small]",
"MW Horn",
"MW Lute [Small]",
"MW Lute",
"MW Lyre [Small]",
"MW Lyre",
"MW Manacles",
"MW Manacles",
"MW Mandolin [Small]",
"MW Mandolin",
"MW Musical Instrument [Small]",
"MW Musical Instrument",
"MW Musical Instrument",
"MW Sitar [Small]",
"MW Sitar",
"MW Thieves' Tools",
"Nimble Psicrystal",
"Noble's Outfit",
"Noble's Outfit [Small]",
"Oar",
"Observant Psicrystal",
"Oil (1-pint Flask)",
"Owl Familiar",
"Ox",
"Pack Saddle",
"Paper (Sheet)",
"Parchment (Sheet)",
"Peasant's Outfit",
"Peasant's Outfit [Small]",
"Pepper",
"Piece Of Chalk",
"Pig",
"Pitcher Of Common Wine",
"Piton",
"Platinum",
"Poised Psicrystal",
"Pony",
"Portable Ram",
"Potion Vial",
"Pseudodragon Familiar",
"Quasit Familiar",
"Rat Familiar",
"Raven Familiar",
"Resolved Psicrystal",
"Riding Dog",
"Riding Saddle",
"Ring of Protection +1",
"Ring of Feather Falling",
"Ring of Sustenance",
"Ring of Climbing",
"Ring of Jumping",
"Ring of Swimming",
"Ring of Counterspells",
"Rowboat",
"Royal Outfit",
"Royal Outfit [Small]",
"Sack [Small]",
"Sack",
"Saddlebags",
"Saffron",
"Sage Psicrystal (Arcana)",
"Sage Psicrystal (Architecture and Engineering)",
"Sage Psicrystal (Dungeoneering)",
"Sage Psicrystal (Geography)",
"Sage Psicrystal (History)",
"Sage Psicrystal (Local)",
"Sage Psicrystal (Nature)",
"Sage Psicrystal (Nobility and Royalty)",
"Sage Psicrystal (Psionics)",
"Sage Psicrystal (Religion)",
"Sage Psicrystal (The Planes)",
"Sailing Ship",
"Salt",
"Scale",
"Scholar's Outfit",
"Scholar's Outfit [Small]",
"Screaming Bolt",
"Scroll Case",
"Sealing Wax",
"Sewing Needle",
"Shatterspike",
"Sheep",
"Shocker Lizard Familiar",
"Shovel",
"Signal Whistle",
"Signet Ring",
"Silk (sq. yr)",
"Silk Rope (10 ft.)",
"Silk Rope (100 ft.)",
"Silk Rope (20 ft.)",
"Silk Rope (30 ft.)",
"Silk Rope (40 ft.)",
"Silk Rope (50 ft.)",
"Silk Rope (60 ft.)",
"Silk Rope (70 ft.)",
"Silk Rope (80 ft.)",
"Silk Rope (90 ft.)",
"Silver Holy Symbol",
"Silver",
"Single-Minded Psicrystal",
"Sitar [Small]",
"Sitar",
"Sled",
"Sledge",
"Sleep Arrow",
"Small Steel Mirror",
"Smokestick",
"Snake Familiar",
"Sneaky Psicrystal",
"Soap (per lb.)",
"Spade",
"Spell Component Pouch",
"Spyglass",
"Stirge Familiar",
"Sunrod",
"Sympathetic Psicrystal",
"Tanglefoot Bag",
"Tankard",
"Tent [Small]",
"Tent",
"Thieves' Tools",
"Thunderstone",
"Tindertwig",
"Toad Familiar",
"Tobacco",
"Torch",
"Trail Rations (per Day) [Small]",
"Trail Rations (per Day)",
"Traveler's Outfit",
"Traveler's Outfit [Small]",
"Very Simple Lock",
"Vial Of Antitoxin",
"Wagon",
"Warpony",
"Warship",
"Water Clock",
"Water Elemental Familiar",
"Waterskin [Small]",
"Waterskin",
"Weasel Familiar",
"Wheat",
"Whetstone",
"Wine Bottle",
"Wine",
"Winter Blanket [Small]",
"Winter Blanket",
"Wooden Holy Symbol",
]

function isTwoHanded(weapon) {

	if(weapon.toLowerCase().indexOf("bastard sword") >= 0) {
		// this is a bastard sword
		if(hasFeat("Exotic Weapon Proficiency: Bastard Sword")) {
			// not two handed with this feat
			return false;
		}
	}

	var temp = getItemDefaults(weapon);
	if(temp) {
		return temp['twohander'];
	} else {
		return false;
	}
}

function canBeTwoHanded(weapon) {

	if(weapon.toLowerCase().indexOf("bastard sword") >= 0) {
		// this is a bastard sword
		if(hasFeat("Exotic Weapon Proficiency: Bastard Sword")) {
			// not two handed with this feat
			return true;
		}
	}

	var temp = getItemDefaults(weapon);
	if(temp) {
		return ((!temp['twohander']) && !temp['light']);
	} else {
		return false;
	}
}

function isLightWeapon(weapon) {
	if($.trim(weapon.toLowerCase() == "unarmed strike")) {
		return true;
	}

	var temp = getItemDefaults(weapon);
	if(temp) {
		return temp['light'];
	} else {
		return false;
	}

}

function maxStrength(weapon) {
	var temp = getItemDefaults(weapon);
	if(temp) {
		return temp['maxStr'];
	} else {
		return 9999;
	}
}

function weaponDamageBonus(weapon) {
	var temp = getItemDefaults(weapon)
	if(temp) {
		return temp['dambonus'];
	} else {
		return 0;
	}
}

function isRangedWeapon(weapon) {
	// special case, Bolt of Fire
	if($.trim(weapon.toLowerCase()) == "bolt of fire") {
		return true;
	}

	var temp = getItemDefaults(weapon);
	if(temp) {
		return temp['range'];
	} else {
		return false;
	}
}

function weaponAttackBonus(weapon) {
	var temp = getItemDefaults(weapon)
	if(temp) {
		return temp['attackbonus'];
	} else {
		return 0;
	}
}

function isDoubleWeapon(weapon) {
	var temp = getItemDefaults(weapon)
	if(temp) {
		return temp['doubleweapon'];
	} else {
		return false;
	}
}

function getCritRange(weapon) {
	var temp = getItemDefaults(weapon);
	if(temp) {
		return temp['critrange'];
	} else {
		return "20/x2";
	}
}

function getWeaponDamage(weapon) {
	var temp = getItemDefaults(weapon);
	if(temp) {
		return temp['damage'];
	} else {
		return "-";
	}
}

function getWeaponDamageType(weapon) {
	var temp = getItemDefaults(weapon);
	if(temp) {
		if(temp['damageType']) {
			return temp['damageType'];
		} else {
			return "Unknown";
		}
	} else {
		return "Unknown";
	}
}

function getWeaponRangeIncrement(weapon) {
	var temp = getItemDefaults(weapon);
	if(temp) {
		var range = parseInt(temp['rangeIncrement']);
		if(range) {
			if(hasFeat("Far Shot")) {
				if(isRangedWeapon(weapon)) {
					range = range * 1.5;
				} else {
					range = range * 2;
				}
			}

	        	if(isRangedWeapon(weapon)) {
	        	        // Ranged Weapon Mastery
       	 	        	if(hasFeat("Ranged Weapon Mastery: Bludgeoning") && getWeaponDamageType(weapon).toLowerCase().indexOf("bludgeoning") > -1) {
       	 	        	        range += 20;
       	 	        	} else if(hasFeat("Ranged Weapon Mastery: Piercing") && getWeaponDamageType(weapon).toLowerCase().indexOf("piercing") > -1) {
        	        	        range += 20;
        	        	} else if(hasFeat("Ranged Weapon Mastery: Slashing") && getWeaponDamageType(weapon).toLowerCase().indexOf("slashing") > -1) {
        	        	        range += 20;
        	        	}
        		}
			return range + " ft.";
		}
		return range;
	} else {
		return false;
	}
}

function getBaseSpellsPerDay(classname, classlevels) {
	switch(classname) {
		case "bard":
		case "bard (divine)":
		case "bard (druidic)":
		case "bard (sage)":
		case "bard (savage)":
			switch(classlevels) {
				case 1:
					return [ 2 ];
				case 2:
					return [ 3, 0 ];
				case 3:
					return [ 3, 1 ]
				case 4:
					return [ 3, 2, 0 ];
				case 5:
					return [ 3, 3, 1 ];
				case 6:
					return [ 3, 3, 2 ];
				case 7:
					return [ 3, 3, 2, 0 ];
				case 8:
					return [ 3, 3, 3, 1 ];
				case 9:
					return [ 3, 3, 3, 2 ];
				case 10:
					return [ 3, 3, 3, 2, 0 ];
				case 11:
					return [ 3, 3, 3, 3, 1 ];
				case 12:
					return [ 3, 3, 3, 3, 2 ];
				case 13:
					return [ 3, 3, 3, 3, 2, 0 ];
				case 14:
					return [ 4, 3, 3, 3, 3, 1 ];
				case 15:
					return [ 4, 4, 3, 3, 3, 2 ];
				case 16:
					return [ 4, 4, 4, 3, 3, 2, 0 ];
				case 17:
					return [ 4, 4, 4, 4, 3, 3, 1 ];
				case 18:
					return [ 4, 4, 4, 4, 4, 3, 2 ];
				case 19:
					return [ 4, 4, 4, 4, 4, 4, 3 ];
				case 20:
					return [ 4, 4, 4, 4, 4, 4, 4 ];
				default:
					return [ ];
			}
			break;
                case "cleric":
		case "cleric (cloistered)":
		case "cleric (champion)":
                case "druid":
                case "druid (shifter)":
		case "druid (avenger)":
		case "druid (hunter)":
			switch(classlevels) {
				case 1:
					return [ 3, 1 ];
				case 2:
					return [ 4, 2 ];
				case 3:
					return [ 4, 2, 1 ]
				case 4:
					return [ 5, 3, 2 ];
				case 5:
					return [ 5, 3, 2, 1 ];
				case 6:
					return [ 5, 3, 3, 2 ];
				case 7:
					return [ 6, 4, 3, 2, 1 ];
				case 8:
					return [ 6, 4, 3, 3, 2 ];
				case 9:
					return [ 6, 4, 4, 3, 2, 1 ];
				case 10:
					return [ 6, 4, 4, 3, 3, 2 ];
				case 11:
					return [ 6, 5, 4, 4, 3, 2, 1 ];
				case 12:
					return [ 6, 5, 4, 4, 3, 3, 2 ];
				case 13:
					return [ 6, 5, 5, 4, 4, 3, 2, 1 ];
				case 14:
					return [ 6, 5, 5, 4, 4, 3, 3, 2 ];
				case 15:
					return [ 6, 5, 5, 5, 4, 4, 3, 2, 1 ];
				case 16:
					return [ 6, 5, 5, 5, 4, 4, 3, 3, 2 ];
				case 17:
					return [ 6, 5, 5, 5, 5, 4, 4, 3, 2, 1 ];
				case 18:
					return [ 6, 5, 5, 5, 5, 4, 4, 3, 3, 2 ];
				case 19:
					return [ 6, 5, 5, 5, 5, 5, 4, 4, 3, 3 ];
				case 20:
					return [ 6, 5, 5, 5, 5, 5, 4, 4, 4, 4 ];
				default:
					return [ ];
			}
			break;
		case "duskblade":
			switch(classlevels) {
				case 1:
					return [ 3, 2 ];
				case 2:
					return [ 4, 3 ];
				case 3:
					return [ 5, 4 ];
				case 4:
					return [ 6, 5 ];
				case 5:
					return [ 6, 5, 2 ];
				case 6:
					return [ 6, 6, 3 ];
				case 7:
					return [ 6, 6, 5 ];
				case 8:
					return [ 6, 7, 6 ];
				case 9:
					return [ 6, 7, 6, 2 ];
				case 10:
					return [ 6, 8, 7, 3 ];
				case 11:
					return [ 6, 8, 7, 5 ];
				case 12:
					return [ 6, 8, 8, 6 ];
				case 13:
					return [ 6, 9, 8, 6, 2 ];
				case 14:
					return [ 6, 9, 8, 7, 3 ];
				case 15:
					return [ 6, 9, 8, 7, 5 ];
				case 16:
					return [ 6, 9, 9, 8, 6 ];
				case 17:
					return [ 6, 10, 9, 8, 6, 2 ];
				case 18:
					return [ 6, 10, 9, 8, 7, 3 ];
				case 19:
					return [ 6, 10, 10, 9, 7, 5 ];
				case 20:
					return [ 6, 10, 10, 10, 8, 6 ];
			}
			break;
                case "paladin":
		case "paladin (tyranny)":
		case "paladin (freedom)":
		case "paladin (slaughter)":
		case "paladin (hunter)":
                case "ranger":
                case "ranger (shifter)":
                case "ranger (urban)":
                case "ranger (planar)":
			switch(classlevels) {
				case 1:
					return [ false ];
				case 2:
					return [ false ];
				case 3:
					return [ false ]
				case 4:
					return [ false, 0 ];
				case 5:
					return [ false, 0 ];
				case 6:
					return [ false, 1 ];
				case 7:
					return [ false, 1 ];
				case 8:
					return [ false, 1, 0 ];
				case 9:
					return [ false, 1, 1 ];
				case 10:
					return [ false, 1, 1 ];
				case 11:
					return [ false, 1, 1, 0 ];
				case 12:
					return [ false, 1, 1, 1 ];
				case 13:
					return [ false, 1, 1, 1 ];
				case 14:
					return [ false, 2, 1, 1, 0 ];
				case 15:
					return [ false, 2, 1, 1, 1 ];
				case 16:
					return [ false, 2, 2, 1, 1 ];
				case 17:
					return [ false, 2, 2, 2, 1 ];
				case 18:
					return [ false, 3, 2, 2, 1 ];
				case 19:
					return [ false, 3, 3, 3, 2 ];
				case 20:
					return [ false, 3, 3, 3, 3 ];
				default:
					return [ ];
			}
			break;
                case "sorcerer (battle)":
			switch(classlevels) {
                                case 1:
                                        return [ 4, 2 ];
                                case 2:
                                        return [ 5, 3 ];
                                case 3:
                                        return [ 5, 5 ]
                                case 4:
                                        return [ 5, 5, 2 ];
                                case 5:
                                        return [ 5, 5, 3 ];
                                case 6:
                                        return [ 5, 5, 4, 2 ];
                                case 7:
                                        return [ 5, 5, 5, 3 ];
                                case 8:
                                        return [ 5, 5, 5, 4, 2 ];
                                case 9:
                                        return [ 5, 5, 5, 5, 3 ];
                                case 10:
                                        return [ 5, 5, 5, 5, 4, 2 ];
                                case 11:
                                        return [ 5, 5, 5, 5, 5, 3 ];
                                case 12:
                                        return [ 5, 5, 5, 5, 5, 4, 2 ];
                                case 13:
                                        return [ 5, 5, 5, 5, 5, 5, 3 ];
                                case 14:
                                        return [ 5, 5, 5, 5, 5, 5, 4, 2 ];
                                case 15:
                                        return [ 5, 5, 5, 5, 5, 5, 5, 3 ];
                                case 16:
                                        return [ 5, 5, 5, 5, 5, 5, 5, 4, 2 ];
                                case 17:
                                        return [ 5, 5, 5, 5, 5, 5, 5, 5, 3 ];
                                case 18:
                                        return [ 5, 5, 5, 5, 5, 5, 5, 5, 4, 2 ];
                                case 19:
                                        return [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 3 ];
                                case 20:
                                        return [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ];
                                default:
                                        return [ ];
			}
			break;
		case "beguiler":
			switch(classlevels) {
				case 1:
					return [ 5, 3 ];
				case 2:
					return [ 6, 4 ];
				case 3:
					return [ 6, 5 ]
				case 4:
					return [ 6, 6, 3 ];
				case 5:
					return [ 6, 6, 4 ];
				case 6:
					return [ 6, 6, 5, 3 ];
				case 7:
					return [ 6, 6, 6, 4 ];
				case 8:
					return [ 6, 6, 6, 5, 3 ];
				case 9:
					return [ 6, 6, 6, 6, 4 ];
				case 10:
					return [ 6, 6, 6, 6, 5, 3 ];
				case 11:
					return [ 6, 6, 6, 6, 6, 4 ];
				case 12:
					return [ 6, 6, 6, 6, 6, 5, 3 ];
				case 13:
					return [ 6, 6, 6, 6, 6, 6, 4 ];
				case 14:
					return [ 6, 6, 6, 6, 6, 6, 5, 3 ];
				case 15:
					return [ 6, 6, 6, 6, 6, 6, 6, 4 ];
				case 16:
					return [ 6, 6, 6, 6, 6, 6, 6, 5, 3 ];
				case 17:
					return [ 6, 6, 6, 6, 6, 6, 6, 6, 4 ];
				case 18:
					return [ 6, 6, 6, 6, 6, 6, 6, 6, 5, 3 ];
				case 19:
					return [ 6, 6, 6, 6, 6, 6, 6, 6, 6, 4 ];
				case 20:
					return [ 6, 6, 6, 6, 6, 6, 6, 6, 6, 5 ];
				default:
					return [ ];
			}
			break;
                case "sorcerer":
                case "sorcerer (animal companion)":
			switch(classlevels) {
				case 1:
					return [ 5, 3 ];
				case 2:
					return [ 6, 4 ];
				case 3:
					return [ 6, 5 ]
				case 4:
					return [ 6, 6, 3 ];
				case 5:
					return [ 6, 6, 4 ];
				case 6:
					return [ 6, 6, 5, 3 ];
				case 7:
					return [ 6, 6, 6, 4 ];
				case 8:
					return [ 6, 6, 6, 5, 3 ];
				case 9:
					return [ 6, 6, 6, 6, 4 ];
				case 10:
					return [ 6, 6, 6, 6, 5, 3 ];
				case 11:
					return [ 6, 6, 6, 6, 6, 4 ];
				case 12:
					return [ 6, 6, 6, 6, 6, 5, 3 ];
				case 13:
					return [ 6, 6, 6, 6, 6, 6, 4 ];
				case 14:
					return [ 6, 6, 6, 6, 6, 6, 5, 3 ];
				case 15:
					return [ 6, 6, 6, 6, 6, 6, 6, 4 ];
				case 16:
					return [ 6, 6, 6, 6, 6, 6, 6, 5, 3 ];
				case 17:
					return [ 6, 6, 6, 6, 6, 6, 6, 6, 4 ];
				case 18:
					return [ 6, 6, 6, 6, 6, 6, 6, 6, 5, 3 ];
				case 19:
					return [ 6, 6, 6, 6, 6, 6, 6, 6, 6, 4 ];
				case 20:
					return [ 6, 6, 6, 6, 6, 6, 6, 6, 6, 6 ];
				default:
					return [ ];
			}
			break;
                case "wizard":
                case "wizard (warrior)":
                case "wizard (domain)":
                case "wizard (animal companion)":
                case "wizard (abjurer)":
                case "wizard (conjurer)":
                case "wizard (diviner)":
                case "wizard (enchanter)":
                case "wizard (evoker)":
                case "wizard (illusionist)":
                case "wizard (necromancer)":
                case "wizard (transmuter)":
			switch(classlevels) {
				case 1:
					return [ 3, 1 ];
				case 2:
					return [ 4, 2 ];
				case 3:
					return [ 4, 2, 1 ]
				case 4:
					return [ 4, 3, 2 ];
				case 5:
					return [ 4, 3, 2, 1 ];
				case 6:
					return [ 4, 3, 3, 2 ];
				case 7:
					return [ 4, 4, 3, 2, 1 ];
				case 8:
					return [ 4, 4, 3, 3, 2 ];
				case 9:
					return [ 4, 4, 4, 3, 2, 1 ];
				case 10:
					return [ 4, 4, 4, 3, 3, 2 ];
				case 11:
					return [ 4, 4, 4, 4, 3, 2, 1 ];
				case 12:
					return [ 4, 4, 4, 4, 3, 3, 2 ];
				case 13:
					return [ 4, 4, 4, 4, 4, 3, 2, 1 ];
				case 14:
					return [ 4, 4, 4, 4, 4, 3, 3, 2 ];
				case 15:
					return [ 4, 4, 4, 4, 4, 4, 3, 2, 1 ];
				case 16:
					return [ 4, 4, 4, 4, 4, 4, 3, 3, 2 ];
				case 17:
					return [ 4, 4, 4, 4, 4, 4, 4, 3, 2, 1 ];
				case 18:
					return [ 4, 4, 4, 4, 4, 4, 4, 3, 3, 2 ];
				case 19:
					return [ 4, 4, 4, 4, 4, 4, 4, 4, 3, 3 ];
				case 20:
					return [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ];
				default:
					return [ ];
			}
			break;
                case "assassin":
			switch(classlevels) {
				case 1:
					return [ 0 ];
				case 2:
					return [ 1 ];
				case 3:
					return [ 2, 0 ]
				case 4:
					return [ 3, 1 ];
				case 5:
					return [ 3, 2, 0 ];
				case 6:
					return [ 3, 3, 1 ];
				case 7:
					return [ 3, 3, 2, 0 ];
				case 8:
					return [ 3, 3, 3, 1 ];
				case 9:
					return [ 3, 3, 3, 2 ];
				case 10:
					return [ 3, 3, 3, 3 ];
				default:
					return [ ];
			}
			break;
                case "blackguard":
			switch(classlevels) {
				case 1:
					return [ 0 ];
				case 2:
					return [ 1 ];
				case 3:
					return [ 1, 0 ]
				case 4:
					return [ 1, 1 ];
				case 5:
					return [ 1, 1, 0 ];
				case 6:
					return [ 1, 1, 1 ];
				case 7:
					return [ 2, 1, 1, 0 ];
				case 8:
					return [ 2, 1, 1, 1 ];
				case 9:
					return [ 2, 2, 1, 1 ];
				case 10:
					return [ 2, 2, 2, 1 ];
				default:
					return [ ];
			}
			break;
                case "adept":
			switch(classlevels) {
				case 1:
					return [ 3, 1 ];
				case 2:
					return [ 3, 1 ];
				case 3:
					return [ 3, 2 ]
				case 4:
					return [ 3, 2, 0 ];
				case 5:
					return [ 3, 2, 1 ];
				case 6:
					return [ 3, 2, 1 ];
				case 7:
					return [ 3, 3, 2 ];
				case 8:
					return [ 3, 3, 2, 0 ];
				case 9:
					return [ 3, 3, 2, 1 ];
				case 10:
					return [ 3, 3, 2, 1 ];
				case 11:
					return [ 3, 3, 3, 2 ];
				case 12:
					return [ 3, 3, 3, 2, 0 ];
				case 13:
					return [ 3, 3, 3, 2, 1 ];
				case 14:
					return [ 3, 3, 3, 2, 1 ];
				case 15:
					return [ 3, 3, 3, 3, 2 ];
				case 16:
					return [ 3, 3, 3, 3, 2, 0 ];
				case 17:
					return [ 3, 3, 3, 3, 2, 1 ];
				case 18:
					return [ 3, 3, 3, 3, 2, 1 ];
				case 19:
					return [ 3, 3, 3, 3, 3, 2 ];
				case 20:
					return [ 3, 3, 3, 3, 3, 2 ];
				default:
					return [ ];
			}
			break;
                case "dragon disciple":
		case "loremaster":
	}
}

function getCasterAbility(classname) {
	switch(classname) {
		case "bard":
		case "bard (divine)":
		case "bard (druidic)":
		case "bard (sage)":
		case "bard (savage)":
                case "sorcerer":
                case "sorcerer (battle)":
                case "sorcerer (animal companion)":
                case "wilder":
			return "charisma";
                case "cleric":
		case "cleric (cloistered)":
		case "cleric (champion)":
                case "druid":
                case "druid (avenger)":
                case "druid (hunter)":
                case "druid (shifter)":
                case "paladin":
		case "paladin (freedom)":
		case "paladin (slaughter)":
		case "paladin (tyranny)":
		case "paladin (hunter)":
                case "ranger":
                case "ranger (shifter)":
                case "ranger (urban)":
                case "ranger (planar)":
                case "blackguard":
                case "adept":
                case "psychic warrior":
                case "psionic fist":
                case "warmind":
			return "wisdom";
                case "wizard":
                case "wizard (warrior)":
                case "wizard (domain)":
                case "wizard (animal companion)":
                case "wizard (abjurer)":
                case "wizard (conjurer)":
                case "wizard (diviner)":
                case "wizard (enchanter)":
                case "wizard (evoker)":
                case "wizard (illusionist)":
                case "wizard (necromancer)":
                case "wizard (transmuter)":
                case "assassin":
		case "beguiler":
		case "duskblade":
                case "psion (egoist)":
                case "psion (kineticist)":
                case "psion (nomad)":
                case "psion (seer)":
                case "psion (shaper)":
                case "psion (telepath)":
			return "intelligence";
	}
}

function getBonusSpells(abilityScore, ability, classname) {

	var classname = $.trim(classname.toLowerCase());
	var abilitybonus = calculateAbilityBonus(abilityScore);

	if($.trim(ability.toLowerCase()) == "wisdom") {
		if(classname == "cleric" || classname == "cleric (cloistered)" || classname == "cleric (champion)") {
			if(getInsanityScore() > abilitybonus) {
				abilitybonus = getInsanityScore();
			}
		} else {
			abilitybonus -= getInsanityScore();
		}
	}


	return [ 0, 
		Math.max(0, Math.ceil(abilitybonus / 4)), 
		Math.max(0, Math.ceil((abilitybonus - 1) / 4)),
		Math.max(0, Math.ceil((abilitybonus - 2) / 4)),
		Math.max(0, Math.ceil((abilitybonus - 3) / 4)),
		Math.max(0, Math.ceil((abilitybonus - 4) / 4)),
		Math.max(0, Math.ceil((abilitybonus - 5) / 4)),
		Math.max(0, Math.ceil((abilitybonus - 6) / 4)),
		Math.max(0, Math.ceil((abilitybonus - 7) / 4)),
		Math.max(0, Math.ceil((abilitybonus - 8) / 4)) ];

}

function getBasePowerPointsPerDay(classname, classlevels) {

	switch(classname) {
                case "psion (egoist)":
                case "psion (kineticist)":
                case "psion (nomad)":
                case "psion (seer)":
                case "psion (shaper)":
                case "psion (telepath)":
                case "wilder":
			switch(classlevels) {
				case 1:
					return 2;
				case 2:
					return 6;
				case 3:
					return 11;
				case 4:
					return 17;
				case 5:
					return 25;
				case 6:
					return 35;
				case 7:
					return 46;
				case 8:
					return 58;
				case 9:
					return 72;
				case 10:
					return 88;
				case 11:
					return 106;
				case 12:
					return 126;
				case 13:
					return 147;
				case 14:
					return 170;
				case 15:
					return 195;
				case 16:
					return 221;
				case 17:
					return 250;
				case 18:
					return 280;
				case 19:
					return 311;
				case 20:
					return 343;
				default:
					return -1;
			}
			break;
                case "psychic warrior":
			switch(classlevels) {
				case 1:
					return 0;
				case 2:
					return 1;
				case 3:
					return 3;
				case 4:
					return 5;
				case 5:
					return 7;
				case 6:
					return 11;
				case 7:
					return 15;
				case 8:
					return 19;
				case 9:
					return 23;
				case 10:
					return 27;
				case 11:
					return 35;
				case 12:
					return 43;
				case 13:
					return 51;
				case 14:
					return 59;
				case 15:
					return 67;
				case 16:
					return 79;
				case 17:
					return 91;
				case 18:
					return 103;
				case 19:
					return 115;
				case 20:
					return 127;
				default:
					return -1;
			}
			break;
                case "psionic fist":
			switch(classlevels) {
				case 1:
					return 1;
				case 2:
					return 3;
				case 3:
					return 6;
				case 4:
					return 10;
				case 5:
					return 15;
				case 6:
					return 23;
				case 7:
					return 31;
				case 8:
					return 43;
				case 9:
					return 55;
				case 10:
					return 71;
				default:
					return -1;
			}
			break;			
                case "warmind":
			switch(classlevels) {
				case 1:
					return 2;
				case 2:
					return 5;
				case 3:
					return 9;
				case 4:
					return 14;
				case 5:
					return 20;
				case 6:
					return 28;
				case 7:
					return 37;
				case 8:
					return 47;
				case 9:
					return 58;
				case 10:
					return 70;
				default:
					return -1;
			}
			break;
		default:
			return -1;
	}
}

function getBonusPowerPoints(classlevel, abilityScore) {
	var abilitybonus = calculateAbilityBonus(abilityScore);
	return Math.floor(0.5 * classlevel * abilitybonus);
}

function makeList(sps) {
	var retStr = "";
	for(var i = 0; i < sps.length; i++) {
		retStr += sps[i] + ", ";
	}
	return retStr.substring(0, retStr.length - 2);
}

function getFreeSpells(classname, spelllevel, classlevel) {
	if(classlevel <= 0) {
		return "";
	}

	classname = $.trim(classname.toLowerCase());
	switch(classname) {
		case "adept":
			switch(spelllevel) {
				case 0:
					return makeList(spells[classname][spelllevel]);
				case 1:
					return makeList(spells[classname][spelllevel]);
				case 2:
					if(classlevel >= 4) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 3:
					if(classlevel >= 8) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 4:
					if(classlevel >= 12) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 5:
					if(classlevel >= 16) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
			}
			break;
		case "blackguard":
			switch(spelllevel) {
				case 1:
					return makeList(spells[classname][spelllevel]);
				case 2:
					if(classlevel >= 3) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 3:
					if(classlevel >= 5) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 4:
					if(classlevel >= 7) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				default:
					return "";
			}
			break;
		case "beguiler":
			switch(spelllevel) {
				case 0:
					return makeList(spells[classname][spelllevel]);
				case 1:
					return makeList(spells[classname][spelllevel]);
				case 2:
					if(classlevel >= 4) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 3:
					if(classlevel >= 6) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 4:
					if(classlevel >= 8) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 5:
					if(classlevel >= 10) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 6:
					if(classlevel >= 12) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 7:
					if(classlevel >= 14) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 8:
					if(classlevel >= 16) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 9:
					if(classlevel >= 18) {
						return makeList(spells[classname][spelllevel]);
					}
					break;					
				default:
					return "";
			}
			break;
		case "cleric":
		case "cleric (champion)":
			switch(spelllevel) {
				case 0:
					return makeList(spells["cleric"][spelllevel]);
				case 1:
					return makeList(spells["cleric"][spelllevel]);
				case 2:
					if(classlevel >= 3) {
						return makeList(spells["cleric"][spelllevel]);
					}
					break;
				case 3:
					if(classlevel >= 5) {
						return makeList(spells["cleric"][spelllevel]);
					}
					break;
				case 4:
					if(classlevel >= 7) {
						return makeList(spells["cleric"][spelllevel]);
					}
					break;
				case 5:
					if(classlevel >= 9) {
						return makeList(spells["cleric"][spelllevel]);
					}
					break;
				case 6:
					if(classlevel >= 11) {
						return makeList(spells["cleric"][spelllevel]);
					}
					break;
				case 7:
					if(classlevel >= 13) {
						return makeList(spells["cleric"][spelllevel]);
					}
					break;
				case 8:
					if(classlevel >= 15) {
						return makeList(spells["cleric"][spelllevel]);
					}
					break;
				case 9:
					if(classlevel >= 17) {
						return makeList(spells["cleric"][spelllevel]);
					}
					break;					
				default:
					return "";
			}
			break;
		case "cleric (cloistered)":
			switch(spelllevel) {
				case 0:
					return makeList(spells[classname][spelllevel]);
				case 1:
					return makeList(spells[classname][spelllevel]);
				case 2:
					if(classlevel >= 3) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 3:
					if(classlevel >= 5) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 4:
					if(classlevel >= 7) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 5:
					if(classlevel >= 9) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 6:
					if(classlevel >= 11) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 7:
					if(classlevel >= 13) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 8:
					if(classlevel >= 15) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 9:
					if(classlevel >= 17) {
						return makeList(spells[classname][spelllevel]);
					}
					break;					
				default:
					return "";
			}
			break;
		case "druid":
		case "druid (shifter)":
		case "druid (avenger)":
		case "druid (hunter)":
			switch(spelllevel) {
				case 0:
					return makeList(spells[classname][spelllevel]);
				case 1:
					return makeList(spells[classname][spelllevel]);
				case 2:
					if(classlevel >= 3) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 3:
					if(classlevel >= 5) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 4:
					if(classlevel >= 7) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 5:
					if(classlevel >= 9) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 6:
					if(classlevel >= 11) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 7:
					if(classlevel >= 13) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 8:
					if(classlevel >= 15) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 9:
					if(classlevel >= 17) {
						return makeList(spells[classname][spelllevel]);
					}
					break;					
				default:
					return "";
			}
			break;
		case "paladin":
		case "paladin (tyranny)":
		case "paladin (freedom)":
		case "paladin (slaughter)":
		case "paladin (hunter)":
			switch(spelllevel) {
				case 1:
					if(classlevel >= 4) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 2:
					if(classlevel >= 8) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 3:
					if(classlevel >= 11) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 4:
					if(classlevel >= 14) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				default:
					return "";
			}
			break;
		case "ranger":
		case "ranger (shifter)":
		case "ranger (planar)":
			switch(spelllevel) {
				case 1:
					if(classlevel >= 4) {
						return makeList(spells["ranger"][spelllevel]);
					}
					break;
				case 2:
					if(classlevel >= 8) {
						return makeList(spells["ranger"][spelllevel]);
					}
					break;
				case 3:
					if(classlevel >= 11) {
						return makeList(spells["ranger"][spelllevel]);
					}
					break;
				case 4:
					if(classlevel >= 14) {
						return makeList(spells["ranger"][spelllevel]);
					}
					break;
				default:
					return "";
			}
			break;
		case "ranger (urban)":
			switch(spelllevel) {
				case 1:
					if(classlevel >= 4) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 2:
					if(classlevel >= 8) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 3:
					if(classlevel >= 11) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				case 4:
					if(classlevel >= 14) {
						return makeList(spells[classname][spelllevel]);
					}
					break;
				default:
					return "";
			}
			break;
		case "wizard":
		case "wizard (animal companion)":
		case "wizard (domain)":
			if(spelllevel != 0) {
				return "";
			}
			return "Acid Splash, Arcane Mark, Dace, Dancing Lights, Detect Magic, Detect Poison, Disrupt Undead, Flare, Ghost Sound, Light, Mage Hand, Mending, Message, Open/Close, Prestidigitation, Ray of Frost, Read Magic, Resistance, Touch of Fatigue, ";
			break;
		case "wizard (abjurer)":
		case "wizard (conjurer)":
		case "wizard (diviner)":
		case "wizard (enchanter)":
		case "wizard (evoker)":
		case "wizard (illusionist)":
		case "wizard (necromancer)":
		case "wizard (transmuter)":
			if(spelllevel != 0) {
				return "";
			}
			var temp = "Acid Splash, Arcane Mark, Dace, Dancing Lights, Detect Magic, Detect Poison, Disrupt Undead, Flare, Ghost Sound, Light, Mage Hand, Mending, Message, Open/Close, Prestidigitation, Ray of Frost, Read Magic, Resistance, Touch of Fatigue, ";
			var forbiddenSchool1 = $(".opposedSchoolChoice:first").val();
			var forbiddenSchool2 = $(".opposedSchoolChoice:last").val();
			temp = eliminateForbidden(temp, forbiddenSchool1);
			temp = eliminateForbidden(temp, forbiddenSchool2);
			return temp;
			break;
		default:
			return "";
	}
	return "";
}

function eliminateForbidden(level0, school) {
	switch(school) {
		case "Abjuration":
			level0 = level0.replace("Resistance, ", "");
			break;
		case "Conjuration":
			level0 = level0.replace("Acid Splash, ", "");
			break;
		case "Divination":
			level0 = level0.replace("Detect Magic, ", "");
			level0 = level0.replace("Detect Poison, ", "");
			level0 = level0.replace("Read Magic, ", "");
			break;
		case "Enchantment":
			level0 = level0.replace("Daze, ", "");
			break;
		case "Evocation":
			level0 = level0.replace("Dancing Lights, ", "");
			level0 = level0.replace("Flare, ", "");
			level0 = level0.replace("Light, ", "");
			level0 = level0.replace("Ray of Frost, ", "");
			break;
		case "Illusion":
			level0 = level0.replace("Ghost Sound, ", "");
			break;
		case "Necromancy":
			level0 = level0.replace("Disrupt Undead, ", "");
			level0 = level0.replace("Touch of Fatigue, ", "");
			break;
		case "Transmutation":
			level0 = level0.replace("Mage Hand, ", "");
			level0 = level0.replace("Mending, ", "");
			level0 = level0.replace("Message, ", "");
			level0 = level0.replace("Open/Close, ", "");
			break;
	}
	return level0;
}

var spells = {
	"assassin" : {
		1 : [
			"Detect Poison",
			"Disguise Self",
			"Feather Fall",
			"Ghost Sound",
			"Jump",
			"Obscuring Mist",
			"Sleep",
			"True Strike",
		],
		2 : [
			"Alter Self",
			"Cat's Grace",
			"Darkness",
			"Fox' Cunning",
			"Illusory Script",
			"Invisibility",
			"Pass Without Trace",
			"Spider Climb",
			"Undetectable Alignment",
		],
		3 : [
			"Deep Slumber",
			"Deeper Darkness",
			"False Life",
			"Magic Circle Against Good",
			"Misdirection",
			"Nondetection",
		],
		4 : [
			"Clairaudience/Clairvoyance",
			"Dimension Door",
			"Freedom of Movement",
			"Glibness",
			"Greater Invisibility",
			"Locate Creature",
			"Modify Memory",
			"Poison",
		],
	},
	"bard" : {
		0 : [
			"Dancing Lights",
			"Daze",
			"Detect Magic",
			"Flare",
			"Ghost Sound",
			"Know Direction",
			"Light",
			"Lullaby",
			"Mage Hand",
			"Mending",
			"Message",
			"Open/Close",
			"Prestidigitation",
			"Read Magic",
			"Resistance",
			"Summon Instrument",
		],
		1 : [
			"Alarm",
			"Animate Rope",
			"Cause Fear",
			"Charm Person",
			"Comprehend Languages",
			"Cure Light Wounds",
			"Detect Secret Doors",
			"Disguise Self",
			"Erase",
			"Expeditious Retreat",
			"Feather Fall",
			"Grease",
			"Hideous Laughter",
			"Hypnotism",
			"Identify",
			"Lesser Confusion",
			"Magic Mouth",
			"Magic Aura",
			"Obscure Object",
			"Remove Fear",
			"Silent Image",
			"Sleep",
			"Summon Monster I",
			"Undetectable Alignment",
			"Unseen Servant",
			"Ventriloquism",

		],
		2 : [
			"Alter Self",
			"Animal Messenger",
			"Animal Trance",
			"Blindness/Deafness",
			"Blur",
			"Calm Emotions",
			"Cat's Grace",
			"Cure Moderate Wounds",
			"Darkness",
			"Daze Monster",
			"Delay Poison",
			"Detect Thoughts",
			"Eagle's Splendor",
			"Enthrall",
			"Fox's Cunning",
			"Glitterdust",
			"Glossolalia",
			"Heroism",
			"Hold Person",
			"Hypnotic Pattern",
			"Invisibility",
			"Locate Object",
			"Minor Image",
			"Mirror Image",
			"Misdirection",
			"Pyrotechnics",
			"Rage",
			"Scare",
			"Shatter",
			"Silence",
			"Sound Burst",
			"Suggestion",
			"Summon Monster II",
			"Summon Swarm",
			"Tongues",
			"Whispering Wind",
		],
		3 : [
			"Blink",
			"Charm Monster",
			"Clairaudience/Clairvoyance",
			"Confusion",
			"Crushing Despair",
			"Cure Serious Wounds",
			"Daylight",
			"Deep Slumber",
			"Dispel Magic",
			"Displacement",
			"Fear",
			"Gaseous Form",
			"Glibness",
			"Good Hope",
			"Haste",
			"Illusory Script",
			"Invisibility Sphere",
			"Lesser Geas",
			"Major Image",
			"Phantom Steed",
			"Remove Curse",
			"Scrying",
			"Sculpt Sound",
			"Secret Page",
			"See Invisibility",
			"Sepia Snake Sigil",
			"Slow",
			"Speak with Animals",
			"Summon Monster III",
			"Tiny Hut",
		],
		4 : [
			"Break Enchantment",
			"Cure Critical Wounds",
			"Detect Scrying",
			"Dimension Door",
			"Dominate Person",
			"Freedom of Movement",
			"Greater Invisibility",
			"Hallucinatory Terrain",
			"Hold Monster",
			"Legend Lore",
			"Locate Creature",
			"Modify Memory",
			"Neutralize Poison",
			"Rainbow Pattern",
			"Repel Vermin",
			"Secure Shelter",
			"Shadow Conjuration",
			"Shout",
			"Speak with Plants",
			"Summon Monster IV",
			"Zone of Silence",
		],
		5 : [
			"Dream",
			"False Vision",
			"Greater Dispel Magic",
			"Greater Heroism",
			"Mass Cure Light Wounds",
			"Mass Suggestion",
			"Mind Fog",
			"Mirage Arcana",
			"Mislead",
			"Nightmare",
			"Persistent Image",
			"Seeming",
			"Shadow Evocation",
			"Shadow Walk",
			"Song of Discord",
			"Summon Monster",
		],
		6 : [
			"Analyze Dweomer",
			"Animate Objects",
			"Eyebite",
			"Find the Path",
			"Geas/Quest",
			"Greater Scrying",
			"Greater Shout",
			"Heroes' Feast",
			"Irresistible Dance",
			"Mass Cat's Grace",
			"Mass Charm Monster",
			"Mass Cure Moderate Wounds",
			"Mass Eagle's Splendor",
			"Mass Fox's Cunning",
			"Permanent Image",
			"Programmed Image",
			"Project Image",
			"Summon Monster VI",
			"Sympathetic Vibration",
			"Veil",
		],
	},
	"bardicsage" : {
		0 : [
			"Detect Magic",
			"Know Direction",
			"Read Magic",
		],
		1 : [
			"Comprehend Languages",
			"Detect Chaos",
			"Detect Evil",
			"Detect Good",
			"Detect Law",
			"Detect Secret Doors",
			"Identify",
		],
		2 : [
			"Detect Thoughts",
			"Locate Object",
			"Tongues",
			"Zone of Truth",
		],
		3 : [
			"Arcane Sight",
			"Clairaudience/Clairvoyance",
			"Scrying",
			"See Invisibility",
			"Speak with Animals",
		],
		4 : [
			"Analyze Dweomer",
			"Detect Scrying",
			"Legend Lore",
			"Locate Creature",
			"Sending",
		],
		5 : [
			"Contact Other Plane",
			"Greater Scrying",
		],
		6 : [
			"Find the Path",
			"True Seeing",
			"Vision",
		],
	},
	"beguiler" : {
		0: [ 
			"Dancing Lights",
			"Daze",
			"Detect Magic",
			"Ghost Sound",
			"Message",
			"Open/Close",
			"Read Magic",
		],
		1: [ 
			"Charm Person",
			"Color Spray",
			"Comprehend Languages",
			"Detect Secret Doors",
			"Disguise Self",
			"Expeditious Retreat",
			"Hypnotism",
			"Mage Armor",
			"Obscuring Mist",
			"Silent Image",
			"Sleep",
			"Undetectable Alignment",
//			"Rouse",
//			"Whelm",
		],
		2: [ 
			"Blur",
			"Daze Monster",
			"Detect Thoughts",
			"Fog Cloud",
			"Glitterdust",
			"Hypnotic Pattern",
			"Invisibility",
			"Knock",
			"Minor Image",
			"Mirror Image",
			"Misdirection",
			"See Invisibility",
			"Silence",
			"Spider Climb",
			"Touch of Idiocy",
//			"Blinding Color Surge",
//			"Stay the Hand",
//			"Vertigo",
//			"Whelming Burst",
		],
		3: [ 
			"Arcane Sight",
			"Clairaudience/Clairvoyance",
			"Deep Slumber",
			"Dispel Magic",
			"Displacement",
			"Glibness",
			"Haste",
			"Hold Person",
			"Invisibility Sphere",
			"Major Image",
			"Nondetection",
			"Slow",
			"Suggestion",
			"Zone of Silence",
//			"Crown of Veils",
//			"Halt",
//			"Hesitate",
//			"Inevistable Defeat",
//			"Legion of Sentinels",
//			"Vertigo Field",
		],
		4: [ 
			"Charm Monster",
			"Confusion",
			"Crushing Despair",
			"Freedom of Movement",
			"Greater Invisibility",
			"Locate Creature",
			"Rainbow Pattern",
			"Solid Fog",
//			"Greater Mirror Image",
//			"Mass Whelm",
//			"Phantom Battle",
		],
		5: [ 
			"Break Enchantment",
			"Dominate Person",
			"Feeblemind",
			"Hold Monster",
			"Mind Fog",
			"Rary's Telepathic Bond",
			"Seeming",
			"Sending",
//			"Friend to Foe",
//			"Incite Riot",
//			"Swift Etherealness",
		],
		6: [ 
			"Greater Dispel Magic",
			"Mass Suggestion",
			"Mislead",
			"Repulsion",
			"Shadow Walk",
			"True Seeing",
			"Veil",
//			"Overwhelm",
		],
		7: [ 
			"Ethereal Jaunt",
			"Greater Arcane Sight",
			"Mass Hold Person",
			"Mass Invisibility",
			"Phase Door",
			"Power Word Blind",
			"Project Image",
			"Spell Turning",
		],
		8: [ 
			"Demand",
			"Discern Location",
			"Mind Blank",
			"Moment of Prescience",
			"Power Word Stun",
			"Scintilating Pattern",
			"Screen",
		],
		9: [ 
			"Dominate Monster",
			"Etherealness",
			"Foresight",
			"Mass Hold Monster",
			"Power Word Kill",
			"Time Stop",
		],
	},
	"beguiler advanced learning" : {
		// 0-1, 0-3, 0-5, 0-7, 0-9
		3 : [
			"Flare",
			"Ghost Sound",
			"Light",
			"Magic Aura",
			"Ray of Frost",
			"Ventriloquism",
		],
		7 : [
			"Heroism",
			"Hideous Laughter",
			"Hold Person",
			"Illusory Script",
			"Magic Mouth",
			"Phantom Trap",
			"Rage",
			"Suggestion",
		],
		11 : [
			"Dream",
			"False Vision",
			"Hallucinatory Terrain",
			"Illusory Wall",
			"Lesser Geas",
			"Mirage Arcana",
			"Nightmare",
			"Persistent Image",
			"Phantasmal Killer",
			"Seeming",
			"Shadow Conjuration",
			"Shadow Evocation",
			"Symbol of Sleep",
		],
		15 : [
			"Geas/Quest",
			"Greater Heroism",
			"Greater Shadow Conjuration",
			"Insanity",
			"Mass Suggestion",
			"Mislead",
			"Permanent Image",
			"Programmed Image",
			"Shadow Walk",
			"Simulacrum",
			"Symbol of Persuasion",
			"Symbol of Stunning",
			"Veil",
		],
		19 : [
			"Antipathy",
			"Binding",
			"Greater Shadow Evocation",
			"Irresistable Dance",
			"Mass Charm Monster",
			"Shades",
			"Symbol of Insanity",
			"Sympathy",
			"Weird",
		],
	},
	"duskblade" : {
                0 : [
			"Acid Splash",
			"Disrupt Undead",
			"Ray of Frost",
			"Touch of Fatigue",
                ],
                1 : [
			//"Bigby's Tripping Hand", //NAME!
			//"Blade of Blood",
			"Burning Hands",
			"Cause Fear",
			"Chill Touch",
			"Color Spray",
			"Jump",
			//"Kelgore's Fire Bolt", //NAME!
			//"Lesser Deflect",
			"Magic Weapon",
			"Obscuring Mist",
			"Ray of Enfeeblement",
			"Resist Energy",
			//"Rouse",
			"Shocking Grasp",
			//"Stand",
			//"Swift Expeditious Retreat", //SWIFT!
			"True Strike",
                ],
                2 : [
			"Acid Arrow",
			//"Animalistic Power",
			"Bear's Endurance",
			//"Bigby's Striking Fist", //NAME!
			"Bull's Strength",
			"Cat's Grace",
			"Darkvision",
			//"Deflect",
			//"Dimension Hop",
			"Ghoul touch",
			"Scorching Ray",
			"See Invisibility",
			//"Seeking Ray",
			"Spider Climb",
			//"Stretch Weapon",
			//"Sure Strike",
			//"Swift Fly", //SWIFT!
			//"Swift Invisibility", //SWIFT!
			"Touch of Idiocy",
                ],
                3 : [
			//"Crown of Might",
			//"Crown of Protection",
			//"Dispelling Touch",
			//"Doom Scarabs",
			//"Energy Aegis",
			//"Energy Surge",
			"Greater Magic Weapon",
			//"Halt",
			"Keen Edge",
			"Protection from Energy",
			"Ray of Exhaustion",
			//"Regroup",
			"Vampiric Touch",
                ],
                4 : [
			//"Channeled Pyroburst",
			"Dimension Door",
			"Dispel Magic",
			"Enervate",
			"Fire Shield",
			"Interposing Hand",
			"Phantasmal Killer",
			"Shout",
			//"Toxic Weapon",
                ],
                5 : [
			"Chain Lightning",
			"Clenched Fist",
			"Disintegrate",
			"Hold Monster",
			"Polar Ray",
			//"Slashing Dispel",
			//"Sonic Shield",
			"Waves of Fatigue",
                ],
	},
	"psion" : {
		1 : [
			"Astral Traveler",
			"Attraction",
			"Bolt",
			"Call to Mind",
			"Catfall",
			"Conceal Thoughts",
			"Control Flames",
			"Control Light",
			"Create Sound",
			"Crystal Shard",
			"Deceleration",
			"Defensive Precognition",
			"Deja Vu",
			"Demoralize",
			"Detect Psionics",
			"Disable",
			"Dissipating Touch",
			"Distract",
			"Ecto Protection",
			"Empathy",
			"Empty Mind",
			"Energy Ray",
			"Entangling Ectoplasm",
			"Far Hand",
			"Float",
			"Force Screen",
			"Hammer",
			"Inertial Armor",
			"Know Direction and Location",
			"Matter Agitation",
			"Mind Thrust",
			"Missive",
			"My Light",
			"Offensive Precognition",
			"Offensive Prescience",
			"Psionic Daze",
			"Psionic Grease",
			"Sense Link",
			"Skate",
			"Synesthete",
			"Telempathic Projection",
			"Vigor",
		],
		2 : [
			"Bestow Power",
			"Biofeedback",
			"Body Equilibrium",
			"Cloud Mind",
			"Concealing Amorpha",
			"Concussion Blast",
			"Control Sound",
			"Detect Hostile Intent",
			"Ego Whip",
			"Elfsight",
			"Energy Adaptation (Acid)",
			"Energy Adaptation (Cold)",
			"Energy Adaptation (Electric)",
			"Energy Adaptation (Fire)",
			"Energy Adaptation (Sonic)",
			"Energy Push",
			"Energy Stun",
			"Feat Leech",
			"Forced Sense Link",
			"Id Insinuation",
			"Inflict Pain",
			"Mass Missive",
			"Mental Disruption",
			"Psionic Identify",
			"Psionic Knock",
			"Psionic Levitate",
			"Psionic Lock",
			"Psionic Tongues",
			"Recall Agony",
			"Share Pain",
			"Sustenance",
			"Swarm of Crystals",
			"Thought Shield",
		],
		3 : [
			"Body Adjustment",
			"Body Purification",
			"Danger Sense",
			"Dismiss Ectoplasm",
			"Dispel Psionics",
			"Energy Bolt",
			"Energy Burst",
			"Energy Retort",
			"Energy Wall",
			"Eradicate Invisibility",
			"Forced Share Pain",
			"Mental Barrier",
			"Mind Trap",
			"Psionic Blast",
			"Psionic Darkvision",
			"Psionic Keen Edge",
			"Solicit Psicrystal",
			"Telekinetic Force",
			"Telekinetic Thrust",
			"Time Hop",
			"Touchsight",
			"Ubiquitous Vision",
		],
		4 : [
			"Aura Sight",
			"Correspond",
			"Death Urge",
			"Detect Remote Viewing",
			"Empathic Feedback",
			"Energy Adaptation",
			"Intellect Fortress",
			"Mindwipe",
			"Personality Parasite",
			"Power Leech",
			"Psionic Dimension Door",
			"Psionic Divination",
			"Psionic Freedom of Movement",
			"Psychic Reformation",
			"Telekinetic Maneuver",
			"Trace Teleport",
			"Wall of Ectoplasm",
		],
		5 : [
			"Adapt Body",
			"Catapsi",
			"Ectoplasmic Shambler",
			"Incarnate",
			"Leech Field",
			"Power Resistance",
			"Psionic Major Creation",
			"Psionic Plane Shift",
			"Psionic True Seeing",
			"Psychic Crush",
			"Shatter Mind Blank",
			"Tower of Iron Will",
		],
		6 : [
			"Aura Alteration",
			"Breath of the Black Dragon",
			"Co-opt Concentration",
			"Fuse Flesh",
			"Mass Cloud Mind",
			"Psionic Contingency",
			"Psionic Disintegrate",
			"Psionic Overland Flight",
			"Remote View Trap",
			"Retrieve",
			"Suspend Life",
			"Temporal Acceleration",
		],
		7 : [
			"Decerebrate",
			"Divert Teleport",
			"Energy Conversion",
			"Energy Wave",
			"Evade Burst",
			"Insanity",
			"Oak Body",
			"Personal Mind Blank",
			"Psionic Moment of Prescience",
			"Psionic Phase Door",
			"Psionic Sequester",
			"Ultrablast",
		],
		8 : [
			"Bend Reality",
			"Matter Manipulation",
			"Psionic Greater Teleport",
			"Psionic Iron Body",
			"Psionic Mind Blank",
			"Recall Death",
			"Shadow Body",
			"True Metabolism",
		],
		9 : [
			"Affinity Field",
			"Apopsi",
			"Assimilate",
			"Microcosm",
			"Psionic Etherealness",
			"Reality Revision",
			"Timeless Body",
		],
	},
	"psychic warrior" : {
		1 : [
			"Astral Traveler",
			"Biofeedback",
			"Bite of the Wolf",
			"Burst",
			"Call Weaponry",
			"Catfall",
			"Chameleon",
			"Claws of the Beast",
			"Compression",
			"Conceal Thoughts",
			"Defensive Precognition",
			"Detect Psionics",
			"Dissipating Touch",
			"Distract",
			"Elfsight",
			"Empty Mind",
			"Expansion",
			"Float",
			"Force Screen",
			"Grip of Iron",
			"Hammer",
			"Inertial Armor",
			"Metaphysical Claw",
			"Metaphysical Weapon",
			"My Light",
			"Offensive Precognition",
			"Offensive Prescience",
			"Prevenom",
			"Prevenom Weapon",
			"Skate",
			"Stomp",
			"Synesthete",
			"Thicken Skin",
			"Vigor",
		],
		2 : [
			"Animal Affinity",
			"Body Adjustment",
			"Body Equilibrium",
			"Body Purification",
			"Concealing Amorpha",
			"Detect Hostile Intent",
			"Dimension Swap",
			"Dissolving Touch",
			"Dissolving Weapon",
			"Empathic Transfer",
			"Energy Adaptation (Acid)",
			"Energy Adaptation (Cold)",
			"Energy Adaptation (Electric)",
			"Energy Adaptation (Fire)",
			"Energy Adaptation (Sonic)",
			"Feat Leech",
			"Hustle",
			"Painful Strike",
			"Prowess",
			"Psionic Darkvision",
			"Psionic Levitate",
			"Psionic Lion's Charge",
			"Psionic Scent",
			"Strength of My Enemy",
			"Sustenance",
			"Thought Shield",
			"Wall Walker",
		],
		3 : [
			"Claws of the Vampire",
			"Danger Sense",
			"Dimension Slide",
			"Duodimensional Claw",
			"Ectoplasmic Form",
			"Empathic Feedback",
			"Escape Detection",
			"Evade Burst",
			"Exhalation of the Black Dragon",
			"Graft Weapon",
			"Greater Concealing Amorpha",
			"Hostile Empathic Transfer",
			"Mental Barrier",
			"Psionic Keen Edge",
			"Ubiquitous Vision",
			"Vampiric Blade",
		],
		4 : [
			"Claw of Energy",
			"Energy Adaptation",
			"Immovability",
			"Inertial Barrier",
			"Psionic Dimension Door",
			"Psionic Freedom of Movement",
			"Psychic Vampire",
			"Steadfast Perception",
			"Truevenom",
			"Truevenom Weapon",
			"Weapon of Energy",
		],
		5 : [
			"Adapt Body",
			"Catapsi",
			"Metaconcert",
			"Oak Body",
			"Psychofeedback",
		],
		6 : [
			"Breath of the Black Dragon",
			"Dispelling Buffer",
			"Form of Doom",
			"Personal Mind Blank",
			"Suspend Life",
		],
	},
	"sorcerer" : {
		0 : [
			"Acid Splash",
			"Arcane Mark",
			"Dancing Lights",
			"Daze",
			"Detect Magic",
			"Detect Poison",
			"Disrupt Undead",
			"Flare",
			"Ghost Sound",
			"Light",
			"Mage Hand",
			"Mending",
			"Message",
			"Open/Close",
			"Prestidigitation",
			"Ray of Frost",
			"Read Magic",
			"Resistance",
			"Touch of Fatigue",
		],
		1 : [
			"Alarm",
			"Animate Rope",
			"Burning Hands",
			"Cause Fear",
			"Charm Person",
			"Chill Touch",
			"Color Spray",
			"Comprehend Languages",
			"Detect Secret Doors",
			"Detect Undead",
			"Disguise Self",
			"Endure Elements",
			"Enlarge Person",
			"Erase",
			"Expeditious Retreat",
			"Feather Fall",
			"Floating Disk",
			"Grease",
			"Hold Portal",
			"Hypnotism",
			"Identify",
			"Jump",
			"Mage Armor",
			"Magic Aura",
			"Magic Missile",
			"Magic Weapon",
			"Mount",
			"Obscuring Mist",
			"Protection from Chaos",
			"Protection from Evil",
			"Protection from Good",
			"Protection from Law",
			"Ray of Enfeeblement",
			"Reduce Person",
			"Shield",
			"Shocking Grasp",
			"Silent Image",
			"Sleep",
			"Summon Monster I",
			"True Strike",
			"Unseen Servant",
			"Ventriloquism",
		],
		2 : [
			"Acid Arrow",
			"Alter Self",
			"Arcane Lock",
			"Bear's Endurance",
			"Blindness/Deafness",
			"Blur",
			"Bull's Strength",
			"Cat's Grace",
			"Command Undead",
			"Continual Flame",
			"Darkness",
			"Darkvision",
			"Daze Monster",
			"Detect Thoughts",
			"Eagle's Splendor",
			"False Life",
			"Flaming Sphere",
			"Fog Cloud",
			"Fox's Cunning",
			"Ghoul Touch",
			"Glitterdust",
			"Gust of Wind",
			"Hideous Laughter",
			"Hypnotic Pattern",
			"Invisibility",
			"Knock",
			"Levitate",
			"Locate Object",
			"Magic Mouth",
			"Minor Image",
			"Mirror Image",
			"Misdirection",
			"Obscure Object",
			"Owl's Wisdom",
			"Phantom Trap",
			"Protection from Arrows",
			"Pyrotechnics",
			"Resist Energy",
			"Rope Trick",
			"Scare",
			"Scorching Ray",
			"See Invisibility",
			"Shatter",
			"Spectral Hand",
			"Spider Climb",
			"Summon Monster II",
			"Summon Swarm",
			"Touch of Idiocy",
			"Web",
			"Whispering Wind",
		],
		3 : [
			"Arcane Sight",
			"Blacklight",
			"Blink",
			"Clairaudience/Clairvoyance",
			"Daylight",
			"Deep Slumber",
			"Dispel Magic",
			"Displacement",
			"Explosive Runes",
			"Fireball",
			"Flame Arrow",
			"Fly",
			"Gaseous Form",
			"Gentle Repose",
			"Greater Magic Weapon",
			"Halt Undead",
			"Haste",
			"Heroism",
			"Hold Person",
			"Illusory Script",
			"Invisibility Sphere",
			"Keen Edge",
			"Lesser Telepathic Bond",
			"Lightning Bolt",
			"Magic Circle against Chaos",
			"Magic Circle against Evil",
			"Magic Circle against Good",
			"Magic Circle against Law",
			"Major Image",
			"Nondetection",
			"Phantom Steed",
			"Protection from Energy",
			"Rage",
			"Ray of Exhaustion",
			"Secret Page",
			"Sepia Snake Sigil",
			"Shrink Item",
			"Sleet Storm",
			"Slow",
			"Stinking Cloud",
			"Suggestion",
			"Summon Monster III",
			"Tiny Hut",
			"Tongues",
			"Vampiric Touch",
			"Water Breathing",
			"Wind Wall",
		],
		4 : [
			"Animate Dead",
			"Arcane Eye",
			"Bestow Curse",
			"Black Tentacles",
			"Charm Monster",
			"Confusion",
			"Contagion",
			"Crushing Despair",
			"Detect Scrying",
			"Dimension Door",
			"Dimensional Anchor",
			"Dweomer of Transference",
			"Enervation",
			"Fear",
			"Fire Shield",
			"Fire Trap",
			"Greater Invisibility",
			"Hallucinatory Terrain",
			"Ice Storm",
			"Illusory Wall",
			"Lesser Geas",
			"Lesser Globe of Invulnerability",
			"Locate Creature",
			"Mass Enlarge Person",
			"Mass Reduce Person",
			"Minor Creation",
			"Mnemonic Enhancer",
			"Phantasmal Killer",
			"Polymorph",
			"Rainbow Pattern",
			"Remove Curse",
			"Resilient Sphere",
			"Scrying",
			"Secure Shelter",
			"Shadow Conjuration",
			"Shout",
			"Solid Fog",
			"Stone Shape",
			"Stoneskin",
			"Summon Monster IV",
			"Wall of Fire",
			"Wall of Ice",
		],
		5 : [
			"Animal Growth",
			"Baleful Polymorph",
			"Blight",
			"Break Enchantment",
			"Cloudkill",
			"Cone of Cold",
			"Contact Other Plane",
			"Dismissal",
			"Dominate Person",
			"Dream",
			"Fabricate",
			"False Vision",
			"Feeblemind",
			"Hold Monster",
			"Interposing Hand",
			"Lesser Planar Binding",
			"Mage's Faithful Hound",
			"Mage's Private Sanctum",
			"Magic Jar",
			"Major Creation",
			"Mind Fog",
			"Mirage Arcana",
			"Nightmare",
			"Overland Flight",
			"Passwall",
			"Permanency",
			"Persistent Image",
			"Prying Eyes",
			"Psychic Turmoil",
			"Secret Chest",
			"Seeming",
			"Sending",
			"Shadow Evocation",
			"Summon Monster V",
			"Symbol of Pain",
			"Symbol of Sleep",
			"Telekinesis",
			"Telepathic Bond",
			"Teleport",
			"Transmute Mud to Rock",
			"Transmute Rock to Mud",
			"Wall of Force",
			"Wall of Stone",
			"Waves of Fatigue",
		],
		6 : [
			"Acid Fog",
			"Analyze Dweomer",
			"Antimagic Field",
			"Chain Lightning",
			"Circle of Death",
			"Contingency",
			"Control Water",
			"Create Undead",
			"Disintegrate",
			"Eyebite",
			"Flesh to Stone",
			"Forceful Hand",
			"Freezing Sphere",
			"Geas/Quest",
			"Globe of Invulnerability",
			"Greater Dispel Magic",
			"Greater Heroism",
			"Guards and Wards",
			"Hardening",
			"Legend Lore",
			"Mage's Lucubration",
			"Mass Bear's Endurance",
			"Mass Bull's Strength",
			"Mass Cat's Grace",
			"Mass Eagle's Splendor",
			"Mass Fox's Cunning",
			"Mass Owl's Wisdom",
			"Mass Suggestion",
			"Mental Pinnacle",
			"Mislead",
			"Move Earth",
			"Permanent Image",
			"Planar Binding",
			"Probe Thoughts",
			"Programmed Image",
			"Repulsion",
			"Shadow Walk",
			"Stone to Flesh",
			"Summon Monster VI",
			"Symbol of Fear",
			"Symbol of Persuasion",
			"Transformation",
			"True Seeing",
			"Undeath to Death",
			"Veil",
			"Wall of Iron",
		],
		7 : [
			"Banishment",
			"Control Undead",
			"Control Weather",
			"Delayed Blast Fireball",
			"Ethereal Jaunt",
			"Finger of Death",
			"Forcecage",
			"Grasping Hand",
			"Greater Arcane Sight",
			"Greater Psychic Turmoil",
			"Greater Scrying",
			"Greater Shadow Conjuration",
			"Greater Teleport",
			"Insanity",
			"Instant Summons",
			"Limited Wish",
			"Mage's Magnificent Mansion",
			"Mage's Sword",
			"Mass Hold Person",
			"Mass Invisibility",
			"Phase Door",
			"Plane Shift",
			"Power Word Blind",
			"Prismatic Spray",
			"Project Image",
			"Reverse Gravity",
			"Sequester",
			"Simulacrum",
			"Spell Turning",
			"Statue",
			"Summon Monster VII",
			"Symbol of Stunning",
			"Symbol of Weakness",
			"Teleport Object",
			"Vision",
			"Waves of Exhaustion",
		],
		8 : [
			"Antipathy",
			"Binding",
			"Clenched Fist",
			"Clone",
			"Create Greater Undead",
			"Demand",
			"Dimensional Lock",
			"Discern Location",
			"Greater Planar Binding",
			"Greater Prying Eyes",
			"Greater Shadow Evocation",
			"Greater Shout",
			"Horrid Wilting",
			"Incendiary Cloud",
			"Iron Body",
			"Irresistible Dance",
			"Maddening Scream",
			"Mass Charm Monster",
			"Maze",
			"Mind Blank",
			"Moment of Prescience",
			"Polar Ray",
			"Polymorph Any Object",
			"Power Word Stun",
			"Prismatic Wall",
			"Protection from Spells",
			"Scintillating Pattern",
			"Screen",
			"Summon Monster VIII",
			"Sunburst",
			"Symbol of Death",
			"Symbol of Insanity",
			"Sympathy",
			"Telekinetic Sphere",
			"Temporal Stasis",
			"Trap the Soul",
		],
		9 : [
			"Astral Projection",
			"Crushing Hand",
			"Dominate Monster",
			"Energy Drain",
			"Etherealness",
			"Foresight",
			"Freedom",
			"Gate",
			"Imprisonment",
			"Mage's Disjunction",
			"Mass Hold Monster",
			"Meteor Swarm",
			"Power Word Kill",
			"Prismatic Sphere",
			"Refuge",
			"Shades",
			"Shapechange",
			"Soul Bind",
			"Summon Monster IX",
			"Teleportation Circle",
			"Time Stop",
			"Wail of the Banshee",
			"Weird",
			"Wish",
		],
	},
	"adept" : {
		0 : [
			"Create Water",
			"Cure Minor Wounds",
			"Detect Magic",
			"Ghost Sound",
			"Guidance",
			"Light",
			"Mending",
			"Purify Food and Drink",
			"Read Magic",
			"Touch of Fatigue",
		],
		1 : [
			"Bless",
			"Burning Hands",
			"Cause Fear",
			"Command",
			"Comprehend Languages",
			"Cure Light Wounds",
			"Detect Chaos",
			"Detect Evil",
			"Detect Good",
			"Detect Law",
			"Endure Elements",
			"Obscuring Mist",
			"Protection from Chaos",
			"Protection from Evil",
			"Protection from Good",
			"Protection from Law",
			"Sleep",
		],
		2 : [
			"Aid",
			"Animal Trance",
			"Bear's Endurance",
			"Bull's Strength",
			"Cat's Grace",
			"Cure Moderate Wounds",
			"Darkness",
			"Delay Poison",
			"Invisibility",
			"Mirror Image",
			"Resist Energy",
			"Scorching Ray",
			"See Invisibility",
			"Web",
		],
		3 : [
			"Animate Dead",
			"Bestow Curse",
			"Contagion",
			"Continual Flame",
			"Cure Serious Wounds",
			"Daylight",
			"Deeper Darkness",
			"Lightning Bolt",
			"Neutralize Poison",
			"Remove Curse",
			"Remove Disease",
			"Tongues",
		],
		4 : [
			"Cure Critical Wounds",
			"Minor Creation",
			"Polymorph",
			"Restoration",
			"Stoneskin",
			"Wall of Fire",
		],
		5 : [
			"Baleful Polymorph",
			"Break Enchantment",
			"Commune",
			"Heal",
			"Major Creation",
			"Raise Dead",
			"True Seeing",
			"Wall of Stone",
		],
	},
	"blackguard" : {
		1 : [
			"Cause Fear",
			"Corrupt Weapon",
			"Cure Light Wounds",
			"Doom",
			"Inflict Light Wounds",
			"Magic Weapon",
			"Summon Monster I",
		],
		2 : [
			"Bull's Strength",
			"Cure Moderate Wounds",
			"Darkness",
			"Death Knell",
			"Eagle's Splendor",
			"Inflict Moderate Wounds",
			"Shatter",
			"Summon Monster II",
		],
		3 : [
			"Contagion",
			"Cure Serious Wounds",
			"Deeper Darkness",
			"Inflict Serious Wounds",
			"Protection from Energy",
			"Summon Monster III",
		],
		4 : [
			"Cure Critical Wounds",
			"Freedom of Movement",
			"Inflict Critical Wounds",
			"Poison",
			"Summon Monster IV",
		]
	},
	"cleric" : {
		0 : [
			"Create Water",
			"Cure Minor Wounds",
			"Detect Magic",
			"Detect Poison",
			"Guidance",
			"Inflict Minor Wounds",
			"Light",
			"Mending",
			"Purify Food and Drink",
			"Read Magic",
			"Resistance",
			"Virtue",
		],
		1 : [
			"Bane",
			"Bless",
			"Bless Water",
			"Cause Fear",
			"Command",
			"Comprehend Languages",
			"Cure Light Wounds",
			"Curse Water",
			"Deathwatch",
			"Detect Chaos",
			"Detect Evil",
			"Detect Good",
			"Detect Law",
			"Detect Undead",
			"Divine Favor",
			"Doom",
			"Endure Elements",
			"Entropic Shield",
			"Hide from Undead",
			"Inflict Light Wounds",
			"Magic Stone",
			"Magic Weapon",
			"Obscuring Mist",
			"Protection from Chaos",
			"Protection from Evil",
			"Protection from Good",
			"Protection from Law",
			"Remove Fear",
			"Sanctuary",
			"Shield of Faith",
			"Summon Monster I",
		],
		2 : [
			"Aid",
			"Align Weapon",
			"Augury",
			"Bear's Endurance",
			"Bull's Strength",
			"Calm Emotions",
			"Consecrate",
			"Cure Moderate Wounds",
			"Darkness",
			"Death Knell",
			"Delay Poison",
			"Desecrate",
			"Eagle's Splendor",
			"Enthrall",
			"Find Traps",
			"Gentle Repose",
			"Hold Person",
			"Inflict Moderate Wounds",
			"Lesser Restoration",
			"Make Whole",
			"Owl's Wisdom",
			"Remove Paralysis",
			"Resist Energy",
			"Shatter",
			"Shield Other",
			"Silence",
			"Sound Burst",
			"Spiritual Weapon",
			"Status",
			"Summon Monster II",
			"Undetectable Alignment",
			"Zone of Truth",
		],
		3 : [
			"Animate Dead",
			"Bestow Curse",
			"Blindness/Deafness",
			"Contagion",
			"Continual Flame",
			"Create Food and Water",
			"Cure Serious Wounds",
			"Daylight",
			"Deeper Darkness",
			"Dispel Magic",
			"Glyph of Warding",
			"Helping Hand",
			"Inflict Serious Wounds",
			"Invisibility Purge",
			"Lesser Telepathic Bond",
			"Locate Object",
			"Magic Circle against Chaos",
			"Magic Circle against Evil",
			"Magic Circle against Good",
			"Magic Circle against Law",
			"Magic Vestment",
			"Meld into Stone",
			"Obscure Object",
			"Prayer",
			"Protection from Energy",
			"Remove Blindness/Deafness",
			"Remove Curse",
			"Remove Disease",
			"Searing Light",
			"Speak with Dead",
			"Stone Shape",
			"Summon Monster III",
			"Water Breathing",
			"Water Walk",
			"Wind Wall",
		],
		4 : [
			"Air Walk",
			"Control Water",
			"Cure Critical Wounds",
			"Death Ward",
			"Dimensional Anchor",
			"Discern Lies",
			"Dismissal",
			"Divination",
			"Divine Power",
			"Dweomer of Transference",
			"Freedom of Movement",
			"Giant Vermin",
			"Greater Magic Weapon",
			"Imbue with Spell Ability",
			"Inflict Critical Wounds",
			"Lesser Planar Ally",
			"Neutralize Poison",
			"Poison",
			"Repel Vermin",
			"Restoration",
			"Sending",
			"Spell Immunity",
			"Summon Monster IV",
			"Tongues",
		],
		5 : [
			"Atonement",
			"Break Enchantment",
			"Commune",
			"Dispel Chaos",
			"Dispel Evil",
			"Dispel Good",
			"Dispel Law",
			"Disrupting Weapon",
			"Flame Strike",
			"Greater Command",
			"Hallow",
			"Insect Plague",
			"Mark of Justice",
			"Mass Cure Light Wounds",
			"Mass Inflict Light Wounds",
			"Plane Shift",
			"Psychic Turmoil",
			"Raise Dead",
			"Righteous Might",
			"Scrying",
			"Slay Living",
			"Spell Resistance",
			"Summon Monster",
			"Symbol of Pain",
			"Symbol of Sleep",
			"True Seeing",
			"Unhallow",
			"Wall of Stone",
		],
		6 : [
			"Animate Objects",
			"Antilife Shell",
			"Banishment",
			"Blade Barrier",
			"Create Undead",
			"Find the Path",
			"Forbiddance",
			"Geas/Quest",
			"Greater Dispel Magic",
			"Greater Glyph of Warding",
			"Harm",
			"Heal",
			"Heroes' Feast",
			"Mass Bear's Endurance",
			"Mass Bull's Strength",
			"Mass Cure Moderate Wounds",
			"Mass Eagle's Splendor",
			"Mass Inflict Moderate Wounds",
			"Mass Owl's Wisdom",
			"Planar Ally",
			"Summon Monster VI",
			"Symbol of Fear",
			"Symbol of Persuasion",
			"Undeath to Death",
			"Wind Walk",
			"Word of Recall",
		],
		7 : [
			"Blasphemy",
			"Control Weather",
			"Destruction",
			"Dictum",
			"Ethereal Jaunt",
			"Greater Psychic Turmoil",
			"Greater Restoration",
			"Greater Scrying",
			"Holy Word",
			"Mass Cure Serious Wounds",
			"Mass Inflict Serious Wounds",
			"Refuge",
			"Regenerate",
			"Repulsion",
			"Resurrection",
			"Summon Monster VII",
			"Symbol of Stunning",
			"Symbol of Weakness",
			"Word of Chaos",
		],
		8 : [
			"Antimagic Field",
			"Brain Spider",
			"Cloak of Chaos",
			"Create Greater Undead",
			"Dimensional Lock",
			"Discern Location",
			"Earthquake",
			"Fire Storm",
			"Greater Planar Ally",
			"Greater Spell Immunity",
			"Holy Aura",
			"Mass Cure Critical Wounds",
			"Mass Inflict Critical Wounds",
			"Shield of Law",
			"Summon Monster VIII",
			"Symbol of Death",
			"Symbol of Insanity",
			"Unholy Aura",
		],
		9 : [
			"Astral Projection",
			"Energy Drain",
			"Etherealness",
			"Gate",
			"Implosion",
			"Mass Heal",
			"Miracle",
			"Soul Bind",
			"Storm of Vengeance",
			"Summon Monster IX",
			"True Resurrection",
		]
	},
	"cleric (cloistered)" : {
		0 : [
			"Create Water",
			"Cure Minor Wounds",
			"Detect Magic",
			"Detect Poison",
			"Guidance",
			"Inflict Minor Wounds",
			"Light",
			"Mending",
			"Message",
			"Purify Food and Drink",
			"Read Magic",
			"Resistance",
			"Virtue",
		],
		1 : [
			"Bane",
			"Bless",
			"Bless Water",
			"Cause Fear",
			"Command",
			"Comprehend Languages",
			"Cure Light Wounds",
			"Curse Water",
			"Deathwatch",
			"Detect Chaos",
			"Detect Evil",
			"Detect Good",
			"Detect Law",
			"Detect Undead",
			"Divine Favor",
			"Doom",
			"Endure Elements",
			"Entropic Shield",
			"Erase",
			"Hide from Undead",
			"Identify",
			"Inflict Light Wounds",
			"Magic Stone",
			"Magic Weapon",
			"Obscuring Mist",
			"Protection from Chaos",
			"Protection from Evil",
			"Protection from Good",
			"Protection from Law",
			"Remove Fear",
			"Sanctuary",
			"Shield of Faith",
			"Summon Monster I",
			"Unseen Servant",
		],
		2 : [
			"Aid",
			"Align Weapon",
			"Augury",
			"Bear's Endurance",
			"Bull's Strength",
			"Calm Emotions",
			"Consecrate",
			"Cure Moderate Wounds",
			"Darkness",
			"Death Knell",
			"Delay Poison",
			"Desecrate",
			"Eagle's Splendor",
			"Enthrall",
			"Find Traps",
			"Fox's Cunning",
			"Gentle Repose",
			"Hold Person",
			"Inflict Moderate Wounds",
			"Lesser Restoration",
			"Make Whole",
			"Owl's Wisdom",
			"Remove Paralysis",
			"Resist Energy",
			"Shatter",
			"Shield Other",
			"Silence",
			"Sound Burst",
			"Spiritual Weapon",
			"Status",
			"Summon Monster II",
			"Undetectable Alignment",
			"Zone of Truth",
		],
		3 : [
			"Animate Dead",
			"Bestow Curse",
			"Blindness/Deafness",
			"Contagion",
			"Continual Flame",
			"Create Food and Water",
			"Cure Serious Wounds",
			"Daylight",
			"Deeper Darkness",
			"Dispel Magic",
			"Glyph of Warding",
			"Helping Hand",
			"Illusory Script",
			"Inflict Serious Wounds",
			"Invisibility Purge",
			"Lesser Telepathic Bond",
			"Locate Object",
			"Magic Circle against Chaos",
			"Magic Circle against Evil",
			"Magic Circle against Good",
			"Magic Circle against Law",
			"Magic Vestment",
			"Meld into Stone",
			"Obscure Object",
			"Prayer",
			"Protection from Energy",
			"Remove Blindness/Deafness",
			"Remove Curse",
			"Remove Disease",
			"Searing Light",
			"Secret Page",
			"Speak with Dead",
			"Stone Shape",
			"Summon Monster III",
			"Tongues",
			"Water Breathing",
			"Water Walk",
			"Wind Wall",
		],
		4 : [
			"Air Walk",
			"Control Water",
			"Cure Critical Wounds",
			"Death Ward",
			"Detect Scrying",
			"Dimensional Anchor",
			"Discern Lies",
			"Dismissal",
			"Divination",
			"Divine Power",
			"Dweomer of Transference",
			"Freedom of Movement",
			"Giant Vermin",
			"Greater Magic Weapon",
			"Imbue with Spell Ability",
			"Inflict Critical Wounds",
			"Lesser Planar Ally",
			"Neutralize Poison",
			"Poison",
			"Repel Vermin",
			"Restoration",
			"Sending",
			"Spell Immunity",
			"Summon Monster IV",
		],
		5 : [
			"Atonement",
			"Break Enchantment",
			"Commune",
			"Dispel Chaos",
			"Dispel Evil",
			"Dispel Good",
			"Dispel Law",
			"Disrupting Weapon",
			"Flame Strike",
			"Greater Command",
			"Hallow",
			"Insect Plague",
			"Mark of Justice",
			"Mass Cure Light Wounds",
			"Mass Inflict Light Wounds",
			"Plane Shift",
			"Psychic Turmoil",
			"Raise Dead",
			"Righteous Might",
			"Scrying",
			"Slay Living",
			"Spell Resistance",
			"Summon Monster",
			"Symbol of Pain",
			"Symbol of Sleep",
			"True Seeing",
			"Unhallow",
			"Wall of Stone",
		],
		6 : [
			"Analyze Dweomer",
			"Animate Objects",
			"Antilife Shell",
			"Banishment",
			"Blade Barrier",
			"Create Undead",
			"Find the Path",
			"Forbiddance",
			"Geas/Quest",
			"Greater Dispel Magic",
			"Greater Glyph of Warding",
			"Harm",
			"Heal",
			"Heroes' Feast",
			"Mass Bear's Endurance",
			"Mass Bull's Strength",
			"Mass Cure Moderate Wounds",
			"Mass Eagle's Splendor",
			"Mass Inflict Moderate Wounds",
			"Mass Owl's Wisdom",
			"Planar Ally",
			"Summon Monster VI",
			"Symbol of Fear",
			"Symbol of Persuasion",
			"Undeath to Death",
			"Wind Walk",
			"Word of Recall",
		],
		7 : [
			"Blasphemy",
			"Control Weather",
			"Destruction",
			"Dictum",
			"Ethereal Jaunt",
			"Greater Psychic Turmoil",
			"Greater Restoration",
			"Greater Scrying",
			"Holy Word",
			"Mass Cure Serious Wounds",
			"Mass Inflict Serious Wounds",
			"Refuge",
			"Regenerate",
			"Repulsion",
			"Resurrection",
			"Sequester",
			"Summon Monster VII",
			"Symbol of Stunning",
			"Symbol of Weakness",
			"Word of Chaos",
		],
		8 : [
			"Antimagic Field",
			"Brain Spider",
			"Cloak of Chaos",
			"Create Greater Undead",
			"Dimensional Lock",
			"Discern Location",
			"Earthquake",
			"Fire Storm",
			"Greater Planar Ally",
			"Greater Spell Immunity",
			"Holy Aura",
			"Mass Cure Critical Wounds",
			"Mass Inflict Critical Wounds",
			"Shield of Law",
			"Summon Monster VIII",
			"Symbol of Death",
			"Symbol of Insanity",
			"Unholy Aura",
		],
		9 : [
			"Astral Projection",
			"Energy Drain",
			"Etherealness",
			"Gate",
			"Implosion",
			"Mass Heal",
			"Miracle",
			"Soul Bind",
			"Storm of Vengeance",
			"Summon Monster IX",
			"True Resurrection",
			"Vision",
		]
	},
	"druid" : {
		0 : [
			"Create Water",
			"Cure Minor Wounds",
			"Detect Magic",
			"Detect Poison",
			"Flare",
			"Guidance",
			"Know Direction",
			"Light",
			"Mending",
			"Purify Food and Drink",
			"Read Magic",
			"Resistance",
			"Virtue",
		],
		1 : [
			"Calm Animals",
			"Charm Animal",
			"Cure Light Wounds",
			"Detect Animals or Plants",
			"Detect Snares and Pits",
			"Endure Elements",
			"Entangle",
			"Faerie Fire",
			"Goodberry",
			"Hide from Animals",
			"Jump",
			"Longstrider",
			"Magic Fang",
			"Magic Stone",
			"Obscuring Mist",
			"Pass without Trace",
			"Produce Flame",
			"Shillelagh",
			"Speak with Animals",
			"Summon Nature's Ally I",
		],
		2 : [
			"Animal Messenger",
			"Animal Trance",
			"Barkskin",
			"Bear's Endurance",
			"Bull's Strength",
			"Cat's Grace",
			"Chill Metal",
			"Delay Poison",
			"Fire Trap",
			"Flame Blade",
			"Flaming Sphere",
			"Fog Cloud",
			"Gust of Wind",
			"Heat Metal",
			"Hold Animal",
			"Lesser Restoration",
			"Owl's Wisdom",
			"Reduce Animal",
			"Resist Energy",
			"Soften Earth and Stone",
			"Spider Climb",
			"Summon Nature's Ally II",
			"Summon Swarm",
			"Tree Shape",
			"Warp Wood",
			"Wood Shape",
		],
		3 : [
			"Call Lightning",
			"Contagion",
			"Cure Moderate Wounds",
			"Daylight",
			"Diminish Plants",
			"Dominate Animal",
			"Greater Magic Fang",
			"Meld into Stone",
			"Neutralize Poison",
			"Plant Growth",
			"Poison",
			"Protection from Energy",
			"Quench",
			"Remove Disease",
			"Sleet Storm",
			"Snare",
			"Speak with Plants",
			"Spike Growth",
			"Stone Shape",
			"Summon Nature's Ally III",
			"Water Breathing",
			"Wind Wall",
		],
		4 : [
			"Air Walk",
			"Antiplant Shell",
			"Blight",
			"Command Plants",
			"Control Water",
			"Cure Serious Wounds",
			"Dispel Magic",
			"Flame Strike",
			"Freedom of Movement",
			"Giant Vermin",
			"Ice Storm",
			"Reincarnate",
			"Repel Vermin",
			"Rusting Grasp",
			"Scrying",
			"Spike Stones",
			"Summon Nature's Ally IV",
		],
		5 : [
			"Animal Growth",
			"Atonement",
			"Awaken",
			"Baleful Polymorph",
			"Call Lightning Storm",
			"Commune with Nature",
			"Control Winds",
			"Cure Critical Wounds",
			"Death Ward",
			"Hallow",
			"Insect Plague",
			"Stoneskin",
			"Summon Nature's Ally V",
			"Transmute Mud to Rock",
			"Transmute Rock to Mud",
			"Tree Stride",
			"Unhallow",
			"Wall of Fire",
			"Wall of Thorns",
		],
		6 : [
			"Antilife Shell",
			"Find the Path",
			"Fire Seeds",
			"Greater Dispel Magic",
			"Ironwood",
			"Liveoak",
			"Mass Bear's Endurance",
			"Mass Bull's Strength",
			"Mass Cat's Grace",
			"Mass Cure Light Wounds",
			"Mass Owl's Wisdom",
			"Move Earth",
			"Repel Wood",
			"Spellstaff",
			"Stone Tell",
			"Summon Nature's Ally VI",
			"Transport via Plants",
			"Wall of Stone",
		],
		7 : [
			"Animate Plants",
			"Changestaff",
			"Control Weather",
			"Creeping Doom",
			"Fire Storm",
			"Heal",
			"Greater Scrying",
			"Mass Cure Moderate Wounds",
			"Summon Nature's Ally VII",
			"Sunbeam",
			"Transmute Metal to Wood",
			"True Seeing",
			"Wind Walk",
		],
		8 : [
			"Animal Shapes",
			"Control Plants",
			"Earthquake",
			"Finger of Death",
			"Mass Cure Serious Wounds",
			"Repel Metal or Stone",
			"Reverse Gravity",
			"Summon Nature's Ally VIII",
			"Sunburst",
			"Whirlwind",
			"Word of Recall",
		],
		9 : [
			"Antipathy",
			"Elemental Swarm",
			"Foresight",
			"Mass Cure Critical Wounds",
			"Regenerate",
			"Shambler",
			"Shapechange",
			"Storm of Vengeance",
			"Summon Nature's Ally IX",
			"Sympathy",
		]
	},
	"paladin" : {
		1 : [
			"Bless",
			"Bless Water",
			"Bless Weapon",
			"Create Water",
			"Cure Light Wounds",
			"Detect Poison",
			"Detect Undead",
			"Divine Favor",
			"Endure Elements",
			"Lesser Restoration",
			"Magic Weapon",
			"Protection from Chaos",
			"Protection from Evil",
			"Read Magic",
			"Resistance",
			"Virtue",
		],
		2 : [
			"Bull's Strength",
			"Delay Poison",
			"Eagle's Splendor",
			"Owl's Wisdom",
			"Remove Paralysis",
			"Resist Energy",
			"Shield Other",
			"Undetectable Alignment",
			"Zone of Truth",
		],
		3 : [
			"Cure Moderate Wounds",
			"Daylight",
			"Discern Lies",
			"Dispel Magic",
			"Greater Magic Weapon",
			"Heal Mount",
			"Magic Circle against Chaos",
			"Magic Circle against Evil",
			"Prayer",
			"Remove Blindness/Deafness",
			"Remove Curse",
		],
		4 : [
			"Break Enchantment",
			"Cure Serious Wounds",
			"Death Ward",
			"Dispel Chaos",
			"Dispel Evil",
			"Holy Sword",
			"Mark of Justice",
			"Neutralize Poison",
			"Restoration",
		]
	},
	"paladin (hunter)" : {
		1 : [
			"Bless",
			"Bless Water",
			"Bless Weapon",
			"Create Water",
			"Cure Light Wounds",
			"Detect Poison",
			"Detect Undead",
			"Divine Favor",
			"Endure Elements",
			"Lesser Restoration",
			"Magic Weapon",
			"Protection from Chaos",
			"Protection from Evil",
			"Read Magic",
			"Resistance",
			"Virtue",
		],
		2 : [
			"Bull's Strength",
			"Delay Poison",
			"Eagle's Splendor",
			"Owl's Wisdom",
			"Remove Paralysis",
			"Resist Energy",
			"Shield Other",
			"Undetectable Alignment",
			"Zone of Truth",
		],
		3 : [
			"Cure Moderate Wounds",
			"Daylight",
			"Discern Lies",
			"Dispel Magic",
			"Greater Magic Weapon",
			"Heal Mount",
			"Magic Circle against Chaos",
			"Magic Circle against Evil",
			"Prayer",
			"Remove Blindness/Deafness",
			"Remove Curse",
		],
		4 : [
			"Break Enchantment",
			"Cure Serious Wounds",
			"Death Ward",
			"Dispel Chaos",
			"Dispel Evil",
			"Holy Sword",
			"Mark of Justice",
			"Neutralize Poison",
			"Restoration",
		]
	},
	"paladin (freedom)" : {
		1 : [
			"Bless",
			"Bless Water",
			"Bless Weapon",
			"Create Water",
			"Cure Light Wounds",
			"Detect Poison",
			"Detect Undead",
			"Divine Favor",
			"Endure Elements",
			"Lesser Restoration",
			"Magic Weapon",
			"Protection from Evil",
			"Protection from Law",
			"Read Magic",
			"Resistance",
			"Virtue",
		],
		2 : [
			"Bull's Strength",
			"Delay Poison",
			"Eagle's Splendor",
			"Owl's Wisdom",
			"Remove Paralysis",
			"Resist Energy",
			"Shield Other",
			"Undetectable Alignment",
			"Zone of Truth",
		],
		3 : [
			"Cure Moderate Wounds",
			"Daylight",
			"Discern Lies",
			"Dispel Magic",
			"Greater Magic Weapon",
			"Heal Mount",
			"Magic Circle against Evil",
			"Magic Circle against Law",
			"Prayer",
			"Remove Blindness/Deafness",
			"Remove Curse",
		],
		4 : [
			"Break Enchantment",
			"Cure Serious Wounds",
			"Dispel Evil",
			"Dispel Law",
			"Freedom of Movement",
			"Holy Sword",
			"Mark of Justice",
			"Neutralize Poison",
			"Restoration",
		]
	},
	"paladin (slaughter)" : {
		1 : [
			"Bane",
			"Cause Fear",
			"Corrupt Weapon",
			"Create Water",
			"Curse Water",
			"Detect Poison",
			"Detect Undead",
			"Divine Favor",
			"Endure Elements",
			"Inflict Light Wounds",
			"Magic Weapon",
			"Protection from Good",
			"Protection from Law",
			"Read Magic",
			"Resistance",
			"Virtue",
		],
		2 : [
			"Bull's Strength",
			"Cure Light Wounds",
			"Darkness",
			"Delay Poison",
			"Eagle's Splendor",
			"Inflict Moderate Wounds",
			"Owl's Wisdom",
			"Resist Energy",
			"Undetectable Alignment",
		],
		3 : [
			"Blindness/Deafness",
			"Cure Moderate Wounds",
			"Deeper Darkness",
			"Dispel Magic",
			"Greater Magic Weapon",
			"Heal Mount",
			"Inflict Serious Wounds",
			"Magic Circle against Good",
			"Magic Circle against Law",
			"Prayer",
		],
		4 : [
			"Break Enchantment",
			"Cure Serious Wounds",
			"Dispel Good",
			"Dispel Law",
			"Inflict Critical Wounds",
			"Poison",
			"Unholy Sword",
		]
	},
	"paladin (tyranny)" : {
		1 : [
			"Bane",
			"Corrupt Weapon",
			"Create Water",
			"Curse Water",
			"Detect Poison",
			"Detect Undead",
			"Divine Favor",
			"Doom",
			"Endure Elements",
			"Inflict Light Wounds",
			"Magic Weapon",
			"Protection from Chaos",
			"Protection from Good",
			"Read Magic",
			"Resistance",
			"Virtue",
		],
		2 : [
			"Bull's Strength",
			"Cure Light Wounds",
			"Darkness",
			"Delay Poison",
			"Eagle's Splendor",
			"Hold Person",
			"Inflict Moderate Wounds",
			"Owl's Wisdom",
			"Resist Energy",
			"Undetectable Alignment",
		],
		3 : [
			"Bestow Curse",
			"Cure Moderate Wounds",
			"Deeper Darkness",
			"Discern Lies",
			"Dispel Magic",
			"Greater Magic Weapon",
			"Heal Mount",
			"Inflict Serious Wounds",
			"Magic Circle against Chaos",
			"Magic Circle against Good",
			"Prayer",
		],
		4 : [
			"Break Enchantment",
			"Cure Serious Wounds",
			"Dispel Chaos",
			"Dispel Good",
			"Dominate Person",
			"Inflict Critical Wounds",
			"Unholy Sword",
		]
	},
	"ranger" : {
		1 : [
			"Alarm",
			"Animal Messenger",
			"Calm Animals",
			"Charm Animal",
			"Delay Poison",
			"Detect Animals or Plants",
			"Detect Poison",
			"Detect Snares and Pits",
			"Endure Elements",
			"Entangle",
			"Hide from Animals",
			"Jump",
			"Longstrider",
			"Magic Fang",
			"Pass without Trace",
			"Read Magic",
			"Resist Energy",
			"Speak with Animals",
			"Summon Nature's Ally I",
		],
		2 : [
			"Barkskin",
			"Bear's Endurance",
			"Cat's Grace",
			"Cure Light Wounds",
			"Hold Animal",
			"Owl's Wisdom",
			"Protection from Energy",
			"Snare",
			"Speak with Plants",
			"Spike Growth",
			"Summon Nature's Ally II",
			"Wind Wall",
		],
		3 : [
			"Command Plants",
			"Cure Moderate Wounds",
			"Darkvision",
			"Diminish Plants",
			"Greater Magic Fang",
			"Neutralize Poison",
			"Plant Growth",
			"Reduce Animal",
			"Remove Disease",
			"Repel Vermin",
			"Summon Nature's Ally III",
			"Tree Shape",
			"Water Walk",
		],
		4 : [
			"Animal Growth",
			"Commune with Nature",
			"Cure Serious Wounds",
			"Freedom of Movement",
			"Nondetection",
			"Summon Nature's Ally IV",
			"Tree Stride",
		],
	},
	"ranger (urban)" : {
		1 : [
			"Alarm",
			"Calm Animals",
			"Comprehend Languages",
			"Delay Poison",
			"Detect Chaos",
			"Detect Evil",
			"Detect Good",
			"Detect Law",
			"Detect Poison",
			"Detect Secret Doors",
			"Detect Snares and Pits",
			"Endure Elements",
			"Entangle",
			"Hide from Animals",
			"Jump",
			"Longstrider",
			"Magic Fang",
			"Message",
			"Pass without Trace",
			"Read Magic",
			"Resist Energy",
			"Summon Nature's Ally I",
		],
		2 : [
			"Barkskin",
			"Cat's Grace",
			"Cure Light Wounds",
			"Detect Thoughts",
			"Eagle's Splendor",
			"Knock",
			"Locate Object",
			"Owl's Wisdom",
			"Protection from Energy",
			"Spike Growth",
			"Summon Nature's Ally II",
			"Wind Wall",
		],
		3 : [
			"Cure Moderate Wounds",
			"Darkvision",
			"Discern Lies",
			"Greater Magic Fang",
			"Invisibility",
			"Neutralize Poison",
			"Remove Disease",
			"Repel Vermin",
			"Speak With Dead",
			"Summon Nature's Ally III",
			"Tongues",
		],
		4 : [
			"Animal Growth",
			"Cure Serious Wounds",
			"Dimensonal Anchor",
			"Freedom of Movement",
			"Locate Creature",
			"Mage's Faithful Hound",
			"Nondetection",
			"Summon Nature's Ally IV",
			"True Seeing",
		],
	},
	"seer" : {
		1 : [
			"Destiny Dissonance",
			"Precognition",
		],
		2 : [
			"Clairvoyant Sense",
			"Object Reading",
			"Sensitivity to Psychic Impressions",
		],
		3 : [
			"Escape Detection",
			"Fate Link",
		],
		4 : [
			"Anchored Navigation",
			"Remote Viewing",
		],
		5 : [
			"Clairtangent Hand",
			"Second Chance",
		],
		6 : [
			"Greater Precognition",
		],
		7 : [
			"Fate of One",
		],
		8 : [
			"Hypercognition",
		],
		9 : [
			"Metafaculty",
		],
	},
	"shaper" : {
		1 : [
			"Astral Construct",
			"Psionic Minor Creation",
		],
		2 : [
			"Psionic Repair Damage",
		],
		3 : [
			"Ectoplasmic Cocoon",
			"Greater Conceal Amorpha",
		],
		4 : [
			"Psionic Fabricate",
			"Quintessence",
		],
		5 : [
			"Hail of Crystals",
		],
		6 : [
			"Crystallize",
			"Greater Psionic Fabricate",
		],
		7 : [
			"Mass Ectoplasmic Cocoon",
		],
		8 : [
			"Astral Seed",
		],
		9 : [
			"Genesis",
			"True Creation",
		],
	},
	"kineticist" : {
		1 : [
			"Control Object",
		],
		2 : [
			"Control Air",
			"Energy Missile",
		],
		3 : [
			"Energy Cone"
		],
		4 : [
			"Control Body",
			"Energy Ball",
			"Intertial Barrier",
		],
		5 : [
			"Energy Current",
			"Fiery Discorporation",
		],
		6 : [
			"Dispelling Buffer",
			"Null Psionics Field",
		],
		7 : [
			"Reddopsi",
		],
		8 : [
			"Psionic Telekinetic Sphere",
		],
		9 : [
			"Tornado Blast",
		],
	},
	"egoist" : {
		1 : [
			"Thicken Skin",
		],
		2 : [
			"Animal Affinity",
			"Chameleon",
			"Empathic Transfer",
		],
		3 : [
			"Ectoplasmic Form",
			"Hustle",
		],
		4 : [
			"Metamorphosis",
			"Psychic Vampire",
		],
		5 : [
			"Psionic Revivify",
			"Psychofeedback",
			"Restore Etremity",
		],
		6 : [
			"Psionic Restoration",
		],
		7 : [
			"Fission",
		],
		8 : [
			"Fusion",
		],
		9 : [
			"Greater Metamorphosis",
		],
	},
	"nomad" : {
		1 : [
			"Burst",
			"Detect Teleporation",
		],
		2 : [
			"Dimension Swap",
			"Psionic Levetate",
		],
		3 : [
			"Astral Caravan",
		],
		4 : [
			"Psionic Dimensional Anchor",
			"Psionic Dismissal",
			"Psionic Fly",
		],
		5 : [
			"Baleful Teleport",
			"Psionic Teleport",
			"Teleport Trigger",
		],
		6 : [
			"Psionic Banishment",
		],
		7 : [
			"Dream Travel",
			"Psionic Ethereal Jaunt",
		],
		8 : [
			"Mass Time Hop",
		],
		9 : [
			"Psionic Teleportation Circle",
			"Time Regression",
		],
	},
	"telepath" : {
		1 : [
			"Mindlink",
			"Psionic Charm",
		],
		2 : [
			"Aversion",
			"Brain Lock",
			"Psionic Suggestion",
			"Read Thoughts",
		],
		3 : [
			"Crisis of Breath",
			"False Sensory Input",
			"Hostile Empathic Transfer",
		],
		4 : [
			"Psionic Dominate",
			"Psionic Modify Memory",
			"Schism",
			"Thieving Mindlink",
		],
		5 : [
			"Metaconcert",
			"Mind Probe",
		],
		6 : [
			"Mind Switch",
		],
		7 : [
			"Crisis of Life",
		],
		8 : [
			"Mind Seed",
		],
		9 : [
			"Psychic Chirurgery",
			"True Mind Switch",
		],
	},
}

var animalcost = {
	"chicken" : 0.1,
	"cow" : 2,
	"donkey" : 1,
	"goat" : 0.5,
	"guard dog" : 0.5,
	"heavy horse" : 2,
	"heavy warhorse" : 3,
	"light horse" : 2,
	"light warhorse" : 3,
	"mule" : 2,
	"ox" : 2,
	"pig" : 1,
	"pony" : 1,
	"riding dog" : 1,
	"sheep" : 0.5,
	"warpony" : 1,
	
	"bat familiar" : 0.1,
	"cat familiar" : 0.1,
	"hawk familiar" : 0.1,
	"lizard familiar" : 0.1,
	"owl familiar" : 0.1,
	"rat familiar" : 0.1,
	"raven familiar" : 0.1,
	"snake familiar" : 0.1,
	"toad familiar" : 0.1,
	"weasel familiar" : 0.1,
	"shocker lizard familiar" : 0.5,
	"stirge familiar" : 0.1,
	"formian worker familiar" : 0.5,
	"imp familiar" : 0.1,
	"pseudodragon familiar" : 0.1,
	"quasit familiar" : 0.1,
	"celestial hawk familiar" : 0.1,
	"fiendish snake familiar" : 0.1,
	"air elemental familiar" : 0.5,
	"earth elemental familiar" : 0.5,
	"fire elemental familiar" : 0.5,
	"water elemental familiar" : 0.5,
	"homunculus familiar" : 0.1,
	"ice mephit familiar" : 0.5,

	"artiste psicrystal (alchemy)" : 0.1,
	"artiste psicrystal (armoursmithing)" : 0.1,
	"artiste psicrystal (blacksmithing)" : 0.1,
	"artiste psicrystal (bowmaking)" : 0.1,
	"artiste psicrystal (leatherworking)" : 0.1,
	"artiste psicrystal (masonry)" : 0.1,
	"artiste psicrystal (shipbuilding)" : 0.1,
	"artiste psicrystal (tailoring)" : 0.1,
	"artiste psicrystal (weaponsmithing)" : 0.1,
	"artiste psicrystal (woodworking)" : 0.1,
	"bully psicrystal" : 0.1,
	"coward psicrystal" : 0.1,
	"friendly psicrystal" : 0.1,
	"hero psicrystal" : 0.1,
	"liar psicrystal" : 0.1,
	"meticulous psicrystal" : 0.1,
	"nimble psicrystal" : 0.1,
	"observant psicrystal" : 0.1,
	"poised psicrystal" : 0.1,
	"resolved psicrystal" : 0.1,
	"sage psicrystal (arcana)" : 0.1,
	"sage psicrystal (architecture and engineering)" : 0.1,
	"sage psicrystal (dungeoneering)" : 0.1,
	"sage psicrystal (geography)" : 0.1,
	"sage psicrystal (history)" : 0.1,
	"sage psicrystal (local)" : 0.1,
	"sage psicrystal (nature)" : 0.1,
	"sage psicrystal (nobility and royalty)" : 0.1,
	"sage psicrystal (psionics)" : 0.1,
	"sage psicrystal (religion)" : 0.1,
	"sage psicrystal (the planes)" : 0.1,
	"single-minded psicrystal" : 0.1,
	"sneaky psicrystal" : 0.1,
	"sympathetic psicrystal" : 0.1,

	"badger animal companion" : 0.5,
	"camel animal companion" : 2,
	"dire rat animal companion" : 0.5,
	"dog animal companion" : 0.5,
	"riding dog animal companion" : 1,
	"eagle animal companion" : 0.5,
	"hawk animal companion" : 0.1,
	"light horse animal companion" : 2,
	"heavy horse animal companion" : 2,
	"owl animal companion" : 0.1,
	"pony animal companion" : 1,
	"small viper animal companion" : 0.5,
	"medium viper animal companion" : 1,
	"wolf animal companion" : 1,
	"porpoise animal companion" : 1,
	"medium shark animal companion" : 1,
	"squid animal companion" : 1,
	"ape animal companion" : 2,
	"black bear animal companion" : 1,
	"bison animal companion" : 2,
	"boar animal companion" : 1,
	"cheetah animal companion" : 1,
	"crocodile animal companion" : 1,
	"dire badger animal companion" : 1,
	"dire bat animal companion" : 2,
	"dire weasel animal companion" : 1,
	"leopard animal companion" : 1,
	"monitor lizard animal companion" : 1,
	"large shark animal companion" : 2,
	"constrictor snake animal companion" : 1,
	"large viper animal companion" : 2,
	"wolverine animal companion" : 1,
	"brown bear animal companion" : 2,
	"dire wolf animal companion" : 2,
	"giant crocodile animal companion" : 4,
	"deinonychus animal companion" : 1,
	"dire ape animal companion" : 2,
	"dire boar animal companion" : 2,
	"elasmosaurus animal companion" : 4,
	"lion animal companion" : 2,
	"rhinoceros animal companion" : 2,
	"huge viper animal companion" : 4,
	"tiger animal companion" : 2,
	"polar bear animal companion" : 2,
	"dire lion animal companion" : 2,
	"megaraptor animal companion" : 2,
	"huge shark animal companion" : 4,
	"giant constrictor snake animal companion" : 4,
	"orca animal companion" : 4,
	"dire bear animal companion" : 2,
	"elephant animal companion" : 4,
	"giant octopus animal companion" : 2,
	"dire shark animal companion" : 4,
	"dire tiger animal companion" : 2,
	"giant squid animal companion" : 4,
	"triceratops animal companion" : 4,
	"tyrannosaurus animal companion" : 4,

}
