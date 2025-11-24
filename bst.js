class Node {
  constructor(val) {
    this.val = val 
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
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.val}`);
    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  insert(val, root = this.root) {
    if (root === null) {
      return new Node(val)
    } 
    
    if (val < root.val) {
      root.left = this.insert(val, root.left)
    } else if (val > root.val) {
      root.right = this.insert(val, root.right)
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

  delete(val, root = this.root) {
    if (root === null) {
      return root
    }
    
    if (val > root.val) {
      root.right = this.delete(val, root.right)
    } else if (val < root.val) {
      root.left = this.delete(val, root.left)
    } else {
      //if node has 0 or 1 child
      if (root.left === null) {
        return root.right
      }

      if (root.right === null) {
        return root.left
      }
      //if node has 2 children
      const successor = this.getSuccessor(root)
      root.right = this.delete(successor.val, root.right)
      root.val = successor.val
    }
    return root
  }

  find(val) {
    if(root.val === val) return root

    let node = null
    if (val > root.val) {
      node = this.find(val, root.right)
    } else if (val < root.val) {
      node = this.find(val, root.left)
    }

    return node
  }

  levelOrderForEach(callback, root = this.root) { 
    //check if callback is provided and is a function
    if (!callback || typeof callback !== 'function') {
      throw new Error("A callback function must be provided")
    }

    if (root === null) return
    let q = []
    q.push(root)
    let curr = null

    while(q.length > 0) {
      curr = q.shift()
      callback(curr)
      if (curr.left !== null) q.push(curr.left)
      if (curr.right !== null) q.push(curr.right)
    }
  }

  inOrderForEach(callback, root = this.root) {
    if (!callback || typeof callback !== 'function') {
      throw new Error("A callback function must be provided")
    }
    if(root === null) return 

    if(root.left !== null) this.inOrderForEach(callback, root.left)
    callback(root)
    if(root.right !== null) this.inOrderForEach(callback, root.right)
  }

  preOrderForEach(callback, root = this.root) {
    if (!callback || typeof callback !== 'function') {
      throw new Error("A callback function must be provided")
    }
    if(root === null) return 

    callback(root)
    if(root.left !== null) this.inOrderForEach(callback, root.left)
    if(root.right !== null) this.inOrderForEach(callback, root.right)
  }

  postOrderForEach(callback, root = this.root) {
    if (!callback || typeof callback !== 'function') {
      throw new Error("A callback function must be provided")
    }
    if(root === null) return 

    if(root.left !== null) this.inOrderForEach(callback, root.left)
    if(root.right !== null) this.inOrderForEach(callback, root.right)
    callback(root)
  }

  height(val) {
    const node = this.find(val, this.root)
    if (node === null) return null

    function nodeHeight(n) {
      if (!n) return -1
      return 1 + Math.max(nodeHeight(n.left), nodeHeight(n.right))
    }
    
    return nodeHeight(node)
  }

  depth(val) {
    if (this.root === null) return null
    let depth = 0
    let curr = this.root

    while (curr !== null) {
      if (val === curr.val) return depth
      curr = val < curr.val ? curr.left : curr.right
      depth++
    }

    return null
  }

  isBalanced(root = this.root) {
    if (root === null) return true;

    const height = (node) => {
      if (node === null) return -1;
      return 1 + Math.max(height(node.left), height(node.right));
    };

    const leftHeight = height(root.left);
    const rightHeight = height(root.right);

    const balanceOK = Math.abs(leftHeight - rightHeight) <= 1;

    return balanceOK &&
           this.isBalanced(root.left) &&
           this.isBalanced(root.right);
  }
  
}

function buildTree(arr) {
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
bst.delete(23, bst.root)
bst.prettyPrint()

bst.inOrderForEach((node) => node.val += 1, bst.root)
bst.prettyPrint()
console.log(bst.height(9))
console.log(bst.depth(334))