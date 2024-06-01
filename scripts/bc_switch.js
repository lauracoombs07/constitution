"use strict";

/*

   Author: Laura Coombs
   Date:   June 1, 2024

   Filename: bc_switch.js

   setupStyles()
   Function to set up the style sheet switcher and insert
   from buttons to allow the user to switch between web
   view and page view

*/

window.addEventListener("load", setupStyles);

function setupStyles() {
  // create a link element for ssheet
  var pageStyle = document.createElement("link");
  pageStyle.setAttribute("href", "styles/bc_page.css");
  pageStyle.setAttribute("rel", "stylesheet");
  pageStyle.setAttribute("disabled", "disabled");

  // Append link element to the document <head>
  document.head.appendChild(pageStyle);
  pageStyle.disabled = true;

  // insert div for button in for style switcher
  var buttonDIV = document.createElement("div");
  buttonDIV.setAttribute("id", "styleButtons");

  // insert button for page view
  var webButton = document.createElement("input");
  webButton.setAttribute("type", "button");
  webButton.setAttribute("value", "Web View");

  // insert button for print view
  var pageButton = document.createElement("input");
  pageButton.setAttribute("type", "button");
  pageButton.setAttribute("value", "Page View");

  buttonDIV.appendChild(webButton);
  buttonDIV.appendChild(pageButton);

  // insert before header
  document.body.insertBefore(buttonDIV, document.body.firstChild); // insertBefore(what is being inserted, what it is being inserted before)

  // Append embedded <style> in our <head>
  var buttonStyles = document.createElement("style");
  document.head.appendChild(buttonStyles);

  // Add our style rules to embedded sheet
  document.styleSheets[document.styleSheets.length - 1].insertRule(
    "div#styleButtons { position: fixed;}", 0
  );
  document.styleSheets[document.styleSheets.length - 1].insertRule(
    "div#styleButtons input { " +
    "background-color: rgba(68,94,186,0.6); " +
    "border: 3px solid rgba(0,24,123,0.6);" +
    "border-radius: 50%;" +
    "cursor: pointer;" +
    "color: white;" +
    "display: inline-block;" +
    "font-size: 1.2em;" +
    "height: 60px;" +
    "margin: 5px 10px;" +
    "width: 100px;" +
    "}", 1
  );
  document.styleSheets[document.styleSheets.length - 1].insertRule(
    "@media print {" +
            "div#styleButtons { " +
              "display: none; " +
            "}" +
          "}", 2
  )

  // Turn web button off and on
  webButton.onclick = function() {
    pageStyle.disabled = true;
  }
  pageButton.onclick = function() {
    pageStyle.disabled = false;
  }
}
