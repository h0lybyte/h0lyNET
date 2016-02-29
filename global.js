var get_req;
var post_req;
var element;
var elements;

var loaderTimeout = false;

if (navigator.appName == "Netscape") {
    document.write("<style type='text/css'>body {overflow-y:scroll;}<\/style>");
}

function doNothing() {}

var get_req;
var post_req;
var element;

function Scale(image) {
	if (!image.naturalWidth || image.naturalWidth > image.width) {
		Preview(image);
	}
}

function Scale_small(image, size) {
	if (image.width > size) {
		image.height = Math.round(((size) / image.width) * image.height);
		image.width = size;
		image.title = "Preview";
		image.setAttribute("onclick", "Preview(this);");
	}
}

function Preview(image) {
	$j('#lightbox').show().html('<a onclick="Return();"><img src="' + image.src + '" /></a>');
	$j('#curtain').show();
}

function Return() {
	$j('#lightbox').hide();
	$j('#curtain').hide();
	$j('#lightbox').html("");
}

/*****************************************************************
 * super awesome Bookmark() function that totally owns any other *
 * What.CD & other Gazelle-based trackers ain't got nothin on me *
 *****************************************************************/
function Bookmark() {
	if ($j('#qlBox').length) return;
	var fadeForm = function() {
		$j('#qlBox,#qlDimmer').fadeOut(200, function() {
			$j(this).remove()
		})
	};

	// insert form
	$j('body').append(
		'<div id="qlDimmer" style="z-index: 9000; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #000000; opacity: 0;"></div>' +
		'<div id="qlBox" style="z-index: 9001; position: fixed; top: 50%; left: 50%; display: none;">' +
		'<form id="bookmark_popup" method="post">' +
		'<input type="hidden" name="uri" value="' + encodeURI(document.location.href) + '" />' +
		'<table style="width: 300px;">' +
		'<tr>' +
		'<td class="colhead">Add Quicklink</td>' +
		'</tr>' +
		'<tr>' +
		'<td>' +
		'<b>Name:</b>&nbsp;&nbsp;&nbsp;' +
		'<input type="text" name="title" style="width: 200px;" value="' + document.title.substr(0, document.title.lastIndexOf(' :: ')) + '" />' +
		'</td>' +
		'</tr>' +
		'<tr>' +
		'<td class="center" valign="top"><input id="qlSave" type="button" value="Add" /><input id="qlCancel" type="button" value="Cancel" /></td>' +
		'</tr>' +
		'</table>' +
		'</form>' +
		'</div>');

	// center form & fade in
	$j('#qlDimmer').animate({
		opacity: 0.8
	}, 200);
	$j('#qlBox').css({
		marginTop: '-' + ($j('#qlBox').outerHeight() / 2) + 'px',
		marginLeft: '-' + ($j('#qlBox').outerWidth() / 2) + 'px'
	}).fadeIn(200);

	// "Save" button handler
	$j('#qlBox #qlSave').click(function() {
		$j(this).attr('disabled', 'disabled');
		$j.post('ajax.php?action=quicklinks', $j('#bookmark_popup').serialize(), function(r) {
			$j('#qlBox').fadeOut(200, function() {
				// show "Saved quicklink."
				$j('#qlBox')
					.html((r == '1') ? 'Saved quicklink.' : 'Error saving quicklink.<br />Please try again later.')
					.css({
						color: '#999',
						marginTop: '-' + ($j('#qlBox').outerHeight() / 2) + 'px',
						marginLeft: '-' + ($j('#qlBox').outerWidth() / 2) + 'px'
					})
					.fadeIn(200);
				// pause, then disappear!
				setTimeout(fadeForm, 1500);
			});
		});
	});

	// "Cancel" button handler
	$j('#qlBox #qlCancel').click(fadeForm);
}

function toggleChecks(formElem, masterElem) { // only used in inbox.php
	if (masterElem.checked) {
		checked = true;
	} else {
		checked = false;
	}
	for (s = 0; s < document.getElementById(formElem).elements.length; s++) {
		if (document.getElementById(formElem).elements[s].type == "checkbox") {
			document.getElementById(formElem).elements[s].checked = checked;
		}
	}
}

