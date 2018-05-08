run:
	sh publish.sh
future:
	 jekyll serve --future --config _config.yml,_menu.yml,_locale.yml    
drafts:
	jekyll serve --future --drafts --config _config.yml,_menu.yml,_locale.yml 