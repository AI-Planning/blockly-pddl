# blockly-pddl

Industrialization of automated planning leads to a need to manage the life-cycle of planning models, and quite often the
life cycle will include non-expert users, for whom the verbose logical models in planning languages are not the best
communication instrument.

We are attempting to bridge the gap using popular drag-and-drop visual framework Blockly, developing an open-source
tool that would seamlessly translate between Problem Domain Definition Language (PDDL) and Blockly.

# Installation
1. Clone the repo
2. Run static/block_factory.html to load, modify and save blockly blocks contained in blocks/.
3. Run static/block_workspace.html to build and save PDDL domains.

# Google's Blockly References

1. [Basics Explained](https://www.ionos.com/digitalguide/websites/web-development/blockly-basics-explained/) - Blockly is a project developed by Google which presents long, text-based code strings in visual blocks
2. [Tips for creating a block language with blockly](https://ieeexplore.ieee.org/document/8120404) - when developers create an app using Blockly, they should carefully consider the style, which blocks to use, and what APIs and language features are right for their audience
3. [Blockly Factory](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html) - basic playground for block definitions and workspaces.

# Planning Domain Definition Language

1. [Overview of PDDL versions, extensions and historical development](https://en.wikipedia.org/wiki/Planning_Domain_Definition_Language)

2. [Classical PDDL domains](https://github.com/AI-Planning/pddl-generators)  