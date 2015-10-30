html-element-data-removed-before-removelementhook
=============================================================
  Blaze removes html element data before the removeElement uiHook is called.
  This makes it impossible to use jQuery plugins that store a lot of stuff in the data of DOM Elements.
  Not sure if Blaze removing the data before the removeElement uiHook is inteneded behaviour I would assume it is not!
  
# Bug reproduction step plan:
  
1. Click the "Add blocks" button
2. A block should have appeared. 
3. click the block to remove it.
4. Check the console logs and errors.

