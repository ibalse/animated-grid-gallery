# animated-grid-gallery
Experimental project, for creating SPA style app from scratch with pure JS and CSS3, without use of frameworks or libraries. Photos are taken from flickr API and can come in any shape. 

# Demo
Live at www.akubas.lt/ieva

# What was done

## Same photo card object - different view:
* loading mode
* inactive mode, when info is visible, and image is hidden, but already loaded
* visible compact mode, image is visible, but info is hidden
* expanded card mode:
    * vertical type
    * horizontal type
    * horizontal image which does not fit into the screen
* small screen mode (dynamicaly counted 1 column grid)

## Object control:
* infinite scroll
* lazzy loading
* showing "inactive card mode" until it reaches the center of viewport
    
## Architecture:
* Data storage, application controls and components are separated
* Event Bus type module for comunnication between components/app/storrage
* Component = BEM definition + HTML template + event handling + CSS classes

## CSS
* dinamically counting breakpoints, which depend on the size and proportions of "compact" photo card view
* combining BEM and OOCSS methodologies

# run
For running on a local machine:
```bash
npm install
```

