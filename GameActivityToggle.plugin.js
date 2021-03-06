/**
 * @name GameActivityToggle
 * @version 1.2.1
 * @description Simple plugin that adds the \"display game activity\" setting
 * on the home toolbar so you can toggle it easier when you don't want your friends knowing how much you play video games.
 *
 * @authorLink https://github.com/Egrodo
 * @source https://github.com/Egrodo/DiscordPlugins/blob/master/GameActivityToggle.plugin.js
 */
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/

const enabledIcon =
  '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" width="20" height="20" xml:space="preserve"><style type="text/css">.st0{fill:#B9BBBE;}</style><g><path class="st0" d="M20.8,7.7c-0.6-1.2-1.8-1.9-3.1-1.9H6.3C5,5.7,3.8,6.5,3.2,7.6l-2.8,5.8c0,0,0,0,0,0C-0.3,15.1,0.4,17,2,17.8L2.3,18C4,18.7,5.9,18,6.7,16.4l0.1-0.3c0.3-0.6,0.9-1,1.6-1h7.1c0.7,0,1.3,0.4,1.6,1l0.1,0.3c0.8,1.6,2.7,2.4,4.4,1.6l0.3-0.1c1.6-0.8,2.3-2.7,1.6-4.4L20.8,7.7z M8.6,10.5c0,0.2-0.2,0.4-0.4,0.4H7.3c-0.2,0-0.4,0.2-0.4,0.4v0.9c0,0.2-0.2,0.4-0.4,0.4H5.7c-0.2,0-0.4-0.2-0.4-0.4v-0.9c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H4.1c-0.2,0-0.4-0.2-0.4-0.4V9.7c0-0.2,0.2-0.4,0.4-0.4h0.9c0.2,0,0.4-0.2,0.4-0.4c0,0,0,0,0,0V8.1c0-0.2,0.2-0.4,0.4-0.4h0.8C6.8,7.7,7,7.9,7,8.1V9c0,0.2,0.2,0.4,0.4,0.4h0.9c0.2,0,0.3,0.2,0.3,0.4V10.5z M15.6,10.9c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8c0,0,0,0,0,0c0.4,0,0.8,0.3,0.8,0.8C16.4,10.5,16.1,10.9,15.6,10.9z M17.2,7.7C17.2,7.7,17.2,7.7,17.2,7.7c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8S16.8,7.7,17.2,7.7z M18,11.7L18,11.7C18,11.7,18,11.7,18,11.7c0,0.4-0.3,0.8-0.8,0.8c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8c0,0,0,0,0,0C17.7,10.9,18,11.3,18,11.7C18,11.7,18,11.7,18,11.7L18,11.7C18,11.7,18,11.7,18,11.7C18,11.7,18,11.7,18,11.7z M18.9,10.9c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8c0,0,0,0,0,0c0.4,0,0.8,0.3,0.8,0.8C19.6,10.5,19.3,10.9,18.9,10.9z"/><polygon points="19.3,11.2 19.3,11.2 19.3,11.2 "/><polygon points="19.3,11.2 19.3,11.2 19.3,11.2 "/></g></svg>';
