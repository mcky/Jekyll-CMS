# Jekyll CMS

This project is a very early stage experiment with creating a UI for jekyll, using the existing filesystem as a database.

The overall aim is to make static sites more approachable for less technically minded people, without losing any of the power. Ideally you should be able to hook this up to any Jekyll project and be able to dive in right away, and conversely remove it without fear of lock-in.

Other flat-file CMSs exist - however some require a build server to compile, a server running node/php or complete control over your content. By adding a UI layer on top of Jekyll we can harness the existing ecosystem (in particular Github pages hosting).


Various forms this could take that I'm exploring:  
  - A node module that spins up a server when ran, editing files locally, leaving the git up to you.  
  - An electron app that you can download and simply point at a directory (or create a new one). Could potentially handle/abstract away more of the git side for the user.  
  - A hosted service that authenticates with Github (akin to prose)  


### Points of reference
  - [Prose.io](http://prose.io) - A great project, I need to sit down and formualte my thoughts around it though.
  - [SpudPress](https://spudpress.com/) - Why should nice static site UIs be limited to WordPress?
  - [Grav](https://getgrav.org) (in particular the admin plugin)
  - [Ghost](https://ghost.org/)
  - [Statamic](https://statamic.com/)
  - [Kirby](https://getkirby.com/)


Finally - does the world need another CMS? No, but that's never stopped anyone before.
