# PicPoint
Author: [Jerrick Ee](https://github.com/Jerricke)
More Info: [Github](https://github.com/Jerricke/PicPoint)
## Table of Contents
- [PicPoint](#PicPoint)
    - [Preview](#Preview)
    - [Motivation](#Motivation)
    - [Challenges](#Challenges)
    - [Plan](#Plan)
    - [TechStack](#TechStack)
    - [Setup](#Setup)
    - [Features](#Features)
        - [User](#User)
        - [Posts](#Posts)
        - [Map](#Map)
    - [Credits](#Credits)

## Preview
<img src="/assets/readme/image-1.png" width="200" height="400" />
<img src="/assets/readme/image-2.png" width="200" height="400" />
<img src="/assets/readme/image-3.png" width="200" height="400" />
<img src="/assets/readme/image-4.png" width="200" height="400" />
<img src="/assets/readme/image-5.png" width="200" height="400" />
<img src="/assets/readme/image-6.png" width="200" height="400" />
<img src="/assets/readme/image-7.png" width="200" height="400" />

## Motivation
The original motivation for this project was to build a simple mobile application that allows users to record and share their personal trips (trips via walking, biking, cycling, scooters, etc.). Expanding on the idea from [Triply](https://github.com/cmphill/python-p4-project-vite#Triply), the goal was to  switch the medium from web to mobile so that I could incorporate geocoding and live navigation. However, with the time constraiints of just 3 weeks, I encountered a significant challenge 2 weeks in that ultimately led me to pivoting and creating PicPoint instead. PicPoint is an app that is built on the knowledge and skills I learned from developing the Triply mobile application. PicPoint inherits the core concepts of sharing and interacting with other users, allowing users to connect and share information.

## Challenges
The aforementioned challenge while developing Triply was the difficulty of implenting live navigation and route generation. After days of researching and learning about the concept of live navigation, I decided that it would take too much time out of my already tight 3 weeks deadline to develop the application. 

## Plan
The new plan was to create PicPoint, a mobile application that allows users to share the photos they have taken and uploaded it to the server. The inspiration for this app is the same as Triply, which is to share and connect with others through experiences. Now, with only 1 week left to meet the deadline, the road map for the project is broken down into a few parts.

**Day 1:**
Implement main routes/navigations as well as the user authentication methods.

**Day 2:**
Create user profile pages and setup backend storages and collections.

**Day 3-4:**
Implement global feed structure, main GET and POST fetches, and image uploading.

**Day 5:**
Implement map features and geocoding data for the posts. 

**Day 6:**
Include full CRUD for main components of the application.

## TechStack
The main tools I've used for the application are:
Javascript, React Native, Expo, and Firebase, React native packages(MapView, ReactNativePaper, ImagePicker), Figma (for planning), Google Places API

## Setup
Fork and clone the repository. CD into the directory and run the folllowing commands to install and run the application.
``` 
    npx expo install
    npx expo
```

You will need an emulator (either iOS or Android) installed to view the application. Or and easier method is to install the Expo Go application from your personal device, and scan the QR code. When scanned, your Expo Go app will boot up the PicPoint application on your device.

## Features
The main features of this project is to upload your photos to the server and share them in posts! You can get started simply by creating an account and start posting your photos!

### User
The user will be able to create their own account by signing up with an email address, have a personal username, and profile picture.

### Post
In the home page, there will be a feed containing all the posts made by all the users. If the post belongs to you, tapping on it will bring up a modal to edit the title/content or delete the post.

In the camera tab, you can create a new post by filling out the forms and selecting an image from your photo gallery. Then you will be prompted to type in an address or manually move the pin to the location you want!

### Map
The map feature allows you to view all the posts around the globe! simply tap on any one of the pins to see the photo that belongs to that location!

## Credits
[Me](https://github.com/Jerricke), Jerrick, the main contributor of this final capstone project for the Flatiron Software Engineering bootcamp.

I am grateful for the Flatiron school community and staff team for supporting me along the way, as well as my good friend Vlad for providing insights.