const enabledIconHover =
  '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" width="20" height="20" xml:space="preserve"><style type="text/css">.st0{fill:#dcddde;}</style><g><path class="st0" d="M20.8,7.7c-0.6-1.2-1.8-1.9-3.1-1.9H6.3C5,5.7,3.8,6.5,3.2,7.6l-2.8,5.8c0,0,0,0,0,0C-0.3,15.1,0.4,17,2,17.8L2.3,18C4,18.7,5.9,18,6.7,16.4l0.1-0.3c0.3-0.6,0.9-1,1.6-1h7.1c0.7,0,1.3,0.4,1.6,1l0.1,0.3c0.8,1.6,2.7,2.4,4.4,1.6l0.3-0.1c1.6-0.8,2.3-2.7,1.6-4.4L20.8,7.7z M8.6,10.5c0,0.2-0.2,0.4-0.4,0.4H7.3c-0.2,0-0.4,0.2-0.4,0.4v0.9c0,0.2-0.2,0.4-0.4,0.4H5.7c-0.2,0-0.4-0.2-0.4-0.4v-0.9c0-0.2-0.2-0.4-0.4-0.4c0,0,0,0,0,0H4.1c-0.2,0-0.4-0.2-0.4-0.4V9.7c0-0.2,0.2-0.4,0.4-0.4h0.9c0.2,0,0.4-0.2,0.4-0.4c0,0,0,0,0,0V8.1c0-0.2,0.2-0.4,0.4-0.4h0.8C6.8,7.7,7,7.9,7,8.1V9c0,0.2,0.2,0.4,0.4,0.4h0.9c0.2,0,0.3,0.2,0.3,0.4V10.5z M15.6,10.9c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8c0,0,0,0,0,0c0.4,0,0.8,0.3,0.8,0.8C16.4,10.5,16.1,10.9,15.6,10.9z M17.2,7.7C17.2,7.7,17.2,7.7,17.2,7.7c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.4-0.8-0.8S16.8,7.7,17.2,7.7z M18,11.7L18,11.7C18,11.7,18,11.7,18,11.7c0,0.4-0.3,0.8-0.8,0.8c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8c0,0,0,0,0,0C17.7,10.9,18,11.3,18,11.7C18,11.7,18,11.7,18,11.7L18,11.7C18,11.7,18,11.7,18,11.7C18,11.7,18,11.7,18,11.7z M18.9,10.9c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8c0,0,0,0,0,0c0.4,0,0.8,0.3,0.8,0.8C19.6,10.5,19.3,10.9,18.9,10.9z"/><polygon points="19.3,11.2 19.3,11.2 19.3,11.2 "/><polygon points="19.3,11.2 19.3,11.2 19.3,11.2 "/></g></svg>';

const disabledIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" width="20" height="20" xml:space="preserve"><style type="text/css">.st0{fill:#B9BBBE;}.st1{fill:#F04747;}</style><g><path class="st0" d="M17.7,5.7h-0.8L4.4,18.1c1-0.2,1.9-0.8,2.3-1.8l0.1-0.3c0.3-0.6,0.9-1,1.6-1h1.9l4.7-4.6v0c-0.1-0.1-0.1-0.2-0.1-0.4c0-0.4,0.3-0.8,0.8-0.8c0,0,0,0,0,0c0.1,0,0.2,0,0.3,0.1l0.5-0.5c-0.1-0.1-0.1-0.2-0.1-0.4c0-0.4,0.3-0.8,0.8-0.8c0.1,0,0.3,0,0.4,0.1l1.7-1.7C18.8,5.8,18.3,5.7,17.7,5.7z M23.5,13.4l-2.8-5.8c0,0,0-0.1-0.1-0.1l-1.8,1.8c0.4,0,0.7,0.4,0.7,0.8c0,0.4-0.3,0.8-0.8,0.8c-0.4,0-0.8-0.3-0.8-0.7l-0.8,0.8c0.4,0,0.7,0.4,0.7,0.8c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.3-0.8-0.7L13.1,15h2.4c0.7,0,1.3,0.4,1.6,1l0.1,0.3c0.8,1.6,2.7,2.3,4.4,1.6l0.3-0.1C23.6,17,24.3,15,23.5,13.4z M6.3,5.7C5,5.7,3.8,6.4,3.3,7.6l-2.8,5.8c0,0,0,0,0,0C-0.3,15,0.4,16.9,2,17.7L14,5.7H6.3z M8.2,10.8H7.3c-0.2,0-0.4,0.2-0.4,0.3v0.9c0,0.2-0.2,0.3-0.3,0.3H5.7c-0.2,0-0.3-0.2-0.3-0.3v-0.9c0-0.2-0.2-0.3-0.4-0.3H4.1c-0.2,0-0.4-0.2-0.4-0.4V9.6c0-0.2,0.2-0.4,0.4-0.4H5c0.2,0,0.4-0.2,0.4-0.4V8c0-0.2,0.2-0.4,0.4-0.4h0.8C6.8,7.7,7,7.8,7,8v0.9c0,0.2,0.2,0.4,0.4,0.4h0.9c0.2,0,0.3,0.2,0.3,0.4v0.8C8.6,10.7,8.4,10.8,8.2,10.8z"/><polygon points="19.3,11.1 19.3,11.1 19.3,11.1 "/><polygon points="19.3,11.2 19.3,11.1 19.3,11.1 "/></g><polygon class="st1" points="22.6,2.7 22.6,2.8 19.3,6.1 16,9.3 16,9.4 15,10.4 15,10.4 10.3,15 2.8,22.5 1.4,21.1 21.2,1.3 "/></svg>';
const disabledIconHover =
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" width="20" height="20" xml:space="preserve"><style type="text/css">.st0{fill:#dcddde;}.st1{fill:#F04747;}</style><g><path class="st0" d="M17.7,5.7h-0.8L4.4,18.1c1-0.2,1.9-0.8,2.3-1.8l0.1-0.3c0.3-0.6,0.9-1,1.6-1h1.9l4.7-4.6v0c-0.1-0.1-0.1-0.2-0.1-0.4c0-0.4,0.3-0.8,0.8-0.8c0,0,0,0,0,0c0.1,0,0.2,0,0.3,0.1l0.5-0.5c-0.1-0.1-0.1-0.2-0.1-0.4c0-0.4,0.3-0.8,0.8-0.8c0.1,0,0.3,0,0.4,0.1l1.7-1.7C18.8,5.8,18.3,5.7,17.7,5.7z M23.5,13.4l-2.8-5.8c0,0,0-0.1-0.1-0.1l-1.8,1.8c0.4,0,0.7,0.4,0.7,0.8c0,0.4-0.3,0.8-0.8,0.8c-0.4,0-0.8-0.3-0.8-0.7l-0.8,0.8c0.4,0,0.7,0.4,0.7,0.8c0,0.4-0.4,0.8-0.8,0.8c-0.4,0-0.8-0.3-0.8-0.7L13.1,15h2.4c0.7,0,1.3,0.4,1.6,1l0.1,0.3c0.8,1.6,2.7,2.3,4.4,1.6l0.3-0.1C23.6,17,24.3,15,23.5,13.4z M6.3,5.7C5,5.7,3.8,6.4,3.3,7.6l-2.8,5.8c0,0,0,0,0,0C-0.3,15,0.4,16.9,2,17.7L14,5.7H6.3z M8.2,10.8H7.3c-0.2,0-0.4,0.2-0.4,0.3v0.9c0,0.2-0.2,0.3-0.3,0.3H5.7c-0.2,0-0.3-0.2-0.3-0.3v-0.9c0-0.2-0.2-0.3-0.4-0.3H4.1c-0.2,0-0.4-0.2-0.4-0.4V9.6c0-0.2,0.2-0.4,0.4-0.4H5c0.2,0,0.4-0.2,0.4-0.4V8c0-0.2,0.2-0.4,0.4-0.4h0.8C6.8,7.7,7,7.8,7,8v0.9c0,0.2,0.2,0.4,0.4,0.4h0.9c0.2,0,0.3,0.2,0.3,0.4v0.8C8.6,10.7,8.4,10.8,8.2,10.8z"/><polygon points="19.3,11.1 19.3,11.1 19.3,11.1 "/><polygon points="19.3,11.2 19.3,11.1 19.3,11.1 "/></g><polygon class="st1" points="22.6,2.7 22.6,2.8 19.3,6.1 16,9.3 16,9.4 15,10.4 15,10.4 10.3,15 2.8,22.5 1.4,21.1 21.2,1.3 "/></svg>';

class GameActivityToggle {
  btnReference = null;
  tooltipReference = null;
  soundsReference = null;
  observer = null;
  gameActivity = true;

