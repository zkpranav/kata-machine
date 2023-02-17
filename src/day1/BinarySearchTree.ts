/*
    Its a binary tree, i.e atmost 2 children
    Left child <= parent, right child > parent

    If left unbalanced, values to skew the tree to one side, effectively turning it into a linked list
    Therefore, time complexity for search is b/w O(log(n)) - O(h) where, h is the height of the tree
*/