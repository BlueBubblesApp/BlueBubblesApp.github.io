---
question: "I can connect to my server when on cellular, but not on WiFi. What am I doing wrong?"
category: issues
order: 5
---
<p>
    The first thing this could be is your device's DNS cache. With Cloudflare, domains are registered on the fly, so your device may not recognize the domain immediately.
    The solution to that is just to give it time to propogate, and your device time to flush its' DNS cache.
</p>
<p>
    The second thing this could be is any "protection" that your WiFi's service provider might offer as part of their DNS service or router.
    For instance, some offer McAfee protection, which may block your server URL from being accessed.
    The solution to this could either be to overwrite your router's DNS server, disable the protection, or whitelist your server URL.
    To check if this is the case, you can try visiting your server URL on your devices web browser. If you see the landing page, then
    the app should be able to connect. If you don't see the landing page, you may see the reason why you can't access it.
</p>