  constructor() {
    this.onToggle = this.onToggle.bind(this);
    this.onButtonMouseOut = this.onButtonMouseOut.bind(this);
    this.onButtonMouseOver = this.onButtonMouseOver.bind(this);
    this.checkForRemoval = this.checkForRemoval.bind(this);
    this.checkForChange = this.checkForChange.bind(this);
  }

  getName() {
    return 'Game Activity Toggle';
  }

  getDescription() {
    return 'Simple plugin that adds a "Display Game Activity" button on the main toolbar so you can toggle it easier.';
  }

  getVersion() {
    return '1.2.1';
  }

  getAuthor() {
    return 'egrodo';
  }

  load() {
    // Not required, but if the user has ZLibrary installed then support auto update.
    if (window.ZLibrary) {
      ZLibrary.PluginUpdater.checkForUpdate(
        this.getName(),
        this.getVersion(),
        'https://raw.githubusercontent.com/Egrodo/DiscordPlugins/master/GameActivityToggle.plugin.js',
      );
    }
  }

  start() {
    // On start check what game activity is currently set to.
    this.gameActivity = BdApi.findModuleByProps('guildPositions').showCurrentGame;
    this.soundsReference = BdApi.findModuleByProps('playSound');

    // Create our DOM elements
    this.createButton();
    this.createTooltip();

    // Watch for change
    BdApi.findModuleByProps('guildPositions').addChangeListener(this.checkForChange);
  }

  createButton() {
    // Use flexMarginReset prop to find the selector for the taskbar row.
    const selector = (BdApi.findModuleByProps('flexMarginReset', 'flex').flex || '').split(' ')[0];
    if (!selector) {
      console.error('GameActivityToggle failed to start up: Selector not found?');
      return;
    }

    // If there are multiple elements found with this selector then the user is most likely in a call. Use the appropriate one
    const rows = document.querySelectorAll(`.${selector}`);
    let row;
    console.log(rows);
    if (rows.length) {
      // Find the correct row
      for (let i = 0; i < rows.length; ++i) {
        if (rows[i].firstElementChild && rows[i].firstElementChild.getAttribute('aria-label') === 'Mute') {
          row = rows[i];
          break;
        }
      }
    } else {
      row = rows[0];
    }

    this.btnReference = row.firstElementChild.cloneNode(true);
    this.btnReference.firstElementChild.innerHTML = this.gameActivity ? enabledIcon : disabledIcon;
    this.btnReference.firstElementChild.style.pointerEvents = 'none'; // Ignore pointer events to fix bug that was causing repeated clicks to be ignored.
    this.btnReference.id = 'GameActivityToggleBtn';
    this.btnReference.setAttribute('aria-label', 'Toggle Game Activity');
    this.btnReference.setAttribute('aria-checked', `${this.gameActivity ? 'true' : 'false'}`);

    this.btnReference.addEventListener('click', this.onToggle);
    this.btnReference.addEventListener('mouseenter', this.onButtonMouseOver);
    this.btnReference.addEventListener('mouseleave', this.onButtonMouseOut);
    row.prepend(this.btnReference);

    // Observe changes on the row to watch for our element being overwritten.
    if (!this.observer) {
      this.observer = new MutationObserver(this.checkForRemoval);
      this.observer.observe(row, { attributes: false, childList: true, subtree: false });
    }
  }

  createTooltip() {
    // Also setup my recreated tooltip that uses Discord's classes.
    const tooltipClasses = BdApi.findModuleByProps('tooltipBottom');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.style.visibility = 'hidden';
    wrapperDiv.style.position = 'absolute';
    wrapperDiv.style.zIndex = '10000';
    wrapperDiv.style.pointerEvents = 'none';
    this.tooltipReference = wrapperDiv;

    const textWrapper = document.createElement('div');
    textWrapper.className = [tooltipClasses.tooltip, tooltipClasses.tooltipTop, tooltipClasses.tooltipBlack].join(' ');
    textWrapper.innerText = `Turn ${this.gameActivity ? 'off' : 'on'} game activity`;

    const bottomArrow = document.createElement('div');
    bottomArrow.className = tooltipClasses.tooltipPointer;

    textWrapper.prepend(bottomArrow);
    wrapperDiv.appendChild(textWrapper);
    document.body.appendChild(wrapperDiv);
  }

