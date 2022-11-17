# Blockly Behavior Trees 

Industrialization of automated planning leads to a need to manage the life-cycle of planning models, and quite often the
life cycle will include non-expert users, for whom the verbose logical models in planning languages are not the best
communication instrument.

We are attempting to bridge the gap using popular drag-and-drop visual framework Blockly, developing an open-source
tool that would seamlessly translate between Blockly blocks to Python code.

# Installation
1. Clone the repo
2. Open project on preferred IDE (preferably Visual Studio Code)
3. On right bottom corner press on "Go Live" button
4. The home page will launch, press on the Behavior Trees domain on top left corner 
5. Drag and drop blocks, the python code will automatically be generated on the left pane.
6. The interface allows to save and load using the top right corner buttons.

# Google's Blockly References

1. [Basics Explained](https://www.ionos.com/digitalguide/websites/web-development/blockly-basics-explained/) - Blockly is a project developed by Google which presents long, text-based code strings in visual blocks
2. [Tips for creating a block language with blockly](https://ieeexplore.ieee.org/document/8120404) - when developers create an app using Blockly, they should carefully consider the style, which blocks to use, and what APIs and language features are right for their audience
3. [Blockly Factory](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html) - basic playground for block definitions and workspaces.

# Behavior Trees 

1. [Overview of Behavior Trees](https://www.gamedeveloper.com/programming/behavior-trees-for-ai-how-they-work)

2. [PyTrees API](https://py-trees.readthedocs.io/en/devel/composites.html#selector)  



# Known Issues
* Smaller or equal and similar comparison logical blocks do not get converted correctly by blockly python generator.



