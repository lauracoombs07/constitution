"use strict";

/*

   Author: Laura Coombs
   Date:   June 1, 2024

   Filename: bc_outline.js


   Function List
   =============

   makeOutline()
      Generates the text of the table of contents
      as a nested list

   createList(source, TOCList, headings)
      Creates an outline based on the source document,
      list items are appended to TOCList,
      the items list are based on the element names
      specified in the headings array

*/

window.addEventListener("load", makeOutline)


function makeOutline() {
  // location of doc outline
  var outline = document.getElementById("outline")

  // source of doc
  var source = document.getElementById("doc")

  var mainHeading = document.createElement("h1")
  var outlineList = document.createElement("ol")
  var headingText = document.createTextNode("Outline")

  // append adds an element to the end of a list of children
  mainHeading.appendChild(headingText)
  outline.appendChild(mainHeading)
  outline.appendChild(outlineList)

  // call create list to create the outline
  createList(source, outlineList)
}


function createList(source, outlineList) {
  // Headings for the outline (search always needs block letters)
  var headings = ["H1", "H2", "H3", "H4", "H5", "H6"]

  // Previous level of headings
  var prevLevel = 0
  // Running total of number of Outlined items in the list
  var headNum = 0

  // Loop through all the child nodes of source (main doc not outline list)
  for (var n = source.firstChild; n !== null; n = n.nextSibling) {
    // check if the node is a heading
    var headLevel = headings.indexOf(n.nodeName)

    // if the node is a heading a positive number will be returned, if none found, -1 is returned
    if (headLevel !== -1) {
      // if i find a heading
      // check if there is an id attribute if there is no id attribute, create one
      if (n.hasAttributes("id") === false) {
        n.setAttribute("id", "head" + headNum)
      }


      // increment the headNum
      headNum++
      // create list item
      var listElem = document.createElement("li")
      var linkElem = document.createElement("a")

      // create list item text based on node value
      // listElem.innerHTML = n.firstChild.nodeValue

      // create hyperlink to the heading
      linkElem.innerHTML = n.innerHTML
      linkElem.setAttribute("href", "#" + n.getAttribute("id"))

      // append hypertext link to the list item
      listElem.appendChild(linkElem)

      // append to existing list
      outlineList.appendChild(listElem)
      // if same level, add to the current list
      if (headLevel === prevLevel) {
        // add to the current list
        outlineList.appendChild(listElem)
        // if the level is higher, start a new nested list ex. h2 to h1 -> start a new nested list
      } else if (headLevel > prevLevel) {
        // start a new nested list
        var nestedList = document.createElement("ol")
        nestedList.appendChild(listElem)

        // append nested list to last item in the current list
        // outline list is our master - find the last child to ensure we add it to the END of the list
        outlineList.lastChild.appendChild(nestedList)

        // reassign current lest to the nested list
        outlineList = nestedList

        // done. time to append the list of headers to the parent node
      } else {
        // first calculate diff between current level and previous level to find out where to go
        var levelUp = prevLevel - headLevel

        // go up to that higher level
        for (var i = 1; i <= levelUp; i++) {
          // first time escapes out of the current node, second time escapes out of the parent node placing it in the grandparent node
          outlineList = outlineList.parentNode.parentNode
        }
        // append the list item
        outlineList.appendChild(listElem)
      }

      // update the value of prevLevel
      prevLevel = headLevel
    }
  }
}
