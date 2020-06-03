---
layout: page
permalink: /
next_page: /guide/
next_page_title: Installation Guide
---

## Welcome to BlueBubbles

BlueBubbles is an open-source, community-driven ecosystem of applications used to interact with iMessage on platforms such as Android, Windows, and Linux.

### History & About Us

Over the past 5 years, there have been a few iterations of applications that allowed you to interact with iMessage via an Android phone. These applications either have been abandoned or closed-sourced. While these other solutions were/are great, we wanted to take it a step further. We want to go above and beyond to create **the best experience on whatever device you are using**.

Our goal is to create a **community-driven** codebase that can be contributed to by anyone willing have their code be public. Of course, all code contributions will be reviewed and approved before merging into a release. Instead of relying on one person to maintain and provide updates, we are opening it up to the users so the users can determine what features that want to add to the applications, and bring those features to fruition.

### BlueBubbles' Pillars of Success

One issue we've seen countless times with other solutions is the difficulty of the setup process and maintenance. We wanted to change that and make the setup process as seemless and easy as possible. That is why we've **gotten rid of port forwarding!** Instead, we've opted to create an ecosystem around ngrok and Google FCM (Firebase Cloud Messaging). While this means you'll need to create a Google account, it also means that you will no longer need to portforward. It also means that we can utilize Google's messaging service to send notifications so **the app will not require an open socket connection at all times.** This means very little background app usage, and thus, less battery usage! It also means you will not have to open up your MacOS server to the whole world. This is all done through a quick setup process and a transfer of knowledge from the MacOS server to your phone via a QRCode.

* Seemless & easy setup process
* Low battery usage
* No more port-forwarding

### Contributing & Development Stack

Contributing is simple! All of our repositories are public, and you can contribute to them via forking, then creating pull requests.

#### Android App Stack

* Dart / Flutter
* SQLite
* Google FCM

#### MacOS Server Stack

* NodeJS / Electron
* Typescript & TypeORM
* Ngrok
* SQLite
* Google FCM

#### Desktop App Stack

TBD