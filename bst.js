class Node {
  constructor(data) {
    this.data = data 
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr)
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (!node) {
      return;
    }
    if (node.right) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  insert(data, root) {
    if (root === null) {
      return new Node(data)
    } 
    
    if (data < root.data) {
      root.left = this.insert(data, root.left)
    } else if (data > root.data) {
      root.right = this.insert(data, root.right)
    }

    return root
  }

  getSuccessor(curr) {
    //get the inorder successor of the current node
    curr = curr.right
    while (curr !== null && curr.left !== null) {
      curr = curr.left
    }
    return curr
  }
}

function buildTree(arr, start, end) {
  //remove duplicates and sort
  arr = [...new Set(arr)]
  arr.sort((a, b) => a - b)
  return createBST(arr, 0, arr.length - 1)
}

function createBST(arr, start, end) {
  if (start > end) return null
  let mid = Math.floor((start + end) / 2)
  const root = new Node(arr[mid])

  root.left = createBST(arr, start, mid-1)
  root.right = createBST(arr, mid+1, end)

  return root
}

//main
arr = [1, 7, 4, 23, 8, 9, 99]
bst = new Tree(arr, 0, arr.length - 1)
bst.insert(234, bst.root)
bst.insert(333, bst.root)
bst.prettyPrint()