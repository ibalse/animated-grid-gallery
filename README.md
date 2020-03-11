# animated-grid-gallery
Experimental project, for creating SPA style app from scratch with pure JS and CSS3, without use of frameworks or libraries. Photos are taken from flickr API and can come in any shape. 

# Demo
www.akubas.lt/ieva

# What was done

## Photo card component with different representations

Mode              | Image | Title/Subtitle | Controls | Activated
------------------|-------|----------------|----------|-----
<b>Loading</b>    | Placehholder, loader | Visible | Hidden| <i>When card is in viewport or reaches the edge of it</i>
<b>Inactive</b>   | Hidden | Visible | Hidden| <i> Instantly after image was loaded</i>
<b>Visible&nbsp;compact</b> | Visible cropped | Hidden | Show only favourited icon| <i>When card reaches the center of viewport</i>
<b>Active&nbsp;compact</b> | Visible cropped, darker | Visible | Visible| <i>On click, touch or mouse hover</i>
<b>Expanded</b>   | Visible full | Visible | Visible | <i>On expand icon click</i>
<b>Small&nbsp;screen</b>| Visible full | Visible | Show only favourite icon |  <i>On dynamically counted 1 column grid</i>

Expanded layout depends on image type:
* vertical;
* horizontal;
* horizontal image, which does not fit into the screen;


## Object control:
* infinite scroll;
* lazzy loading;
* showing "inactive card mode" until it reaches the center of viewport;

## CSS
* dynamically counting breakpoints, which depend on the size and proportions of "compact" photo card view
* combining BEM and OOCSS methodologies

## Architecture:
* Data storage, application controls and components are separated
* Event Bus type module for communication between components/app/storrage
* Component = BEM definition + HTML template + event handling + CSS classes


# run
For running on a local machine:
```bash
npm install
```