function checkAll(numcheck) { // only used in notice.php
	var i = 1;
	for (i = 1; i <= numcheck; i++) {
		if (!($j("#notify_users" + i).checked)) {
			$j("#notify_users" + i).attr("checked", "true");
		} else {
			$j("#notify_users" + i).attr("checked", "false");
		}
	}
}

function prompt_insert(prom, open, close) {
	var p = prompt(prom);
	open = open + p + close;
	insert_text(open, '');

}

function insert_text(open, close) {
	// do not add anything if quickreplytext is hidden (doing preview)
	if (document.getElementById('quickreplytext') != null) {
		if (document.getElementById('quickreplytext').style.display == 'none') {
			return;
		}
	}
	var quick = document.getElementById('quickpost');

	// Moz support
	if (quick.selectionStart || quick.selectionStart == '0') {
		var startPos = quick.selectionStart;
		var endPos = quick.selectionEnd;
		quick.value = quick.value.substring(0, startPos) + open + quick.value.substring(startPos, endPos) + close + quick.value.substring(endPos, quick.value.length);
		quick.selectionStart = quick.selectionEnd = endPos + open.length + close.length;
		quick.focus();
		if (close.length == 0)
			quick.setSelectionRange(startPos + open.length, startPos + open.length);
		else
			quick.setSelectionRange(startPos + open.length, endPos + open.length);
	}
	// IE support
	else if (document.selection && document.selection.createRange) {
		quick.focus();
		sel = document.selection.createRange();
		sel.text = open + sel.text + close;
		if (close.length != 0) {
			sel.move("character", -close.length);
			sel.select();
		}
		quick.focus();
	}

	// Fallback support for other browsers
	else {
		quick.value += open;
		quick.focus();
		quick.value += close;
	}
}

function hideLoader() {
	$j('.curtain').hide();
	$j('div[id^="loader_"]').hide().unbind('click');
	try {
		clearTimeout(loaderTimeout);
	} catch (e) {}
}

function showLoader(status) {
	$j('#loader').hide();
	$j('#loader_' + status).show().click(function() {
		hideLoader()
	});
	loaderTimeout = setTimeout('hideLoader()', 3000);
}

function HookScreenshots() {
	$j('a.screenshot').unbind('click').click(function() {
		Preview($j(this).children().get(0));
		$j('#lightbox').html('<a href="' + this.href + '">[View Page]</a><br /><a onclick="Return();"><img src="' + $j(this).children('input[name="fullsize"]').attr('value') + '" /></a>');
		$j('#lightbox').fadeIn(200);
		$j('#curtain').fadeIn(200);
		return false;
	});
}

function hideAchievement(id) {
	$j('#ach_' + id).animate({
		opacity: 0.5
	}, 200);
	$j.get('ajax.php', {
		'action': 'hide_ach',
		'id': id
	}, function(response) {
		if (response == 1) {
			// update count
			var count = $j('#achievementCounter').text() - 1;
			$j('#achievementCounter').text(count);
			// hide achievement box
			$j(count ? '#ach_' + id : '#achievementBar').animate({
				opacity: 0,
				height: 0,
				marginTop: 0,
				marginBottom: 0,
				paddingTop: 0,
				paddingBottom: 0
			}, 200, function() {
				$j(this).remove()
			});
		}
	});
}

//stays crunchy, even in milk!
function capncrunch(trigger, thetarget, expand, crunch, speed, image, hideout) {
	if (!hideout && speed) {
		if ($j(thetarget).is(':hidden')) {
			$j(thetarget).fadeIn(speed);
		} else {
			$j(thetarget).fadeOut(speed);
		}
	} else if (!hideout) {
		$j(thetarget).toggle();
	}
	if (image == 1) {
		var src = ($j(trigger).attr("src") == expand) ? crunch : expand;
		$j(trigger).attr("src", src);
	} else if (image == 2) {
		var sclass = ($j(trigger).attr("class") == expand) ? crunch : expand;
		$j(trigger).attr("class", sclass);
	} else {
		$j(trigger).text($j(trigger).text() == expand ? crunch : expand);
	}
	if (hideout == 1 && speed) {
		$j(trigger).addClass(expand);
		if ($j(thetarget).is(':hidden')) {
			$j(thetarget).fadeIn(speed);
		} else {
			$j(thetarget).fadeOut(speed);
			$j(trigger).removeClass(expand);
		}

		$j(document).mouseup(function(e) {
			if ($j(e.target).parent(trigger).length == 0) {
				$j(thetarget).fadeOut(speed);
				$j(trigger).removeClass(expand);
			}
		});
	}
	return false;
}



