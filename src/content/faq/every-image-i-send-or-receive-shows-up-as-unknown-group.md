---
question: "Every image I send or receive shows up as 'Unknown group event' on my device, am I doing something wrong?"
category: issues
order: 4
---
<p>No, you are not doing anything wrong! This is actually a bug with macOS Mojave 10.14 that has not
    been patched by Apple (this bug may be present on other macOS versions as well). Follow these steps to potentially fix the issue:</p>
<p><strong>WARNING: </strong>This process will erase all your Mac's Messages history!</p>
<p>
    1. Sign out from iMessage from your Mac.<br />
    2. Finder -> Go (top bar) -> Library (Hold "Option" key for this to appear)<br />
    3. Locate and open "Messages" folder <br />
    4. Delete every file that *ends with* .db in the name - if the has an additional extension, you should try this process first WITHOUT deleting those files.<br />
    5. Restart your computer<br />
    6. Open Messages and sign into iMessage again<br />
    7. Delete the BlueBubbles app from your phone.<br />
    8. Reboot your phone.<br />
    9. Re-install the BlueBubbles macOS Server and sign back into your server.<br />
</p>
