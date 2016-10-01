<?php
$css = array ( "/util/character-sheets/editor.css" );
$js = array ( "/util/character-sheets/chatwiki.js", "/util/character-sheets/editor.js", "/util/character-sheets/constants.js", "/util/character-sheets/wiki.js", "/util/character-sheets/calculate.js" );
$location = array( "Tools" => "/tools/", "Character Editor" => "." );
include("/var/www/util/header.php"); 

?>

<div class='loadOtherCharacter'>
	Load Character: <input tabindex=1 id="load"></input><a tabindex=2 href="#" class="button" onclick="load();">Load</a>
</div>

<?php
if(!isset($_GET["character"]) || empty($_GET["character"])) {
} else {

	global $user;
	if($user->data['user_id'] == ANONYMOUS) {
		echo "Please log in to edit characters.";
	} else {

		$characterName = $_GET["character"];

		include_once("/var/www/forum/includes/functions_user.php");
		$idarray = false;
		$namearray = array( $characterName );
		user_get_id_name($idarray, $namearray );

		$characterAccountID = $idarray[0];
		$characterAccountData = util_get_user_data($characterAccountID);

		if(!$characterAccountID || ($characterAccountData['group_id'] != 10 && $characterAccountData['group_id'] != 11)) {
			echo "Character '". $characterName ."' does not exist.";
		} else {
			require_once("/var/www/forum/includes/functions_account_link.php");

			$masterAccount = get_master_account($characterAccountID);
			$usersMasterAccount = get_master_account($user->data['user_id']);

			if(!($masterAccount == $usersMasterAccount || $user->data['group_id'] == 8 || $user->data['group_id'] == 5)) {
				echo "You do not have permission to edit the character '" . $characterName . "'.";
			} else if($characterAccountData['group_id'] != 11 && !($user->data['group_id'] == 8 || $user->data['group_id'] == 5)) {
				echo "Only Dungeon Masters may edit sanctioned characters.";
			} else {


				$playerName = $masterAccount['username'];

				$avatarURL = util_get_avatar_url(util_get_user_data($characterAccountID));

?>
<script>
	var characterName = "<?php echo $characterName; ?>";
	var avatarURL = "<?php echo $avatarURL; ?>";
</script>
<div id="loadicon"></div>
<div id="charactersheet">
<div class="hr"></div>
<div class="doubleleft">
	<h1><span id="charname"><?php echo $characterName; ?></span> (<span id="playername"><?php echo $playerName ?></span>)<span id="sanctionedbutton" onclick="swapSanction();"><?php
		if($characterAccountData['group_id'] == 10) {
			echo "Sanctioned";
		} else {
			echo "Unsanctioned";
		}
		?></span></h1>
	<div class="leftcolumn">
		<div class="inputline" title="The legally held titles of your character. For example 'Sir' or 'Lady'.">
			<span class="chardata">Titles</span>
			<input id="charactertitles" class="inputfield" tabindex=3 ></input>
		</div>
		<div class="inputline" title="The race of your character.">
			<span class="chardata">Race</span>
			<select tabindex=5 class="inputfield" id="raceselect" onChange="recalculate();">
				<option></option>
				<option>Dwarf</option>
				<option>Elf</option>
				<option>Gnome</option>
				<option>Half-Elf</option>
				<option>Half-Orc</option>
				<option>Halfling</option>
				<option>Human</option>
			</select>
		</div>
		<div class="inputline" title="The height of your character in centimeters.">
			<span class="chardata">Height</span>
			<input id="characterheight" tabindex=7 class="inputfield"></input>
		</div>
                <div class="inputline" title="The culture of your character.">
                        <span class="chardata">Culture</span>
                        <select id="characterculture" tabindex=9 class="inputfield" onChange="recalculate();">
                                <option></option>
                                <option>Ecclesian</option>
                                <option>Silverite</option>
                                <option>Voran</option>
                        </select>
                </div>
		<div class="inputline" title="The alignment of your character. This may limit your choices of class.">
			<span class="chardata">Alignment</span>
			<select id="alignmentselect" tabindex=11 class="inputfield" onChange="recalculate();">
				<option></option>
				<option>Lawful Good</option>
				<option>Neutral Good</option>
				<option>Chaotic Good</option>
				<option>Lawful Neutral</option>
				<option>True Neutral</option>
				<option>Chaotic Neutral</option>
				<option>Lawful Evil</option>
				<option>Neutral Evil</option>
				<option>Chaotic Evil</option>
			</select>
		</div>
		<div class="inputline" title="The fate score of your character, rolled at character creation.">
			<span class="chardata">Fate</span>
			<input id="characterfate" tabindex=13 class="inputfield"></input>
		</div>
	</div>
	<div class="centercolumn">
		<div class="inputline" title="The current age of your character.">
			<span class="chardata">Age</span>
			<input id="characterage" tabindex=4 class="inputfield" onChange="recalculate();"></input>
		</div>
		<div class="inputline" title="The current gender identity of your character.">
			<span class="chardata">Gender</span>
			<select id="genderselect" tabindex=6 class="inputfield">
				<option></option>
				<option>Female</option>
				<option>Male</option>
			</select>
		</div>
		<div class="inputline" title="The weight of your character in kilograms.">
			<span class="chardata">Weight</span>
			<input id="characterweight" tabindex=8 class="inputfield"></input>
		</div>
		<div class="inputline" title="The name of the faction of which your character is a member.">
			<span class="chardata">Faction</span>
			<input id="characterfaction" tabindex=10 class="inputfield"></input>
		</div>
		<div class="inputline" title="The faith of your character.">
			<span class="chardata">Religion</span>
			<input id="characterreligion" tabindex=12 class="inputfield"></input>
		</div>
		<div class="inputline" title="The total amount of experience your character has gathered.">
			<span class="chardata">Experience</span>
			<input id="characterexperience" tabindex=14 class="inputfield"></input>
		</div>
	</div>
</div>
<div class="rightcolumn">
	<div id="characterimage"></div>
</div>
<div class="hr"></div>
<div class="leftcolumn">
	<div class="abilitycolumn ">
		<h3>Abilities <span class="notitle">(<span id="abilitypointsspenttotal"></span>)</span></h3>
		<div class="abilityblock strength">
			<span class="abilityname">Strength</span>
			<div class="abilityinput"><input id="abilityvaluestrength" tabindex=14 class="abilityvalue" onChange="recalculate();"></input></div>
			<span id="strengthbonus" class="abilitybonus">(+0)</span>
		</div>
		<div class="abilityblock intelligence">
			<span class="abilityname">Intelligence</span>
			<div class="abilityinput"><input id="abilityvalueintelligence" tabindex=17 class="abilityvalue" onChange="recalculate();"></input></div>
			<span id="intelligencebonus" class="abilitybonus">(+0)</span>
		</div>
		<div class="abilityblock dexterity">
			<span class="abilityname">Dexterity</span>
			<div class="abilityinput"><input id="abilityvaluedexterity" tabindex=15 class="abilityvalue" onChange="recalculate();"></input></div>
			<span id="dexteritybonus" class="abilitybonus">(+0)</span>
		</div>
		<div class="abilityblock wisdom">
			<span class="abilityname">Wisdom</span>
			<div class="abilityinput"><input id="abilityvaluewisdom" tabindex=18 class="abilityvalue" onChange="recalculate();"></input></div>
			<span id="wisdombonus" class="abilitybonus">(+0)</span>
		</div>
		<div class="abilityblock constitution">
			<span class="abilityname">Constitution</span>
			<div class="abilityinput"><input id="abilityvalueconstitution" tabindex=16 class="abilityvalue" onChange="recalculate();"></input></div>
			<span id="constitutionbonus" class="abilitybonus">(+0)</span>
		</div>
		<div class="abilityblock charisma">
			<span class="abilityname">Charisma</span>
			<div class="abilityinput"><input id="abilityvaluecharisma" tabindex=19 class="abilityvalue" onChange="recalculate();"></input></div>
			<span id="charismabonus" class="abilitybonus">(+0)</span>
		</div>
	</div>
</div>
<div class="doubleright">
	<table id="classes">
		<tr>
			<td colspan=4><h3>Classes<span class="addrowbutton" onclick="addClassRow();" title="Click to add another class field.">Add Class</span></h3></td>
		</tr>
	</table>
</div>
<div class="hr"></div>
<div class="fullwidth">
<div class="doubleleft">
	<h3>Attack <span class="notitle">(Carried and Equipped weapons only)</span></h3>
	<table id="attacktable">
		<tr>
			<th>Weapon</th>
			<th>Attack</th>
			<th>Critical</th>
			<th>Damage</th>
			<th>Type</th>
			<th>Range Increment</th>
		</tr>
	</table>
</div>
<div class="rightcolumn">
	<h3>Other Combat</h3>
	<table class="combatstatstable">
		<tr>
			<th>Initiative</th>
			<td id="totalInitValue">+0</td>
			<td><div class="iconbutton" title="Click to see how the Initiative was calculated." onclick="openPopup('initdetails');"><img src="/util/character-sheets/details.png" /></div></td>
		</tr>
		<tr>
			<th>Hit Points</th>
			<td id="totalHPvalue">0</td>
			<td><div class="iconbutton" title="Click to see how the Hit-Points was calculated." onclick="openPopup('hpdetails');"><img src="/util/character-sheets/details.png" /></div></td>
		</tr>
		<tr>
			<th>Armour Class</th>
			<td id="totalACvalue">13</td>
			<td><div class="iconbutton" title="Click to see how the Armour Class was calculated, as well as your Touch and Flat-Footed Armour Class." onclick="openPopup('acdetails');"><img src="/util/character-sheets/details.png" /></div></td>
		</tr>
	</table>
	<table class="savestable">
		<tr>
			<th>Fortitude</th>
			<td id="totalFortValue">+0</td>
			<td><div class="iconbutton" title="Click to see how the Fortitude Save was calculated." onclick="openPopup('fortitudedetails');"><img src="/util/character-sheets/details.png" /></div></td>
		</tr>
		<tr>
			<th>Reflex</th>
			<td id="totalReflValue">+0</td>
			<td><div class="iconbutton" title="Click to see how the Reflex Save was calculated." onclick="openPopup('reflexdetails');"><img src="/util/character-sheets/details.png" /></div></td>
		</tr>
		<tr>
			<th>Will</th>
			<td id="totalWillValue">+0</td>
			<td><div class="iconbutton" title="Click to see how the Will Save was calculated." onclick="openPopup('willdetails');"><img src="/util/character-sheets/details.png" /></div></td>
		</tr>
	</table>
</div>
</div>
<div class="hr"></div>
<div class="fullwidth">
	<h3>Skills <span id="skillrankdata">(0 out of 0)</span><span class="addrowbutton" onclick="addSkillRow();" title="Click to add another skill row.">Add Skill</span> <span class="addrowbutton" style="margin-right:10px;" onclick="addUntrainedSkills();" title="Click to add missing untrained skills">Add Untrained</span></h3>
	<div class="skillinput">
		<table class="skilltable" id="skills">
			<tr>
			<th>Skill</th><th>Bonus</th><th></th><th title="Number of ranks over all classes.">Ranks</th><th></th><th title="Number of cross class ranks invested. When investing 2 cross-class ranks for a +1 bonus, please write down 1.0.">Ranks (cc)</th><th></th><th>Ability</th><th></th><th>Racial</th><th></th><th>Size</th><th></th><th>Synergy</th><th></th><th>Feats</th><th></th><th title="Armour Check Penalty">ACP</th><th></th><th title="Equipment">Equip.</th><th></th><th title="Skill specific modifiers.">Special</th><th></th><th>Other</th><th></th><th></th>
			</tr>
		</table>
	</div>
</div>
<div class="hr"></div>
<div class="col1">
	<h3>Feats<span class="addrowbutton" title="Click to add another feat." onclick="addFeatRow();">Add Feat</span></h3>
	<table id="feats">
	</table>
</div>
<div class="col2">
	<h3>Languages<span id="languagesleft">(<span id="langcount">0</span> total)</span></h3>
	<table id="languages">
	</table>
</div>
<div class="col3" title="Abilities that provide a direct or conditional bonus to Armour Class, saves, attack or skill are listed with the stats they boost. Bonus feats, whether selected from a set or not, should be manually added to the feats list.">
	<h3>Abilities<span class="addrowbutton" title="Click to add another ability." onclick="addClassAbilityRow(true);">Add Ability</span></h3>
	<table id="classabilities">
	</table>
</div>
<div class="col4">
	<h3>Carrying Capacity</h3>
	<table id="carryingtable">
		<tr>
			<td><b>Speed:</b></td>
			<td class="datafield"><span id="speed">30</span> ft / round, run x<span id="run">4</span></td>
		</tr>
		<tr>
			<td colspan=2><div class="hr"></div></td>
		</tr>
		<tr>
			<td><b>Current Load:</b></td>
			<td id="currentload" class="datafield">0 lb.</td>
		</tr>
		<tr>
			<td><b>Encumbrance Level:</b></td>
			<td id="encumbrancelevel" class="datafield">Light Load</td>
		</tr>
		<tr>
			<td colspan=2><div class="hr"></div></td>
		</tr>
		<tr>
			<td><b>Light Load:</b></td>
			<td id="lightLoad" class="datafield">0 lb.</td>
		</tr>
		<tr>
			<td><b>Medium Load:</b></td>
			<td id="mediumLoad" class="datafield">0 lb.</td>
		</tr>
		<tr>
			<td><b>Heavy Load:</b></td>
			<td id="heavyLoad" class="datafield">0 lb.</td>
		</tr>
		<tr>
			<td><b>Lift off Ground:</b></td>
			<td id="liftOffGround" class="datafield">0 lb.</td>
		</tr>
		<tr>
			<td><b>Push / Drag:</b></td>
			<td id="pushDrag" class="datafield">0 lb.</td>
		</tr>
	</table>
</div>
<div class="fullwidth">
	<div title="Notes for equipment.">
		<span class="bigheader">Additional notes regarding feats, languages and abilities</span>
		<textarea id="abilitiesfield" class="biginputfield"></textarea>
	</div>
	<div class="hr"></div>
	<h3>Equipment and Wealth</h3>
	<ul id="equiped" title="Equipment that is currently equiped by your character. The weight of this equipment is part of your current load. If the item is a weapon, an attack score and damage will be calculated for it. Any magic effects granted by these items are included in your stats" class="equipmentcontainer">
		<li class="equipmenttitle">Worn / Equipped <span class="notitle">(You cannot wield more than 2 weapons)</span><span class="addrowbutton" onclick="addEquipmentItem($(this).parents('ul'));" title="Click to add another item.">Add Item</span></li>
	</ul>
	<ul id="carried" title="Equipment that is currently carried by your character. The weight of this equipment is part of your current load. If the item is a weapon, an attack score and damage will be calculated for it." class="equipmentcontainer">
		<li class="equipmenttitle">Carried<span class="addrowbutton" onclick="addEquipmentItem($(this).parents('ul'));" title="Click to add another item.">Add Item</span></li>
	</ul>
	<ul id="mount" title="Equipment carried by your mount. The weight is not part of your current load, but as long as you are with your mount, you can access it." class="equipmentcontainer">
		<li class="equipmenttitle wide">Mount<span class="addrowbutton" onclick="addEquipmentItem($(this).parents('ul'));" title="Click to add another item.">Add Item</span></li>
	</ul>
	<ul id="owned" title="Any equipment or property that is owned but not carried by your character." class="equipmentcontainer">
		<li class="equipmenttitle wide">Owned<span class="addrowbutton " onclick="addEquipmentItem($(this).parents('ul'));" title="Click to add another item.">Add Item</span></li>
	</ul>
	<div id="equipmentnotesfield" title="Notes for equipment.">
	<span class="moneyheader">Additional notes regarding equipment</span>
		<textarea id="equipmentnotes" class="biginputfield"></textarea>
	</div>
	<div id="moneyfield" title="Money and Income.">
		<div class="moneyheader">Wealth</div>
                <div class="inputline" title="">
                        <span id="goldtitle">Gold</span>
                        <input id="gold" class="jobdata" onchange="recalculate();"></input><span class="gp"> gp</span>
                        <span id="nettitle" style="margin-left:20px;">Net Value</span>
                        <span id="netval" class="jobdata">0</span><span class="gp"> gp</span>
		</div>
		<div>
			<span id="totaltitle">Income</span>
			<span id="totalvalue"><span id="totalgpweek">0</span> gp/wk</span>
			<span id="lasttitle">Done until</span>
			<input id="lastprocesseddate"></input>
                </div>
		<div class="hr"></div>
		<div class="moneyheader">Job & Stipend</div>
		<table class='incometable'>
			<tr>
				<td>Job:</td>
				<td><input id="jobtitle" onchange="recalculateJob();changeJob();"></input></td>
				<td><span id="jobgpweek">0</span> gp/wk</td>
			</tr>
			<tr>
				<td><span class="subspacer">Job Type:</span></td>
				<td colspan=2><select id="jobtypeselect" onChange="recalculateJob();changeJob();"><option>Unemployed</option><option>Common Job</option><option>Skilled Labour</option><option>Position</option></select></td>
			</tr>
			<tr id="skilledlabourtr">
				<td><span class="subspacer">Skill:</span></td>
				<td colspan=2><input id="jobskill" onChange="recalculateJob();changeJob();"></input></td>
			</tr>
			<tr>
				<td colspan=2>Stipend:</td>
				<td><span id="stipendgpweek">0</span> gp/wk</td>
			</tr>
		</table>
		<div class="hr"></div>
		<div class="moneyheader">Expenses</div>
		<table class="expensestable">
			<tr>
				<td>Lifestyle:</td>
				<td>
					<select id="lifestyleselect" onChange="recalculateJob();">
						<option value='Self-sufficient' id='lifestyle0'>Self-sufficient</option>
						<option value='Dirt Poor' id='lifestyle1'>Dirt Poor</option>
						<option value='Meagre' id='lifestyle2'>Meagre</option>
						<option value='Comfortable' id='lifestyle3'>Comfortable</option>
						<option value='Luxurious' id='lifestyle4'>Luxurious</option>
						<option value='Extravagant' id='lifestyle5'>Extravagant</option>
					</select>
				</td>
				<td><span id="lifestylegpweek">0</span> gp/wk</td>
			</tr>
			<tr>
				<td>Dependents:</td>
				<td><input class='dependentsinput' id="numchildren" onChange="recalculateJob();"></input><span class="dependentstitle">Children</span></td>
				<td><span id="childgpweek">0</span> gp/wk</td>
			</tr>
			<tr>
				<td></td>
				<td><input class='dependentsinput' id="numadults" onChange="recalculateJob();"></input><span class="dependentstitle">Adults</span></td>
				<td><span id="adultgpweek">0</span> gp/wk</td>
			</tr>
			<tr>
				<td colspan=2>Animals:</td>
				<td><span id="animalsgpweek">0</span> gp/wk</td>
			</tr>
		</table>
                <div class="hr"></div>
                <div class="moneyheader">Other</div>
                <table class="expensestable">
 			<tr>
				<td style="width:236px;">Manual per week (see notes):</td>
				<td><input id="othergpweek" onChange="recalculateJob();"></input> gp/wk</td>
			</tr>
		</table>
	</div>
</div>
<div class="fullwidth">
        <div class="hr"></div>
        <h3>Spells, Powers and Magic</h3>
        <div title="Spells per day by class and level.">
                <table id="spellsperdaytable">
                        <tr>
                                <th colspan=3></th><th colspan=10>Spells per Day</th>
                        </tr>
                        <tr>
                                <th>Base Caster Class</th><th>Level</th><th title="Bonus Levels from Prestige Classes">Bonus Levels</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th>
                        </tr>
                </table>
        </div>
        <table class="powerpointstable">
                <tr>
                        <th>Power Points per Day</th>
                        <td id="totalPowerPoints">0</td>
                        <td><div class="iconbutton" title="Click to see how the Power Points were calculated." onclick="openPopup('powerpointdetails');"><img src="/util/character-sheets/details.png" /></div></td>
                </tr>
		<tr>
			<th>Arcane Spell Failure</th>
			<td id="asfPercentage" colspan=2>0%</td>
		</tr>
		<tr>
			<th>Touch Attack</th>
			<td><span id="meleetouchattack">+0</span><span class="smallfont"> melee</span></td>
			<td><span id="rangedtouchattack">+0</span><span class="smallfont"> ranged</span></td>
		</tr>
	</table>
	<table id="psionicbonuslevels">
		<tr>
			<th>Base Psionic Class</th>
			<th title="Bonus Levels from Prestige Classes">Bonus Levels</th>
		</tr>
        </table>
	<div id="spellsknown">
		<div id="magicoptions" class="known">
			<div class='hr'></div>
			<h4>Magic Options</h4>
			<div id="turnblock">
				<div class='cola'>
					<h4>Turn / Rebuke</h4>
					<table id="turnTable">
					</table>
				</div>
			</div>
			<div id="clericdomainchoice">
				<div class='colb'>
					<h4>Cleric Domains</h4>
					<input class='domainchoice' onChange="recalculate();"></input>
					<input class='domainchoice' onChange="recalculate();"></input>
					<input id="cloisteredclericdomain" disabled>
				</div>
				<div class='colc'>
					<h4>Cleric Energy Manipulation</h4>
					<select id="clericturnchoice" onChange="recalculate();">
						<option value=""></option>
						<option value="Positive Energy">Positive Energy</option>
						<option value="Negative Energy">Negative Energy</option>
					</select>
				</div>
			</div>
			<div id="opposedSchool">
				<div class='cold'>
					<h4>Specialist Wizard<br/>Prohibited Schools</h4>
					<select class="opposedSchoolChoice">
						<option value=""></option>
						<option value="Abjuration">Abjuration</option>
						<option value="Conjuration">Conjuration</option>
						<option value="Divination">Divination</option>
						<option value="Enchantment">Enchantment</option>
						<option value="Evocation">Evocation</option>
						<option value="Illusion">Illusion</option>
						<option value="Necromancy">Necromancy</option>
						<option value="Transmutation">Transmutation</option>
					</select>
					<select class="opposedSchoolChoice">
						<option value=""></option>
						<option value="Abjuration">Abjuration</option>
						<option value="Conjuration">Conjuration</option>
						<option value="Divination">Divination</option>
						<option value="Enchantment">Enchantment</option>
						<option value="Evocation">Evocation</option>
						<option value="Illusion">Illusion</option>
						<option value="Necromancy">Necromancy</option>
						<option value="Transmutation">Transmutation</option>
					</select>
				</div>
			</div>
			<div id="wizardDomain">
				<div class='cold'>
					<h4>Wizard's Domain</h4>
					<select id="wizardDomainChoice">
                                                <option value=""></option>
                                                <option value="Abjuration">Abjuration</option>
                                                <option value="Antimagic">Antimagic</option>
                                                <option value="Battle">Battle</option>
                                                <option value="Cold">Cold</option>
                                                <option value="Conjuration">Conjuration</option>
                                                <option value="Divination">Divination</option>
                                                <option value="Enchantment">Enchantment</option>
                                                <option value="Evocation">Evocation</option>
                                                <option value="Fire">Fire</option>
                                                <option value="Illusion">Illusion</option>
                                                <option value="Necromancy">Necromancy</option>
                                                <option value="Storm">Storm</option>
                                                <option value="Transmutation">Transmutation</option>
					</select>
				</div>
			</div>
		</div>
		<div id="assassinspellsknown" class="known">
			<div class='hr'></div>
			<h4>Assassin Spells Known</h4>
			<div class='cola level1'>
				<h4>Level 1</h4>
				<input />
				<input />
				<input />
				<input />
			</div>
			<div class='colb level2'>
				<h4>Level 2</h4>
				<input />
				<input />
				<input />
				<input />
			</div>
			<div class='colc level3'>
				<h4>Level 3</h4>
				<input />
				<input />
				<input />
				<input />
			</div>
			<div class='cold level4'>
				<h4>Level 4</h4>
				<input />
				<input />
				<input />
				<input />
			</div>
		</div>
		<div id="bardspellsknown" class="known">
			<div class='hr'></div>
			<h4>Bard Spells Known</h4>
			<div class='cola level0'>
				<h4>Level 0</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
			</div>
			<div class='colb level1'>
				<h4>Level 1</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='colc level2'>
				<h4>Level 2</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cold level3'>
				<h4>Level 3</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cole level4'>
				<h4>Level 4</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cola level5'>
				<h4>Level 5</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
			</div>
			<div class='colb level6'>
				<h4>Level 6</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
			</div>
		</div>
		<div id="beguileradvancedlearning" class="known">
			<div class='hr'></div>
			<h4>Beguiler Advanced Learning</h4>
			<div class='cola'>
				<h4></h4>
				<span class='balmarker'>3:</span><input id='beguilerAL3'/>
				<span class='balmarker'>7:</span><input id='beguilerAL7'/>
				<span class='balmarker'>11:</span><input id='beguilerAL11'/>
				<span class='balmarker'>15:</span><input id='beguilerAL15'/>
				<span class='balmarker'>19:</span><input id='beguilerAL19'/>
			</div>
		</div>
		<div id="dragonshamanauras" class="known">
			<div class='hr'></div>
			<h4>Dragon Shaman</h4>
			<div class='cola'>
				<h4>Draconic Aura's Known</h4>
				<span class='auratitle'>Energy Shield</span><input type=checkbox id="dsa_energy_shield" />
				<span class='auratitle'>Power</span><input type=checkbox id="dsa_power" />
				<span class='auratitle'>Presence</span><input type=checkbox id="dsa_presence" />
				<span class='auratitle'>Resistance</span><input type=checkbox id="dsa_resistance" />
				<span class='auratitle'>Senses</span><input type=checkbox id="dsa_senses" />
				<span class='auratitle'>Toughness</span><input type=checkbox id="dsa_toughness" />
				<span class='auratitle'>Vigor</span><input type=checkbox id="dsa_vigor" />
			</div>
		</div>
		<div id="duskbladespellsknown" class="known">
			<div class='hr'></div>
			<h4>Duskblade Spells Known</h4>
			<div class='cola level0'>
				<h4>Level 0</h4>
			</div>
			<h4></h4>
			<div class='cola level1'>
				<h4>Level 1</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
			</div>
			<div class='colb level2'>
				<h4>Level 2</h4>
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='colc level3'>
				<h4>Level 3</h4>
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cold level4'>
				<h4>Level 4</h4>
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cole level5'>
				<h4>Level 5</h4>
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
		</div>
		<div id="psionspellsknown" class="known">
			<div class='hr'></div>
			<h4>Psion Powers Known</h4>
			<div class='cola level1'>
				<h4>Maximum Level 1</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
			</div>
			<div class='colb level2'>
				<h4>Maximum Level 2</h4>
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='colc level3'>
				<h4>Maximum Level 3</h4>
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cold level4'>
				<h4>Maximum Level 4</h4>
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cole level5'>
				<h4>Maximum Level 5</h4>
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cola level6'>
				<h4>Maximum Level 6</h4>
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
			</div>
			<div class='colb level7'>
				<h4>Maximum Level 7</h4>
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
			</div>
			<div class='colc level8'>
				<h4>Maximum Level 8</h4>
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
			</div>
			<div class='cold level9'>
				<h4>Maximum Level 9</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
			</div>

		</div>
		<div id="psionicfistspellsknown" class="known">
			<div class='hr'></div>
			<h4>Psionic Fist Powers Known</h4>
			<div class='cola level1'>
				<h4>Maximum Level 1</h4>
				<input />
				<input />
			</div>
			<div class='colb level2'>
				<h4>Maximum Level 2</h4>
				<input />
				<input />
			</div>
			<div class='colc level3'>
				<h4>Maximum Level 3</h4>
				<input />
				<input />
			</div>
			<div class='cold level4'>
				<h4>Maximum Level 4</h4>
				<input />
				<input />
			</div>
			<div class='cole level5'>
				<h4>Maximum Level 5</h4>
				<input />
				<input />
			</div>
		</div>
		<div id="psychicwarriorspellsknown" class="known">
			<div class='hr'></div>
			<h4>Psychic Warrior Powers Known</h4>
			<div class='cola level1'>
				<h4>Maximum Level 1</h4>
				<input />
				<input />
				<input />
			</div>
			<div class='colb level2'>
				<h4>Maximum Level 2</h4>
				<input />
				<input />
				<input />
			</div>
			<div class='colc level3'>
				<h4>Maximum Level 3</h4>
				<input />
				<input />
				<input />
			</div>
			<div class='cold level4'>
				<h4>Maximum Level 4</h4>
				<input />
				<input />
				<input />
			</div>
			<div class='cole level5'>
				<h4>Maximum Level 5</h4>
				<input />
				<input />
				<input />
			</div>
			<div class='cola level6'>
				<h4>Maximum Level 6</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
			</div>
		</div>
		<div id="sorcererspellsknown" class="known">
			<div class='hr'></div>
			<h4>Sorcerer Spells Known</h4>
			<div class='cola level0'>
				<h4>Level 0</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
				<input />
			</div>
			<div class='colb level1'>
				<h4>Level 1</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
			</div>
			<div class='colc level2'>
				<h4>Level 2</h4>
				<input />
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
			</div>
			<div class='cold level3'>
				<h4>Level 3</h4>
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
			</div>
			<div class='cole level4'>
				<h4>Level 4</h4>
				<input />
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
				<span class='placeholder'></span>
			</div>
			<div class='cola level5'>
				<h4>Level 5</h4>
				<input />
				<input />
				<input />
				<input />
			</div>
			<div class='colb level6'>
				<h4>Level 6</h4>
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='colc level7'>
				<h4>Level 7</h4>
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cold level8'>
				<h4>Level 8</h4>
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cole level9'>
				<h4>Level 9</h4>
				<input />
				<input />
				<input />
				<span class='placeholder'></span>
			</div>

		</div>
		<div id="warmindspellsknown" class="known">
			<div class='hr'></div>
			<h4>War Mind Powers Known</h4>
			<div class='cola level1'>
				<h4>Maximum Level 1</h4>
				<input />
				<input />
			</div>
			<div class='colb level2'>
				<h4>Maximum Level 2</h4>
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='colc level3'>
				<h4>Maximum Level 3</h4>
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cold level4'>
				<h4>Maximum Level 4</h4>
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cole level5'>
				<h4>Maximum Level 5</h4>
				<input />
				<span class='placeholder'></span>
			</div>
		</div>
		<div id="wilderspellsknown" class="known">
			<div class='hr'></div>
			<h4>Wilder Powers Known</h4>
			<div class='cola level1'>
				<h4>Maximum Level 1</h4>
				<input />
				<input />
			</div>
			<div class='colb level2'>
				<h4>Maximum Level 2</h4>
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='colc level3'>
				<h4>Maximum Level 3</h4>
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cold level4'>
				<h4>Maximum Level 4</h4>
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cole level5'>
				<h4>Maximum Level 5</h4>
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cola level6'>
				<h4>Maximum Level 6</h4>
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='colb level7'>
				<h4>Maximum Level 7</h4>
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='colc level8'>
				<h4>Maximum Level 8</h4>
				<input />
				<span class='placeholder'></span>
			</div>
			<div class='cold level9'>
				<h4>Maximum Level 9</h4>
				<input />
				<input />
			</div>
		</div>
		<div id="wizardspellsknown" class="known">
			<div class='hr'></div>
			<h4>Wizard Spellbook</h4>
			<div class='cola level0'>
				<h4>Level 0<span class="addrowbutton" onclick="addWizardSpell(0);" title="Click to add a spell.">Add Spell</span></h4>
			</div>
			<div class='colb level1'>
				<h4>Level 1<span class="addrowbutton" onclick="addWizardSpell(1);" title="Click to add a spell.">Add Spell</span></h4>
			</div>
			<div class='colc level2'>
				<h4>Level 2<span class="addrowbutton" onclick="addWizardSpell(2);" title="Click to add a spell.">Add Spell</span></h4>
			</div>
			<div class='cold level3'>
				<h4>Level 3<span class="addrowbutton" onclick="addWizardSpell(3);" title="Click to add a spell.">Add Spell</span></h4>
			</div>
			<div class='cole level4'>
				<h4>Level 4<span class="addrowbutton" onclick="addWizardSpell(4);" title="Click to add a spell.">Add Spell</span></h4>
			</div>
			<h4></h4>
			<div class='cola level5'>
				<h4>Level 5<span class="addrowbutton" onclick="addWizardSpell(5);" title="Click to add a spell.">Add Spell</span></h4>
			</div>
			<div class='colb level6'>
				<h4>Level 6<span class="addrowbutton" onclick="addWizardSpell(6);" title="Click to add a spell.">Add Spell</span></h4>
			</div>
			<div class='colc level7'>
				<h4>Level 7<span class="addrowbutton" onclick="addWizardSpell(7);" title="Click to add a spell.">Add Spell</span></h4>
			</div>
			<div class='cold level8'>
				<h4>Level 8<span class="addrowbutton" onclick="addWizardSpell(8);" title="Click to add a spell.">Add Spell</span></h4>
			</div>
			<div class='cole level9'>
				<h4>Level 9<span class="addrowbutton" onclick="addWizardSpell(9);" title="Click to add a spell.">Add Spell</span></h4>
			</div>
		</div>
	</div>
        <div title="Spells, Psionic powers and other spellcasting related data.">
                <span class="bigheader">Notes regarding magic</span>
                <textarea id="spellsfield" class="biginputfield"></textarea>
        </div>

	<div class="hr"></div>
	<h3>Other</h3>
	<div title="Any other notes for this character.">
		<span class="bigheader">Character Notes</span>
		<textarea id="notes" class="biginputfield"></textarea>
		<span class="bigheader">Summary of this edit <span class="notitle">(Note: this information is public and can be read by everyone)</span><a target='_blank' id="noteslink"><span class="addrowbutton" title="Click to view character notes made in earlier edits." style="margin-right:5px;">View Character Notes</span></a></span>
		<input id="comment"></input>
	</div>
	<div class="finalbuttons" id="verifysubmit">
		<span class="button" onclick="submit();">Submit</span>
	</div>
</div>
<div class="popup" id="initdetails" title="Initiative">
	<table class="detailstable">
		<tr>
			<th>Factor</th>
			<th>Total</th>
		</tr>
		<tr>
			<td class="detailsinput">Dexterity</td>
			<td class="detailsvalue dexteritybonusfield">+0</td>
		</tr>
	</table>	
</div>
<div class="popup" id="hpdetails" title="Hit Points">
	<table class="detailstable">
		<tr>
			<th>Level</th>
			<th>HP</th>
			<th></th>
			<th>Con</th>
		</tr>
	</table>
</div>
<div class="popup" id="acdetails" title="Armour Class">
	<table class="detailstable">
		<tr>
			<th>Factor</th>
			<th>Total</th>
		</tr>
		<tr>
			<td class="detailsinput">Base</td>
			<td class="detailsvalue">10</td>
		</tr>
		<tr>
			<td class="detailsinput" title="Takes maximum dexterity bonus from armour, shield and encumbrance into account.">Dexterity</td>
			<td class="detailsvalue" id="dextoac">+0</td>
		</tr>
		<tr>
			<td class="detailsinput">Armour (<span id='armourtype'></span>)</td>
			<td class="detailsvalue" id="armourbonustoac">+0</td>
		</tr>
		<tr>
			<td class="detailsinput">Shield (<span id='shieldtype'></span>)</td>
			<td class="detailsvalue" id="shieldbonustoac">+0</td>
		</tr>
	</table>
</div>	
<div class="popup" id="fortitudedetails" title="Fortitude Save">
	<table class="detailstable">
		<tr>
			<th>Factor</th>
			<th>Total</th>
		</tr>
		<tr>
			<td class="detailsinput">Constitition</td>
			<td class="detailsvalue constitutionbonusfield">+0</td>
		</tr>
	</table>
</div>
<div class="popup" id="reflexdetails" title="Reflex Save">
	<table class="detailstable">
		<tr>
			<th>Factor</th>
			<th>Total</th>
		</tr>
		<tr>
			<td class="detailsinput">Dexterity</td>
			<td class="detailsvalue dexteritybonusfield">+0</td>
		</tr>
	</table>
</div>
<div class="popup" id="willdetails" title="Will Save">
	<table class="detailstable">
		<tr>
			<th>Factor</th>
			<th>Total</th>
		</tr>
		<tr>
			<td class="detailsinput">Wisdom</td>
			<td class="detailsvalue wisdombonusfield">+0</td>
		</tr>
	</table>
</div>
<div class="popup" id="powerpointdetails" title="Power Points">
        <table class="detailstable">
                <tr>
                        <th>Factor</th>
                        <th>Total</th>
                        <th></th>
                        <th>Bonus</th>
                </tr>
        </table>
</div>
</div>
<div style="clear:both;"></div>
<?php 
			}
		}
	}
}

include("/var/www/util/footer.php"); ?>