jQuery(function($) {
	/********************
	 * header dropdowns *
	 ********************/
	$('li.navmenu').removeClass('nojs');
	$('.dropit').addClass('clickmenu').click(function() {
		if ($(this).parent().find('ul.subnav').is(':hidden')) {
			$('ul.subnav').hide();
			$('li.navmenu').removeClass('selected');
			$(this).parent().addClass('selected').find('ul.subnav').show();
		} else {
			$(this).parent().removeClass('selected').find('ul.subnav').hide();
		}
		return false;
	});
	$('ul.subnav').click(function(e) {
		e.stopPropagation();
	});
	$(document).click(function() {
		$('ul.subnav').hide();
		$('li.navmenu').removeClass('selected');
	});

	/**************
	 * derefer.it *
	 **************/
	var protected_links = ['kbve.com', 'www.kbve.com'];
	if (window.location.protocol != 'https:') { // only do our magic when not SSL
		// add current hostname to the list if it isn't there already
		var hostname = window.location.hostname;
		if (protected_links.length > 0) {
			if (!$.inArray(hostname, protected_links)) {
				protected_links.push(hostname);
			}
		} else {
			protected_links = hostname;
		}

		// do our magic
		$("a[href^='http']:not([href^='https://derefer.it/'])").each(function() {
			var href = this.href,
				matched = false;
			for (var i in protected_links) {
				if (href.match(protected_links[i])) {
					matched = true;
					break;
				}
			}
			if (!matched) {
				this.href = 'https://derefer.it/' + href;
				this.rel = 'external';
			}
		});
	}

	/************
	 * spoilers *
	 ************/
	$(document).on('click', '.spoilerButton', function() {
		var button = $(this);
		var hide = $(this).parent().hasClass('hideContainer');
		button.siblings('.spoiler').each(function() {
			var spoiler = $(this);

			// unhide any hidden images (we need to do this at some point)
			// and we may as well do it even if we're collapsing the spoiler
			// because wat
			spoiler.find('.bbcode_img_spoilered').each(function() {
				var $img = $(this);
				$img.removeClass('bbcode_img_spoilered');
				$img.attr('src', $img.attr('data-src'));
			});

			// now unhide it
			if (spoiler.is(':hidden')) {
				if (hide) {
					button.attr('value', button.attr('value').replace(/^Show/, 'Hide'));
				} else {
					button.attr('value', 'Hide spoiler');
				}
				spoiler.slideDown(500);
			} else {
				if (hide) {
					button.attr('value', button.attr('value').replace(/^Hide/, 'Show'));
				} else {
					button.attr('value', 'Show spoiler');
				}
				spoiler.slideUp(500);
			}
		});
	});

	/************
	 * fancybox *
	 ************/
	// wrap img.scaledImg elements in <a> so we can fancybox them
	// only if they are not already contained within anchors
	$('img.scaledImg').each(function() {
		if (!$(this).parents('a').length) {
			$(this).wrap($('<a />', {
				class: 'scaledImg',
				href: $(this).attr('src')
			}));
		}
	});

	// hook a.scaledImg for left-click so we can manually run fancybox
	// we clone the image first because fancybox will remove it from the DOM
	$('a.scaledImg').click(function(e) {
		// only on left click
		if (e.which != 1) return;

		// delay fancybox by a frame in case the clone hasn't yet been fully initialized
		var cloneFn = function(img) {
			window.setTimeout(function() {
				$.fancybox($(img), {
					overlayColor: '#000',
					overlayOpacity: 0.8,
					titleShow: false,
				});
			}, 0);
		};

		// clone the image and remove .scaledImg
		var clone = $(this).children('img.scaledImg').clone().removeClass('scaledImg');

		// the anchor does not contain any image with scaledImg class... construct an image from the anchor's href
		if (clone.length == 0) {
			clone = new Image();
			clone.src = $(this).attr('href');
			clone.onload = function() {
				cloneFn($(clone));
			}
		}
		// the anchor does contain images with scaledImg class... just fire the regular function
		else {
			cloneFn(clone);
		}

		// prevent hyperlink from activating
		return false;
	});

	var ABDialog = function(title, content, closable) {
		// any active dialogs?
		if (window.activeDialog) window.activeDialog.remove();

		// build the dialog
		var $cover = $("<div class=\"cover\" style=\"display:none\"></div>");
		var $dialog = $("<div class=\"dialog box\"><div class=\"dialogWrapper\"><div class=\"head\"><span></span><a href=\"\" class=\"closer\">×</a></div><div class=\"content pad\"></div><div class=\"buttons no-buttons\"></div></div></div>");
		var $title = $dialog.find('div.head span');
		var $content = $dialog.find('div.content');
		var $closer = $dialog.find('.closer');
		var $wrapper = $dialog.find('.dialogWrapper');
		var $buttons = $dialog.find('.buttons');
		$dialog.appendTo($cover);
		$cover.appendTo('body');

		var isClosable = true;
		var dialog = this;

		$closer.click(function(e) {
			if (e.which != 1) return;
			if (!isClosable) return;
			e.preventDefault();
			dialog.remove();
		});

		this.remove = function() {
			if (window.activeDialog !== this) return;
			$cover.fadeOut(400, function() {
				$cover.remove();
			});
		}

		this.show = function() {
			if (window.activeDialog) window.activeDialog.remove();
			window.activeDialog = this;
			$cover.fadeIn(function() {
				dialog.rescale();
			});
		};
		this.rescale = function() {
			var contentHeight = $wrapper.outerHeight();
			$dialog.height(contentHeight);
		};

		this.title = function(newTitle) {
			if (!newTitle) return $title.html();
			$title.html(newTitle);
			this.rescale();
			return this;
		};
		this.content = function(newContent) {
			if (!newContent) return $content.html();
			$content.html(newContent);
			this.rescale();
			return this;
		};
		this.closable = function(newClosable) {
			isClosable = newClosable;
			if (!isClosable)
				$closer.hide();
			else
				$closer.show();
		};
		this.buttons = function(newButtons) {
			// this is complex, but I want an array of buttons to show
			$buttons.empty();

			for (var i = 0; i < newButtons.length; i++) {
				var newButton = newButtons[i];
				var $newButton = $("<input type=\"button\" />");
				$newButton.attr('value', newButton.label);
				$newButton.click(newButton.do);
				$newButton.attr('class', newButton.class);
				$newButton.appendTo($buttons);
			}
			if (newButtons.length) {
				$buttons.addClass('has-buttons').removeClass('no-buttons');
			} else {
				$buttons.removeClass('has-buttons').addClass('no-buttons');
			}

			this.rescale();
		};

		if (title)
			this.title(title);
		if (content)
			this.content(content);
		if (closable === true || closable === false)
			this.closable(closable);
		this.rescale();
	};

	/*************************
	 * magical confirm links *
	 *************************/
	$(".performConfirm").click(function(e) {
		if (e.which != 1) return; // left click
		e.preventDefault();

		var $this = $(this);

		// go go dialog
		var dialog = new ABDialog("One moment...", "Loading...");
		dialog.show();

		var targetUrl = $this.attr('href');
		if (targetUrl.indexOf('?') === -1) {
			targetUrl += '?';
		}
		targetUrl = targetUrl.substring(0, targetUrl.indexOf('?') + 1) + 'fetch_confirm=1&' + targetUrl.substring(targetUrl.indexOf('?') + 1);

		// make an ajax request
		$.ajax({
			url: targetUrl,
			dataType: 'json'
		}).done(function(data) {
			dialog.title(data.title).content(data.content).buttons([{
				"label": "OK",
				"do": function() {
					console.log('Going ahead.');
					// make a form
					var f = $("<form method=\"POST\"><input type=\"hidden\" name=\"auth\" value=\"\"></form>");
					f.appendTo(document.body);
					f.find('input').attr('value', CURRENT_USER.authKey);
					f.attr('action', $this.attr('href'));
					f.submit();
				},
				"class": "btn-primary"
			}, {
				"label": "Cancel",
				"do": function() {
					console.log('Cancelling.');
					dialog.remove();
				},
				"class": "btn-cancel right"
			}]);
		});
	});

	$(".confirmForm").submit(function(e) {
		var myForm = this;
		if (myForm.authed)
			return true;
		var $this = $(this);

		e.preventDefault();

		// go go dialog
		var dialog = new ABDialog("One moment...", "Loading...");
		dialog.show();

		var targetUrl = $this.attr('action');
		if (targetUrl.indexOf('?') === -1) {
			targetUrl += '?';
		}
		targetUrl = targetUrl.substring(0, targetUrl.indexOf('?') + 1) + 'fetch_confirm=1&' + targetUrl.substring(targetUrl.indexOf('?') + 1);

		var formMethod = $this.attr('method');
		var formData = {};

		$this.find('input').each(function() {
			var k = $(this).attr('name');
			if (!k) return;
			var v = $(this).val();
			formData[k] = v;
		});
		console.log(this, formData);

		// make an ajax request
		$.ajax({
			type: formMethod,
			data: formData,
			url: targetUrl,
			dataType: 'json'
		}).done(function(data) {
			dialog.title(data.title).content(data.content).buttons([{
				"label": "Go ahead!",
				"do": function() {
					console.log('Going ahead.');
					// make a form
					var authEntry = $('<input type=\"hidden\" name=\"auth\">');
					authEntry.attr('value', CURRENT_USER.authKey);
					authEntry.appendTo($this);
					myForm.authed = true;
					$this.submit();
					// var f = $("<form method=\"POST\"><input type=\"hidden\" name=\"auth\" value=\"\"></form>");
					// f.find('input').attr('value', CURRENT_USER.authKey);
					// f.attr('action', $this.attr('href'));
					// f.submit();
				},
				"class": "btn-primary"
			}, {
				"label": "Cancel",
				"do": function() {
					console.log('Cancelling.');
					dialog.remove();
				},
				"class": "btn-cancel right"
			}]);
		});
	});
});


