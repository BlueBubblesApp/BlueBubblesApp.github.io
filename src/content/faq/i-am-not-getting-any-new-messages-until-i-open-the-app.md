---
question: "I am not getting any new messages until I open the app, what am I doing wrong?"
category: issues
order: 3
---
<p>This may be caused by the time on your Mac device being off from the actual time.</p>
<ol>
    <li><p>Make sure your Mac devices date and time and timezone is set automatically.</p></li>
    <p>If the time is set automatically then try:</p>
    <li><p>Go to <a href="https://time.is" rel="noopener">time.is</a> link on your Mac server and it will tell you if your time is not synchronized with the global clock.</p></li>
    <p>If the time is not synchronized then try:</p>
    <li><p>Open up terminal and run "ntpdate -u time.apple.com" (remove the quotes), then restart your Mac.</p></li>
</ol>
