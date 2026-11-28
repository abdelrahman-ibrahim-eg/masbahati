# مسبحتي (Masbahati)

مسبحة إلكترونية تعمل من المتصفح، بتحفظ العدّ على نفس الجهاز، وتشتغل من غير إنترنت بعد أول فتح.
نية صدقة جارية.

An offline-first tasbih (dhikr counter) web app. Plain HTML, CSS and JavaScript. No build step, no external requests.

Live: https://masbahati-offline.pages.dev

## Features
- Tap counter with round targets, undo, new round
- Counts saved on the device (IndexedDB), works offline through a service worker
- Light (default) and dark themes, installable as a home-screen app
- Vibration on tap where the browser supports it (not supported in Safari on iPhone)

## Known limits
- Data stays in the browser on one device. Clearing browser data can erase it.
- Tested offline in desktop Chrome. Real-phone behavior (install, haptics) is still being checked.
- Reminders only work while the page is open.

## Run
Serve the folder over HTTPS or localhost, for example `python3 -m http.server`, and open it.

## Sources and licenses
See SOURCES.md. Quran text CC BY 3.0 (Tanzil), adhkar CC BY 4.0 (OpenDua) and MIT (Seen Arabic). Human review is still needed.

## License
Not chosen yet.

Mushaf layout: line breaks from Quran.com API (see SOURCES.md).