/********************************
 * Super Awesome Video Controls *
 ********************************/
function videoEventAnimate(v, s) {
	/* Display a little overlay icon when changing states (play, pause, volume, loop, etc.) */
	var img = document.createElement('img'), d = document.createElement('div');
	img.src = s;
	$j(img).load(function(){
		d.innerHTML = img.outerHTML;
		d.style.position = 'absolute';
		d.style.opacity = 0.5;
		d.style.margin = ((((v.videoWidth>600)?600/v.videoWidth:1)*v.videoHeight - img.height) / 2) + 'px 0 0 ' + ((((v.videoWidth>600)?600:v.videoWidth) - img.width) / 2) + 'px';
		$j(v).before(d);
		$j(d).fadeOut(400, function(){ $j(this).remove(); });
	});
}

function toggleFullscreen(e) {
	/* lolstandardization */
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
		if (e.requestFullscreen) {
			e.requestFullscreen();
		} else if (e.msRequestFullscreen) {
			e.msRequestFullscreen();
		} else if (e.mozRequestFullScreen) {
			e.mozRequestFullScreen();
		} else if (e.webkitRequestFullscreen) {
			e.webkitRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
		setTimeout(function(){ e.scrollIntoView(false); }, 100); /* scroll back to the video when exiting fullscreen */
	}
}

