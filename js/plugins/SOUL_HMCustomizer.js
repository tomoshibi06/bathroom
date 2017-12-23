/*:
* 

@plugindesc A customizable simple menu for horror games. Version 2.0
@author Soul - soulxregalia.wordpress.com

@param Actor Bust Picture
@desc The actor bust image used for your menu. Image must be in img / pictures folder.
@default Collabo2_1

@param Actor Bust X
@desc The x coordinate of the menu actor bust.
@default 0

@param Actor Bust Y
@desc The y coordinate of the menu actor bust.
@default 0

@param Menu Command X
@desc The x coordinate of the menu command window.
@default 250

@param Menu Command Y
@desc The y coordinate of the menu command window.
@default 120

@param Options Window X
@desc The x coordinate of the Options window.
@default 200

@param Options Window Y
@desc The y coordinate of the Options window.
@default 300

@param GameEnd Window X
@desc The x coordinate of the GameEnd window.
@default 500

@param GameEnd Window Y
@desc The y coordinate of the GameEnd window.
@default 200

@help

Horror Menu Customizer v2.0
author: Soul - soulxregalia.wordpress.com

Description:

This plugin allows you to easily customize your menu system for a menu
used mostly for horror games.

Features:
- Direct Access Options and Game End Windows
- One Category Item Scene
- Actor Bust (any image) for your menu. 

This plugin does not have any plugin commands at all.


*/

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _imported = _imported || {};
_imported._soulHMCustomizer = _imported._soulHMCustomizer || {};

var _hmParam = PluginManager.parameters('SOUL_HMCustomizer');

(function () {

		_setHMCustomizer();

		function _setHMCustomizer() {
				var Sprite_MenuActorBust = function (_Sprite) {
						_inherits(Sprite_MenuActorBust, _Sprite);

						function Sprite_MenuActorBust() {
								_classCallCheck(this, Sprite_MenuActorBust);

								return _possibleConstructorReturn(this, (Sprite_MenuActorBust.__proto__ || Object.getPrototypeOf(Sprite_MenuActorBust)).call(this));
						}

						_createClass(Sprite_MenuActorBust, [{
								key: 'initialize',
								value: function initialize() {
										Sprite.prototype.initialize.call(this);
										this.createBitmap();
								}
						}, {
								key: 'update',
								value: function update() {
										Sprite.prototype.update.call(this);
								}
						}, {
								key: 'createBitmap',
								value: function createBitmap() {
										this.bitmap = ImageManager.loadPicture(_hmParam['Actor Bust Picture']);
								}
						}]);

						return Sprite_MenuActorBust;
				}(Sprite);

				;

				Window_MenuCommand.prototype.initialize = function (x, y) {
						Window_Command.prototype.initialize.call(this, x, y);
						this.openness = 0;
						this.open();
						this.selectLast();
				};

				Window_Options.prototype.initialize = function () {
						Window_Command.prototype.initialize.call(this, 0, 0);
						this.openness = 0;
						this.open();
						this.updatePlacement();
				};

				Scene_Menu.prototype.create = function () {
						Scene_MenuBase.prototype.create.call(this);
						this.createMenuActorBust();
						this.createCommandWindow();
				};

				Scene_Menu.prototype.createMenuActorBust = function () {
						this.menuActorBust = new Sprite_MenuActorBust();
						this.menuActorBust.x = Number(_hmParam['Actor Bust X']);
						this.menuActorBust.y = Number(_hmParam['Actor Bust Y']);
						this.addChild(this.menuActorBust);
				};

				Scene_Menu.prototype.update = function () {
						Scene_MenuBase.prototype.update.call(this);
				};

				Scene_Menu.prototype.start = function () {
						Scene_MenuBase.prototype.start.call(this);
				};

				var _soulHMCustomizer_sceneMenuCreateCommandWindow = Scene_Menu.prototype.createCommandWindow;
				Scene_Menu.prototype.createCommandWindow = function () {
						_soulHMCustomizer_sceneMenuCreateCommandWindow.call(this);
						this._commandWindow.x = Number(_hmParam['Menu Command X']);
						this._commandWindow.y = Number(_hmParam['Menu Command Y']);
						this.addChild(this._commandWindow);
				};

				Scene_Menu.prototype.terminate = function () {
						Scene_Base.prototype.terminate.call(this);
						ConfigManager.save();
						this.removeChild(this.menuActorBust);
				};

				Scene_Item.prototype.create = function () {
						Scene_ItemBase.prototype.create.call(this);
						this.createHelpWindow();
						this.createItemWindow();
						this.createActorWindow();
				};

				Scene_Item.prototype.createItemWindow = function () {
						var wy = this._helpWindow.height;
						var wh = Graphics.boxHeight - wy;
						this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth, wh);
						this._itemWindow.setHelpWindow(this._helpWindow);
						this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
						this._itemWindow.setHandler('cancel', this.popScene.bind(this));
						this.addWindow(this._itemWindow);
						this._itemWindow.setCategory('keyItem');
						this.onCategoryOk();
				};

				Scene_Menu.prototype.commandOptions = function () {
						this.createOptionsWindow();
				};

				Scene_Menu.prototype.createOptionsWindow = function () {
						this._optionsWindow = new Window_Options();
						this._optionsWindow.x = Number(_hmParam['Options Window X']);
						this._optionsWindow.y = Number(_hmParam['Options Window Y']);
						this._optionsWindow.setHandler('cancel', this.closeOptionsWindow.bind(this));
						this.addChild(this._optionsWindow);
				};

				Scene_Menu.prototype.closeOptionsWindow = function () {
						this._optionsWindow.close();
						this.removeChild(this._optionsWindow);
						this._commandWindow.activate();
				};

				Scene_Menu.prototype.commandGameEnd = function () {
						this.createGameEndWindow();
				};

				Scene_Menu.prototype.createGameEndWindow = function () {
						this._gameEndWindow = new Window_GameEnd();
						this._gameEndWindow.setHandler('toTitle', this.commandToTitle.bind(this));
						this._gameEndWindow.setHandler('cancel', this.closeGameEndWindow.bind(this));

						this._gameEndWindow.x = Number(_hmParam['GameEnd Window X']);;
						this._gameEndWindow.y = Number(_hmParam['GameEnd Window Y']);;

						this.addChild(this._gameEndWindow);
				};

				Scene_Menu.prototype.closeGameEndWindow = function () {
						this._gameEndWindow.close();
						this.removeChild(this._gameEndWindow);
						this._commandWindow.activate();
				};

				Scene_Menu.prototype.commandToTitle = function () {
						this.fadeOutAll();
						SceneManager.goto(Scene_Title);
				};
		};
})();