  onToggle() {
    this.gameActivity = !this.gameActivity;
    BdApi.findModuleByProps('updateRemoteSettings').updateLocalSettings({ showCurrentGame: this.gameActivity });
    BdApi.findModuleByProps('updateRemoteSettings').updateRemoteSettings({ showCurrentGame: this.gameActivity });
    this.btnReference.firstElementChild.innerHTML = this.gameActivity ? enabledIcon : disabledIcon;

    // In order to preserve the tooltipPointer but also change the message we have to do this
    const innerTooltipHTML = this.tooltipReference.firstElementChild.innerHTML.split('Turn');
    this.tooltipReference.firstElementChild.innerHTML = `${innerTooltipHTML[0]} Turn ${
      this.gameActivity ? 'off' : 'on'
    } game activity`;

    this.btnReference.setAttribute('aria-checked', `${this.gameActivity ? 'true' : 'false'}`);

    // Play the mute / unmute sound on toggle.
    if (this.gameActivity) {
      this.soundsReference.playSound('unmute', 0.4);
    } else this.soundsReference.playSound('mute', 0.4);
  }

  // On mouse over swap icons to highlight and display tooltip in correct position.
  onButtonMouseOver({ target }) {
    this.btnReference.firstElementChild.innerHTML = this.gameActivity ? enabledIconHover : disabledIconHover;

    const { x, y } = target.getBoundingClientRect();
    const tooltipXPos = x + target.clientWidth / 2 - this.tooltipReference.offsetWidth / 2;
    const tooltipYPos = y - target.clientHeight - 8; // 8 being a constant amount of space to hover above the btn.

    this.tooltipReference.style.left = `${tooltipXPos}px`;
    this.tooltipReference.style.visibility = 'visible';
    this.tooltipReference.style.top = `${tooltipYPos}px`;

    this.tooltipReference.visibility = 'visible';
  }

  onButtonMouseOut() {
    this.btnReference.firstElementChild.innerHTML = this.gameActivity ? enabledIcon : disabledIcon;
    this.tooltipReference.style.visibility = 'hidden';
  }

  // Certain UI actions can result in the row being re-rendered and the button removed. Watch the row and re-add the button when necessary.
  checkForRemoval() {
    if (!document.getElementById('GameActivityToggleBtn')) {
      this.createButton();
    }
  }

  // We need to check for the user toggling game activity in the actual settings menu as well, because we have no event for that.
  checkForChange() {
    if (this.gameActivity !== BdApi.findModuleByProps('guildPositions').showCurrentGame) {
      this.gameActivity = BdApi.findModuleByProps('guildPositions').showCurrentGame;

      this.btnReference.firstElementChild.innerHTML = this.gameActivity ? enabledIcon : disabledIcon;

      const innerTooltipHTML = this.tooltipReference.firstElementChild.innerHTML.split('Turn');
      this.tooltipReference.firstElementChild.innerHTML = `${innerTooltipHTML[0]} Turn ${
        this.gameActivity ? 'off' : 'on'
      } game activity`;

      this.btnReference.setAttribute('aria-checked', `${this.gameActivity ? 'true' : 'false'}`);
      this.btnReference.addEventListener('click', this.onToggle);
    }
  }

  stop() {
    this.observer.disconnect();
    this.btnReference.removeEventListener('mouseenter', this.onButtonMouseOver);
    this.btnReference.removeEventListener('mouseleave', this.onButtonMouseOut);
    this.btnReference.parentNode.removeChild(this.btnReference);
    this.tooltipReference.parentNode.removeChild(this.tooltipReference);
  }
}