$j(document).ready(function(){
	$j('video').each(function(a,e){
		e.__onclick = function (e) {
			/* Better not reuse onclick if what we do is 100% custom anyway, even if we 'silenced' it */
			var v = e.target;
			if (v.hasOwnProperty('lastclick')) {
				if (v.lastclick+300 > new Date().getTime()) {
					/* DOUBLECLICK */
					toggleFullscreen(v);
				}
			}
			/* SINGLECLICK (twice when doubleclicked) */
			if (v.paused) {
				if (v.currentTime === v.duration) v.currentTime = 0;
				v.play();
			} else {
				v.pause();
			}
			/* We have to set this last this time since we need to compare the current time to the last click */
			v.lastclick = new Date().getTime();
		}
	}).bind({
		'mouseenter': function (e) {
			/* For the keyhax */
			e.target.classList.add('ismouseenter');
		},

		'mouseleave': function (e) {
			/* For the keyhax */
			e.target.classList.remove('ismouseenter');
		},
		'mousedown': function (e) {
			if (e.button !== 0)
				/* We only care about the left button (0) */
				return true;
			var v = e.target;
			v.lastmousedown = new Date().getTime();
			setTimeout(function () {
				function toggleLoop() {
					if (v.loop) {
							videoEventAnimate(v, '/static/common/webm/loopoff.png');
							v.loop = false;
						} else {
							videoEventAnimate(v, '/static/common/webm/loopon.png');
							v.loop = true;
						}
				}
				if (v.hasOwnProperty('lastmouseup') && v.hasOwnProperty('lastmousedown')) {
					if (v.lastmouseup < v.lastmousedown)
						/* Mouse has been held down for 500ms+ */
						toggleLoop();
				} else {
					/* Mouse was never released before (i.e. first mouse down and still held down) */
					toggleLoop();
				}
			}, 500);
			/* We don't want the browsers handlers to do stuff to the video if we do our own thing */
			return false;
		},
		'mouseup': function (e) {
			if (e.button !== 0)
				/* We only care about the left button (0) */
				return true;
			var v = e.target;
			v.lastmouseup = new Date().getTime();
			if (v.hasOwnProperty('lastmousedown') && v.lastmouseup < v.lastmousedown+500) {
				/* Mouse was not held down for at least 500ms, it was 'clicked' */
				v.__onclick(e);
			}
			/* We don't want the browsers handlers to do stuff to the video if we do our own thing */
			return false;
		},
		'click': function (e) {
			/* Shhh it's all going to be ok, just close your eyes and sleep... (forever) */
			return false;
		},
		'play': function (e) {
			var v = e.target;
			if (!v.hasOwnProperty('isseeking') || !v.isseeking) {
				v.__played = true;
				v.__paused = false;
			}
		},
		'pause': function (e) {
			var v = e.target;
			if (!v.hasOwnProperty('isseeking') || !v.isseeking) {
				v.__played = false;
				v.__paused = true;
			}
		}
	}).bind((document.onwheel!==undefined)?'wheel':'mousewheel', function (e) {
		var v = e.target;
		if ((e.originalEvent.wheelDelta && e.originalEvent.wheelDelta > 0) || e.originalEvent.deltaY < 0) {
			/* Mousewheel was scrolled UP */
			if (e.shiftKey && v.seekable) {
				/* Shift is being held */
				var st = (e.altKey||e.metaKey)?0.05:0.20; /* Shift+Alt for extra precision */
				if (!v.paused) v.pause();
				if (v.currentTime > st) {
					v.currentTime += -st;
				} else {
					v.currentTime = 0;
				}
			} else {
				if (v.muted) {
					v.muted = false;
					v.volume = 0.05;
				} else {
					if (v.volume < 0.95) {
						v.volume += 0.05;
					} else {
						v.volume = 1;
					}
				}
			}
		} else {
			/* Mousewheel was scrolled DOWN */
			if (e.shiftKey && v.seekable) {
				/* Shift is being held */
				var st = (e.altKey||e.metaKey)?0.05:0.20; /* Shift+Alt for extra precision */
				if (!v.paused) v.pause();
				if (v.currentTime < v.duration - st) {
					v.currentTime += st;
				} else {
					v.currentTime = v.duration;
				}
			} else {
				if (v.volume > 0.05) {
					v.volume += -0.05;
				} else {
					v.volume = 0;
					v.muted = true;
				}
			}
		}
		/* We don't want the page to scroll as well */
		return false;
	});

	$j(document).bind({
		'keyup': function (e) {
			if (e.which === 16) {
				/* Shift was released. Sadly, for some reason we can't catch this on the video vent itself, so we have to hax. */
				var vids = document.getElementsByClassName('ismouseenter');
				if (vids && vids.length && vids[0].play) {
					vids[0].isseeking = false;
					if (vids[0].hasOwnProperty('__paused') && vids[0].__paused) return true;
					vids[0].play();
				}
			}
		},
		'keydown': function (e) {
			if (e.which === 16) {
				/* Conveniently pause the video as well when the user wants to seek */
				var vids = document.getElementsByClassName('ismouseenter');
				if (vids && vids.length > 0 && vids[0].pause) {
					vids[0].isseeking = true;
					vids[0].pause();
				}
			}
		}
	});
});

/* tubervideo(TM) */

